/* empty css               */
import { c as createComponent } from './astro-component_BmOi03Hm.mjs';
import 'piccolore';
import './sequence_BvZ5THv7.mjs';
import 'clsx';
import { s as supabase } from './supabase_sj-AEpC3.mjs';

const $$Logout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Logout;
  await supabase.auth.signOut();
  const cookieClear = { path: "/", maxAge: 0 };
  Astro2.cookies.set("sb-access-token", "", cookieClear);
  Astro2.cookies.set("sb-refresh-token", "", cookieClear);
  return Astro2.redirect("/auth/login");
}, "/Users/luisnathan/development/mqaccess/src/pages/auth/logout.astro", void 0);

const $$file = "/Users/luisnathan/development/mqaccess/src/pages/auth/logout.astro";
const $$url = "/auth/logout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Logout,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
