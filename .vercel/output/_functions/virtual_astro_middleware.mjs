import { a8 as defineMiddleware, ah as sequence } from './chunks/sequence_BvZ5THv7.mjs';
import 'piccolore';
import 'clsx';
import { createClient } from '@supabase/supabase-js';

const PROTECTED_PREFIX = "/app";
const AUTH_ONLY_ROUTES = ["/auth/login", "/auth/cadastro"];
const onRequest$1 = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;
  const needsAuth = pathname.startsWith(PROTECTED_PREFIX);
  const isAuthPage = AUTH_ONLY_ROUTES.includes(pathname);
  if (!needsAuth && !isAuthPage) {
    return next();
  }
  const accessToken = context.cookies.get("sb-access-token")?.value ?? "";
  const refreshToken = context.cookies.get("sb-refresh-token")?.value ?? "";
  let authenticatedUser = null;
  if (accessToken && refreshToken) {
    const supabase = createClient(
      "https://xlvupkicpjpatmdkmqrd.supabase.co",
      "sb_publishable_77Z7SIeXDv_NbEs7VTakMg_sDjqwTb8",
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false
        }
      }
    );
    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    });
    if (!error && data.session?.user) {
      authenticatedUser = data.session.user;
      if (data.session.access_token !== accessToken) {
        const opts = { path: "/", httpOnly: true, secure: true, sameSite: "lax" };
        context.cookies.set("sb-access-token", data.session.access_token, opts);
        context.cookies.set("sb-refresh-token", data.session.refresh_token, opts);
      }
    }
  }
  if (needsAuth && !authenticatedUser) {
    return context.redirect(`/auth/login?next=${encodeURIComponent(pathname)}`);
  }
  if (isAuthPage && authenticatedUser) {
    return context.redirect("/app/home");
  }
  context.locals.user = authenticatedUser;
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
