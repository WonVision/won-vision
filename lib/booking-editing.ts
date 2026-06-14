export type EditingServiceId = 'virtual_staging' | 'declutter' | 'day_to_dusk';
export type EditingMode = 'all' | 'choose';

export const MAX_CHOOSE_ROOMS = 5;

/** The most generic room choices for the per-room dropdown; "Other" (free text)
 *  is appended by the UI. */
export const ROOM_OPTIONS = ['Living room', 'Bedroom', 'Kitchen', 'Outdoor area'] as const;

/** Shown when "All rooms" is selected, so the client knows what it covers. */
export const ALL_ROOMS_HELP =
  'Every base room that suits the edit — living rooms, bedrooms, kitchen, outdoor patio, etc. We use our judgement on the property.';

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
