import { c as createComponent } from './astro-component_BmOi03Hm.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, D as renderSlot } from './sequence_BvZ5THv7.mjs';
import { r as renderComponent } from './entrypoint_DMrWqGYU.mjs';
import { $ as $$BaseLayout } from './BaseLayout_9zaNwiSi.mjs';

const $$AuthLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$AuthLayout;
  const { title, description } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description, "data-astro-cid-3qlrnpww": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="auth-shell" data-astro-cid-3qlrnpww> <!-- Conteúdo da tela de auth --> <section class="auth-content" data-astro-cid-3qlrnpww> ${renderSlot($$result2, $$slots["default"])} </section> <!-- Rodapé de auth --> <footer class="auth-footer" data-astro-cid-3qlrnpww> <p data-astro-cid-3qlrnpww>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} MQ ACCESS. Todos os direitos reservados.</p> </footer> </main> ` })}`;
}, "/Users/luisnathan/development/mqaccess/src/layouts/AuthLayout.astro", void 0);

export { $$AuthLayout as $ };
