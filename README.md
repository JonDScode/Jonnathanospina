# Jonnathan Ospina — Portfolio

A personal portfolio website with a dark mathematical theme and non-Euclidean geometry animations.

## Design System

- **Theme**: Dark — `#0a0a0f` base, cyan (`#6ee7f7`) and violet (`#a78bfa`) accents
- **Typography**: Inter (body) + JetBrains Mono (code, labels, nav)
- **Animations**: Vanilla JS Canvas API — no external animation libraries

## Project Structure

```
Jonnathanospina/
├── CSS/
│   └── design-system.css   # Shared tokens, reset, nav, status bar, buttons, footer
├── pages/
│   ├── cv.html             # CV — vector field background (Perlin flow)
│   ├── projects.html       # Projects — vector field background
│   └── blog.html           # Blog — Rule 30 cellular automaton background
├── index.html              # Home — hyperbolic mosaic (Poincare disk)
├── CNAME
├── .gitignore
└── README.md
```

## Animations

| Page | Animation | Math |
|------|-----------|------|
| `index.html` | Hyperbolic mosaic | Poincare disk model, {5,4} tiling, Mobius transforms `T_a(z) = (z-a)/(1-az)` |
| `cv.html` | Vector field | Perlin-like noise flow, `angle = noise(x,y,t) * 4pi` |
| `projects.html` | Vector field | Same as CV, violet palette |
| `blog.html` | Rule 30 automaton | Wolfram elementary CA, `k=3, r=1` |

## CSS Architecture

All shared styles live in a single file:

```
CSS/design-system.css   — design tokens, reset, nav, status bar, buttons, footer, card effects
```

Each HTML file has only a small inline `<style>` block for its own layout (hero, grid, card sizes, etc.).
No external legacy stylesheets are loaded.

## Getting Started

1. Clone the repository
2. Open `index.html` in a browser (or use Live Server on port 5501)
3. Navigate through the pages

## Contact

- **Email**: jonnathanospinam@gmail.com