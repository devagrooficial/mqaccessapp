/* empty css               */
import { c as createComponent } from './astro-component_BmOi03Hm.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_BvZ5THv7.mjs';
import { r as renderComponent } from './entrypoint_DMrWqGYU.mjs';
import { $ as $$AppLayout } from './AppLayout_zHqYvHsN.mjs';

const $$Analises = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Central de Análises", "activeNav": "analises", "data-astro-cid-mtr5lala": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="analises-page" data-astro-cid-mtr5lala> <!-- Header --> <div class="analises-header" data-astro-cid-mtr5lala> <a href="/app/home" class="analises-back" data-astro-cid-mtr5lala> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-mtr5lala><path d="M19 12H5M12 19l-7-7 7-7" data-astro-cid-mtr5lala></path></svg>
Voltar
</a> <h1 class="analises-title" data-astro-cid-mtr5lala>Central de Análises</h1> </div> <!-- Grid --> <div class="analises-grid" data-astro-cid-mtr5lala> <!-- Egograma --> <a href="/app/analise-detalhes" class="analise-card" data-astro-cid-mtr5lala> <div class="analise-card__header" data-astro-cid-mtr5lala> <h2 class="analise-card__title" data-astro-cid-mtr5lala>Egograma</h2> <span class="status-badge status-badge--pending" data-astro-cid-mtr5lala>PENDENTE</span> </div> <p class="analise-card__desc" data-astro-cid-mtr5lala>Mapeie seus estados de ego e entenda como você reage a conflitos internos e externos.</p> <div class="analise-card__footer" data-astro-cid-mtr5lala> <div class="analise-time" data-astro-cid-mtr5lala> <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-mtr5lala><circle cx="12" cy="12" r="10" data-astro-cid-mtr5lala></circle><polyline points="12 6 12 12 16 14" data-astro-cid-mtr5lala></polyline></svg>
15 min
</div> <span class="analise-action" data-astro-cid-mtr5lala>Ver detalhes &rarr;</span> </div> </a> <!-- Avaliação DISC --> <a href="/app/analise-detalhes" class="analise-card" data-astro-cid-mtr5lala> <div class="analise-card__header" data-astro-cid-mtr5lala> <h2 class="analise-card__title" data-astro-cid-mtr5lala>Avaliação DISC</h2> <span class="status-badge status-badge--done" data-astro-cid-mtr5lala>CONCLUÍDO</span> </div> <p class="analise-card__desc" data-astro-cid-mtr5lala>Analise seu perfil comportamental: Dominância, Influência, Estabilidade e Conformidade.</p> <div class="analise-card__footer" data-astro-cid-mtr5lala> <div class="analise-time" data-astro-cid-mtr5lala> <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-mtr5lala><circle cx="12" cy="12" r="10" data-astro-cid-mtr5lala></circle><polyline points="12 6 12 12 16 14" data-astro-cid-mtr5lala></polyline></svg>
20 min
</div> <span class="analise-action" data-astro-cid-mtr5lala>Ver detalhes &rarr;</span> </div> </a> <!-- Eneagrama --> <a href="/app/analise-detalhes" class="analise-card" data-astro-cid-mtr5lala> <div class="analise-card__header" data-astro-cid-mtr5lala> <h2 class="analise-card__title" data-astro-cid-mtr5lala>Eneagrama</h2> <span class="status-badge status-badge--done" data-astro-cid-mtr5lala>CONCLUÍDO</span> </div> <p class="analise-card__desc" data-astro-cid-mtr5lala>Descubra seu tipo de personalidade principal e seus padrões de motivação profunda.</p> <div class="analise-card__footer" data-astro-cid-mtr5lala> <div class="analise-time" data-astro-cid-mtr5lala> <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-mtr5lala><circle cx="12" cy="12" r="10" data-astro-cid-mtr5lala></circle><polyline points="12 6 12 12 16 14" data-astro-cid-mtr5lala></polyline></svg>
25 min
</div> <span class="analise-action" data-astro-cid-mtr5lala>Ver detalhes &rarr;</span> </div> </a> </div> </div> ` })}`;
}, "/Users/luisnathan/development/mqaccess/src/pages/app/analises.astro", void 0);

const $$file = "/Users/luisnathan/development/mqaccess/src/pages/app/analises.astro";
const $$url = "/app/analises";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Analises,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
