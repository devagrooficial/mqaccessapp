/* empty css               */
import { c as createComponent } from './astro-component_BmOi03Hm.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_BvZ5THv7.mjs';
import { r as renderComponent } from './entrypoint_DMrWqGYU.mjs';
import { r as renderScript } from './BaseLayout_9zaNwiSi.mjs';
import { $ as $$AppLayout } from './AppLayout_zHqYvHsN.mjs';

const $$RastreioLivro = createComponent(($$result, $$props, $$slots) => {
  const steps = [
    {
      id: 1,
      label: "Pedido Confirmado",
      desc: "Pagamento processado com sucesso",
      date: "25 ABR · 14h32",
      state: "done"
    },
    {
      id: 2,
      label: "Preparando para Envio",
      desc: "Seu exemplar está sendo separado e embalado com cuidado",
      date: "26 ABR · Prev. manhã",
      state: "active"
    },
    {
      id: 3,
      label: "Aguardando Coleta",
      desc: "A transportadora realizará a coleta na editora",
      date: "",
      state: "future"
    },
    {
      id: 4,
      label: "Em Trânsito",
      desc: "A caminho do centro de distribuição",
      date: "",
      state: "future"
    },
    {
      id: 5,
      label: "Em Rota de Entrega",
      desc: "Saiu para entrega no seu endereço",
      date: "",
      state: "future"
    },
    {
      id: 6,
      label: "Entregue no Destino",
      desc: "Seu exemplar chegou",
      date: "",
      state: "future"
    }
  ];
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Rastreio do Livro · MQ ACCESS", "data-astro-cid-jm6guksn": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="tr-shell" data-astro-cid-jm6guksn> <!-- Header --> <div class="tr-header" data-astro-cid-jm6guksn> <a href="/app/compras" class="tr-back" data-astro-cid-jm6guksn> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-jm6guksn><path d="M19 12H5M12 19l-7-7 7-7" data-astro-cid-jm6guksn></path></svg>
Minha Biblioteca
</a> <p class="tr-eyebrow" data-astro-cid-jm6guksn>ACOMPANHAMENTO</p> <h1 class="tr-title" data-astro-cid-jm6guksn>Cofre <span class="tr-title--gold" data-astro-cid-jm6guksn>#0042</span></h1> <p class="tr-subtitle" data-astro-cid-jm6guksn>A Engenharia do Networking — Capa Dura · 1ª Edição</p> <!-- Barra de progresso macro --> <div class="tr-macro-bar" data-astro-cid-jm6guksn> <div class="tr-macro-fill" data-astro-cid-jm6guksn></div> </div> <p class="tr-macro-label" data-astro-cid-jm6guksn>2 de 6 etapas concluídas</p> </div> <!-- Timeline --> <div class="tr-timeline" id="tr-timeline" data-astro-cid-jm6guksn> ${steps.map((step, i) => renderTemplate`<div${addAttribute(`tr-step tr-step--${step.state}`, "class")}${addAttribute(i, "data-index")} data-astro-cid-jm6guksn> <!-- Linha vertical --> ${i < steps.length - 1 && renderTemplate`<div${addAttribute(`tr-line ${step.state === "done" ? "tr-line--done" : ""}`, "class")} data-astro-cid-jm6guksn></div>`} <!-- Nó --> <div class="tr-node" data-astro-cid-jm6guksn> ${step.state === "done" && renderTemplate`<div class="tr-node-done" data-astro-cid-jm6guksn> <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" data-astro-cid-jm6guksn><polyline points="20 6 9 17 4 12" data-astro-cid-jm6guksn></polyline></svg> </div>`} ${step.state === "active" && renderTemplate`<div class="tr-node-active" data-astro-cid-jm6guksn> <div class="tr-node-pulse" data-astro-cid-jm6guksn></div> <div class="tr-node-pulse tr-node-pulse--2" data-astro-cid-jm6guksn></div> <div class="tr-node-core" data-astro-cid-jm6guksn></div> </div>`} ${step.state === "future" && renderTemplate`<div class="tr-node-future" data-astro-cid-jm6guksn> <span class="tr-node-num" data-astro-cid-jm6guksn>${step.id.toString().padStart(2, "0")}</span> </div>`} </div> <!-- Conteúdo --> <div class="tr-content" data-astro-cid-jm6guksn> <div class="tr-content-head" data-astro-cid-jm6guksn> <p class="tr-step-label" data-astro-cid-jm6guksn>${step.label}</p> ${step.date && renderTemplate`<span class="tr-step-date" data-astro-cid-jm6guksn>${step.date}</span>`} </div> <p class="tr-step-desc" data-astro-cid-jm6guksn>${step.desc}</p> </div> </div>`)} </div> <!-- Nota de entrega --> <div class="tr-note" data-astro-cid-jm6guksn> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-jm6guksn><circle cx="12" cy="12" r="10" data-astro-cid-jm6guksn></circle><line x1="12" y1="8" x2="12" y2="12" data-astro-cid-jm6guksn></line><line x1="12" y1="16" x2="12.01" y2="16" data-astro-cid-jm6guksn></line></svg>
Previsão de entrega: <strong data-astro-cid-jm6guksn>28 Abr – 02 Mai</strong>. Rastreio expresso com atualizações em tempo real.
</div> <!-- Código de rastreio --> <div class="tr-code-block" data-astro-cid-jm6guksn> <p class="tr-code-label" data-astro-cid-jm6guksn>CÓDIGO DE RASTREIO</p> <p class="tr-code" data-astro-cid-jm6guksn>BR8849201047BR</p> <button class="tr-copy" onclick="navigator.clipboard.writeText('BR8849201047BR')" data-astro-cid-jm6guksn>Copiar</button> </div> </div> ` })} ${renderScript($$result, "/Users/luisnathan/development/mqaccess/src/pages/app/rastreio-livro.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/luisnathan/development/mqaccess/src/pages/app/rastreio-livro.astro", void 0);

const $$file = "/Users/luisnathan/development/mqaccess/src/pages/app/rastreio-livro.astro";
const $$url = "/app/rastreio-livro";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$RastreioLivro,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
