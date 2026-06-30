import { describe, it, expect } from 'vitest';

// Canonical copy of the on-site shoot-duration model. The runtime copies live
// inline in won-vision/app/book/schedule/page.tsx and ops/public/booking-submit.js
// (a <Script> template-string blob + a vanilla served file — neither can import).
// This test pins the agreed numbers; keep all three in sync.
function shootDurationMins(cats: string[]): number {
  const MINS: Record<string, number> = {
    photography: 45, photo: 45, video: 150, floorplan: 15, siteplan: 15, drone: 15,
  };
  const seen: Record<string, number> = {};
  (cats || []).forEach((raw) => {
    let c = String(raw).toLowerCase();
    if (c === 'photo') c = 'photography';
    if (c === 'siteplan') c = 'floorplan';
    seen[c] = MINS[c] || 0;
  });
  let total = 0;
  Object.keys(seen).forEach((k) => { total += seen[k]; });
  return Math.max(15, total);
}

describe('shootDurationMins', () => {
  it('photo-only = 45', () => {
    expect(shootDurationMins(['photography'])).toBe(45);
  });
  it('Essential (photo+floorplan+drone) = 75', () => {
    expect(shootDurationMins(['photography', 'floorplan', 'drone'])).toBe(75);
  });
  it('Signature (photo+floorplan+drone+video) = 225', () => {
    expect(shootDurationMins(['photography', 'floorplan', 'drone', 'video'])).toBe(225);
  });
  it('Cinematic — social adds nothing, still 225', () => {
    expect(shootDurationMins(['photography', 'floorplan', 'drone', 'video', 'social'])).toBe(225);
  });
  it('siteplan folds into floorplan (counted once)', () => {
    expect(shootDurationMins(['floorplan', 'siteplan'])).toBe(15);
  });
  it('duplicate categories are deduped', () => {
    expect(shootDurationMins(['photography', 'photography', 'photo'])).toBe(45);
  });
  it('off-site-only carts (social / virtual editing) hit the 15-min floor', () => {
    expect(shootDurationMins(['social', 'virtual-editing'])).toBe(15);
  });
  it('empty cart floors to 15', () => {
    expect(shootDurationMins([])).toBe(15);
  });
});
