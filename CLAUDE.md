# CLAUDE.md

This file is Claude's persistent memory for the **Won Vision** project. Claude
reads it at the start of every session. Anything written here is remembered;
anything only said in chat is forgotten when the session ends.

## How to talk to me (the owner is learning)

The owner of this project is actively learning to code and how to work with
Claude. When responding:

- **Explain things in plain, beginner-friendly language.** Assume I'm smart but
  new to software terminology.
- **Define jargon the first time you use it** in a reply (e.g. "a *component* —
  a reusable building block of the UI").
- **Say where things live and what they do** before changing them, so I learn
  the codebase as we go.
- **Spell out the *why*, not just the *what*,** especially for git steps
  (commit, push, branch) since those are how work gets saved.
- When you finish a task, give a short recap of what changed in normal words.

## What this project is

**Won Vision** is a website built with:

- **Next.js** (v16) — the web framework. Pages and routes live under `app/`.
- **React** (v19) + **TypeScript** — for building the user interface.
- **Tailwind / CSS** — styling (check existing files for the pattern in use).
- **Drizzle ORM** + **Neon Postgres** — the database layer.
- **Vercel Blob** — file/image storage.
- AI services: **Google GenAI** and **fal.ai**.

### Main areas of the app (`app/` folder)

- `app/book/` — the booking flow: `cart` → `checkout` → `schedule` →
  `confirmation`.
- `app/gallery/` — image gallery.
- `app/operate/` — operations section.
- `app/api/` — backend endpoints (server-side code, e.g. `api/places`).
- `app/components/` — shared UI building blocks.

### Other useful folders

- `lib/` — shared helper code.
- `docs/` — project docs, including `BRAND.md`, `BRAND_GUIDELINES.md`,
  `PRICING.md`, and runbooks.
- `tests/` — automated tests.
- `scripts/` — one-off scripts (seeding data, setup tasks).

## Common commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the app locally for development |
| `npm run build` | Build the production version |
| `npm run lint` | Check code style / catch mistakes |
| `npm run test` | Run the automated tests (Vitest) |
| `npm run test:visual` | Run visual/browser tests (Playwright) |

## Working agreements

- Confirm before doing anything hard to undo (deleting files, force-pushing).
- Keep changes small and explained.
- Remember: nothing persists unless it's **committed and pushed** to GitHub.
