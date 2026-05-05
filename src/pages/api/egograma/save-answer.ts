import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  console.log("=========================================");
  console.log("🚀 [API SAVE-ANSWER] Requisição iniciada!");

  // ── Cliente SSR autenticado vindo do middleware ──────────────────────────────
  // locals.supabase já carrega os cookies do request — auth.uid() funciona no RLS
  const supabase = locals.supabase;

  if (!supabase) {
    console.error("❌ [API] locals.supabase não disponível — middleware não está rodando?");
    return new Response(JSON.stringify({ error: "Contexto de autenticação indisponível." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Valida sessão
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error("❌ [API] Sessão inválida — usuário não autenticado.");
    return new Response(JSON.stringify({ error: "Não autorizado." }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  console.log("👤 [API] user.id:", user.id);

  try {
    // 1. Intercepta o texto cru antes de tentar o parse
    const bodyText = await request.text();
    console.log("📥 [API DEBUG] Body Cru Recebido:", bodyText);

    if (!bodyText) {
      console.error("❌ [API ERRO] Body está vazio!");
      return new Response(JSON.stringify({ error: "Body vazio" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Parse do JSON
    const data = JSON.parse(bodyText);
    console.log("📦 [API DEBUG] Payload Parseado:", data);

    const { assessment_id, question_id, tipo, resposta } = data;

    // 3. Valida campos obrigatórios
    if (!assessment_id || question_id === undefined || !tipo || resposta === undefined) {
      console.error("❌ [API ERRO] Faltam campos obrigatórios:", { assessment_id, question_id, tipo, resposta });
      return new Response(JSON.stringify({ error: "Campos obrigatórios ausentes", recebido: data }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 4. Confirma ownership: assessment pertence ao usuário logado
    const { data: assessment } = await supabase
      .from('egogram_assessments')
      .select('id')
      .eq('id', assessment_id)
      .eq('user_id', user.id)
      .single();

    if (!assessment) {
      console.error("❌ [API] Assessment não encontrado ou não pertence ao usuário.");
      return new Response(JSON.stringify({ error: "Assessment inválido ou acesso negado." }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 5. Upsert com cliente autenticado — auth.uid() = user.id → RLS passa ✅
    console.log("⏳ [API DEBUG] Enviando Upsert para o Supabase...");
    const { data: supaData, error: supaError } = await supabase
      .from('egogram_answers')
      .upsert(
        {
          assessment_id,
          question_id,
          tipo,
          resposta: Number(resposta),
        },
        { onConflict: 'assessment_id,question_id' }
      )
      .select();

    if (supaError) {
      console.error("❌ [API ERRO SUPABASE]:", supaError);
      return new Response(
        JSON.stringify({ error: supaError.message, details: supaError.details, hint: supaError.hint, code: supaError.code }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log("✅ [API SUCESSO] Resposta salva:", supaData);
    console.log("=========================================");
    return new Response(JSON.stringify({ success: true, data: supaData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error("🚨 [API ERRO FATAL]:", err);
    console.log("=========================================");
    return new Response(JSON.stringify({ error: "Erro interno no servidor", detail: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify({ error: 'Método não permitido.' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });
