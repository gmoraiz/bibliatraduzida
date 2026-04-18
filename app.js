// ══════════════════════════════════════════════════════════════
//  ESTADO GLOBAL
// ══════════════════════════════════════════════════════════════

const BASE_URL = 'edicoes/index.json';
const NAV_STORAGE_KEY = 'biblia:last-navigation';
const THEME_STORAGE_KEY = 'biblia:theme';
const REVIEW_POPUP_STORAGE_KEY = 'biblia:hide-review-popup';
const INSTALL_POPUP_STORAGE_KEY = 'biblia:hide-install-popup-until';
const INSTALL_POPUP_DISMISS_DAYS = 7;
const INSTALL_POPUP_MODE_NATIVE = 'native';
const INSTALL_POPUP_MODE_IOS_MANUAL = 'ios-manual';
const ROUTING_MODE = 'hash';
const MOBILE_PDF_INITIAL_SCALE = 1;

const CANONICAL_BOOK_CATALOG = [
  {
    id: 'genesis',
    tituloIndice: 'Genesis',
    titulo: 'Gênesis',
    testamento: 'Antigo Testamento',
    grupo: 'Pentateuco',
  },
  {
    id: 'exodo',
    tituloIndice: 'Exodo',
    titulo: 'Êxodo',
    testamento: 'Antigo Testamento',
    grupo: 'Pentateuco',
  },
  {
    id: 'levitico',
    tituloIndice: 'Levitico',
    titulo: 'Levítico',
    testamento: 'Antigo Testamento',
    grupo: 'Pentateuco',
  },
  {
    id: 'numeros',
    tituloIndice: 'Numeros',
    titulo: 'Números',
    testamento: 'Antigo Testamento',
    grupo: 'Pentateuco',
  },
  {
    id: 'deuteronomio',
    tituloIndice: 'Deuteronomio',
    titulo: 'Deuteronômio',
    testamento: 'Antigo Testamento',
    grupo: 'Pentateuco',
  },
  {
    id: 'josue',
    tituloIndice: 'Josue',
    titulo: 'Josué',
    testamento: 'Antigo Testamento',
    grupo: 'Livros Históricos',
  },
  {
    id: 'juizes',
    tituloIndice: 'Juizes',
    titulo: 'Juízes',
    testamento: 'Antigo Testamento',
    grupo: 'Livros Históricos',
  },
  {
    id: 'rute',
    tituloIndice: 'Rute',
    titulo: 'Rute',
    testamento: 'Antigo Testamento',
    grupo: 'Livros Históricos',
  },
  {
    id: '1-samuel',
    tituloIndice: '1 Samuel',
    titulo: 'Primeiro Livro de Samuel',
    testamento: 'Antigo Testamento',
    grupo: 'Livros Históricos',
  },
  {
    id: '2-samuel',
    tituloIndice: '2 Samuel',
    titulo: 'Segundo Livro de Samuel',
    testamento: 'Antigo Testamento',
    grupo: 'Livros Históricos',
  },
  {
    id: '1-reis',
    tituloIndice: '1 Reis',
    titulo: 'Primeiro Livro dos Reis',
    testamento: 'Antigo Testamento',
    grupo: 'Livros Históricos',
  },
  {
    id: '2-reis',
    tituloIndice: '2 Reis',
    titulo: 'Segundo Livro dos Reis',
    testamento: 'Antigo Testamento',
    grupo: 'Livros Históricos',
  },
  {
    id: '1-cronicas',
    tituloIndice: '1 Cronicas',
    titulo: 'Primeiro Livro das Crónicas',
    testamento: 'Antigo Testamento',
    grupo: 'Livros Históricos',
  },
  {
    id: '2-cronicas',
    tituloIndice: '2 Cronicas',
    titulo: 'Segundo Livro das Crónicas',
    testamento: 'Antigo Testamento',
    grupo: 'Livros Históricos',
  },
  {
    id: 'esdras',
    tituloIndice: 'Esdras',
    titulo: 'Esdras',
    testamento: 'Antigo Testamento',
    grupo: 'Livros Históricos',
  },
  {
    id: 'neemias',
    tituloIndice: 'Neemias',
    titulo: 'Neemias',
    testamento: 'Antigo Testamento',
    grupo: 'Livros Históricos',
  },
  {
    id: 'tobias',
    tituloIndice: 'Tobias',
    titulo: 'Tobias',
    testamento: 'Antigo Testamento',
    grupo: 'Livros Históricos',
  },
  {
    id: 'judite',
    tituloIndice: 'Judite',
    titulo: 'Judite',
    testamento: 'Antigo Testamento',
    grupo: 'Livros Históricos',
  },
  {
    id: 'ester',
    tituloIndice: 'Ester',
    titulo: 'Ester',
    testamento: 'Antigo Testamento',
    grupo: 'Livros Históricos',
  },
  {
    id: '1-macabeus',
    tituloIndice: '1 Macabeus',
    titulo: 'Primeiro Livro dos Macabeus',
    testamento: 'Antigo Testamento',
    grupo: 'Livros Históricos',
  },
  {
    id: '2-macabeus',
    tituloIndice: '2 Macabeus',
    titulo: 'Segundo Livro dos Macabeus',
    testamento: 'Antigo Testamento',
    grupo: 'Livros Históricos',
  },
  {
    id: 'jo',
    tituloIndice: 'Jo',
    titulo: 'Jó',
    testamento: 'Antigo Testamento',
    grupo: 'Livros Poéticos e Sapienciais',
  },
  {
    id: 'salmos',
    tituloIndice: 'Salmos',
    titulo: 'Livro dos Salmos',
    testamento: 'Antigo Testamento',
    grupo: 'Livros Poéticos e Sapienciais',
  },
  {
    id: 'proverbios',
    tituloIndice: 'Proverbios',
    titulo: 'Provérbios',
    testamento: 'Antigo Testamento',
    grupo: 'Livros Poéticos e Sapienciais',
  },
  {
    id: 'eclesiastes',
    tituloIndice: 'Eclesiastes',
    titulo: 'Eclesiastes',
    testamento: 'Antigo Testamento',
    grupo: 'Livros Poéticos e Sapienciais',
  },
  {
    id: 'cantico-dos-canticos',
    tituloIndice: 'Cantico dos Canticos',
    titulo: 'Cântico dos Cânticos',
    testamento: 'Antigo Testamento',
    grupo: 'Livros Poéticos e Sapienciais',
  },
  {
    id: 'sabedoria',
    tituloIndice: 'Sabedoria',
    titulo: 'Sabedoria',
    testamento: 'Antigo Testamento',
    grupo: 'Livros Poéticos e Sapienciais',
  },
  {
    id: 'eclesiastico',
    tituloIndice: 'Eclesiastico',
    titulo: 'Eclesiástico',
    testamento: 'Antigo Testamento',
    grupo: 'Livros Poéticos e Sapienciais',
  },
  {
    id: 'isaias',
    tituloIndice: 'Isaias',
    titulo: 'Isaías',
    testamento: 'Antigo Testamento',
    grupo: 'Profetas Maiores',
  },
  {
    id: 'jeremias',
    tituloIndice: 'Jeremias',
    titulo: 'Jeremias',
    testamento: 'Antigo Testamento',
    grupo: 'Profetas Maiores',
  },
  {
    id: 'lamentacoes',
    tituloIndice: 'Lamentacoes',
    titulo: 'Lamentações',
    testamento: 'Antigo Testamento',
    grupo: 'Profetas Maiores',
  },
  {
    id: 'baruc',
    tituloIndice: 'Baruc',
    titulo: 'Baruc',
    testamento: 'Antigo Testamento',
    grupo: 'Profetas Maiores',
  },
  {
    id: 'ezequiel',
    tituloIndice: 'Ezequiel',
    titulo: 'Ezequiel',
    testamento: 'Antigo Testamento',
    grupo: 'Profetas Maiores',
  },
  {
    id: 'daniel',
    tituloIndice: 'Daniel',
    titulo: 'Daniel',
    testamento: 'Antigo Testamento',
    grupo: 'Profetas Maiores',
  },
  {
    id: 'oseias',
    tituloIndice: 'Oseias',
    titulo: 'Oseias',
    testamento: 'Antigo Testamento',
    grupo: 'Profetas Menores',
  },
  {
    id: 'joel',
    tituloIndice: 'Joel',
    titulo: 'Joel',
    testamento: 'Antigo Testamento',
    grupo: 'Profetas Menores',
  },
  {
    id: 'amos',
    tituloIndice: 'Amos',
    titulo: 'Amós',
    testamento: 'Antigo Testamento',
    grupo: 'Profetas Menores',
  },
  {
    id: 'abdias',
    tituloIndice: 'Abdias',
    titulo: 'Abdias',
    testamento: 'Antigo Testamento',
    grupo: 'Profetas Menores',
  },
  {
    id: 'jonas',
    tituloIndice: 'Jonas',
    titulo: 'Jonas',
    testamento: 'Antigo Testamento',
    grupo: 'Profetas Menores',
  },
  {
    id: 'miqueias',
    tituloIndice: 'Miqueias',
    titulo: 'Miqueias',
    testamento: 'Antigo Testamento',
    grupo: 'Profetas Menores',
  },
  {
    id: 'naum',
    tituloIndice: 'Naum',
    titulo: 'Naum',
    testamento: 'Antigo Testamento',
    grupo: 'Profetas Menores',
  },
  {
    id: 'habacuc',
    tituloIndice: 'Habacuc',
    titulo: 'Habacuc',
    testamento: 'Antigo Testamento',
    grupo: 'Profetas Menores',
  },
  {
    id: 'sofonias',
    tituloIndice: 'Sofonias',
    titulo: 'Sofonias',
    testamento: 'Antigo Testamento',
    grupo: 'Profetas Menores',
  },
  {
    id: 'ageu',
    tituloIndice: 'Ageu',
    titulo: 'Ageu',
    testamento: 'Antigo Testamento',
    grupo: 'Profetas Menores',
  },
  {
    id: 'zacarias',
    tituloIndice: 'Zacarias',
    titulo: 'Zacarias',
    testamento: 'Antigo Testamento',
    grupo: 'Profetas Menores',
  },
  {
    id: 'malaquias',
    tituloIndice: 'Malaquias',
    titulo: 'Malaquias',
    testamento: 'Antigo Testamento',
    grupo: 'Profetas Menores',
  },
  {
    id: 'mateus',
    tituloIndice: 'Mateus',
    titulo: 'Evangelho de S. Mateus',
    testamento: 'Novo Testamento',
    grupo: 'Evangelhos',
  },
  {
    id: 'marcos',
    tituloIndice: 'Marcos',
    titulo: 'Evangelho de S. Marcos',
    testamento: 'Novo Testamento',
    grupo: 'Evangelhos',
  },
  {
    id: 'lucas',
    tituloIndice: 'Lucas',
    titulo: 'Evangelho de S. Lucas',
    testamento: 'Novo Testamento',
    grupo: 'Evangelhos',
  },
  {
    id: 'joao',
    tituloIndice: 'Joao',
    titulo: 'Evangelho de S. João',
    testamento: 'Novo Testamento',
    grupo: 'Evangelhos',
  },
  {
    id: 'atos-dos-apostolos',
    tituloIndice: 'Atos dos Apostolos',
    titulo: 'Atos dos Apóstolos',
    testamento: 'Novo Testamento',
    grupo: 'Atos',
  },
  {
    id: 'romanos',
    tituloIndice: 'Romanos',
    titulo: 'Epístola de S. Paulo aos Romanos',
    testamento: 'Novo Testamento',
    grupo: 'Epístolas Paulinas',
  },
  {
    id: '1-corintios',
    tituloIndice: '1 Corintios',
    titulo: 'Primeira Epístola de S. Paulo aos Coríntios',
    testamento: 'Novo Testamento',
    grupo: 'Epístolas Paulinas',
  },
  {
    id: '2-corintios',
    tituloIndice: '2 Corintios',
    titulo: 'Segunda Epístola de S. Paulo aos Coríntios',
    testamento: 'Novo Testamento',
    grupo: 'Epístolas Paulinas',
  },
  {
    id: 'galatas',
    tituloIndice: 'Galatas',
    titulo: 'Epístola de S. Paulo aos Gálatas',
    testamento: 'Novo Testamento',
    grupo: 'Epístolas Paulinas',
  },
  {
    id: 'efesios',
    tituloIndice: 'Efesios',
    titulo: 'Epístola de S. Paulo aos Efésios',
    testamento: 'Novo Testamento',
    grupo: 'Epístolas Paulinas',
  },
  {
    id: 'filipenses',
    tituloIndice: 'Filipenses',
    titulo: 'Epístola de S. Paulo aos Filipenses',
    testamento: 'Novo Testamento',
    grupo: 'Epístolas Paulinas',
  },
  {
    id: 'colossenses',
    tituloIndice: 'Colossenses',
    titulo: 'Epístola de S. Paulo aos Colossenses',
    testamento: 'Novo Testamento',
    grupo: 'Epístolas Paulinas',
  },
  {
    id: '1-tessalonicenses',
    tituloIndice: '1 Tessalonicenses',
    titulo: 'Epístola I de S. Paulo aos Tessalonicenses',
    testamento: 'Novo Testamento',
    grupo: 'Epístolas Paulinas',
  },
  {
    id: '2-tessalonicenses',
    tituloIndice: '2 Tessalonicenses',
    titulo: 'Epístola II de S. Paulo aos Tessalonicenses',
    testamento: 'Novo Testamento',
    grupo: 'Epístolas Paulinas',
  },
  {
    id: '1-timoteo',
    tituloIndice: '1 Timoteo',
    titulo: 'Epístola I de S. Paulo a Timóteo',
    testamento: 'Novo Testamento',
    grupo: 'Epístolas Paulinas',
  },
  {
    id: '2-timoteo',
    tituloIndice: '2 Timoteo',
    titulo: 'Epístola II de S. Paulo a Timóteo',
    testamento: 'Novo Testamento',
    grupo: 'Epístolas Paulinas',
  },
  {
    id: 'tito',
    tituloIndice: 'Tito',
    titulo: 'Epístola de S. Paulo a Tito',
    testamento: 'Novo Testamento',
    grupo: 'Epístolas Paulinas',
  },
  {
    id: 'filemon',
    tituloIndice: 'Filemon',
    titulo: 'Epístola de S. Paulo a Filêmon',
    testamento: 'Novo Testamento',
    grupo: 'Epístolas Paulinas',
  },
  {
    id: 'hebreus',
    tituloIndice: 'Hebreus',
    titulo: 'Epístola aos Hebreus',
    testamento: 'Novo Testamento',
    grupo: 'Epístolas Paulinas',
  },
  {
    id: 'tiago',
    tituloIndice: 'Tiago',
    titulo: 'Epístola de S. Tiago',
    testamento: 'Novo Testamento',
    grupo: 'Epístolas Católicas',
  },
  {
    id: '1-pedro',
    tituloIndice: '1 Pedro',
    titulo: 'Primeira Epístola de S. Pedro Apóstolo',
    testamento: 'Novo Testamento',
    grupo: 'Epístolas Católicas',
  },
  {
    id: '2-pedro',
    tituloIndice: '2 Pedro',
    titulo: 'Segunda Epístola de S. Pedro Apóstolo',
    testamento: 'Novo Testamento',
    grupo: 'Epístolas Católicas',
  },
  {
    id: '1-joao',
    tituloIndice: '1 Joao',
    titulo: 'Primeira Epístola de S. João Apóstolo',
    testamento: 'Novo Testamento',
    grupo: 'Epístolas Católicas',
  },
  {
    id: '2-joao',
    tituloIndice: '2 Joao',
    titulo: 'Segunda Epístola de S. João Apóstolo',
    testamento: 'Novo Testamento',
    grupo: 'Epístolas Católicas',
  },
  {
    id: '3-joao',
    tituloIndice: '3 Joao',
    titulo: 'Terceira Epístola de S. João Apóstolo',
    testamento: 'Novo Testamento',
    grupo: 'Epístolas Católicas',
  },
  {
    id: 'judas',
    tituloIndice: 'Judas',
    titulo: 'Epístola de S. Judas Apóstolo',
    testamento: 'Novo Testamento',
    grupo: 'Epístolas Católicas',
  },
  {
    id: 'apocalipse',
    tituloIndice: 'Apocalipse',
    titulo: 'Apocalipse de S. João Apóstolo',
    testamento: 'Novo Testamento',
    grupo: 'Apocalipse',
  },
];

const CANONICAL_BOOK_MAP = new Map(CANONICAL_BOOK_CATALOG.map((book) => [book.id, book]));

function createPdfViewerState() {
  return {
    pdfDoc: null,
    loadingTask: null,
    scale: 1,
    url: null,
    token: 0,
  };
}

let state = {
  editions: [],
  currentEditionId: null,
  currentBookId: null,
  currentBookDir: null,
  currentChapter: 1,
  currentVerse: null,
  appBasePath: '',
  urlSyncEnabled: false,
  currentBookIntroducao: null,
  loadedBookIndexes: {},
  loadedChapters: {},
  compareMode: false,
  compareEditionIds: [],
  compareBookData: null,
  activePdfType: null,
  chapterViewMode: 'text',
  inlinePdfType: 'recent',
  pdfViewers: {
    inline: createPdfViewerState(),
    modal: createPdfViewerState(),
  },
  bookSelectorHtmlByEdition: {},
  darkMode: false,
};

let activePopup = null;
let pdfModalHistoryActive = false;
let ignoreNextModalPopstate = false;
let pdfModalGesturesBound = false;
let pdfPinchGesturesBound = false;
let pdfPinchState = null;
let deferredInstallPrompt = null;

function isIOSMobile() {
  const ua = navigator.userAgent || '';
  const iDevice = /iP(hone|ad|od)/.test(ua);
  const iPadLike = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  return iDevice || iPadLike;
}

function isPdfModalOpen() {
  const modal = document.getElementById('pdf-modal');
  return Boolean(modal && modal.classList.contains('open'));
}

function initPdfModalGestures() {
  if (pdfModalGesturesBound || !isIOSMobile()) return;

  const modal = document.getElementById('pdf-modal');
  const panel = document.getElementById('pdf-modal-panel');
  if (!modal || !panel) return;

  let touchState = null;

  panel.addEventListener('touchstart', (e) => {
    if (!isPdfModalOpen()) return;
    if (!e.touches || e.touches.length !== 1) return;

    const t = e.touches[0];
    touchState = {
      startX: t.clientX,
      startY: t.clientY,
      lastX: t.clientX,
      lastY: t.clientY,
      fromLeftEdge: t.clientX <= 24,
    };
  }, { passive: true });

  panel.addEventListener('touchmove', (e) => {
    if (!touchState || !e.touches || e.touches.length !== 1) return;
    const t = e.touches[0];
    touchState.lastX = t.clientX;
    touchState.lastY = t.clientY;
  }, { passive: true });

  panel.addEventListener('touchend', () => {
    if (!touchState || !isPdfModalOpen()) {
      touchState = null;
      return;
    }

    const dx = touchState.lastX - touchState.startX;
    const dy = Math.abs(touchState.lastY - touchState.startY);
    const shouldClose = touchState.fromLeftEdge && dx > 72 && dx > (dy * 1.25);

    touchState = null;
    if (shouldClose) {
      closePdfModal();
    }
  }, { passive: true });

  panel.addEventListener('touchcancel', () => {
    touchState = null;
  }, { passive: true });

  pdfModalGesturesBound = true;
}

function getTouchDistance(t1, t2) {
  const dx = t2.clientX - t1.clientX;
  const dy = t2.clientY - t1.clientY;
  return Math.sqrt((dx * dx) + (dy * dy));
}

function getViewerKeyFromPdfWrap(wrap) {
  if (!wrap) return null;
  return wrap.classList.contains('pdfjs-canvas-wrap-modal') ? 'modal' : 'inline';
}

function resetPinchPreview(stateForPinch) {
  if (!stateForPinch || !stateForPinch.pages) return;
  stateForPinch.pages.style.transform = '';
  stateForPinch.pages.style.transformOrigin = '';
  stateForPinch.pages.style.willChange = '';
}

function initPdfPinchGestures() {
  if (pdfPinchGesturesBound) return;

  document.addEventListener('touchstart', (e) => {
    if (window.innerWidth >= 768) return;
    if (!e.touches || e.touches.length !== 2) return;

    const wrap = e.target && e.target.closest ? e.target.closest('.pdfjs-canvas-wrap') : null;
    if (!wrap) return;

    const viewerKey = getViewerKeyFromPdfWrap(wrap);
    const viewer = viewerKey ? state.pdfViewers[viewerKey] : null;
    const dom = viewerKey ? getPdfViewerDom(viewerKey) : null;
    if (!viewer || !viewer.pdfDoc || !dom || !dom.pages) return;

    const startDistance = getTouchDistance(e.touches[0], e.touches[1]);
    if (!Number.isFinite(startDistance) || startDistance <= 0) return;

    pdfPinchState = {
      viewerKey,
      pages: dom.pages,
      startDistance,
      startScale: viewer.scale || MOBILE_PDF_INITIAL_SCALE,
      nextScale: viewer.scale || MOBILE_PDF_INITIAL_SCALE,
    };

    dom.pages.style.transformOrigin = 'center top';
    dom.pages.style.willChange = 'transform';

    e.preventDefault();
  }, { passive: false });

  document.addEventListener('touchmove', (e) => {
    if (!pdfPinchState) return;
    if (!e.touches || e.touches.length < 2) return;

    const currentDistance = getTouchDistance(e.touches[0], e.touches[1]);
    if (!Number.isFinite(currentDistance) || currentDistance <= 0) return;

    const ratio = currentDistance / pdfPinchState.startDistance;
    const nextScale = Math.max(0.7, Math.min(3, pdfPinchState.startScale * ratio));
    pdfPinchState.nextScale = nextScale;

    const previewFactor = nextScale / pdfPinchState.startScale;
    pdfPinchState.pages.style.transform = `scale(${previewFactor})`;

    const dom = getPdfViewerDom(pdfPinchState.viewerKey);
    if (dom && dom.zoomLabel) {
      dom.zoomLabel.textContent = `${Math.round(nextScale * 100)}%`;
    }

    e.preventDefault();
  }, { passive: false });

  const finishPinch = () => {
    if (!pdfPinchState) return;

    const { viewerKey, nextScale } = pdfPinchState;
    const dom = getPdfViewerDom(viewerKey);
    resetPinchPreview(pdfPinchState);
    pdfPinchState = null;

    if (!dom || !dom.pages) return;
    setPdfViewerScale(viewerKey, nextScale);
  };

  document.addEventListener('touchend', (e) => {
    if (!pdfPinchState) return;
    if (e.touches && e.touches.length >= 2) return;
    finishPinch();
  }, { passive: true });

  document.addEventListener('touchcancel', () => {
    finishPinch();
  }, { passive: true });

  pdfPinchGesturesBound = true;
}

function handlePdfModalPopstate() {
  if (ignoreNextModalPopstate) {
    ignoreNextModalPopstate = false;
    return true;
  }

  if (isPdfModalOpen()) {
    closePdfModal({ fromPopstate: true });
    return true;
  }

  return false;
}

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
  state.darkMode = isDark;

  const btn = document.getElementById('theme-toggle-btn');
  if (!btn) return;

  btn.textContent = isDark ? '☀️ Claro' : '🌙 Noturno';
  btn.setAttribute('aria-pressed', String(isDark));
  btn.title = isDark ? 'Ativar modo claro' : 'Ativar modo noturno';
}

function initTheme() {
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  } catch (_) {
    savedTheme = null;
  }

  if (savedTheme === 'dark' || savedTheme === 'light') {
    applyTheme(savedTheme);
    return;
  }

  applyTheme('light');
}

function toggleDarkMode() {
  const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
  applyTheme(nextTheme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  } catch (_) {
    // sem persistencia quando localStorage nao estiver disponivel
  }
}

function hideReviewPopup(options = {}) {
  const permanent = Boolean(options.permanent);
  const popup = document.getElementById('review-popup');
  if (popup) {
    popup.hidden = true;
  }
  document.body.classList.remove('review-popup-open');

  if (!permanent) return;

  try {
    localStorage.setItem(REVIEW_POPUP_STORAGE_KEY, '1');
  } catch (_) {
    // sem persistencia quando localStorage nao estiver disponivel
  }
}

function initReviewPopup() {
  const popup = document.getElementById('review-popup');
  const okBtn = document.getElementById('review-popup-ok');
  const hideBtn = document.getElementById('review-popup-hide');
  if (!popup || !okBtn || !hideBtn) return;

  let shouldHideForever = false;
  try {
    shouldHideForever = localStorage.getItem(REVIEW_POPUP_STORAGE_KEY) === '1';
  } catch (_) {
    shouldHideForever = false;
  }

  if (shouldHideForever) {
    popup.hidden = true;
    document.body.classList.remove('review-popup-open');
    return;
  }

  popup.hidden = false;
  document.body.classList.add('review-popup-open');

  okBtn.addEventListener('click', () => hideReviewPopup());
  hideBtn.addEventListener('click', () => hideReviewPopup({ permanent: true }));
}

function isRunningStandaloneMode() {
  const inStandaloneMedia = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
  const inStandaloneNavigator = window.navigator && window.navigator.standalone === true;
  return Boolean(inStandaloneMedia || inStandaloneNavigator);
}

function parseInstallDismissUntil() {
  try {
    const raw = localStorage.getItem(INSTALL_POPUP_STORAGE_KEY);
    const n = Number.parseInt(raw || '', 10);
    return Number.isFinite(n) ? n : 0;
  } catch (_) {
    return 0;
  }
}

function dismissInstallPopupForDays(days = INSTALL_POPUP_DISMISS_DAYS) {
  try {
    const now = Date.now();
    const until = now + (Math.max(1, days) * 24 * 60 * 60 * 1000);
    localStorage.setItem(INSTALL_POPUP_STORAGE_KEY, String(until));
  } catch (_) {
    // sem persistencia quando localStorage nao estiver disponivel
  }
}

function canShowInstallPopup() {
  if (isRunningStandaloneMode()) return false;
  const dismissedUntil = parseInstallDismissUntil();
  return dismissedUntil < Date.now();
}

function setInstallPopupContent(mode) {
  const popup = document.getElementById('install-popup');
  const textEl = popup ? popup.querySelector('.install-popup-text') : null;
  const installBtn = document.getElementById('install-popup-install');
  const closeBtn = document.getElementById('install-popup-close');
  if (!popup || !textEl || !installBtn || !closeBtn) return;

  popup.dataset.installMode = mode;

  if (mode === INSTALL_POPUP_MODE_IOS_MANUAL) {
    textEl.innerHTML = 'Instale o app <strong>Biblia Traduzida</strong> para acessâ-la mais rápido. No seu iPhone/iPad, toque em <strong>Compartilhar</strong> no navegador e depois em <strong>Adicionar à Tela de Início</strong> para instalá-lo.';
    installBtn.textContent = 'Entendi';
    closeBtn.textContent = 'Não mostrar novamente';
    return;
  }

  textEl.innerHTML = 'Instale o app <strong>Biblia Traduzida</strong> para acessâ-la mais rápido, tendo-a na área de trabalho de seu dispositivo.';
  installBtn.textContent = 'Instalar';
  closeBtn.textContent = 'Agora não';
}

function showInstallPopup(mode) {
  setInstallPopupContent(mode);
  setInstallPopupVisibility(true);
}

function setInstallPopupVisibility(visible) {
  const popup = document.getElementById('install-popup');
  if (!popup) return;
  popup.hidden = !visible;
}

async function promptInstallApp() {
  if (!deferredInstallPrompt) return;

  try {
    await deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
  } catch (_) {
    // ignora cancelamento ou erro de prompt
  } finally {
    deferredInstallPrompt = null;
    setInstallPopupVisibility(false);
  }
}

function initInstallPopup() {
  const installBtn = document.getElementById('install-popup-install');
  const closeBtn = document.getElementById('install-popup-close');
  const popup = document.getElementById('install-popup');
  if (!installBtn || !closeBtn || !popup) return;

  setInstallPopupContent(INSTALL_POPUP_MODE_NATIVE);
  setInstallPopupVisibility(false);

  installBtn.addEventListener('click', () => {
    const mode = popup.dataset.installMode || INSTALL_POPUP_MODE_NATIVE;
    if (mode === INSTALL_POPUP_MODE_IOS_MANUAL) {
      dismissInstallPopupForDays(1);
      setInstallPopupVisibility(false);
      return;
    }

    promptInstallApp();
  });

  closeBtn.addEventListener('click', () => {
    const mode = popup.dataset.installMode || INSTALL_POPUP_MODE_NATIVE;
    if (mode === INSTALL_POPUP_MODE_IOS_MANUAL) {
      dismissInstallPopupForDays(3650);
    } else {
      dismissInstallPopupForDays();
    }
    setInstallPopupVisibility(false);
  });

  if (isIOSMobile() && canShowInstallPopup()) {
    showInstallPopup(INSTALL_POPUP_MODE_IOS_MANUAL);
  }

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    if (canShowInstallPopup()) {
      showInstallPopup(INSTALL_POPUP_MODE_NATIVE);
    }
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    setInstallPopupVisibility(false);
    dismissInstallPopupForDays(3650);
  });
}

async function registerPwaServiceWorker(appBasePath) {
  if (!('serviceWorker' in navigator)) return;

  const base = appBasePath || '';
  const swUrl = `${base}/service-worker.js`;
  const scope = `${base || ''}/`;

  try {
    await navigator.serviceWorker.register(swUrl, { scope });
  } catch (error) {
    console.warn('Falha ao registrar service worker:', error);
  }
}

function parsePositiveInt(value) {
  if (!value) return null;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function detectAppBasePath(editions) {
  const segments = window.location.pathname.split('/').filter(Boolean);
  const editionIds = new Set(editions.map(e => e.id));
  const editionPos = segments.findIndex(s => editionIds.has(s));

  if (editionPos >= 0) {
    const prefix = segments.slice(0, editionPos);
    return prefix.length ? '/' + prefix.join('/') : '';
  }

  let path = window.location.pathname;
  if (path.endsWith('/index.html')) path = path.slice(0, -('/index.html'.length));
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return path === '/' ? '' : path;
}

function parseNavigationFromUrl() {
  if (window.location.hash && window.location.hash.startsWith('#/')) {
    const hashSegments = window.location.hash.slice(2).split('/').filter(Boolean);
    const compareIndex = hashSegments.indexOf('compare');
    const baseSegments = compareIndex >= 0 ? hashSegments.slice(0, compareIndex) : hashSegments;
    const edicao = baseSegments[0] || null;
    const livro = baseSegments[1] || null;
    const capitulo = parsePositiveInt(baseSegments[2]);
    const versiculo = parsePositiveInt(baseSegments[3]);
    const compareEditionId = compareIndex >= 0 ? (hashSegments[compareIndex + 1] || null) : null;

    if (!edicao || !livro || !capitulo) return null;
    return {
      editionId: edicao,
      bookId: livro,
      chapter: capitulo,
      verse: versiculo,
      compareEditionId,
    };
  }

  const segments = window.location.pathname.split('/').filter(Boolean);
  const editionIds = new Set(state.editions.map(e => e.id));
  const editionPos = segments.findIndex(s => editionIds.has(s));
  if (editionPos < 0) return null;

  const edicao = segments[editionPos] || null;
  const livro = segments[editionPos + 1] || null;
  const capitulo = parsePositiveInt(segments[editionPos + 2]);
  const versiculo = parsePositiveInt(segments[editionPos + 3]);
  const comparePos = segments.indexOf('compare', editionPos + 3);
  const compareEditionId = comparePos >= 0 ? (segments[comparePos + 1] || null) : null;

  if (!edicao || !livro || !capitulo) return null;
  return {
    editionId: edicao || null,
    bookId: livro || null,
    chapter: capitulo,
    verse: versiculo,
    compareEditionId,
  };
}

function loadNavigationFromStorage() {
  try {
    const raw = localStorage.getItem(NAV_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      editionId: parsed.editionId || null,
      bookId: parsed.bookId || null,
      chapter: parsePositiveInt(parsed.chapter),
      verse: parsePositiveInt(parsed.verse),
    };
  } catch (_) {
    return null;
  }
}

function saveNavigationToStorage() {
  const payload = {
    editionId: state.currentEditionId,
    bookId: state.currentBookId,
    chapter: state.currentChapter,
    verse: state.currentVerse,
  };
  localStorage.setItem(NAV_STORAGE_KEY, JSON.stringify(payload));
}

function updateUrlFromState(historyMode = 'replace') {
  if (!state.currentEditionId || !state.currentBookId || !state.currentChapter) return;

  const route = `${state.currentEditionId}/${state.currentBookId}/${state.currentChapter}`;
  let nextPath = `${state.appBasePath}/${route}`;
  if (state.currentVerse) {
    nextPath += `/${state.currentVerse}`;
  }
  if (state.compareMode && state.compareEditionIds.length > 0) {
    const cp = state.compareEditionIds.length === 1 ? state.compareEditionIds[0] : 'all';
    nextPath += `/compare/${cp}`;
  }

  let hashRoute = route;
  if (state.currentVerse) hashRoute += `/${state.currentVerse}`;
  if (state.compareMode && state.compareEditionIds.length > 0) {
    const cp = state.compareEditionIds.length === 1 ? state.compareEditionIds[0] : 'all';
    hashRoute += `/compare/${cp}`;
  }

  const next = ROUTING_MODE === 'hash'
    ? `${window.location.pathname}${window.location.search}#/${hashRoute}`
    : `${nextPath}`;

  if (historyMode === 'push') {
    window.history.pushState(null, '', next);
  } else {
    window.history.replaceState(null, '', next);
  }
}

function findBookFileByBookId(editionId, bookId) {
  const ed = state.editions.find(e => e.id === editionId);
  if (!ed || !ed.livros || !bookId) return null;
  return ed.livros.find(f => f.includes('/' + bookId + '/')) || null;
}

function getBookIdFromFile(bookFile) {
  if (!bookFile) return null;
  const parts = bookFile.split('/');
  return parts.length >= 2 ? parts[parts.length - 2] : null;
}

function getCanonicalBooksForEdition(ed) {
  if (!ed || !ed.livros) return [];

  const availableBookIds = new Set();
  ed.livros.forEach((file) => {
    const bookId = getBookIdFromFile(file);
    if (bookId) availableBookIds.add(bookId);
  });

  const books = CANONICAL_BOOK_CATALOG
    .filter((book) => availableBookIds.has(book.id))
    .map((book) => ({ ...book }));

  ed.livros.forEach((file) => {
    const bookId = getBookIdFromFile(file);
    if (!bookId || CANONICAL_BOOK_MAP.has(bookId)) return;
    books.push({
      id: bookId,
      tituloIndice: bookId,
      titulo: bookId,
      testamento: 'Outros',
      grupo: 'Outros',
      file,
    });
  });

  return books;
}

function buildBookSelectorHtml(ed) {
  const books = getCanonicalBooksForEdition(ed);
  const testamentoMap = new Map();

  books.forEach((book) => {
    const testamento = book.testamento || 'Outros';
    const grupo = book.grupo || 'Outros';
    if (!testamentoMap.has(testamento)) {
      testamentoMap.set(testamento, new Map());
    }
    const grupoMap = testamentoMap.get(testamento);
    if (!grupoMap.has(grupo)) {
      grupoMap.set(grupo, []);
    }
    grupoMap.get(grupo).push(book);
  });

  let html = '';
  for (const [testamento, grupoMap] of testamentoMap.entries()) {
    html += `<div class="testament-section"><div class="testament-title">${testamento}</div>`;
    for (const [grupo, items] of grupoMap.entries()) {
      html += `<div class="book-group"><div class="group-label">${grupo}</div>`;
      items.forEach((book) => {
        html += `<a data-book-id="${book.id}" href="#" onclick="selectBookById('${book.id}'); return false;">${book.tituloIndice || book.titulo}</a>`;
      });
      html += `</div>`;
    }
    html += `</div>`;
  }

  return html || '<p style="color:#888;font-size:13px;">Nenhum livro disponível ainda.</p>';
}

function primeBookSelectorCache() {
  const nextCache = {};
  state.editions.forEach((ed) => {
    nextCache[ed.id] = buildBookSelectorHtml(ed);
  });
  state.bookSelectorHtmlByEdition = nextCache;
}

function buildBookIndexFilePath(editionId, bookId) {
  if (!editionId || !bookId) return null;
  return `edicoes/${editionId}/${bookId}/index.json`;
}

function syncCurrentBookInSelector() {
  const container = document.getElementById('book-list-content');
  if (!container) return;

  container.querySelectorAll('a.current-book').forEach((el) => {
    el.classList.remove('current-book');
  });

  if (!state.currentBookId) return;

  const current = container.querySelector(`a[data-book-id="${state.currentBookId}"]`);
  if (current) current.classList.add('current-book');
}

function scrollToVerse(verseNumber) {
  if (!verseNumber) return false;
  const selector = `#content .verse[data-v="${verseNumber}"]`;
  const verseEl = document.querySelector(selector);
  if (!verseEl) return false;

  const absoluteTop = window.scrollY + verseEl.getBoundingClientRect().top;
  const maxScrollTop = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const targetTop = Math.min(absoluteTop, maxScrollTop);

  window.scrollTo({ top: targetTop, behavior: 'smooth' });
  highlightSelectedVerses(verseNumber);
  return true;
}

function highlightVerseElement(verseEl) {
  if (!verseEl) return;
  verseEl.classList.add('verse-marked');
}

function highlightSelectedVerses(verseNumber) {
  document.querySelectorAll('.verse.verse-marked').forEach(el => el.classList.remove('verse-marked'));
  if (!verseNumber) return;

  const mainVerse = document.querySelector(`#content .verse[data-v="${verseNumber}"]`);
  if (mainVerse) highlightVerseElement(mainVerse);

  document.querySelectorAll(`#compare-grid .compare-verse[data-v="${verseNumber}"]`).forEach(el => {
    highlightVerseElement(el);
  });
}

function buildShareUrl() {
  const route = `${state.currentEditionId}/${state.currentBookId}/${state.currentChapter}`
    + (state.currentVerse ? `/${state.currentVerse}` : '');
  const cp = state.compareMode && state.compareEditionIds.length > 0
    ? (state.compareEditionIds.length === 1 ? state.compareEditionIds[0] : 'all')
    : '';
  const compareSegment = cp ? `/compare/${cp}` : '';
  return `${window.location.origin}${window.location.pathname}${window.location.search}#/${route}${compareSegment}`;
}

function getCurrentVerseText() {
  const chapterKey = `${state.currentBookDir}/${state.currentChapter}`;
  const chapterData = state.loadedChapters[chapterKey];
  if (!chapterData || !chapterData.versiculos || !state.currentVerse) return null;

  const verse = chapterData.versiculos.find(v => v && v.tipo !== 'bio' && Number(v.n) === state.currentVerse);
  return verse && verse.texto ? verse.texto.trim() : null;
}

function getCompareVerseText() {
  if (!state.compareMode || !state.compareEditionIds.length || !state.currentVerse) return null;
  const compareEditionId = state.compareEditionIds[0];
  const ed = state.editions.find(e => e.id === compareEditionId);
  if (!ed || !ed.livros) return null;
  const bookFile2 = ed.livros.find(f => f.includes('/' + state.currentBookId + '/'));
  if (!bookFile2) return null;
  const bookDir2 = bookDirFromFile(bookFile2);
  const chapterData = state.loadedChapters[bookDir2 + '/' + state.currentChapter];
  if (!chapterData || !chapterData.versiculos) return null;
  const verse = chapterData.versiculos.find(v => v && v.tipo !== 'bio' && Number(v.n) === state.currentVerse);
  return verse && verse.texto ? verse.texto.trim() : null;
}

function getShareLabel() {
  const bookTitleEl = document.getElementById('nav-book-title');
  const bookTitle = bookTitleEl && bookTitleEl.textContent
    ? bookTitleEl.textContent.trim()
    : state.currentBookId;

  const verseText = getCurrentVerseText();
  const ref = state.currentVerse
    ? `${bookTitle} ${state.currentChapter}, ${state.currentVerse}`
    : `${bookTitle} ${state.currentChapter}`;

  const primaryLine = verseText ? `${ref} — ${verseText}` : ref;

  if (state.compareMode && state.compareEditionIds.length > 0) {
    const compareEditionId = state.compareEditionIds[0];
    const compareEdition = state.editions.find(e => e.id === compareEditionId);
    const compareName = compareEdition ? compareEdition.edicao : compareEditionId;
    const compareVerseText = getCompareVerseText();
    const compareRef = state.currentVerse
      ? `${bookTitle} (${compareName}), ${state.currentChapter}, ${state.currentVerse}`
      : `${bookTitle} (${compareName}), ${state.currentChapter}`;
    const compareLine = compareVerseText ? `Vulgata: ${compareVerseText}` : compareRef;
    return `${primaryLine}\n\n${compareLine}`;
  }

  return primaryLine;
}

async function shareCurrentVerse() {
  const shareUrl = buildShareUrl();
  const shareLabel = getShareLabel();
  const fullMessage = `${shareLabel}\n\n${shareUrl}`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Bíblia Sagrada',
        text: shareLabel,
        url: shareUrl,
      });
      return;
    } catch (e) {
      if (e && e.name === 'AbortError') return;
    }
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(fullMessage);
      return;
    } catch (_) {
      // cai no prompt
    }
  }

  window.prompt('Copie o versículo:', fullMessage);
}

function markUserNavigation() {
  state.urlSyncEnabled = true;
}

function setCurrentVerse(verseNumber) {
  const n = parsePositiveInt(verseNumber);
  if (!n) return;
  markUserNavigation();
  state.currentVerse = n;
  updateUrlFromState('replace');
  saveNavigationToStorage();
}

async function onVerseNumberClick(e, verseNumber) {
  if (e) e.preventDefault();
  const n = parsePositiveInt(verseNumber);
  if (!n) return;

  setCurrentVerse(n);
  highlightSelectedVerses(n);
  await shareCurrentVerse();
}

async function restoreNavigationFromState(nav, options = {}) {
  const firstEdition = state.editions.find(e => e.livros && e.livros.length > 0);
  if (!firstEdition) {
    document.getElementById('content').innerHTML = '<p class="error-msg">Nenhum livro disponível ainda. Adicione entradas em edicoes/index.json.</p>';
    return;
  }

  const editionId = nav && nav.editionId && state.editions.some(e => e.id === nav.editionId && e.livros.length > 0)
    ? nav.editionId
    : firstEdition.id;

  state.currentEditionId = editionId;
  document.getElementById('sel-edition').value = editionId;

  const selectedEdition = state.editions.find(e => e.id === editionId);
  document.getElementById('topbar-edition-label').textContent = selectedEdition.edicao;

  if (nav && nav.compareEditionId && nav.compareEditionId !== editionId) {
    let newIds;
    if (nav.compareEditionId === 'all') {
      newIds = state.editions.filter(e => e.id !== editionId && e.livros && e.livros.length > 0).map(e => e.id);
    } else {
      const compareEdition = state.editions.find(e => e.id === nav.compareEditionId && e.livros && e.livros.length > 0);
      newIds = compareEdition ? [compareEdition.id] : [];
    }
    if (newIds.length > 0) {
      state.compareMode = true;
      state.compareEditionIds = newIds;
      const area = document.getElementById('main-area');
      area.classList.remove('single');
      area.classList.add('compare');
    }
  }

  const bookFile = nav && nav.bookId
    ? (findBookFileByBookId(editionId, nav.bookId) || selectedEdition.livros[0])
    : selectedEdition.livros[0];

  await loadBook(
    editionId,
    bookFile,
    nav && nav.chapter ? nav.chapter : 1,
    nav && nav.verse ? nav.verse : null,
    {
      scrollToTop: false,
      syncUrl: options.syncUrl,
      historyMode: options.historyMode || 'replace',
    }
  );
}

// ══════════════════════════════════════════════════════════════
//  BOOTSTRAP
// ══════════════════════════════════════════════════════════════

async function init() {
  initTheme();
  initReviewPopup();
  initInstallPopup();
  initPdfModalGestures();
  initPdfPinchGestures();

  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error(`Não foi possível carregar edicoes/index.json (HTTP ${res.status})`);
    state.editions = await res.json();
  } catch (e) {
    document.getElementById('content').innerHTML = `<p class="error-msg">Erro ao carregar edicoes/index.json: ${e.message}</p>`;
    return;
  }

  buildEditionSelector();
  state.appBasePath = detectAppBasePath(state.editions);
  registerPwaServiceWorker(state.appBasePath);

  const navFromUrl = parseNavigationFromUrl();
  const navFromStorage = loadNavigationFromStorage();
  state.urlSyncEnabled = Boolean(navFromUrl);
  await restoreNavigationFromState(navFromUrl || navFromStorage, {
    syncUrl: Boolean(navFromUrl),
    historyMode: 'replace',
  });

  window.addEventListener('popstate', async () => {
    if (handlePdfModalPopstate()) return;

    const nav = parseNavigationFromUrl();
    if (!nav) return;

    if (nav.compareEditionId && nav.compareEditionId !== (nav.editionId || state.currentEditionId)) {
      const currentEditionId = nav.editionId || state.currentEditionId;
      let newIds;
      if (nav.compareEditionId === 'all') {
        newIds = state.editions.filter(e => e.id !== currentEditionId && e.livros && e.livros.length > 0).map(e => e.id);
      } else {
        const compareEdition = state.editions.find(e => e.id === nav.compareEditionId && e.livros && e.livros.length > 0);
        newIds = compareEdition ? [compareEdition.id] : [];
      }
      state.compareEditionIds = newIds;
      state.compareMode = newIds.length > 0;
      const area = document.getElementById('main-area');
      area.classList.toggle('compare', state.compareMode);
      area.classList.toggle('single', !state.compareMode);
      if (!state.compareMode) {
        document.getElementById('compare-grid').innerHTML = '';
        document.getElementById('content-compare').innerHTML = '';
      }
    } else {
      state.compareMode = false;
      state.compareEditionIds = [];
      const areaOff = document.getElementById('main-area');
      areaOff.classList.remove('compare');
      areaOff.classList.add('single');
      document.getElementById('compare-grid').innerHTML = '';
      document.getElementById('content-compare').innerHTML = '';
    }

    const editionId = nav.editionId && state.editions.some(e => e.id === nav.editionId)
      ? nav.editionId
      : state.currentEditionId;
    const bookFile = findBookFileByBookId(editionId, nav.bookId) || findBookFileByBookId(editionId, state.currentBookId);
    if (!bookFile) return;
    await loadBook(editionId, bookFile, nav.chapter || 1, nav.verse || null, { scrollToTop: false, syncUrl: false });
  });
}

// ══════════════════════════════════════════════════════════════
//  SELETOR DE EDIÇÃO
// ══════════════════════════════════════════════════════════════

function buildEditionSelector() {
  const sel = document.getElementById('sel-edition');
  sel.innerHTML = '';
  state.editions.forEach(ed => {
    const opt = document.createElement('option');
    opt.value = ed.id;
    opt.textContent = ed.edicao;
    if (ed.livros.length === 0) opt.disabled = true;
    sel.appendChild(opt);
  });
}

function getVulgataEdition() {
  return state.editions.find(e => e.id === 'vulgata' && e.livros && e.livros.length > 0)
    || state.editions.find(e => /vulgata/i.test(`${e.edicao || ''} ${e.id || ''}`) && e.livros && e.livros.length > 0)
    || null;
}

function getComparableEditions() {
  return state.editions.filter(e => e.id !== state.currentEditionId && e.livros && e.livros.length > 0);
}

function buildCompareSelectHtml(options = {}) {
  const idAttr = options.withId === false ? '' : ' id="compare-select"';
  const comparableEditions = getComparableEditions();
  if (comparableEditions.length === 0) return '';

  const currentValue = state.compareMode && state.compareEditionIds.length > 0
    ? (state.compareEditionIds.length === 1 ? state.compareEditionIds[0] : 'all')
    : '';

  const optionsHtml = comparableEditions.map(ed => {
    const sel = currentValue === ed.id ? ' selected' : '';
    return `<option value="${ed.id}"${sel}>${ed.edicao}</option>`;
  }).join('');

  const allOption = comparableEditions.length > 1
    ? `<option value="all"${currentValue === 'all' ? ' selected' : ''}>Todos</option>`
    : '';

  const activeClass = state.compareMode ? ' active' : '';
  return `<select${idAttr} class="compare-toggle-btn compare-select${activeClass}" onchange="onCompareSelectChange(this.value)" title="Comparar com outra edição"><option value=""${!currentValue ? ' selected' : ''}>Comparar com ▾</option>${optionsHtml}${allOption}</select>`;
}

function updateCompareSelect() {
  const sel = document.getElementById('compare-select');
  if (!sel) return;

  const comparableEditions = getComparableEditions();
  const shouldHide = comparableEditions.length === 0 || state.chapterViewMode === 'pdf';
  sel.style.display = shouldHide ? 'none' : '';

  const currentValue = state.compareMode && state.compareEditionIds.length > 0
    ? (state.compareEditionIds.length === 1 ? state.compareEditionIds[0] : 'all')
    : '';
  sel.value = currentValue;
  sel.classList.toggle('active', state.compareMode);
  sel.disabled = state.chapterViewMode === 'pdf';
}

function onEditionChange(editionId) {
  const ed = state.editions.find(e => e.id === editionId);
  if (!ed || !ed.livros.length) return;
  state.currentEditionId = editionId;
  document.getElementById('topbar-edition-label').textContent = ed.edicao;

  state.compareEditionIds = state.compareEditionIds.filter(id => id !== editionId);
  if (state.compareEditionIds.length === 0) {
    state.compareMode = false;
    const area = document.getElementById('main-area');
    area.classList.remove('compare');
    area.classList.add('single');
    document.getElementById('compare-grid').innerHTML = '';
    document.getElementById('content-compare').innerHTML = '';
  }

  const sameBook = ed.livros.find(f => f.includes(state.currentBookId));
  const bookFile = sameBook || ed.livros[0];
  markUserNavigation();
  loadBook(editionId, bookFile, 1, null, { historyMode: 'push' });
}

// ══════════════════════════════════════════════════════════════
//  CARREGAMENTO DE LIVRO
// ══════════════════════════════════════════════════════════════

async function fetchBookIndex(editionId, bookFile) {
  const cacheKey = editionId + '/' + bookFile;
  if (state.loadedBookIndexes[cacheKey]) return state.loadedBookIndexes[cacheKey];
  const res = await fetch(bookFile);
  if (!res.ok) throw new Error(`HTTP ${res.status} ao carregar ${bookFile}`);
  const data = await res.json();
  state.loadedBookIndexes[cacheKey] = data;
  return data;
}

async function fetchChapter(bookDir, num) {
  const cacheKey = bookDir + '/' + num;
  if (state.loadedChapters[cacheKey]) return state.loadedChapters[cacheKey];
  const url = bookDir + '/' + num + '.json';
  const res = await fetch(url);
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status} ao carregar ${url}`);
    err.status = res.status;
    err.url = url;
    throw err;
  }
  const data = await res.json();
  state.loadedChapters[cacheKey] = data;
  return data;
}

function bookDirFromFile(bookFile) {
  return bookFile.substring(0, bookFile.lastIndexOf('/'));
}

function getChapterAssets(bookDir, chapterNumber) {
  const pdfUrl = bookDir + '/' + chapterNumber + '.pdf';
  const pdfOldUrl = bookDir.replace('/figueiredo/', '/figueiredo-original/') + '/' + chapterNumber + '.pdf';
  const hasPdf = bookDir.includes('/figueiredo/');
  return { pdfUrl, pdfOldUrl, hasPdf };
}

function isMissingChapterError(error) {
  return Boolean(error && error.status === 404);
}

function disableCompareForPdfFallback() {
  state.compareMode = false;
  state.compareEditionIds = [];

  const area = document.getElementById('main-area');
  area.classList.remove('compare');
  area.classList.add('single');

  document.getElementById('compare-grid').innerHTML = '';
  document.getElementById('content-compare').innerHTML = '';
  document.getElementById('compare-status').textContent = '';
}

async function loadBook(editionId, bookFile, chapter = 1, verse = null, options = {}) {
  document.getElementById('content').innerHTML = '<p class="loading-msg">Carregando…</p>';
  closePdfModal();
  try {
    const bookIndex = await fetchBookIndex(editionId, bookFile);
    const bookDir = bookDirFromFile(bookFile);
    const chapterNumber = bookIndex.capitulos.includes(chapter) ? chapter : (bookIndex.capitulos[0] || 1);
    const verseNumber = parsePositiveInt(verse);

    state.currentBookId = bookIndex.id;
    state.currentBookDir = bookDir;
    state.currentChapter = chapterNumber;
    state.currentVerse = verseNumber;
    state.currentBookIntroducao = bookIndex.introducao || null;
    state.chapterViewMode = 'text';
    document.getElementById('compare-status').textContent = '';

    state.compareEditionIds = state.compareEditionIds.filter(id => id !== editionId);
    const area = document.getElementById('main-area');
    if (state.compareEditionIds.length === 0) {
      state.compareMode = false;
      area.classList.remove('compare');
      area.classList.add('single');
    } else {
      state.compareMode = true;
      area.classList.remove('single');
      area.classList.add('compare');
    }

    let chData;
    try {
      chData = await fetchChapter(bookDir, chapterNumber);
    } catch (e) {
      if (isMissingChapterError(e) && !bookDir.includes('/vulgata/')) {
        state.currentVerse = null;
        state.chapterViewMode = 'pdf';
        disableCompareForPdfFallback();
        renderChapterPdfFallback(chapterNumber, bookDir, 'content');
        updateNav(bookIndex);
        updateCompareSelect();
        document.getElementById('nav-book-title').textContent = bookIndex.tituloIndice || bookIndex.titulo;
        document.getElementById('bot-book-title').textContent = bookIndex.tituloIndice || bookIndex.titulo;
        buildBookSelector();

        const shouldSyncUrl = state.urlSyncEnabled && options.syncUrl !== false;
        if (shouldSyncUrl) {
          updateUrlFromState(options.historyMode || 'replace');
        }
        saveNavigationToStorage();

        requestAnimationFrame(() => {
          if (options.scrollToTop !== false) window.scrollTo(0, 0);
        });
        return;
      }
      throw e;
    }

    renderChapter(chData, bookDir, 'content');
    updateNav(bookIndex);
    updateCompareSelect();
    document.getElementById('nav-book-title').textContent = bookIndex.tituloIndice || bookIndex.titulo;
    document.getElementById('bot-book-title').textContent = bookIndex.tituloIndice || bookIndex.titulo;
    buildBookSelector();

    const shouldSyncUrl = state.urlSyncEnabled && options.syncUrl !== false;
    if (shouldSyncUrl) {
      updateUrlFromState(options.historyMode || 'replace');
    }
    saveNavigationToStorage();

    requestAnimationFrame(() => {
      if (state.currentVerse) {
        scrollToVerse(state.currentVerse);
      } else if (options.scrollToTop) {
        window.scrollTo(0, 0);
      }
    });

    if (state.compareMode && state.compareEditionIds.length > 0) {
      await loadCompareChapter();
    }
  } catch (e) {
    document.getElementById('content').innerHTML = `<p class="error-msg">Erro ao carregar livro: ${e.message}</p>`;
  }
}

// ══════════════════════════════════════════════════════════════
//  RENDERIZAÇÃO
// ══════════════════════════════════════════════════════════════

function renderChapter(ch, bookDir, targetId) {
  if (!ch) {
    document.getElementById(targetId).innerHTML = '<p class="error-msg">Capítulo não encontrado.</p>';
    return;
  }

  if (targetId === 'content') {
    state.chapterViewMode = 'text';
    destroyPdfViewerSession('inline');
  }

  const chapterSummary = typeof ch.sumario === 'string' ? ch.sumario : '';

  const notaKeys = ch.notas ? Object.keys(ch.notas) : [];

  const verses = ch.versiculos.filter(i => i.tipo !== 'bio');
  const bios   = ch.versiculos.filter(i => i.tipo === 'bio');
  const ordered = [...verses, ...bios];

  const lines = ordered.map(item => {
    if (item.tipo === 'bio') {
      return `<div class="bio"><div class="bio-title">${item.titulo}</div><p>${item.texto}</p></div>`;
    }
    let fnHtml = '';
    if (item.nota && ch.notas && ch.notas[item.nota]) {
      const nota = ch.notas[item.nota];
      const fnNum = notaKeys.indexOf(item.nota) + 1;
      const popupId = `popup_${targetId}_${item.nota}`;
      fnHtml = `<sup class="fnref" onclick="togglePopup(event,'${popupId}')">[${fnNum}]<span class="fn-popup" id="${popupId}"><button class="fn-close" onclick="closePopup(event)">✕</button><span class="fn-label">${nota.rotulo}</span> — <span>${nota.texto}</span></span></sup>`;
    }
    const vnumLabel = item.n === 0 ? '' : item.n;
    return `<p class="verse" id="v-${item.n}" data-v="${item.n}"><span class="vnum"><a href="#" onclick="onVerseNumberClick(event, ${item.n}); return false;" name="v${item.n}">${vnumLabel}</a></span>${item.texto}${fnHtml}</p>`;
  }).join('\n');

  const { pdfUrl, pdfOldUrl, hasPdf } = getChapterAssets(bookDir, ch.num);
  const originalLink = getOriginalLinkForChapter(ch);
  const pdfBtn = hasPdf ? `<button class="ver-original-btn" onclick="openPdfPanel('${pdfUrl}', 'Ver PDF 1950', 'recent')">Ver PDF 1950</button>` : '';
  const pdfOldBtn = hasPdf ? `<button class="ver-original-btn" onclick="openPdfPanel('${pdfOldUrl}', 'Ver PDF original', 'original')">Ver PDF original</button>` : '';
  const linkBtn = originalLink ? `<button class="ver-original-btn" onclick="openPdfPanel('${originalLink}', 'Ver no Wikisource', 'link')">Ver no Wikisource</button>` : '';
  const compareBtn = buildCompareSelectHtml();

  document.getElementById(targetId).innerHTML = `
    <div class="chapter-header">
      <h1>Capítulo ${ch.num}</h1>
      <div class="summary">${chapterSummary}</div>
      <div class="chapter-header-actions">${pdfOldBtn}${pdfBtn}${linkBtn}${compareBtn}</div>
    </div>
    <hr class="section-rule">
    ${lines}
  `;

  if (targetId === 'content' && state.activePdfType &&
      document.getElementById('pdf-panel').classList.contains('open')) {
    const reloadUrl = state.activePdfType === 'recent'
      ? pdfUrl
      : state.activePdfType === 'original'
        ? pdfOldUrl
        : originalLink;
    const reloadLabel = state.activePdfType === 'recent'
      ? 'Ver PDF 1950'
      : state.activePdfType === 'original'
        ? 'Ver PDF original'
        : 'Ver no Wikisource';
    if (!reloadUrl) {
      closePdfPanel();
      return;
    }
    document.getElementById('pdf-panel-title').textContent = getPanelIconByLabel(reloadLabel) + ' ' + reloadLabel;
    document.getElementById('pdf-frame').src = reloadUrl;
  }
}

function renderChapterPdfFallback(chapterNumber, bookDir, targetId) {
  const container = document.getElementById(targetId);
  const { pdfUrl, pdfOldUrl, hasPdf } = getChapterAssets(bookDir, chapterNumber);

  if (!hasPdf) {
    container.innerHTML = '<p class="error-msg">Texto do capítulo indisponível e não há PDF para fallback.</p>';
    return;
  }

  const activeType = state.inlinePdfType === 'original' ? 'original' : 'recent';
  const activeUrl = activeType === 'original' ? pdfOldUrl : pdfUrl;
  state.inlinePdfType = activeType;
  const useIframeFallback = window.innerWidth >= 768;

  if (useIframeFallback) {
    destroyPdfViewerSession('inline').catch(() => null);
  }

  container.innerHTML = `
    <div class="chapter-header pdf-fallback-header">
      <h1>Capítulo ${chapterNumber}</h1>
      <div class="summary">Texto deste capítulo ainda não foi transcrito. Exibindo o PDF do capítulo.</div>
      <div class="inline-pdf-toolbar chapter-header-actions">
        <button class="ver-original-btn inline-pdf-toggle${activeType === 'recent' ? ' active' : ''}" data-pdf-type="recent" onclick="switchInlinePdfFallback('recent')">Ver PDF 1950</button>
        <button class="ver-original-btn inline-pdf-toggle${activeType === 'original' ? ' active' : ''}" data-pdf-type="original" onclick="switchInlinePdfFallback('original')">Ver PDF original</button>
        ${buildCompareSelectHtml()}
      </div>
    </div>
    <hr class="section-rule">
    ${useIframeFallback
      ? `<iframe id="chapter-pdf-fallback-frame" class="chapter-pdf-fallback-frame" src="${activeUrl}" title="PDF do capítulo ${chapterNumber}"></iframe>`
      : `<div class="pdfjs-mobile-toolbar" id="chapter-pdf-toolbar" role="toolbar" aria-label="Controles de zoom do PDF">
           <button class="pdfjs-tool-btn" onclick="pdfViewerZoomOut('inline')" title="Diminuir zoom">&#8722;</button>
           <button class="pdfjs-tool-btn pdfjs-tool-btn-label" id="chapter-pdf-zoom-label" onclick="pdfViewerZoomReset('inline')" title="Resetar zoom">100%</button>
           <button class="pdfjs-tool-btn" onclick="pdfViewerZoomIn('inline')" title="Aumentar zoom">+</button>
           <button class="pdfjs-tool-btn" onclick="pdfViewerFitWidth('inline')" title="Ajustar à largura">Ajustar</button>
         </div>
         <div class="pdfjs-canvas-wrap">
           <div class="pdfjs-status" id="chapter-pdf-status"></div>
           <div id="chapter-pdf-pages" class="pdfjs-pages" aria-label="PDF do capítulo ${chapterNumber}"></div>
         </div>`}
  `;

  if (!useIframeFallback) {
    loadPdfInViewer('inline', activeUrl, {
      scale: MOBILE_PDF_INITIAL_SCALE,
    });
  }
}

function switchInlinePdfFallback(type) {
  if (!state.currentBookDir || !state.currentChapter) return;

  const nextType = type === 'original' ? 'original' : 'recent';
  const { pdfUrl, pdfOldUrl } = getChapterAssets(state.currentBookDir, state.currentChapter);
  state.inlinePdfType = nextType;
  const nextUrl = nextType === 'original' ? pdfOldUrl : pdfUrl;

  const frame = document.getElementById('chapter-pdf-fallback-frame');
  if (frame) {
    frame.src = nextUrl;
  } else {
    const pages = document.getElementById('chapter-pdf-pages');
    if (!pages) return;
    loadPdfInViewer('inline', nextUrl, {
      scale: MOBILE_PDF_INITIAL_SCALE,
    });
  }

  document.querySelectorAll('.inline-pdf-toggle').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.pdfType === nextType);
  });
}

function getOriginalLinkForChapter(chapterData) {
  if (!chapterData) return null;
  if (typeof chapterData.link !== 'string') return null;

  const raw = chapterData.link.trim();
  return raw || null;
}

function getPanelIconByLabel(label) {
  return label === 'Ver no Wikisource' ? '\u{1F517}' : '\u{1F4C4}';
}

function getPdfJsLib() {
  if (!window.pdfjsLib) return null;
  if (!getPdfJsLib.workerConfigured) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    getPdfJsLib.workerConfigured = true;
  }
  return window.pdfjsLib;
}

function getPdfViewerDom(viewerKey) {
  if (viewerKey === 'inline') {
    return {
      pages: document.getElementById('chapter-pdf-pages'),
      status: document.getElementById('chapter-pdf-status'),
      zoomLabel: document.getElementById('chapter-pdf-zoom-label'),
    };
  }
  if (viewerKey === 'modal') {
    return {
      pages: document.getElementById('modal-pdf-pages'),
      status: document.getElementById('modal-pdf-status'),
      zoomLabel: document.getElementById('modal-pdf-zoom-label'),
    };
  }
  return null;
}

function updatePdfViewerToolbar(viewerKey) {
  const viewer = state.pdfViewers[viewerKey];
  const dom = getPdfViewerDom(viewerKey);
  if (!viewer || !dom || !dom.zoomLabel) return;
  const percent = Math.round((viewer.scale || 1) * 100);
  dom.zoomLabel.textContent = `${percent}%`;
}

function setPdfViewerStatus(viewerKey, text, isError = false) {
  const dom = getPdfViewerDom(viewerKey);
  if (!dom || !dom.status) return;
  dom.status.textContent = text || '';
  dom.status.classList.toggle('error-msg', Boolean(isError && text));
}

function clearPdfViewerPages(viewerKey) {
  const dom = getPdfViewerDom(viewerKey);
  if (!dom || !dom.pages) return;
  dom.pages.innerHTML = '';
}

function capturePdfViewerScrollCenter(viewerKey) {
  const dom = getPdfViewerDom(viewerKey);
  const scrollHost = dom && dom.pages ? dom.pages.parentElement : null;
  if (!scrollHost) return null;

  const width = Math.max(1, scrollHost.scrollWidth);
  const height = Math.max(1, scrollHost.scrollHeight);

  return {
    xRatio: (scrollHost.scrollLeft + (scrollHost.clientWidth / 2)) / width,
    yRatio: (scrollHost.scrollTop + (scrollHost.clientHeight / 2)) / height,
  };
}

function restorePdfViewerScrollCenter(viewerKey, center) {
  if (!center) return;
  const dom = getPdfViewerDom(viewerKey);
  const scrollHost = dom && dom.pages ? dom.pages.parentElement : null;
  if (!scrollHost) return;

  const targetLeft = (center.xRatio * scrollHost.scrollWidth) - (scrollHost.clientWidth / 2);
  const targetTop = (center.yRatio * scrollHost.scrollHeight) - (scrollHost.clientHeight / 2);

  const maxLeft = Math.max(0, scrollHost.scrollWidth - scrollHost.clientWidth);
  const maxTop = Math.max(0, scrollHost.scrollHeight - scrollHost.clientHeight);

  scrollHost.scrollLeft = Math.max(0, Math.min(maxLeft, Math.round(targetLeft)));
  scrollHost.scrollTop = Math.max(0, Math.min(maxTop, Math.round(targetTop)));
}

function centerPdfViewerHorizontallyAtTop(viewerKey) {
  const dom = getPdfViewerDom(viewerKey);
  const scrollHost = dom && dom.pages ? dom.pages.parentElement : null;
  if (!scrollHost) return;

  scrollHost.scrollLeft = 0;
  scrollHost.scrollTop = 0;
}

async function destroyPdfViewerSession(viewerKey) {
  const viewer = state.pdfViewers[viewerKey];
  if (!viewer) return;

  viewer.token += 1;
  if (viewer.loadingTask) {
    try { viewer.loadingTask.destroy(); } catch (_) { }
    viewer.loadingTask = null;
  }
  if (viewer.pdfDoc) {
    try { await viewer.pdfDoc.destroy(); } catch (_) { }
    viewer.pdfDoc = null;
  }

  viewer.url = null;
  clearPdfViewerPages(viewerKey);
  setPdfViewerStatus(viewerKey, '');
}

async function loadPdfInViewer(viewerKey, url, options = {}) {
  const viewer = state.pdfViewers[viewerKey];
  const lib = getPdfJsLib();

  if (!viewer) return;
  if (!lib) {
    setPdfViewerStatus(viewerKey, 'Visualização indisponível neste navegador. Abra o PDF em nova aba.', true);
    return;
  }
  if (!url) {
    setPdfViewerStatus(viewerKey, 'PDF indisponível para este capítulo.', true);
    return;
  }

  await destroyPdfViewerSession(viewerKey);

  viewer.url = url;
  viewer.scale = Number.isFinite(options.scale) ? options.scale : viewer.scale;
  updatePdfViewerToolbar(viewerKey);
  viewer.token += 1;
  const token = viewer.token;

  setPdfViewerStatus(viewerKey, 'Carregando PDF…');

  try {
    const loadingTask = lib.getDocument(url);
    viewer.loadingTask = loadingTask;
    const pdfDoc = await loadingTask.promise;
    if (viewer.token !== token) {
      try { await pdfDoc.destroy(); } catch (_) { }
      return;
    }

    viewer.pdfDoc = pdfDoc;
    await renderPdfViewerDocument(viewerKey);
  } catch (error) {
    if (viewer.token !== token) return;
    const msg = error && error.message ? error.message : 'falha ao abrir o PDF';
    setPdfViewerStatus(viewerKey, `Não foi possível abrir o PDF (${msg}).`, true);
  } finally {
    if (viewer.token === token) {
      viewer.loadingTask = null;
    }
  }
}

async function renderPdfViewerDocument(viewerKey, options = {}) {
  const viewer = state.pdfViewers[viewerKey];
  if (!viewer || !viewer.pdfDoc) return;

  const dom = getPdfViewerDom(viewerKey);
  if (!dom || !dom.pages) return;

  clearPdfViewerPages(viewerKey);
  const token = viewer.token;
  setPdfViewerStatus(viewerKey, `Renderizando ${viewer.pdfDoc.numPages} páginas…`);

  try {
    const firstPage = await viewer.pdfDoc.getPage(1);
    if (viewer.token !== token) return;

    const baseViewport = firstPage.getViewport({ scale: 1 });
    const scrollHost = dom.pages.parentElement;
    const hostClientWidth = scrollHost ? Math.floor(scrollHost.clientWidth) : 0;
    const measuredPagesWidth = Math.floor(dom.pages.getBoundingClientRect().width);
    const pagesWidth = hostClientWidth || measuredPagesWidth || baseViewport.width;
    const fitScale = pagesWidth > 0 ? (pagesWidth / baseViewport.width) : 1;
    const zoomScale = Number.isFinite(viewer.scale) && viewer.scale > 0 ? viewer.scale : 1;
    const displayScale = Math.max(0.5, fitScale * zoomScale);
    const qualityBoost = window.innerWidth < 768 ? 1.35 : 1.65;
    const maxCanvasPixels = 16_000_000;
    const hasExplicitCenter = Boolean(options.preserveCenter);
    let centeredOnFirstPage = false;

    for (let n = 1; n <= viewer.pdfDoc.numPages; n += 1) {
      if (viewer.token !== token) return;
      const page = n === 1 ? firstPage : await viewer.pdfDoc.getPage(n);
      if (viewer.token !== token) return;

      const displayViewport = page.getViewport({ scale: displayScale });
      let renderScale = displayScale * qualityBoost;
      let renderViewport = page.getViewport({ scale: renderScale });

      let outputScale = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      let targetPixels = renderViewport.width * outputScale * renderViewport.height * outputScale;
      if (targetPixels > maxCanvasPixels) {
        const reduction = Math.sqrt(maxCanvasPixels / targetPixels);
        renderScale *= reduction;
        renderViewport = page.getViewport({ scale: renderScale });
        targetPixels = renderViewport.width * outputScale * renderViewport.height * outputScale;
        if (targetPixels > maxCanvasPixels) {
          outputScale = 1;
        }
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { alpha: false });

      canvas.width = Math.floor(renderViewport.width * outputScale);
      canvas.height = Math.floor(renderViewport.height * outputScale);
      canvas.style.width = `${Math.floor(displayViewport.width)}px`;
      canvas.style.height = 'auto';

      dom.pages.appendChild(canvas);

      const renderTask = page.render({
        canvasContext: ctx,
        viewport: renderViewport,
        transform: outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null,
      });
      await renderTask.promise;

      if (!hasExplicitCenter && !centeredOnFirstPage && n === 1) {
        centerPdfViewerHorizontallyAtTop(viewerKey);
        centeredOnFirstPage = true;
      }
    }

    setPdfViewerStatus(viewerKey, '');
    if (hasExplicitCenter) {
      requestAnimationFrame(() => restorePdfViewerScrollCenter(viewerKey, options.preserveCenter));
    }
  } catch (error) {
    if (viewer.token !== token) return;
    const msg = error && error.message ? error.message : 'falha de renderização';
    setPdfViewerStatus(viewerKey, `Erro ao renderizar PDF (${msg}).`, true);
  }
}

function setPdfViewerScale(viewerKey, scale) {
  const viewer = state.pdfViewers[viewerKey];
  if (!viewer) return;

  const nextScale = Math.max(0.7, Math.min(3, scale));
  if (!Number.isFinite(nextScale)) return;
  if (Math.abs(nextScale - (viewer.scale || 0)) < 0.01) {
    updatePdfViewerToolbar(viewerKey);
    return;
  }

  viewer.scale = nextScale;
  updatePdfViewerToolbar(viewerKey);

  if (viewer.pdfDoc) {
    const center = capturePdfViewerScrollCenter(viewerKey);
    viewer.token += 1;
    renderPdfViewerDocument(viewerKey, { preserveCenter: center });
  }
}

function pdfViewerZoomIn(viewerKey) {
  const viewer = state.pdfViewers[viewerKey];
  if (!viewer) return;
  setPdfViewerScale(viewerKey, (viewer.scale || 1) + 0.15);
}

function pdfViewerZoomOut(viewerKey) {
  const viewer = state.pdfViewers[viewerKey];
  if (!viewer) return;
  setPdfViewerScale(viewerKey, (viewer.scale || 1) - 0.15);
}

function pdfViewerZoomReset(viewerKey) {
  setPdfViewerScale(viewerKey, 1);
}

function pdfViewerFitWidth(viewerKey) {
  setPdfViewerScale(viewerKey, 1);
}

function renderVerseHtml(item, notas, notaKeys, prefix) {
  if (item.tipo === 'bio') {
    return `<div class="bio"><div class="bio-title">${item.titulo}</div><p>${item.texto}</p></div>`;
  }
  let fnHtml = '';
  if (item.nota && notas && notas[item.nota]) {
    const nota = notas[item.nota];
    const fnNum = notaKeys.indexOf(item.nota) + 1;
    const popupId = `popup_${prefix}_${item.nota}`;
    fnHtml = `<sup class="fnref" onclick="togglePopup(event,'${popupId}')">[${fnNum}]<span class="fn-popup" id="${popupId}"><button class="fn-close" onclick="closePopup(event)">✕</button><span class="fn-label">${nota.rotulo}</span> — <span>${nota.texto}</span></span></sup>`;
  }
  const vnumLabel = item.n === 0 ? '' : item.n;
  return `<span class="vnum"><a href="#" onclick="onVerseNumberClick(event, ${item.n}); return false;" name="v${item.n}_${prefix}">${vnumLabel}</a></span>${item.texto}${fnHtml}`;
}

// compareEntries: [{editionId, ch, bookDir, error}]
function renderCompareGrid(ch1, bookDir1, compareEntries) {
  const grid = document.getElementById('compare-grid');
  grid.innerHTML = '';

  if (!ch1) {
    grid.innerHTML = '<p class="error-msg" style="grid-column:1/-1">Capítulo não encontrado.</p>';
    return;
  }

  const numCols = 1 + compareEntries.length;
  grid.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;

  const ed1 = state.editions.find(e => e.id === state.currentEditionId);

  const makeHeaderCell = (ed, ch, bookDir) => {
    const div = document.createElement('div');
    div.className = 'cg-cell cg-header-cell';
    if (!ch) {
      div.innerHTML = `<div class="cg-edition-label">${ed ? ed.edicao : ''}</div>`
        + `<div class="cg-summary-text compare-unavailable">Não disponível nesta edição</div>`;
      return div;
    }
    const chapterSummary = typeof ch.sumario === 'string' ? ch.sumario : '';
    const originalLink = getOriginalLinkForChapter(ch);
    const { hasPdf, pdfUrl, pdfOldUrl } = getChapterAssets(bookDir, ch.num);
    let buttonsHtml = '';
    if (hasPdf) {
      buttonsHtml += `<button class="ver-original-btn" onclick="openPdfPanel('${pdfUrl}', 'Ver PDF 1950', 'recent')">Ver PDF 1950</button>`
        + `<button class="ver-original-btn" onclick="openPdfPanel('${pdfOldUrl}', 'Ver PDF original', 'original')">Ver PDF original</button>`;
    }
    if (originalLink) {
      buttonsHtml += `<button class="ver-original-btn" onclick="openPdfPanel('${originalLink}', 'Ver no Wikisource', 'link')">Ver no Wikisource</button>`;
    }
    const actionsHtml = buttonsHtml ? `<div class="chapter-header-actions">${buttonsHtml}</div>` : '';
    div.innerHTML = `<div class="cg-edition-label">${ed ? ed.edicao : ''}</div>`
      + `<div class="cg-chapter-title">Capítulo ${ch.num}</div>`
      + `<div class="cg-summary-text">${chapterSummary}</div>`
      + actionsHtml;
    return div;
  };

  grid.appendChild(makeHeaderCell(ed1, ch1, bookDir1));
  for (const entry of compareEntries) {
    const ed = state.editions.find(e => e.id === entry.editionId);
    grid.appendChild(makeHeaderCell(ed, entry.ch, entry.bookDir));
  }

  const rule = document.createElement('div');
  rule.className = 'cg-rule';
  grid.appendChild(rule);

  const allVersesList = [ch1, ...compareEntries.map(e => e.ch)].map(ch =>
    ch ? ch.versiculos.filter(i => i.tipo !== 'bio') : []
  );
  const allNotaKeys = [ch1, ...compareEntries.map(e => e.ch)].map(ch =>
    ch && ch.notas ? Object.keys(ch.notas) : []
  );
  const allBios = [ch1, ...compareEntries.map(e => e.ch)].map(ch =>
    ch ? ch.versiculos.filter(i => i.tipo === 'bio') : []
  );

  const allNums = [...new Set(allVersesList.flatMap(vs => vs.map(v => v.n)))].sort((a, b) => a - b);

  for (const num of allNums) {
    for (let col = 0; col < numCols; col++) {
      const verses = allVersesList[col];
      const ch = col === 0 ? ch1 : compareEntries[col - 1].ch;
      const notas = ch && ch.notas ? ch.notas : {};
      const notaKeys = allNotaKeys[col];
      const item = verses.find(v => v.n === num);
      const cell = document.createElement('div');
      cell.className = 'cg-cell';
      if (item) {
        cell.innerHTML = `<p class="verse compare-verse" data-v="${item.n}">${renderVerseHtml(item, notas, notaKeys, `cg${col + 1}`)}</p>`;
      }
      grid.appendChild(cell);
    }
    const divider = document.createElement('div');
    divider.className = 'cg-divider';
    grid.appendChild(divider);
  }

  const maxBios = Math.max(...allBios.map(b => b.length));
  for (let i = 0; i < maxBios; i++) {
    for (let col = 0; col < numCols; col++) {
      const b = allBios[col][i];
      const bcell = document.createElement('div');
      bcell.className = 'cg-cell';
      if (b) bcell.innerHTML = `<div class="bio"><div class="bio-title">${b.titulo}</div><p>${b.texto}</p></div>`;
      grid.appendChild(bcell);
    }
    const bdivider = document.createElement('div');
    bdivider.className = 'cg-divider';
    grid.appendChild(bdivider);
  }

  if (state.currentVerse) {
    highlightSelectedVerses(state.currentVerse);
  }
}

// ══════════════════════════════════════════════════════════════
//  NAVEGAÇÃO
// ══════════════════════════════════════════════════════════════

function updateNav(bookIndex) {
  const caps = bookIndex.capitulos;
  const ch = state.currentChapter;

  document.getElementById('nav-ch-num').textContent = ch;

  const prevEl  = document.getElementById('nav-prev-ch');
  const botPrev = document.getElementById('bot-prev');
  const prevCap = caps[caps.indexOf(ch) - 1];
  if (prevCap !== undefined) {
    prevEl.outerHTML  = `<a href="#" id="nav-prev-ch" onclick="goChapter(${prevCap}); return false;">&lt; cap. ant.</a>`;
    botPrev.outerHTML = `<a href="#" id="bot-prev" onclick="goChapter(${prevCap}); return false;">&lt; cap. ant.</a>`;
  } else {
    prevEl.outerHTML  = `<span class="dimmed" id="nav-prev-ch">&lt; cap. ant.</span>`;
    botPrev.outerHTML = `<span class="dimmed" id="bot-prev">&lt; cap. ant.</span>`;
  }

  const nextEl  = document.getElementById('nav-next-ch');
  const botNext = document.getElementById('bot-next');
  const nextCap = caps[caps.indexOf(ch) + 1];
  if (nextCap !== undefined) {
    nextEl.outerHTML  = `<a href="#" id="nav-next-ch" onclick="goChapter(${nextCap}); return false;">próx. cap. &gt;</a>`;
    botNext.outerHTML = `<a href="#" id="bot-next" onclick="goChapter(${nextCap}); return false;">próx. cap. &gt;</a>`;
  } else {
    nextEl.outerHTML  = `<span class="dimmed" id="nav-next-ch">próx. cap. &gt;</span>`;
    botNext.outerHTML = `<span class="dimmed" id="bot-next">próx. cap. &gt;</span>`;
  }

  const introLink = state.currentBookIntroducao
    ? `<a href="#" onclick="openIntro(); return false;">Introdução</a> `
    : '';
  let links = '<span class="label">Capítulos:</span> ' + introLink;
  caps.forEach(n => {
    if (n === ch) links += `<a class="current" href="#">${n}</a> `;
    else links += `<a href="#" onclick="goChapter(${n}); return false;">${n}</a> `;
  });
  document.getElementById('chapter-links').innerHTML = links;
}

function goChapter(n) {
  if (activePopup) { activePopup.classList.remove('active'); activePopup = null; }
  const ed = state.editions.find(e => e.id === state.currentEditionId);
  const bookFile = ed.livros.find(f => f.includes('/' + state.currentBookId + '/'));
  markUserNavigation();
  loadBook(state.currentEditionId, bookFile, n, null, { scrollToTop: true, historyMode: 'push' });
}

async function prevBook() {
  const ed = state.editions.find(e => e.id === state.currentEditionId);
  const idx = ed.livros.findIndex(f => f.includes('/' + state.currentBookId + '/'));
  if (idx <= 0) return;
  markUserNavigation();
  await loadBook(state.currentEditionId, ed.livros[idx - 1], 1, null, { scrollToTop: true, historyMode: 'push' });
}

async function nextBook() {
  const ed = state.editions.find(e => e.id === state.currentEditionId);
  const idx = ed.livros.findIndex(f => f.includes('/' + state.currentBookId + '/'));
  if (idx < 0 || idx >= ed.livros.length - 1) return;
  markUserNavigation();
  await loadBook(state.currentEditionId, ed.livros[idx + 1], 1, null, { scrollToTop: true, historyMode: 'push' });
}

// ══════════════════════════════════════════════════════════════
//  MODO COMPARAÇÃO
// ══════════════════════════════════════════════════════════════

function onCompareSelectChange(value) {
  markUserNavigation();

  const area = document.getElementById('main-area');

  if (state.chapterViewMode === 'pdf') {
    alert('Comparação indisponível em capítulos sem transcrição.');
    updateCompareSelect();
    return;
  }

  if (!value) {
    state.compareMode = false;
    state.compareEditionIds = [];
    area.classList.replace('compare', 'single');
    document.getElementById('compare-grid').innerHTML = '';
    document.getElementById('content-compare').innerHTML = '';
    updateCompareSelect();
    updateUrlFromState('push');
    return;
  }

  let newIds;
  if (value === 'all') {
    newIds = getComparableEditions().map(e => e.id);
  } else {
    newIds = [value];
  }

  state.compareMode = true;
  state.compareEditionIds = newIds;
  area.classList.replace('single', 'compare');
  loadCompareChapter();
  updateCompareSelect();
  updateUrlFromState('push');
}

function buildCompareEditionSelector() {
  const sel = document.getElementById('sel-compare-edition');
  sel.innerHTML = '<option value="">— selecionar edição —</option>';
  state.editions.forEach(ed => {
    if (ed.id === state.currentEditionId) return;
    const opt = document.createElement('option');
    opt.value = ed.id;
    opt.textContent = ed.edicao;
    if (ed.livros.length === 0) opt.disabled = true;
    sel.appendChild(opt);
  });
}

function onCompareEditionChange(editionId) {
  if (!editionId) return;
  markUserNavigation();
  state.compareEditionIds = [editionId];
  state.compareMode = true;
  loadCompareChapter();
  updateUrlFromState('push');
}

async function loadCompareChapter() {
  if (!state.compareEditionIds.length) return;
  const grid = document.getElementById('compare-grid');
  document.getElementById('compare-status').textContent = '';

  if (state.chapterViewMode === 'pdf') {
    grid.innerHTML = '';
    return;
  }

  grid.innerHTML = '<p class="loading-msg" style="grid-column:1/-1">Carregando…</p>';

  const ch1 = state.loadedChapters[state.currentBookDir + '/' + state.currentChapter];

  const compareEntries = await Promise.all(state.compareEditionIds.map(async (compareEdId) => {
    const ed = state.editions.find(e => e.id === compareEdId);
    if (!ed || !ed.livros.length) {
      return { editionId: compareEdId, ch: null, bookDir: null, error: 'Edição sem livros disponíveis' };
    }
    const bookFile2 = ed.livros.find(f => f.includes('/' + state.currentBookId + '/'));
    if (!bookFile2) {
      return { editionId: compareEdId, ch: null, bookDir: null, error: 'Livro não disponível nesta edição' };
    }
    try {
      const bookDir2 = bookDirFromFile(bookFile2);
      const ch2 = await fetchChapter(bookDir2, state.currentChapter);
      return { editionId: compareEdId, ch: ch2, bookDir: bookDir2 };
    } catch (e) {
      return { editionId: compareEdId, ch: null, bookDir: null, error: e.message };
    }
  }));

  const firstError = compareEntries.find(e => e.error && !e.ch);
  if (firstError && compareEntries.every(e => !e.ch)) {
    grid.innerHTML = `<p class="error-msg" style="grid-column:1/-1">${firstError.error}</p>`;
    document.getElementById('compare-status').textContent = firstError.error;
    return;
  }

  renderCompareGrid(ch1, state.currentBookDir, compareEntries);
}

// ══════════════════════════════════════════════════════════════
//  SELETOR DE LIVROS (OVERLAY)
// ══════════════════════════════════════════════════════════════

function buildBookSelector() {
  const ed = state.editions.find(e => e.id === state.currentEditionId);
  if (!ed) return;

  const container = document.getElementById('book-list-content');
  if (!container) return;

  const cachedHtml = state.bookSelectorHtmlByEdition[ed.id] || buildBookSelectorHtml(ed);
  if (container.dataset.editionId !== ed.id) {
    container.innerHTML = cachedHtml;
    container.dataset.editionId = ed.id;
  }

  syncCurrentBookInSelector();
}

async function selectBookById(bookId) {
  if (!bookId || !state.currentEditionId) return;
  const file = buildBookIndexFilePath(state.currentEditionId, bookId);
  if (!file) return;

  closeBooks();
  markUserNavigation();
  await loadBook(state.currentEditionId, file, 1, null, { scrollToTop: true, historyMode: 'push' });
}

async function openBooks() {
  document.getElementById('book-selector').classList.add('open');
  buildBookSelector();
}

function closeBooks() { document.getElementById('book-selector').classList.remove('open'); }
function closeBooksOverlay(e) {
  if (e.target === document.getElementById('book-selector')) closeBooks();
}

// ══════════════════════════════════════════════════════════════
//  POPUPS DE NOTAS
// ══════════════════════════════════════════════════════════════

function togglePopup(e, popupId) {
  e.stopPropagation();
  const popup = document.getElementById(popupId);
  if (!popup) return;
  if (activePopup && activePopup !== popup) activePopup.classList.remove('active');
  popup.classList.toggle('active');
  activePopup = popup.classList.contains('active') ? popup : null;
}

function closePopup(e) {
  e.stopPropagation();
  if (activePopup) { activePopup.classList.remove('active'); activePopup = null; }
}

document.addEventListener('click', () => {
  if (activePopup) { activePopup.classList.remove('active'); activePopup = null; }
});

// ══════════════════════════════════════════════════════════════
//  DRAWER / VISUALIZAÇÃO DE PDF
//  — Em celular (< 768 px): abre modal PDF.js (exceto links externos)
//  — Em desktop: abre no drawer lateral
// ══════════════════════════════════════════════════════════════

function openPdfPanel(url, label, panelType = 'pdf') {
  state.activePdfType = panelType === 'link'
    ? 'link'
    : (panelType === 'recent' || label === 'Ver PDF 1950' || label === 'PDF recente' ? 'recent' : 'original');

  if (window.innerWidth < 768) {
    if (panelType === 'link') {
      window.open(url, '_blank');
      return;
    }
    openPdfModal(url, label);
    return;
  }

  const frame = document.getElementById('pdf-frame');
  const panel = document.getElementById('pdf-panel');
  if (label) document.getElementById('pdf-panel-title').textContent = getPanelIconByLabel(label) + ' ' + label;
  frame.src = url;
  panel.classList.add('open');
}

function closePdfPanel() {
  const panel = document.getElementById('pdf-panel');
  panel.classList.remove('open');
  closePdfModal();
  if (!panel.classList.contains('open')) state.activePdfType = null;
  setTimeout(() => { document.getElementById('pdf-frame').src = ''; }, 300);
}

function openPdfModal(url, label) {
  const modal = document.getElementById('pdf-modal');
  if (!modal) return;

  if (label) {
    document.getElementById('pdf-modal-title').textContent = getPanelIconByLabel(label) + ' ' + label;
  }

  if (!modal.classList.contains('open') && !pdfModalHistoryActive) {
    window.history.pushState({ pdfModal: true }, '', window.location.href);
    pdfModalHistoryActive = true;
  }

  modal.classList.add('open');
  document.body.classList.add('pdf-modal-open');
  loadPdfInViewer('modal', url, { scale: MOBILE_PDF_INITIAL_SCALE });
}

function closePdfModal(options = {}) {
  const fromPopstate = Boolean(options.fromPopstate);
  const modal = document.getElementById('pdf-modal');
  if (!modal) return;

  if (!fromPopstate && pdfModalHistoryActive) {
    ignoreNextModalPopstate = true;
    window.history.back();
  }

  modal.classList.remove('open');
  document.body.classList.remove('pdf-modal-open');
  destroyPdfViewerSession('modal');
  pdfModalHistoryActive = false;
}

function closePdfModalOverlay(e) {
  if (e.target === document.getElementById('pdf-modal')) {
    closePdfModal();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closePdfPanel(); closePdfModal(); closeIntro(); }
});

// ══════════════════════════════════════════════════════════════
//  MODAL DE INTRODUÇÃO
// ══════════════════════════════════════════════════════════════

function openIntro() {
  document.getElementById('intro-content').innerHTML =
    state.currentBookIntroducao || '<p>Introdução não disponível.</p>';
  document.getElementById('intro-modal').classList.add('open');
}

function closeIntro() {
  document.getElementById('intro-modal').classList.remove('open');
}

function closeIntroOverlay(e) {
  if (e.target === document.getElementById('intro-modal')) closeIntro();
}

// ══════════════════════════════════════════════════════════════
//  START
// ══════════════════════════════════════════════════════════════

init();
