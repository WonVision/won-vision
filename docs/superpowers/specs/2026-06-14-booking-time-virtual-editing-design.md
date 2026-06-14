# Booking-time virtual editing — design spec

**Date:** 2026-06-14
**Status:** Approved design → ready for implementation planning
**Repos touched:** `won-vision` (booking), `outbound-ops` (booking backend + client portal), `vision-showpiece` (Vision Studio)

---

## 1. Problem / intent

Today, clients pick virtual editing (virtual staging, decluttering, day-to-dusk)
**after** the shoot, per-photo, in the **client portal**. That post-shoot picker
also acts as a **send-gate**: Vision Studio blocks delivery until the client has
"reviewed" the shoot (with a "Deliver anyway" override). The forward of those
portal picks into Vision Studio was never finished (a stub).

**We are flipping this:** the client chooses virtual editing **up front, at
booking time**. The portal stops being a picker and becomes a simple status +
delivery view.

### Why
- The client knows what they want when they book — no reason to defer it.
- Removes a confusing post-shoot step and an artificial delivery gate.
- Gives the photographer a clear **work order** before they even pick up the camera.

---

## 2. Locked decisions

1. **Where editing is chosen:** the Won Vision **booking page** (`won-vision/app/book`).
2. **Per-service card** — one card each for **Virtual staging**, **Decluttering**,
   **Day-to-dusk**. Each card offers:
   - **All rooms** — applies the edit to **all the necessary rooms** (the living
     spaces that actually benefit — e.g. living room, bedroom, outdoor patio —
     decided on the real property; NOT literally every one of the ~30 delivered
     photos), OR
   - **Choose rooms** — a `− / +` stepper, **max 3 rooms** (above 3 → must pick "All rooms").

   **Unit = rooms, not photos.** One "room" may map to several delivered photos of
   that room; the photographer applies the edit to the room. "All rooms" is the
   photographer's judgement of which rooms are necessary.
3. **Which rooms (agent specifies at booking):** for **Choose rooms**, each room
   slot has a **"which room?"** text field **+ an optional reference photo** drop.
   For **All rooms**, one optional note + optional reference photos for the property.
4. **Pricing:** **not in scope now.** Cards show **POA**; the layout reserves the
   price slot for later.
5. **Send-gate:** **removed entirely.** Once photos are edited the photographer
   just delivers. No client-review gate, no "Deliver anyway".
6. **Client portal (post-change):** no picker. It shows **"Your photos are being
   edited…"**, then flips to the **delivered gallery + a Dropbox link**.
7. **Notification:** when a booking with virtual editing comes in, the Vision Studio
   bell fires **"New booking · {address} · {work order}"** (e.g. *"2 rooms staged,
   declutter all, 1 day-to-dusk"*).

---

## 3. The shared data contract (the glue across all 3 repos)

A single **editing work order** object is produced at booking and threads
booking → Ops → Vision Studio unchanged. Proposed shape (per service):

```jsonc
// booking.editing  — array, one entry per chosen service
[
  {
    "service": "virtual_staging",        // "virtual_staging" | "declutter" | "day_to_dusk"
    "mode": "choose",                    // "all" = all necessary rooms | "choose" = specific rooms
    "roomCount": 2,                       // present when mode = "choose" (1..3); null when "all"
    "rooms": [                            // present when mode = "choose"
      { "name": "Living room", "refImageUrl": "https://blob.../living-ref.jpg" },
      { "name": "Master bedroom", "refImageUrl": null }
    ],
    "note": null,                         // present when mode = "all" (optional free text)
    "refImageUrls": []                    // present when mode = "all" (optional)
  }
]
```

- **Reference images** are uploaded to blob storage at booking time; the payload
  carries **URLs only** (sessionStorage cannot hold image bytes). Storage choice
  (Vercel Blob on won-vision vs. an Ops upload endpoint) is a sub-project-1
  implementation decision; the contract above is storage-agnostic.
- `service` enum values must match the edit-type vocabulary Vision Studio already
  uses (verify against `outbound-ops/src/lib/edit-pricing.ts` and the Vision Studio
  `editTypes` vocabulary during sub-project 2/3 so nothing drifts).

---

## 4. Sub-projects (sequenced — build in this order)

### Sub-project 1 — Booking cards (won-vision) ← BUILD FIRST
- Replace the info-only virtual-editing block
  (`won-vision/app/book/page.tsx:1095–1126`, the three `BeforeAfterSlider`s) with
  three interactive `.svc-card`-style cards (mockup: `.mockups/booking-editing-*.png`).
- Card behaviour: All rooms / Choose rooms toggle; `−/+` stepper capped at 3;
  per-room name + optional reference-photo upload; all-rooms note + optional refs.
- Reference-photo upload → blob storage → URL.
- Carry the `editing[]` array (section 3) into the booking payload built in
  `won-vision/app/book/confirmation/page.tsx` (currently `booking.services`; add
  `booking.editing`). Cart/summary line shows e.g. *"Virtual staging · 2 rooms"*.
- **No pricing math** — POA.
- **Verify:** browser at 1280 desktop + 390 phone; UX-laws checklist; the payload
  carries the work order (log/inspect the submitted object).

### Sub-project 2 — Ops booking backend + portal (outbound-ops)
- Accept `booking.editing[]` in the booking-submit path; persist the work order on
  the job/shoot record; forward it to Vision Studio (real call, replacing the stub).
- **Remove** the portal edit-picker: `VisionStudioSection` + `VisionEditModal`
  (`src/app/portal/[token]/page.tsx:1484–2071`) and the `submit-edit-request` route.
- **Repurpose the portal** to: "being edited" status → delivered gallery + Dropbox link.
- Keep token-based portal access and the gallery/download.

### Sub-project 3 — Vision Studio (vision-showpiece)
- **Ingest** the booking work order; show it as a **work-order panel** on the shoot
  page (rooms + reference images, per service).
- **Notification:** new kind for "new booking with work order" (replaces
  `ops.client_submission`); bell copy = *"New booking · {address} · {work order}"*.
- **Remove the send-gate:** delete `shootHasClientReview()` use in `/api/export`
  (`app/api/export/route.ts:96–129`) and `send-bulk`; remove `clientSubmitted` from
  the frames API + `use-shoot-frames`; remove the "Deliver anyway" UI and the
  `clientSubmitted` arg in `isSendable()` (`components/editor-send-bar.tsx`,
  `components/frame-grid.tsx`).
- **Orphans:** retire `clientSubmissions` ingest semantics / `ops.client_submission`
  notification (the old client-submission route + table usage). Confirm nothing else
  reads them before deleting vs. repurposing.

---

## 5. Out of scope (now)

- Pricing / line-item math for room counts (POA placeholder; revisit when pricing set).
- The Delivery-surface redesign (separate, already-brainstormed spec) — this spec is
  a **prerequisite** because it removes the client-review gate the Delivery design
  assumed. Delivery resumes after this.
- Reference-image → AI-staging wiring (the work order surfaces the images to the
  photographer; auto-feeding them into the staging model is a later enhancement).

---

## 6. Open implementation questions (resolve during planning, not design)

- Reference-image storage location + size/format limits + cleanup.
- Exact `service` enum alignment with existing Ops/Vision-Studio edit-type strings.
- Whether the work order is stored on the Ops `job` row, the Vision Studio `shoot`
  row, or both (source of truth = Ops booking; Vision Studio gets a copy).
