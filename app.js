const STORAGE_KEY = "ui_playground_state_v30";

const defaultState = {
  theme: "light",
  mood: "dawn",
  accent: "teal",
  ringMode: "orbit",
  soundEnabled: true,
  xrayMode: false,
  activeTab: "overview",
  category: "all",
  activeTag: "",
  sortBy: "default",
  search: "",
  snippet: "buttons",
  customSnippets: {},
  openAccordionId: "acc-1",
  compactMode: false,
  autoScrollCode: true,
  inspectOverlay: false,
  showActivityLog: true,
  cardOrder: [],
  activityLog: [],
  customCards: [],
  favoriteIds: [],
  compareIds: [],
  btnConfig: {
    text: "Сақтау",
    variant: "btn-primary",
    size: "normal",
    disabled: false
  }
};

const statePresets = {
  focus: {
    label: "Қараңғы фокус",
    patch: {
      theme: "dark",
      mood: "studio",
      accent: "slate",
      ringMode: "calm",
      compactMode: true,
      category: "all",
      activeTag: "",
      sortBy: "default"
    }
  },
  terracotta: {
    label: "Терракота витрина",
    patch: {
      theme: "light",
      mood: "dawn",
      accent: "terracotta",
      ringMode: "orbit",
      compactMode: false,
      category: "all",
      activeTag: "",
      sortBy: "default"
    }
  },
  favorites: {
    label: "Таңдаулылар шолуы",
    patch: {
      category: "favorites",
      sortBy: "title-asc"
    }
  }
};

const sectionCodeResonance = {
  "#buttonsSection": {
    outer: "<button class='btn'> · hover · active · disabled · state.btnConfig · ",
    mid: "transition: transform 0.16s ease · showToast() · WebAudio.tick() · ",
    inner: "btn-primary · btn-secondary · btn-soft · btn-ghost · "
  },
  "#tabsSection": {
    outer: "role='tablist' · aria-selected='true' · ArrowLeft / ArrowRight · ",
    mid: "activateTab(tabId, moveFocus) · Home / End · panelFadeIn · ",
    inner: "state.activeTab · localStorage.setItem() · tabIndex · "
  },
  "#filterSection": {
    outer: "filter(matchesCategory && matchesTag) · sortComponents() · drag & drop · ",
    mid: "cardOrder · compareIds (max 3) · favoriteIds · searchQuery · ",
    inner: "getFilteredComponents() · renderCards() · renderComparePanel() · "
  },
  "#codeSection": {
    outer: "codeEditor.value · customSnippets[key] · revertCodeBtn · ",
    mid: "writeTextToClipboard(text) · resolveSnippetByKey(key) · ",
    inner: "isCustomEdited · autoScrollCode · Consolas monospace · "
  },
  "#stateSection": {
    outer: "JSON.stringify(state) · TimeTravel.undo() · DOM X-Ray 3D · ",
    mid: "heartbeat pulse · state.mood · state.accent · state.cardOrder · ",
    inner: "applyImportedState() · getStateSnapshot() · v30 · "
  }
};

const categoryImages = {
  ui: {
    src: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=600&q=80",
    alt: "UI интерфейс компоненттері мен дизайн макеті"
  },
  state: {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    alt: "Күй мен деректер ағынын бақылау экраны"
  },
  layout: {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
    alt: "Адаптивті орналасу мен жұмыс кеңістігі"
  }
};

const tabsData = [
  {
    id: "overview",
    label: "Шолу",
    heading: "Қойылым (Tabs) компонентінің міндеті",
    description:
      "Бір аймақтағы мазмұнды бөлімдерге бөліп, беттегі артық ұзындықты азайтады және қай бөлім белсенді екенін айқын көрсетеді."
  },
  {
    id: "keyboard",
    label: "Пернетақта",
    heading: "Пернетақтамен навигация",
    description:
      "Қойылым үстінде тұрғанда ArrowLeft / ArrowRight пернелерімен көрші табқа ауысуға, ал Home / End пернелерімен шеткі табтарға өтуге болады. Сондай-ақ Ctrl + Z / Ctrl + Y уақыт машинасын басқарады."
  },
  {
    id: "state",
    label: "Күйді сақтау",
    heading: "Күйді localStorage және Уақыт машинасы арқылы ұстау",
    description:
      "Әр маңызды өзгеріс тарих стегіне жазылады, ал ағымдағы күй localStorage ішінде сақталып, бет жаңарғанда да қалпына келеді."
  }
];

const accordionData = [
  {
    id: "acc-1",
    title: "Неліктен жеке файлдарға (HTML / CSS / JS) бөлінген?",
    content:
      "Құрылымды, стильді және логиканы бөлек ұстау кодты оқуды, өзгеріс енгізуді және портфолиода таза архитектура көрсетуді жеңілдетеді."
  },
  {
    id: "acc-2",
    title: "Уақыт машинасы (Time-Travel) және Web Audio қалай жұмыс істейді?",
    content:
      "Уақыт машинасы әр өзгерістің күй суретін жадтағы стекке сақтап, слайдер немесе Ctrl+Z арқылы кері қайтарады. Ал Web Audio сыртқы файлсыз таза толқын генераторымен жұмсақ тактильді дыбыс береді."
  },
  {
    id: "acc-3",
    title: "3D Рентген (DOM Depth X-Ray) не үшін керек?",
    content:
      "3D Рентген қосылғанда интерфейс қабаттары z-index тереңдігі бойынша кеңістікке бөлініп, қай панель қай деңгейде тұрғанын көрнекі көрсетеді."
  }
];

const baseComponentsData = [
  {
    id: "base-1",
    title: "Күйі бар батырма",
    category: "ui",
    tag: "interactive",
    description: "Белсенді, жүктелу және өшіру күйлерін көрсететін элемент.",
    isCustom: false
  },
  {
    id: "base-2",
    title: "Сүзгі чиптері",
    category: "state",
    tag: "filter",
    description: "Таңдалған санатқа сәйкес карточкалар жиынын жаңартады.",
    isCustom: false
  },
  {
    id: "base-3",
    title: "Адаптивті тор",
    category: "layout",
    tag: "responsive",
    description: "Экран еніне қарай баған санын автоматты өзгертеді.",
    isCustom: false
  },
  {
    id: "base-4",
    title: "Модаль терезе",
    category: "ui",
    tag: "dialog",
    description: "Фокус пен Esc пернесі арқылы басқарылатын диалог.",
    isCustom: false
  },
  {
    id: "base-5",
    title: "LocalStorage күйі",
    category: "state",
    tag: "persistence",
    description: "Пайдаланушы таңдауын бет жаңарғанда да сақтап қалады.",
    isCustom: false
  },
  {
    id: "base-6",
    title: "Жоғарғы навигация панелі",
    category: "layout",
    tag: "header",
    description: "Тақырып пен негізгі әрекет батырмаларын біріктіреді.",
    isCustom: false
  }
];

const snippets = {
  buttons: `<button class="btn btn-primary" type="button">Негізгі әрекет</button>
<button class="btn btn-secondary" type="button">Қосымша</button>`,
  tabs: `function selectTab(nextTabId) {
  state.activeTab = nextTabId;
  saveState(state, "state.activeTab");
  renderTabs();
}`,
  sort: `function sortComponents(items, sortBy) {
  const copy = [...items];
  if (sortBy === "title-asc") {
    return copy.sort((a, b) => a.title.localeCompare(b.title, "kk"));
  }
  if (sortBy === "category-asc") {
    return copy.sort((a, b) => {
      const catCmp = a.category.localeCompare(b.category);
      return catCmp !== 0 ? catCmp : a.title.localeCompare(b.title, "kk");
    });
  }
  return copy;
}`,
  accordion: `function toggleAccordion(itemId) {
  state.openAccordionId = state.openAccordionId === itemId ? null : itemId;
  saveState(state, "state.accordion");
  renderAccordion();
}`,
  switch: `function setSwitch(btn, enabled) {
  btn.classList.toggle("active", enabled);
  btn.setAttribute("aria-checked", String(enabled));
}`
};

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function prefersReducedMotion() {
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function formatNowTime() {
  const now = new Date();
  return now.toLocaleTimeString("kk-KZ", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

function normalizeBtnConfig(rawCfg) {
  const cfg = rawCfg && typeof rawCfg === "object" ? rawCfg : {};
  const validVariants = ["btn-primary", "btn-secondary", "btn-soft", "btn-ghost"];
  const variant = validVariants.includes(cfg.variant)
    ? cfg.variant
    : defaultState.btnConfig.variant;
  const size = cfg.size === "sm" ? "sm" : "normal";
  const text =
    typeof cfg.text === "string" && cfg.text.trim()
      ? cfg.text.trim()
      : defaultState.btnConfig.text;
  const disabled = Boolean(cfg.disabled);

  return { text, variant, size, disabled };
}

function normalizeState(rawObj) {
  const parsed = rawObj && typeof rawObj === "object" ? rawObj : {};

  const validTheme =
    parsed.theme === "dark" || parsed.theme === "light"
      ? parsed.theme
      : defaultState.theme;

  const validMood = ["dawn", "studio", "archive"].includes(parsed.mood)
    ? parsed.mood
    : defaultState.mood;

  const validAccent = ["teal", "terracotta", "slate", "sage"].includes(parsed.accent)
    ? parsed.accent
    : defaultState.accent;

  const validRingMode = ["orbit", "calm", "hyper"].includes(parsed.ringMode)
    ? parsed.ringMode
    : defaultState.ringMode;

  const validTab = tabsData.some((tab) => tab.id === parsed.activeTab)
    ? parsed.activeTab
    : defaultState.activeTab;

  const validCategory = ["all", "favorites", "ui", "state", "layout"].includes(
    parsed.category
  )
    ? parsed.category
    : defaultState.category;

  const validActiveTag =
    typeof parsed.activeTag === "string"
      ? parsed.activeTag.trim().toLowerCase()
      : defaultState.activeTag;

  const validSortBy = ["default", "title-asc", "category-asc"].includes(parsed.sortBy)
    ? parsed.sortBy
    : defaultState.sortBy;

  const validAccordionId =
    parsed.openAccordionId === null ||
    accordionData.some((item) => item.id === parsed.openAccordionId)
      ? parsed.openAccordionId
      : defaultState.openAccordionId;

  const validCustomCards = Array.isArray(parsed.customCards)
    ? parsed.customCards
        .filter(
          (card) =>
            card &&
            typeof card.id === "string" &&
            typeof card.title === "string" &&
            typeof card.description === "string" &&
            ["ui", "state", "layout"].includes(card.category)
        )
        .map((card) => ({
          id: card.id,
          title: card.title,
          category: card.category,
          tag:
            typeof card.tag === "string" && card.tag.trim()
              ? card.tag.trim()
              : "custom",
          description: card.description,
          isCustom: true
        }))
    : [];

  const validCardOrder = Array.isArray(parsed.cardOrder)
    ? Array.from(new Set(parsed.cardOrder.filter((id) => typeof id === "string" && id.trim())))
    : [];

  const validActivityLog = Array.isArray(parsed.activityLog)
    ? parsed.activityLog
        .filter((entry) => entry && typeof entry.message === "string")
        .slice(0, 20)
        .map((entry, idx) => ({
          id: typeof entry.id === "string" ? entry.id : `act-${idx}`,
          message: entry.message,
          time: typeof entry.time === "string" ? entry.time : formatNowTime()
        }))
    : [];

  const validFavoriteIds = Array.isArray(parsed.favoriteIds)
    ? Array.from(
        new Set(parsed.favoriteIds.filter((id) => typeof id === "string" && id.trim()))
      )
    : [];

  const validCompareIds = Array.isArray(parsed.compareIds)
    ? Array.from(
        new Set(parsed.compareIds.filter((id) => typeof id === "string" && id.trim()))
      ).slice(0, 3)
    : [];

  const validCustomSnippets =
    parsed.customSnippets &&
    typeof parsed.customSnippets === "object" &&
    !Array.isArray(parsed.customSnippets)
      ? Object.fromEntries(
          Object.entries(parsed.customSnippets).filter(
            ([k, v]) => typeof k === "string" && typeof v === "string"
          )
        )
      : {};

  const validSnippet =
    snippets[parsed.snippet] ||
    validCustomSnippets[parsed.snippet] ||
    (typeof parsed.snippet === "string" &&
      (parsed.snippet.startsWith("card:") || parsed.snippet === "configured-button"))
      ? parsed.snippet
      : defaultState.snippet;

  return {
    theme: validTheme,
    mood: validMood,
    accent: validAccent,
    ringMode: validRingMode,
    soundEnabled:
      typeof parsed.soundEnabled === "boolean"
        ? parsed.soundEnabled
        : defaultState.soundEnabled,
    xrayMode:
      typeof parsed.xrayMode === "boolean"
        ? parsed.xrayMode
        : defaultState.xrayMode,
    activeTab: validTab,
    category: validCategory,
    activeTag: validActiveTag,
    sortBy: validSortBy,
    search: typeof parsed.search === "string" ? parsed.search : defaultState.search,
    snippet: validSnippet,
    customSnippets: validCustomSnippets,
    openAccordionId: validAccordionId,
    compactMode:
      typeof parsed.compactMode === "boolean"
        ? parsed.compactMode
        : defaultState.compactMode,
    autoScrollCode:
      typeof parsed.autoScrollCode === "boolean"
        ? parsed.autoScrollCode
        : defaultState.autoScrollCode,
    inspectOverlay:
      typeof parsed.inspectOverlay === "boolean"
        ? parsed.inspectOverlay
        : defaultState.inspectOverlay,
    showActivityLog:
      typeof parsed.showActivityLog === "boolean"
        ? parsed.showActivityLog
        : defaultState.showActivityLog,
    cardOrder: validCardOrder,
    activityLog: validActivityLog,
    customCards: validCustomCards,
    favoriteIds: validFavoriteIds,
    compareIds: validCompareIds,
    btnConfig: normalizeBtnConfig(parsed.btnConfig)
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return normalizeState(defaultState);
    }
    return normalizeState(JSON.parse(raw));
  } catch {
    return normalizeState(defaultState);
  }
}

function getStateSnapshot(currentState) {
  return {
    theme: currentState.theme,
    mood: currentState.mood,
    accent: currentState.accent,
    ringMode: currentState.ringMode,
    soundEnabled: currentState.soundEnabled,
    xrayMode: currentState.xrayMode,
    activeTab: currentState.activeTab,
    category: currentState.category,
    activeTag: currentState.activeTag,
    sortBy: currentState.sortBy,
    search: currentState.search,
    snippet: currentState.snippet,
    customSnippets: { ...currentState.customSnippets },
    openAccordionId: currentState.openAccordionId,
    compactMode: currentState.compactMode,
    autoScrollCode: currentState.autoScrollCode,
    inspectOverlay: currentState.inspectOverlay,
    showActivityLog: currentState.showActivityLog,
    cardOrder: [...currentState.cardOrder],
    activityLog: currentState.activityLog.map((item) => ({ ...item })),
    customCards: currentState.customCards.map((item) => ({ ...item })),
    favoriteIds: [...currentState.favoriteIds],
    compareIds: [...currentState.compareIds],
    btnConfig: { ...currentState.btnConfig }
  };
}

/* =========================================================
   1. Web Audio Tactile Synth (Файлсыз дыбыс синтезаторы)
   ========================================================= */
let audioCtx = null;
let waveResetTimer = null;

const soundToggleBtn = document.getElementById("soundToggleBtn");
const soundBtnLabel = document.getElementById("soundBtnLabel");

function triggerWaveVisual() {
  if (!soundToggleBtn) return;
  soundToggleBtn.classList.remove("playing");
  void soundToggleBtn.offsetWidth;
  soundToggleBtn.classList.add("playing");
  if (waveResetTimer) clearTimeout(waveResetTimer);
  waveResetTimer = setTimeout(() => {
    soundToggleBtn.classList.remove("playing");
  }, 420);
}

function playTactileSound(type = "click") {
  if (!state || !state.soundEnabled) return;
  triggerWaveVisual();

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === "save") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.08);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.13);
    } else if (type === "rewind") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(340, now + 0.1);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);
      osc.start(now);
      osc.stop(now + 0.14);
    } else if (type === "xray") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(310, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.14);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.19);
    } else {
      osc.type = "sine";
      osc.frequency.setValueAtTime(430, now);
      osc.frequency.exponentialRampToValueAtTime(290, now + 0.045);
      gain.gain.setValueAtTime(0.028, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);
      osc.start(now);
      osc.stop(now + 0.06);
    }
  } catch {
    // Браузер дыбысқа шектеу қойса үнсіз өтеді
  }
}

function applySoundUI() {
  if (!soundToggleBtn || !soundBtnLabel) return;
  soundToggleBtn.classList.toggle("active", state.soundEnabled);
  soundToggleBtn.setAttribute("aria-pressed", String(state.soundEnabled));
  soundBtnLabel.textContent = state.soundEnabled ? "Дыбыс: Қосулы" : "Дыбыс: Өшірулі";
}

/* =========================================================
   2. DOM Depth X-Ray (3D қабаттар рентгені)
   ========================================================= */
const xrayToggleBtn = document.getElementById("xrayToggleBtn");

function applyXrayMode() {
  document.documentElement.dataset.xray = String(state.xrayMode);
  if (xrayToggleBtn) {
    xrayToggleBtn.classList.toggle("active", state.xrayMode);
    xrayToggleBtn.setAttribute("aria-pressed", String(state.xrayMode));
    xrayToggleBtn.textContent = state.xrayMode ? "3D Рентген: Қосулы" : "3D Рентген";
  }
}

/* =========================================================
   3. State Time-Travel (Уақыт машинасы)
   ========================================================= */
let state = loadState();
let historyStack = [
  {
    snapshot: getStateSnapshot(state),
    label: "Бастапқы күй",
    time: formatNowTime()
  }
];
let historyIndex = 0;
let isRestoringHistory = false;
let ringDirectionMultiplier = 1;
let ringDirectionResetTimer = null;

const undoStateBtn = document.getElementById("undoStateBtn");
const redoStateBtn = document.getElementById("redoStateBtn");
const timeTravelSlider = document.getElementById("timeTravelSlider");
const timeTravelStepLabel = document.getElementById("timeTravelStepLabel");
const timeTravelEventLabel = document.getElementById("timeTravelEventLabel");

function renderTimeTravelUI() {
  if (!undoStateBtn || !redoStateBtn || !timeTravelSlider) return;
  const maxIndex = Math.max(0, historyStack.length - 1);
  undoStateBtn.disabled = historyIndex <= 0;
  redoStateBtn.disabled = historyIndex >= maxIndex;
  timeTravelSlider.max = String(maxIndex);
  timeTravelSlider.value = String(historyIndex);

  const currentFrame = historyStack[historyIndex];
  if (timeTravelStepLabel) {
    timeTravelStepLabel.textContent = `Кадр: ${historyIndex + 1} / ${historyStack.length}`;
  }
  if (timeTravelEventLabel && currentFrame) {
    timeTravelEventLabel.textContent = `${currentFrame.label} (${currentFrame.time})`;
  }
}

function recordHistoryFrame(label) {
  if (isRestoringHistory) return;
  const nextSnap = getStateSnapshot(state);
  const currentEntry = historyStack[historyIndex];
  if (currentEntry && JSON.stringify(currentEntry.snapshot) === JSON.stringify(nextSnap)) {
    return;
  }

  historyStack = historyStack.slice(0, historyIndex + 1);
  historyStack.push({
    snapshot: nextSnap,
    label,
    time: formatNowTime()
  });

  if (historyStack.length > 30) {
    historyStack.shift();
  }
  historyIndex = historyStack.length - 1;
  renderTimeTravelUI();
}

function spinRingsInDirection(dir = -1) {
  ringDirectionMultiplier = dir;
  pulseRings(2.1, true);
  if (ringDirectionResetTimer) clearTimeout(ringDirectionResetTimer);
  ringDirectionResetTimer = setTimeout(() => {
    ringDirectionMultiplier = 1;
  }, 900);
}

function jumpToHistoryIndex(targetIndex) {
  const clamped = Math.max(0, Math.min(historyStack.length - 1, targetIndex));
  if (clamped === historyIndex) return;

  const isGoingBack = clamped < historyIndex;
  historyIndex = clamped;
  const frame = historyStack[historyIndex];
  if (!frame) return;

  isRestoringHistory = true;
  state = normalizeState(frame.snapshot);
  renderAllUI();
  renderTimeTravelUI();
  saveState(state, `timeTravel.${historyIndex + 1}`, "heavy", true);
  isRestoringHistory = false;

  spinRingsInDirection(isGoingBack ? -1.8 : 1.8);
  playTactileSound("rewind");
}

const stateInspectorPreview = document.getElementById("stateInspectorPreview");
const stateHeartbeat = document.getElementById("stateHeartbeat");
const heartbeatKeyLabel = document.getElementById("heartbeatKeyLabel");
const heartbeatStatusLabel = document.getElementById("heartbeatStatusLabel");

let heartbeatTimerId = null;

function triggerStateHeartbeat(keyName = "state.update", weight = "light") {
  if (!stateHeartbeat) return;
  if (heartbeatKeyLabel) {
    heartbeatKeyLabel.textContent = keyName;
  }
  if (heartbeatStatusLabel) {
    heartbeatStatusLabel.textContent =
      weight === "heavy" ? "ауқымды күй жаңарды" : `сақталды · ${formatNowTime()}`;
  }

  stateHeartbeat.classList.remove("pulsing", "pulse-light", "pulse-heavy");
  void stateHeartbeat.offsetWidth;
  stateHeartbeat.classList.add(
    "pulsing",
    weight === "heavy" ? "pulse-heavy" : "pulse-light"
  );

  if (heartbeatTimerId) {
    clearTimeout(heartbeatTimerId);
  }
  heartbeatTimerId = setTimeout(() => {
    stateHeartbeat.classList.remove("pulsing", "pulse-light", "pulse-heavy");
  }, 850);
}

function renderStateInspector(currentState) {
  if (!stateInspectorPreview) return;
  const viewData = {
    ...getStateSnapshot(currentState),
    historyFrames: historyStack.length,
    currentFrame: historyIndex + 1,
    customCardsCount: currentState.customCards.length,
    favoritesCount: currentState.favoriteIds.length,
    compareCount: currentState.compareIds.length,
    activityCount: currentState.activityLog.length
  };
  stateInspectorPreview.textContent = JSON.stringify(viewData, null, 2);
}

function saveState(nextState, metaKey = "state.sync", weight = "light", skipHistory = false) {
  if (!skipHistory) {
    recordHistoryFrame(metaKey);
    playTactileSound(weight === "heavy" ? "save" : "click");
  }
  renderStateInspector(nextState);
  triggerStateHeartbeat(metaKey, weight);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  } catch {
    // localStorage қолжетімсіз болған жағдайда қате шығармай өтеміз
  }
}

let copyTimeoutId = null;
let ringImpulseBoost = 0;
let resonanceBoost = 0;
let draggedCardId = null;

function pulseRings(amount = 1.6, resonate = true) {
  ringImpulseBoost = Math.min(4.5, ringImpulseBoost + amount);
  if (resonate) {
    resonanceBoost = Math.min(1.0, resonanceBoost + 0.65);
  }
}

const scrollProgressBar = document.getElementById("scrollProgressBar");
const moodPills = Array.from(document.querySelectorAll(".mood-pill"));
const presetPills = Array.from(document.querySelectorAll(".preset-pill"));
const accentPills = Array.from(document.querySelectorAll(".accent-pill"));
const modePills = Array.from(document.querySelectorAll(".mode-pill"));
const jumpButtons = Array.from(document.querySelectorAll(".quick-link"));
const pointerAura = document.getElementById("pointerAura");
const edgeCodeRings = Array.from(document.querySelectorAll(".edge-code-ring"));
const edgeCodeRain = document.getElementById("edgeCodeRain");
const edgeCodeRainLeftTop = document.getElementById("edgeCodeRainLeftTop");
const edgeCodeRainLeftBottom = document.getElementById("edgeCodeRainLeftBottom");
const edgeCode3dRotor = document.getElementById("edgeCode3dRotor");
const rotorLeftTop = document.getElementById("rotorLeftTop");
const rotorLeftBottom = document.getElementById("rotorLeftBottom");
const edgeOuterSpin = document.getElementById("edgeOuterSpin");
const edgeMidSpin = document.getElementById("edgeMidSpin");
const edgeInnerSpin = document.getElementById("edgeInnerSpin");
const spinLeftTopOuter = document.getElementById("spinLeftTopOuter");
const spinLeftTopInner = document.getElementById("spinLeftTopInner");
const spinLeftBottomOuter = document.getElementById("spinLeftBottomOuter");
const spinLeftBottomInner = document.getElementById("spinLeftBottomInner");
const outerRingTextPath = document.getElementById("outerRingTextPath");
const midRingTextPath = document.getElementById("midRingTextPath");
const innerRingTextPath = document.getElementById("innerRingTextPath");
const leftTopOuterTextPath = document.getElementById("leftTopOuterTextPath");
const leftBottomOuterTextPath = document.getElementById("leftBottomOuterTextPath");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const tabButtons = Array.from(document.querySelectorAll(".tab-btn"));
const tabPanelsContainer = document.getElementById("tabPanels");
const cfgTextInput = document.getElementById("cfgTextInput");
const cfgVariantSelect = document.getElementById("cfgVariantSelect");
const cfgSizeSelect = document.getElementById("cfgSizeSelect");
const cfgDisabledCheck = document.getElementById("cfgDisabledCheck");
const cfgSendToCodeBtn = document.getElementById("cfgSendToCodeBtn");
const cfgPreviewBtn = document.getElementById("cfgPreviewBtn");
const addCardForm = document.getElementById("addCardForm");
const cardTitleInput = document.getElementById("cardTitleInput");
const cardCategorySelect = document.getElementById("cardCategorySelect");
const cardTagInput = document.getElementById("cardTagInput");
const cardDescInput = document.getElementById("cardDescInput");
const activeTagBadge = document.getElementById("activeTagBadge");
const cardsGrid = document.getElementById("cardsGrid");
const resultsMeta = document.getElementById("resultsMeta");
const sortSelect = document.getElementById("sortSelect");
const searchInput = document.getElementById("searchInput");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");
const comparePanel = document.getElementById("comparePanel");
const compareCountBadge = document.getElementById("compareCountBadge");
const clearCompareBtn = document.getElementById("clearCompareBtn");
const compareTableWrap = document.getElementById("compareTableWrap");
const accordionList = document.getElementById("accordionList");
const compactSwitchBtn = document.getElementById("compactSwitchBtn");
const autoScrollSwitchBtn = document.getElementById("autoScrollSwitchBtn");
const inspectOverlaySwitchBtn = document.getElementById("inspectOverlaySwitchBtn");
const activityLogSwitchBtn = document.getElementById("activityLogSwitchBtn");
const activityLogBox = document.getElementById("activityLogBox");
const activityCountBadge = document.getElementById("activityCountBadge");
const clearActivityBtn = document.getElementById("clearActivityBtn");
const activityLogList = document.getElementById("activityLogList");
const resetStateBtn = document.getElementById("resetStateBtn");
const chips = document.querySelectorAll(".chip");
const btnStatus = document.getElementById("btnStatus");
const demoPrimaryBtn = document.getElementById("demoPrimaryBtn");
const demoSecondaryBtn = document.getElementById("demoSecondaryBtn");
const demoLoadingBtn = document.getElementById("demoLoadingBtn");
const demoToastBtn = document.getElementById("demoToastBtn");
const codeEditor = document.getElementById("codeEditor");
const activeSnippetLabel = document.getElementById("activeSnippetLabel");
const customCodeBadge = document.getElementById("customCodeBadge");
const revertCodeBtn = document.getElementById("revertCodeBtn");
const copyCodeBtn = document.getElementById("copyCodeBtn");
const copyFeedback = document.getElementById("copyFeedback");
const toggleImportBtn = document.getElementById("toggleImportBtn");
const copyStateBtn = document.getElementById("copyStateBtn");
const importStateBox = document.getElementById("importStateBox");
const importStateTextarea = document.getElementById("importStateTextarea");
const applyImportBtn = document.getElementById("applyImportBtn");
const toastContainer = document.getElementById("toastContainer");
const modalBackdrop = document.getElementById("modalBackdrop");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const confirmModalBtn = document.getElementById("confirmModalBtn");

function renderActivityLog() {
  if (!activityLogBox || !activityLogList || !activityCountBadge) return;
  activityLogBox.classList.toggle("hidden", !state.showActivityLog);
  activityCountBadge.textContent = String(state.activityLog.length);

  if (state.activityLog.length === 0) {
    activityLogList.innerHTML = `<li class="activity-empty">Әзірге әрекеттер тіркелмеген.</li>`;
    return;
  }

  activityLogList.innerHTML = state.activityLog
    .map(
      (entry) => `
      <li class="activity-item">
        <span class="activity-msg">${escapeHtml(entry.message)}</span>
        <span class="activity-time">${escapeHtml(entry.time)}</span>
      </li>
    `
    )
    .join("");
}

function logActivity(message, shouldSave = true, metaKey = "state.activity") {
  if (!message) return;
  const entry = {
    id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    message,
    time: formatNowTime()
  };
  state.activityLog = [entry, ...state.activityLog].slice(0, 20);
  renderActivityLog();
  if (shouldSave) {
    saveState(state, metaKey, "light");
  }
}

function applyMood() {
  document.documentElement.dataset.mood = state.mood;
  moodPills.forEach((pill) => {
    pill.classList.toggle("active", pill.dataset.mood === state.mood);
  });
}

function applyAccent() {
  document.documentElement.dataset.accent = state.accent;
  accentPills.forEach((pill) => {
    pill.classList.toggle("active", pill.dataset.accent === state.accent);
  });
}

function renderRingModeUI() {
  modePills.forEach((pill) => {
    pill.classList.toggle("active", pill.dataset.ringMode === state.ringMode);
  });
}

function renderAllUI() {
  applySoundUI();
  applyXrayMode();
  applyTheme();
  applyMood();
  applyAccent();
  renderRingModeUI();
  applySwitches();
  renderButtonConfigurator();
  renderTabs();
  renderCards();
  renderComparePanel();
  renderAccordion();
  showSnippet(state.snippet, false, true);
}

function applyPreset(presetKey) {
  const preset = statePresets[presetKey];
  if (!preset) return;

  state = normalizeState({
    ...getStateSnapshot(state),
    ...preset.patch
  });

  renderAllUI();
  pulseRings(1.8, true);
  showToast(`«${preset.label}» күй суреті қолданылды`);
  logActivity(`Күй суреті: «${preset.label}»`, false);
  saveState(state, `preset.${presetKey}`, "heavy");
}

function syncCodeResonanceForSection(selector) {
  const config = sectionCodeResonance[selector] || sectionCodeResonance["#buttonsSection"];
  if (outerRingTextPath) outerRingTextPath.textContent = config.outer;
  if (midRingTextPath) midRingTextPath.textContent = config.mid;
  if (innerRingTextPath) innerRingTextPath.textContent = config.inner;
  if (leftTopOuterTextPath) leftTopOuterTextPath.textContent = config.outer;
  if (leftBottomOuterTextPath) leftBottomOuterTextPath.textContent = config.mid;
}

function updateScrollProgress() {
  if (!scrollProgressBar) return;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
  scrollProgressBar.style.width = `${(ratio * 100).toFixed(1)}%`;
}

function updateScrollSpy() {
  if (jumpButtons.length === 0) return;
  const threshold = window.scrollY + 180;
  let activeSelector = jumpButtons[0].dataset.jump;

  jumpButtons.forEach((btn) => {
    const sel = btn.dataset.jump;
    const section = sel ? document.querySelector(sel) : null;
    if (section && section.offsetTop <= threshold) {
      activeSelector = sel;
    }
  });

  jumpButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.jump === activeSelector);
  });
  syncCodeResonanceForSection(activeSelector);
}

function renderRainColumns(container, lines, baseDuration = 14) {
  if (!container) return;
  container.innerHTML = lines
    .map((line, idx) => {
      const duration = baseDuration + idx * 3;
      const delay = -(idx * 2.8);
      const repeated = `${line} · ${line}`;
      return `<span class="edge-rain-col" style="animation-duration:${duration}s;animation-delay:${delay}s">${escapeHtml(repeated)}</span>`;
    })
    .join("");
}

function buildEdgeCodeRain() {
  renderRainColumns(
    edgeCodeRain,
    [
      "const state = useState(init); return <3D />; async function save() {}",
      "grid-template-columns: repeat(auto-fit); transform: rotateX(22deg);",
      "localStorage.setItem(KEY, JSON.stringify(state)); aria-expanded='true'",
      "requestAnimationFrame(tick); pointermove -> angle += deltaY * 0.62;",
      "border-radius: 999px; transition: transform 0.22s ease; --accent: #3b7a78;"
    ],
    14
  );

  renderRainColumns(
    edgeCodeRainLeftTop,
    [
      "flex-direction: column; gap: 18px; border-radius: 18px;",
      "aria-selected='true'; role='tablist'; saveState(state);",
      "transition: background-color 0.22s ease; box-shadow: var(--shadow-soft);",
      "const filtered = items.filter(matchesCategory && matchesTag);"
    ],
    15
  );

  renderRainColumns(
    edgeCodeRainLeftBottom,
    [
      "JSON.parse(raw); normalizeState(parsed); localStorage.getItem(KEY);",
      "scrollIntoView({ behavior: 'smooth', block: 'nearest' });",
      "rotateX(20deg) rotateY(24deg) translateZ(28px); pointermove;",
      "const sorted = sortComponents(filtered, state.sortBy);"
    ],
    16
  );
}

function initEdgeCodeRing() {
  buildEdgeCodeRain();
  updateScrollProgress();
  updateScrollSpy();

  if (
    !edgeCode3dRotor ||
    !edgeOuterSpin ||
    !edgeMidSpin ||
    !edgeInnerSpin ||
    prefersReducedMotion()
  ) {
    return;
  }

  let baseAngle = 0;
  let pointerOffset = 0;
  let targetPointerOffset = 0;
  let targetTiltX = 22;
  let targetTiltY = -24;
  let currentTiltX = 22;
  let currentTiltY = -24;
  let scrollTiltBias = 0;
  let lastPointerY = null;
  let lastTimestamp = performance.now();

  const updatePointerInfluence = (clientX, clientY) => {
    const width = window.innerWidth || 1;
    const height = window.innerHeight || 1;
    const distanceFromRight = Math.max(0, width - clientX);
    const distanceFromLeft = Math.max(0, clientX);

    if (pointerAura) {
      pointerAura.style.left = `${clientX}px`;
      pointerAura.style.top = `${clientY}px`;
      pointerAura.style.opacity = "0.85";
    }

    const modeTiltScale = state.ringMode === "calm" ? 0.45 : state.ringMode === "hyper" ? 1.35 : 1;
    const normY = (clientY / height - 0.5) * 2;
    const clampedRightX = Math.max(0, Math.min(1, distanceFromRight / Math.min(width, 480)));

    targetTiltX = 22 - normY * 26 * modeTiltScale + scrollTiltBias;
    targetTiltY = -24 + clampedRightX * 30 * modeTiltScale;

    const nearEdgeDist = Math.min(distanceFromRight, distanceFromLeft);
    if (nearEdgeDist < 360) {
      const proximity = 1 - nearEdgeDist / 360;
      const deltaY = lastPointerY === null ? 0 : clientY - lastPointerY;
      targetPointerOffset += deltaY * 0.62 * modeTiltScale * (0.45 + proximity);
      if (Math.abs(deltaY) > 2) {
        resonanceBoost = Math.min(1.0, resonanceBoost + 0.12);
      }
    } else {
      targetPointerOffset *= 0.92;
    }

    lastPointerY = clientY;
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      updatePointerInfluence(event.clientX, event.clientY);
    },
    { passive: true }
  );

  window.addEventListener("pointerleave", () => {
    lastPointerY = null;
    targetPointerOffset = 0;
    targetTiltX = 22 + scrollTiltBias;
    targetTiltY = -24;
    if (pointerAura) {
      pointerAura.style.opacity = "0";
    }
  });

  window.addEventListener(
    "scroll",
    () => {
      updateScrollProgress();
      updateScrollSpy();
      const scrollY = window.scrollY || 0;
      scrollTiltBias = Math.sin(scrollY * 0.008) * 10;
      targetTiltX = 22 + scrollTiltBias;
      pulseRings(0.25, false);
    },
    { passive: true }
  );

  const tick = (now) => {
    const dt = Math.min((now - lastTimestamp) / 1000, 0.1);
    lastTimestamp = now;

    const modeBaseSpeed =
      state.ringMode === "calm" ? 5.5 : state.ringMode === "hyper" ? 42 : 16;
    const speedMultiplier = (1 + ringImpulseBoost) * ringDirectionMultiplier;
    ringImpulseBoost = Math.max(0, ringImpulseBoost - dt * 2.1);
    resonanceBoost = Math.max(0, resonanceBoost - dt * 1.15);

    const isResonant = resonanceBoost > 0.14;
    edgeCodeRings.forEach((ringEl) => {
      ringEl.classList.toggle("resonant", isResonant);
    });

    baseAngle = (baseAngle + dt * modeBaseSpeed * speedMultiplier + 360) % 360;
    pointerOffset += (targetPointerOffset - pointerOffset) * Math.min(1, dt * 8);
    targetPointerOffset *= Math.pow(0.25, dt);

    const smoothFactor = Math.min(1, dt * 6.5);
    const resonanceBreath = Math.sin(now * 0.007) * 5.5 * resonanceBoost;
    currentTiltX += (targetTiltX + resonanceBreath - currentTiltX) * smoothFactor;
    currentTiltY += (targetTiltY - currentTiltY) * smoothFactor;

    const outerDeg = baseAngle + pointerOffset;
    const midDeg = -(baseAngle * 0.58) + pointerOffset * 0.65;
    const innerDeg = -(baseAngle * 0.88) - pointerOffset * 0.95;

    edgeCode3dRotor.style.transform = `rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg)`;
    edgeOuterSpin.setAttribute("transform", `rotate(${outerDeg.toFixed(2)} 190 190) translate(0 -3)`);
    edgeMidSpin.setAttribute("transform", `rotate(${midDeg.toFixed(2)} 190 190)`);
    edgeInnerSpin.setAttribute("transform", `rotate(${innerDeg.toFixed(2)} 190 190) translate(0 3)`);

    if (rotorLeftTop && spinLeftTopOuter && spinLeftTopInner) {
      const leftTopTiltX = 20 - (currentTiltX - 22) * 0.7;
      const leftTopTiltY = 24 - (currentTiltY + 24) * 0.65;
      rotorLeftTop.style.transform = `rotateX(${leftTopTiltX.toFixed(2)}deg) rotateY(${leftTopTiltY.toFixed(2)}deg)`;
      spinLeftTopOuter.setAttribute("transform", `rotate(${(-(baseAngle * 0.78) - pointerOffset * 0.8).toFixed(2)} 160 160)`);
      spinLeftTopInner.setAttribute("transform", `rotate(${((baseAngle * 0.62) + pointerOffset * 0.7).toFixed(2)} 160 160)`);
    }

    if (rotorLeftBottom && spinLeftBottomOuter && spinLeftBottomInner) {
      const leftBottomTiltX = 20 + (currentTiltX - 22) * 0.7;
      const leftBottomTiltY = 24 + (currentTiltY + 24) * 0.65;
      rotorLeftBottom.style.transform = `rotateX(${leftBottomTiltX.toFixed(2)}deg) rotateY(${leftBottomTiltY.toFixed(2)}deg)`;
      spinLeftBottomOuter.setAttribute("transform", `rotate(${((baseAngle * 0.68) + pointerOffset * 0.75).toFixed(2)} 160 160)`);
      spinLeftBottomInner.setAttribute("transform", `rotate(${(-(baseAngle * 0.92) - pointerOffset * 0.85).toFixed(2)} 160 160)`);
    }

    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

function showToast(message) {
  pulseRings(1.1);
  const toastEl = document.createElement("div");
  toastEl.className = "toast";
  toastEl.setAttribute("role", "status");
  toastEl.innerHTML = `
    <span>${escapeHtml(message)}</span>
    <button class="toast-close" type="button" aria-label="Хабарламаны жабу">✕</button>
  `;

  const removeToast = () => {
    if (toastEl.parentNode) {
      toastEl.parentNode.removeChild(toastEl);
    }
  };

  toastEl.querySelector(".toast-close").addEventListener("click", removeToast);
  toastContainer.appendChild(toastEl);

  setTimeout(removeToast, 2500);
}

function buildConfiguredButtonHtml(cfg) {
  const sizeClass = cfg.size === "sm" ? " btn-sm" : "";
  const disabledAttr = cfg.disabled ? " disabled" : "";
  return `<button class="btn ${cfg.variant}${sizeClass}" type="button"${disabledAttr}>${escapeHtml(cfg.text)}</button>`;
}

function renderButtonConfigurator() {
  const cfg = state.btnConfig;
  cfgTextInput.value = cfg.text;
  cfgVariantSelect.value = cfg.variant;
  cfgSizeSelect.value = cfg.size;
  cfgDisabledCheck.checked = cfg.disabled;

  const sizeClass = cfg.size === "sm" ? " btn-sm" : "";
  cfgPreviewBtn.className = `btn ${cfg.variant}${sizeClass}`;
  cfgPreviewBtn.textContent = cfg.text;
  cfgPreviewBtn.disabled = cfg.disabled;
}

function getAllComponents() {
  const combined = [...baseComponentsData, ...state.customCards];
  if (!Array.isArray(state.cardOrder) || state.cardOrder.length === 0) {
    return combined;
  }

  const rankMap = new Map(state.cardOrder.map((id, index) => [id, index]));
  return [...combined].sort((a, b) => {
    const rankA = rankMap.has(a.id) ? rankMap.get(a.id) : Number.MAX_SAFE_INTEGER;
    const rankB = rankMap.has(b.id) ? rankMap.get(b.id) : Number.MAX_SAFE_INTEGER;
    return rankA - rankB;
  });
}

function moveCardById(cardId, direction) {
  if (state.sortBy !== "default") {
    state.sortBy = "default";
    sortSelect.value = "default";
  }

  const ordered = getAllComponents();
  const ids = ordered.map((c) => c.id);
  const currentIdx = ids.indexOf(cardId);
  if (currentIdx === -1) return;

  const targetIdx = direction === "up" ? currentIdx - 1 : currentIdx + 1;
  if (targetIdx < 0 || targetIdx >= ids.length) return;

  const [moved] = ids.splice(currentIdx, 1);
  ids.splice(targetIdx, 0, moved);
  state.cardOrder = ids;

  const movedCard = ordered[currentIdx];
  logActivity(
    `«${movedCard.title}» карточкасы ${direction === "up" ? "жоғары" : "төмен"} жылжытылды`,
    false
  );
  saveState(state, "state.cardOrder", "light");
  renderCards();
}

function reorderCardBefore(sourceId, targetId) {
  if (!sourceId || !targetId || sourceId === targetId) return;

  if (state.sortBy !== "default") {
    state.sortBy = "default";
    sortSelect.value = "default";
  }

  const ordered = getAllComponents();
  const ids = ordered.map((c) => c.id);
  const fromIdx = ids.indexOf(sourceId);
  const toIdx = ids.indexOf(targetId);
  if (fromIdx === -1 || toIdx === -1) return;

  const [moved] = ids.splice(fromIdx, 1);
  ids.splice(toIdx, 0, moved);
  state.cardOrder = ids;

  const movedItem = ordered[fromIdx];
  logActivity(`«${movedItem.title}» карточкасының орны ауыстырылды`, false);
  saveState(state, "state.cardOrder", "light");
  renderCards();
  showToast(`«${movedItem.title}» орны жаңартылды`);
}

function buildCardSnippet(item) {
  const tagValue = item.tag || item.category;
  return `<article class="card" data-category="${item.category}" data-tag="${tagValue}">
  <span class="badge">${item.category}</span>
  <h3>${item.title}</h3>
  <p>${item.description}</p>
</article>`;
}

function getDefaultSnippetByKey(key) {
  if (key === "configured-button") {
    return {
      label: "configured-button",
      code: buildConfiguredButtonHtml(state.btnConfig)
    };
  }
  if (snippets[key]) {
    return { label: key, code: snippets[key] };
  }
  if (typeof key === "string" && key.startsWith("card:")) {
    const cardId = key.slice(5);
    const card = getAllComponents().find((item) => item.id === cardId);
    if (card) {
      return { label: `card:${card.title}`, code: buildCardSnippet(card) };
    }
  }
  return { label: "buttons", code: snippets.buttons };
}

function resolveSnippetByKey(key) {
  const base = getDefaultSnippetByKey(key);
  const hasCustom =
    Object.prototype.hasOwnProperty.call(state.customSnippets, key) &&
    typeof state.customSnippets[key] === "string";
  return {
    label: base.label,
    code: hasCustom ? state.customSnippets[key] : base.code,
    isCustomEdited: hasCustom
  };
}

function isFavorite(cardId) {
  return state.favoriteIds.includes(cardId);
}

function isCompared(cardId) {
  return state.compareIds.includes(cardId);
}

function toggleFavorite(cardId) {
  const target = getAllComponents().find((item) => item.id === cardId);
  if (!target) return;

  if (isFavorite(cardId)) {
    state.favoriteIds = state.favoriteIds.filter((id) => id !== cardId);
    showToast(`«${target.title}» таңдаулылардан алынды`);
    logActivity(`Таңдаулыдан алынды: «${target.title}»`, false);
  } else {
    state.favoriteIds.push(cardId);
    showToast(`«${target.title}» таңдаулыларға сақталды`);
    logActivity(`Таңдаулыға қосылды: «${target.title}»`, false);
  }

  saveState(state, "state.favoriteIds", "light");
  renderCards();
}

function toggleCompare(cardId) {
  const target = getAllComponents().find((item) => item.id === cardId);
  if (!target) return;

  if (isCompared(cardId)) {
    state.compareIds = state.compareIds.filter((id) => id !== cardId);
    showToast(`«${target.title}» салыстырудан алынды`);
    logActivity(`Салыстырудан алынды: «${target.title}»`, false);
  } else {
    if (state.compareIds.length >= 3) {
      showToast("Бір уақытта ең көбі 3 карточка салыстырылады");
      return;
    }
    state.compareIds.push(cardId);
    showToast(`«${target.title}» салыстыруға қосылды`);
    logActivity(`Салыстыруға қосылды: «${target.title}»`, false);
  }

  saveState(state, "state.compareIds", "light");
  renderCards();
  renderComparePanel();
}

function renderComparePanel() {
  if (!comparePanel || !compareTableWrap || !compareCountBadge) return;

  const items = state.compareIds
    .map((id) => getAllComponents().find((c) => c.id === id))
    .filter(Boolean);

  compareCountBadge.textContent = `${items.length} / 3`;

  if (items.length === 0) {
    comparePanel.classList.add("hidden");
    compareTableWrap.innerHTML = "";
    return;
  }

  comparePanel.classList.remove("hidden");

  compareTableWrap.innerHTML = `
    <table class="compare-table">
      <thead>
        <tr>
          <th>Сипаттама</th>
          ${items.map((item) => `<th>${escapeHtml(item.title)}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Санат</td>
          ${items.map((item) => `<td><span class="badge">${escapeHtml(item.category)}</span></td>`).join("")}
        </tr>
        <tr>
          <td>Тег</td>
          ${items.map((item) => `<td>#${escapeHtml(item.tag || "ui")}</td>`).join("")}
        </tr>
        <tr>
          <td>Таңдаулы</td>
          ${items.map((item) => `<td>${isFavorite(item.id) ? "★ Иә" : "☆ Жоқ"}</td>`).join("")}
        </tr>
        <tr>
          <td>Сипаттама</td>
          ${items.map((item) => `<td>${escapeHtml(item.description)}</td>`).join("")}
        </tr>
        <tr>
          <td>Код</td>
          ${items.map((item) => `<td><pre><code>${escapeHtml(buildCardSnippet(item))}</code></pre></td>`).join("")}
        </tr>
      </tbody>
    </table>
  `;
}

function toggleTagFilter(rawTag) {
  const normalizedTag = String(rawTag || "").trim().toLowerCase();
  if (!normalizedTag) return;

  if (state.activeTag === normalizedTag) {
    state.activeTag = "";
    showToast(`#${normalizedTag} тег сүзгісі алынды`);
  } else {
    state.activeTag = normalizedTag;
    showToast(`#${normalizedTag} тегі бойынша сүзгіленді`);
    logActivity(`Тег сүзгісі: #${normalizedTag}`, false);
  }

  saveState(state, "state.activeTag", "light");
  renderCards();
}

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  themeToggleBtn.textContent = state.theme === "dark" ? "Жарық тема" : "Қою тема";
}

function syncSwitchButton(btn, enabled) {
  if (!btn) return;
  btn.classList.toggle("active", enabled);
  btn.setAttribute("aria-checked", String(enabled));
}

function applySwitches() {
  document.documentElement.dataset.compact = String(state.compactMode);
  document.documentElement.dataset.inspect = String(state.inspectOverlay);
  syncSwitchButton(compactSwitchBtn, state.compactMode);
  syncSwitchButton(autoScrollSwitchBtn, state.autoScrollCode);
  syncSwitchButton(inspectOverlaySwitchBtn, state.inspectOverlay);
  syncSwitchButton(activityLogSwitchBtn, state.showActivityLog);
  renderActivityLog();
}

function setCopyFeedback(message) {
  copyFeedback.textContent = message;
  if (copyTimeoutId) {
    clearTimeout(copyTimeoutId);
  }
  if (message) {
    copyTimeoutId = setTimeout(() => {
      copyFeedback.textContent = "";
    }, 1500);
  }
}

async function writeTextToClipboard(textToCopy) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(textToCopy);
      return true;
    }
  } catch {
    // Төмендегі резервтік тәсілге өтеді
  }

  const helperTextarea = document.createElement("textarea");
  helperTextarea.value = textToCopy;
  helperTextarea.setAttribute("readonly", "");
  helperTextarea.style.position = "fixed";
  helperTextarea.style.opacity = "0";
  document.body.appendChild(helperTextarea);
  helperTextarea.select();

  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    document.body.removeChild(helperTextarea);
  }
}

async function copyCurrentCode() {
  const textToCopy = codeEditor.value || "";
  if (!textToCopy) return;

  const ok = await writeTextToClipboard(textToCopy);
  if (ok) {
    setCopyFeedback("Көшірілді!");
    showToast("Код алмасу буферіне көшірілді");
    logActivity(`Код көшірілді (${activeSnippetLabel.textContent})`, false);
    saveState(state, "code.copy", "light");
  } else {
    setCopyFeedback("Көшіру мүмкін болмады");
  }
}

async function copyStateJson() {
  const jsonText = JSON.stringify(getStateSnapshot(state), null, 2);
  const ok = await writeTextToClipboard(jsonText);
  showToast(ok ? "Күй JSON форматында көшірілді" : "Күйді көшіру мүмкін болмады");
}

function applyImportedState() {
  const rawInput = importStateTextarea.value.trim();
  if (!rawInput) {
    showToast("Алдымен JSON мәтінін енгізіңіз");
    return;
  }

  try {
    const parsed = JSON.parse(rawInput);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      showToast("JSON объектісі жарамсыз");
      return;
    }

    state = normalizeState({
      ...getStateSnapshot(state),
      ...parsed
    });
    renderAllUI();
    importStateBox.classList.add("hidden");
    showToast("Импортталған күй қолданылды");
    logActivity("JSON күйі импортталды", false);
    saveState(state, "state.import", "heavy");
  } catch {
    showToast("JSON форматы қате — тексеріп қайта көріңіз");
  }
}

function renderTabs() {
  tabButtons.forEach((btn) => {
    const isSelected = btn.dataset.tab === state.activeTab;
    btn.classList.toggle("active", isSelected);
    btn.setAttribute("aria-selected", String(isSelected));
    btn.tabIndex = isSelected ? 0 : -1;
  });

  const activeData = tabsData.find((tab) => tab.id === state.activeTab) || tabsData[0];
  tabPanelsContainer.innerHTML = `
    <div
      id="panel-${activeData.id}"
      class="tab-panel"
      role="tabpanel"
      aria-labelledby="tab-${activeData.id}"
    >
      <h3>${escapeHtml(activeData.heading)}</h3>
      <p>${escapeHtml(activeData.description)}</p>
    </div>
  `;
}

function activateTab(tabId, moveFocus = false) {
  state.activeTab = tabId;
  saveState(state, "state.activeTab", "light");
  renderTabs();
  pulseRings(0.9, true);

  if (moveFocus) {
    const targetBtn = tabButtons.find((btn) => btn.dataset.tab === tabId);
    if (targetBtn) targetBtn.focus();
  }
}

function renderAccordion() {
  accordionList.innerHTML = accordionData
    .map((item) => {
      const isOpen = state.openAccordionId === item.id;
      return `
        <div class="accordion-item">
          <button
            class="accordion-trigger"
            type="button"
            aria-expanded="${String(isOpen)}"
            aria-controls="body-${escapeHtml(item.id)}"
            data-accordion-id="${escapeHtml(item.id)}"
          >
            <span>${escapeHtml(item.title)}</span>
            <span class="accordion-icon" aria-hidden="true">${isOpen ? "−" : "+"}</span>
          </button>
          ${
            isOpen
              ? `<div id="body-${escapeHtml(item.id)}" class="accordion-body">${escapeHtml(item.content)}</div>`
              : ""
          }
        </div>
      `;
    })
    .join("");
}

function toggleAccordion(itemId) {
  state.openAccordionId = state.openAccordionId === itemId ? null : itemId;
  saveState(state, "state.accordion", "light");
  renderAccordion();
  pulseRings(0.8, true);
}

function sortComponents(items, sortBy) {
  const copy = [...items];
  if (sortBy === "title-asc") {
    return copy.sort((a, b) => a.title.localeCompare(b.title, "kk"));
  }
  if (sortBy === "category-asc") {
    return copy.sort((a, b) => {
      const catCmp = a.category.localeCompare(b.category);
      return catCmp !== 0 ? catCmp : a.title.localeCompare(b.title, "kk");
    });
  }
  return copy;
}

function getFilteredComponents() {
  const allItems = getAllComponents();
  const query = state.search.trim().toLowerCase();

  const filtered = allItems.filter((item) => {
    const matchesCategory =
      state.category === "all" ||
      (state.category === "favorites"
        ? isFavorite(item.id)
        : item.category === state.category);

    const itemTag = (item.tag || "").toLowerCase();
    const matchesTag = !state.activeTag || itemTag === state.activeTag;

    const matchesQuery =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      itemTag.includes(query);

    return matchesCategory && matchesTag && matchesQuery;
  });

  return sortComponents(filtered, state.sortBy);
}

function syncChipsUI() {
  chips.forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.category === state.category);
  });

  if (state.activeTag) {
    activeTagBadge.textContent = `#${state.activeTag} ✕`;
    activeTagBadge.classList.remove("hidden");
  } else {
    activeTagBadge.textContent = "";
    activeTagBadge.classList.add("hidden");
  }
}

function syncClearFiltersButton() {
  const hasActiveFilter =
    state.category !== "all" ||
    Boolean(state.activeTag) ||
    state.sortBy !== "default" ||
    state.search.trim().length > 0;
  clearFiltersBtn.disabled = !hasActiveFilter;
}

function renderCards() {
  syncChipsUI();
  sortSelect.value = state.sortBy;
  searchInput.value = state.search;
  syncClearFiltersButton();

  const allItems = getAllComponents();
  const filtered = getFilteredComponents();
  const tagNote = state.activeTag ? ` · тег: #${state.activeTag}` : "";
  resultsMeta.textContent = `Табылған компоненттер: ${filtered.length} / ${allItems.length} (таңдаулы: ${state.favoriteIds.length} · салыстыруда: ${state.compareIds.length}${tagNote})`;

  if (filtered.length === 0) {
    cardsGrid.innerHTML = `
      <div class="empty-state">
        Сұранысқа сай компонент табылмады. «Сүзгіні тазалау» немесе «Күйді тазалау» батырмасын басып көріңіз.
      </div>
    `;
    return;
  }

  const cardPadPx = state.compactMode ? 11 : 14;
  const contrastLabel = state.theme === "dark" ? "AA/AAA Dark" : "AA/AAA Light";

  cardsGrid.innerHTML = filtered
    .map((item, idx) => {
      const media = categoryImages[item.category] || categoryImages.ui;
      const starred = isFavorite(item.id);
      const compared = isCompared(item.id);
      const tagLabel = item.tag || "ui";
      const isTagActive = state.activeTag === tagLabel.toLowerCase();
      const delayMs = prefersReducedMotion() ? 0 : Math.min(idx * 35, 210);
      const isFirst = idx === 0;
      const isLast = idx === filtered.length - 1;

      const inspectBarHtml = state.inspectOverlay
        ? `<div class="inspect-meta-bar">
            <span>pad: ${cardPadPx}px</span>
            <span>gap: 14px</span>
            <span>${contrastLabel}</span>
          </div>`
        : "";

      return `
      <article
        class="card ${starred ? "favorite" : ""} ${compared ? "compared" : ""}"
        data-card-id="${escapeHtml(item.id)}"
        draggable="true"
        style="animation-delay:${delayMs}ms"
      >
        <img
          class="card-thumb"
          src="${escapeHtml(media.src)}"
          alt="${escapeHtml(media.alt)}"
          loading="lazy"
        />
        <div class="card-top">
          <span class="badge">${escapeHtml(item.category)}</span>
          <div class="card-actions">
            <button
              class="move-card-btn"
              type="button"
              data-move-id="${escapeHtml(item.id)}"
              data-move-dir="up"
              ${isFirst ? "disabled" : ""}
              title="Жоғары жылжыту"
              aria-label="Жоғары жылжыту"
            >↑</button>
            <button
              class="move-card-btn"
              type="button"
              data-move-id="${escapeHtml(item.id)}"
              data-move-dir="down"
              ${isLast ? "disabled" : ""}
              title="Төмен жылжыту"
              aria-label="Төмен жылжыту"
            >↓</button>
            <button
              class="fav-btn ${starred ? "active" : ""}"
              type="button"
              data-fav-id="${escapeHtml(item.id)}"
              aria-pressed="${String(starred)}"
              aria-label="${starred ? "Таңдаулылардан алу" : "Таңдаулыларға қосу"}"
            >${starred ? "★" : "☆"}</button>
            ${
              item.isCustom
                ? `<button class="remove-card-btn" type="button" data-card-id="${escapeHtml(item.id)}" aria-label="Карточканы өшіру">✕</button>`
                : ""
            }
          </div>
        </div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
        ${inspectBarHtml}
        <div class="card-footer">
          <button
            class="card-tag-btn ${isTagActive ? "active" : ""}"
            type="button"
            data-tag="${escapeHtml(tagLabel)}"
            title="Осы тег бойынша сүзгілеу"
          >#${escapeHtml(tagLabel)}</button>
          <div class="card-footer-actions">
            <button
              class="card-cmp-btn ${compared ? "active" : ""}"
              type="button"
              data-cmp-id="${escapeHtml(item.id)}"
              aria-pressed="${String(compared)}"
              title="Салыстыруға қосу"
            >${compared ? "✓ Салыст." : "Салыст."}</button>
            <button
              class="card-code-btn"
              type="button"
              data-card-code-id="${escapeHtml(item.id)}"
              title="Компонент кодын көру"
            >Код</button>
          </div>
        </div>
      </article>
    `;
    })
    .join("");
}

function showSnippet(key, shouldScroll = false, silent = false) {
  const resolved = resolveSnippetByKey(key);
  state.snippet = key;
  if (!silent) {
    saveState(state, "state.snippet", "light");
  }

  activeSnippetLabel.textContent = resolved.label;
  codeEditor.value = resolved.code;
  customCodeBadge.classList.toggle("hidden", !resolved.isCustomEdited);
  revertCodeBtn.disabled = !resolved.isCustomEdited;
  setCopyFeedback("");
  pulseRings(1.2, true);

  if (shouldScroll && state.autoScrollCode) {
    codeEditor.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "nearest"
    });
  }
}

/* Оқиғалар мен басқару батырмалары */
if (soundToggleBtn) {
  soundToggleBtn.addEventListener("click", () => {
    state.soundEnabled = !state.soundEnabled;
    applySoundUI();
    if (state.soundEnabled) {
      playTactileSound("save");
    }
    saveState(state, "state.soundEnabled", "light");
  });
}

if (xrayToggleBtn) {
  xrayToggleBtn.addEventListener("click", () => {
    state.xrayMode = !state.xrayMode;
    applyXrayMode();
    playTactileSound("xray");
    pulseRings(1.7, true);
    showToast(state.xrayMode ? "3D Рентген қабаттары қосылды" : "3D Рентген өшірілді");
    saveState(state, "state.xrayMode", "light");
  });
}

if (undoStateBtn) {
  undoStateBtn.addEventListener("click", () => {
    jumpToHistoryIndex(historyIndex - 1);
  });
}

if (redoStateBtn) {
  redoStateBtn.addEventListener("click", () => {
    jumpToHistoryIndex(historyIndex + 1);
  });
}

if (timeTravelSlider) {
  timeTravelSlider.addEventListener("input", (event) => {
    const idx = Number(event.target.value);
    if (!Number.isNaN(idx)) {
      jumpToHistoryIndex(idx);
    }
  });
}

codeEditor.addEventListener("input", (event) => {
  const currentKey = state.snippet;
  const defaultObj = getDefaultSnippetByKey(currentKey);
  const nextVal = event.target.value;

  if (nextVal === defaultObj.code) {
    delete state.customSnippets[currentKey];
  } else {
    state.customSnippets[currentKey] = nextVal;
  }

  saveState(state, "state.customSnippets", "light");
  const isEdited = Object.prototype.hasOwnProperty.call(state.customSnippets, currentKey);
  customCodeBadge.classList.toggle("hidden", !isEdited);
  revertCodeBtn.disabled = !isEdited;
});

revertCodeBtn.addEventListener("click", () => {
  const currentKey = state.snippet;
  if (!Object.prototype.hasOwnProperty.call(state.customSnippets, currentKey)) return;
  delete state.customSnippets[currentKey];
  saveState(state, "state.customSnippets", "light");
  showSnippet(currentKey, false, true);
  showToast("Бастапқы код үлгісі қалпына келтірілді");
});

clearCompareBtn.addEventListener("click", () => {
  if (state.compareIds.length === 0) return;
  state.compareIds = [];
  saveState(state, "state.compareIds", "light");
  renderCards();
  renderComparePanel();
  showToast("Салыстыру тізімі тазартылды");
});

moodPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    const nextMood = pill.dataset.mood;
    if (!["dawn", "studio", "archive"].includes(nextMood)) return;
    state.mood = nextMood;
    applyMood();
    pulseRings(1.4, true);
    showToast(`Атмосфера: ${pill.textContent}`);
    logActivity(`Атмосфера ауысты: ${pill.textContent}`, false);
    saveState(state, `mood.${nextMood}`, "heavy");
  });
});

presetPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    applyPreset(pill.dataset.preset);
  });
});

accentPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    const nextAccent = pill.dataset.accent;
    if (!["teal", "terracotta", "slate", "sage"].includes(nextAccent)) return;
    state.accent = nextAccent;
    applyAccent();
    pulseRings(1.3, true);
    showToast(`Акцент реңкі: ${pill.textContent}`);
    logActivity(`Акцент өзгерді: ${pill.textContent}`, false);
    saveState(state, `accent.${nextAccent}`, "light");
  });
});

modePills.forEach((pill) => {
  pill.addEventListener("click", () => {
    const mode = pill.dataset.ringMode;
    if (!["orbit", "calm", "hyper"].includes(mode)) return;
    state.ringMode = mode;
    saveState(state, `ring.${mode}`, "light");
    renderRingModeUI();
    pulseRings(mode === "hyper" ? 2.4 : 1.0, true);
    showToast(`3D сақина режимі: ${pill.textContent}`);
  });
});

jumpButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selector = btn.dataset.jump;
    const target = selector ? document.querySelector(selector) : null;
    if (target) {
      playTactileSound("click");
      syncCodeResonanceForSection(selector);
      pulseRings(0.9, true);
      target.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start"
      });
    }
  });
});

cfgTextInput.addEventListener("input", (event) => {
  state.btnConfig.text = event.target.value.trim() || "Сақтау";
  saveState(state, "btnConfig.text", "light");
  renderButtonConfigurator();
  if (state.snippet === "configured-button") {
    showSnippet("configured-button", false, true);
  }
});

cfgVariantSelect.addEventListener("change", (event) => {
  state.btnConfig.variant = event.target.value;
  saveState(state, "btnConfig.variant", "light");
  renderButtonConfigurator();
  if (state.snippet === "configured-button") {
    showSnippet("configured-button", false, true);
  }
});

cfgSizeSelect.addEventListener("change", (event) => {
  state.btnConfig.size = event.target.value === "sm" ? "sm" : "normal";
  saveState(state, "btnConfig.size", "light");
  renderButtonConfigurator();
  if (state.snippet === "configured-button") {
    showSnippet("configured-button", false, true);
  }
});

cfgDisabledCheck.addEventListener("change", (event) => {
  state.btnConfig.disabled = event.target.checked;
  saveState(state, "btnConfig.disabled", "light");
  renderButtonConfigurator();
  if (state.snippet === "configured-button") {
    showSnippet("configured-button", false, true);
  }
});

cfgSendToCodeBtn.addEventListener("click", () => {
  showSnippet("configured-button", true);
});

cfgPreviewBtn.addEventListener("click", () => {
  playTactileSound("click");
  btnStatus.textContent = `Күй: превью батырмасы («${state.btnConfig.text}») басылды`;
  pulseRings(1.1, true);
  showToast(`«${state.btnConfig.text}» батырмасы іске қосылды`);
});

activeTagBadge.addEventListener("click", () => {
  if (!state.activeTag) return;
  const clearedTag = state.activeTag;
  state.activeTag = "";
  saveState(state, "state.activeTag", "light");
  renderCards();
  showToast(`#${clearedTag} тег сүзгісі алынды`);
});

clearFiltersBtn.addEventListener("click", () => {
  state.category = "all";
  state.activeTag = "";
  state.sortBy = "default";
  state.search = "";
  saveState(state, "filters.reset", "light");
  renderCards();
  showToast("Сүзгі, тег, іздеу және сұрыптау тазартылды");
});

toggleImportBtn.addEventListener("click", () => {
  playTactileSound("click");
  const isHidden = importStateBox.classList.toggle("hidden");
  if (!isHidden) {
    if (!importStateTextarea.value.trim()) {
      importStateTextarea.value = JSON.stringify(getStateSnapshot(state), null, 2);
    }
    importStateTextarea.focus();
  }
});

copyStateBtn.addEventListener("click", copyStateJson);
applyImportBtn.addEventListener("click", applyImportedState);

sortSelect.addEventListener("change", (event) => {
  state.sortBy = event.target.value;
  saveState(state, "state.sortBy", "light");
  renderCards();
});

compactSwitchBtn.addEventListener("click", () => {
  state.compactMode = !state.compactMode;
  applySwitches();
  renderCards();
  showToast(state.compactMode ? "Ықшам орналасу қосылды" : "Қалыпты орналасу қайтарылды");
  logActivity(state.compactMode ? "Ықшам режим қосылды" : "Ықшам режим өшірілді", false);
  saveState(state, "state.compactMode", "light");
});

autoScrollSwitchBtn.addEventListener("click", () => {
  state.autoScrollCode = !state.autoScrollCode;
  saveState(state, "state.autoScrollCode", "light");
  applySwitches();
  showToast(
    state.autoScrollCode
      ? "Кодқа автоматты өту қосылды"
      : "Кодқа автоматты өту өшірілді"
  );
});

inspectOverlaySwitchBtn.addEventListener("click", () => {
  state.inspectOverlay = !state.inspectOverlay;
  applySwitches();
  renderCards();
  showToast(
    state.inspectOverlay
      ? "Контраст және кеңістік тексергіші қосылды"
      : "Контраст тексергіші өшірілді"
  );
  logActivity(
    state.inspectOverlay ? "Контраст/кеңістік тексергіші қосылды" : "Контраст тексергіші өшірілді",
    false
  );
  saveState(state, "state.inspectOverlay", "light");
});

activityLogSwitchBtn.addEventListener("click", () => {
  state.showActivityLog = !state.showActivityLog;
  saveState(state, "state.showActivityLog", "light");
  applySwitches();
  showToast(state.showActivityLog ? "Оқиғалар журналы ашылды" : "Оқиғалар журналы жасырылды");
});

clearActivityBtn.addEventListener("click", () => {
  state.activityLog = [];
  saveState(state, "activity.clear", "light");
  renderActivityLog();
  showToast("Оқиғалар журналы тазартылды");
});

accordionList.addEventListener("click", (event) => {
  const trigger = event.target.closest(".accordion-trigger");
  if (!trigger) return;
  toggleAccordion(trigger.dataset.accordionId);
});

addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = cardTitleInput.value.trim();
  const category = cardCategorySelect.value;
  const tag = cardTagInput.value.trim() || "custom";
  const description = cardDescInput.value.trim();

  if (!title || !description) return;

  const newCard = {
    id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title,
    category,
    tag,
    description,
    isCustom: true
  };

  state.customCards.push(newCard);
  if (Array.isArray(state.cardOrder) && state.cardOrder.length > 0) {
    state.cardOrder.push(newCard.id);
  }
  logActivity(`Жаңа карточка қосылды: «${title}»`, false);
  saveState(state, "state.customCards", "heavy");
  renderCards();
  showToast(`«${title}» карточкасы қосылды`);

  addCardForm.reset();
  cardTitleInput.focus();
});

cardsGrid.addEventListener("dragstart", (event) => {
  const cardEl = event.target.closest(".card[data-card-id]");
  if (!cardEl) return;
  draggedCardId = cardEl.dataset.cardId;
  cardEl.classList.add("dragging");
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", draggedCardId);
  }
});

cardsGrid.addEventListener("dragover", (event) => {
  const cardEl = event.target.closest(".card[data-card-id]");
  if (!cardEl || cardEl.dataset.cardId === draggedCardId) return;
  event.preventDefault();
  cardEl.classList.add("drag-over");
});

cardsGrid.addEventListener("dragleave", (event) => {
  const cardEl = event.target.closest(".card[data-card-id]");
  if (cardEl) {
    cardEl.classList.remove("drag-over");
  }
});

cardsGrid.addEventListener("drop", (event) => {
  const cardEl = event.target.closest(".card[data-card-id]");
  if (!cardEl) return;
  event.preventDefault();
  cardEl.classList.remove("drag-over");
  const sourceId =
    draggedCardId || (event.dataTransfer ? event.dataTransfer.getData("text/plain") : "");
  const targetId = cardEl.dataset.cardId;
  draggedCardId = null;
  reorderCardBefore(sourceId, targetId);
});

cardsGrid.addEventListener("dragend", () => {
  draggedCardId = null;
  cardsGrid.querySelectorAll(".card.dragging, .card.drag-over").forEach((el) => {
    el.classList.remove("dragging", "drag-over");
  });
});

cardsGrid.addEventListener("click", (event) => {
  const moveBtn = event.target.closest(".move-card-btn");
  if (moveBtn) {
    moveCardById(moveBtn.dataset.moveId, moveBtn.dataset.moveDir);
    return;
  }

  const cmpBtn = event.target.closest(".card-cmp-btn");
  if (cmpBtn) {
    toggleCompare(cmpBtn.dataset.cmpId);
    return;
  }

  const cardCodeBtn = event.target.closest(".card-code-btn");
  if (cardCodeBtn) {
    showSnippet(`card:${cardCodeBtn.dataset.cardCodeId}`, true);
    return;
  }

  const tagBtn = event.target.closest(".card-tag-btn");
  if (tagBtn) {
    toggleTagFilter(tagBtn.dataset.tag);
    return;
  }

  const favBtn = event.target.closest(".fav-btn");
  if (favBtn) {
    toggleFavorite(favBtn.dataset.favId);
    return;
  }

  const removeBtn = event.target.closest(".remove-card-btn");
  if (!removeBtn) return;

  const cardId = removeBtn.dataset.cardId;
  const targetCard = state.customCards.find((card) => card.id === cardId);
  state.customCards = state.customCards.filter((card) => card.id !== cardId);
  state.cardOrder = state.cardOrder.filter((id) => id !== cardId);
  state.favoriteIds = state.favoriteIds.filter((id) => id !== cardId);
  state.compareIds = state.compareIds.filter((id) => id !== cardId);
  if (state.snippet === `card:${cardId}`) {
    state.snippet = defaultState.snippet;
  }
  logActivity(
    `Карточка өшірілді: «${targetCard ? targetCard.title : cardId}»`,
    false
  );
  saveState(state, "state.customCards", "heavy");
  renderCards();
  renderComparePanel();
  showSnippet(state.snippet, false, true);
  showToast("Қосылған карточка өшірілді");
});

function toggleThemeMode() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  applyTheme();
  pulseRings(1.5, true);
  logActivity(state.theme === "dark" ? "Қою тема қосылды" : "Жарық тема қосылды", false);
  saveState(state, "state.theme", "heavy");
}

themeToggleBtn.addEventListener("click", toggleThemeMode);

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    activateTab(btn.dataset.tab, false);
  });

  btn.addEventListener("keydown", (event) => {
    const currentIndex = tabButtons.indexOf(btn);
    if (currentIndex === -1) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % tabButtons.length;
      activateTab(tabButtons[nextIndex].dataset.tab, true);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      const prevIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
      activateTab(tabButtons[prevIndex].dataset.tab, true);
    } else if (event.key === "Home") {
      event.preventDefault();
      activateTab(tabButtons[0].dataset.tab, true);
    } else if (event.key === "End") {
      event.preventDefault();
      activateTab(tabButtons[tabButtons.length - 1].dataset.tab, true);
    }
  });
});

demoPrimaryBtn.addEventListener("click", () => {
  playTactileSound("click");
  btnStatus.textContent = "Күй: негізгі батырма басылды";
  pulseRings(1.3, true);
});

demoSecondaryBtn.addEventListener("click", () => {
  playTactileSound("click");
  btnStatus.textContent = "Күй: қосымша әрекет таңдалды";
  pulseRings(1.3, true);
});

demoLoadingBtn.addEventListener("click", () => {
  playTactileSound("click");
  demoLoadingBtn.disabled = true;
  const oldText = demoLoadingBtn.textContent;
  demoLoadingBtn.textContent = "Жүктелуде...";
  btnStatus.textContent = "Күй: уақытша күту (1.2 сек)";
  pulseRings(1.8, true);

  setTimeout(() => {
    demoLoadingBtn.disabled = false;
    demoLoadingBtn.textContent = oldText;
    btnStatus.textContent = "Күй: дайын";
  }, 1200);
});

demoToastBtn.addEventListener("click", () => {
  playTactileSound("save");
  showToast("Сынақ тост хабарламасы шықты");
});

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    state.category = chip.dataset.category;
    saveState(state, "state.category", "light");
    renderCards();
    pulseRings(0.9, true);
  });
});

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  saveState(state, "state.search", "light");
  renderCards();
});

resetStateBtn.addEventListener("click", () => {
  state = normalizeState({
    ...defaultState,
    activityLog: [
      {
        id: `act-${Date.now()}`,
        message: "Күй бастапқы қалыпқа қайтарылды",
        time: formatNowTime()
      }
    ]
  });
  saveState(state, "state.reset", "heavy");
  renderAllUI();
  btnStatus.textContent = "Күй: бастапқы қалпына келтірілді";
  showToast("Барлық күй бастапқы қалыпқа қайтарылды");
});

document.querySelectorAll(".copy-snippet").forEach((btn) => {
  btn.addEventListener("click", () => {
    showSnippet(btn.dataset.snippet, true);
  });
});

copyCodeBtn.addEventListener("click", copyCurrentCode);

function openModal() {
  playTactileSound("click");
  modalBackdrop.classList.remove("hidden");
  confirmModalBtn.focus();
  pulseRings(1.4, true);
}

function closeModal() {
  playTactileSound("click");
  modalBackdrop.classList.add("hidden");
  openModalBtn.focus();
}

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
confirmModalBtn.addEventListener("click", closeModal);

modalBackdrop.addEventListener("click", (event) => {
  if (event.target === modalBackdrop) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  pulseRings(0.45, true);

  if (event.key === "Escape") {
    if (!modalBackdrop.classList.contains("hidden")) {
      closeModal();
      return;
    }
    if (state.xrayMode) {
      state.xrayMode = false;
      applyXrayMode();
      saveState(state, "state.xrayMode", "light");
      return;
    }
  }

  const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
  const isTyping =
    activeTag === "input" ||
    activeTag === "textarea" ||
    activeTag === "select" ||
    (document.activeElement && document.activeElement.isContentEditable);

  if (!isTyping && (event.ctrlKey || event.metaKey) && !event.shiftKey && event.key.toLowerCase() === "z") {
    event.preventDefault();
    jumpToHistoryIndex(historyIndex - 1);
    return;
  }

  if (
    !isTyping &&
    (event.ctrlKey || event.metaKey) &&
    (event.key.toLowerCase() === "y" || (event.shiftKey && event.key.toLowerCase() === "z"))
  ) {
    event.preventDefault();
    jumpToHistoryIndex(historyIndex + 1);
    return;
  }

  if (event.altKey && (event.key === "t" || event.key === "T" || event.key === "е" || event.key === "Е")) {
    event.preventDefault();
    toggleThemeMode();
    showToast(state.theme === "dark" ? "Қою тема қосылды" : "Жарық тема қосылды");
    return;
  }

  if (!isTyping && event.key === "/" && searchInput) {
    event.preventDefault();
    searchInput.focus();
    searchInput.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "nearest"
    });
  }
});

initEdgeCodeRing();
renderTimeTravelUI();
renderStateInspector(state);
renderAllUI();

function initBottomScreenPets() {
  const stage = document.getElementById("bottomPetsStage");
  const toggleBtn = document.getElementById("petsToggleBtn");
  if (!stage || prefersReducedMotion()) return;

  let petsEnabled = true;
  let mouseX = -9999;
  let mouseY = -9999;

  const petConfigs = [
    { emoji: "🐱", name: "Мысық", speed: 58, jumpPower: 22, hopFreq: 3.2, panicDist: 145 },
    { emoji: "🐰", name: "Қоян", speed: 72, jumpPower: 34, hopFreq: 5.5, panicDist: 165 },
    { emoji: "🐭", name: "Тышқан", speed: 88, jumpPower: 18, hopFreq: 4.5, panicDist: 155 },
    { emoji: "🐿️", name: "Тиін", speed: 80, jumpPower: 30, hopFreq: 5.0, panicDist: 160 }
  ];

  const width = window.innerWidth || 1000;
  const pets = petConfigs.map((cfg, idx) => {
    const el = document.createElement("div");
    el.className = "screen-pet";
    el.innerHTML = `<span class="screen-pet-bubble">!</span><span class="pet-sprite">${cfg.emoji}</span>`;
    stage.appendChild(el);

    return {
      ...cfg,
      el,
      sprite: el.querySelector(".pet-sprite"),
      x: Math.max(40, Math.min(width - 80, (width / (petConfigs.length + 1)) * (idx + 1))),
      y: 0,
      vy: 0,
      dir: idx % 2 === 0 ? 1 : -1,
      fleeTimer: 0,
      phase: idx * 1.7
    };
  });

  window.addEventListener(
    "pointermove",
    (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    },
    { passive: true }
  );

  window.addEventListener("pointerleave", () => {
    mouseX = -9999;
    mouseY = -9999;
  });

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      petsEnabled = !petsEnabled;
      stage.classList.toggle("hidden", !petsEnabled);
      toggleBtn.classList.toggle("active", petsEnabled);
      toggleBtn.setAttribute("aria-pressed", String(petsEnabled));
      toggleBtn.textContent = petsEnabled ? "Жануарлар: Қосулы" : "Жануарлар: Өшірулі";
      if (typeof playTactileSound === "function") playTactileSound("click");
    });
  }

  let lastTime = performance.now();

  function animatePets(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.08);
    lastTime = now;

    if (petsEnabled) {
      const maxW = (window.innerWidth || 1000) - 52;
      const floorY = (window.innerHeight || 800) - 26;

      pets.forEach((pet) => {
        pet.phase += dt * pet.hopFreq;

        const petCenterX = pet.x + 22;
        const petCenterY = floorY - pet.y;
        const dx = petCenterX - mouseX;
        const dy = petCenterY - mouseY;
        const dist = Math.hypot(dx, dy);

        // Мышка жақындаса — қорқып секіреді де, қарсы жаққа қашады
        if (dist < pet.panicDist) {
          pet.fleeTimer = 0.65;
          pet.dir = dx >= 0 ? 1 : -1;

          // Егер шетке тіреліп қалса, екінші бос жаққа секіріп өтеді
          if (pet.x <= 18) pet.dir = 1;
          if (pet.x >= maxW - 18) pet.dir = -1;

          if (pet.y <= 2) {
            pet.vy = 230 + pet.jumpPower * 2.2;
          }
        }

        if (pet.fleeTimer > 0) {
          pet.fleeTimer -= dt;
          pet.el.classList.add("fleeing");
        } else {
          pet.el.classList.remove("fleeing");
          // Жай кезде анда-санда бағытын өзгертеді
          if (Math.random() < dt * 0.35) {
            pet.dir *= -1;
          }
        }

        const currentSpeed = pet.fleeTimer > 0 ? pet.speed * 3.4 : pet.speed;
        pet.x += pet.dir * currentSpeed * dt;

        if (pet.x < 10) {
          pet.x = 10;
          pet.dir = 1;
        } else if (pet.x > maxW) {
          pet.x = maxW;
          pet.dir = -1;
        }

        // Гравитация және секіру физикасы
        if (pet.y > 0 || pet.vy > 0) {
          pet.y += pet.vy * dt;
          pet.vy -= 680 * dt;
          if (pet.y <= 0) {
            pet.y = 0;
            pet.vy = 0;
          }
        }

        const idleHop = pet.y === 0 ? Math.abs(Math.sin(pet.phase)) * (pet.jumpPower * 0.32) : 0;
        const totalY = pet.y + idleHop;
        const tilt = pet.fleeTimer > 0 ? pet.dir * -12 : Math.sin(pet.phase * 2) * 5;

        pet.el.style.transform = `translate3d(${pet.x.toFixed(1)}px, ${(-totalY).toFixed(1)}px, 0)`;
        pet.sprite.style.transform = `scaleX(${pet.dir === 1 ? -1 : 1}) rotate(${tilt.toFixed(1)}deg)`;
      });
    }

    requestAnimationFrame(animatePets);
  }

  requestAnimationFrame(animatePets);
}

initBottomScreenPets();