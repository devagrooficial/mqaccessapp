/* empty css               */
import { c as createComponent } from './astro-component_BmOi03Hm.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_BvZ5THv7.mjs';
import { r as renderComponent } from './entrypoint_DMrWqGYU.mjs';
import { $ as $$BaseLayout } from './BaseLayout_9zaNwiSi.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$SucessoFisico = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", ' <!-- Alpine.js --> <script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" defer><\/script>'])), renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Confirmar Entrega", "data-astro-cid-nmmg35lm": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="sf-shell" data-astro-cid-nmmg35lm> <div class="sf-card" id="sf-card" data-astro-cid-nmmg35lm> <!-- Ícone --> <div class="sf-icon-wrap" data-astro-cid-nmmg35lm> <div class="sf-icon-bg" data-astro-cid-nmmg35lm></div> <svg class="sf-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-nmmg35lm> <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" data-astro-cid-nmmg35lm></path> <circle cx="12" cy="10" r="3" data-astro-cid-nmmg35lm></circle> </svg> </div> <!-- Header --> <div class="sf-header" data-astro-cid-nmmg35lm> <p class="sf-tag" data-astro-cid-nmmg35lm>ENTREGA EXCLUSIVA</p> <h1 class="sf-title" data-astro-cid-nmmg35lm>Seu exemplar está reservado</h1> <p class="sf-subtitle" data-astro-cid-nmmg35lm>Para onde devemos enviar sua cópia física de <em data-astro-cid-nmmg35lm>"A Engenharia do Networking"</em>?</p> </div> <!-- Formulário de endereço --> <form class="sf-form" x-data="{ loading: false }" @submit.prevent="loading = true; setTimeout(() => window.location.href = '/app/compras', 2000)" data-astro-cid-nmmg35lm> <!-- CEP --> <div class="sf-field sf-field--full" data-astro-cid-nmmg35lm> <label class="sf-label" for="cep" data-astro-cid-nmmg35lm>CEP</label> <input id="cep" class="sf-input" type="text" placeholder="00000-000" maxlength="9" autocomplete="postal-code" required data-astro-cid-nmmg35lm> </div> <!-- Rua + Número --> <div class="sf-row sf-row--7030" data-astro-cid-nmmg35lm> <div class="sf-field" data-astro-cid-nmmg35lm> <label class="sf-label" for="rua" data-astro-cid-nmmg35lm>Rua / Avenida</label> <input id="rua" class="sf-input" type="text" placeholder="Av. Brigadeiro Faria Lima" autocomplete="address-line1" required data-astro-cid-nmmg35lm> </div> <div class="sf-field" data-astro-cid-nmmg35lm> <label class="sf-label" for="numero" data-astro-cid-nmmg35lm>Número</label> <input id="numero" class="sf-input" type="text" placeholder="3144" required data-astro-cid-nmmg35lm> </div> </div> <!-- Complemento + Bairro --> <div class="sf-row sf-row--equal" data-astro-cid-nmmg35lm> <div class="sf-field" data-astro-cid-nmmg35lm> <label class="sf-label" for="complemento" data-astro-cid-nmmg35lm>Complemento</label> <input id="complemento" class="sf-input" type="text" placeholder="Apto 42 (opcional)" data-astro-cid-nmmg35lm> </div> <div class="sf-field" data-astro-cid-nmmg35lm> <label class="sf-label" for="bairro" data-astro-cid-nmmg35lm>Bairro</label> <input id="bairro" class="sf-input" type="text" placeholder="Itaim Bibi" required data-astro-cid-nmmg35lm> </div> </div> <!-- Cidade + Estado --> <div class="sf-row sf-row--equal" data-astro-cid-nmmg35lm> <div class="sf-field" data-astro-cid-nmmg35lm> <label class="sf-label" for="cidade" data-astro-cid-nmmg35lm>Cidade</label> <input id="cidade" class="sf-input" type="text" placeholder="São Paulo" autocomplete="address-level2" required data-astro-cid-nmmg35lm> </div> <div class="sf-field" data-astro-cid-nmmg35lm> <label class="sf-label" for="estado" data-astro-cid-nmmg35lm>Estado</label> <input id="estado" class="sf-input" type="text" placeholder="SP" maxlength="2" autocomplete="address-level1" required data-astro-cid-nmmg35lm> </div> </div> <!-- Nota de entrega --> <div class="sf-delivery-note" data-astro-cid-nmmg35lm> <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-nmmg35lm> <path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-nmmg35lm></path> </svg> <span data-astro-cid-nmmg35lm>Entrega expressa disponível · Rastreamento em tempo real</span> </div> <!-- CTA --> <button type="submit" class="sf-cta" :disabled="loading" data-astro-cid-nmmg35lm> <span x-show="!loading" data-astro-cid-nmmg35lm>CONFIRMAR ENDEREÇO DE ENTREGA</span> <span x-show="loading" class="sf-loading" data-astro-cid-nmmg35lm> <svg class="sf-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-nmmg35lm> <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" data-astro-cid-nmmg35lm></path> </svg>
Confirmando...
</span> </button> <!-- Skip --> <a href="/app/compras" class="sf-skip" data-astro-cid-nmmg35lm>Pular etapa — preencher depois</a> </form> </div> <p class="sf-footer" data-astro-cid-nmmg35lm>MQ ACCESS · Logística VIP</p> </div> ` }));
}, "/Users/luisnathan/development/mqaccess/src/pages/app/sucesso-fisico.astro", void 0);

const $$file = "/Users/luisnathan/development/mqaccess/src/pages/app/sucesso-fisico.astro";
const $$url = "/app/sucesso-fisico";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$SucessoFisico,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
