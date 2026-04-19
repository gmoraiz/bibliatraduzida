/**
 * Renders chapter verses as HTML string (mirrors app.js renderChapter logic).
 */
export function renderChapterHtml(chapterData, prefix = 'main') {
  if (!chapterData || !chapterData.versiculos) return '';

  const notas = chapterData.notas || {};
  const notaKeys = chapterData.versiculos
    .map(v => v.nota)
    .filter((k, i, arr) => k && notas[k] && arr.indexOf(k) === i);

  const verses = chapterData.versiculos.filter(item => item.tipo !== 'bio');
  const bios   = chapterData.versiculos.filter(item => item.tipo === 'bio');
  const ordered = [...verses, ...bios];

  const lines = ordered.map(item => {
    if (item.tipo === 'bio') {
      return `<div class="bio"><div class="bio-title">${escapeHtmlAttr(item.titulo)}</div><p>${item.texto}</p></div>`;
    }
    let fnHtml = '';
    if (item.nota && notas[item.nota]) {
      const nota = notas[item.nota];
      const fnNum = notaKeys.indexOf(item.nota) + 1;
      const popupId = `popup_${prefix}_${item.nota}`;
      fnHtml = `<sup class="fnref" onclick="togglePopup(event,'${popupId}')">[${fnNum}]<span class="fn-popup" id="${popupId}"><button class="fn-close" onclick="closePopup(event)">✕</button><span class="fn-label">${nota.rotulo}</span> — <span>${nota.texto}</span></span></sup>`;
    }
    const vnumLabel = item.n === 0 ? '' : item.n;
    return `<p class="verse" id="v-${item.n}" data-v="${item.n}"><span class="vnum"><a href="#v${item.n}" name="v${item.n}" onclick="onVerseNumberClick(event,${item.n});return false;">${vnumLabel}</a></span>${item.texto}${fnHtml}</p>`;
  });

  return lines.join('\n');
}

function escapeHtmlAttr(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
