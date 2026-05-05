import { c as createComponent } from './astro-component_BmOi03Hm.mjs';
import 'piccolore';
import { U as createRenderInstruction, a4 as addAttribute, T as renderTemplate, ba as renderHead, D as renderSlot } from './sequence_BvZ5THv7.mjs';
import { r as renderComponent } from './entrypoint_DMrWqGYU.mjs';
import 'clsx';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/Users/luisnathan/development/mqaccess/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/luisnathan/development/mqaccess/node_modules/astro/components/ClientRouter.astro", void 0);

const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title = "MQ ACCESS",
    description = "A plataforma exclusiva para executivos e alta gestão."
  } = Astro2.props;
  return renderTemplate`<html lang="pt-BR"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"${addAttribute(description, "content")}><meta name="theme-color" content="#000000"><link rel="icon" type="image/png" href="/images/logosquad.png"><title>${title} | MQ ACCESS</title><!-- Google Fonts — preconnect para performance --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet"><!-- View Transitions API — sensação de SPA -->${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} <!-- GSAP init global --> ${renderScript($$result, "/Users/luisnathan/development/mqaccess/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/luisnathan/development/mqaccess/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $, renderScript as r };
