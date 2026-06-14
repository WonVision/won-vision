import { chromium } from '@playwright/test';
const URL = 'http://localhost:4399/book#cat-staging';
async function setup(p) {
  await p.goto(URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await p.waitForSelector('.wv-card', { state: 'attached', timeout: 30000 });
  await p.evaluate(() => document.documentElement.classList.remove('wv-loader-active','wv-noscroll'));
  await p.waitForTimeout(800);
  const cards = p.locator('.wv-card');
  // staging -> enable -> choose rooms (default) -> +1 (=2 rooms)
  await cards.nth(0).locator('.wv-add--ghost').click(); await p.waitForTimeout(150);
  await cards.nth(0).locator('.wv-sb', { hasText: '+' }).click(); await p.waitForTimeout(150);
  // declutter -> enable -> All rooms (show help text)
  await cards.nth(1).locator('.wv-add--ghost').click(); await p.waitForTimeout(150);
  await cards.nth(1).locator('.wv-mode', { hasText: 'All rooms' }).click(); await p.waitForTimeout(200);
  await p.locator('#cat-staging').scrollIntoViewIfNeeded(); await p.waitForTimeout(300);
}
async function clip(p) {
  const b = await p.locator('#cat-staging').boundingBox();
  const vw = p.viewportSize().width;
  return b ? { x:0, y:Math.max(0,b.y), width:vw, height:Math.min(b.height,1700) } : undefined;
}
let br; try { br = await chromium.launch(); } catch { br = await chromium.launch({ channel:'chrome' }); }
for (const [out,w,h,s] of [['.mockups/book-refine-desktop.png',1280,1000,2],['.mockups/book-refine-phone.png',390,844,3]]) {
  const c = await br.newContext({ viewport:{width:w,height:h}, deviceScaleFactor:s });
  const p = await c.newPage(); await setup(p);
  await p.screenshot({ path: out, clip: await clip(p) }); await c.close(); console.log('wrote', out);
}
await br.close();
