/* empty css               */
import { c as createComponent } from './astro-component_BmOi03Hm.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_BvZ5THv7.mjs';
import { r as renderComponent } from './entrypoint_DMrWqGYU.mjs';
import { $ as $$AppLayout } from './AppLayout_zHqYvHsN.mjs';
import { s as supabase } from './supabase_sj-AEpC3.mjs';

const $$Detalhes = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Detalhes;
  const brl = (cents) => (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const productId = Astro2.url.searchParams.get("id");
  let dbProduct = null;
  if (productId) {
    const { data } = await supabase.from("products").select("id, type, title, author, description, thumbnail_url, price_brl, modules").eq("id", productId).single();
    dbProduct = data;
  }
  if (productId && !dbProduct) {
    return Astro2.redirect("/app/home");
  }
  const product = {
    type: dbProduct?.type?.toUpperCase() ?? "MASTERCLASS",
    title: dbProduct?.title ?? "Protocolo C-Level: A Arquitetura da Decisão",
    author: dbProduct?.author ?? "Mario Quirino",
    thumbImg: dbProduct?.thumbnail_url ?? "/protocolo-clevel-thumb.png",
    description: dbProduct?.description ?? "O sistema definitivo para executivos que precisam tomar decisões complexas em ambientes de alta pressão e incerteza.",
    price: dbProduct?.price_brl ? brl(dbProduct.price_brl) : "R$ 1.997",
    // Módulos: do banco (JSON) ou estáticos
    modules: dbProduct?.modules ?? [
      { num: "01", title: "O Arquétipo do Líder de Elite", duration: "4 aulas · 52 min" },
      { num: "02", title: "Tomada de Decisão sob Pressão", duration: "6 aulas · 1h 18min" },
      { num: "03", title: "Comunicação de Alto Impacto", duration: "5 aulas · 1h 04min" },
      { num: "04", title: "Gestão de Energia e Foco", duration: "4 aulas · 48 min" },
      { num: "05", title: "Construindo Legado Corporativo", duration: "5 aulas · 1h 12min" }
    ],
    stats: [
      { label: "Módulos", value: "5" },
      { label: "Horas de conteúdo", value: "6h+" },
      { label: "Acesso", value: "Vitalício" }
    ]
  };
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": product.title, "data-astro-cid-buu7qxzb": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="pdp-page" data-astro-cid-buu7qxzb> <!-- Botão Voltar --> <a href="/app/home" class="pdp-back" data-astro-cid-buu7qxzb> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-buu7qxzb> <path d="M19 12H5M5 12l7-7M5 12l7 7" data-astro-cid-buu7qxzb></path> </svg> <span data-astro-cid-buu7qxzb>Voltar</span> </a> <!-- Grid principal --> <div class="pdp-grid" data-astro-cid-buu7qxzb> <!-- ═══ COLUNA ESQUERDA — Cinematic View ═══ --> <div class="pdp-media-col" data-astro-cid-buu7qxzb> <div class="pdp-media-wrap" data-astro-cid-buu7qxzb> <!-- Glow radial de estúdio --> <div class="pdp-glow" aria-hidden="true" data-astro-cid-buu7qxzb></div> ${renderTemplate`<!-- Frame de Curso com Play -->
            <div class="pdp-video-frame" data-astro-cid-buu7qxzb> <div class="pdp-video-thumb" data-astro-cid-buu7qxzb> <!-- Imagem real com overlay premium --> <img${addAttribute(product.thumbImg, "src")}${addAttribute(product.title, "alt")} class="pdp-video-img" loading="eager" data-astro-cid-buu7qxzb> <div class="pdp-video-overlay" data-astro-cid-buu7qxzb></div> <!-- Botão Play --> <button class="pdp-play-btn" aria-label="Assistir trailer" data-astro-cid-buu7qxzb> <div class="pdp-play-ring" data-astro-cid-buu7qxzb> <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-buu7qxzb> <path d="M8 5.14v14l11-7-11-7z" data-astro-cid-buu7qxzb></path> </svg> </div> <span class="pdp-play-label" data-astro-cid-buu7qxzb>Assistir Trailer</span> </button> </div> </div>` } <!-- Stats da mídia --> <div class="pdp-stats-bar" data-astro-cid-buu7qxzb> ${product.stats.map((s) => renderTemplate`<div class="pdp-stat" data-astro-cid-buu7qxzb> <span class="pdp-stat-value" data-astro-cid-buu7qxzb>${s.value}</span> <span class="pdp-stat-label" data-astro-cid-buu7qxzb>${s.label}</span> </div>`)} </div> </div> </div> <!-- ═══ COLUNA DIREITA — Buy Box ═══ --> <div class="pdp-buy-col" data-astro-cid-buu7qxzb> <!-- Tag do produto --> <div class="pdp-tag" data-astro-cid-buu7qxzb>${product.type}</div> <!-- Título --> <h1 class="pdp-title" data-astro-cid-buu7qxzb>${product.title}</h1> <!-- Autor --> <p class="pdp-author" data-astro-cid-buu7qxzb>por <span data-astro-cid-buu7qxzb>${product.author}</span></p> <!-- Separador --> <div class="pdp-sep" data-astro-cid-buu7qxzb></div> <!-- Descrição --> <p class="pdp-description" data-astro-cid-buu7qxzb>${product.description}</p> <!-- Conteúdo / Módulos --> <div class="pdp-content-section" data-astro-cid-buu7qxzb> <p class="pdp-section-label" data-astro-cid-buu7qxzb>O que você vai dominar</p> <div class="pdp-modules" data-astro-cid-buu7qxzb> ${product.modules.map((m) => renderTemplate`<div class="pdp-module-item" data-astro-cid-buu7qxzb> <span class="pdp-module-num" data-astro-cid-buu7qxzb>${m.num}</span> <div class="pdp-module-info" data-astro-cid-buu7qxzb> <p class="pdp-module-title" data-astro-cid-buu7qxzb>${m.title}</p> <p class="pdp-module-meta" data-astro-cid-buu7qxzb>${m.duration}</p> </div> <svg class="pdp-module-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-buu7qxzb> <polyline points="9 18 15 12 9 6" data-astro-cid-buu7qxzb></polyline> </svg> </div>`)} </div> </div> <!-- Checkout --> <div class="pdp-checkout" data-astro-cid-buu7qxzb> <div class="pdp-price-row" data-astro-cid-buu7qxzb> <span class="pdp-price-label" data-astro-cid-buu7qxzb>Investimento único</span> <span class="pdp-price" data-astro-cid-buu7qxzb>${product.price}</span> </div> <a href="/app/checkout" class="pdp-cta" id="pdp-buy-btn" data-astro-cid-buu7qxzb> <span data-astro-cid-buu7qxzb>ADQUIRIR ACESSO</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-buu7qxzb> <path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-buu7qxzb></path> </svg> </a> <p class="pdp-security" data-astro-cid-buu7qxzb> <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-buu7qxzb> <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-astro-cid-buu7qxzb></path> </svg>
Checkout criptografado e exclusivo MQ.
</p> </div> </div> </div> </div> ` })}`;
}, "/Users/luisnathan/development/mqaccess/src/pages/app/detalhes.astro", void 0);

const $$file = "/Users/luisnathan/development/mqaccess/src/pages/app/detalhes.astro";
const $$url = "/app/detalhes";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Detalhes,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
