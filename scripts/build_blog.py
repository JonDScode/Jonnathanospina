#!/usr/bin/env python3
"""Genera el blog estatico a partir de blog/posts/*.md.

- Renderiza cada post con templates/post.html -> pages/blog/<slug>.html
- Inyecta el listado de posts en pages/blog.html (entre los marcadores POSTS:START/END)
- Regenera sitemap.xml (paginas estaticas + posts)

Uso:  python scripts/build_blog.py
Dependencias:  pip install markdown pyyaml
"""
import re
import sys
from datetime import date
from pathlib import Path

import markdown
import yaml

ROOT = Path(__file__).resolve().parent.parent
POSTS_DIR = ROOT / "blog" / "posts"
OUT_DIR = ROOT / "pages" / "blog"
TEMPLATE = ROOT / "templates" / "post.html"
BLOG_INDEX = ROOT / "pages" / "blog.html"
SITEMAP = ROOT / "sitemap.xml"
BASE_URL = "https://www.jonnathanospina.com"

MD = markdown.Markdown(extensions=["fenced_code", "tables", "toc"])


LANGS = ("es", "en", "pt", "fr")


def parse_post(path: Path) -> dict:
    raw = path.read_text(encoding="utf-8")
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", raw, re.DOTALL)
    if not m:
        sys.exit(f"ERROR: {path.name} no tiene frontmatter YAML (--- ... ---)")
    meta = yaml.safe_load(m.group(1))
    body = m.group(2).strip()
    for field in ("title", "date", "description"):
        if field not in meta:
            sys.exit(f"ERROR: {path.name} sin campo obligatorio '{field}'")
    slug = re.sub(r"^\d{4}-\d{2}-\d{2}-", "", path.stem)
    MD.reset()
    words = len(re.findall(r"\w+", body))
    # Traducciones opcionales de título/descripción: title_en, description_fr, ...
    # (el cuerpo del post se queda en su idioma original; solo se traduce el escaparate)
    i18n = {}
    for field in ("title", "description"):
        i18n[field] = {"es": str(meta[field])}
        for lang in LANGS[1:]:
            if f"{field}_{lang}" in meta:
                i18n[field][lang] = str(meta[f"{field}_{lang}"])
    return {
        "slug": slug,
        "title": str(meta["title"]),
        "date": str(meta["date"]),
        "description": str(meta["description"]),
        "category": str(meta.get("category", "IA & Datos")),
        "html": MD.convert(body),
        "minutes": max(1, round(words / 200)),
        "i18n": i18n,
    }


def render_post(post: dict, template: str) -> str:
    out = template
    for key in ("slug", "title", "date", "description", "category"):
        out = out.replace("{{" + key.upper() + "}}", post[key])
    out = out.replace("{{MINUTES}}", str(post["minutes"]))
    out = out.replace("{{CONTENT}}", post["html"])
    return out


def index_entry(post: dict) -> str:
    slug = post["slug"]
    return f'''            <article class="blog-post">
                <div class="post-meta">
                    <span class="post-date">{post["date"]}</span>
                    <span class="post-category">{post["category"]}</span>
                </div>
                <h2 class="post-title" data-i18n="blog.post.{slug}.title">{post["title"]}</h2>
                <p class="post-excerpt" data-i18n="blog.post.{slug}.desc">{post["description"]}</p>
                <a href="blog/{slug}.html" class="read-more" data-i18n="blog.readmore">Leer &rarr;</a>
            </article>'''


def build_blog_i18n(posts: list) -> str:
    """Genera JS/blog-i18n.js: registra las traducciones de los posts en TRANSLATIONS.

    Se carga después de i18n.js y antes del DOMContentLoaded que aplica el idioma,
    así el switcher traduce también los títulos/descripciones generados.
    """
    import json
    entries = {"blog.readmore": {"es": "Leer →", "en": "Read →", "pt": "Ler →", "fr": "Lire →"}}
    for p in posts:
        entries[f"blog.post.{p['slug']}.title"] = p["i18n"]["title"]
        entries[f"blog.post.{p['slug']}.desc"] = p["i18n"]["description"]
    payload = json.dumps(entries, ensure_ascii=False, indent=2)
    return (
        "/* GENERADO por scripts/build_blog.py — no editar a mano.\n"
        "   Traducciones de títulos/descripciones de posts (el cuerpo queda en su idioma). */\n"
        f"Object.assign(TRANSLATIONS, {payload});\n"
    )


def build_sitemap(posts: list) -> str:
    urls = [
        (f"{BASE_URL}/", "1.0"),
        (f"{BASE_URL}/pages/projects.html", "0.9"),
        (f"{BASE_URL}/pages/cv.html", "0.9"),
        (f"{BASE_URL}/pages/blog.html", "0.6"),
    ]
    urls += [(f"{BASE_URL}/pages/blog/{p['slug']}.html", "0.7") for p in posts]
    body = "\n".join(
        f"  <url>\n    <loc>{loc}</loc>\n    <priority>{prio}</priority>\n  </url>"
        for loc, prio in urls
    )
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{body}\n</urlset>\n"
    )


def main() -> None:
    template = TEMPLATE.read_text(encoding="utf-8")
    posts = sorted(
        (parse_post(p) for p in POSTS_DIR.glob("*.md")),
        key=lambda p: p["date"],
        reverse=True,
    )

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for post in posts:
        out = OUT_DIR / f"{post['slug']}.html"
        out.write_text(render_post(post, template), encoding="utf-8")
        print(f"post: {out.relative_to(ROOT)}")

    listing = "\n\n".join(index_entry(p) for p in posts) if posts else ""
    index_html = BLOG_INDEX.read_text(encoding="utf-8")
    new_index = re.sub(
        r"(<!-- POSTS:START -->).*?(<!-- POSTS:END -->)",
        lambda m: f"{m.group(1)}\n{listing}\n{m.group(2)}",
        index_html,
        flags=re.DOTALL,
    )
    BLOG_INDEX.write_text(new_index, encoding="utf-8")
    print(f"indice: {len(posts)} posts")

    SITEMAP.write_text(build_sitemap(posts), encoding="utf-8")
    print("sitemap: ok")

    blog_i18n = ROOT / "JS" / "blog-i18n.js"
    blog_i18n.write_text(build_blog_i18n(posts), encoding="utf-8")
    print("blog-i18n: ok")


if __name__ == "__main__":
    main()
