/* empty css               */
import { c as createComponent } from './astro-component_BmOi03Hm.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_BvZ5THv7.mjs';
import { r as renderComponent } from './entrypoint_DMrWqGYU.mjs';
import { $ as $$AppLayout } from './AppLayout_zHqYvHsN.mjs';
import { s as supabase } from './supabase_sj-AEpC3.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const brl = (cents) => (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const dateParts = (iso) => {
    const d = new Date(iso);
    return {
      day: d.getUTCDate().toString().padStart(2, "0"),
      month: d.toLocaleString("pt-BR", { month: "short", timeZone: "UTC" }).toUpperCase().replace(".", "")
    };
  };
  const userId = Astro2.locals.user?.id ?? "";
  const [
    { data: courses },
    { data: books },
    { data: events },
    { data: profile }
  ] = await Promise.all([
    // Masterclasses em destaque (máx 6)
    supabase.from("products").select("id, title, author, thumbnail_url, price_brl").eq("type", "masterclass").eq("is_active", true).order("created_at", { ascending: false }).limit(6),
    // Livros (ebook + physical_book)
    supabase.from("products").select("id, title, author, cover_url, product_format").in("type", ["ebook", "physical_book"]).eq("is_active", true).limit(4),
    // Próximos eventos (data futura)
    supabase.from("events").select("id, title, date, venue_name, banner_url").eq("is_active", true).gte("date", (/* @__PURE__ */ new Date()).toISOString()).order("date", { ascending: true }).limit(3),
    // Profile do usuário logado
    userId ? supabase.from("profiles").select("full_name").eq("id", userId).single() : Promise.resolve({ data: null })
  ]);
  const courseList = courses ?? [];
  const bookList = books ?? [];
  const eventList = events ?? [];
  const firstName = profile?.full_name?.split(" ")[0] ?? "Executivo";
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Home", "activeNav": "home", "data-astro-cid-e7zjaujz": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="home-page" data-astro-cid-e7zjaujz> <!-- Saudação --> <section class="home-greeting" data-astro-cid-e7zjaujz> <p class="greeting-label" data-astro-cid-e7zjaujz>Bem-vindo de volta,</p> <h1 class="greeting-name" data-astro-cid-e7zjaujz>${firstName} <span class="greeting-badge badge-gold" data-astro-cid-e7zjaujz>PRO</span></h1> </section> <!-- KPIs / Análises --> <section class="home-section" id="analises" data-astro-cid-e7zjaujz> <h2 class="section-title" data-astro-cid-e7zjaujz>Análises</h2> <div class="kpi-grid" data-astro-cid-e7zjaujz> <div class="card card-reveal kpi-card" data-astro-cid-e7zjaujz> <p class="kpi-label" data-astro-cid-e7zjaujz>Cursos Concluídos</p> <p class="kpi-value" data-astro-cid-e7zjaujz>3</p> </div> <div class="card card-reveal kpi-card" data-astro-cid-e7zjaujz> <p class="kpi-label" data-astro-cid-e7zjaujz>Eventos Participados</p> <p class="kpi-value" data-astro-cid-e7zjaujz>1</p> </div> <div class="card card-reveal kpi-card" data-astro-cid-e7zjaujz> <p class="kpi-label" data-astro-cid-e7zjaujz>Assinatura</p> <p class="kpi-value kpi-value--gold" data-astro-cid-e7zjaujz>Ativa</p> </div> <div class="card card-reveal kpi-card" data-astro-cid-e7zjaujz> <p class="kpi-label" data-astro-cid-e7zjaujz>Livros na Biblioteca</p> <p class="kpi-value" data-astro-cid-e7zjaujz>7</p> </div> </div> </section> <!-- Mapeamento Comportamental Banner --> <section class="home-section" data-astro-cid-e7zjaujz> <div class="w-full bg-gradient-to-r from-[#111] to-[#000] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6" data-astro-cid-e7zjaujz> <div class="flex items-start gap-4" data-astro-cid-e7zjaujz> <div class="text-[#D4AF37] shrink-0 mt-1" data-astro-cid-e7zjaujz> <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-e7zjaujz><circle cx="12" cy="12" r="10" data-astro-cid-e7zjaujz></circle><circle cx="12" cy="12" r="6" data-astro-cid-e7zjaujz></circle><circle cx="12" cy="12" r="2" data-astro-cid-e7zjaujz></circle></svg> </div> <div data-astro-cid-e7zjaujz> <h2 class="font-serif text-2xl font-bold text-white mb-2" style="font-family: 'Playfair Display', serif;" data-astro-cid-e7zjaujz>Mapeamento Comportamental</h2> <p class="text-sm text-gray-400" data-astro-cid-e7zjaujz>Descubra seus vieses de decisão e seu perfil de liderança sob pressão.</p> </div> </div> <a href="/app/analises" class="bg-[#D4AF37] text-black font-bold px-8 py-3 rounded-lg hover:bg-white transition-colors text-sm text-center w-full md:w-auto shrink-0" data-astro-cid-e7zjaujz>
ACESSAR MINHAS ANÁLISES
</a> </div> </section> <!-- Cursos em Destaque --> <section class="home-section" id="cursos" data-astro-cid-e7zjaujz> <div class="section-header" data-astro-cid-e7zjaujz> <h2 class="section-title" data-astro-cid-e7zjaujz>Cursos em Destaque</h2> <a href="/app/detalhes" class="section-link" data-astro-cid-e7zjaujz>Ver todos</a> </div> <div class="courses-scroll" data-astro-cid-e7zjaujz> ${courseList.length > 0 ? courseList.map((course) => renderTemplate`<a${addAttribute(`/app/detalhes?id=${course.id}`, "href")} class="card card-reveal course-card" style="text-decoration:none;display:block;" data-astro-cid-e7zjaujz> <div class="course-thumb" data-astro-cid-e7zjaujz> <img${addAttribute(course.thumbnail_url ?? "/protocolo-clevel-thumb.png", "src")}${addAttribute(course.title, "alt")} class="course-thumb__img" loading="lazy" data-astro-cid-e7zjaujz> </div> <div class="course-info" data-astro-cid-e7zjaujz> <p class="course-instructor" data-astro-cid-e7zjaujz>${course.author ?? "Mario Quirino"}</p> <h3 class="course-title" data-astro-cid-e7zjaujz>${course.title}</h3> <div class="course-footer" data-astro-cid-e7zjaujz> <span class="badge-gold" data-astro-cid-e7zjaujz>Exclusivo</span> <span class="btn-primary course-cta" data-astro-cid-e7zjaujz> ${course.price_brl ? brl(course.price_brl) : "Adquirir"} </span> </div> </div> </a>`) : renderTemplate`<p style="color:#4A4A4A;font-size:0.875rem;padding:8px 0" data-astro-cid-e7zjaujz>Nenhum curso disponível no momento.</p>`} </div> </section> <!-- Livros --> <section class="home-section" id="livros" data-astro-cid-e7zjaujz> <div class="section-header" data-astro-cid-e7zjaujz> <h2 class="section-title" data-astro-cid-e7zjaujz>Livros</h2> <a href="/app/detalhes-livro" class="section-link" data-astro-cid-e7zjaujz>Ver biblioteca</a> </div> <div class="books-grid" data-astro-cid-e7zjaujz> ${bookList.length > 0 ? bookList.map((book) => renderTemplate`<a${addAttribute(`/app/detalhes-livro?id=${book.id}`, "href")} class="card card-reveal book-card" style="text-decoration:none;display:flex;flex-direction:column;" data-astro-cid-e7zjaujz> <div class="book-cover" data-astro-cid-e7zjaujz> <img${addAttribute(book.cover_url ?? "/codigo-executivo-cover.png", "src")}${addAttribute(book.title, "alt")} class="book-cover__img" loading="lazy" data-astro-cid-e7zjaujz> </div> <p class="book-author" data-astro-cid-e7zjaujz>${book.author ?? "Mario Quirino"}</p> <h3 class="book-title" data-astro-cid-e7zjaujz>${book.title}</h3> <span class="badge-gold" style="margin:0 12px 12px;" data-astro-cid-e7zjaujz> ${book.product_format === "physical" ? "Físico + Digital" : "Digital"} </span> </a>`) : renderTemplate`<p style="color:#4A4A4A;font-size:0.875rem;padding:8px 0" data-astro-cid-e7zjaujz>Nenhum livro disponível.</p>`} </div> </section> <!-- Próximos Eventos --> <section class="home-section" id="eventos" data-astro-cid-e7zjaujz> <div class="section-header" data-astro-cid-e7zjaujz> <h2 class="section-title" data-astro-cid-e7zjaujz>Próximos Eventos</h2> <a href="/app/detalhes-evento" class="section-link" data-astro-cid-e7zjaujz>Ver todos</a> </div> <div class="events-list" data-astro-cid-e7zjaujz> ${eventList.length > 0 ? eventList.map((ev) => {
    const { day, month } = dateParts(ev.date);
    return renderTemplate`<a${addAttribute(`/app/detalhes-evento?id=${ev.id}`, "href")} class="card card-reveal event-card" style="text-decoration:none;overflow:hidden;" data-astro-cid-e7zjaujz> <div class="event-img-col" data-astro-cid-e7zjaujz> <img${addAttribute(ev.banner_url ?? "/summit-mq-banner.png", "src")}${addAttribute(ev.title, "alt")} class="event-img" loading="lazy" data-astro-cid-e7zjaujz> </div> <div class="event-date" data-astro-cid-e7zjaujz> <p class="event-day" data-astro-cid-e7zjaujz>${day}</p> <p class="event-month" data-astro-cid-e7zjaujz>${month}</p> </div> <div class="event-info" data-astro-cid-e7zjaujz> <p class="event-location" data-astro-cid-e7zjaujz>${ev.venue_name ?? "—"}</p> <h3 class="event-name" data-astro-cid-e7zjaujz>${ev.title}</h3> </div> <span class="btn-primary event-cta" data-astro-cid-e7zjaujz>Garantir</span> </a>`;
  }) : renderTemplate`<p style="color:#4A4A4A;font-size:0.875rem;padding:8px 0" data-astro-cid-e7zjaujz>Nenhum evento próximo agendado.</p>`} </div> </section> </div> ` })}`;
}, "/Users/luisnathan/development/mqaccess/src/pages/app/home/index.astro", void 0);

const $$file = "/Users/luisnathan/development/mqaccess/src/pages/app/home/index.astro";
const $$url = "/app/home";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
