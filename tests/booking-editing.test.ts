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
  return {
    enabled: false,
    mode: 'choose',
    roomCount: 1,
    rooms: [{ name: '', refImageUrl: null }],
    note: '',
    refImageUrls: [],
  };
}

describe('clampRoomCount', () => {
  it('clamps below 1 up to 1', () => expect(clampRoomCount(0)).toBe(1));
  it('clamps above max down to max', () => expect(clampRoomCount(9)).toBe(MAX_CHOOSE_ROOMS));
  it('passes valid through', () => expect(clampRoomCount(2)).toBe(2));
});

describe('EDITING_SERVICES', () => {
  it('has the three services in order', () =>
    expect(EDITING_SERVICES.map((s) => s.id)).toEqual([
      'virtual_staging',
      'declutter',
      'day_to_dusk',
    ]));
});

describe('buildEditingPayload', () => {
  it('omits services that are not enabled', () => {
    const state = { virtual_staging: blank(), declutter: blank(), day_to_dusk: blank() };
    expect(buildEditingPayload(state)).toEqual([]);
  });

  it('serializes a choose-rooms entry, trimming names and dropping rooms beyond roomCount', () => {
    const state = { virtual_staging: blank(), declutter: blank(), day_to_dusk: blank() };
    state.virtual_staging = {
      enabled: true,
      mode: 'choose',
      roomCount: 2,
      rooms: [
        { name: '  Living room ', refImageUrl: 'https://blob/living.jpg' },
        { name: 'Master', refImageUrl: null },
        { name: 'Extra', refImageUrl: null }, // beyond roomCount -> dropped
      ],
      note: 'ignored when choose',
      refImageUrls: ['ignored'],
    };
    expect(buildEditingPayload(state)).toEqual([
      {
        service: 'virtual_staging',
        mode: 'choose',
        roomCount: 2,
        rooms: [
          { name: 'Living room', refImageUrl: 'https://blob/living.jpg' },
          { name: 'Master', refImageUrl: null },
        ],
        note: null,
        refImageUrls: [],
      },
    ]);
  });

  it('serializes an all-rooms entry with note + ref images, no rooms/roomCount', () => {
    const state = { virtual_staging: blank(), declutter: blank(), day_to_dusk: blank() };
    state.declutter = {
      enabled: true,
      mode: 'all',
      roomCount: 1,
      rooms: [{ name: 'ignored', refImageUrl: null }],
      note: '  remove the bins  ',
      refImageUrls: ['https://blob/a.jpg'],
    };
    expect(buildEditingPayload(state)).toEqual([
      {
        service: 'declutter',
        mode: 'all',
        roomCount: null,
        rooms: [],
        note: 'remove the bins',
        refImageUrls: ['https://blob/a.jpg'],
      },
    ]);
  });

  it('normalizes an empty all-rooms note to null', () => {
    const state = { virtual_staging: blank(), declutter: blank(), day_to_dusk: blank() };
    state.day_to_dusk = {
      enabled: true,
      mode: 'all',
      roomCount: 1,
      rooms: [],
      note: '   ',
      refImageUrls: [],
    };
    expect(buildEditingPayload(state)[0].note).toBeNull();
  });
});

describe('summarizeEditingEntry', () => {
  it('summarizes all-rooms', () =>
    expect(
      summarizeEditingEntry({
        service: 'virtual_staging',
        mode: 'all',
        roomCount: null,
        rooms: [],
        note: null,
        refImageUrls: [],
      }),
    ).toBe('Virtual staging · all rooms'));
  it('summarizes a single room', () =>
    expect(
      summarizeEditingEntry({
        service: 'declutter',
        mode: 'choose',
        roomCount: 1,
        rooms: [{ name: 'Kitchen', refImageUrl: null }],
        note: null,
        refImageUrls: [],
      }),
    ).toBe('Decluttering · 1 room'));
  it('summarizes multiple rooms', () =>
    expect(
      summarizeEditingEntry({
        service: 'day_to_dusk',
        mode: 'choose',
        roomCount: 2,
        rooms: [],
        note: null,
        refImageUrls: [],
      }),
    ).toBe('Day-to-dusk · 2 rooms'));
});
