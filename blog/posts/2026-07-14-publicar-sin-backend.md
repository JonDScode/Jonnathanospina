---
title: "Publicar en un blog estático sin backend: GitHub como API"
date: "2026-07-14"
description: "Cómo este blog se publica desde cualquier aplicación con una sola llamada HTTP, sin servidor propio: markdown en el repo, GitHub Actions como builder y GitHub Pages como hosting."
category: "Arquitectura"
---

Este sitio vive en GitHub Pages: hosting estático, gratuito y sin servidor que mantener. La pega aparente es que "no se puede publicar contenido dinámicamente". Este post existe para demostrar lo contrario — se publicó exactamente con el mecanismo que describe.

## La idea: el repositorio es la API

No necesito un backend porque GitHub ya me da uno:

1. **El contenido son archivos markdown** en `blog/posts/`, con frontmatter YAML (título, fecha, descripción, categoría).
2. **Una GitHub Action** se dispara cuando llega un post nuevo: lo convierte a HTML con la plantilla del sitio, regenera el índice del blog y el sitemap, y commitea el resultado.
3. **GitHub Pages** redespliega automáticamente. El sitio sigue siendo 100% estático.

El "botón publicar" de cualquier aplicación externa se reduce a una llamada a la API REST de GitHub:

```bash
curl -X PUT \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/JonDScode/Jonnathanospina/contents/blog/posts/mi-post.md \
  -d '{"message": "Nuevo post", "content": "<markdown en base64>"}'
```

El token es *fine-grained*: solo puede escribir contenido en este repositorio. Si se filtra, el radio de daño es un blog, no una cuenta.

## Por qué no un CMS o un servidor

| Alternativa | Coste oculto |
|-------------|--------------|
| CMS headless (Decap, Contentful) | Pasarela OAuth o SaaS de pago — backend disfrazado |
| Servidor propio con API | Mantenimiento, caídas, certificados, un servicio más que vigilar |
| `fetch` a un backend desde el navegador | El sitio deja de funcionar cuando el servidor se cae |

La versión con Actions no tiene ninguno de esos costes: si GitHub está caído, el mundo tiene problemas más grandes que mi blog.

## Lo que esto habilita

Escribir desde donde sea: un editor local y `git push`, la web de GitHub desde el móvil, o una aplicación propia con su backend que llame a la API. El pipeline no distingue — todo termina en un commit, y un commit termina en un post publicado.

El mismo patrón sirve para más cosas: este sitio también regenera el PDF del CV con Chrome headless cada vez que cambia el CV web. Una sola fuente de verdad, cero servidores.
