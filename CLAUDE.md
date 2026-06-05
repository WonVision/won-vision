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

## What this project is (the big picture)

**Won Vision is one connected system, not just a marketing website.** It has
three parts that work together:

1. **The public site + booking** — what clients see: marketing pages, the
   gallery, the "How we operate" page, and the booking flow.
2. **Vision Studio — the in-house AI photo editor.** This is the engine that
   turns raw property photos into finished, 4K real-estate images. It uses
   **fal.ai** (Seedream 4.5 / Nano Banana Pro) to edit and **Gemini 2.5 Pro**
   to quality-check each result. There are two editing tracks:
   - a *client-submission* pipeline (`properties` → `photos` in the database), and
   - a *photographer* pipeline that merges HDR brackets (`shoots` → `frames`).
   An editor must **manually approve** every image before a client sees it
   (a deliberate human gate — see the plan docs).
3. **OUTBOUND Operations panel** — a **separate system** (its own app) that is
   the "source of truth" for job status. Won Vision is wired to it: when an
   editor approves work, Won Vision fires a **webhook** (an automatic
   notification from one app to another) to OUTBOUND Operations so the matching
   job there gets marked delivered. The `shoots` table stores an `opsJobId`
   field that links a Won Vision shoot to its OUTBOUND Operations job.

So the flow connects up like: **booking on the public site → photos handled in
Vision Studio → status synced back to OUTBOUND Operations.**

> Note on persistence: the full build history and the *reasoning* behind these
> decisions lives in `docs/superpowers/plans/` (the Phase 1–7 roadmap files).
> Read those for the "why" — Claude does not remember past chat sessions, only
> what is written into files like this one and those plans.

## Tech stack details

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
