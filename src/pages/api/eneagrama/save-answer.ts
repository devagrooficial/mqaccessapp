import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  console.log("=========================================");
  console.log("🚀 [API ENEAGRAMA SAVE-ANSWER] Requisição iniciada!");

  const supabase = locals.supabase;

  if (!supabase) {
    console.error("❌ [API] locals.supabase não disponível — middleware não está rodando?");
    return new Response(JSON.stringify({ error: "Contexto de autenticação indisponível." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

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
    const bodyText = await request.text();
    console.log("📥 [API DEBUG] Body Cru Recebido:", bodyText);

    if (!bodyText) {
      console.error("❌ [API ERRO] Body está vazio!");
      return new Response(JSON.stringify({ error: "Body vazio" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = JSON.parse(bodyText);
    console.log("📦 [API DEBUG] Payload Parseado:", data);

    const { assessment_id, question_id, enneatype, resposta } = data;

    // Valida campos obrigatórios
    if (!assessment_id || question_id === undefined || !enneatype || resposta === undefined) {
      console.error("❌ [API ERRO] Faltam campos obrigatórios:", { assessment_id, question_id, enneatype, resposta });
      return new Response(JSON.stringify({ error: "Campos obrigatórios ausentes", recebido: data }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Confirma ownership do assessment
    const { data: assessment } = await supabase
      .from('enneagram_assessments')
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

    // Upsert com cliente autenticado (RLS: auth.uid() = user_id ✅)
    console.log("⏳ [API DEBUG] Enviando Upsert para o Supabase...");
    const { data: supaData, error: supaError } = await supabase
      .from('enneagram_answers')
      .upsert(
        {
          assessment_id,
          question_id,
          enneatype,
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
