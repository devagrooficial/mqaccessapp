/* empty css               */
import { c as createComponent } from './astro-component_BmOi03Hm.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_BvZ5THv7.mjs';
import { r as renderComponent } from './entrypoint_DMrWqGYU.mjs';
import { $ as $$AppLayout } from './AppLayout_zHqYvHsN.mjs';
import { s as supabase } from './supabase_sj-AEpC3.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const userId = Astro2.locals.user?.id ?? "";
  const { data: purchases } = userId ? await supabase.from("purchases").select(`
        id,
        payment_status,
        created_at,
        products (
          id,
          type,
          title,
          author,
          thumbnail_url,
          cover_url
        )
      `).eq("user_id", userId).eq("payment_status", "approved") : { data: [] };
  const digitalPurchases = purchases?.filter(
    (p) => ["masterclass", "ebook"].includes(p.products?.type)
  ) ?? [];
  purchases?.filter(
    (p) => p.products?.type === "event"
  ) ?? [];
  const { data: userTickets } = userId ? await supabase.from("tickets").select("*, events(*), event_ticket_tiers(*)").eq("user_id", userId) : { data: [] };
  const formatEventDate = (dateString, city) => {
    if (!dateString) return city ?? "Local a definir";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("pt-BR", { month: "long" });
    const fmtMonth = month.charAt(0).toUpperCase() + month.slice(1);
    return `${day} de ${fmtMonth} · ${city ?? "Local a definir"}`;
  };
  const { data: bookOrders } = userId ? await supabase.from("physical_book_orders").select("*, products(*)").eq("user_id", userId) : { data: [] };
  return renderTemplate(_a || (_a = __template(["", " <!-- is:inline garante execução no browser (não bundled) — essencial no SSR com View Transitions --> <script>\n  function initTabs() {\n    const tabBtns  = document.querySelectorAll('[data-tab-target]');\n    const tabPanels = document.querySelectorAll('[data-tab-content]');\n\n    if (!tabBtns.length) return;\n\n    function activateTab(targetId) {\n      // Painéis: mostra o alvo, esconde os demais\n      tabPanels.forEach(function(panel) {\n        if (panel.id === targetId) {\n          panel.classList.remove('hidden');\n        } else {\n          panel.classList.add('hidden');\n        }\n      });\n\n      // Botões: estilo ativo/inativo\n      tabBtns.forEach(function(btn) {\n        const isActive = btn.dataset.tabTarget === targetId;\n        btn.classList.toggle('active', isActive);\n        btn.setAttribute('aria-selected', String(isActive));\n      });\n    }\n\n    // Ativa a primeira aba ao inicializar\n    const firstTab = tabBtns[0];\n    activateTab(firstTab.dataset.tabTarget);\n\n    // Click em cada botão\n    tabBtns.forEach(function(btn) {\n      btn.addEventListener('click', function() {\n        activateTab(btn.dataset.tabTarget);\n      });\n    });\n  }\n\n  // Roda na carga inicial\n  initTabs();\n\n  // Re-roda após cada navegação via View Transitions (Astro ClientRouter)\n  document.addEventListener('astro:page-load', initTabs);\n<\/script>"])), renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Minhas Compras", "activeNav": "compras", "data-astro-cid-bqogvzwh": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="compras-page" data-astro-cid-bqogvzwh> <header class="page-header" data-astro-cid-bqogvzwh> <h1 class="page-title" data-astro-cid-bqogvzwh>Minhas Compras</h1> </header> <!-- TabBar interna --> <div class="tab-bar" id="compras-tabs" data-astro-cid-bqogvzwh> <button class="tab-item" data-tab-target="panel-digital" id="tab-digital" aria-selected="true" data-astro-cid-bqogvzwh>Digital</button> <button class="tab-item" data-tab-target="panel-eventos" id="tab-eventos" aria-selected="false" data-astro-cid-bqogvzwh>Eventos</button> <button class="tab-item" data-tab-target="panel-livros" id="tab-livros" aria-selected="false" data-astro-cid-bqogvzwh>Livros</button> </div> <!-- ══ Painel Digital ══════════════════════════════════════════════════ --> <div class="tab-panel" data-tab-content="panel-digital" id="panel-digital" data-astro-cid-bqogvzwh> <div class="purchases-list" data-astro-cid-bqogvzwh> <!-- Assinatura (sempre fixo) --> <div class="card purchase-item" data-astro-cid-bqogvzwh> <div class="purchase-icon purchase-icon--subscription" data-astro-cid-bqogvzwh></div> <div class="purchase-info" data-astro-cid-bqogvzwh> <p class="purchase-type" data-astro-cid-bqogvzwh>Assinatura</p> <h3 class="purchase-name" data-astro-cid-bqogvzwh>MQ ACCESS — Plano Anual</h3> <p class="purchase-status" data-astro-cid-bqogvzwh> <span class="status-dot status-dot--active" data-astro-cid-bqogvzwh></span>
Renova em 12 jan 2027
</p> </div> <span class="badge-gold" data-astro-cid-bqogvzwh>Ativa</span> </div> <!-- Compras digitais do banco --> ${digitalPurchases.length > 0 ? digitalPurchases.map((p) => {
    const prod = p.products;
    return renderTemplate`<div class="card purchase-item" data-astro-cid-bqogvzwh> <div class="purchase-thumb" data-astro-cid-bqogvzwh> ${prod.thumbnail_url ? renderTemplate`<img${addAttribute(prod.thumbnail_url, "src")}${addAttribute(prod.title, "alt")} class="purchase-thumb__img" loading="lazy" data-astro-cid-bqogvzwh>` : renderTemplate`<div class="purchase-icon purchase-icon--course" data-astro-cid-bqogvzwh></div>`} </div> <div class="purchase-info" data-astro-cid-bqogvzwh> <p class="purchase-type" data-astro-cid-bqogvzwh>${prod.type === "ebook" ? "E-book" : "Curso"}</p> <h3 class="purchase-name" data-astro-cid-bqogvzwh>${prod.title}</h3> <p class="purchase-status" data-astro-cid-bqogvzwh> <span class="status-dot status-dot--active" data-astro-cid-bqogvzwh></span>
Acesso ativo
</p> </div> <a${addAttribute(`/app/player?id=${prod.id}`, "href")} class="btn-secondary purchase-action" data-astro-cid-bqogvzwh>Acessar</a> </div>`;
  }) : renderTemplate`<div class="empty-state" data-astro-cid-bqogvzwh> <p class="empty-title" data-astro-cid-bqogvzwh>Nenhum curso adquirido</p> <p class="empty-sub" data-astro-cid-bqogvzwh>Explore o catálogo e adquira sua primeira masterclass.</p> <a href="/app/home" class="btn-primary" style="display:inline-flex;align-items:center;padding:10px 20px;font-size:0.875rem;" data-astro-cid-bqogvzwh>Ver Catálogo</a> </div>`} </div> </div> <!-- ══ Painel Eventos ══════════════════════════════════════════════════ --> <div class="tab-panel hidden" data-tab-content="panel-eventos" id="panel-eventos" data-astro-cid-bqogvzwh> <div class="purchases-list" data-astro-cid-bqogvzwh> ${userTickets && userTickets.length > 0 ? userTickets.map((ticket) => {
    const ev = ticket.events;
    const tier = ticket.event_ticket_tiers;
    return renderTemplate`<a${addAttribute(`/app/ingresso?id=${ticket.id}`, "href")} class="card purchase-item purchase-item--link" data-astro-cid-bqogvzwh> <div class="purchase-icon purchase-icon--event" data-astro-cid-bqogvzwh></div> <div class="purchase-info" data-astro-cid-bqogvzwh> <p class="purchase-type" data-astro-cid-bqogvzwh>${tier?.name?.toUpperCase() ?? "INGRESSO"}</p> <h3 class="purchase-name" data-astro-cid-bqogvzwh>${ev?.title ?? "Evento"}</h3> <p class="purchase-status" data-astro-cid-bqogvzwh> ${formatEventDate(ev?.date ?? null, ev?.city ?? "São Paulo")} </p> </div> <span class="btn-secondary purchase-action" data-astro-cid-bqogvzwh>Ver QR</span> </a>`;
  }) : renderTemplate`<div class="empty-state" data-astro-cid-bqogvzwh> <p class="empty-title" data-astro-cid-bqogvzwh>Nenhum ingresso adquirido</p> <p class="empty-sub" data-astro-cid-bqogvzwh>Seus ingressos para eventos aparecerão aqui após a compra.</p> <a href="/app/home" class="btn-primary" style="display:inline-flex;align-items:center;padding:10px 20px;font-size:0.875rem;" data-astro-cid-bqogvzwh>Ver Eventos</a> </div>`} </div> </div> <!-- ══ Painel Livros ═══════════════════════════════════════════════════ --> <div class="tab-panel hidden" data-tab-content="panel-livros" id="panel-livros" data-astro-cid-bqogvzwh> <div class="books-library-grid" data-astro-cid-bqogvzwh> ${bookOrders && bookOrders.length > 0 ? bookOrders.map((order) => {
    const prod = order.products;
    return renderTemplate`<a${addAttribute(`/app/rastreio-livro?id=${order.id}`, "href")} class="card library-book-card library-book-card--link" data-astro-cid-bqogvzwh> <div class="library-book-cover" data-astro-cid-bqogvzwh> ${prod?.cover_url ? renderTemplate`<img${addAttribute(prod.cover_url, "src")}${addAttribute(prod.title, "alt")} class="library-book-cover__img" loading="lazy" data-astro-cid-bqogvzwh>` : renderTemplate`<div class="library-book-cover__placeholder" data-astro-cid-bqogvzwh></div>`} </div> <div class="library-book-info" data-astro-cid-bqogvzwh> <h3 class="library-book-title" data-astro-cid-bqogvzwh>${prod?.title ?? "Livro"}</h3> <p class="library-book-format" data-astro-cid-bqogvzwh>
Livro Físico
${order.order_code && renderTemplate`<span class="library-book-code" data-astro-cid-bqogvzwh> · Pedido ${order.order_code}</span>`} </p> <span class="btn-secondary library-book-cta" data-astro-cid-bqogvzwh>Rastrear</span> </div> </a>`;
  }) : renderTemplate`<div class="empty-state" style="grid-column: 1 / -1;" data-astro-cid-bqogvzwh> <p class="empty-title" data-astro-cid-bqogvzwh>Nenhum pedido de livro físico</p> <p class="empty-sub" data-astro-cid-bqogvzwh>Seus pedidos de livros aparecerão aqui após a compra.</p> <a href="/app/home" class="btn-primary" style="display:inline-flex;align-items:center;padding:10px 20px;font-size:0.875rem;" data-astro-cid-bqogvzwh>Ver Catálogo</a> </div>`} </div> </div> </div> ` }));
}, "/Users/luisnathan/development/mqaccess/src/pages/app/compras/index.astro", void 0);

const $$file = "/Users/luisnathan/development/mqaccess/src/pages/app/compras/index.astro";
const $$url = "/app/compras";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
