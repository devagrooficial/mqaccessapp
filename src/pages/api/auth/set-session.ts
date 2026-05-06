import type { APIRoute } from 'astro';
import { createServerClient } from '@supabase/ssr';

// Endpoint chamado pelo login client-side para sincronizar
// o token JWT do localStorage nos cookies HttpOnly do servidor.
// Sem isso, o middleware SSR nunca vê a sessão e redireciona para /auth/login.
export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const { access_token, refresh_token } = body;

    if (!access_token || !refresh_token) {
      return new Response(JSON.stringify({ error: 'Tokens ausentes.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const supabase = createServerClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() { return []; },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookies.set(name, value, {
                ...options,
                path: options?.path || '/',
                httpOnly: true,
                secure: import.meta.env.PROD,
                sameSite: 'lax',
              });
            });
          },
        },
      }
    );

    // Define a sessão no servidor — isso grava os cookies corretos
    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (error || !data.session) {
      return new Response(JSON.stringify({ error: error?.message ?? 'Sessão inválida.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err: any) {
    console.error('🚨 [SET-SESSION] Erro:', err?.message ?? err);
    return new Response(JSON.stringify({ error: 'Erro interno do servidor.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
