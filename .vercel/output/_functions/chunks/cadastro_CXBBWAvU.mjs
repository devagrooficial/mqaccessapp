/* empty css               */
import { c as createComponent } from './astro-component_BmOi03Hm.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_BvZ5THv7.mjs';
import { r as renderComponent } from './entrypoint_DMrWqGYU.mjs';
import { r as renderScript } from './BaseLayout_9zaNwiSi.mjs';
import { $ as $$AuthLayout } from './AuthLayout_BZmv5ws0.mjs';
import { s as supabase } from './supabase_sj-AEpC3.mjs';

const $$Cadastro = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Cadastro;
  let errorMessage = "";
  let emailConfirmRequired = false;
  let submittedEmail = "";
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const fullName = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const confirm = formData.get("confirm-password")?.toString() ?? "";
    if (password !== confirm) {
      errorMessage = "As senhas não coincidem. Verifique e tente novamente.";
    } else if (password.length < 8) {
      errorMessage = "A senha deve ter pelo menos 8 caracteres.";
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // O trigger `handle_new_user` usa este campo para preencher profiles.full_name
          data: { full_name: fullName }
        }
      });
      if (error) {
        errorMessage = error.message.toLowerCase().includes("already registered") ? "Este e-mail já está cadastrado. Tente fazer login." : error.message;
      } else if (data.user && data.session) {
        const cookieOpts = {
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7
        };
        Astro2.cookies.set("sb-access-token", data.session.access_token, cookieOpts);
        Astro2.cookies.set("sb-refresh-token", data.session.refresh_token, cookieOpts);
        return Astro2.redirect("/app/home");
      } else if (data.user && !data.session) {
        emailConfirmRequired = true;
        submittedEmail = email;
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, { "title": "Criar Conta", "data-astro-cid-ikx2jhli": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="auth-form-card" data-astro-cid-ikx2jhli> <div class="auth-form-header" data-astro-cid-ikx2jhli> <img src="/images/logohorizontal.png" class="h-12 w-auto mx-auto mb-8" alt="MQ ACCESS" data-astro-cid-ikx2jhli> <h1 class="auth-form-title" data-astro-cid-ikx2jhli> ${emailConfirmRequired ? "Verifique seu e-mail" : "Crie sua conta"} </h1> <p class="auth-form-subtitle" data-astro-cid-ikx2jhli> ${emailConfirmRequired ? "Um link de confirmação foi enviado" : "Junte-se à plataforma de executivos"} </p> </div> ${emailConfirmRequired ? renderTemplate`<!-- Estado: aguardando confirmação de e-mail -->
      <div class="confirm-state" data-astro-cid-ikx2jhli> <div class="confirm-icon" aria-hidden="true" data-astro-cid-ikx2jhli> <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-ikx2jhli> <rect x="2" y="4" width="20" height="16" rx="2" data-astro-cid-ikx2jhli></rect> <polyline points="2,4 12,13 22,4" data-astro-cid-ikx2jhli></polyline> </svg> </div> <p class="confirm-desc" data-astro-cid-ikx2jhli>
Enviamos um e-mail de confirmação para <strong data-astro-cid-ikx2jhli>${submittedEmail}</strong>.
<br data-astro-cid-ikx2jhli>Clique no link para ativar sua conta e fazer login.
</p> <p class="confirm-hint" data-astro-cid-ikx2jhli>Não recebeu? Verifique a pasta de spam.</p> <a href="/auth/login" class="btn-primary btn-full confirm-btn" data-astro-cid-ikx2jhli>Ir para o Login</a> </div>` : renderTemplate`<!-- Formulário de cadastro -->
      <form class="auth-form" id="cadastro-form" method="POST" novalidate data-astro-cid-ikx2jhli> <div class="form-group" data-astro-cid-ikx2jhli> <label class="form-label" for="name" data-astro-cid-ikx2jhli>Nome completo</label> <input type="text" id="name" name="name" class="input" placeholder="Seu nome" autocomplete="name" required data-astro-cid-ikx2jhli> </div> <div class="form-group" data-astro-cid-ikx2jhli> <label class="form-label" for="email" data-astro-cid-ikx2jhli>E-mail</label> <input type="email" id="email" name="email" class="input" placeholder="seu@email.com" autocomplete="email" required data-astro-cid-ikx2jhli> </div> <div class="form-group" data-astro-cid-ikx2jhli> <label class="form-label" for="password" data-astro-cid-ikx2jhli>Senha</label> <input type="password" id="password" name="password" class="input" placeholder="Mínimo 8 caracteres" autocomplete="new-password" required data-astro-cid-ikx2jhli> </div> <div class="form-group" data-astro-cid-ikx2jhli> <label class="form-label" for="confirm-password" data-astro-cid-ikx2jhli>Confirmar senha</label> <input type="password" id="confirm-password" name="confirm-password" class="input" placeholder="Repita a senha" autocomplete="new-password" required data-astro-cid-ikx2jhli> </div> ${errorMessage && renderTemplate`<p class="auth-error" role="alert" data-astro-cid-ikx2jhli>${errorMessage}</p>`} <button type="submit" class="btn-primary btn-full" id="cadastro-submit" data-astro-cid-ikx2jhli>
Criar Minha Conta
</button> </form>`} <p class="auth-switch-text" data-astro-cid-ikx2jhli>
Já tem uma conta?
<a href="/auth/login" class="auth-switch-link" data-astro-cid-ikx2jhli>Entrar</a> </p> </div> ` })} ${renderScript($$result, "/Users/luisnathan/development/mqaccess/src/pages/auth/cadastro.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/luisnathan/development/mqaccess/src/pages/auth/cadastro.astro", void 0);
const $$file = "/Users/luisnathan/development/mqaccess/src/pages/auth/cadastro.astro";
const $$url = "/auth/cadastro";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Cadastro,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
