#!/usr/bin/env python3
"""
Extrai a traducao Douay-Rheims (Challoner) do Wikisource para:
  edicoes/douay-rheims/<livro>/index.json
  edicoes/douay-rheims/<livro>/<N>.json

Regras principais:
- Se <N>.json ja existe, nao sobrescreve (a menos que force).
- So busca no site quando necessario para preencher livro incompleto
  ou quando force esta ativo.
- Sempre garante o campo tituloIndice no index.json.
- Descobre os slugs dos livros no indice oficial do Wikisource.
- Extrai notas de rodape e vincula aos versiculos via campo nota.
"""

from __future__ import annotations

import html
import json
import re
import sys
import time
from pathlib import Path
from typing import Any
from urllib.error import URLError
from urllib.parse import unquote
from urllib.request import Request, urlopen

INDEX_URL = "https://en.wikisource.org/wiki/Bible_(Douay-Rheims,_Challoner)"
ROOT_DIR = Path(__file__).resolve().parent
DOUAY_DIR = ROOT_DIR / "edicoes" / "douay-rheims"
FIGUEIREDO_DIR = ROOT_DIR / "edicoes" / "figueiredo"


BOOKS: list[dict[str, str]] = [
    {"id": "genesis", "abreviacao": "Gn", "testamento": "Antigo Testamento", "grupo": "Pentateuco"},
    {"id": "exodo", "abreviacao": "Ex", "testamento": "Antigo Testamento", "grupo": "Pentateuco"},
    {"id": "levitico", "abreviacao": "Lv", "testamento": "Antigo Testamento", "grupo": "Pentateuco"},
    {"id": "numeros", "abreviacao": "Nm", "testamento": "Antigo Testamento", "grupo": "Pentateuco"},
    {"id": "deuteronomio", "abreviacao": "Dt", "testamento": "Antigo Testamento", "grupo": "Pentateuco"},
    {"id": "josue", "abreviacao": "Js", "testamento": "Antigo Testamento", "grupo": "Livros Historicos"},
    {"id": "juizes", "abreviacao": "Jz", "testamento": "Antigo Testamento", "grupo": "Livros Historicos"},
    {"id": "rute", "abreviacao": "Rt", "testamento": "Antigo Testamento", "grupo": "Livros Historicos"},
    {"id": "1-samuel", "abreviacao": "1Sm", "testamento": "Antigo Testamento", "grupo": "Livros Historicos"},
    {"id": "2-samuel", "abreviacao": "2Sm", "testamento": "Antigo Testamento", "grupo": "Livros Historicos"},
    {"id": "1-reis", "abreviacao": "1Rs", "testamento": "Antigo Testamento", "grupo": "Livros Historicos"},
    {"id": "2-reis", "abreviacao": "2Rs", "testamento": "Antigo Testamento", "grupo": "Livros Historicos"},
    {"id": "1-cronicas", "abreviacao": "1Cr", "testamento": "Antigo Testamento", "grupo": "Livros Historicos"},
    {"id": "2-cronicas", "abreviacao": "2Cr", "testamento": "Antigo Testamento", "grupo": "Livros Historicos"},
    {"id": "esdras", "abreviacao": "Esd", "testamento": "Antigo Testamento", "grupo": "Livros Historicos"},
    {"id": "neemias", "abreviacao": "Ne", "testamento": "Antigo Testamento", "grupo": "Livros Historicos"},
    {"id": "tobias", "abreviacao": "Tb", "testamento": "Antigo Testamento", "grupo": "Livros Historicos"},
    {"id": "judite", "abreviacao": "Jt", "testamento": "Antigo Testamento", "grupo": "Livros Historicos"},
    {"id": "ester", "abreviacao": "Est", "testamento": "Antigo Testamento", "grupo": "Livros Historicos"},
    {"id": "1-macabeus", "abreviacao": "1Mc", "testamento": "Antigo Testamento", "grupo": "Livros Historicos"},
    {"id": "2-macabeus", "abreviacao": "2Mc", "testamento": "Antigo Testamento", "grupo": "Livros Historicos"},
    {"id": "jo", "abreviacao": "Jo", "testamento": "Antigo Testamento", "grupo": "Poeticos e Sapienciais"},
    {"id": "salmos", "abreviacao": "Sl", "testamento": "Antigo Testamento", "grupo": "Poeticos e Sapienciais"},
    {"id": "proverbios", "abreviacao": "Pr", "testamento": "Antigo Testamento", "grupo": "Poeticos e Sapienciais"},
    {"id": "eclesiastes", "abreviacao": "Ecl", "testamento": "Antigo Testamento", "grupo": "Poeticos e Sapienciais"},
    {"id": "cantico-dos-canticos", "abreviacao": "Ct", "testamento": "Antigo Testamento", "grupo": "Poeticos e Sapienciais"},
    {"id": "sabedoria", "abreviacao": "Sb", "testamento": "Antigo Testamento", "grupo": "Poeticos e Sapienciais"},
    {"id": "eclesiastico", "abreviacao": "Eclo", "testamento": "Antigo Testamento", "grupo": "Poeticos e Sapienciais"},
    {"id": "isaias", "abreviacao": "Is", "testamento": "Antigo Testamento", "grupo": "Profetas Maiores"},
    {"id": "jeremias", "abreviacao": "Jr", "testamento": "Antigo Testamento", "grupo": "Profetas Maiores"},
    {"id": "lamentacoes", "abreviacao": "Lm", "testamento": "Antigo Testamento", "grupo": "Profetas Maiores"},
    {"id": "baruc", "abreviacao": "Br", "testamento": "Antigo Testamento", "grupo": "Profetas Maiores"},
    {"id": "ezequiel", "abreviacao": "Ez", "testamento": "Antigo Testamento", "grupo": "Profetas Maiores"},
    {"id": "daniel", "abreviacao": "Dn", "testamento": "Antigo Testamento", "grupo": "Profetas Maiores"},
    {"id": "oseias", "abreviacao": "Os", "testamento": "Antigo Testamento", "grupo": "Profetas Menores"},
    {"id": "joel", "abreviacao": "Jl", "testamento": "Antigo Testamento", "grupo": "Profetas Menores"},
    {"id": "amos", "abreviacao": "Am", "testamento": "Antigo Testamento", "grupo": "Profetas Menores"},
    {"id": "abdias", "abreviacao": "Ab", "testamento": "Antigo Testamento", "grupo": "Profetas Menores"},
    {"id": "jonas", "abreviacao": "Jn", "testamento": "Antigo Testamento", "grupo": "Profetas Menores"},
    {"id": "miqueias", "abreviacao": "Mq", "testamento": "Antigo Testamento", "grupo": "Profetas Menores"},
    {"id": "naum", "abreviacao": "Na", "testamento": "Antigo Testamento", "grupo": "Profetas Menores"},
    {"id": "habacuc", "abreviacao": "Hb", "testamento": "Antigo Testamento", "grupo": "Profetas Menores"},
    {"id": "sofonias", "abreviacao": "Sf", "testamento": "Antigo Testamento", "grupo": "Profetas Menores"},
    {"id": "ageu", "abreviacao": "Ag", "testamento": "Antigo Testamento", "grupo": "Profetas Menores"},
    {"id": "zacarias", "abreviacao": "Zc", "testamento": "Antigo Testamento", "grupo": "Profetas Menores"},
    {"id": "malaquias", "abreviacao": "Ml", "testamento": "Antigo Testamento", "grupo": "Profetas Menores"},
    {"id": "mateus", "abreviacao": "Mt", "testamento": "Novo Testamento", "grupo": "Evangelhos"},
    {"id": "marcos", "abreviacao": "Mc", "testamento": "Novo Testamento", "grupo": "Evangelhos"},
    {"id": "lucas", "abreviacao": "Lc", "testamento": "Novo Testamento", "grupo": "Evangelhos"},
    {"id": "joao", "abreviacao": "Jo", "testamento": "Novo Testamento", "grupo": "Evangelhos"},
    {"id": "atos-dos-apostolos", "abreviacao": "At", "testamento": "Novo Testamento", "grupo": "Atos"},
    {"id": "romanos", "abreviacao": "Rom", "testamento": "Novo Testamento", "grupo": "Epistolas Paulinas"},
    {"id": "1-corintios", "abreviacao": "1Cor", "testamento": "Novo Testamento", "grupo": "Epistolas Paulinas"},
    {"id": "2-corintios", "abreviacao": "2Cor", "testamento": "Novo Testamento", "grupo": "Epistolas Paulinas"},
    {"id": "galatas", "abreviacao": "Gal", "testamento": "Novo Testamento", "grupo": "Epistolas Paulinas"},
    {"id": "efesios", "abreviacao": "Ef", "testamento": "Novo Testamento", "grupo": "Epistolas Paulinas"},
    {"id": "filipenses", "abreviacao": "Fl", "testamento": "Novo Testamento", "grupo": "Epistolas Paulinas"},
    {"id": "colossenses", "abreviacao": "Cl", "testamento": "Novo Testamento", "grupo": "Epistolas Paulinas"},
    {"id": "1-tessalonicenses", "abreviacao": "1Ts", "testamento": "Novo Testamento", "grupo": "Epistolas Paulinas"},
    {"id": "2-tessalonicenses", "abreviacao": "2Ts", "testamento": "Novo Testamento", "grupo": "Epistolas Paulinas"},
    {"id": "1-timoteo", "abreviacao": "1Tm", "testamento": "Novo Testamento", "grupo": "Epistolas Paulinas"},
    {"id": "2-timoteo", "abreviacao": "2Tm", "testamento": "Novo Testamento", "grupo": "Epistolas Paulinas"},
    {"id": "tito", "abreviacao": "Tt", "testamento": "Novo Testamento", "grupo": "Epistolas Paulinas"},
    {"id": "filemon", "abreviacao": "Fm", "testamento": "Novo Testamento", "grupo": "Epistolas Paulinas"},
    {"id": "hebreus", "abreviacao": "Hb", "testamento": "Novo Testamento", "grupo": "Epistolas Paulinas"},
    {"id": "tiago", "abreviacao": "Tg", "testamento": "Novo Testamento", "grupo": "Epistolas Catolicas"},
    {"id": "1-pedro", "abreviacao": "1Pd", "testamento": "Novo Testamento", "grupo": "Epistolas Catolicas"},
    {"id": "2-pedro", "abreviacao": "2Pd", "testamento": "Novo Testamento", "grupo": "Epistolas Catolicas"},
    {"id": "1-joao", "abreviacao": "1Jo", "testamento": "Novo Testamento", "grupo": "Epistolas Catolicas"},
    {"id": "2-joao", "abreviacao": "2Jo", "testamento": "Novo Testamento", "grupo": "Epistolas Catolicas"},
    {"id": "3-joao", "abreviacao": "3Jo", "testamento": "Novo Testamento", "grupo": "Epistolas Catolicas"},
    {"id": "judas", "abreviacao": "Jd", "testamento": "Novo Testamento", "grupo": "Epistolas Catolicas"},
    {"id": "apocalipse", "abreviacao": "Ap", "testamento": "Novo Testamento", "grupo": "Apocalipse"},
]


BOOK_SLUG_ALIASES: dict[str, list[str]] = {
    "genesis": ["Genesis"],
    "exodo": ["Exodus"],
    "levitico": ["Leviticus"],
    "numeros": ["Numbers"],
    "deuteronomio": ["Deuteronomy"],
    "josue": ["Josue", "Joshua"],
    "juizes": ["Judges"],
    "rute": ["Ruth"],
    "1-samuel": ["1_Kings", "1_Samuel"],
    "2-samuel": ["2_Kings", "2_Samuel"],
    "1-reis": ["3_Kings", "1_Kings"],
    "2-reis": ["4_Kings", "2_Kings"],
    "1-cronicas": ["1_Paralipomenon", "1_Chronicles"],
    "2-cronicas": ["2_Paralipomenon", "2_Chronicles"],
    "esdras": ["1_Esdras", "Ezra"],
    "neemias": ["2_Esdras", "Nehemiah"],
    "tobias": ["Tobias", "Tobit"],
    "judite": ["Judith"],
    "ester": ["Esther"],
    "1-macabeus": ["1_Machabees", "1_Maccabees"],
    "2-macabeus": ["2_Machabees", "2_Maccabees"],
    "jo": ["Job"],
    "salmos": ["Psalms"],
    "proverbios": ["Proverbs"],
    "eclesiastes": ["Ecclesiastes"],
    "cantico-dos-canticos": ["Canticle_of_Canticles", "Song_of_Solomon"],
    "sabedoria": ["Wisdom", "Wisdom_of_Solomon"],
    "eclesiastico": ["Ecclesiasticus"],
    "isaias": ["Isaias", "Isaiah"],
    "jeremias": ["Jeremias", "Jeremiah"],
    "lamentacoes": ["Lamentations"],
    "baruc": ["Barruch", "Baruch"],
    "ezequiel": ["Ezechiel", "Ezekiel"],
    "daniel": ["Daniel"],
    "oseias": ["Osee", "Hosea"],
    "joel": ["Joel"],
    "amos": ["Amos"],
    "abdias": ["Abdias", "Obadiah"],
    "jonas": ["Jonas", "Jonah"],
    "miqueias": ["Micheas", "Micah"],
    "naum": ["Nahum"],
    "habacuc": ["Habacuc", "Habakkuk"],
    "sofonias": ["Sophonias", "Zephaniah"],
    "ageu": ["Aggeus", "Haggai"],
    "zacarias": ["Zacharias", "Zechariah"],
    "malaquias": ["Malachias", "Malachi"],
    "mateus": ["Matthew"],
    "marcos": ["Mark"],
    "lucas": ["Luke"],
    "joao": ["John"],
    "atos-dos-apostolos": ["Acts"],
    "romanos": ["Romans"],
    "1-corintios": ["1_Corinthians"],
    "2-corintios": ["2_Corinthians"],
    "galatas": ["Galatians"],
    "efesios": ["Ephesians"],
    "filipenses": ["Philippians"],
    "colossenses": ["Colossians"],
    "1-tessalonicenses": ["1_Thessalonians"],
    "2-tessalonicenses": ["2_Thessalonians"],
    "1-timoteo": ["1_Timothy"],
    "2-timoteo": ["2_Timothy"],
    "tito": ["Titus"],
    "filemon": ["Philemon"],
    "hebreus": ["Hebrews"],
    "tiago": ["James"],
    "1-pedro": ["1_Peter"],
    "2-pedro": ["2_Peter"],
    "1-joao": ["1_John"],
    "2-joao": ["2_John"],
    "3-joao": ["3_John"],
    "judas": ["Jude"],
    "apocalipse": ["Apocalypse", "Revelation"],
}


def parse_args() -> tuple[bool, set[str]]:
    force = False
    requested_books: set[str] = set()
    for arg in sys.argv[1:]:
        token = arg.strip().lower()
        if token in {"force", "--force", "-f"}:
            force = True
            continue
        requested_books.add(token)
    return force, requested_books


def fetch(url: str, retries: int = 3) -> str:
    headers = {
        "User-Agent": "DouayScraperBot/1.0 (educational use)",
        "Accept": "text/html,application/xhtml+xml",
    }
    for attempt in range(1, retries + 1):
        try:
            req = Request(url, headers=headers)
            with urlopen(req, timeout=30) as response:
                return response.read().decode("utf-8", errors="replace")
        except URLError as err:
            if attempt == retries:
                raise RuntimeError(f"falha ao buscar {url}: {err}") from err
            time.sleep(attempt * 2)
    raise RuntimeError(f"falha ao buscar {url}")


def clean_text(value: str) -> str:
    text = re.sub(r"<style[^>]*>.*?</style>", " ", value, flags=re.DOTALL | re.IGNORECASE)
    text = re.sub(r"<[^>]+>", "", text)
    text = html.unescape(text)
    text = text.replace("\xa0", " ")
    text = re.sub(r"\s+", " ", text).strip()
    return text


def collapse_spaces(value: str) -> str:
    return re.sub(r"\s{2,}", " ", value).strip()


def title_from_id(book_id: str) -> str:
    words = book_id.replace("-", " ").split()
    lowercase_words = {"de", "do", "da", "dos", "das", "e"}
    out: list[str] = []
    for i, word in enumerate(words):
        if i > 0 and word in lowercase_words:
            out.append(word)
        else:
            out.append(word[:1].upper() + word[1:])
    return " ".join(out)


def read_json(path: Path) -> dict[str, Any] | None:
    if not path.exists():
        return None
    with path.open("r", encoding="utf-8") as f:
        data = json.load(f)
    if not isinstance(data, dict):
        return None
    return data


def write_json(path: Path, data: dict[str, Any]) -> None:
    with path.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")


def json_equal(a: dict[str, Any], b: dict[str, Any]) -> bool:
    return json.dumps(a, ensure_ascii=False, sort_keys=True) == json.dumps(b, ensure_ascii=False, sort_keys=True)


def chapter_files(book_dir: Path) -> dict[int, Path]:
    files: dict[int, Path] = {}
    if not book_dir.exists():
        return files
    for item in book_dir.iterdir():
        if item.name == "index.json" or item.suffix.lower() != ".json":
            continue
        if not item.stem.isdigit():
            continue
        files[int(item.stem)] = item
    return files


def merge_group(fig_group: str | None, fallback_group: str) -> str:
    if not fig_group:
        return fallback_group
    return fig_group


def merge_testament(fig_testament: str | None, fallback_testament: str) -> str:
    if not fig_testament:
        return fallback_testament
    return fig_testament


def parse_book_links(index_html: str) -> dict[str, str]:
    pattern = re.compile(
        r'<a[^>]+href="/wiki/Bible_\(Douay-Rheims,_Challoner\)/([^"#?]+)"[^>]*>(.*?)</a>',
        re.IGNORECASE | re.DOTALL,
    )
    out: dict[str, str] = {}
    for match in pattern.finditer(index_html):
        slug = unquote(match.group(1)).strip()
        if not slug or ":" in slug or "/" in slug:
            continue
        label = clean_text(match.group(2))
        out.setdefault(slug, label)
    return out


def resolve_slug(book_id: str, available_slugs: dict[str, str]) -> str:
    aliases = BOOK_SLUG_ALIASES.get(book_id, [])
    for alias in aliases:
        if alias in available_slugs:
            return alias
    raise RuntimeError(f"slug nao encontrado no indice para o livro {book_id}")


def extract_heading_title(page_html: str, fallback: str) -> str:
    heading_match = re.search(r'<h1[^>]*id="firstHeading"[^>]*>(.*?)</h1>', page_html, re.DOTALL | re.IGNORECASE)
    if not heading_match:
        return fallback
    text = clean_text(heading_match.group(1))
    if "/" in text:
        text = text.split("/")[-1].strip()
    return text or fallback


def extract_footnotes(page_html: str) -> dict[int, str]:
    notes: dict[int, str] = {}

    # Formato endnote classico (ex.: Genesis):
    # <p>1 ... <cite id="endnote_1">...</cite> ... texto da nota</p>
    for p_html in re.findall(r"<p[^>]*>(.*?)</p>", page_html, flags=re.DOTALL | re.IGNORECASE):
        p_no_style = re.sub(r"<style[^>]*>.*?</style>", " ", p_html, flags=re.DOTALL | re.IGNORECASE)
        num_match = re.search(r'id="endnote(?:_|&#95;)(\d+)"', p_no_style, flags=re.IGNORECASE)
        if not num_match:
            continue

        num = int(num_match.group(1))
        text_no_cite = re.sub(r"<cite[^>]*>.*?</cite>", " ", p_no_style, flags=re.DOTALL | re.IGNORECASE)
        text = clean_text(text_no_cite)
        text = re.sub(rf"^{num}\s*", "", text)
        text = text.lstrip("↑ ").strip()
        if text:
            notes[num] = text

    # Alguns livros (ex.: Mateus 5/6) usam bloco de referencias no padrao cite_note.
    for match in re.finditer(
        r'<li[^>]*id="cite(?:_|&#95;)?note-(\d+)"[^>]*>(.*?)</li>',
        page_html,
        flags=re.DOTALL | re.IGNORECASE,
    ):
        num = int(match.group(1))
        body_html = match.group(2)
        body_html = re.sub(
            r'<span[^>]*class="[^"]*mw-cite-backlink[^"]*"[^>]*>.*?</span>',
            " ",
            body_html,
            flags=re.DOTALL | re.IGNORECASE,
        )
        body_html = re.sub(
            r'<a[^>]*href="#cite_ref-[^"]+"[^>]*>.*?</a>',
            " ",
            body_html,
            flags=re.DOTALL | re.IGNORECASE,
        )
        text = clean_text(body_html)
        if text:
            notes.setdefault(num, text)

    return notes


def mark_footnote_refs(paragraph_html: str) -> str:
    def _replace_ref(match: re.Match[str]) -> str:
        n = match.group(1) or match.group(2)
        return f"[[FNREF:{n}]]"

    return re.sub(
        r'<sup[^>]*(?:class="[^"]*(?:wst-ref|reference)[^"]*"|id="(?:ref|cite(?:_|&#95;)?ref)-[^"]+")[^>]*>.*?href="#(?:endnote(?:_|&#95;)?(\d+)|cite(?:_|&#95;)?note-(\d+))".*?</sup>',
        _replace_ref,
        paragraph_html,
        flags=re.DOTALL | re.IGNORECASE,
    )


def mark_verse_number(paragraph_html: str) -> str:
    return re.sub(
        r'^\s*(?:<link[^>]*>\s*)*(?:<style[^>]*>.*?</style>\s*)*(?:<span[^>]*class="[^"]*wst-verse[^"]*"[^>]*>\s*)?<sup[^>]*>\s*(?:<a[^>]*>)?\s*(\d+)\s*(?:</a>)?\s*</sup>\s*(?:</span>)?',
        r"|VERSE|\1|",
        paragraph_html,
        count=1,
        flags=re.DOTALL | re.IGNORECASE,
    )


def normalize_paragraph_text(paragraph_html: str) -> str:
    text = paragraph_html
    text = re.sub(r"<br\s*/?>", " ", text, flags=re.IGNORECASE)
    text = re.sub(r"<style[^>]*>.*?</style>", " ", text, flags=re.DOTALL | re.IGNORECASE)
    text = re.sub(r"<[^>]+>", "", text)
    text = html.unescape(text)
    text = text.replace("\xa0", " ")
    text = re.sub(r"\s+", " ", text).strip()
    return text


def build_verse_entry(
    chapter_num: int,
    verse_num: int,
    verse_text: str,
    chapter_notes: dict[str, dict[str, str]],
    footnotes: dict[int, str],
) -> dict[str, Any] | None:
    note_nums = sorted({int(n) for n in re.findall(r"\[\[FNREF:(\d+)\]\]", verse_text)})
    note_keys: list[str] = []
    for note_num in note_nums:
        note_text = footnotes.get(note_num)
        if not note_text:
            continue
        key = f"fn{chapter_num}_{note_num}"
        rotulo, cleaned_note_text = split_note_label(note_text, note_num)
        chapter_notes.setdefault(key, {"rotulo": rotulo, "texto": cleaned_note_text})
        note_keys.append(key)

    cleaned_verse_text = re.sub(r"\[\[FNREF:(\d+)\]\]", "", verse_text)
    cleaned_verse_text = collapse_spaces(cleaned_verse_text)
    cleaned_verse_text = re.sub(r"\s+([,.;:!?])", r"\1", cleaned_verse_text).strip()
    if not cleaned_verse_text:
        return None

    verse_entry: dict[str, Any] = {"n": verse_num, "texto": cleaned_verse_text}
    if len(note_keys) == 1:
        verse_entry["nota"] = note_keys[0]
    elif len(note_keys) > 1:
        verse_entry["nota"] = note_keys
    return verse_entry


def split_note_label(note_text: str, note_num: int) -> tuple[str, str]:
    text = re.sub(r"\s+", " ", note_text).strip()

    quoted_ellipsis = re.match(r'^"([^"]+)"\s*(?:\.\.\.|…)\s*(.*)$', text)
    if quoted_ellipsis:
        label = quoted_ellipsis.group(1).strip()
        body = quoted_ellipsis.group(2).strip()
        if label and body:
            return label, body

    quoted_colon = re.match(r'^"([^"]+)"\s*:\s*(.*)$', text)
    if quoted_colon:
        label = quoted_colon.group(1).strip()
        body = quoted_colon.group(2).strip()
        if label and body:
            return label, body

    prefix, sep, suffix = text.partition(":")
    if sep:
        candidate = prefix.strip().strip('"\' ')
        body = suffix.strip()
        if candidate and body and len(candidate) <= 60 and "." not in candidate and "?" not in candidate and "!" not in candidate:
            return candidate, body

    return f"Nota {note_num}", text


def extract_chapters(page_html: str, page_url: str, footnotes: dict[int, str]) -> list[dict[str, Any]]:
    heading_iter = list(re.finditer(r"<(h2|h3)\b([^>]*)>(.*?)</\1>", page_html, flags=re.DOTALL | re.IGNORECASE))
    chapter_bounds: list[tuple[int, int, int, str]] = []

    for idx, heading in enumerate(heading_iter):
        heading_attrs = heading.group(2) or ""
        heading_text = clean_text(heading.group(3))

        chapter_num: int | None = None
        chapter_anchor = ""

        id_match = re.search(r'\bid="([^"]+)"', heading_attrs, flags=re.IGNORECASE)
        if id_match:
            chapter_anchor = html.unescape(id_match.group(1)).strip()
            id_chapter_match = re.match(r"(?:Chapter|PSALM)_(\d+)\b", chapter_anchor, flags=re.IGNORECASE)
            if id_chapter_match:
                chapter_num = int(id_chapter_match.group(1))

        if chapter_num is None:
            chapter_match = re.match(r"Chapter\s+(\d+)\b", heading_text, flags=re.IGNORECASE)
            if chapter_match:
                chapter_num = int(chapter_match.group(1))
                if not chapter_anchor:
                    chapter_anchor = f"Chapter_{chapter_num}"

        if chapter_num is None:
            psalm_match = re.match(r"PSALM\s+(\d+)\b", heading_text, flags=re.IGNORECASE)
            if psalm_match:
                chapter_num = int(psalm_match.group(1))
                if not chapter_anchor:
                    chapter_anchor = f"PSALM_{chapter_num}"

        if chapter_num is None:
            continue

        if not chapter_anchor:
            chapter_anchor = f"Chapter_{chapter_num}"

        start = heading.end()
        end = heading_iter[idx + 1].start() if idx + 1 < len(heading_iter) else len(page_html)
        chapter_bounds.append((chapter_num, start, end, chapter_anchor))

    chapters: list[dict[str, Any]] = []

    for chapter_num, start, end, chapter_anchor in chapter_bounds:
        segment = page_html[start:end]
        paragraphs = re.findall(r"<p[^>]*>(.*?)</p>", segment, flags=re.DOTALL | re.IGNORECASE)

        summary = ""
        verses: list[dict[str, Any]] = []
        chapter_notes: dict[str, dict[str, str]] = {}

        for p_html in paragraphs:
            marked = mark_verse_number(mark_footnote_refs(p_html))
            text = normalize_paragraph_text(marked)
            if not text:
                continue

            verse_match = re.match(r"\|VERSE\|(\d+)\|\s*(.*)$", text)
            if verse_match:
                verse_num = int(verse_match.group(1))
                verse_text = verse_match.group(2).strip()
                verse_entry = build_verse_entry(chapter_num, verse_num, verse_text, chapter_notes, footnotes)
                if verse_entry:
                    verses.append(verse_entry)
                continue

            # Formato alternativo: varios versiculos no mesmo paragrafo, no padrao [1] ... [2] ...
            if re.match(r"^\[(\d+)\]\s*", text):
                parts = re.split(r"\[(\d+)\]\s*", text)
                idx = 1
                while idx < len(parts) - 1:
                    verse_num = int(parts[idx])
                    verse_text = parts[idx + 1].strip()
                    verse_entry = build_verse_entry(chapter_num, verse_num, verse_text, chapter_notes, footnotes)
                    if verse_entry:
                        verses.append(verse_entry)
                    idx += 2
                continue

            if not verses:
                summary = collapse_spaces(f"{summary} {text}") if summary else collapse_spaces(text)
            else:
                last = verses[-1]
                last_text = str(last.get("texto", "")).strip()
                if last_text:
                    last["texto"] = collapse_spaces(f"{last_text} {text}")

        if not verses:
            continue

        chapters.append(
            {
                "num": chapter_num,
                "sumario": summary,
                "versiculos": verses,
                "notas": chapter_notes,
                "link": f"{page_url}#{chapter_anchor}",
            }
        )

    return chapters


def process_book(
    book: dict[str, str],
    available_slugs: dict[str, str],
    force: bool,
    unchanged_files: list[str],
) -> tuple[bool, bool]:
    book_id = book["id"]
    ws_slug = resolve_slug(book_id, available_slugs)
    book_dir = DOUAY_DIR / book_id
    book_dir.mkdir(parents=True, exist_ok=True)

    index_path = book_dir / "index.json"
    existing_index = read_json(index_path) or {}
    fig_index = read_json(FIGUEIREDO_DIR / book_id / "index.json") or {}
    existing_chapters = chapter_files(book_dir)
    existing_nums = sorted(existing_chapters.keys())

    declared_caps = existing_index.get("capitulos")
    if not isinstance(declared_caps, list):
        declared_caps = []
    declared_caps = sorted({int(c) for c in declared_caps if isinstance(c, int) or (isinstance(c, str) and c.isdigit())})

    has_complete_declared_set = bool(declared_caps) and all(c in existing_chapters for c in declared_caps)
    needs_fetch = force or not has_complete_declared_set

    page_url = f"{INDEX_URL}/{ws_slug}"
    fetched_title = ""
    fetched_chapters: list[dict[str, Any]] = []

    if needs_fetch:
        print(f"[BOOK] {book_id} -> {page_url}")
        page_html = fetch(page_url)
        footnotes = extract_footnotes(page_html)
        fetched_title = extract_heading_title(page_html, ws_slug.replace("_", " "))
        fetched_chapters = extract_chapters(page_html, page_url, footnotes)
        if not fetched_chapters:
            raise RuntimeError(f"nenhum capitulo encontrado para {book_id} ({page_url})")
        time.sleep(0.6)
    else:
        print(f"[BOOK] {book_id} -> sem consulta remota (ja extraido)")

    wrote_chapter = False
    if fetched_chapters:
        for chapter in fetched_chapters:
            chapter_num = chapter["num"]
            chapter_path = book_dir / f"{chapter_num}.json"
            if chapter_path.exists() and not force:
                unchanged_files.append(str(chapter_path.relative_to(ROOT_DIR)))
                continue
            write_json(chapter_path, chapter)
            wrote_chapter = True

    final_caps = sorted(set(existing_nums) | {ch["num"] for ch in fetched_chapters})
    if not final_caps:
        final_caps = declared_caps
    if not final_caps:
        raise RuntimeError(f"livro {book_id} sem capitulos locais e sem dados extraidos")

    titulo = fetched_title or str(existing_index.get("titulo") or "").strip() or ws_slug.replace("_", " ")
    titulo_indice = title_from_id(book_id)

    new_index: dict[str, Any] = {
        "id": book_id,
        "titulo": titulo,
        "tituloIndice": titulo_indice,
        "abreviacao": str(existing_index.get("abreviacao") or fig_index.get("abreviacao") or book["abreviacao"]),
        "testamento": str(existing_index.get("testamento") or merge_testament(fig_index.get("testamento"), book["testamento"])),
        "grupo": str(existing_index.get("grupo") or merge_group(fig_index.get("grupo"), book["grupo"])),
        "capitulos": final_caps,
    }

    if "introducao" in existing_index and existing_index["introducao"]:
        new_index["introducao"] = existing_index["introducao"]

    wrote_index = False
    if index_path.exists() and not force and json_equal(existing_index, new_index):
        unchanged_files.append(str(index_path.relative_to(ROOT_DIR)))
    else:
        write_json(index_path, new_index)
        wrote_index = True

    return wrote_index, wrote_chapter


def main() -> None:
    force, requested_books = parse_args()
    if requested_books:
        selected_books = [b for b in BOOKS if b["id"] in requested_books]
        missing = sorted(requested_books - {b["id"] for b in selected_books})
        if missing:
            raise SystemExit(f"IDs de livro invalidos: {', '.join(missing)}")
    else:
        selected_books = BOOKS

    print(f"[INDEX] {INDEX_URL}")
    index_html = fetch(INDEX_URL)
    available_slugs = parse_book_links(index_html)
    if not available_slugs:
        raise RuntimeError("nenhum livro encontrado no indice Douay-Rheims")

    DOUAY_DIR.mkdir(parents=True, exist_ok=True)
    unchanged_files: list[str] = []
    changed_indexes = 0
    changed_chapters = 0

    for book in selected_books:
        wrote_index, wrote_chapter = process_book(book, available_slugs, force, unchanged_files)
        if wrote_index:
            changed_indexes += 1
        if wrote_chapter:
            changed_chapters += 1

    print("\n=== Concluido ===")
    print(f"Livros processados: {len(selected_books)}")
    print(f"Index.json alterados: {changed_indexes}")
    print(f"Livros com capitulos alterados: {changed_chapters}")

    if unchanged_files:
        print("\nArquivos nao alterados:")
        for relpath in sorted(set(unchanged_files)):
            print(f"- {relpath}")
    else:
        print("\nTodos os arquivos processados foram atualizados.")


if __name__ == "__main__":
    main()
