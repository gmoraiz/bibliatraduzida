// ══════════════════════════════════════════════════════════════
//  CLIENT-SIDE JS FOR ASTRO STATIC PAGES
//  Adapted from app.js - reads pageData embedded in page
// ══════════════════════════════════════════════════════════════

const THEME_STORAGE_KEY = 'biblia:theme';
const REVIEW_POPUP_STORAGE_KEY = 'biblia:hide-review-popup';
const INSTALL_POPUP_STORAGE_KEY = 'biblia:hide-install-popup-until';
const NAV_STORAGE_KEY = 'biblia:last-navigation';
const INSTALL_POPUP_DISMISS_DAYS = 7;
const INSTALL_POPUP_MODE_NATIVE = 'native';
const INSTALL_POPUP_MODE_IOS_MANUAL = 'ios-manual';
const MOBILE_PDF_INITIAL_SCALE = 1;

// Read page data embedded by Astro
let pageData = {};
try {
  const el = document.getElementById('page-data');
  if (el) pageData = JSON.parse(el.textContent || '{}');
} catch (_) {}

// PDF viewer state (per viewer key: 'inline' or 'modal')
const pdfViewers = {
  inline: createPdfViewerState(),
  modal: createPdfViewerState(),
};

let activePopup = null;
let pdfModalHistoryActive = false;
let ignoreNextModalPopstate = false;
let pdfModalGesturesBound = false;
let pdfPinchGesturesBound = false;
let pdfPinchState = null;
let deferredInstallPrompt = null;

// ── THEME ──────────────────────────────────────────────────────

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
  const btn = document.getElementById('theme-toggle-btn');
  if (!btn) return;
  btn.textContent = isDark ? '☀️ Claro' : '🌙 Noturno';
  btn.setAttribute('aria-pressed', String(isDark));
  btn.title = isDark ? 'Ativar modo claro' : 'Ativar modo noturno';
}

function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem(THEME_STORAGE_KEY); } catch (_) {}
  applyTheme(saved === 'dark' ? 'dark' : 'light');
}

function toggleDarkMode() {
  const next = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem(THEME_STORAGE_KEY, next); } catch (_) {}
}

// ── NAVIGATION STORAGE ─────────────────────────────────────────

function saveNavigationToStorage() {
  if (!pageData.edition || !pageData.book || !pageData.chapter) return;
  try {
    localStorage.setItem(NAV_STORAGE_KEY, JSON.stringify({
      editionId: pageData.edition,
      bookId: pageData.book,
      chapter: pageData.chapter,
    }));
  } catch (_) {}
}

// ── REVIEW POPUP ───────────────────────────────────────────────

function hideReviewPopup(options = {}) {
  const popup = document.getElementById('review-popup');
  if (popup) popup.hidden = true;
  document.body.classList.remove('review-popup-open');
  if (!options.permanent) return;
  try { localStorage.setItem(REVIEW_POPUP_STORAGE_KEY, '1'); } catch (_) {}
}

function initReviewPopup() {
  const popup = document.getElementById('review-popup');
  const okBtn = document.getElementById('review-popup-ok');
  const hideBtn = document.getElementById('review-popup-hide');
  if (!popup || !okBtn || !hideBtn) return;

  let hide = false;
  try { hide = localStorage.getItem(REVIEW_POPUP_STORAGE_KEY) === '1'; } catch (_) {}

  if (hide || pageData.edition !== 'figueiredo') {
    popup.hidden = true;
    document.body.classList.remove('review-popup-open');
    return;
  }

  popup.hidden = false;
  document.body.classList.add('review-popup-open');
  okBtn.addEventListener('click', () => hideReviewPopup());
  hideBtn.addEventListener('click', () => hideReviewPopup({ permanent: true }));
}

// ── INSTALL POPUP ─────────────────────────────────────────────

function isIOSMobile() {
  const ua = navigator.userAgent || '';
  return /iP(hone|ad|od)/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function isRunningStandaloneMode() {
  return Boolean(
    (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
    (window.navigator && window.navigator.standalone === true)
  );
}

function parseInstallDismissUntil() {
  try {
    const raw = localStorage.getItem(INSTALL_POPUP_STORAGE_KEY);
    const n = Number.parseInt(raw || '', 10);
    return Number.isFinite(n) ? n : 0;
  } catch (_) { return 0; }
}

function dismissInstallPopupForDays(days = INSTALL_POPUP_DISMISS_DAYS) {
  try {
    localStorage.setItem(INSTALL_POPUP_STORAGE_KEY, String(Date.now() + (Math.max(1, days) * 86400000)));
  } catch (_) {}
}

function canShowInstallPopup() {
  return !isRunningStandaloneMode() && parseInstallDismissUntil() < Date.now();
}

function setInstallPopupContent(mode) {
  const popup = document.getElementById('install-popup');
  const textEl = popup ? popup.querySelector('.install-popup-text') : null;
  const installBtn = document.getElementById('install-popup-install');
  const closeBtn = document.getElementById('install-popup-close');
  if (!popup || !textEl || !installBtn || !closeBtn) return;
  popup.dataset.installMode = mode;
  if (mode === INSTALL_POPUP_MODE_IOS_MANUAL) {
    textEl.innerHTML = 'Instale o app <strong>Biblia Traduzida</strong>. No iPhone/iPad, toque em <strong>Compartilhar</strong> e depois em <strong>Adicionar à Tela de Início</strong>.';
    installBtn.textContent = 'Entendi';
    closeBtn.textContent = 'Não mostrar novamente';
  } else {
    textEl.innerHTML = 'Instale o app <strong>Biblia Traduzida</strong> para acessá-la mais rápido.';
    installBtn.textContent = 'Instalar';
    closeBtn.textContent = 'Agora não';
  }
}

function setInstallPopupVisibility(visible) {
  const popup = document.getElementById('install-popup');
  if (!popup) return;
  popup.hidden = !visible;
}

function showInstallPopup(mode) {
  setInstallPopupContent(mode);
  setInstallPopupVisibility(true);
}

async function promptInstallApp() {
  if (!deferredInstallPrompt) return;
  try {
    await deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
  } catch (_) {}
  deferredInstallPrompt = null;
  setInstallPopupVisibility(false);
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
    dismissInstallPopupForDays(mode === INSTALL_POPUP_MODE_IOS_MANUAL ? 3650 : INSTALL_POPUP_DISMISS_DAYS);
    setInstallPopupVisibility(false);
  });

  if (isIOSMobile() && canShowInstallPopup()) showInstallPopup(INSTALL_POPUP_MODE_IOS_MANUAL);

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    if (canShowInstallPopup()) showInstallPopup(INSTALL_POPUP_MODE_NATIVE);
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    setInstallPopupVisibility(false);
    dismissInstallPopupForDays(3650);
  });
}

// ── SERVICE WORKER ────────────────────────────────────────────

async function registerPwaServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  try {
    await navigator.serviceWorker.register('/service-worker.js', { scope: '/' });
  } catch (e) {
    console.warn('SW registration failed:', e);
  }
}

// ── FOOTNOTE POPUPS ───────────────────────────────────────────

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

// ── VERSE CLICK ───────────────────────────────────────────────

function highlightSelectedVerses(verseNumber) {
  document.querySelectorAll('.verse.verse-marked').forEach(el => el.classList.remove('verse-marked'));
  if (!verseNumber) return;
  const main = document.querySelector(`#content .verse[data-v="${verseNumber}"]`);
  if (main) main.classList.add('verse-marked');
  document.querySelectorAll(`#compare-grid .compare-verse[data-v="${verseNumber}"]`).forEach(el => el.classList.add('verse-marked'));
}

async function onVerseNumberClick(e, verseNumber) {
  if (e) e.preventDefault();
  const n = Number.parseInt(String(verseNumber), 10);
  if (!Number.isFinite(n) || n <= 0) return;
  highlightSelectedVerses(n);

  // Share
  const verse = pageData.chapterData?.versiculos?.find(v => v && v.tipo !== 'bio' && Number(v.n) === n);
  const text = verse?.texto?.trim() || '';
  const bookTitle = pageData.bookTitulo || '';
  const ref = `${bookTitle} ${pageData.chapter}, ${n}`;
  const shareText = text ? `${ref} — ${text}` : ref;
  const shareUrl = window.location.href;

  if (navigator.share) {
    try { await navigator.share({ title: 'Bíblia Sagrada', text: shareText, url: shareUrl }); return; } catch (err) { if (err?.name === 'AbortError') return; }
  }
  if (navigator.clipboard?.writeText) {
    try { await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`); return; } catch (_) {}
  }
  window.prompt('Copie o versículo:', `${shareText}\n\n${shareUrl}`);
}

// ── EDITION SELECTOR ──────────────────────────────────────────

function onEditionChange(editionId) {
  if (!editionId || editionId === pageData.edition) return;
  window.location.href = `/${editionId}/${pageData.book}/${pageData.chapter}/`;
}

// ── BOOK SELECTOR ─────────────────────────────────────────────

function openBooks() {
  document.getElementById('book-selector')?.classList.add('open');
}

function closeBooks() {
  document.getElementById('book-selector')?.classList.remove('open');
}

function closeBooksOverlay(e) {
  if (e.target === document.getElementById('book-selector')) closeBooks();
}

// ── COMPARE MODE ──────────────────────────────────────────────

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

function getPanelIconByLabel(label) {
  return label === 'Ver no Wikisource' ? '🔗' : '📄';
}

function renderCompareGrid(ch1, bookDir1, compareEntries) {
  const grid = document.getElementById('compare-grid');
  if (!grid) return;
  grid.innerHTML = '';

  if (!ch1) {
    grid.innerHTML = '<p class="error-msg" style="grid-column:1/-1">Capítulo não encontrado.</p>';
    return;
  }

  const numCols = 1 + compareEntries.length;
  grid.className = grid.className.replace(/\bcg-cols-\d+\b/g, '').trim();
  grid.classList.add(`cg-cols-${numCols}`);

  const currentEdition = (pageData.editions || []).find(e => e.id === pageData.edition);

  const makeHeaderCell = (ed, ch, bookDir, isLastCompare = false) => {
    const div = document.createElement('div');
    div.className = 'cg-cell cg-header-cell';
    if (!ch) {
      div.innerHTML = `<div class="cg-edition-label">${ed?.edicao || ''}</div><div class="cg-summary-text compare-unavailable">Não disponível nesta edição</div>`;
      return div;
    }
    const chapterSummary = typeof ch.sumario === 'string' ? ch.sumario : '';
    let cgSumarioNotaHtml = '';
    if (ch.sumarioNota && ch.notas && ch.notas[ch.sumarioNota]) {
      const snNota = ch.notas[ch.sumarioNota];
      const snPopupId = `popup_cg_${ed?.id || 'main'}_${ch.num}_sumarioNota`;
      cgSumarioNotaHtml = `<sup class="fnref" onclick="togglePopup(event,'${snPopupId}')">(*)` +
        `<span class="fn-popup" id="${snPopupId}"><button class="fn-close" onclick="closePopup(event)">✕</button>` +
        `<span class="fn-label">${snNota.rotulo}</span> — <span>${snNota.texto}</span></span></sup>`;
    }
    const pdfUrl = bookDir ? `/${bookDir}/${ch.num}.pdf` : null;
    const pdfOldUrl = bookDir ? `/${bookDir.replace('/figueiredo/', '/figueiredo-original/')}/${ch.num}.pdf` : null;
    const hasPdf = bookDir ? bookDir.includes('/figueiredo/') : false;
    let buttonsHtml = '';
    if (hasPdf && pdfUrl) {
      buttonsHtml += `<button class="ver-original-btn" onclick="openPdfPanel('${pdfUrl}', 'Ver PDF 1950', 'recent')">Ver PDF 1950</button>`;
      buttonsHtml += `<button class="ver-original-btn" onclick="openPdfPanel('${pdfOldUrl}', 'Ver PDF original', 'original')">Ver PDF original</button>`;
    }
    if (isLastCompare) {
      buttonsHtml += `<button class="ver-original-btn compare-undo-btn" onclick="onCompareSelectChange('')" title="Desfazer comparação">✕ Desfazer comparação</button>`;
    }
    const actionsHtml = buttonsHtml ? `<div class="chapter-header-actions">${buttonsHtml}</div>` : '';
    div.innerHTML = `<div class="cg-edition-label">${ed?.edicao || ''}</div><div class="cg-chapter-title">Capítulo ${ch.num}</div><div class="cg-summary-text">${chapterSummary}${cgSumarioNotaHtml}</div>${actionsHtml}`;
    return div;
  };

  grid.appendChild(makeHeaderCell(currentEdition, ch1, bookDir1));
  for (let i = 0; i < compareEntries.length; i++) {
    const entry = compareEntries[i];
    const ed = (pageData.editions || []).find(e => e.id === entry.editionId);
    grid.appendChild(makeHeaderCell(ed, entry.ch, entry.bookDir, i === compareEntries.length - 1));
  }

  const rule = document.createElement('div');
  rule.className = 'cg-rule';
  grid.appendChild(rule);

  const allVersesList = [ch1, ...compareEntries.map(e => e.ch)].map(ch =>
    ch ? ch.versiculos.filter(i => i.tipo !== 'bio') : []
  );
  const allNotaKeys = [ch1, ...compareEntries.map(e => e.ch)].map(ch =>
    ch?.notas
      ? ch.versiculos.map(v => v.nota).filter((k, i, arr) => k && ch.notas[k] && arr.indexOf(k) === i)
      : []
  );
  const allBios = [ch1, ...compareEntries.map(e => e.ch)].map(ch =>
    ch ? ch.versiculos.filter(i => i.tipo === 'bio') : []
  );

  const allNums = [...new Set(allVersesList.flatMap(vs => vs.map(v => v.n)))].sort((a, b) => a - b);

  for (const num of allNums) {
    for (let col = 0; col < numCols; col++) {
      const verses = allVersesList[col];
      const ch = col === 0 ? ch1 : compareEntries[col - 1].ch;
      const notas = ch?.notas || {};
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

  const maxBios = Math.max(0, ...allBios.map(b => b.length));
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
}

let compareMode = false;
let compareEditionIds = [];

async function loadCompareChapter() {
  const grid = document.getElementById('compare-grid');
  const status = document.getElementById('compare-status');
  if (!grid) return;
  if (status) status.textContent = '';

  grid.innerHTML = '<p class="loading-msg" style="grid-column:1/-1">Carregando…</p>';

  const ch1 = pageData.chapterData;
  const bookDir1 = pageData.bookDir;

  const compareEntries = await Promise.all(compareEditionIds.map(async (compareEdId) => {
    const ed = (pageData.editions || []).find(e => e.id === compareEdId);
    if (!ed) return { editionId: compareEdId, ch: null, bookDir: null, error: 'Edição não encontrada' };

    const bookDir2 = `edicoes/${compareEdId}/${pageData.book}`;
    try {
      const res = await fetch(`/${bookDir2}/${pageData.chapter}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const ch2 = await res.json();
      return { editionId: compareEdId, ch: ch2, bookDir: bookDir2 };
    } catch (e) {
      return { editionId: compareEdId, ch: null, bookDir: null, error: e.message };
    }
  }));

  renderCompareGrid(ch1, bookDir1, compareEntries);
}

function onCompareSelectChange(value) {
  const area = document.getElementById('main-area');
  if (!area) return;

  if (!value) {
    compareMode = false;
    compareEditionIds = [];
    area.classList.replace('compare', 'single') || (area.classList.remove('compare'), area.classList.add('single'));
    const grid = document.getElementById('compare-grid');
    if (grid) grid.innerHTML = '';
    const cc = document.getElementById('content-compare');
    if (cc) cc.innerHTML = '';
    // reset compare select
    const sel = document.getElementById('compare-select');
    if (sel) sel.value = '';
    return;
  }

  let newIds;
  const otherEditions = (pageData.editions || []).filter(e => e.id !== pageData.edition);
  if (value === 'all') {
    newIds = otherEditions.map(e => e.id);
  } else {
    newIds = [value];
  }

  compareMode = true;
  compareEditionIds = newIds;
  area.classList.replace('single', 'compare') || (area.classList.remove('single'), area.classList.add('compare'));
  loadCompareChapter();
}

function onCompareEditionChange(editionId) {
  if (!editionId) return;
  compareEditionIds = [editionId];
  compareMode = true;
  loadCompareChapter();
}

// ── PDF VIEWER STATE ──────────────────────────────────────────

function createPdfViewerState() {
  return { pdfDoc: null, loadingTask: null, scale: 1, url: null, token: 0 };
}

function isPdfModalOpen() {
  return Boolean(document.getElementById('pdf-modal')?.classList.contains('open'));
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
  const viewer = pdfViewers[viewerKey];
  const dom = getPdfViewerDom(viewerKey);
  if (!viewer || !dom || !dom.zoomLabel) return;
  dom.zoomLabel.textContent = `${Math.round((viewer.scale || 1) * 100)}%`;
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
  const scrollHost = dom?.pages?.parentElement;
  if (!scrollHost) return null;
  return {
    xRatio: (scrollHost.scrollLeft + scrollHost.clientWidth / 2) / Math.max(1, scrollHost.scrollWidth),
    yRatio: (scrollHost.scrollTop + scrollHost.clientHeight / 2) / Math.max(1, scrollHost.scrollHeight),
  };
}

function restorePdfViewerScrollCenter(viewerKey, center) {
  if (!center) return;
  const dom = getPdfViewerDom(viewerKey);
  const scrollHost = dom?.pages?.parentElement;
  if (!scrollHost) return;
  const left = center.xRatio * scrollHost.scrollWidth - scrollHost.clientWidth / 2;
  const top = center.yRatio * scrollHost.scrollHeight - scrollHost.clientHeight / 2;
  scrollHost.scrollLeft = Math.max(0, Math.min(scrollHost.scrollWidth - scrollHost.clientWidth, Math.round(left)));
  scrollHost.scrollTop = Math.max(0, Math.min(scrollHost.scrollHeight - scrollHost.clientHeight, Math.round(top)));
}

function centerPdfViewerHorizontallyAtTop(viewerKey) {
  const dom = getPdfViewerDom(viewerKey);
  const scrollHost = dom?.pages?.parentElement;
  if (!scrollHost) return;
  scrollHost.scrollLeft = 0;
  scrollHost.scrollTop = 0;
}

async function destroyPdfViewerSession(viewerKey) {
  const viewer = pdfViewers[viewerKey];
  if (!viewer) return;
  viewer.token += 1;
  if (viewer.loadingTask) { try { viewer.loadingTask.destroy(); } catch (_) {} viewer.loadingTask = null; }
  if (viewer.pdfDoc) { try { await viewer.pdfDoc.destroy(); } catch (_) {} viewer.pdfDoc = null; }
  viewer.url = null;
  clearPdfViewerPages(viewerKey);
  setPdfViewerStatus(viewerKey, '');
}

async function loadPdfInViewer(viewerKey, url, options = {}) {
  const viewer = pdfViewers[viewerKey];
  const lib = getPdfJsLib();
  if (!viewer) return;
  if (!lib) {
    setPdfViewerStatus(viewerKey, 'Visualização indisponível neste navegador.', true);
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
    if (viewer.token !== token) { try { await pdfDoc.destroy(); } catch (_) {} return; }
    viewer.pdfDoc = pdfDoc;
    await renderPdfViewerDocument(viewerKey);
  } catch (error) {
    if (viewer.token !== token) return;
    setPdfViewerStatus(viewerKey, `Não foi possível abrir o PDF (${error?.message || 'erro'}).`, true);
  } finally {
    if (viewer.token === token) viewer.loadingTask = null;
  }
}

async function renderPdfViewerDocument(viewerKey, options = {}) {
  const viewer = pdfViewers[viewerKey];
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

    for (let n = 1; n <= viewer.pdfDoc.numPages; n++) {
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
        if (targetPixels > maxCanvasPixels) outputScale = 1;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { alpha: false });
      canvas.width = Math.floor(renderViewport.width * outputScale);
      canvas.height = Math.floor(renderViewport.height * outputScale);
      canvas.style.width = `${Math.floor(displayViewport.width)}px`;
      canvas.style.height = 'auto';
      dom.pages.appendChild(canvas);

      await page.render({
        canvasContext: ctx,
        viewport: renderViewport,
        transform: outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null,
      }).promise;

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
    setPdfViewerStatus(viewerKey, `Erro ao renderizar PDF (${error?.message || 'falha'}).`, true);
  }
}

function setPdfViewerScale(viewerKey, scale) {
  const viewer = pdfViewers[viewerKey];
  if (!viewer) return;
  const next = Math.max(0.7, Math.min(3, scale));
  if (!Number.isFinite(next)) return;
  if (Math.abs(next - (viewer.scale || 0)) < 0.01) { updatePdfViewerToolbar(viewerKey); return; }
  viewer.scale = next;
  updatePdfViewerToolbar(viewerKey);
  if (viewer.pdfDoc) {
    const center = capturePdfViewerScrollCenter(viewerKey);
    viewer.token += 1;
    renderPdfViewerDocument(viewerKey, { preserveCenter: center });
  }
}

function pdfViewerZoomIn(viewerKey) { setPdfViewerScale(viewerKey, (pdfViewers[viewerKey]?.scale || 1) + 0.15); }
function pdfViewerZoomOut(viewerKey) { setPdfViewerScale(viewerKey, (pdfViewers[viewerKey]?.scale || 1) - 0.15); }
function pdfViewerZoomReset(viewerKey) { setPdfViewerScale(viewerKey, 1); }
function pdfViewerFitWidth(viewerKey) { setPdfViewerScale(viewerKey, 1); }

// ── PDF MODAL GESTURES ─────────────────────────────────────────

function getTouchDistance(t1, t2) {
  const dx = t2.clientX - t1.clientX;
  const dy = t2.clientY - t1.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

function getViewerKeyFromPdfWrap(wrap) {
  if (!wrap) return null;
  return wrap.classList.contains('pdfjs-canvas-wrap-modal') ? 'modal' : 'inline';
}

function resetPinchPreview(stateForPinch) {
  if (!stateForPinch?.pages) return;
  stateForPinch.pages.style.transform = '';
  stateForPinch.pages.style.transformOrigin = '';
  stateForPinch.pages.style.willChange = '';
}

function initPdfModalGestures() {
  if (pdfModalGesturesBound || !isIOSMobile()) return;
  const modal = document.getElementById('pdf-modal');
  const panel = document.getElementById('pdf-modal-panel');
  if (!modal || !panel) return;

  let touchState = null;
  panel.addEventListener('touchstart', (e) => {
    if (!isPdfModalOpen() || !e.touches || e.touches.length !== 1) return;
    const t = e.touches[0];
    touchState = { startX: t.clientX, startY: t.clientY, lastX: t.clientX, lastY: t.clientY, fromLeftEdge: t.clientX <= 24 };
  }, { passive: true });

  panel.addEventListener('touchmove', (e) => {
    if (!touchState || !e.touches || e.touches.length !== 1) return;
    touchState.lastX = e.touches[0].clientX;
    touchState.lastY = e.touches[0].clientY;
  }, { passive: true });

  panel.addEventListener('touchend', () => {
    if (!touchState || !isPdfModalOpen()) { touchState = null; return; }
    const dx = touchState.lastX - touchState.startX;
    const dy = Math.abs(touchState.lastY - touchState.startY);
    const shouldClose = touchState.fromLeftEdge && dx > 72 && dx > dy * 1.25;
    touchState = null;
    if (shouldClose) closePdfModal();
  }, { passive: true });

  panel.addEventListener('touchcancel', () => { touchState = null; }, { passive: true });
  pdfModalGesturesBound = true;
}

function initPdfPinchGestures() {
  if (pdfPinchGesturesBound) return;

  document.addEventListener('touchstart', (e) => {
    if (window.innerWidth >= 768 || !e.touches || e.touches.length !== 2) return;
    const wrap = e.target?.closest?.('.pdfjs-canvas-wrap');
    if (!wrap) return;
    const viewerKey = getViewerKeyFromPdfWrap(wrap);
    const viewer = viewerKey ? pdfViewers[viewerKey] : null;
    const dom = viewerKey ? getPdfViewerDom(viewerKey) : null;
    if (!viewer || !viewer.pdfDoc || !dom?.pages) return;

    const startDistance = getTouchDistance(e.touches[0], e.touches[1]);
    if (!Number.isFinite(startDistance) || startDistance <= 0) return;

    pdfPinchState = { viewerKey, pages: dom.pages, startDistance, startScale: viewer.scale || 1, nextScale: viewer.scale || 1 };
    dom.pages.style.transformOrigin = 'center top';
    dom.pages.style.willChange = 'transform';
    e.preventDefault();
  }, { passive: false });

  document.addEventListener('touchmove', (e) => {
    if (!pdfPinchState || !e.touches || e.touches.length < 2) return;
    const currentDistance = getTouchDistance(e.touches[0], e.touches[1]);
    if (!Number.isFinite(currentDistance) || currentDistance <= 0) return;
    const nextScale = Math.max(0.7, Math.min(3, pdfPinchState.startScale * (currentDistance / pdfPinchState.startDistance)));
    pdfPinchState.nextScale = nextScale;
    pdfPinchState.pages.style.transform = `scale(${nextScale / pdfPinchState.startScale})`;
    const dom = getPdfViewerDom(pdfPinchState.viewerKey);
    if (dom?.zoomLabel) dom.zoomLabel.textContent = `${Math.round(nextScale * 100)}%`;
    e.preventDefault();
  }, { passive: false });

  const finishPinch = () => {
    if (!pdfPinchState) return;
    const { viewerKey, nextScale } = pdfPinchState;
    resetPinchPreview(pdfPinchState);
    pdfPinchState = null;
    setPdfViewerScale(viewerKey, nextScale);
  };

  document.addEventListener('touchend', (e) => { if (!pdfPinchState || e.touches?.length >= 2) return; finishPinch(); }, { passive: true });
  document.addEventListener('touchcancel', () => { finishPinch(); }, { passive: true });
  pdfPinchGesturesBound = true;
}

// ── PDF PANEL/MODAL ───────────────────────────────────────────

function openPdfPanel(url, label, panelType = 'pdf') {
  if (window.innerWidth < 768) {
    if (panelType === 'link') { window.open(url, '_blank'); return; }
    openPdfModal(url, label);
    return;
  }
  const frame = document.getElementById('pdf-frame');
  const panel = document.getElementById('pdf-panel');
  if (!frame || !panel) return;
  if (label) document.getElementById('pdf-panel-title').textContent = getPanelIconByLabel(label) + ' ' + label;
  frame.src = url;
  panel.classList.add('open');
}

function closePdfPanel() {
  const panel = document.getElementById('pdf-panel');
  if (!panel) return;
  panel.classList.remove('open');
  closePdfModal();
  setTimeout(() => { const f = document.getElementById('pdf-frame'); if (f) f.src = ''; }, 300);
}

function openPdfModal(url, label) {
  const modal = document.getElementById('pdf-modal');
  if (!modal) return;
  if (label) {
    const t = document.getElementById('pdf-modal-title');
    if (t) t.textContent = getPanelIconByLabel(label) + ' ' + label;
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
  const modal = document.getElementById('pdf-modal');
  if (!modal) return;
  if (!options.fromPopstate && pdfModalHistoryActive) {
    ignoreNextModalPopstate = true;
    window.history.back();
  }
  modal.classList.remove('open');
  document.body.classList.remove('pdf-modal-open');
  destroyPdfViewerSession('modal');
  pdfModalHistoryActive = false;
}

function closePdfModalOverlay(e) {
  if (e.target === document.getElementById('pdf-modal')) closePdfModal();
}

// ── INTRO MODAL ───────────────────────────────────────────────

function openIntro() {
  document.getElementById('intro-modal')?.classList.add('open');
}

function closeIntro() {
  document.getElementById('intro-modal')?.classList.remove('open');
}

function closeIntroOverlay(e) {
  if (e.target === document.getElementById('intro-modal')) closeIntro();
}

// ── KEYBOARD SHORTCUTS ────────────────────────────────────────

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closePdfPanel(); closePdfModal(); closeIntro(); closeBooks(); }
});

// ── POPSTATE ──────────────────────────────────────────────────

window.addEventListener('popstate', () => {
  if (ignoreNextModalPopstate) { ignoreNextModalPopstate = false; return; }
  if (isPdfModalOpen()) closePdfModal({ fromPopstate: true });
});

// ── PDF FALLBACK (capítulo sem transcrição) ───────────────────

/**
 * No mobile, troca o iframe pelo pdf.js viewer; no desktop mantém o iframe.
 * Chamado no init quando pageData.isPdfFallback === true.
 */
function initPdfFallback() {
  if (!pageData.isPdfFallback) return;
  const activeUrl = pageData.pdfUrl;
  if (window.innerWidth < 768) {
    const frame = document.getElementById('chapter-pdf-fallback-frame');
    const toolbar = document.getElementById('chapter-pdf-toolbar');
    const wrap = document.querySelector('.pdfjs-canvas-wrap');
    if (frame) frame.style.display = 'none';
    if (toolbar) toolbar.style.display = '';
    if (wrap) wrap.style.display = '';
    loadPdfInViewer('inline', activeUrl, { scale: 1 });
  }
}

/**
 * Alterna entre PDF 1950 e PDF original no fallback inline.
 * Chamado pelos botões "Ver PDF 1950" / "Ver PDF original".
 */
function switchInlinePdfFallback(type) {
  const nextUrl = type === 'original' ? pageData.pdfOldUrl : pageData.pdfUrl;
  if (!nextUrl) return;

  const frame = document.getElementById('chapter-pdf-fallback-frame');
  if (frame && frame.style.display !== 'none') {
    frame.src = nextUrl;
  } else {
    loadPdfInViewer('inline', nextUrl, { scale: 1 });
  }

  document.querySelectorAll('.inline-pdf-toggle').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.pdfType === type);
  });
}

// ── EXPOSE ON WINDOW ──────────────────────────────────────────

window.toggleDarkMode = toggleDarkMode;
window.openBooks = openBooks;
window.closeBooks = closeBooks;
window.closeBooksOverlay = closeBooksOverlay;
window.togglePopup = togglePopup;
window.closePopup = closePopup;
window.onVerseNumberClick = onVerseNumberClick;
window.onEditionChange = onEditionChange;
window.onCompareSelectChange = onCompareSelectChange;
window.onCompareEditionChange = onCompareEditionChange;
window.openPdfPanel = openPdfPanel;
window.closePdfPanel = closePdfPanel;
window.openPdfModal = openPdfModal;
window.closePdfModal = closePdfModal;
window.closePdfModalOverlay = closePdfModalOverlay;
window.pdfViewerZoomIn = pdfViewerZoomIn;
window.pdfViewerZoomOut = pdfViewerZoomOut;
window.pdfViewerZoomReset = pdfViewerZoomReset;
window.pdfViewerFitWidth = pdfViewerFitWidth;
window.openIntro = openIntro;
window.closeIntro = closeIntro;
window.closeIntroOverlay = closeIntroOverlay;
window.switchInlinePdfFallback = switchInlinePdfFallback;

// ── INIT ──────────────────────────────────────────────────────

initTheme();
initReviewPopup();
initInstallPopup();
initPdfModalGestures();
initPdfPinchGestures();
initPdfFallback();
saveNavigationToStorage();
registerPwaServiceWorker();
