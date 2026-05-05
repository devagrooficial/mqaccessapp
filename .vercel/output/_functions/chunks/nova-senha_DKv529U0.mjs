/* empty css               */
import { c as createComponent } from './astro-component_BmOi03Hm.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_BvZ5THv7.mjs';
import { r as renderComponent } from './entrypoint_DMrWqGYU.mjs';
import { r as renderScript } from './BaseLayout_9zaNwiSi.mjs';
import { $ as $$AuthLayout } from './AuthLayout_BZmv5ws0.mjs';
import { s as supabase } from './supabase_sj-AEpC3.mjs';

const $$NovaSenha = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$NovaSenha;
  let errorMessage = "";
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const newPassword = formData.get("password")?.toString() ?? "";
    const confirm = formData.get("confirm-password")?.toString() ?? "";
    if (newPassword.length < 8) {
      errorMessage = "A senha deve ter pelo menos 8 caracteres.";
    } else if (newPassword !== confirm) {
      errorMessage = "As senhas não coincidem.";
    } else {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        errorMessage = "Não foi possível redefinir a senha. O link pode ter expirado.";
      } else {
        return Astro2.redirect("/auth/login?password_updated=1");
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, { "title": "Nova Senha", "data-astro-cid-n6h5y2ou": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="auth-form-card" data-astro-cid-n6h5y2ou> <div class="auth-form-header" data-astro-cid-n6h5y2ou> <img src="/images/logohorizontal.png" class="h-12 w-auto mx-auto mb-8" alt="MQ ACCESS" data-astro-cid-n6h5y2ou> <h1 class="auth-form-title" data-astro-cid-n6h5y2ou>Criar nova senha</h1> <p class="auth-form-subtitle" data-astro-cid-n6h5y2ou>Escolha uma senha forte para sua conta</p> </div> <form class="auth-form" id="nova-senha-form" method="POST" novalidate data-astro-cid-n6h5y2ou> <div class="form-group" data-astro-cid-n6h5y2ou> <label class="form-label" for="password" data-astro-cid-n6h5y2ou>Nova senha</label> <input type="password" id="password" name="password" class="input" placeholder="Mínimo 8 caracteres" autocomplete="new-password" required data-astro-cid-n6h5y2ou> </div> <div class="form-group" data-astro-cid-n6h5y2ou> <label class="form-label" for="confirm-password" data-astro-cid-n6h5y2ou>Confirmar nova senha</label> <input type="password" id="confirm-password" name="confirm-password" class="input" placeholder="Repita a senha" autocomplete="new-password" required data-astro-cid-n6h5y2ou> </div> ${errorMessage && renderTemplate`<p class="auth-error" role="alert" data-astro-cid-n6h5y2ou>${errorMessage}</p>`} <button type="submit" class="btn-primary btn-full" id="nova-senha-submit" data-astro-cid-n6h5y2ou>
Redefinir Senha
</button> </form> </div> ` })} ${renderScript($$result, "/Users/luisnathan/development/mqaccess/src/pages/auth/nova-senha.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/luisnathan/development/mqaccess/src/pages/auth/nova-senha.astro", void 0);

const $$file = "/Users/luisnathan/development/mqaccess/src/pages/auth/nova-senha.astro";
const $$url = "/auth/nova-senha";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$NovaSenha,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
