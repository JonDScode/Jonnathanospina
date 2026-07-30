---
title: "Publicar en un blog estático sin backend: GitHub como API"
title_en: "Publishing to a static blog with no backend: GitHub as the API"
title_pt: "Publicar num blog estático sem backend: GitHub como API"
title_fr: "Publier sur un blog statique sans backend : GitHub comme API"
date: "2026-07-14"
description: "Cómo este blog se publica desde cualquier aplicación con una sola llamada HTTP, sin servidor propio: markdown en el repo, GitHub Actions como builder y GitHub Pages como hosting."
description_en: "How this blog gets published from any application with a single HTTP call and no server of its own: markdown in the repo, GitHub Actions as the builder and GitHub Pages as the hosting."
description_pt: "Como este blog é publicado a partir de qualquer aplicação com uma única chamada HTTP, sem servidor próprio: markdown no repo, GitHub Actions como builder e GitHub Pages como hosting."
description_fr: "Comment ce blog est publié depuis n'importe quelle application avec un seul appel HTTP, sans serveur propre : markdown dans le repo, GitHub Actions comme builder et GitHub Pages comme hébergement."
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

<!-- lang:en -->
This site lives on GitHub Pages: static, free hosting with no server to maintain. The apparent catch is that "you can't publish content dynamically". This post exists to prove otherwise — it was published with the very mechanism it describes.

## The idea: the repository is the API

I don't need a backend because GitHub already gives me one:

1. **Content is markdown files** in `blog/posts/`, with YAML frontmatter (title, date, description, category).
2. **A GitHub Action** fires when a new post arrives: it converts it to HTML with the site's template, regenerates the blog index and the sitemap, and commits the result.
3. **GitHub Pages** redeploys automatically. The site stays 100% static.

The "publish button" of any external application boils down to one call to the GitHub REST API:

```bash
curl -X PUT \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/JonDScode/Jonnathanospina/contents/blog/posts/my-post.md \
  -d '{"message": "New post", "content": "<markdown in base64>"}'
```

The token is *fine-grained*: it can only write content to this repository. If it leaks, the blast radius is a blog, not an account.

## Why not a CMS or a server

| Alternative | Hidden cost |
|-------------|-------------|
| Headless CMS (Decap, Contentful) | OAuth gateway or paid SaaS — a backend in disguise |
| Own server with an API | Maintenance, outages, certificates, one more service to watch |
| `fetch` to a backend from the browser | The site breaks whenever the server goes down |

The Actions version has none of those costs: if GitHub is down, the world has bigger problems than my blog.

## What this enables

Writing from anywhere: a local editor and `git push`, the GitHub web UI from a phone, or an application of your own with its backend calling the API. The pipeline doesn't care — everything ends in a commit, and a commit ends in a published post.

The same pattern serves other things: this site also regenerates the CV PDF with headless Chrome every time the web CV changes. One source of truth, zero servers.

<!-- lang:pt -->
Este site vive no GitHub Pages: hosting estático, gratuito e sem servidor para manter. O aparente problema é que "não se pode publicar conteúdo dinamicamente". Este post existe para provar o contrário — foi publicado exatamente com o mecanismo que descreve.

## A ideia: o repositório é a API

Não preciso de um backend porque o GitHub já me dá um:

1. **O conteúdo são ficheiros markdown** em `blog/posts/`, com frontmatter YAML (título, data, descrição, categoria).
2. **Uma GitHub Action** dispara quando chega um post novo: converte-o em HTML com o template do site, regenera o índice do blog e o sitemap, e faz commit do resultado.
3. **O GitHub Pages** faz redeploy automaticamente. O site continua 100% estático.

O "botão publicar" de qualquer aplicação externa reduz-se a uma chamada à API REST do GitHub:

```bash
curl -X PUT \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/JonDScode/Jonnathanospina/contents/blog/posts/meu-post.md \
  -d '{"message": "Novo post", "content": "<markdown em base64>"}'
```

O token é *fine-grained*: só pode escrever conteúdo neste repositório. Se vazar, o raio de dano é um blog, não uma conta.

## Porquê não um CMS ou um servidor

| Alternativa | Custo oculto |
|-------------|--------------|
| CMS headless (Decap, Contentful) | Gateway OAuth ou SaaS pago — um backend disfarçado |
| Servidor próprio com API | Manutenção, quedas, certificados, mais um serviço para vigiar |
| `fetch` a um backend a partir do navegador | O site deixa de funcionar quando o servidor cai |

A versão com Actions não tem nenhum desses custos: se o GitHub estiver em baixo, o mundo tem problemas maiores do que o meu blog.

## O que isto permite

Escrever de onde for: um editor local e `git push`, a web do GitHub no telemóvel, ou uma aplicação própria com o seu backend a chamar a API. O pipeline não distingue — tudo acaba num commit, e um commit acaba num post publicado.

O mesmo padrão serve para mais coisas: este site também regenera o PDF do CV com Chrome headless sempre que o CV web muda. Uma única fonte de verdade, zero servidores.

<!-- lang:fr -->
Ce site vit sur GitHub Pages : hébergement statique, gratuit, sans serveur à maintenir. Le piège apparent : "on ne peut pas publier de contenu dynamiquement". Ce billet existe pour prouver le contraire — il a été publié exactement avec le mécanisme qu'il décrit.

## L'idée : le dépôt est l'API

Je n'ai pas besoin de backend parce que GitHub m'en donne déjà un :

1. **Le contenu, ce sont des fichiers markdown** dans `blog/posts/`, avec un frontmatter YAML (titre, date, description, catégorie).
2. **Une GitHub Action** se déclenche à l'arrivée d'un nouveau billet : elle le convertit en HTML avec le template du site, régénère l'index du blog et le sitemap, et committe le résultat.
3. **GitHub Pages** redéploie automatiquement. Le site reste 100 % statique.

Le "bouton publier" de n'importe quelle application externe se réduit à un appel à l'API REST de GitHub :

```bash
curl -X PUT \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/JonDScode/Jonnathanospina/contents/blog/posts/mon-billet.md \
  -d '{"message": "Nouveau billet", "content": "<markdown en base64>"}'
```

Le token est *fine-grained* : il ne peut écrire que du contenu dans ce dépôt. S'il fuit, le rayon d'impact est un blog, pas un compte.

## Pourquoi pas un CMS ou un serveur

| Alternative | Coût caché |
|-------------|------------|
| CMS headless (Decap, Contentful) | Passerelle OAuth ou SaaS payant — un backend déguisé |
| Serveur propre avec API | Maintenance, pannes, certificats, un service de plus à surveiller |
| `fetch` vers un backend depuis le navigateur | Le site cesse de fonctionner quand le serveur tombe |

La version avec Actions n'a aucun de ces coûts : si GitHub est en panne, le monde a de plus gros problèmes que mon blog.

## Ce que cela permet

Écrire de n'importe où : un éditeur local et `git push`, l'interface web de GitHub depuis un téléphone, ou une application à soi avec son backend qui appelle l'API. Le pipeline ne fait pas la différence — tout finit en commit, et un commit finit en billet publié.

Le même motif sert à autre chose : ce site régénère aussi le PDF du CV avec Chrome headless à chaque changement du CV web. Une seule source de vérité, zéro serveur.
