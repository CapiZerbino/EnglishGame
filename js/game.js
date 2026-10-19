/* ===== Spelling Galaxy – game logic ===== */
(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const STORAGE_KEY = "spelling-galaxy-v1";
  const WORDS_PER_UNIT = 10;
  const MAX_LIVES = 3;
  const HINT_COST = 2;

  /* ---------- Persistence ---------- */
  const defaultState = () => ({
    xp: 0,
    units: {},          // "a2-0": { stars, best, done }
    learned: {},        // word -> true
    wrong: {},          // word -> times wrong
    streak: { last: "", count: 0 },
    settings: { theme: "dark", sound: true, mode: "spell", level: "a2" }
  });
  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const s = JSON.parse(raw);
      return Object.assign(defaultState(), s, { settings: Object.assign(defaultState().settings, s.settings || {}) });
    } catch (e) { return defaultState(); }
  }
  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  /* ---------- Helpers ---------- */
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const todayStr = () => new Date().toISOString().slice(0, 10);
  const norm = (s) => s.trim().toLowerCase().replace(/\s+/g, " ");
  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const wordObj = (w, level, unitIdx) => ({ word: w[0], pos: w[1], vi: w[2], en: w[3], ex: w[4], level, unitIdx });
  const unitKey = (levelId, unitIdx) => `${levelId}-${unitIdx}`;
  const findWord = (word) => {
    for (const lv of VOCAB_LEVELS) for (let u = 0; u < lv.units.length; u++) {
      const w = lv.units[u].words.find((x) => x[0] === word);
      if (w) return wordObj(w, lv, u);
    }
    return null;
  };

  let toastTimer;
  function toast(msg) {
    const t = $("toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 1800);
  }

  /* ---------- Audio (Web Audio beeps + TTS) ---------- */
  let audioCtx;
  function beep(freqs, dur = 0.12, type = "sine", gain = 0.08) {
    if (!state.settings.sound) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      freqs.forEach((f, i) => {
        const o = audioCtx.createOscillator(); const g = audioCtx.createGain();
        o.type = type; o.frequency.value = f;
        const t0 = audioCtx.currentTime + i * dur * 0.6;
        g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(gain, t0 + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        o.connect(g).connect(audioCtx.destination); o.start(t0); o.stop(t0 + dur + 0.02);
      });
    } catch (e) { /* ignore */ }
  }
  const sfxCorrect = () => beep([523, 659, 784], 0.14);
  const sfxWrong = () => beep([200, 150], 0.2, "sawtooth", 0.05);
  const sfxComplete = () => beep([523, 659, 784, 1047], 0.16);
  const sfxClick = () => beep([880], 0.05, "square", 0.03);

  let voice = null;
  function pickVoice() {
    if (!("speechSynthesis" in window)) return;
    const voices = speechSynthesis.getVoices();
    const prefer = ["Google US English", "Samantha", "Microsoft Aria", "Microsoft Zira", "Alex"];
    voice = voices.find((v) => prefer.some((p) => v.name.includes(p))) || voices.find((v) => v.lang === "en-US") || voices.find((v) => v.lang.startsWith("en")) || null;
  }
  if ("speechSynthesis" in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function speak(text) {
    if (!("speechSynthesis" in window)) { toast("Trình duyệt không hỗ trợ phát âm"); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US"; u.rate = 0.9; if (voice) u.voice = voice;
    speechSynthesis.speak(u);
  }

  /* ---------- Starfield ---------- */
  (function starfield() {
    const c = $("stars"); const ctx = c.getContext("2d");
    let w, h, stars = [];
    const resize = () => {
      w = c.width = innerWidth * devicePixelRatio; h = c.height = innerHeight * devicePixelRatio;
      stars = Array.from({ length: Math.min(220, Math.floor((innerWidth * innerHeight) / 6000)) }, () => ({
        x: Math.random() * w, y: Math.random() * h, r: (Math.random() * 1.4 + 0.3) * devicePixelRatio,
        s: Math.random() * 0.25 + 0.05, p: Math.random() * Math.PI * 2
      }));
    };
    addEventListener("resize", resize); resize();
    let last = 0;
    const loop = (t) => {
      const dt = Math.min(50, t - last); last = t;
      ctx.clearRect(0, 0, w, h);
      const light = document.documentElement.dataset.theme === "light";
      for (const s of stars) {
        s.y += s.s * dt * devicePixelRatio * 0.06; if (s.y > h) { s.y = 0; s.x = Math.random() * w; }
        s.p += dt * 0.002; const a = 0.4 + Math.sin(s.p) * 0.35;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = light ? `rgba(90,100,180,${a * 0.5})` : `rgba(255,255,255,${a})`; ctx.fill();
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  })();

  /* ---------- Screens ---------- */
  function show(screen) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
    $(`screen-${screen}`).classList.add("active");
    window.scrollTo({ top: 0 });
  }

  /* ---------- Theme / settings ---------- */
  function applyTheme() {
    document.documentElement.dataset.theme = state.settings.theme;
    $("btn-theme").textContent = state.settings.theme === "dark" ? "🌙" : "☀️";
    $("btn-sound").textContent = state.settings.sound ? "🔊" : "🔇";
  }
  $("btn-theme").onclick = () => { state.settings.theme = state.settings.theme === "dark" ? "light" : "dark"; saveState(); applyTheme(); };
  $("btn-sound").onclick = () => { state.settings.sound = !state.settings.sound; saveState(); applyTheme(); sfxClick(); };

  /* ---------- Home rendering ---------- */
  function renderHome() {
    // stats
    let stars = 0; for (const k in state.units) stars += state.units[k].stars || 0;
    $("stat-xp").textContent = state.xp;
    $("stat-words").textContent = Object.keys(state.learned).length;
    $("stat-stars").textContent = stars;
    $("stat-streak").textContent = state.streak.count;

    // modes
    document.querySelectorAll(".mode-card").forEach((b) => b.classList.toggle("active", b.dataset.mode === state.settings.mode));

    // level tabs
    const tabs = $("level-tabs"); tabs.innerHTML = "";
    VOCAB_LEVELS.forEach((lv) => {
      const b = document.createElement("button");
      b.className = "level-tab" + (lv.id === state.settings.level ? " active" : "");
      b.style.setProperty("--level-color", lv.color);
      b.textContent = `${lv.name} · ${lv.title}`;
      b.onclick = () => { state.settings.level = lv.id; saveState(); renderHome(); sfxClick(); };
      tabs.appendChild(b);
    });

    // units
    const lv = VOCAB_LEVELS.find((l) => l.id === state.settings.level) || VOCAB_LEVELS[0];
    const grid = $("unit-grid"); grid.innerHTML = "";
    lv.units.forEach((u, i) => {
      const prog = state.units[unitKey(lv.id, i)] || {};
      const learnedInUnit = u.words.filter((w) => state.learned[w[0]]).length;
      const b = document.createElement("button");
      b.className = "unit-card" + (prog.done ? " done" : "");
      b.style.setProperty("--level-color", lv.color);
      b.innerHTML = `
        <span class="u-num">Unit ${i + 1}</span>
        <span class="u-name">${esc(u.name)}</span>
        <span class="u-stars">${"★".repeat(prog.stars || 0)}${"☆".repeat(3 - (prog.stars || 0))}</span>
        <span class="u-bar"><i style="width:${(learnedInUnit / u.words.length) * 100}%"></i></span>`;
      b.onclick = () => startUnit(lv, i);
      grid.appendChild(b);
    });

    // review
    const wrongWords = Object.keys(state.wrong);
    $("btn-review").disabled = wrongWords.length === 0;
    $("review-desc").textContent = wrongWords.length
      ? `Bạn có ${wrongWords.length} từ hay sai. Ôn lại để nhớ lâu hơn!`
      : "Chưa có từ nào cần ôn. Chơi vài unit trước nhé!";
  }

  $("mode-grid").addEventListener("click", (e) => {
    const card = e.target.closest(".mode-card"); if (!card) return;
    state.settings.mode = card.dataset.mode; saveState(); renderHome(); sfxClick();
  });
  $("btn-review").onclick = () => startReview();
  $("btn-reset").onclick = () => {
    if (confirm("Xóa toàn bộ tiến độ học? Hành động này không thể hoàn tác.")) {
      const settings = state.settings; state = defaultState(); state.settings = settings; saveState(); renderHome(); toast("Đã xóa tiến độ");
    }
  };

  /* ---------- Game session ---------- */
  let G = null;        // current session
  let advanceTimer = null;

  function startUnit(level, unitIdx) {
    const words = level.units[unitIdx].words.map((w) => wordObj(w, level, unitIdx));
    beginSession({
      title: `Unit ${unitIdx + 1}`, subtitle: `${level.name} · ${level.units[unitIdx].name}`,
      level, unitIdx, words: shuffle(words), review: false
    });
  }

  function startReview() {
    const list = Object.entries(state.wrong).sort((a, b) => b[1] - a[1]).slice(0, WORDS_PER_UNIT)
      .map(([w]) => findWord(w)).filter(Boolean);
    if (!list.length) return;
    beginSession({ title: "Ôn tập", subtitle: "Từ hay sai", level: null, unitIdx: -1, words: shuffle(list), review: true });
  }

  function beginSession(cfg) {
    G = Object.assign(cfg, {
      mode: state.settings.mode, idx: 0, score: 0, lives: MAX_LIVES, combo: 0, bestCombo: 0,
      correct: 0, wrongWords: [], answered: false, hinted: 0, removed: []
    });
    $("tag-level").textContent = cfg.level ? cfg.level.name : "Ôn tập";
    show("game");
    renderHUD();
    loadQuestion();
  }

  function renderHUD() {
    const total = G.words.length;
    $("milestone").textContent = `⚑ Mốc ${Math.min(G.idx + 1, total)}/${total} · ${G.title}`;
    $("hud-score").textContent = `⭐ ${G.score}`;
    $("hud-lives").textContent = "❤️".repeat(G.lives) + "🖤".repeat(MAX_LIVES - G.lives);
    $("progress-fill").style.width = `${(G.idx / total) * 100}%`;
    const space = $("space"); const maxUp = space.clientHeight - 70;
    $("ship").style.bottom = `${10 + (G.idx / total) * maxUp}px`;
    const combo = $("combo");
    if (G.combo >= 2) { combo.textContent = `🔥 Combo x${G.combo}`; combo.classList.remove("show"); void combo.offsetWidth; combo.classList.add("show"); }
    else combo.classList.remove("show");
  }

  function current() { return G.words[G.idx]; }

  function loadQuestion() {
    clearTimeout(advanceTimer);
    G.answered = false; G.hinted = 0; G.removed = [];
    const w = current();
    const card = $("card"); card.classList.remove("correct", "wrong");
    $("feedback").textContent = ""; $("feedback").className = "feedback";
    $("tag-pos").textContent = w.pos;
    if (w.level) $("tag-level").textContent = w.level.name;

    const listen = G.mode === "listen";
    $("meaning").textContent = listen ? "🎧 Nghe và gõ lại từ" : w.vi;
    $("definition").textContent = listen ? "Bấm 🔊 để nghe lại. Nghĩa sẽ hiện sau khi trả lời." : w.en;
    $("example").innerHTML = listen ? "" : esc(w.ex).replace("___", "<b>____</b>");

    const isChoice = G.mode === "choice";
    $("letters").style.display = isChoice ? "none" : "flex";
    $("answer-row").style.display = isChoice ? "none" : "flex";
    $("choices").classList.toggle("show", isChoice);
    $("btn-hint").disabled = false;
    $("btn-skip").disabled = false;

    if (isChoice) renderChoices(w);
    else {
      $("answer").value = ""; $("answer").disabled = false;
      renderLetters(""); 
      setTimeout(() => $("answer").focus(), 50);
    }
    renderHUD();
    if (listen) setTimeout(() => speak(w.word), 250);
  }

  function renderLetters(typed) {
    const w = current().word; const box = $("letters"); box.innerHTML = "";
    const t = norm(typed);
    for (let i = 0; i < w.length; i++) {
      const d = document.createElement("div");
      const ch = w[i];
      if (ch === " " || ch === "-") { d.className = "letter filled"; d.textContent = ch === " " ? "␣" : "-"; box.appendChild(d); continue; }
      d.className = "letter";
      if (i < G.hinted) { d.classList.add("hinted"); d.textContent = ch; }
      else if (i < t.length) { d.classList.add("filled"); d.textContent = t[i]; }
      else d.textContent = "";
      box.appendChild(d);
    }
  }

  function renderChoices(w) {
    const box = $("choices"); box.innerHTML = "";
    const pool = [];
    (w.level ? w.level.units : VOCAB_LEVELS.flatMap((l) => l.units)).forEach((u) => u.words.forEach((x) => { if (x[0] !== w.word && x[1] === w.pos) pool.push(x[0]); }));
    const fallback = VOCAB_LEVELS.flatMap((l) => l.units.flatMap((u) => u.words.map((x) => x[0]))).filter((x) => x !== w.word);
    const distractors = shuffle(pool.length >= 3 ? pool : fallback).slice(0, 3);
    const opts = shuffle([w.word, ...distractors]);
    opts.forEach((o, i) => {
      const b = document.createElement("button"); b.className = "choice"; b.textContent = o; b.dataset.word = o;
      b.title = `Phím ${i + 1}`;
      b.onclick = () => { if (!G.answered) submit(o); };
      box.appendChild(b);
    });
  }

  /* ---------- Answer flow ---------- */
  function submit(raw) {
    if (!G || G.answered) return;
    const w = current(); const ans = norm(raw);
    if (!ans) return;
    G.answered = true;
    const ok = ans === w.word;
    const card = $("card"); const fb = $("feedback");
    $("answer").disabled = true; $("btn-hint").disabled = true; $("btn-skip").disabled = true;

    // reveal
    $("meaning").textContent = w.vi; $("definition").textContent = w.en;
    $("example").innerHTML = esc(w.ex).replace("___", `<b>${esc(w.word)}</b>`);
    document.querySelectorAll(".choice").forEach((b) => {
      b.disabled = true;
      if (b.dataset.word === w.word) b.classList.add("ok"); else if (b.dataset.word === ans) b.classList.add("ko");
    });

    if (ok) {
      G.combo++; G.bestCombo = Math.max(G.bestCombo, G.combo); G.correct++;
      const bonus = Math.min(10, Math.max(0, G.combo - 1) * 2);
      const gained = Math.max(1, 10 + bonus - G.hinted * HINT_COST);
      G.score += gained;
      card.classList.add("correct"); fb.className = "feedback good";
      fb.innerHTML = `✅ Chính xác! +${gained} điểm${G.hinted ? ` (đã dùng ${G.hinted} gợi ý)` : ""}`;
      if (G.mode !== "choice") document.querySelectorAll(".letter").forEach((l) => l.classList.add("ok"));
      $("ship").classList.add("boost"); setTimeout(() => $("ship").classList.remove("boost"), 400);
      burst();
      sfxCorrect();
      if (!G.hinted) { state.learned[w.word] = true; if (state.wrong[w.word]) { state.wrong[w.word]--; if (state.wrong[w.word] <= 0) delete state.wrong[w.word]; } }
    } else {
      G.combo = 0; G.lives--; G.wrongWords.push(w);
      state.wrong[w.word] = (state.wrong[w.word] || 0) + 1; delete state.learned[w.word];
      card.classList.add("wrong"); fb.className = "feedback bad";
      fb.innerHTML = `❌ Sai rồi. Đáp án: <span class="ans">${esc(w.word)}</span>`;
      if (G.mode !== "choice") { G.hinted = w.word.length; renderLetters(""); document.querySelectorAll(".letter").forEach((l) => l.classList.add("ko")); }
      $("ship").classList.add("hit"); setTimeout(() => $("ship").classList.remove("hit"), 400);
      sfxWrong();
    }
    saveState();
    if (G.mode !== "listen") speak(w.word);
    G.idx++;
    renderHUD();
    fb.innerHTML += ` <span class="muted" style="font-weight:500;font-size:13px">· Enter để tiếp tục</span>`;
    advanceTimer = setTimeout(next, ok ? 1500 : 2600);
  }

  function next() {
    clearTimeout(advanceTimer);
    if (!G) return;
    if (G.lives <= 0) return finish(false);
    if (G.idx >= G.words.length) return finish(true);
    loadQuestion();
  }

  function hint() {
    if (!G || G.answered) return;
    const w = current();
    if (G.mode === "choice") {
      const wrongBtns = [...document.querySelectorAll(".choice")].filter((b) => b.dataset.word !== w.word && !b.disabled);
      if (wrongBtns.length <= 1) return;
      const b = wrongBtns[Math.floor(Math.random() * wrongBtns.length)];
      b.disabled = true; b.style.opacity = 0.25; G.hinted++;
      G.score = Math.max(0, G.score - HINT_COST); renderHUD(); sfxClick();
      if (wrongBtns.length - 1 <= 1) $("btn-hint").disabled = true;
      return;
    }
    if (G.hinted >= w.word.length - 1) return;
    G.hinted++;
    G.score = Math.max(0, G.score - HINT_COST);
    const inp = $("answer"); inp.value = w.word.slice(0, G.hinted); inp.focus();
    renderLetters(inp.value); renderHUD(); sfxClick();
    if (G.hinted >= w.word.length - 1) $("btn-hint").disabled = true;
  }

  function skip() {
    if (!G || G.answered) return;
    submit("—skip—");
  }

  function burst() {
    const space = $("space"); const ship = $("ship");
    const r = ship.getBoundingClientRect(); const sr = space.getBoundingClientRect();
    const cx = r.left - sr.left + r.width / 2; const cy = r.top - sr.top + r.height / 2;
    const colors = ["#fbbf24", "#f472b6", "#60a5fa", "#4ade80", "#fff"];
    for (let i = 0; i < 18; i++) {
      const p = document.createElement("span"); p.className = "particle";
      const ang = Math.random() * Math.PI * 2; const dist = 40 + Math.random() * 70;
      p.style.left = cx + "px"; p.style.top = cy + "px"; p.style.background = colors[i % colors.length];
      p.style.setProperty("--dx", Math.cos(ang) * dist + "px"); p.style.setProperty("--dy", Math.sin(ang) * dist + "px");
      space.appendChild(p); setTimeout(() => p.remove(), 900);
    }
  }

  /* ---------- Finish ---------- */
  function finish(completed) {
    clearTimeout(advanceTimer);
    const total = G.words.length;
    const acc = Math.round((G.correct / total) * 100);
    let stars = 0;
    if (completed) stars = G.wrongWords.length === 0 ? 3 : acc >= 70 ? 2 : 1;
    const xp = G.score + (completed ? 20 : 0) + stars * 10;

    state.xp += xp;
    if (!G.review && completed) {
      const key = unitKey(G.level.id, G.unitIdx);
      const prev = state.units[key] || { stars: 0, best: 0, done: false };
      state.units[key] = { stars: Math.max(prev.stars, stars), best: Math.max(prev.best, G.score), done: true };
    }
    // streak
    const today = todayStr();
    if (state.streak.last !== today) {
      const y = new Date(); y.setDate(y.getDate() - 1);
      state.streak.count = state.streak.last === y.toISOString().slice(0, 10) ? state.streak.count + 1 : 1;
      state.streak.last = today;
    }
    saveState();

    $("result-stars").textContent = "★".repeat(stars) + "☆".repeat(3 - stars);
    $("result-title").textContent = completed ? (stars === 3 ? "Hoàn hảo! 🎉" : "Hoàn thành! 🚀") : "Hết mạng rồi! 💥";
    $("result-sub").textContent = `${G.title} · ${G.subtitle}`;
    $("r-score").textContent = G.score;
    $("r-acc").textContent = acc + "%";
    $("r-combo").textContent = G.bestCombo;
    $("r-xp").textContent = "+" + xp;

    const wl = $("wrong-list"); wl.innerHTML = "";
    if (G.wrongWords.length) {
      wl.innerHTML = `<h3>Từ cần ôn lại (${G.wrongWords.length})</h3>` + G.wrongWords.map((w) =>
        `<div class="wrong-item"><b>${esc(w.word)}</b><span>${esc(w.vi)}</span></div>`).join("");
    }

    const nxt = nextUnit();
    $("btn-next").style.display = nxt && completed ? "" : "none";
    if (completed) sfxComplete(); else sfxWrong();
    show("result");
  }

  function nextUnit() {
    if (G.review || !G.level) return null;
    const li = VOCAB_LEVELS.indexOf(G.level);
    if (G.unitIdx + 1 < G.level.units.length) return { level: G.level, unitIdx: G.unitIdx + 1 };
    if (li + 1 < VOCAB_LEVELS.length) return { level: VOCAB_LEVELS[li + 1], unitIdx: 0 };
    return null;
  }

  /* ---------- Events ---------- */
  $("btn-submit").onclick = () => submit($("answer").value);
  $("answer").addEventListener("input", (e) => { if (!G.answered) renderLetters(e.target.value); });
  $("btn-speak").onclick = () => current() && speak(current().word);
  $("btn-hint").onclick = hint;
  $("btn-skip").onclick = skip;
  $("btn-back").onclick = () => { clearTimeout(advanceTimer); if (window.speechSynthesis) speechSynthesis.cancel(); G = null; renderHome(); show("home"); };
  $("btn-home").onclick = () => { G = null; renderHome(); show("home"); };
  $("btn-retry").onclick = () => { if (G.review) startReview(); else startUnit(G.level, G.unitIdx); };
  $("btn-next").onclick = () => { const n = nextUnit(); if (n) { state.settings.level = n.level.id; saveState(); startUnit(n.level, n.unitIdx); } };

  document.addEventListener("keydown", (e) => {
    if (!G || !$("screen-game").classList.contains("active")) return;
    if (e.key === "Enter") {
      e.preventDefault();
      if (G.answered) next(); else if (G.mode !== "choice") submit($("answer").value);
      return;
    }
    if (G.mode === "choice" && !G.answered && /^[1-4]$/.test(e.key)) {
      const b = document.querySelectorAll(".choice")[Number(e.key) - 1]; if (b && !b.disabled) b.click();
    }
    if (e.key === "Escape") $("btn-back").click();
  });
  addEventListener("resize", () => { if (G) renderHUD(); });

  /* ---------- Init ---------- */
  applyTheme();
  renderHome();
  show("home");
})();
