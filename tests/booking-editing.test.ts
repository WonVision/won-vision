import { describe, it, expect } from 'vitest';
import {
  clampRoomCount,
  buildEditingPayload,
  summarizeEditingEntry,
  priceForEditing,
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
        price: 40, // virtual_staging $20/room × 2 rooms
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
        price: 50, // declutter all-rooms flat
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
        price: 79,
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
        price: 10,
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
        price: 30,
      }),
    ).toBe('Day-to-dusk · 2 rooms'));
});

describe('priceForEditing', () => {
  it('prices all-rooms at the flat rate', () => {
    expect(priceForEditing('virtual_staging', 'all', null)).toBe(79);
    expect(priceForEditing('declutter', 'all', null)).toBe(50);
    expect(priceForEditing('day_to_dusk', 'all', null)).toBe(70);
  });

  it('prices chosen rooms at per-room × count', () => {
    expect(priceForEditing('virtual_staging', 'choose', 3)).toBe(60);
    expect(priceForEditing('declutter', 'choose', 2)).toBe(20);
    expect(priceForEditing('day_to_dusk', 'choose', 1)).toBe(15);
  });

  it('clamps room count into range before pricing', () => {
    expect(priceForEditing('declutter', 'choose', 0)).toBe(10); // clamps to 1
    expect(priceForEditing('declutter', 'choose', 99)).toBe(10 * MAX_CHOOSE_ROOMS);
    expect(priceForEditing('virtual_staging', 'choose', null)).toBe(20); // defaults to 1
  });
});
