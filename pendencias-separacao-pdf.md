# Pendências — Separação de PDFs por capítulo (prompt antigo)

PDFs gerados **antes de 18/04/2026**, quando o prompt do agente Separador PDF Capítulos ainda era inferior.
Todos estes recortes devem ser **reprocessados** com o agente atual para garantir qualidade.

Total: **1.578 arquivos** distribuídos em livros abaixo.

---

## edicoes/figueiredo

| Livro | Capítulos/arquivos a reprocessar |
|---|---|
| **1-corintios** | 1–16, index, introducao |
| **1-joao** | 1–5, index, introducao |
| **1-pedro** | 1–5, index, introducao |
| **1-tessalonicenses** | 1–5, index, introducao |
| **1-timoteo** | 1–6, index, introducao |
| **2-corintios** | 1–13, index, introducao |
| **2-joao** | 1, index, introducao |
| **2-pedro** | 1–3, index, introducao |
| **2-tessalonicenses** | 1–3, index, introducao |
| **2-timoteo** | 1–4, index, introducao |
| **3-joao** | 1, index |
| **apocalipse** | 1–14, index, introducao |
| **atos-dos-apostolos** | 1–28, index |
| **colossenses** | 1–4, index, introducao |
| **deuteronomio** | 1–34 |
| **efesios** | 1–6, index, introducao |
| **exodo** | 1–40 |
| **filemon** | 1, index, introducao |
| **filipenses** | 1–4, index, introducao |
| **galatas** | 1–6, index, introducao |
| **genesis** | 1–50 |
| **hebreus** | 1–13, index, introducao |
| **judas** | 1, index, introducao |
| **levitico** | 1–27 |
| **numeros** | 1–36 |
| **proverbios** | 1–31 |
| **romanos** | 1–16, index |
| **salmos** | 2, 3, 5, 7, 8, 10, 11, 16–21, 23–31, 33–36, 38–40, 42–44, 47, 49, 51, 53–58, 60, 62, 66–70, 72, 74–75, 77, 79–81, 84–93, 95–96, 100–108, 110, 112–114, 116–117, 119–122, 129, 131–132, 135–140, 142, 144–145, 147–150, salmos-1-a-67, salmos-68-a-150 |
| **tiago** | 1–5, index, introducao |
| **tito** | 1–3, index, introducao |

---

## edicoes/figueiredo-original

| Livro | Capítulos/arquivos a reprocessar |
|---|---|
| **1-corintios** | 1–16, index |
| **1-joao** | 1–5, index |
| **1-macabeus** | 1–16 |
| **1-pedro** | 1–5, index |
| **1-reis** | 1–22 |
| **1-tessalonicenses** | 1–5, index |
| **1-timoteo** | 1–6, index |
| **2-corintios** | 1–13, index |
| **2-joao** | 1, index |
| **2-macabeus** | 1–15 |
| **2-pedro** | 1–3, index |
| **2-reis** | 4 *(apenas este capítulo)* |
| **2-tessalonicenses** | 1–3, index |
| **2-timoteo** | 1–4, index |
| **3-joao** | 1, index |
| **abdias** | 1 |
| **amos** | 1–9 |
| **apocalipse** | 1–22, index |
| **atos-dos-apostolos** | 1–28, index |
| **cantico-dos-canticos** | 1–8 |
| **colossenses** | 1–4, index |
| **deuteronomio** | 1–34 |
| **eclesiastes** | 1–12 |
| **eclesiastico** | 41, 47 *(apenas estes dois capítulos)* |
| **efesios** | 4, index *(apenas estes dois arquivos)* |
| **esdras** | 4 *(apenas este capítulo)* |
| **ester** | 1–16 |
| **exodo** | 1–40 |
| **filemon** | 1, index |
| **filipenses** | 1–4, index |
| **galatas** | 1–6, index |
| **genesis** | 1–50 |
| **hebreus** | 7, 11, index *(apenas estes três arquivos)* |
| **jeremias** | 1–52 |
| **jo** | 1–42 |
| **joao** | 1–21 |
| **joel** | 1–3 |
| **josue** | 1–24 |
| **judas** | 1, index |
| **judite** | 1–16 |
| **juizes** | 1–21 |
| **levitico** | 1–27 |
| **neemias** | 1–13 |
| **numeros** | 1–36 |
| **oseias** | 1–14 |
| **proverbios** | 1–31 |
| **romanos** | 1–16, index |
| **rute** | 1–4 |
| **sabedoria** | 1–19 |
| **salmos** | 1–92, 94–150, salmos-1-a-67, salmos-68-a-150 *(salmo 93 ausente — verificar)* |
| **tiago** | 1–5, index |
| **tito** | 1–3, index |
| **tobias** | 1–14 |

---

## Revisão detalhada dos evangelistas — edicoes/figueiredo (19/04/2026)

> ⚠️ Os PDFs fonte `.pdfs/figueiredo/{mateus,marcos,lucas,joao}.pdf` **não existem**. Os capítulos abaixo **não podem ser reprocessados** até que os PDFs fonte sejam adicionados.

| Evangelho | Resultado | Observações |
|-----------|-----------|-------------|
| **marcos** | ✅ Reprocessado 19/04 | 16 caps + `introducao.pdf` (págs. 1–6) |
| **lucas** | ✅ Reprocessado 19/04 | 24 caps + `introducao.pdf` (págs. 1–6) — problema anterior de intro ausente corrigido |
| **mateus** | ✅ Reprocessado 19/04 | 28 caps + `introducao.pdf` (págs. 1–6) — overlap cosmético do cap 2 corrigido |
| **joao** | ✅ Reprocessado 19/04 | 21 caps + `introducao.pdf` — 4 bugs (caps 7, 11, 12, 14) corrigidos |

---

## Notas para o agente

- Para cada livro, apagar os PDFs existentes na pasta antes de rodar o `extrair-capitulos.js` novamente.
- O PDF fonte está sempre em `.pdfs/figueiredo/<livro>.pdf` (para `edicoes/figueiredo`) ou `.pdfs/figueiredo-original/<livro>.pdf` (para `edicoes/figueiredo-original`).
- Os casos com apenas alguns capítulos isolados (eclesiastico: 41, 47; efesios: 4; esdras: 4; hebreus: 7, 11; 2-reis: 4) provavelmente são resquícios de runs parciais — reprocessar o livro inteiro.
- salmos/figueiredo: os capítulos ausentes (1, 4, 6, 9, 12–15, 22, 32, 37, 41, 45–46, 48, 50, 52, 59, 61, 63–65, 71, 73, 76, 78, 82–83, 94, 97–99, 109, 111, 115, 118, 123–128, 130, 133–134, 141, 143, 146) foram gerados após 18/04 e portanto já têm boa qualidade — não precisam ser refeitos.
