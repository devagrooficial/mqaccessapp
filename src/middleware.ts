import { defineMiddleware } from "astro:middleware";
import { createServerClient } from "@supabase/ssr";

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request, cookies, redirect, locals } = context;

  try {
    // 1. Instância do Supabase blindada com parsing manual de cookies
    const supabase = createServerClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            const cookieHeader = request.headers.get('cookie') || '';
            return cookieHeader
              .split(';')
              .map((c) => c.trim())
              .filter(Boolean)
              .map((c) => {
                const [name, ...rest] = c.split('=');
                return { name: name.trim(), value: rest.join('=') };
              });
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookies.set(name, value, {
                ...options,
                path: options?.path || '/',
              });
            });
          },
        },
      }
    );

    // 2. Validação REAL do token no servidor (via cookie gravado pelo set-session)
    const { data: { user } } = await supabase.auth.getUser();
    locals.user    = user ?? null;
    locals.supabase = supabase;

    // 3. A FORTALEZA: Protege rotas dentro de /app/
    if (url.pathname.startsWith('/app')) {
      if (!user) {
        console.warn(`🔒 [SECURITY] Bloqueado. Sem sessão válida em: ${url.pathname}`);
        // Passa a URL original como ?next= para retornar após o login
        const loginUrl = `/auth/login?next=${encodeURIComponent(url.pathname)}`;
        return redirect(loginUrl);
      }
    }

    // 4. DIREÇÃO NA RAIZ (/)
    if (url.pathname === '/') {
      return user ? redirect('/app/home') : redirect('/auth/login');
    }

    // 5. TRAVA DA TELA DE LOGIN: Usuário autenticado não volta pro login
    if (url.pathname.startsWith('/auth/login')) {
      if (user) {
        return redirect('/app/home');
      }
    }

  } catch (err: any) {
    // Middleware nunca deve derrubar o servidor — loga e passa adiante
    console.error('🚨 [MIDDLEWARE] Erro inesperado:', err?.message ?? err);
    // Libera a requisição para evitar loop de erro
    return next();
  }

  return next();
});
