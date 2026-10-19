/* ===== Spelling Galaxy – vocabulary shooter ===== */
(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const STORAGE_KEY = "spelling-galaxy-v2";
  const WORDS_PER_UNIT = 10;
  const MAX_LIVES = 3;
  const HINT_COST = 2;
  const DANGER_OFFSET = 92;      // px from arena bottom (matches .danger-line)
  const LANES = [0.2, 0.5, 0.8]; // enemy lanes (fraction of arena width)

  /* ---------- Persistence ---------- */
  const defaultState = () => ({
    xp: 0,
    units: {},          // "a2-0": { stars, best, done }
    learned: {},        // word -> true
    wrong: {},          // word -> times missed
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
  function saveState() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ } }

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
  const ENEMY_ICONS = ["👾", "👽", "🛸", "🪐", "☄️", "🐙", "🤖", "💀", "🦠", "🐲"];

  let toastTimer;
  function toast(msg) {
    const t = $("toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 1800);
  }

  /* ---------- Audio ---------- */
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
  function laserSfx() {
    if (!state.settings.sound) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const o = audioCtx.createOscillator(); const g = audioCtx.createGain(); const t0 = audioCtx.currentTime;
      o.type = "square"; o.frequency.setValueAtTime(900, t0); o.frequency.exponentialRampToValueAtTime(180, t0 + 0.18);
      g.gain.setValueAtTime(0.06, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.2);
      o.connect(g).connect(audioCtx.destination); o.start(t0); o.stop(t0 + 0.22);
    } catch (e) { /* ignore */ }
  }
  const sfxExplode = () => beep([160, 90], 0.25, "sawtooth", 0.06);
  const sfxMiss = () => beep([220, 160, 110], 0.22, "sawtooth", 0.05);
  const sfxWrong = () => beep([180], 0.1, "triangle", 0.05);
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

  /* ---------- Background starfield ---------- */
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

  /* ---------- Screens / theme ---------- */
  function show(screen) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
    $(`screen-${screen}`).classList.add("active");
    window.scrollTo({ top: 0 });
  }
  function applyTheme() {
    document.documentElement.dataset.theme = state.settings.theme;
    $("btn-theme").textContent = state.settings.theme === "dark" ? "🌙" : "☀️";
    $("btn-sound").textContent = state.settings.sound ? "🔊" : "🔇";
  }
  $("btn-theme").onclick = () => { state.settings.theme = state.settings.theme === "dark" ? "light" : "dark"; saveState(); applyTheme(); };
  $("btn-sound").onclick = () => { state.settings.sound = !state.settings.sound; saveState(); applyTheme(); sfxClick(); };

  /* ---------- Home ---------- */
  function renderHome() {
    let stars = 0; for (const k in state.units) stars += state.units[k].stars || 0;
    $("stat-xp").textContent = state.xp;
    $("stat-words").textContent = Object.keys(state.learned).length;
    $("stat-stars").textContent = stars;
    $("stat-streak").textContent = state.streak.count;
    document.querySelectorAll(".mode-card").forEach((b) => b.classList.toggle("active", b.dataset.mode === state.settings.mode));

    const tabs = $("level-tabs"); tabs.innerHTML = "";
    VOCAB_LEVELS.forEach((lv) => {
      const b = document.createElement("button");
      b.className = "level-tab" + (lv.id === state.settings.level ? " active" : "");
      b.style.setProperty("--level-color", lv.color);
      b.textContent = `${lv.name} · ${lv.title}`;
      b.onclick = () => { state.settings.level = lv.id; saveState(); renderHome(); sfxClick(); };
      tabs.appendChild(b);
    });

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
  let G = null;
  const arena = $("arena"), enemiesEl = $("enemies"), shipEl = $("ship"), fx = $("fx"), fxCtx = fx.getContext("2d");
  let rafId = 0, lastT = 0;
  let lasers = [], particles = [];

  function startUnit(level, unitIdx) {
    const words = level.units[unitIdx].words.map((w) => wordObj(w, level, unitIdx));
    const li = VOCAB_LEVELS.indexOf(level);
    // fall time (seconds) from top to danger line: slower for beginners, faster for higher units
    const fallTime = Math.max(9, (22 - li * 2.5) * (1 - unitIdx * 0.035));
    beginSession({ title: `Unit ${unitIdx + 1}`, subtitle: `${level.name} · ${level.units[unitIdx].name}`, level, unitIdx, words: shuffle(words), review: false, fallTime });
  }
  function startReview() {
    const list = Object.entries(state.wrong).sort((a, b) => b[1] - a[1]).slice(0, WORDS_PER_UNIT).map(([w]) => findWord(w)).filter(Boolean);
    if (!list.length) return;
    beginSession({ title: "Ôn tập", subtitle: "Từ hay sai", level: null, unitIdx: -1, words: shuffle(list), review: true, fallTime: 20 });
  }

  function beginSession(cfg) {
    stopLoop();
    G = Object.assign(cfg, {
      mode: state.settings.mode, queue: cfg.words.slice(), enemies: [], resolved: 0,
      score: 0, lives: MAX_LIVES, combo: 0, bestCombo: 0, correct: 0, wrongWords: [], hintsUsed: 0,
      spawnTimer: 0, spawnInterval: cfg.fallTime / 3, paused: false, over: false, iconIdx: 0, shipX: 0.5
    });
    enemiesEl.innerHTML = ""; lasers = []; particles = [];
    $("answer").value = ""; $("answer").disabled = false;
    $("feedback").textContent = ""; $("feedback").className = "feedback";
    $("pause-overlay").classList.remove("show");
    show("game");
    resizeFx();
    renderHUD();
    moveShip(0.5);
    setTimeout(() => $("answer").focus(), 50);
    arenaMsg(G.mode === "listen" ? "🎧 Nghe & bắn!" : "Sẵn sàng!");
    lastT = performance.now();
    G.spawnTimer = G.spawnInterval - 1.2; // first enemy appears after ~1.2s
    rafId = requestAnimationFrame(loop);
  }

  function stopLoop() { cancelAnimationFrame(rafId); rafId = 0; }
  function resizeFx() {
    fx.width = arena.clientWidth * devicePixelRatio; fx.height = arena.clientHeight * devicePixelRatio;
    fxCtx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  addEventListener("resize", () => { if (G) { resizeFx(); G.enemies.forEach(placeEnemy); } });

  function renderHUD() {
    const total = G.words.length;
    $("milestone").textContent = `⚑ Mốc ${G.resolved}/${total} · ${G.title}`;
    $("hud-score").textContent = `⭐ ${G.score}`;
    $("hud-lives").textContent = "❤️".repeat(G.lives) + "🖤".repeat(MAX_LIVES - G.lives);
    $("progress-fill").style.width = `${(G.resolved / total) * 100}%`;
    const c = $("hud-combo"); c.textContent = `🔥 x${G.combo}`; c.style.opacity = G.combo >= 2 ? 1 : 0.4;
  }
  function arenaMsg(text, bad) {
    const m = $("arena-msg"); m.textContent = text; m.className = "arena-msg" + (bad ? " bad" : "");
    void m.offsetWidth; m.classList.add("show");
  }
  function moveShip(fx01) { G.shipX = fx01; shipEl.style.left = `${fx01 * 100}%`; }

  /* ---------- Enemies ---------- */
  function spawnEnemy() {
    if (!G.queue.length) return;
    const w = G.queue.shift();
    const busy = new Set(G.enemies.filter((e) => e.y < 140 && !e.dead).map((e) => e.lane));
    const free = LANES.map((_, i) => i).filter((i) => !busy.has(i));
    const lane = (free.length ? free : LANES.map((_, i) => i))[Math.floor(Math.random() * (free.length || LANES.length))];
    const el = document.createElement("div");
    const listen = G.mode === "listen";
    el.className = "enemy" + (listen ? " listen" : "");
    const icon = ENEMY_ICONS[G.iconIdx++ % ENEMY_ICONS.length];
    el.innerHTML = `
      <div class="e-head"><span class="e-icon">${icon}</span><span class="tag">${esc(w.pos)}</span>${w.level ? `<span class="tag tag-level">${esc(w.level.name)}</span>` : ""}</div>
      <div class="e-vi">${listen ? "🔊 ???" : esc(w.vi)}</div>
      ${listen ? "" : `<div class="e-en">${esc(w.en)}</div>`}
      <div class="e-blanks"></div>`;
    const en = { w, lane, x: LANES[lane], y: -80, el, hinted: 0, dead: false, speed: 0 };
    en.speed = (arena.clientHeight - DANGER_OFFSET + 80) / G.fallTime; // px per second
    el.onclick = () => { speak(w.word); $("answer").focus(); };
    enemiesEl.appendChild(el);
    G.enemies.push(en);
    renderBlanks(en);
    placeEnemy(en);
    if (listen) speak(w.word);
  }
  function renderBlanks(en) {
    const word = en.w.word; let s = "";
    for (let i = 0; i < word.length; i++) {
      const ch = word[i];
      if (ch === " ") { s += " "; continue; }
      if (ch === "-") { s += "-"; continue; }
      s += i < en.hinted ? ch : "<i>_</i>";
    }
    const b = en.el.querySelector(".e-blanks"); b.innerHTML = s;
    b.classList.toggle("long", word.length >= 13);
  }
  function enemyX(en) {
    const W = arena.clientWidth, half = en.el.offsetWidth / 2 + 8;
    return Math.min(W - half, Math.max(half, en.x * W));
  }
  function placeEnemy(en) {
    en.el.style.transform = `translate(${enemyX(en)}px, ${en.y}px)`;
  }
  const alive = () => G.enemies.filter((e) => !e.dead);
  const nearest = () => alive().sort((a, b) => b.y - a.y)[0] || null;

  /* ---------- Loop ---------- */
  function loop(t) {
    if (!G) return;
    const dt = Math.min(0.05, (t - lastT) / 1000); lastT = t;
    if (!G.paused && !G.over) update(dt);
    draw(dt);
    rafId = requestAnimationFrame(loop);
  }

  function update(dt) {
    // spawning
    G.spawnTimer += dt;
    const live = alive();
    const needSpawn = G.queue.length && (live.length === 0 || (G.spawnTimer >= G.spawnInterval && live.length < 3));
    if (needSpawn) { spawnEnemy(); G.spawnTimer = 0; }

    // movement
    const dangerY = arena.clientHeight - DANGER_OFFSET;
    for (const en of G.enemies) {
      if (en.dead) continue;
      en.y += en.speed * dt;
      placeEnemy(en);
      const h = en.el.offsetHeight;
      en.el.classList.toggle("danger", en.y + h > dangerY - 60);
      if (en.y + h >= dangerY) escape(en);
    }
    // nearest highlight
    const n = nearest();
    G.enemies.forEach((e) => e.el.classList.toggle("nearest", e === n));

    if (!G.queue.length && alive().length === 0 && !G.over) finish(true);
  }

  function draw(dt) {
    fxCtx.clearRect(0, 0, arena.clientWidth, arena.clientHeight);
    // lasers
    lasers = lasers.filter((l) => (l.t += dt) < l.dur);
    for (const l of lasers) {
      const a = 1 - l.t / l.dur;
      fxCtx.strokeStyle = `rgba(251,191,36,${a})`; fxCtx.lineWidth = 6 * a + 1; fxCtx.lineCap = "round";
      fxCtx.shadowColor = "rgba(251,191,36,0.9)"; fxCtx.shadowBlur = 18;
      fxCtx.beginPath(); fxCtx.moveTo(l.x1, l.y1); fxCtx.lineTo(l.x2, l.y2); fxCtx.stroke();
      fxCtx.strokeStyle = `rgba(255,255,255,${a})`; fxCtx.lineWidth = 2; fxCtx.stroke();
      fxCtx.shadowBlur = 0;
    }
    // particles
    particles = particles.filter((p) => (p.t += dt) < p.life);
    for (const p of particles) {
      p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 220 * dt;
      const a = 1 - p.t / p.life;
      fxCtx.globalAlpha = a; fxCtx.fillStyle = p.color;
      fxCtx.beginPath(); fxCtx.arc(p.x, p.y, p.r * a + 0.5, 0, Math.PI * 2); fxCtx.fill();
    }
    fxCtx.globalAlpha = 1;
  }

  function explode(x, y, colors, n = 26) {
    for (let i = 0; i < n; i++) {
      const ang = Math.random() * Math.PI * 2, sp = 80 + Math.random() * 220;
      particles.push({ x, y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - 60, r: 2 + Math.random() * 4, t: 0, life: 0.5 + Math.random() * 0.5, color: colors[i % colors.length] });
    }
  }
  const shipPos = () => ({ x: G.shipX * arena.clientWidth, y: arena.clientHeight - 14 - 24 });
  const enemyCenter = (en) => ({ x: enemyX(en), y: en.y + en.el.offsetHeight / 2 });

  /* ---------- Actions ---------- */
  function fire() {
    if (!G || G.paused || G.over) return;
    const inp = $("answer"); const typed = norm(inp.value);
    if (!typed) return;
    const targets = alive().filter((e) => e.w.word === typed).sort((a, b) => b.y - a.y);
    if (!targets.length) {
      G.combo = 0; renderHUD();
      inp.classList.remove("shake"); void inp.offsetWidth; inp.classList.add("shake");
      setFeedback(`❌ Không có quái nào là "${esc(typed)}"`, "bad");
      sfxWrong();
      inp.select();
      return;
    }
    const en = targets[0];
    en.dead = true;
    const dangerY = arena.clientHeight - DANGER_OFFSET;
    const c = enemyCenter(en);
    moveShip(c.x / arena.clientWidth);
    // laser from ship to enemy
    setTimeout(() => {
      const s = shipPos();
      lasers.push({ x1: s.x, y1: s.y, x2: c.x, y2: c.y, t: 0, dur: 0.22 });
      shipEl.classList.remove("fire"); void shipEl.offsetWidth; shipEl.classList.add("fire");
      laserSfx();
    }, 60);
    setTimeout(() => {
      explode(c.x, c.y, ["#fbbf24", "#f97316", "#fff", "#f472b6"]);
      en.el.style.setProperty("--tx", `${enemyX(en)}px`); en.el.style.setProperty("--ty", `${en.y}px`);
      en.el.classList.add("dying");
      setTimeout(() => en.el.remove(), 400);
      sfxExplode();
    }, 200);

    // score
    G.combo++; G.bestCombo = Math.max(G.bestCombo, G.combo); G.correct++; G.resolved++;
    const comboBonus = Math.min(10, Math.max(0, G.combo - 1) * 2);
    const speedBonus = Math.round(Math.max(0, 1 - c.y / dangerY) * 8);
    const gained = Math.max(1, 10 + comboBonus + speedBonus - en.hinted * HINT_COST);
    G.score += gained;
    if (!en.hinted) { state.learned[en.w.word] = true; if (state.wrong[en.w.word]) { state.wrong[en.w.word]--; if (state.wrong[en.w.word] <= 0) delete state.wrong[en.w.word]; } }
    saveState();
    setFeedback(`✅ <span class="ans">${esc(en.w.word)}</span> = ${esc(en.w.vi)} · +${gained}`, "good");
    if (G.combo >= 3 && G.combo % 3 === 0) arenaMsg(`🔥 Combo x${G.combo}!`);
    const hc = $("hud-combo"); hc.classList.remove("pop"); void hc.offsetWidth; hc.classList.add("pop");
    if (G.mode !== "listen") speak(en.w.word);
    inp.value = ""; highlightMatches("");
    renderHUD();
  }

  function escape(en) {
    en.dead = true;
    const c = enemyCenter(en);
    explode(c.x, c.y, ["#ef4444", "#7f1d1d", "#fca5a5"], 20);
    en.el.style.setProperty("--tx", `${enemyX(en)}px`); en.el.style.setProperty("--ty", `${en.y}px`);
    en.el.classList.add("escaped"); setTimeout(() => en.el.remove(), 600);
    G.combo = 0; G.lives--; G.resolved++; G.wrongWords.push(en.w);
    state.wrong[en.w.word] = (state.wrong[en.w.word] || 0) + 1; delete state.learned[en.w.word];
    saveState();
    arena.classList.remove("flash-bad"); void arena.offsetWidth; arena.classList.add("flash-bad");
    shipEl.classList.remove("hit"); void shipEl.offsetWidth; shipEl.classList.add("hit");
    arenaMsg(`💥 ${en.w.word} = ${en.w.vi}`, true);
    setFeedback(`💔 Lọt lưới: <span class="ans">${esc(en.w.word)}</span> = ${esc(en.w.vi)}`, "bad");
    sfxMiss(); speak(en.w.word);
    renderHUD();
    if (G.lives <= 0) { G.over = true; setTimeout(() => finish(false), 900); }
  }

  function hint() {
    if (!G || G.paused || G.over) return;
    const en = nearest(); if (!en) return;
    if (en.hinted >= en.w.word.length - 1) { toast("Hết gợi ý cho từ này rồi!"); return; }
    en.hinted++; G.hintsUsed++;
    G.score = Math.max(0, G.score - HINT_COST);
    renderBlanks(en); renderHUD(); sfxClick();
    const inp = $("answer");
    if (!norm(inp.value) || en.w.word.startsWith(norm(inp.value))) { inp.value = en.w.word.slice(0, en.hinted); }
    highlightMatches(inp.value); inp.focus();
  }

  function highlightMatches(typed) {
    const t = norm(typed);
    for (const e of G.enemies) e.el.classList.toggle("match", !!t && !e.dead && e.w.word.startsWith(t));
  }
  function setFeedback(html, cls) { const f = $("feedback"); f.innerHTML = html; f.className = "feedback " + cls; }

  function togglePause(force) {
    if (!G || G.over) return;
    G.paused = force !== undefined ? force : !G.paused;
    $("pause-overlay").classList.toggle("show", G.paused);
    if (!G.paused) { lastT = performance.now(); $("answer").focus(); }
  }
  function quit() {
    stopLoop(); if (window.speechSynthesis) speechSynthesis.cancel();
    G = null; enemiesEl.innerHTML = ""; renderHome(); show("home");
  }

  /* ---------- Finish ---------- */
  function finish(completed) {
    if (!G) return;
    G.over = true; stopLoop();
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
    const today = todayStr();
    if (state.streak.last !== today) {
      const y = new Date(); y.setDate(y.getDate() - 1);
      state.streak.count = state.streak.last === y.toISOString().slice(0, 10) ? state.streak.count + 1 : 1;
      state.streak.last = today;
    }
    saveState();

    $("result-stars").textContent = "★".repeat(stars) + "☆".repeat(3 - stars);
    $("result-title").textContent = completed ? (stars === 3 ? "Hoàn hảo! 🎉" : "Dọn sạch bầu trời! 🚀") : "Tàu bị hạ! 💥";
    $("result-sub").textContent = `${G.title} · ${G.subtitle}`;
    $("r-score").textContent = G.score;
    $("r-acc").textContent = acc + "%";
    $("r-combo").textContent = G.bestCombo;
    $("r-xp").textContent = "+" + xp;
    const wl = $("wrong-list"); wl.innerHTML = "";
    const missed = G.wrongWords.concat(completed ? [] : G.queue, completed ? [] : alive().map((e) => e.w));
    if (missed.length) {
      wl.innerHTML = `<h3>Từ cần ôn lại (${missed.length})</h3>` + missed.map((w) => `<div class="wrong-item"><b>${esc(w.word)}</b><span>${esc(w.vi)}</span></div>`).join("");
    }
    $("btn-next").style.display = nextUnit() && completed ? "" : "none";
    if (completed) sfxComplete(); else sfxMiss();
    enemiesEl.innerHTML = "";
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
  $("btn-submit").onclick = fire;
  $("answer").addEventListener("animationend", () => $("answer").classList.remove("shake"));
  $("answer").addEventListener("input", (e) => { if (G) highlightMatches(e.target.value); });
  $("btn-speak").onclick = () => { const n = G && nearest(); if (n) speak(n.w.word); $("answer").focus(); };
  $("btn-hint").onclick = hint;
  $("btn-pause").onclick = () => togglePause();
  $("btn-resume").onclick = () => togglePause(false);
  $("btn-quit").onclick = quit;
  $("btn-back").onclick = quit;
  $("btn-home").onclick = () => { G = null; renderHome(); show("home"); };
  $("btn-retry").onclick = () => { if (G.review) startReview(); else startUnit(G.level, G.unitIdx); };
  $("btn-next").onclick = () => { const n = nextUnit(); if (n) { state.settings.level = n.level.id; saveState(); startUnit(n.level, n.unitIdx); } };
  document.addEventListener("keydown", (e) => {
    if (!G || !$("screen-game").classList.contains("active")) return;
    if (e.key === "Enter") { e.preventDefault(); if (!G.paused) fire(); }
    else if (e.key === "Escape") { e.preventDefault(); togglePause(); }
    else if (e.key === "Tab") { e.preventDefault(); hint(); }
    else if (e.key.length === 1 && document.activeElement !== $("answer") && !G.paused) $("answer").focus();
  });
  document.addEventListener("visibilitychange", () => { if (document.hidden && G && !G.over) togglePause(true); });

  /* ---------- Init ---------- */
  applyTheme();
  renderHome();
  show("home");
})();
