/* empty css               */
import { c as createComponent } from './astro-component_BmOi03Hm.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_BvZ5THv7.mjs';
import { r as renderComponent } from './entrypoint_DMrWqGYU.mjs';
import { $ as $$AppLayout } from './AppLayout_zHqYvHsN.mjs';

const $$Pergunta = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Avaliação - Passo 1", "activeNav": "analises", "data-astro-cid-ooqvgjq7": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="question-page" data-astro-cid-ooqvgjq7> <!-- Indicador de Progresso --> <div class="progress-container" data-astro-cid-ooqvgjq7> <div class="progress-bar" data-astro-cid-ooqvgjq7> <div class="progress-fill" style="width: 33%;" data-astro-cid-ooqvgjq7></div> </div> <p class="progress-text" data-astro-cid-ooqvgjq7>Passo 1 de 3</p> </div> <!-- Pergunta --> <div class="question-container" data-astro-cid-ooqvgjq7> <h1 class="question-title" data-astro-cid-ooqvgjq7>
Em reuniões de alta pressão, como você costuma reagir a críticas diretas?
</h1> <!-- Opções --> <div class="options-grid" data-astro-cid-ooqvgjq7> <!-- Option 1 --> <label class="option-card" data-astro-cid-ooqvgjq7> <input type="radio" name="answer" class="option-radio sr-only" data-astro-cid-ooqvgjq7> <div class="option-custom-radio" data-astro-cid-ooqvgjq7></div> <span class="option-text" data-astro-cid-ooqvgjq7>Tento manter a calma e peço dados concretos que embasem a crítica.</span> </label> <!-- Option 2 --> <label class="option-card" data-astro-cid-ooqvgjq7> <input type="radio" name="answer" class="option-radio sr-only" data-astro-cid-ooqvgjq7> <div class="option-custom-radio" data-astro-cid-ooqvgjq7></div> <span class="option-text" data-astro-cid-ooqvgjq7>Respondo na mesma intensidade para garantir o controle da narrativa.</span> </label> <!-- Option 3 --> <label class="option-card" data-astro-cid-ooqvgjq7> <input type="radio" name="answer" class="option-radio sr-only" data-astro-cid-ooqvgjq7> <div class="option-custom-radio" data-astro-cid-ooqvgjq7></div> <span class="option-text" data-astro-cid-ooqvgjq7>Busco desviar o foco ou apaziguar os ânimos rapidamente para evitar atrito.</span> </label> <!-- Option 4 --> <label class="option-card" data-astro-cid-ooqvgjq7> <input type="radio" name="answer" class="option-radio sr-only" data-astro-cid-ooqvgjq7> <div class="option-custom-radio" data-astro-cid-ooqvgjq7></div> <span class="option-text" data-astro-cid-ooqvgjq7>Defendo firmemente minha equipe e assumo a responsabilidade imediatamente.</span> </label> </div> </div> <!-- Navegação --> <div class="question-footer" data-astro-cid-ooqvgjq7> <a href="/app/analise-detalhes" class="btn-nav btn-outline" data-astro-cid-ooqvgjq7>Anterior</a> <a href="/app/relatorio" class="btn-nav btn-solid" data-astro-cid-ooqvgjq7>Finalizar</a> </div> </div> ` })}`;
}, "/Users/luisnathan/development/mqaccess/src/pages/app/pergunta.astro", void 0);

const $$file = "/Users/luisnathan/development/mqaccess/src/pages/app/pergunta.astro";
const $$url = "/app/pergunta";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Pergunta,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
