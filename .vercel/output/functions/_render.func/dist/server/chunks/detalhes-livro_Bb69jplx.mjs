/* empty css               */
import { c as createComponent } from './astro-component_BmOi03Hm.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_BvZ5THv7.mjs';
import { r as renderComponent } from './entrypoint_DMrWqGYU.mjs';
import { $ as $$AppLayout } from './AppLayout_zHqYvHsN.mjs';

const $$DetalhesLivro = createComponent(($$result, $$props, $$slots) => {
  const book = {
    type: "LIVRO OFICIAL",
    title: "A Engenharia do Networking",
    author: "Mario Quirino",
    description: "O método definitivo para construir relações de alto valor com precisão estratégica. Não se trata de quantidade de contatos — trata-se de arquitetar as conexões certas que multiplicam sua influência e resultados.",
    price: "R$ 197",
    priceNote: "ou 3x R$ 67 sem juros",
    stats: [
      { value: "320", label: "Páginas" },
      { value: "Capa Dura", label: "Formato" },
      { value: "1ª Edição", label: "Exclusividade" }
    ],
    chapters: [
      { num: "01", title: "O Fator Alfa nas Negociações", desc: "Como o posicionamento define o resultado antes de qualquer conversa." },
      { num: "02", title: "Mapeamento Rápido de Perfis", desc: "Técnicas de leitura comportamental aplicadas a reuniões de alto nível." },
      { num: "03", title: "A Arquitetura de Relacionamentos", desc: "Sistemas para cultivar conexões estratégicas de forma não-transacional." },
      { num: "04", title: "Influência Sem Manipulação", desc: "Comunicação de autoridade que atrai sem pressionar." }
    ],
    badges: ["Envio para todo o Brasil", "Embalagem premium", "Frete expresso disponível"]
  };
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": book.title, "data-astro-cid-ju34v3q4": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="pdp-page" data-astro-cid-ju34v3q4> <!-- Botão Voltar --> <a href="/app/home" class="pdp-back" data-astro-cid-ju34v3q4> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-ju34v3q4> <path d="M19 12H5M5 12l7-7M5 12l7 7" data-astro-cid-ju34v3q4></path> </svg> <span data-astro-cid-ju34v3q4>Voltar</span> </a> <div class="pdp-grid" data-astro-cid-ju34v3q4> <!-- ═══ COLUNA ESQUERDA — A Tangibilidade ═══ --> <div class="pdp-media-col" data-astro-cid-ju34v3q4> <div class="pdp-media-wrap" data-astro-cid-ju34v3q4> <!-- Glow radial de estúdio --> <div class="pdp-glow" aria-hidden="true" data-astro-cid-ju34v3q4></div> <!-- Capa do Livro 3D --> <div class="pdp-book-stage" data-astro-cid-ju34v3q4> <div class="pdp-book-3d" data-astro-cid-ju34v3q4> <!-- Lombada --> <div class="pdp-spine" data-astro-cid-ju34v3q4> <span class="pdp-spine-text" data-astro-cid-ju34v3q4>Mario Quirino</span> </div> <!-- Capa principal --> <div class="pdp-cover" data-astro-cid-ju34v3q4> <!-- Textura de fundo sutil --> <div class="pdp-cover-texture" aria-hidden="true" data-astro-cid-ju34v3q4></div> <!-- Linha decorativa dourada --> <div class="pdp-cover-line" aria-hidden="true" data-astro-cid-ju34v3q4></div> <!-- Conteúdo da capa --> <div class="pdp-cover-content" data-astro-cid-ju34v3q4> <p class="pdp-cover-label" data-astro-cid-ju34v3q4>MARIO QUIRINO</p> <h2 class="pdp-cover-title" data-astro-cid-ju34v3q4>A Engenharia<br data-astro-cid-ju34v3q4>do Networking</h2> <div class="pdp-cover-badge" data-astro-cid-ju34v3q4>EDIÇÃO ESPECIAL</div> </div> </div> </div> <!-- Sombra flutuante --> <div class="pdp-book-shadow" aria-hidden="true" data-astro-cid-ju34v3q4></div> </div> <!-- Stats do livro --> <div class="pdp-stats-bar" data-astro-cid-ju34v3q4> ${book.stats.map((s) => renderTemplate`<div class="pdp-stat" data-astro-cid-ju34v3q4> <span class="pdp-stat-value" data-astro-cid-ju34v3q4>${s.value}</span> <span class="pdp-stat-label" data-astro-cid-ju34v3q4>${s.label}</span> </div>`)} </div> <!-- Badges de entrega --> <div class="pdp-badges" data-astro-cid-ju34v3q4> ${book.badges.map((b) => renderTemplate`<div class="pdp-badge" data-astro-cid-ju34v3q4> <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-ju34v3q4> <polyline points="20 6 9 17 4 12" data-astro-cid-ju34v3q4></polyline> </svg> <span data-astro-cid-ju34v3q4>${b}</span> </div>`)} </div> </div> </div> <!-- ═══ COLUNA DIREITA — Buy Box ═══ --> <div class="pdp-buy-col" data-astro-cid-ju34v3q4> <!-- Tag --> <div class="pdp-tag" data-astro-cid-ju34v3q4>${book.type}</div> <!-- Título --> <h1 class="pdp-title" data-astro-cid-ju34v3q4>${book.title}</h1> <!-- Autor --> <p class="pdp-author" data-astro-cid-ju34v3q4>por <span data-astro-cid-ju34v3q4>${book.author}</span></p> <div class="pdp-sep" data-astro-cid-ju34v3q4></div> <!-- Descrição --> <p class="pdp-description" data-astro-cid-ju34v3q4>${book.description}</p> <!-- Capítulos --> <div class="pdp-content-section" data-astro-cid-ju34v3q4> <p class="pdp-section-label" data-astro-cid-ju34v3q4>O que você vai descobrir</p> <div class="pdp-chapters" data-astro-cid-ju34v3q4> ${book.chapters.map((c) => renderTemplate`<div class="pdp-chapter-item" data-astro-cid-ju34v3q4> <div class="pdp-chapter-header" data-astro-cid-ju34v3q4> <span class="pdp-chapter-num" data-astro-cid-ju34v3q4>${c.num}</span> <p class="pdp-chapter-title" data-astro-cid-ju34v3q4>${c.title}</p> <svg class="pdp-chapter-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-ju34v3q4> <polyline points="20 6 9 17 4 12" data-astro-cid-ju34v3q4></polyline> </svg> </div> <p class="pdp-chapter-desc" data-astro-cid-ju34v3q4>${c.desc}</p> </div>`)} </div> </div> <!-- Checkout --> <div class="pdp-checkout" data-astro-cid-ju34v3q4> <div class="pdp-price-block" data-astro-cid-ju34v3q4> <span class="pdp-price-label" data-astro-cid-ju34v3q4>Investimento</span> <div class="pdp-price-row" data-astro-cid-ju34v3q4> <span class="pdp-price" data-astro-cid-ju34v3q4>${book.price}</span> </div> <span class="pdp-price-note" data-astro-cid-ju34v3q4>${book.priceNote}</span> </div> <a href="/app/checkout" class="pdp-cta" id="pdp-buy-btn" data-astro-cid-ju34v3q4> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-ju34v3q4> <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" data-astro-cid-ju34v3q4></path> </svg> <span data-astro-cid-ju34v3q4>GARANTIR MEU EXEMPLAR</span> </a> <p class="pdp-security" data-astro-cid-ju34v3q4> <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-ju34v3q4> <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-astro-cid-ju34v3q4></path> </svg>
Frete calculado no checkout. Envio expresso disponível.
</p> </div> </div> </div> </div> ` })}`;
}, "/Users/luisnathan/development/mqaccess/src/pages/app/detalhes-livro.astro", void 0);

const $$file = "/Users/luisnathan/development/mqaccess/src/pages/app/detalhes-livro.astro";
const $$url = "/app/detalhes-livro";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$DetalhesLivro,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
