# Publicar contenido desde fuera del repo

El sitio es estático (GitHub Pages), pero se puede publicar desde cualquier
aplicación: **el repo es la API**. Un post nuevo = un archivo markdown en
`blog/posts/` — da igual cómo llegue (git push, web de GitHub, o llamada HTTP
desde tu app). La Action `blog.yml` hace el resto: HTML, índice y sitemap.

## Formato de un post

Archivo: `blog/posts/YYYY-MM-DD-slug.md` (el slug se convierte en la URL).

```markdown
---
title: "Título del post"
date: "2026-07-14"
description: "Resumen de 1-2 frases. Aparece en el índice del blog y en el SEO."
category: "Arquitectura"
---

Contenido en markdown: encabezados `##`, código, tablas, listas, enlaces…
```

`title`, `date` y `description` son obligatorios; `category` es opcional.

**Multilenguaje (opcional)**:

- *Título y descripción*: añade `title_en`, `description_en` (y `_pt`, `_fr`) al
  frontmatter — el switcher los traduce en el índice y en la cabecera del post.
- *Cuerpo completo*: escribe el post en español y añade después secciones con el
  cuerpo traducido, separadas por marcadores:

  ```markdown
  Cuerpo en español...

  <!-- lang:en -->
  Full body in English...

  <!-- lang:pt -->
  Corpo em português...
  ```

  El build genera un bloque por idioma y el visitante ve el de su idioma activo.
- Los idiomas que falten caen al español automáticamente. El build genera
  `JS/blog-i18n.js` solo (no editar a mano).

## Token (una sola vez)

1. GitHub → Settings → Developer settings → Fine-grained tokens → Generate new token
2. Repository access: **Only select repositories** → `JonDScode/Jonnathanospina`
3. Permissions → Repository permissions → **Contents: Read and write**
4. Guarda el token en el backend de tu app (variable de entorno, nunca en el frontend)

## Opción A — API de contents (recomendada)

Crea el archivo directamente; el push dispara la Action.

```bash
CONTENT=$(base64 -w0 mi-post.md)
curl -X PUT \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/JonDScode/Jonnathanospina/contents/blog/posts/2026-07-20-mi-post.md" \
  -d "{\"message\": \"post: mi-post\", \"content\": \"$CONTENT\"}"
```

Desde Node/TypeScript (el botón "publicar" de tu app):

```js
async function publicarPost(filename, markdown) {
  const res = await fetch(
    `https://api.github.com/repos/JonDScode/Jonnathanospina/contents/blog/posts/${filename}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        message: `post: ${filename}`,
        content: Buffer.from(markdown, "utf-8").toString("base64"),
      }),
    }
  );
  if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
  return res.json(); // ~2 min después el post está en la web
}
```

> Para **editar** un post existente la API exige el `sha` actual del archivo:
> haz antes un GET a la misma URL y pásalo en el body (`"sha": "..."`).

## Opción B — repository_dispatch

Manda el contenido en el payload; la Action escribe el archivo y construye.

```bash
curl -X POST \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/JonDScode/Jonnathanospina/dispatches" \
  -d "{
    \"event_type\": \"publish-post\",
    \"client_payload\": {
      \"filename\": \"2026-07-20-mi-post.md\",
      \"content_b64\": \"$(base64 -w0 mi-post.md)\"
    }
  }"
```

## Borradores

`blog/drafts/` está en `.gitignore`: todo lo que escribas ahí **nunca se sube**
al repo (que es público). Flujo:

1. Escribe el borrador en `blog/drafts/mi-idea.md` (mismo formato de frontmatter)
2. Itera con calma — no hay riesgo de publicarlo por accidente
3. Para publicar: renómbralo con fecha y muévelo a `blog/posts/`, commit y push

## Escribir en local (sin API)

```powershell
# 1. Crear blog/posts/2026-07-20-mi-post.md
# 2. Previsualizar:
pip install markdown pyyaml
python scripts/build_blog.py
# 3. Publicar:
git add -A; git commit -m "post: mi-post"; git push
```

## CV en PDF

`assets/cv-jonnathan-ospina.pdf` se **regenera solo**: la Action `cv-pdf.yml`
imprime `pages/cv.html` (con su CSS de impresión, tema claro) cada vez que el
CV web cambia. No editar el PDF a mano — editar `pages/cv.html`.
