/* empty css               */
import { c as createComponent } from './astro-component_BmOi03Hm.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_BvZ5THv7.mjs';
import { r as renderComponent } from './entrypoint_DMrWqGYU.mjs';
import { r as renderScript } from './BaseLayout_9zaNwiSi.mjs';
import { $ as $$AuthLayout } from './AuthLayout_BZmv5ws0.mjs';
import { s as supabase } from './supabase_sj-AEpC3.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Login;
  let errorMessage = "";
  const registered = Astro2.url.searchParams.get("registered") === "1";
  const passwordUpdated = Astro2.url.searchParams.get("password_updated") === "1";
  const nextUrl = Astro2.url.searchParams.get("next") ?? "/app/home";
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const email = formData.get("email")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.session) {
      errorMessage = error?.message === "Invalid login credentials" ? "E-mail ou senha incorretos. Verifique seus dados." : error?.message ?? "Erro ao autenticar. Tente novamente.";
    } else {
      const cookieOpts = {
        path: "/",
        httpOnly: true,
        secure: true,
        // false em dev para funcionar sem HTTPS
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7
        // 7 dias
      };
      Astro2.cookies.set("sb-access-token", data.session.access_token, cookieOpts);
      Astro2.cookies.set("sb-refresh-token", data.session.refresh_token, cookieOpts);
      return Astro2.redirect(nextUrl.startsWith("/app") ? nextUrl : "/app/home");
    }
  }
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, { "title": "Entrar", "data-astro-cid-j7y7d5ql": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="auth-form-card" data-astro-cid-j7y7d5ql> <div class="auth-form-header" data-astro-cid-j7y7d5ql> <img src="/images/logohorizontal.png" class="h-12 w-auto mx-auto mb-8" alt="MQ ACCESS" data-astro-cid-j7y7d5ql> <h1 class="auth-form-title" data-astro-cid-j7y7d5ql>Bem-vindo de volta</h1> <p class="auth-form-subtitle" data-astro-cid-j7y7d5ql>Acesse sua conta MQ ACCESS</p> </div> ${registered && renderTemplate`<div class="auth-banner auth-banner--success" role="alert" data-astro-cid-j7y7d5ql> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j7y7d5ql><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" data-astro-cid-j7y7d5ql></path><polyline points="22 4 12 14.01 9 11.01" data-astro-cid-j7y7d5ql></polyline></svg>
Conta criada! Verifique seu e-mail para confirmar o cadastro.
</div>`} ${passwordUpdated && renderTemplate`<div class="auth-banner auth-banner--success" role="alert" data-astro-cid-j7y7d5ql> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j7y7d5ql><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" data-astro-cid-j7y7d5ql></path><polyline points="22 4 12 14.01 9 11.01" data-astro-cid-j7y7d5ql></polyline></svg>
Senha redefinida com sucesso! Faça login abaixo.
</div>`} <form class="auth-form" id="login-form" method="POST" novalidate data-astro-cid-j7y7d5ql> <div class="form-group" data-astro-cid-j7y7d5ql> <label class="form-label" for="email" data-astro-cid-j7y7d5ql>E-mail</label> <input type="email" id="email" name="email" class="input" placeholder="seu@email.com" autocomplete="email" required data-astro-cid-j7y7d5ql> </div> <div class="form-group" data-astro-cid-j7y7d5ql> <label class="form-label" for="password" data-astro-cid-j7y7d5ql>Senha</label> <input type="password" id="password" name="password" class="input" placeholder="••••••••" autocomplete="current-password" required data-astro-cid-j7y7d5ql> <a href="/auth/esqueceu-senha" class="form-link-right" data-astro-cid-j7y7d5ql>Esqueceu a senha?</a> </div> ${errorMessage && renderTemplate`<p class="auth-error" role="alert" data-astro-cid-j7y7d5ql>${errorMessage}</p>`} <button type="submit" class="btn-primary btn-full" id="login-submit" data-astro-cid-j7y7d5ql>
Entrar
</button> </form> <p class="auth-switch-text" data-astro-cid-j7y7d5ql>
Ainda não tem conta?
<a href="/auth/cadastro" class="auth-switch-link" data-astro-cid-j7y7d5ql>Criar conta</a> </p> </div> ` })} ${renderScript($$result, "/Users/luisnathan/development/mqaccess/src/pages/auth/login.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/luisnathan/development/mqaccess/src/pages/auth/login.astro", void 0);
const $$file = "/Users/luisnathan/development/mqaccess/src/pages/auth/login.astro";
const $$url = "/auth/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
