/* empty css               */
import { c as createComponent } from './astro-component_BmOi03Hm.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute, F as Fragment } from './sequence_BvZ5THv7.mjs';
import { r as renderComponent } from './entrypoint_DMrWqGYU.mjs';
import { r as renderScript } from './BaseLayout_9zaNwiSi.mjs';
import { $ as $$AppLayout } from './AppLayout_zHqYvHsN.mjs';
import { s as supabase } from './supabase_sj-AEpC3.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Player = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Player;
  const productId = Astro2.url.searchParams.get("id");
  const lessonIdQS = Astro2.url.searchParams.get("lesson_id") ?? "";
  const userId = Astro2.locals.user?.id ?? "";
  if (!productId) return Astro2.redirect("/app/compras");
  const { data: product } = await supabase.from("products").select("id, title, thumbnail_url, description").eq("id", productId).single();
  if (!product) return Astro2.redirect("/app/compras");
  const { data: modules } = await supabase.from("course_modules").select("id, title, order, course_lessons(id, title, description, video_url, duration_seconds, order)").eq("product_id", productId).order("order", { ascending: true });
  const sortedModules = (modules ?? []).map((mod) => ({
    ...mod,
    course_lessons: [...mod.course_lessons ?? []].sort((a, b) => a.order - b.order)
  }));
  const allLessons = sortedModules.flatMap((m) => m.course_lessons);
  const totalLessons = allLessons.length;
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const action = form.get("action");
    const lessonId = form.get("lesson_id");
    if (action === "mark_completed" && lessonId && userId) {
      const { data: existing } = await supabase.from("course_progress").select("id, completed_lessons").eq("user_id", userId).eq("product_id", productId).maybeSingle();
      if (!existing) {
        await supabase.from("course_progress").insert({
          user_id: userId,
          product_id: productId,
          completed_lessons: [lessonId],
          overall_percent: allLessons.length ? Math.round(1 / allLessons.length * 100) : 0
        });
      } else {
        const current = existing.completed_lessons ?? [];
        if (!current.includes(lessonId)) {
          const updated = [...current, lessonId];
          await supabase.from("course_progress").update({
            completed_lessons: updated,
            overall_percent: allLessons.length ? Math.round(updated.length / allLessons.length * 100) : 0
          }).eq("id", existing.id);
        }
      }
    }
    if (action === "save_note" && userId) {
      const noteLesson = form.get("lesson_id");
      const content = (form.get("content") ?? "").trim();
      if (noteLesson) {
        await supabase.from("lesson_notes").upsert(
          { user_id: userId, lesson_id: noteLesson, content },
          { onConflict: "user_id,lesson_id" }
        );
      }
    }
    const lid = form.get("lesson_id") || lessonIdQS;
    const noteSaved = "";
    const qs = lid ? `?id=${productId}&lesson_id=${lid}${noteSaved}` : `?id=${productId}${noteSaved}`;
    return Astro2.redirect(`/app/player${qs}`);
  }
  const activeLesson = (lessonIdQS ? allLessons.find((l) => l.id === lessonIdQS) : null) ?? sortedModules[0]?.course_lessons?.[0] ?? null;
  const { data: savedNote } = userId && activeLesson?.id ? await supabase.from("lesson_notes").select("content").eq("user_id", userId).eq("lesson_id", activeLesson.id).maybeSingle() : { data: null };
  const savedContent = savedNote?.content ?? "";
  const { data: progress } = userId ? await supabase.from("course_progress").select("completed_lessons, overall_percent").eq("user_id", userId).eq("product_id", productId).maybeSingle() : { data: null };
  const completedLessons = progress?.completed_lessons ?? [];
  const progressPercent = totalLessons > 0 ? Math.round(completedLessons.length / totalLessons * 100) : 0;
  const isActiveDone = activeLesson ? completedLessons.includes(activeLesson.id) : false;
  let lessonFiles = [];
  if (activeLesson?.id) {
    const { data: filesData, error: filesError } = await supabase.from("course_lesson_files").select("*").eq("lesson_id", activeLesson.id);
    if (filesError) {
      console.error("❌ Supabase files error:", filesError.message, filesError.details);
    } else {
      lessonFiles = filesData ?? [];
    }
  }
  console.log("--- DEBUG GSD: DOWNLOADS ---");
  console.log("activeLesson.id :", activeLesson?.id ?? "NULO");
  console.log("lessonFiles.length:", lessonFiles.length);
  console.log("lessonFiles dados :", JSON.stringify(lessonFiles, null, 2));
  console.log("----------------------------");
  const fmtDur = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };
  const formatBytes = (bytes) => {
    if (!bytes || bytes === 0) return "—";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };
  const hasCurriculum = sortedModules.length > 0;
  return renderTemplate(_a || (_a = __template(["", ` <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"><\/script> <script>
  // ── Golden Spark — efeito premium de conclusão de aula ────────────────────
  function dispararConfetePremium(event, formElement) {
    event.preventDefault();

    var colors = ['#D4AF37', '#AA8822', '#FFFFFF', '#C9A96E'];

    // Burst central
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
      shapes: ['circle'],
      gravity: 0.8,
      scalar: 0.8,
    });

    // Segunda rajada com leve delay — dá o efeito de "ondas de luz"
    setTimeout(function() {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { x: 0.3, y: 0.55 },
        colors: colors,
        shapes: ['circle'],
        gravity: 0.9,
        scalar: 0.6,
      });
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { x: 0.7, y: 0.55 },
        colors: colors,
        shapes: ['circle'],
        gravity: 0.9,
        scalar: 0.6,
      });
    }, 200);

    // Envia o formulário após a animação brilhar
    setTimeout(function() {
      formElement.submit();
    }, 1200);
  }

  // ── Tabs ──────────────────────────────────────────────────────────────
  function initPlayerTabs() {
    var btns   = document.querySelectorAll('[data-tab-target]');
    var panels = document.querySelectorAll('.pl-tab-content');
    if (!btns.length) return;

    btns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var target = btn.getAttribute('data-tab-target');
        panels.forEach(function(p) {
          p.classList.toggle('pl-panel-hidden', p.id !== target);
        });
        btns.forEach(function(b) {
          b.classList.toggle('pl-tab--active', b === btn);
        });
      });
    });
  }

  document.addEventListener('astro:page-load', initPlayerTabs);

  // ── Salvamento assíncrono de anotações (AJAX — sem reload) ─────────────────
  function initNotesForm() {
    var form    = document.getElementById('form-anotacao');
    var btnSave = document.getElementById('btn-salvar-nota');
    var msgOk   = document.getElementById('note-success-msg');
    if (!form || !btnSave || !msgOk) return;

    // Garante que não duplica o listener em navegações SPA
    form.removeEventListener('submit', form.__noteHandler);

    form.__noteHandler = async function(e) {
      e.preventDefault();

      var label = btnSave.innerText;
      btnSave.innerText  = 'Salvando...';
      btnSave.disabled   = true;
      btnSave.style.opacity = '0.6';

      try {
        // POST para a URL atual com os query params intactos
        var target = new URL(window.location.href);
        target.searchParams.delete('note_saved'); // limpeza preventiva
        await fetch(target.toString(), {
          method: 'POST',
          body:   new FormData(form),
          // Impede que o fetch siga o redirect 302 do Astro
          redirect: 'manual',
        });

        // Feedback visual — aparece por 3s depois some
        msgOk.classList.remove('pl-note-success--hidden');
        clearTimeout(form.__noteTimer);
        form.__noteTimer = setTimeout(function() {
          msgOk.classList.add('pl-note-success--hidden');
        }, 3000);

      } catch (err) {
        console.error('❌ Erro ao salvar anotação:', err);
      } finally {
        btnSave.innerText     = label;
        btnSave.disabled      = false;
        btnSave.style.opacity = '1';
      }
    };

    form.addEventListener('submit', form.__noteHandler);
  }

  initNotesForm();
  document.addEventListener('astro:page-load', initNotesForm);
<\/script> `, ""])), renderComponent($$result, "AppLayout", $$AppLayout, { "title": `Player · ${product.title}`, "data-astro-cid-ac2dhve5": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="pl-shell" data-astro-cid-ac2dhve5> <!-- Top bar compacto --> <header class="pl-topbar" data-astro-cid-ac2dhve5> <a href="/app/compras" class="pl-back" data-astro-cid-ac2dhve5> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-ac2dhve5><path d="M19 12H5M12 19l-7-7 7-7" data-astro-cid-ac2dhve5></path></svg>
Minha Biblioteca
</a> <p class="pl-course-name" data-astro-cid-ac2dhve5>${product.title}</p> <div class="pl-topbar-right" data-astro-cid-ac2dhve5> <span class="pl-prog-pill" data-astro-cid-ac2dhve5> <span class="pl-prog-pill-fill"${addAttribute(`width:${progressPercent}%`, "style")} data-astro-cid-ac2dhve5></span> </span> <span class="pl-prog-text" data-astro-cid-ac2dhve5>${progressPercent}%</span> </div> </header> <!-- Layout principal --> <div class="pl-layout" data-astro-cid-ac2dhve5> <!-- ═══ ÁREA DO PLAYER ═══ --> <main class="pl-main" data-astro-cid-ac2dhve5> <!-- Vídeo / Embed --> <div class="pl-video-wrap" id="pl-video" data-astro-cid-ac2dhve5> <div class="pl-video-screen" data-astro-cid-ac2dhve5> ${activeLesson?.video_url ? (
    /* Se for link de iframe (Vimeo/Panda/YouTube embed), renderiza iframe */
    activeLesson.video_url.startsWith("http") ? renderTemplate`<iframe${addAttribute(activeLesson.video_url, "src")} class="pl-video-iframe" allow="autoplay; fullscreen" allowfullscreen${addAttribute(activeLesson.title, "title")} data-astro-cid-ac2dhve5></iframe>` : renderTemplate`<video class="pl-video-iframe" controls data-astro-cid-ac2dhve5> <source${addAttribute(activeLesson.video_url, "src")} data-astro-cid-ac2dhve5> </video>`
  ) : (
    /* Sem URL de vídeo: tela de placeholder premium */
    renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-ac2dhve5": true }, { "default": async ($$result3) => renderTemplate` <img${addAttribute(product.thumbnail_url ?? "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop", "src")} alt="Thumbnail do curso" class="pl-video-bg" loading="eager" data-astro-cid-ac2dhve5> <div class="pl-video-glow" data-astro-cid-ac2dhve5></div> <div class="pl-no-video-state" data-astro-cid-ac2dhve5> <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" class="pl-no-video-icon" data-astro-cid-ac2dhve5> <polygon points="5 3 19 12 5 21 5 3" data-astro-cid-ac2dhve5></polygon> </svg> <p class="pl-no-video-text" data-astro-cid-ac2dhve5>Vídeo será disponibilizado em breve</p> </div> ` })}`
  )} <!-- Overlay info da aula (sobre o vídeo) --> ${!activeLesson?.video_url && renderTemplate`<div class="pl-video-info" data-astro-cid-ac2dhve5> <p class="pl-video-ep" data-astro-cid-ac2dhve5>Aula ativa</p> <p class="pl-video-title-overlay" data-astro-cid-ac2dhve5>${activeLesson?.title ?? product.title}</p> </div>`} </div> <!-- Controles customizados (apenas no modo placeholder) --> ${!activeLesson?.video_url && renderTemplate`<div class="pl-controls" data-astro-cid-ac2dhve5> <div class="pl-seek-wrap" data-astro-cid-ac2dhve5> <div class="pl-seek-bg" data-astro-cid-ac2dhve5> <div class="pl-seek-fill" style="width:0%" data-astro-cid-ac2dhve5></div> <div class="pl-seek-thumb" style="left:0%" data-astro-cid-ac2dhve5></div> </div> </div> <div class="pl-controls-row" data-astro-cid-ac2dhve5> <div class="pl-controls-left" data-astro-cid-ac2dhve5> <span class="pl-time" data-astro-cid-ac2dhve5>00:00 / ${activeLesson?.duration_seconds ? fmtDur(activeLesson.duration_seconds) : "--:--"}</span> </div> <div class="pl-controls-right" data-astro-cid-ac2dhve5> <button class="pl-ctrl-btn pl-speed" aria-label="Velocidade" data-astro-cid-ac2dhve5>1.0×</button> </div> </div> </div>`} </div> <!-- Botão Marcar como Concluída --> ${activeLesson && renderTemplate`<div class="pl-complete-bar" data-astro-cid-ac2dhve5> <form method="POST"${addAttribute(`/app/player?id=${productId}&lesson_id=${activeLesson.id}`, "action")}${addAttribute(!isActiveDone ? "dispararConfetePremium(event,this)" : void 0, "onsubmit")} data-astro-cid-ac2dhve5> <input type="hidden" name="action" value="mark_completed" data-astro-cid-ac2dhve5> <input type="hidden" name="lesson_id"${addAttribute(activeLesson.id, "value")} data-astro-cid-ac2dhve5> ${isActiveDone ? renderTemplate`<button type="button" class="pl-complete-btn pl-complete-btn--done" disabled data-astro-cid-ac2dhve5> <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" data-astro-cid-ac2dhve5><polyline points="20 6 9 17 4 12" data-astro-cid-ac2dhve5></polyline></svg>
Aula Concluída
</button>` : renderTemplate`<button type="submit" class="pl-complete-btn" data-astro-cid-ac2dhve5> <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" data-astro-cid-ac2dhve5><polyline points="20 6 9 17 4 12" data-astro-cid-ac2dhve5></polyline></svg>
Marcar como Concluída
</button>`} </form> </div>`} <!-- Abas (is:inline — funciona com SSR + View Transitions) --> <div class="pl-tabs" data-astro-cid-ac2dhve5> <div class="pl-tab-bar" role="tablist" data-astro-cid-ac2dhve5> <button class="pl-tab pl-tab--active" data-tab-target="pl-panel-desc" data-astro-cid-ac2dhve5>Descrição</button> <button class="pl-tab" data-tab-target="pl-panel-files" data-astro-cid-ac2dhve5>Downloads</button> <button class="pl-tab" data-tab-target="pl-panel-notes" data-astro-cid-ac2dhve5>Anotações</button> </div> <!-- Descrição --> <div class="pl-tab-content" id="pl-panel-desc" data-astro-cid-ac2dhve5> <h3 class="pl-tab-title" data-astro-cid-ac2dhve5>${activeLesson?.title ?? product.title}</h3> <p class="pl-tab-text" data-astro-cid-ac2dhve5> ${activeLesson?.description ?? product.description ?? "Conteúdo desta aula disponível em breve."} </p> </div> <!-- Downloads --> <div class="pl-tab-content pl-panel-hidden" id="pl-panel-files" data-astro-cid-ac2dhve5> ${lessonFiles && lessonFiles.length > 0 ? renderTemplate`<div class="pl-file-list" data-astro-cid-ac2dhve5> ${lessonFiles.map((file) => renderTemplate`<a${addAttribute(file.url, "href")} class="pl-file-item" target="_blank" rel="noopener noreferrer" download data-astro-cid-ac2dhve5> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-ac2dhve5> <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" data-astro-cid-ac2dhve5></path> <polyline points="14 2 14 8 20 8" data-astro-cid-ac2dhve5></polyline> </svg> <span class="pl-file-name" data-astro-cid-ac2dhve5>${file.name}</span> <span class="pl-file-size" data-astro-cid-ac2dhve5>${formatBytes(file.size_bytes)}</span> <svg class="pl-file-dl" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-ac2dhve5> <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" data-astro-cid-ac2dhve5></path> <polyline points="7 10 12 15 17 10" data-astro-cid-ac2dhve5></polyline> <line x1="12" y1="15" x2="12" y2="3" data-astro-cid-ac2dhve5></line> </svg> </a>`)} </div>` : renderTemplate`<p class="pl-files-empty" data-astro-cid-ac2dhve5>Nenhum material complementar disponível para esta aula.</p>`} </div> <!-- Anotações --> <div class="pl-tab-content pl-panel-hidden" id="pl-panel-notes" data-astro-cid-ac2dhve5> <form id="form-anotacao" data-astro-cid-ac2dhve5> <input type="hidden" name="action" value="save_note" data-astro-cid-ac2dhve5> <input type="hidden" name="lesson_id"${addAttribute(activeLesson?.id ?? "", "value")} data-astro-cid-ac2dhve5> <textarea class="pl-notes" name="content" placeholder="Escreva suas anotações aqui..." data-astro-cid-ac2dhve5>${savedContent}</textarea> <div class="pl-notes-actions" data-astro-cid-ac2dhve5> <button type="submit" id="btn-salvar-nota" class="pl-notes-save" data-astro-cid-ac2dhve5>
Salvar anotação
</button> <span id="note-success-msg" class="pl-note-success pl-note-success--hidden" data-astro-cid-ac2dhve5> <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" data-astro-cid-ac2dhve5><polyline points="20 6 9 17 4 12" data-astro-cid-ac2dhve5></polyline></svg>
Salvo com sucesso
</span> </div> </form> </div> </div> </main> <!-- ═══ SIDEBAR — CURRÍCULO REAL (SSR) ═══ --> <aside class="pl-sidebar" data-astro-cid-ac2dhve5> <p class="pl-sidebar-heading" data-astro-cid-ac2dhve5>CONTEÚDO DO CURSO</p> ${hasCurriculum ? renderTemplate`<div class="pl-curriculum" data-astro-cid-ac2dhve5> ${sortedModules.map((mod, mi) => renderTemplate`<details class="pl-module"${addAttribute(mi === 0, "open")} data-astro-cid-ac2dhve5> <summary class="pl-module-header" data-astro-cid-ac2dhve5> <div class="pl-module-meta" data-astro-cid-ac2dhve5> <span class="pl-module-num" data-astro-cid-ac2dhve5>${String(mi + 1).padStart(2, "0")}</span> <div data-astro-cid-ac2dhve5> <p class="pl-module-title" data-astro-cid-ac2dhve5>${mod.title}</p> <p class="pl-module-count" data-astro-cid-ac2dhve5>${mod.course_lessons.length} aulas</p> </div> </div> <svg class="pl-module-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-ac2dhve5> <polyline points="6 9 12 15 18 9" data-astro-cid-ac2dhve5></polyline> </svg> </summary> <div class="pl-lesson-list" data-astro-cid-ac2dhve5> ${mod.course_lessons.map((lesson, li) => {
    const isActive = lesson.id === activeLesson?.id;
    const isDone = completedLessons.includes(lesson.id);
    const isDoneIdle = isDone && !isActive;
    return renderTemplate`<a${addAttribute(`/app/player?id=${productId}&lesson_id=${lesson.id}`, "href")}${addAttribute(`pl-lesson${isActive ? " pl-lesson--active" : ""}${isDoneIdle ? " pl-lesson--done" : ""}`, "class")} data-astro-cid-ac2dhve5>  <div${addAttribute(`pl-lesson-icon${isActive ? " pl-lesson-icon--active" : ""}${isDone && !isActive ? " pl-lesson-icon--done" : ""}`, "class")} data-astro-cid-ac2dhve5> ${isActive ? renderTemplate`<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-ac2dhve5><polygon points="5 3 19 12 5 21 5 3" data-astro-cid-ac2dhve5></polygon></svg>` : isDone ? renderTemplate`<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" data-astro-cid-ac2dhve5><polyline points="20 6 9 17 4 12" data-astro-cid-ac2dhve5></polyline></svg>` : renderTemplate`<span class="pl-lesson-num" data-astro-cid-ac2dhve5>${String(mi * 100 + li + 1).padStart(2, "0")}</span>`} </div> <div${addAttribute(`pl-lesson-info${isDoneIdle ? " pl-lesson-info--done" : ""}`, "class")} data-astro-cid-ac2dhve5> <p${addAttribute(`pl-lesson-title${isActive ? " pl-lesson-title--active" : ""}`, "class")} data-astro-cid-ac2dhve5> ${lesson.title} </p> <p class="pl-lesson-dur" data-astro-cid-ac2dhve5> ${lesson.duration_seconds ? fmtDur(lesson.duration_seconds) : "--:--"} </p> </div> </a>`;
  })} </div> </details>`)} </div>` : (
    /* Fallback estático quando o banco ainda não tem módulos cadastrados */
    renderTemplate`<div class="pl-lesson-list" data-astro-cid-ac2dhve5> ${["Introdução: A Mentalidade do Executivo", "O Fator Alfa nas Negociações", "Posicionamento Estratégico de Alto Nível", "Delegação sem Abdicação", "Comunicação de Autoridade"].map((title, i) => renderTemplate`<div${addAttribute(`pl-lesson${i === 0 ? " pl-lesson--active" : ""}`, "class")} role="button" data-astro-cid-ac2dhve5> <div${addAttribute(`pl-lesson-icon${i === 0 ? " pl-lesson-icon--active" : ""}`, "class")} data-astro-cid-ac2dhve5> ${i === 0 ? renderTemplate`<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-ac2dhve5><polygon points="5 3 19 12 5 21 5 3" data-astro-cid-ac2dhve5></polygon></svg>` : renderTemplate`<span class="pl-lesson-num" data-astro-cid-ac2dhve5>${String(i + 1).padStart(2, "0")}</span>`} </div> <div class="pl-lesson-info" data-astro-cid-ac2dhve5> <p${addAttribute(`pl-lesson-title${i === 0 ? " pl-lesson-title--active" : ""}`, "class")} data-astro-cid-ac2dhve5>${title}</p> <p class="pl-lesson-dur" data-astro-cid-ac2dhve5>--:--</p> </div> </div>`)} </div>`
  )} </aside> </div> </div> ` }), renderScript($$result, "/Users/luisnathan/development/mqaccess/src/pages/app/player.astro?astro&type=script&index=0&lang.ts"));
}, "/Users/luisnathan/development/mqaccess/src/pages/app/player.astro", void 0);

const $$file = "/Users/luisnathan/development/mqaccess/src/pages/app/player.astro";
const $$url = "/app/player";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Player,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
