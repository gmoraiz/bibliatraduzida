import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (question) => new Promise((resolve) => rl.question(question, resolve));

const ACOES = [
  { label: 'Remover página inicial', value: 'remover-inicio' },
  { label: 'Remover página final',   value: 'remover-fim'    },
];

const EDICOES = ['figueiredo', 'figueiredo-original'];

async function askEdicao() {
  console.log('\nEdições disponíveis:\n');
  EDICOES.forEach((nome, i) => console.log(`  ${i + 1}. ${nome}`));
  console.log();

  const answer = await ask('Escolha a edição: ');
  const num = parseInt(answer, 10);
  if (isNaN(num) || num < 1 || num > EDICOES.length) {
    console.error(`Opção inválida. Escolha entre 1 e ${EDICOES.length}.`);
    return askEdicao();
  }
  return EDICOES[num - 1];
}

async function askLivro() {
  const answer = await ask('Livro (slug, ex: oseias): ');
  const livro = answer.trim();
  if (!livro) {
    console.error('Nome do livro não pode ser vazio.');
    return askLivro();
  }
  return livro;
}

async function askCapitulo() {
  const answer = await ask('Capítulo (número ou "introducao"): ');
  const val = answer.trim();
  if (!val) {
    console.error('Valor não pode ser vazio.');
    return askCapitulo();
  }
  if (val === 'introducao') return val;
  const num = parseInt(val, 10);
  if (isNaN(num) || num < 1) {
    console.error('Digite um número de capítulo válido (>= 1) ou "introducao".');
    return askCapitulo();
  }
  return String(num);
}

async function askFilePath() {
  const edicao = await askEdicao();
  const livro = await askLivro();
  const capitulo = await askCapitulo();

  const filePath = path.join(__dirname, 'edicoes', edicao, livro, `${capitulo}.pdf`);

  if (!fs.existsSync(filePath)) {
    console.error(`\nArquivo não encontrado: ${filePath}`);
    console.log('Verifique a edição, o livro e o capítulo e tente novamente.\n');
    return askFilePath();
  }

  console.log(`\nArquivo: ${filePath}`);
  return filePath;
}

async function askAcao() {
  console.log('\nAções disponíveis:\n');
  ACOES.forEach(({ label }, i) => {
    console.log(`  ${i + 1}. ${label}`);
  });
  console.log();

  const answer = await ask('Escolha a ação: ');
  const num = parseInt(answer, 10);
  if (isNaN(num) || num < 1 || num > ACOES.length) {
    console.error(`Opção inválida. Escolha entre 1 e ${ACOES.length}.`);
    return askAcao();
  }
  return ACOES[num - 1];
}

async function main() {
  const filePath = await askFilePath();
  const acao = await askAcao();

  rl.close();

  console.log(`\nLendo "${filePath}"...`);
  const srcBytes = fs.readFileSync(filePath);
  const srcDoc = await PDFDocument.load(srcBytes);
  const totalPages = srcDoc.getPageCount();
  console.log(`Total de páginas: ${totalPages}`);

  if (totalPages < 2) {
    console.error('O PDF precisa ter ao menos 2 páginas para que uma possa ser removida.');
    process.exit(1);
  }

  if (acao.value === 'remover-inicio') {
    srcDoc.removePage(0);
    console.log(`  ✓ Página inicial (pág. 1) removida. Restam ${totalPages - 1} página(s).`);
  } else if (acao.value === 'remover-fim') {
    srcDoc.removePage(totalPages - 1);
    console.log(`  ✓ Página final (pág. ${totalPages}) removida. Restam ${totalPages - 1} página(s).`);
  }

  const destBytes = await srcDoc.save();
  fs.writeFileSync(filePath, destBytes);

  console.log(`\nConcluído. Arquivo substituído: ${filePath}`);
}

main().catch((err) => {
  console.error('Erro:', err.message);
  rl.close();
  process.exit(1);
});
