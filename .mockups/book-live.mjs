import { chromium } from '@playwright/test';
const URL = process.env.BOOK_URL || 'http://localhost:4399/book#cat-staging';
async function shot(b, out, w, h, s) {
  const c = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: s });
  const p = await c.newPage();
  await p.goto(URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await p.waitForSelector('.wv-card', { state: 'attached', timeout: 30000 });
  // Clear the site intro-loader (full-screen overlay + scroll lock) so the
  // page is reachable for screenshotting.
  await p.evaluate(() => document.documentElement.classList.remove('wv-loader-active', 'wv-noscroll'));
  await p.waitForTimeout(700);
  await p.locator('#cat-staging').scrollIntoViewIfNeeded();
  // Open the first card -> Choose rooms -> +1 room, to exercise the real UI.
  const addBtns = p.locator('.wv-add--ghost');
  if (await addBtns.count()) { await addBtns.first().click(); await p.waitForTimeout(200); }
  const choose = p.locator('.wv-mode', { hasText: 'Choose rooms' });
  if (await choose.count()) { await choose.first().click(); await p.waitForTimeout(200); }
  const plus = p.locator('.wv-sb', { hasText: '+' });
  if (await plus.count()) { await plus.first().click(); await p.waitForTimeout(200); }
  await p.locator('#cat-staging').scrollIntoViewIfNeeded();
  await p.waitForTimeout(300);
  await p.screenshot({ path: out, fullPage: false, clip: await sectionClip(p) });
  await c.close();
  console.log('wrote', out);
}
async function sectionClip(p) {
  const box = await p.locator('#cat-staging').boundingBox();
  if (!box) return undefined;
  const vw = p.viewportSize().width;
  return { x: 0, y: Math.max(0, box.y), width: vw, height: Math.min(box.height, 1600) };
}
let b;
try { b = await chromium.launch(); } catch { b = await chromium.launch({ channel: 'chrome' }); }
await shot(b, '.mockups/book-live-desktop.png', 1280, 1000, 2);
await shot(b, '.mockups/book-live-phone.png', 390, 844, 3);
await b.close();
