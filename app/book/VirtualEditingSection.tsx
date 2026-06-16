'use client';

import { useEffect, useState } from 'react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import {
  ALL_ROOMS_HELP,
  EDITING_SERVICES,
  MAX_CHOOSE_ROOMS,
  ROOM_PHOTO_NOTE,
  buildEditingPayload,
  clampRoomCount,
  priceForEditing,
  type EditingMode,
  type EditingSelectionState,
  type EditingServiceId,
} from '../../lib/booking-editing';

/** AUD money, no decimals (prices are whole dollars). */
function aud(n: number): string {
  return '$' + n.toLocaleString('en-AU');
}

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
        Pick the rooms you want virtually edited — all the necessary rooms, or up to five specific
        rooms. Choose each room and (optional) drop a reference photo so we know exactly what you mean.
      </p>

      <div className="wv-edit__row">
        {EDITING_SERVICES.map((svc) => {
          const s = state[svc.id];
          return (
            <article key={svc.id} className={`wv-card${s.enabled ? ' is-on' : ''}`}>
              <div className="wv-card__media">
                <BeforeAfterSlider
                  beforeSrc={svc.beforeSrc}
                  afterSrc={svc.afterSrc}
                  beforeAlt={`${svc.label} — ${svc.beforeLabel.toLowerCase()}`}
                  afterAlt={`${svc.label} — ${svc.afterLabel.toLowerCase()}`}
                  label=""
                />
              </div>
              <div className="wv-card__body">
                <div className="wv-card__nm">{svc.label}</div>
                <div className="wv-card__desc">{svc.desc}</div>
                <div className="wv-card__note">{ROOM_PHOTO_NOTE}</div>

                {!s.enabled ? (
                  <div className="wv-card__foot">
                    <span className="wv-card__price">
                      {aud(svc.perRoom)}/room · all rooms {aud(svc.allRooms)}
                    </span>
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
                        <p className="wv-maxnote">Max 5 rooms · need more? choose “All rooms”</p>
                        <p className="wv-nextstep">
                          You’ll name each room and add reference photos on the next step.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="wv-allhelp">{ALL_ROOMS_HELP}</p>
                        <p className="wv-nextstep">
                          You’ll add any notes and reference photos on the next step.
                        </p>
                      </>
                    )}

                    <div className="wv-card__foot">
                      <span className="wv-card__price">
                        {s.mode === 'all'
                          ? 'All rooms'
                          : `${s.roomCount} room${s.roomCount === 1 ? '' : 's'}`}{' '}
                        · {aud(priceForEditing(svc.id, s.mode, s.roomCount))}
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

