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
  const [state, setState] =
    useState<Record<EditingServiceId, EditingSelectionState>>(initialState);

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
                    <button
                      type="button"
                      className="wv-add wv-add--ghost"
                      onClick={() => toggle(svc.id)}
                    >
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
                          patch(svc.id, (st) => ({
                            ...st,
                            refImageUrls: [...st.refImageUrls, url],
                          }))
                        }
                      />
                    )}

                    <div className="wv-card__foot">
                      <span className="wv-card__price">
                        {s.mode === 'all'
                          ? 'All rooms'
                          : `${s.roomCount} room${s.roomCount === 1 ? '' : 's'}`}{' '}
                        · POA
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
