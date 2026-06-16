'use client';

import { useEffect, useRef, useState } from 'react';
import { upload } from '@vercel/blob/client';
import {
  EDITING_SERVICES,
  ROOM_OPTIONS,
  summarizeEditingEntry,
  type EditingEntry,
  type EditingRoom,
} from '../../lib/booking-editing';

/** Collects the room names / notes / reference photos for the virtual-editing
 *  picks made on /book. Reads + writes the same `wv-editing` payload so the
 *  booking card stays the single source of truth; this just fills in the
 *  details that used to clutter the card. Renders nothing when no editing
 *  services were chosen. */
export default function EditingDetailsSection() {
  const [entries, setEntries] = useState<EditingEntry[] | null>(null);

  // Hydrate from sessionStorage on mount (client-only).
  useEffect(() => {
    try {
      const raw = JSON.parse(sessionStorage.getItem('wv-editing') || '[]');
      setEntries(Array.isArray(raw) ? raw : []);
    } catch {
      setEntries([]);
    }
  }, []);

  // Persist every change back to the same key the cart + confirmation read.
  useEffect(() => {
    if (!entries) return;
    try {
      sessionStorage.setItem('wv-editing', JSON.stringify(entries));
    } catch {
      /* sessionStorage unavailable — non-fatal */
    }
  }, [entries]);

  if (!entries || entries.length === 0) return null;

  function patch(i: number, fn: (e: EditingEntry) => EditingEntry) {
    setEntries((prev) => (prev ? prev.map((e, idx) => (idx === i ? fn(e) : e)) : prev));
  }

  function labelFor(service: EditingEntry['service']): string {
    return EDITING_SERVICES.find((s) => s.id === service)?.label ?? service;
  }

  return (
    <section className="wv-edit-details">
      <h3>Virtual editing details</h3>
      <p className="wv-ed__lede">
        Tell us exactly which rooms to edit and (optional) drop a reference photo so we nail the
        look. One room = one photo.
      </p>

      {entries.map((e, i) => (
        <div key={`${e.service}-${i}`} className="wv-ed__svc">
          <div className="wv-ed__svc-head">
            <span className="wv-ed__svc-name">{labelFor(e.service)}</span>
            <span className="wv-ed__svc-scope">{summarizeEditingEntry(e)}</span>
          </div>

          {e.mode === 'choose' ? (
            <div className="wv-ed__rooms">
              {Array.from({ length: e.roomCount ?? 1 }).map((_, r) => {
                const room: EditingRoom = e.rooms[r] ?? { name: '', refImageUrl: null };
                return (
                  <RoomSlot
                    key={r}
                    index={r}
                    room={room}
                    onName={(name) =>
                      patch(i, (en) => {
                        const rooms = ensureLen(en.rooms, e.roomCount ?? 1);
                        rooms[r] = { ...rooms[r], name };
                        return { ...en, rooms };
                      })
                    }
                    onImage={(url) =>
                      patch(i, (en) => {
                        const rooms = ensureLen(en.rooms, e.roomCount ?? 1);
                        rooms[r] = { ...rooms[r], refImageUrl: url };
                        return { ...en, rooms };
                      })
                    }
                  />
                );
              })}
            </div>
          ) : (
            <AllRoomsExtras
              note={e.note ?? ''}
              refImageUrls={e.refImageUrls}
              onNote={(note) => patch(i, (en) => ({ ...en, note }))}
              onImage={(url) =>
                patch(i, (en) => ({ ...en, refImageUrls: [...en.refImageUrls, url] }))
              }
            />
          )}
        </div>
      ))}

      <style>{`
        .wv-edit-details{margin-top:8px}
        .wv-edit-details > h3{font-family:var(--display);font-weight:500;letter-spacing:-0.01em}
        .wv-ed__lede{font-family:var(--body);font-size:12.5px;line-height:1.55;color:var(--graphite);margin:4px 0 16px;max-width:60ch}
        .wv-ed__svc{border:1px solid rgba(74,74,72,0.16);padding:14px;margin-bottom:14px;background:var(--paper)}
        .wv-ed__svc-head{display:flex;align-items:baseline;justify-content:space-between;gap:10px;margin-bottom:10px}
        .wv-ed__svc-name{font-family:var(--display);font-weight:500;font-size:16px;color:var(--ink);letter-spacing:-0.005em}
        .wv-ed__svc-scope{font-family:var(--body);font-size:11px;letter-spacing:0.04em;text-transform:uppercase;color:var(--steel)}
        .wv-ed__rooms{display:flex;flex-direction:column;gap:8px}
        .wv-slot{border:1px solid rgba(74,74,72,0.18);padding:8px;display:flex;flex-direction:column;gap:8px}
        .wv-slot__top{display:flex;align-items:center;gap:8px}
        .wv-slot__idx{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--steel);white-space:nowrap}
        .wv-inp{flex:1;border:1px solid rgba(74,74,72,0.18);padding:10px 12px;font-family:var(--body);font-size:13px;color:var(--ink);background:var(--paper);min-width:0}
        .wv-select{min-height:42px;cursor:pointer;appearance:auto}
        .wv-maxnote{font-size:10.5px;color:var(--steel);margin:0}
        .wv-drop{display:flex;align-items:center;gap:8px;width:100%;border:1px dashed var(--steel);padding:10px 12px;font-size:11.5px;color:var(--steel);background:var(--paper);cursor:pointer;font-family:var(--body);text-align:left}
        .wv-drop svg{width:15px;height:15px;flex:0 0 15px}
        .wv-imgchip{display:flex;align-items:center;gap:8px}
        .wv-imgchip__t{width:46px;height:34px;overflow:hidden;background:#f4f4f3;flex:0 0 46px}
        .wv-imgchip__t img{width:100%;height:100%;object-fit:cover}
        .wv-imgchip__nme{font-size:11.5px;color:var(--graphite);flex:1}
        .wv-imgchip__rm{font-size:14px;color:var(--steel);background:none;border:0;cursor:pointer}
      `}</style>
    </section>
  );
}

/** Return a copy of `rooms` padded to at least `len` blank slots. */
function ensureLen(rooms: EditingRoom[], len: number): EditingRoom[] {
  const next = rooms.slice();
  while (next.length < len) next.push({ name: '', refImageUrl: null });
  return next;
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
  const isPreset = (ROOM_OPTIONS as readonly string[]).includes(room.name);
  // "Other" mode = a custom name (non-empty, non-preset), or the user explicitly
  // picked Other and hasn't typed yet (tracked locally).
  const [otherMode, setOtherMode] = useState(room.name !== '' && !isPreset);
  const selectValue = otherMode ? 'Other' : isPreset ? room.name : '';

  function onSelect(v: string) {
    if (v === 'Other') {
      setOtherMode(true);
      onName('');
    } else {
      setOtherMode(false);
      onName(v);
    }
  }

  return (
    <div className="wv-slot">
      <div className="wv-slot__top">
        <span className="wv-slot__idx">Room {index + 1}</span>
        <select
          className="wv-inp wv-select"
          value={selectValue}
          onChange={(e) => onSelect(e.target.value)}
          aria-label={`Room ${index + 1}`}
        >
          <option value="" disabled>
            Which room?
          </option>
          {ROOM_OPTIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
          <option value="Other">Other…</option>
        </select>
      </div>
      {otherMode && (
        <input
          className="wv-inp"
          placeholder="Type the room name"
          value={room.name}
          onChange={(e) => onName(e.target.value)}
        />
      )}
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
      <RefDrop
        url={null}
        label="Add reference photos (optional)"
        onImage={(u) => u && onImage(u)}
      />
      {refImageUrls.length > 0 && (
        <p className="wv-maxnote">
          {refImageUrls.length} reference photo{refImageUrls.length === 1 ? '' : 's'} added
        </p>
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
        <button
          type="button"
          className="wv-imgchip__rm"
          aria-label="Remove reference photo"
          onClick={() => onImage(null)}
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <>
      <button type="button" className="wv-drop" onClick={() => inputRef.current?.click()} disabled={busy}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M5 19h14M12 15V5M8 9l4-4 4 4" strokeLinecap="square" />
        </svg>
        {busy ? 'Uploading…' : (err ?? label)}
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
