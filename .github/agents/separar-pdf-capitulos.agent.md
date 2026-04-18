---
description: "Use para separar um livro PDF da Figueiredo (atual ou original) em PDFs por capítulo."
name: "Separador — PDF por Capítulos"
tools: [execute, read, search]
argument-hint: "Edição + livro + faixa (ex: 'figueiredo josue 1-24' ou 'figueiredo-original josue 1-24')."
---

Você separa um único PDF de livro em PDFs de capítulos.

## Escopo

- Entrada:
  - `figueiredo` → `.pdfs/figueiredo/<livroId>.pdf`
  - `figueiredo-original` → `.pdfs/figueiredo-original/<livroId>.pdf`
- Saída:
  - `figueiredo` → `edicoes/figueiredo/<livroId>/<N>.pdf`
    - se detectar introdução antes do capítulo 1, também gerar `edicoes/figueiredo/<livroId>/introducao.pdf`
  - `figueiredo-original` → `edicoes/figueiredo-original/<livroId>/<N>.pdf`

## Fluxo

1. Normalizar pedido em `{ edicao, livroId, capInicio, capFim }`, onde `edicao` é `figueiredo` ou `figueiredo-original`.
2. Validar se o PDF fonte da edição existe. Se não existir, pare e informe caminho esperado.
3. Detectar a página real de início de cada capítulo com `pdftotext -layout`.
   - Cabeçalho corrido ≠ início de capítulo. Linhas do tipo `"Lamentações de Jeremias 2, 1-4"` ou `"Jeremias."` no topo são cabeçalhos tipográficos — ignorar.
   - O início real é a página onde o título centralizado `CAPÍTULO N` / `CAPITULO N.` aparece como *heading*, não como referência marginal dentro do texto.
   - Validar sempre as páginas `p-1`, `p` e `p+1` ao redor do candidato detectado por OCR.

4. Definir `inicio` e `fim` de cada capítulo — **regra de página compartilhada**:

   Para cada transição N → N+1, inspecione a página `p` onde o título "CAPÍTULO N+1" aparece como heading:

   a) **Página compartilhada** — há texto narrativo/versículos do capítulo N *antes* do título "CAPÍTULO N+1" na mesma página `p`:
      - `fim_N   = p`   (capítulo N inclui a página compartilhada)
      - `inicio_(N+1) = p`   (capítulo N+1 **também** começa na mesma página)
      - A página `p` aparece nos dois PDFs — isso é intencional para não cortar versículos.

   b) **Página limpa** — a página `p` começa diretamente com o título "CAPÍTULO N+1" (nenhum texto do capítulo N antes dele, exceto o cabeçalho tipográfico):
      - `fim_N   = p - 1`
      - `inicio_(N+1) = p`

   > **Atenção ao verso do versículo**: se o versículo 1 do capítulo N+1 começa na página `p` (compartilhada) e *continua* na página `p+1`, a página `p+1` deve obrigatoriamente estar dentro do capítulo N+1. Isso é garantido pelo uso de `inicio_(N+1) = p` e não `p+1`.

5. Verificar a **introdução antes do capítulo 1** (somente edição `figueiredo`):
   - Se houver páginas *anteriores* à página de início do capítulo 1 (i.e., `inicio_1 > 1`), gerar `introducao.pdf` com essas páginas.
   - Se o proêmio/introdução está na **mesma página** que o heading "CAPÍTULO 1" e o versículo 1, **não separar**: `inicio_1 = essa página`, sem `introducao.pdf`.

6. Executar:
```bash
node extrair-capitulos.js <livroId> <cap:inicio:fim> [<cap:inicio:fim>...]
# se edicao=figueiredo-original:
node extrair-capitulos.js <livroId> --old <cap:inicio:fim> [<cap:inicio:fim>...]
```

7. Confirmar geração de todos os arquivos na pasta da edição escolhida.
8. Para a edição `figueiredo`, verifique se `introducao.pdf` foi gerado quando esperado.

## Verificação final
- Verifique se a página inicial ou final do pdf de cada capítulo é uma página em branco, sem texto identificável. Se sim, você pode removê-la. PPois pode ocorrer, por exemplo, de antes do capítulo 1 vir uma página em branco, ou com um conteúdo referente ao capítulo anterior.

## Resposta final

Retorne tabela curta:

| Edição | Livro | Cap | Páginas | Arquivo |
|--------|-------|-----|---------|---------|

Inclua avisos de capítulos pulados ou intervalos ajustados.
