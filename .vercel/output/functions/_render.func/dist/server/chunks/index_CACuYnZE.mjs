/* empty css               */
import { c as createComponent } from './astro-component_BmOi03Hm.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_BvZ5THv7.mjs';
import { r as renderComponent } from './entrypoint_DMrWqGYU.mjs';
import { $ as $$AppLayout } from './AppLayout_zHqYvHsN.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const menuItems = [
    { label: "Editar Perfil", href: "#editar", icon: "user" },
    { label: "Minhas Anotações", href: "#anotacoes", icon: "note" },
    { label: "Favoritos", href: "#favoritos", icon: "heart" },
    { label: "Notificações", href: "#notificacoes", icon: "bell" },
    { label: "Link de Afiliação", href: "#afiliacao", icon: "link", premium: true }
  ];
  const legalItems = [
    { label: "Termos de Uso", href: "#termos" },
    { label: "Ajuda", href: "#ajuda" },
    { label: "Suporte", href: "#suporte" }
  ];
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Perfil", "activeNav": "perfil", "data-astro-cid-kzaq3glh": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="perfil-page" data-astro-cid-kzaq3glh> <!-- Header do perfil --> <div class="perfil-header" data-astro-cid-kzaq3glh> <div class="perfil-avatar" data-astro-cid-kzaq3glh> <span class="perfil-avatar__initials" data-astro-cid-kzaq3glh>MQ</span> </div> <div class="perfil-identity" data-astro-cid-kzaq3glh> <h1 class="perfil-name" data-astro-cid-kzaq3glh>Mario Quirino</h1> <p class="perfil-email" data-astro-cid-kzaq3glh>mario@mqaccess.com.br</p> <span class="badge-gold" data-astro-cid-kzaq3glh>Membro PRO</span> </div> </div> <!-- Menu principal --> <nav class="menu-section" data-astro-cid-kzaq3glh> ${menuItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="menu-item" data-astro-cid-kzaq3glh> <span class="menu-item__label" data-astro-cid-kzaq3glh> ${item.label} ${item.premium && renderTemplate`<span class="badge-gold menu-badge" data-astro-cid-kzaq3glh>Premium</span>`} </span> <svg class="menu-item__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-kzaq3glh> <polyline points="9 18 15 12 9 6" data-astro-cid-kzaq3glh></polyline> </svg> </a>`)} </nav> <hr class="divider" data-astro-cid-kzaq3glh> <!-- Menu legal --> <nav class="menu-section" data-astro-cid-kzaq3glh> ${legalItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="menu-item" data-astro-cid-kzaq3glh> <span class="menu-item__label" data-astro-cid-kzaq3glh>${item.label}</span> <svg class="menu-item__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-kzaq3glh> <polyline points="9 18 15 12 9 6" data-astro-cid-kzaq3glh></polyline> </svg> </a>`)} </nav> <hr class="divider" data-astro-cid-kzaq3glh> <!-- Sair --> <a href="/auth/login" class="menu-item menu-item--destructive" id="logout-btn" data-astro-cid-kzaq3glh> <span class="menu-item__label" data-astro-cid-kzaq3glh>Sair</span> </a> </div> ` })}`;
}, "/Users/luisnathan/development/mqaccess/src/pages/app/perfil/index.astro", void 0);

const $$file = "/Users/luisnathan/development/mqaccess/src/pages/app/perfil/index.astro";
const $$url = "/app/perfil";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
