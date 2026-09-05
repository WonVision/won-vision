import { test, expect } from '@playwright/test';

const PORTAL_BOOK = 'https://portal.wonvision.com.au/book';

// Redirects that stay on this site. These follow through to a real page.
const internal = [
  { from: '/index.html',   to: '/' },
  { from: '/gallery.html', to: '/gallery' },
  { from: '/operate',      to: '/' },
];

for (const r of internal) {
  test(`redirect ${r.from} → ${r.to}`, async ({ page }) => {
    const response = await page.goto(r.from, { waitUntil: 'commit' });
    expect(response?.status()).toBe(200);
    expect(new URL(page.url()).pathname).toBe(r.to);
  });
}

// Booking moved to the standalone portal. Assert the Location header rather
// than following the hop, so the suite never depends on the portal being up.
const toPortal = [
  '/book',
  '/book/cart',
  '/book/checkout',
  '/book/schedule',
  '/book/confirmation',
  '/book.html',
  '/book-checkout.html',
  '/book-schedule.html',
  '/book-confirmation.html',
];

for (const from of toPortal) {
  test(`redirect ${from} → portal`, async ({ request }) => {
    const response = await request.get(from, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers()['location']).toBe(PORTAL_BOOK);
  });
}
