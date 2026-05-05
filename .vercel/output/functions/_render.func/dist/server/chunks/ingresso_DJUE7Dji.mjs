/* empty css               */
import { c as createComponent } from './astro-component_BmOi03Hm.mjs';
import 'piccolore';
import { T as renderTemplate, b9 as defineScriptVars, B as maybeRenderHead } from './sequence_BvZ5THv7.mjs';
import { r as renderComponent } from './entrypoint_DMrWqGYU.mjs';
import { r as renderScript } from './BaseLayout_9zaNwiSi.mjs';
import { $ as $$AppLayout } from './AppLayout_zHqYvHsN.mjs';
import { s as supabase } from './supabase_sj-AEpC3.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Ingresso = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Ingresso;
  const ticketId = Astro2.url.searchParams.get("id");
  if (!ticketId) return Astro2.redirect("/app/compras");
  const { data: ticket, error: ticketError } = await supabase.from("tickets").select("*, events(*), event_ticket_tiers(*)").eq("id", ticketId).single();
  if (ticketError || !ticket) {
    console.error("❌ ERRO TICKET:", ticketError?.code, ticketError?.message);
    return Astro2.redirect("/app/compras");
  }
  const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", ticket.user_id).single();
  const ev = ticket.events;
  const tier = ticket.event_ticket_tiers;
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).toUpperCase();
  };
  const titular = profile?.full_name ?? "Titular do Ingresso";
  const eventTitle = ev?.title ?? "Evento";
  const eventDate = formatDate(ev?.date ?? null);
  const eventVenue = ev?.venue_name ?? ev?.city ?? "Local a definir";
  const tierName = tier?.name ?? "VIP";
  const ticketCode = ticket.ticket_code ?? ticketId.slice(0, 8).toUpperCase();
  const qrPayload = ticket.qr_payload ?? `MQ-${ticketCode}`;
  return renderTemplate(_a || (_a = __template(["", " <!-- ── GSAP: animação de entrada ──────────────────────────────────────────── --> ", ' <!-- ── CDN: QR Code + html2canvas ────────────────────────────────────────── --> <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"><\/script> <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"><\/script> <!-- ── Motor interativo (define:vars injeta SSR → client) ────────────────── --> <script>(function(){', "\n  (function initTicket() {\n    // 1. GERAR QR CODE REAL ──────────────────────────────────────────────────\n    var container = document.getElementById('qrcode-container');\n    if (container && qrPayload && typeof QRCode !== 'undefined') {\n      container.innerHTML = ''; // limpa render anterior (SPA / hot-reload)\n      new QRCode(container, {\n        text:         qrPayload,\n        width:        200,\n        height:       200,\n        colorDark:    '#000000',\n        colorLight:   '#ffffff',\n        correctLevel: QRCode.CorrectLevel.H,\n      });\n    }\n\n    // 2. COMPARTILHAR ────────────────────────────────────────────────────────\n    var btnShare = document.getElementById('btn-share');\n    if (btnShare) {\n      btnShare.addEventListener('click', async function() {\n        if (navigator.share) {\n          try {\n            await navigator.share({\n              title: 'Ingresso: ' + eventTitle,\n              text:  'Aqui está meu ingresso para o evento!',\n              url:   window.location.href,\n            });\n          } catch (err) {\n            // Cancelado pelo usuário — silencioso\n          }\n        } else {\n          // Fallback desktop: copia o link\n          navigator.clipboard.writeText(window.location.href);\n          var orig = btnShare.innerHTML;\n          btnShare.innerHTML = '✓ Link copiado!';\n          setTimeout(function() { btnShare.innerHTML = orig; }, 2200);\n        }\n      });\n    }\n\n    // 3. SALVAR COMO IMAGEM ──────────────────────────────────────────────────\n    var btnSave     = document.getElementById('btn-save');\n    var captureArea = document.getElementById('ticket-capture-area');\n    if (btnSave && captureArea && typeof html2canvas !== 'undefined') {\n      btnSave.addEventListener('click', function() {\n        var orig = btnSave.innerHTML;\n        btnSave.innerHTML = 'Gerando...';\n        btnSave.disabled  = true;\n\n        html2canvas(captureArea, {\n          backgroundColor: '#0a0a0a',\n          scale:           2,         // resolução 2× para telas retina\n          useCORS:         true,\n          logging:         false,\n        }).then(function(canvas) {\n          var link      = document.createElement('a');\n          link.download = 'ingresso-' + ticketCode + '.png';\n          link.href     = canvas.toDataURL('image/png');\n          link.click();\n\n          btnSave.innerHTML = '✓ Salvo';\n          setTimeout(function() {\n            btnSave.innerHTML = orig;\n            btnSave.disabled  = false;\n          }, 3000);\n        }).catch(function(err) {\n          console.error('html2canvas error:', err);\n          btnSave.innerHTML = orig;\n          btnSave.disabled  = false;\n        });\n      });\n    }\n  })();\n\n  // Re-inicializa após View Transitions\n  document.addEventListener('astro:page-load', initTicket);\n})();<\/script>"])), renderComponent($$result, "AppLayout", $$AppLayout, { "title": `Ingresso · ${eventTitle}`, "data-astro-cid-zbl3tdhc": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="ig-shell" data-astro-cid-zbl3tdhc> <!-- Voltar --> <div class="ig-nav" data-astro-cid-zbl3tdhc> <a href="/app/compras" class="ig-back" data-astro-cid-zbl3tdhc> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-zbl3tdhc><path d="M19 12H5M12 19l-7-7 7-7" data-astro-cid-zbl3tdhc></path></svg>
Minhas Compras
</a> </div> <!-- ══ ÁREA DE CAPTURA (html2canvas) ══════════════════════════════════ --> <div id="ticket-capture-area" class="ig-capture-area" data-astro-cid-zbl3tdhc> <!-- Ticket central --> <div class="ig-ticket" id="ig-ticket" data-astro-cid-zbl3tdhc> <!-- Cabeçalho --> <div class="ig-ticket-head" data-astro-cid-zbl3tdhc> <div class="ig-logo-group" data-astro-cid-zbl3tdhc> <img src="/images/logohorizontal.png" alt="MQ Access" class="h-4 w-auto object-contain" data-astro-cid-zbl3tdhc> </div> <span class="ig-vip-badge" data-astro-cid-zbl3tdhc>${tierName.toUpperCase()}</span> </div> <!-- Divisor tracejado --> <div class="ig-divider-dash" data-astro-cid-zbl3tdhc></div> <!-- Info do evento --> <div class="ig-event-info" data-astro-cid-zbl3tdhc> <h1 class="ig-event-title" data-astro-cid-zbl3tdhc>${eventTitle}</h1> <div class="ig-event-meta" data-astro-cid-zbl3tdhc> ${eventDate && renderTemplate`<div class="ig-meta-item" data-astro-cid-zbl3tdhc> <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-zbl3tdhc><rect x="3" y="4" width="18" height="18" rx="2" data-astro-cid-zbl3tdhc></rect><line x1="16" y1="2" x2="16" y2="6" data-astro-cid-zbl3tdhc></line><line x1="8" y1="2" x2="8" y2="6" data-astro-cid-zbl3tdhc></line><line x1="3" y1="10" x2="21" y2="10" data-astro-cid-zbl3tdhc></line></svg> <span data-astro-cid-zbl3tdhc>${eventDate}</span> </div>`} <div class="ig-meta-item" data-astro-cid-zbl3tdhc> <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-zbl3tdhc><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" data-astro-cid-zbl3tdhc></path><circle cx="12" cy="10" r="3" data-astro-cid-zbl3tdhc></circle></svg> <span data-astro-cid-zbl3tdhc>${eventVenue}</span> </div> </div> </div> <!-- Perfuração estilo ticket físico --> <div class="ig-perforation" data-astro-cid-zbl3tdhc> <div class="ig-perf-cut ig-perf-cut--l" data-astro-cid-zbl3tdhc></div> <div class="ig-perf-line" data-astro-cid-zbl3tdhc></div> <div class="ig-perf-cut ig-perf-cut--r" data-astro-cid-zbl3tdhc></div> </div> <!-- QR Code — container real (qrcodejs injeta aqui) --> <div class="ig-qr-section" id="ig-qr" data-astro-cid-zbl3tdhc> <div class="ig-qr-glow" data-astro-cid-zbl3tdhc></div> <div class="ig-qr-wrap" data-astro-cid-zbl3tdhc> <div id="qrcode-container" style="width:200px;height:200px;background:#fff;display:flex;align-items:center;justify-content:center;line-height:0;" data-astro-cid-zbl3tdhc></div> </div> <p class="ig-qr-hint" data-astro-cid-zbl3tdhc>Apresente este código na portaria para validação prioritária.</p> <p class="ig-qr-code" data-astro-cid-zbl3tdhc>#${ticketCode}</p> </div> <!-- Rodapé --> <div class="ig-ticket-foot" data-astro-cid-zbl3tdhc> <div class="ig-foot-item" data-astro-cid-zbl3tdhc> <span class="ig-foot-label" data-astro-cid-zbl3tdhc>TITULAR</span> <span class="ig-foot-value" data-astro-cid-zbl3tdhc>${titular}</span> </div> <div class="ig-foot-item" data-astro-cid-zbl3tdhc> <span class="ig-foot-label" data-astro-cid-zbl3tdhc>CATEGORIA</span> <span class="ig-foot-value" data-astro-cid-zbl3tdhc>${tierName}</span> </div> <div class="ig-foot-item" data-astro-cid-zbl3tdhc> <span class="ig-foot-label" data-astro-cid-zbl3tdhc>ACESSO</span> <span class="ig-foot-value ig-foot-value--gold" data-astro-cid-zbl3tdhc>Confirmado</span> </div> </div> </div><!-- /ig-ticket --> </div><!-- /ticket-capture-area --> <!-- Botões de ação --> <div class="ig-actions" data-astro-cid-zbl3tdhc> <button id="btn-save" class="ig-btn-secondary" data-astro-cid-zbl3tdhc> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-zbl3tdhc><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" data-astro-cid-zbl3tdhc></path><polyline points="7 10 12 15 17 10" data-astro-cid-zbl3tdhc></polyline><line x1="12" y1="15" x2="12" y2="3" data-astro-cid-zbl3tdhc></line></svg>
Salvar Ingresso
</button> <button id="btn-share" class="ig-btn-secondary" data-astro-cid-zbl3tdhc> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-zbl3tdhc><circle cx="18" cy="5" r="3" data-astro-cid-zbl3tdhc></circle><circle cx="6" cy="12" r="3" data-astro-cid-zbl3tdhc></circle><circle cx="18" cy="19" r="3" data-astro-cid-zbl3tdhc></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" data-astro-cid-zbl3tdhc></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" data-astro-cid-zbl3tdhc></line></svg>
Compartilhar
</button> </div> </div> ` }), renderScript($$result, "/Users/luisnathan/development/mqaccess/src/pages/app/ingresso.astro?astro&type=script&index=0&lang.ts"), defineScriptVars({ qrPayload, ticketCode, eventTitle }));
}, "/Users/luisnathan/development/mqaccess/src/pages/app/ingresso.astro", void 0);

const $$file = "/Users/luisnathan/development/mqaccess/src/pages/app/ingresso.astro";
const $$url = "/app/ingresso";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ingresso,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
