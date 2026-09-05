import { test, expect } from '@playwright/test';

const routes = [
  { path: '/',        title: /Won Vision/ },
  { path: '/gallery', title: /Gallery/ },
  { path: '/privacy', title: /Privacy/ },
  { path: '/terms',   title: /Terms/ },
];

for (const r of routes) {
  test(`smoke ${r.path} renders 200, has title, no console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (msg) => {
      if (msg.type() !== 'error') return;
      const text = msg.text();
      // Ignore network 404s on third-party trackers/pixels — not page-breaking JS errors
      if (text.includes('Failed to load resource')) return;
      errors.push(text);
    });

    const response = await page.goto(r.path);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(r.title);
    expect(errors).toEqual([]);
  });
}
