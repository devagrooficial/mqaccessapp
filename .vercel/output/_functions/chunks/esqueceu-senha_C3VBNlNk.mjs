/* empty css               */
import { c as createComponent } from './astro-component_BmOi03Hm.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_BvZ5THv7.mjs';
import { r as renderComponent } from './entrypoint_DMrWqGYU.mjs';
import { r as renderScript } from './BaseLayout_9zaNwiSi.mjs';
import { $ as $$AuthLayout } from './AuthLayout_BZmv5ws0.mjs';
import { s as supabase } from './supabase_sj-AEpC3.mjs';

const $$EsqueceuSenha = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$EsqueceuSenha;
  let errorMessage = "";
  let emailSent = false;
  let submittedEmail = "";
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const email = formData.get("email")?.toString().trim() ?? "";
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      // Redireciona para página de redefinição após clique no e-mail
      redirectTo: `${Astro2.url.origin}/auth/nova-senha`
    });
    if (error) {
      errorMessage = "Não foi possível enviar o e-mail. Verifique o endereço informado.";
    } else {
      emailSent = true;
      submittedEmail = email;
    }
  }
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, { "title": "Recuperar Senha", "data-astro-cid-234xmnbf": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="auth-form-card" data-astro-cid-234xmnbf> <div class="auth-form-header" data-astro-cid-234xmnbf> <img src="/images/logohorizontal.png" class="h-12 w-auto mx-auto mb-8" alt="MQ ACCESS" data-astro-cid-234xmnbf> <h1 class="auth-form-title" data-astro-cid-234xmnbf>Recuperar acesso</h1> <p class="auth-form-subtitle" data-astro-cid-234xmnbf>Enviaremos um link para o seu e-mail</p> </div> ${emailSent ? renderTemplate`<!-- Estado de sucesso -->
      <div class="success-state" data-astro-cid-234xmnbf> <div class="success-icon" aria-hidden="true" data-astro-cid-234xmnbf> <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-234xmnbf> <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" data-astro-cid-234xmnbf></path> <polyline points="22 4 12 14.01 9 11.01" data-astro-cid-234xmnbf></polyline> </svg> </div> <p class="success-title" data-astro-cid-234xmnbf>E-mail enviado!</p> <p class="success-desc" data-astro-cid-234xmnbf>
Enviamos um link de recuperação para <strong data-astro-cid-234xmnbf>${submittedEmail}</strong>.<br data-astro-cid-234xmnbf>
Verifique sua caixa de entrada e a pasta de spam.
</p> <a href="/auth/login" class="btn-primary btn-full success-btn" data-astro-cid-234xmnbf>Voltar ao Login</a> </div>` : renderTemplate`<!-- Formulário -->
      <form class="auth-form" id="recovery-form" method="POST" novalidate data-astro-cid-234xmnbf> <div class="form-group" data-astro-cid-234xmnbf> <label class="form-label" for="email" data-astro-cid-234xmnbf>E-mail da conta</label> <input type="email" id="email" name="email" class="input" placeholder="seu@email.com" autocomplete="email" required data-astro-cid-234xmnbf> </div> ${errorMessage && renderTemplate`<p class="auth-error" role="alert" data-astro-cid-234xmnbf>${errorMessage}</p>`} <button type="submit" class="btn-primary btn-full" id="recovery-submit" data-astro-cid-234xmnbf>
Enviar Link de Recuperação
</button> </form>`} <p class="auth-switch-text" data-astro-cid-234xmnbf>
Lembrou a senha?
<a href="/auth/login" class="auth-switch-link" data-astro-cid-234xmnbf>Voltar ao login</a> </p> </div> ` })} ${renderScript($$result, "/Users/luisnathan/development/mqaccess/src/pages/auth/esqueceu-senha.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/luisnathan/development/mqaccess/src/pages/auth/esqueceu-senha.astro", void 0);

const $$file = "/Users/luisnathan/development/mqaccess/src/pages/auth/esqueceu-senha.astro";
const $$url = "/auth/esqueceu-senha";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$EsqueceuSenha,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
