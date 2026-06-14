# Booking-time Virtual Editing Cards — Implementation Plan (Sub-project ①)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the info-only virtual-editing block on the Won Vision booking page with three interactive cards (Virtual staging / Decluttering / Day-to-dusk) that let the client pick *All rooms* or *Choose rooms* (stepper, max 3), name each room, and optionally attach a reference photo — and carry that selection into the booking payload.

**Architecture:** A pure, TDD-tested helper module (`lib/booking-editing.ts`) defines the data contract + serialization. A `'use client'` React island (`app/book/VirtualEditingSection.tsx`) holds the UI state and writes the selection to `sessionStorage['wv-editing']`. Reference photos upload via Vercel Blob client-upload through a new route. The existing vanilla-JS cart engine and the confirmation payload builder are extended to reflect/forward `wv-editing`. No pricing math (POA).

**Tech Stack:** Next.js 16 App Router (server page + client island), React, TypeScript, `@vercel/blob` (client-upload, already a dependency), vitest.

**Spec:** `docs/superpowers/specs/2026-06-14-booking-time-virtual-editing-design.md` (sub-project ①, section 4).

**Branch:** `feat/booking-time-virtual-editing` (already created).

---

## File Structure

- **Create** `lib/booking-editing.ts` — types + pure helpers (`EDITING_SERVICES`, `clampRoomCount`, `buildEditingPayload`, `summarizeEditingEntry`). Single responsibility: the editing data contract + serialization. No React, no DOM.
- **Create** `tests/booking-editing.test.ts` — vitest unit tests for the helpers.
- **Create** `app/api/book/upload-ref/route.ts` — Vercel Blob client-upload token route, scoped to `booking-refs/`.
- **Create** `app/book/VirtualEditingSection.tsx` — `'use client'` island: the three cards, stepper, room slots, ref-photo upload; persists `sessionStorage['wv-editing']`.
- **Modify** `app/book/page.tsx` — replace the virtual-editing block (lines 1095–1126) with `<VirtualEditingSection />`; extend the cart `render()` to show `wv-editing` lines + include them in the count.
- **Modify** `app/book/confirmation/page.tsx` — read `wv-editing`, add `editing` to the `booking` payload, clear it on success.
- **Create** `.mockups/book-live.mjs` — Playwright screenshot script for browser-verify (desktop + phone) against the dev server.

---

## Task 1: Editing data contract + pure helpers (TDD)

**Files:**
- Create: `lib/booking-editing.ts`
- Test: `tests/booking-editing.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// tests/booking-editing.test.ts
import { describe, it, expect } from 'vitest';
import {
  clampRoomCount,
  buildEditingPayload,
  summarizeEditingEntry,
  EDITING_SERVICES,
  MAX_CHOOSE_ROOMS,
  type EditingSelectionState,
} from '../lib/booking-editing';

function blank(): EditingSelectionState {
  return { enabled: false, mode: 'choose', roomCount: 1, rooms: [{ name: '', refImageUrl: null }], note: '', refImageUrls: [] };
}

describe('clampRoomCount', () => {
  it('clamps below 1 up to 1', () => expect(clampRoomCount(0)).toBe(1));
  it('clamps above max down to max', () => expect(clampRoomCount(9)).toBe(MAX_CHOOSE_ROOMS));
  it('passes valid through', () => expect(clampRoomCount(2)).toBe(2));
});

describe('EDITING_SERVICES', () => {
  it('has the three services in order', () =>
    expect(EDITING_SERVICES.map((s) => s.id)).toEqual(['virtual_staging', 'declutter', 'day_to_dusk']));
});

describe('buildEditingPayload', () => {
  it('omits services that are not enabled', () => {
    const state = { virtual_staging: blank(), declutter: blank(), day_to_dusk: blank() };
    expect(buildEditingPayload(state)).toEqual([]);
  });

  it('serializes a choose-rooms entry, trimming names and dropping rooms beyond roomCount', () => {
    const state = { virtual_staging: blank(), declutter: blank(), day_to_dusk: blank() };
    state.virtual_staging = {
      enabled: true, mode: 'choose', roomCount: 2,
      rooms: [
        { name: '  Living room ', refImageUrl: 'https://blob/living.jpg' },
        { name: 'Master', refImageUrl: null },
        { name: 'Extra', refImageUrl: null }, // beyond roomCount -> dropped
      ],
      note: 'ignored when choose', refImageUrls: ['ignored'],
    };
    expect(buildEditingPayload(state)).toEqual([
      {
        service: 'virtual_staging', mode: 'choose', roomCount: 2,
        rooms: [
          { name: 'Living room', refImageUrl: 'https://blob/living.jpg' },
          { name: 'Master', refImageUrl: null },
        ],
        note: null, refImageUrls: [],
      },
    ]);
  });

  it('serializes an all-rooms entry with note + ref images, no rooms/roomCount', () => {
    const state = { virtual_staging: blank(), declutter: blank(), day_to_dusk: blank() };
    state.declutter = {
      enabled: true, mode: 'all', roomCount: 1, rooms: [{ name: 'ignored', refImageUrl: null }],
      note: '  remove the bins  ', refImageUrls: ['https://blob/a.jpg'],
    };
    expect(buildEditingPayload(state)).toEqual([
      { service: 'declutter', mode: 'all', roomCount: null, rooms: [], note: 'remove the bins', refImageUrls: ['https://blob/a.jpg'] },
    ]);
  });

  it('normalizes an empty all-rooms note to null', () => {
    const state = { virtual_staging: blank(), declutter: blank(), day_to_dusk: blank() };
    state.day_to_dusk = { enabled: true, mode: 'all', roomCount: 1, rooms: [], note: '   ', refImageUrls: [] };
    expect(buildEditingPayload(state)[0].note).toBeNull();
  });
});

describe('summarizeEditingEntry', () => {
  it('summarizes all-rooms', () =>
    expect(summarizeEditingEntry({ service: 'virtual_staging', mode: 'all', roomCount: null, rooms: [], note: null, refImageUrls: [] }))
      .toBe('Virtual staging · all rooms'));
  it('summarizes a single room', () =>
    expect(summarizeEditingEntry({ service: 'declutter', mode: 'choose', roomCount: 1, rooms: [{ name: 'Kitchen', refImageUrl: null }], note: null, refImageUrls: [] }))
      .toBe('Decluttering · 1 room'));
  it('summarizes multiple rooms', () =>
    expect(summarizeEditingEntry({ service: 'day_to_dusk', mode: 'choose', roomCount: 2, rooms: [], note: null, refImageUrls: [] }))
      .toBe('Day-to-dusk · 2 rooms'));
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd ~/Code/won-vision && npx vitest run tests/booking-editing.test.ts`
Expected: FAIL — `Cannot find module '../lib/booking-editing'`.

- [ ] **Step 3: Write the minimal implementation**

```ts
// lib/booking-editing.ts
export type EditingServiceId = 'virtual_staging' | 'declutter' | 'day_to_dusk';
export type EditingMode = 'all' | 'choose';

export const MAX_CHOOSE_ROOMS = 3;

export interface EditingRoom {
  name: string;
  refImageUrl: string | null;
}

/** Per-service UI state held by the React island. */
export interface EditingSelectionState {
  enabled: boolean;
  mode: EditingMode;
  roomCount: number; // 1..MAX_CHOOSE_ROOMS, used when mode === 'choose'
  rooms: EditingRoom[]; // tracks roomCount when mode === 'choose'
  note: string; // used when mode === 'all'
  refImageUrls: string[]; // used when mode === 'all'
}

/** The booking payload entry (the cross-repo data contract). */
export interface EditingEntry {
  service: EditingServiceId;
  mode: EditingMode;
  roomCount: number | null;
  rooms: EditingRoom[];
  note: string | null;
  refImageUrls: string[];
}

export const EDITING_SERVICES: {
  id: EditingServiceId;
  label: string;
  desc: string;
  beforeLabel: string;
  afterLabel: string;
  beforeSrc: string;
  afterSrc: string;
}[] = [
  {
    id: 'virtual_staging',
    label: 'Virtual staging',
    desc: 'Furnish empty rooms with realistic furniture so buyers can picture living there.',
    beforeLabel: 'Before',
    afterLabel: 'Staged',
    beforeSrc: '/images/staging-before.webp',
    afterSrc: '/images/staging-after.webp',
  },
  {
    id: 'declutter',
    label: 'Decluttering',
    desc: 'Remove personal clutter and mess so each room reads clean and spacious.',
    beforeLabel: 'Before',
    afterLabel: 'Decluttered',
    beforeSrc: '/images/declutter-before.webp',
    afterSrc: '/images/declutter-after.webp',
  },
  {
    id: 'day_to_dusk',
    label: 'Day-to-dusk',
    desc: 'Turn a daytime exterior into a warm twilight shot — the hero image agents love.',
    beforeLabel: 'Day',
    afterLabel: 'Dusk',
    beforeSrc: '/images/dusk-before.webp',
    afterSrc: '/images/dusk-after.webp',
  },
];

export function clampRoomCount(n: number): number {
  if (!Number.isFinite(n) || n < 1) return 1;
  if (n > MAX_CHOOSE_ROOMS) return MAX_CHOOSE_ROOMS;
  return Math.floor(n);
}

export function buildEditingPayload(
  state: Record<EditingServiceId, EditingSelectionState>,
): EditingEntry[] {
  const out: EditingEntry[] = [];
  for (const svc of EDITING_SERVICES) {
    const s = state[svc.id];
    if (!s || !s.enabled) continue;
    if (s.mode === 'all') {
      const note = s.note.trim();
      out.push({
        service: svc.id,
        mode: 'all',
        roomCount: null,
        rooms: [],
        note: note.length ? note : null,
        refImageUrls: [...s.refImageUrls],
      });
    } else {
      const roomCount = clampRoomCount(s.roomCount);
      out.push({
        service: svc.id,
        mode: 'choose',
        roomCount,
        rooms: s.rooms.slice(0, roomCount).map((r) => ({
          name: r.name.trim(),
          refImageUrl: r.refImageUrl,
        })),
        note: null,
        refImageUrls: [],
      });
    }
  }
  return out;
}

export function summarizeEditingEntry(e: EditingEntry): string {
  const svc = EDITING_SERVICES.find((s) => s.id === e.service);
  const label = svc ? svc.label : e.service;
  if (e.mode === 'all') return `${label} · all rooms`;
  const n = e.roomCount ?? 0;
  return `${label} · ${n} room${n === 1 ? '' : 's'}`;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd ~/Code/won-vision && npx vitest run tests/booking-editing.test.ts`
Expected: PASS — all cases green.

- [ ] **Step 5: Commit**

```bash
cd ~/Code/won-vision
git add lib/booking-editing.ts tests/booking-editing.test.ts
git commit -m "feat(booking): editing data contract + pure serialization helpers

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Reference-photo upload route (Vercel Blob client-upload)

**Files:**
- Create: `app/api/book/upload-ref/route.ts`

Mirrors the existing client-upload handshake in `lib/blob.ts`, but scoped for anonymous booking-time reference photos (no propertyId/editorId yet). Path prefix `booking-refs/`, images only, 20MB cap.

- [ ] **Step 1: Write the route**

```ts
// app/api/book/upload-ref/route.ts
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Anonymous booking-time reference photo upload. The client calls
// `upload(file.name, file, { handleUploadUrl: '/api/book/upload-ref' })`
// from VirtualEditingSection; this route mints the short-lived token.
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;
  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => ({
        allowedContentTypes: ['image/jpeg', 'image/png', 'image/heic', 'image/webp'],
        addRandomSuffix: true,
        maximumSizeInBytes: 20 * 1024 * 1024, // 20MB
        tokenPayload: JSON.stringify({ scope: 'booking-ref', pathname }),
      }),
      onUploadCompleted: async () => {
        // No-op: booking payload carries the returned URL; no DB row pre-booking.
      },
    });
    return NextResponse.json(json);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'upload failed' },
      { status: 400 },
    );
  }
}
```

- [ ] **Step 2: Type-check the route**

Run: `cd ~/Code/won-vision && npx tsc --noEmit`
Expected: PASS (no new type errors from this file). If the project's `tsc` has pre-existing unrelated errors, confirm none reference `app/api/book/upload-ref/route.ts`.

- [ ] **Step 3: Commit**

```bash
cd ~/Code/won-vision
git add app/api/book/upload-ref/route.ts
git commit -m "feat(booking): blob client-upload route for reference photos

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: VirtualEditingSection client island

**Files:**
- Create: `app/book/VirtualEditingSection.tsx`

A `'use client'` component rendering the three cards (mockup: `won-vision/.mockups/booking-editing-*.png`). Holds `Record<EditingServiceId, EditingSelectionState>`, persists `buildEditingPayload(state)` to `sessionStorage['wv-editing']` on every change, and dispatches a `wv-editing-changed` event so the vanilla cart can re-render.

- [ ] **Step 1: Write the component**

```tsx
// app/book/VirtualEditingSection.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { upload } from '@vercel/blob/client';
import {
  EDITING_SERVICES,
  MAX_CHOOSE_ROOMS,
  buildEditingPayload,
  clampRoomCount,
  type EditingMode,
  type EditingSelectionState,
  type EditingServiceId,
} from '../../lib/booking-editing';

function blankState(): EditingSelectionState {
  return {
    enabled: false,
    mode: 'choose',
    roomCount: 1,
    rooms: [{ name: '', refImageUrl: null }],
    note: '',
    refImageUrls: [],
  };
}

function initialState(): Record<EditingServiceId, EditingSelectionState> {
  return {
    virtual_staging: blankState(),
    declutter: blankState(),
    day_to_dusk: blankState(),
  };
}

/** Keep rooms array length in sync with roomCount (1..MAX). */
function syncRooms(rooms: EditingSelectionState['rooms'], count: number) {
  const next = rooms.slice(0, count);
  while (next.length < count) next.push({ name: '', refImageUrl: null });
  return next;
}

export default function VirtualEditingSection() {
  const [state, setState] = useState<Record<EditingServiceId, EditingSelectionState>>(initialState);

  // Persist the serialized payload + notify the vanilla cart on every change.
  useEffect(() => {
    try {
      sessionStorage.setItem('wv-editing', JSON.stringify(buildEditingPayload(state)));
      window.dispatchEvent(new CustomEvent('wv-editing-changed'));
    } catch {
      /* sessionStorage unavailable — non-fatal */
    }
  }, [state]);

  function patch(id: EditingServiceId, fn: (s: EditingSelectionState) => EditingSelectionState) {
    setState((prev) => ({ ...prev, [id]: fn(prev[id]) }));
  }

  function setMode(id: EditingServiceId, mode: EditingMode) {
    patch(id, (s) => ({ ...s, mode }));
  }

  function bump(id: EditingServiceId, delta: number) {
    patch(id, (s) => {
      const roomCount = clampRoomCount(s.roomCount + delta);
      return { ...s, roomCount, rooms: syncRooms(s.rooms, roomCount) };
    });
  }

  function toggle(id: EditingServiceId) {
    patch(id, (s) => ({ ...s, enabled: !s.enabled }));
  }

  return (
    <div className="wv-edit">
      <div className="cat__head">
        <h3>
          Virtual <em>editing</em>
        </h3>
        <span className="cat__count">Choose at booking · per room</span>
      </div>
      <p className="wv-edit__intro">
        Pick the rooms you want virtually edited — all the necessary rooms, or up to three specific
        rooms. Name each room and (optional) drop a reference photo so we know exactly what you mean.
      </p>

      <div className="wv-edit__row">
        {EDITING_SERVICES.map((svc) => {
          const s = state[svc.id];
          return (
            <article key={svc.id} className={`wv-card${s.enabled ? ' is-on' : ''}`}>
              <div className="wv-card__media">
                <img src={svc.afterSrc} alt={`${svc.label} example`} />
                <div className="wv-card__ba">
                  <span>{svc.beforeLabel}</span>
                  <span>{svc.afterLabel}</span>
                </div>
              </div>
              <div className="wv-card__body">
                <div className="wv-card__nm">{svc.label}</div>
                <div className="wv-card__desc">{svc.desc}</div>

                {!s.enabled ? (
                  <div className="wv-card__foot">
                    <span className="wv-card__price">From POA</span>
                    <button type="button" className="wv-add wv-add--ghost" onClick={() => toggle(svc.id)}>
                      Add +
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="wv-modes" role="group" aria-label={`${svc.label} scope`}>
                      <button
                        type="button"
                        className={`wv-mode${s.mode === 'all' ? ' is-sel' : ''}`}
                        aria-pressed={s.mode === 'all'}
                        onClick={() => setMode(svc.id, 'all')}
                      >
                        All rooms
                      </button>
                      <button
                        type="button"
                        className={`wv-mode${s.mode === 'choose' ? ' is-sel' : ''}`}
                        aria-pressed={s.mode === 'choose'}
                        onClick={() => setMode(svc.id, 'choose')}
                      >
                        Choose rooms
                      </button>
                    </div>

                    {s.mode === 'choose' ? (
                      <>
                        <div className="wv-stepper">
                          <span className="wv-stepper__lab">Rooms</span>
                          <span className="wv-stepper__ctl">
                            <button
                              type="button"
                              className={`wv-sb${s.roomCount <= 1 ? ' is-dis' : ''}`}
                              aria-label="Fewer rooms"
                              disabled={s.roomCount <= 1}
                              onClick={() => bump(svc.id, -1)}
                            >
                              −
                            </button>
                            <span className="wv-sb__count" aria-live="polite">
                              {s.roomCount}
                            </span>
                            <button
                              type="button"
                              className={`wv-sb${s.roomCount >= MAX_CHOOSE_ROOMS ? ' is-dis' : ''}`}
                              aria-label="More rooms"
                              disabled={s.roomCount >= MAX_CHOOSE_ROOMS}
                              onClick={() => bump(svc.id, 1)}
                            >
                              +
                            </button>
                          </span>
                        </div>
                        <p className="wv-maxnote">Max 3 rooms · need more? choose “All rooms”</p>
                        <div className="wv-rooms">
                          {s.rooms.slice(0, s.roomCount).map((room, i) => (
                            <RoomSlot
                              key={i}
                              index={i}
                              room={room}
                              onName={(name) =>
                                patch(svc.id, (st) => {
                                  const rooms = st.rooms.slice();
                                  rooms[i] = { ...rooms[i], name };
                                  return { ...st, rooms };
                                })
                              }
                              onImage={(url) =>
                                patch(svc.id, (st) => {
                                  const rooms = st.rooms.slice();
                                  rooms[i] = { ...rooms[i], refImageUrl: url };
                                  return { ...st, rooms };
                                })
                              }
                            />
                          ))}
                        </div>
                      </>
                    ) : (
                      <AllRoomsExtras
                        note={s.note}
                        refImageUrls={s.refImageUrls}
                        onNote={(note) => patch(svc.id, (st) => ({ ...st, note }))}
                        onImage={(url) =>
                          patch(svc.id, (st) => ({ ...st, refImageUrls: [...st.refImageUrls, url] }))
                        }
                      />
                    )}

                    <div className="wv-card__foot">
                      <span className="wv-card__price">
                        {s.mode === 'all' ? 'All rooms' : `${s.roomCount} room${s.roomCount === 1 ? '' : 's'}`} · POA
                      </span>
                      <button type="button" className="wv-add" onClick={() => toggle(svc.id)}>
                        Added ✓
                      </button>
                    </div>
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function RoomSlot({
  index,
  room,
  onName,
  onImage,
}: {
  index: number;
  room: { name: string; refImageUrl: string | null };
  onName: (name: string) => void;
  onImage: (url: string | null) => void;
}) {
  return (
    <div className="wv-slot">
      <div className="wv-slot__top">
        <span className="wv-slot__idx">Room {index + 1}</span>
        <input
          className="wv-inp"
          placeholder="Which room?"
          value={room.name}
          onChange={(e) => onName(e.target.value)}
        />
      </div>
      <RefDrop url={room.refImageUrl} onImage={onImage} />
    </div>
  );
}

function AllRoomsExtras({
  note,
  refImageUrls,
  onNote,
  onImage,
}: {
  note: string;
  refImageUrls: string[];
  onNote: (note: string) => void;
  onImage: (url: string) => void;
}) {
  return (
    <div className="wv-slot">
      <div className="wv-slot__top">
        <span className="wv-slot__idx">Note</span>
        <input
          className="wv-inp"
          placeholder="Anything specific? (optional)"
          value={note}
          onChange={(e) => onNote(e.target.value)}
        />
      </div>
      <RefDrop url={null} label="Add reference photos (optional)" onImage={(u) => u && onImage(u)} />
      {refImageUrls.length > 0 && (
        <p className="wv-maxnote">{refImageUrls.length} reference photo{refImageUrls.length === 1 ? '' : 's'} added</p>
      )}
    </div>
  );
}

function RefDrop({
  url,
  label = 'Drop a reference photo (optional)',
  onImage,
}: {
  url: string | null;
  label?: string;
  onImage: (url: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function pick(file: File) {
    setErr(null);
    setBusy(true);
    try {
      const res = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/book/upload-ref',
      });
      onImage(res.url);
    } catch {
      setErr('Upload failed — tap to retry');
    } finally {
      setBusy(false);
    }
  }

  if (url) {
    return (
      <div className="wv-imgchip">
        <span className="wv-imgchip__t">
          <img src={url} alt="Reference" />
        </span>
        <span className="wv-imgchip__nme">Reference photo added</span>
        <button type="button" className="wv-imgchip__rm" aria-label="Remove reference photo" onClick={() => onImage(null)}>
          ✕
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        className="wv-drop"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M5 19h14M12 15V5M8 9l4-4 4 4" strokeLinecap="square" />
        </svg>
        {busy ? 'Uploading…' : err ?? label}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/heic,image/webp"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void pick(f);
          e.target.value = '';
        }}
      />
    </>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `cd ~/Code/won-vision && npx tsc --noEmit`
Expected: PASS (no new errors referencing `app/book/VirtualEditingSection.tsx`).

- [ ] **Step 3: Commit**

```bash
cd ~/Code/won-vision
git add app/book/VirtualEditingSection.tsx
git commit -m "feat(booking): VirtualEditingSection card island (state + ref upload)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: Wire the island into the booking page + style it + cart reflection

**Files:**
- Modify: `app/book/page.tsx` (replace lines 1095–1126; add CSS to the page `<style>`; extend the cart `render()`)

- [ ] **Step 1: Import the island**

At the top of `app/book/page.tsx`, after the existing `BeforeAfterSlider` import (line 6), add:

```tsx
import VirtualEditingSection from './VirtualEditingSection';
```

- [ ] **Step 2: Replace the info-only block with the island**

Replace the entire block at `app/book/page.tsx:1095–1126` (the `{/* VIRTUAL EDITING — info only … */}` comment through its closing `</div>`) with:

```tsx
        {/* VIRTUAL EDITING — chosen at booking, per room (sub-project ①) */}
        <div className="cat" id="cat-staging" data-gallery="staging" data-cats="virtual-editing">
          <VirtualEditingSection />
        </div>
```

- [ ] **Step 3: Add the card CSS**

Append to the page-level `<style>` block (same block that defines `.cat`, near the top of the returned JSX — add just before its closing backtick). Use the existing CSS variables (`--ink`, `--graphite`, `--steel`, `--paper`, `--display`, `--body`) so it matches the booking page:

```css
  /* ---- Virtual editing cards (sub-project ①) ---- */
  .wv-edit__intro{color:var(--graphite);font-size:14px;line-height:1.6;max-width:640px;margin:0 0 24px}
  .wv-edit__row{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:start}
  @media (max-width:880px){.wv-edit__row{grid-template-columns:1fr}}
  .wv-card{border:1px solid rgba(74,74,72,0.18);background:var(--paper);display:flex;flex-direction:column}
  .wv-card.is-on{border-color:var(--ink)}
  .wv-card__media{position:relative;aspect-ratio:16/10;overflow:hidden;border-bottom:1px solid rgba(74,74,72,0.18);background:#f4f4f3}
  .wv-card__media img{width:100%;height:100%;object-fit:cover;display:block}
  .wv-card__ba{position:absolute;bottom:0;left:0;right:0;display:flex;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em}
  .wv-card__ba span{flex:1;padding:5px 8px;background:rgba(255,255,255,0.9);color:var(--ink)}
  .wv-card__ba span+span{border-left:1px solid rgba(74,74,72,0.18);text-align:right;background:rgba(0,0,0,0.78);color:#fff}
  .wv-card__body{padding:16px;display:flex;flex-direction:column;gap:12px;flex:1}
  .wv-card__nm{font-size:18px;font-weight:600;letter-spacing:-0.01em;color:var(--ink)}
  .wv-card__desc{font-size:12.5px;line-height:1.55;color:var(--steel)}
  .wv-modes{display:flex;border:1px solid rgba(74,74,72,0.18)}
  .wv-mode{flex:1;text-align:center;padding:10px 8px;font-size:12.5px;font-weight:600;background:var(--paper);color:var(--ink);border:0;cursor:pointer;font-family:var(--body)}
  .wv-mode+.wv-mode{border-left:1px solid rgba(74,74,72,0.18)}
  .wv-mode.is-sel{background:var(--ink);color:var(--paper)}
  .wv-stepper{display:flex;align-items:center;justify-content:space-between;border:1px solid var(--ink);padding:6px}
  .wv-stepper__lab{font-size:12px;color:var(--graphite);padding-left:6px}
  .wv-stepper__ctl{display:flex;align-items:center}
  .wv-sb{width:44px;height:44px;border:1px solid var(--ink);background:var(--paper);font-size:18px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--ink)}
  .wv-sb.is-dis{opacity:.3;cursor:not-allowed}
  .wv-sb__count{width:46px;text-align:center;font-size:17px;font-weight:700;font-variant-numeric:tabular-nums}
  .wv-maxnote{font-size:10.5px;color:var(--steel);text-align:center;margin:0}
  .wv-rooms{display:flex;flex-direction:column;gap:8px}
  .wv-slot{border:1px solid rgba(74,74,72,0.18);padding:8px;display:flex;flex-direction:column;gap:8px}
  .wv-slot__top{display:flex;align-items:center;gap:8px}
  .wv-slot__idx{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--steel);white-space:nowrap}
  .wv-inp{flex:1;border:1px solid rgba(74,74,72,0.18);padding:10px 12px;font-family:var(--body);font-size:13px;color:var(--ink);background:var(--paper)}
  .wv-drop{display:flex;align-items:center;gap:8px;width:100%;border:1px dashed var(--steel);padding:10px 12px;font-size:11.5px;color:var(--steel);background:var(--paper);cursor:pointer;font-family:var(--body);text-align:left}
  .wv-drop svg{width:15px;height:15px;flex:0 0 15px}
  .wv-imgchip{display:flex;align-items:center;gap:8px}
  .wv-imgchip__t{width:46px;height:34px;overflow:hidden;background:#f4f4f3;flex:0 0 46px}
  .wv-imgchip__t img{width:100%;height:100%;object-fit:cover}
  .wv-imgchip__nme{font-size:11.5px;color:var(--graphite);flex:1}
  .wv-imgchip__rm{font-size:14px;color:var(--steel);background:none;border:0;cursor:pointer}
  .wv-card__foot{margin-top:auto;display:flex;align-items:center;justify-content:space-between;gap:8px}
  .wv-card__price{font-size:13px;font-weight:600;color:var(--graphite)}
  .wv-add{display:inline-flex;align-items:center;gap:6px;padding:10px 16px;background:var(--ink);color:var(--paper);font-size:13px;font-weight:600;border:0;cursor:pointer;font-family:var(--body)}
  .wv-add--ghost{background:var(--paper);color:var(--ink);border:1px solid var(--ink)}
```

- [ ] **Step 4: Reflect editing items in the floating cart**

In the vanilla cart `<Script>` (`app/book/page.tsx`, the `render()` function around lines 1470–1505), after the existing `items.forEach(...)` loop that appends `.cart__item` rows and before `amt.textContent = …`, insert a read of `wv-editing` so the client sees their editing picks in the cart (POA, no subtotal change):

```js
    // Reflect booking-time virtual-editing picks (POA — no subtotal change).
    try {
      const editing = JSON.parse(sessionStorage.getItem('wv-editing') || '[]');
      editing.forEach((e) => {
        const label = ({
          virtual_staging: 'Virtual staging',
          declutter: 'Decluttering',
          day_to_dusk: 'Day-to-dusk',
        })[e.service] || e.service;
        const scope = e.mode === 'all' ? 'all rooms' : (e.roomCount + ' room' + (e.roomCount === 1 ? '' : 's'));
        const row = document.createElement('div');
        row.className = 'cart__item';
        row.innerHTML = '<div class="cart__item__name">' + label + ' · ' + scope + '</div>' +
                        '<div class="cart__item__price">POA</div>';
        list.appendChild(row);
      });
    } catch (_) {}
```

Then, still inside the cart `<Script>`, register a listener so the cart re-renders when the island changes (add near the other top-level listeners, e.g. just after `cards.forEach(card => card.addEventListener('click', …))`):

```js
  window.addEventListener('wv-editing-changed', () => { render(); openCart({auto:true}); });
```

And make the cart's empty-state logic account for editing: in `render()`, where it decides whether the cart is empty (the `empty.hidden` / `list.hidden` toggle and the `next.disabled` toggle), include editing length. Replace the existing emptiness check (the `const has = items.size > 0;` style line — match the real variable name in context) so it reads:

```js
    let editingCount = 0;
    try { editingCount = JSON.parse(sessionStorage.getItem('wv-editing') || '[]').length; } catch (_) {}
    const hasAny = items.size > 0 || editingCount > 0;
```

and use `hasAny` for the empty/hidden/disabled toggles and `count.textContent = items.size + editingCount;`.

- [ ] **Step 5: Browser smoke — boot dev + render /book**

Run: `cd ~/Code/won-vision && npm run dev` (note the port, default 3000) then in a second shell:
`curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/book`
Expected: `200`. Leave the dev server running for Task 6.

- [ ] **Step 6: Commit**

```bash
cd ~/Code/won-vision
git add app/book/page.tsx
git commit -m "feat(booking): mount VirtualEditingSection + cart reflection + styles

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Carry editing into the booking payload

**Files:**
- Modify: `app/book/confirmation/page.tsx` (read `wv-editing` at ~line 260; add `editing` to `booking` at ~line 407; clear `wv-editing` at ~line 504)

- [ ] **Step 1: Read `wv-editing` alongside the cart**

In `app/book/confirmation/page.tsx`, after the existing line ~260 `let cart = JSON.parse(sessionStorage.getItem('wv-cart') || '[]');`, add:

```ts
    let editing = JSON.parse(sessionStorage.getItem('wv-editing') || '[]');
```

- [ ] **Step 2: Add `editing` to the booking object**

In the `booking` object literal (~line 407, where `services: cart,` is), add the `editing` field right after `services`:

```ts
      services: cart,
      editing: editing,
```

- [ ] **Step 3: Clear it on success**

After the existing `sessionStorage.removeItem('wv-cart');` (~line 504), add:

```ts
        sessionStorage.removeItem('wv-editing');
```

- [ ] **Step 4: Type-check + full unit suite**

Run: `cd ~/Code/won-vision && npx tsc --noEmit && npx vitest run`
Expected: `tsc` clean of new errors; vitest — `tests/booking-editing.test.ts` green and no previously-passing test newly broken.

- [ ] **Step 5: Commit**

```bash
cd ~/Code/won-vision
git add app/book/confirmation/page.tsx
git commit -m "feat(booking): carry wv-editing into the booking.editing payload

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Browser-verify (desktop + phone) against the dev server

**Files:**
- Create: `.mockups/book-live.mjs`

Per the mandatory browser-verify rule + the UX-laws Part-3 checklist. Drives the REAL dev server, not the static mockup.

- [ ] **Step 1: Write the screenshot script**

```js
// .mockups/book-live.mjs
import { chromium } from '@playwright/test';
const URL = process.env.BOOK_URL || 'http://localhost:3000/book#cat-staging';
async function shot(b, out, w, h, s) {
  const c = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: s });
  const p = await c.newPage();
  await p.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await p.waitForTimeout(800);
  // Open the first card, switch to Choose rooms, add a room slot — exercise the real UI.
  const addBtns = p.locator('.wv-add--ghost');
  if (await addBtns.count()) { await addBtns.first().click(); await p.waitForTimeout(200); }
  const choose = p.locator('.wv-mode', { hasText: 'Choose rooms' });
  if (await choose.count()) { await choose.first().click(); await p.waitForTimeout(200); }
  const plus = p.locator('.wv-sb', { hasText: '+' });
  if (await plus.count()) { await plus.first().click(); await p.waitForTimeout(200); }
  await p.locator('#cat-staging').scrollIntoViewIfNeeded();
  await p.screenshot({ path: out, fullPage: true });
  await c.close();
  console.log('wrote', out);
}
let b;
try { b = await chromium.launch(); } catch { b = await chromium.launch({ channel: 'chrome' }); }
await shot(b, '.mockups/book-live-desktop.png', 1280, 900, 2);
await shot(b, '.mockups/book-live-phone.png', 390, 844, 3);
await b.close();
```

- [ ] **Step 2: Run it (dev server from Task 4 still running)**

Run: `cd ~/Code/won-vision && node .mockups/book-live.mjs`
Expected: writes `book-live-desktop.png` + `book-live-phone.png`.

- [ ] **Step 3: Eyeball against the UX-laws Part-3 checklist**

Open both PNGs. Confirm: cards match the approved mockup; stepper caps at 3 with the "All rooms" note; tap targets ≥44px (the `−/+` buttons are 44px); the card reads clearly on a 390px phone (single column, no overflow); the "Added ✓" / mode toggle give obvious state feedback; the ref-photo drop is obvious. Note any miss and fix before sign-off.

- [ ] **Step 4: Commit the verification script**

```bash
cd ~/Code/won-vision
git add .mockups/book-live.mjs
git commit -m "test(booking): live browser-verify script for /book editing cards

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 5: Hand the screenshots to Kiran for sign-off before merge**

Send `book-live-desktop.png` + `book-live-phone.png`. Do NOT merge to `main` until Kiran confirms. (Deploy = push to `main` → Vercel; per repo CLAUDE.md, merge only when QA-signed-off + `tsc` + tests pass.)

---

## Self-Review (done at plan-write time)

- **Spec coverage (sub-project ①):** three cards ✓ (Task 3); All rooms / Choose rooms + stepper max 3 ✓ (Task 3 helpers Task 1); per-room name + optional ref photo ✓ (Task 3 + Task 2 upload); all-rooms note + refs ✓ (Task 3 `AllRoomsExtras`); POA, no pricing ✓ (Tasks 3–4); carry `editing[]` into payload ✓ (Task 5); cart reflects picks ✓ (Task 4); data contract matches spec §3 ✓ (Task 1 `EditingEntry`). Steps 2/3 (Ops, Vision Studio) are explicitly out of this plan.
- **Placeholder scan:** no TBD/TODO; every code step shows full code; test code is concrete.
- **Type consistency:** `EditingServiceId`, `EditingMode`, `EditingSelectionState`, `EditingEntry`, `buildEditingPayload`, `clampRoomCount`, `summarizeEditingEntry`, `EDITING_SERVICES`, `MAX_CHOOSE_ROOMS` are used identically across Tasks 1/3; sessionStorage key `wv-editing` and event `wv-editing-changed` consistent across Tasks 3/4/5; upload route path `/api/book/upload-ref` consistent across Tasks 2/3.
- **Known soft spots (flagged for the executor):** the cart `render()` integration (Task 4 Step 4) must match the real variable names in the existing `<Script>` (`items`, `list`, `count`, `empty`, `next`, `render`, `openCart`) — read the function first and adapt the insert points; the confirmation line numbers (~260/407/504) are anchors — match by surrounding code, not the literal line number.
