'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Wordmark } from '../../components/Wordmark';
import { EDITING_SERVICES, type EditingEntry } from '../../../lib/booking-editing';

type CartItem = {
  name: string;
  price: number;
  img: string;
  categories: string[];
};

function editLabel(e: EditingEntry): string {
  return EDITING_SERVICES.find((s) => s.id === e.service)?.label ?? e.service;
}
function editScope(e: EditingEntry): string {
  return e.mode === 'all'
    ? 'All rooms'
    : `${e.roomCount} room${e.roomCount === 1 ? '' : 's'}`;
}
function readEditing(): EditingEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = JSON.parse(sessionStorage.getItem('wv-editing') || '[]');
    return Array.isArray(raw) ? raw : [];
  } catch (_) {
    return [];
  }
}
function writeEditing(items: EditingEntry[]) {
  try { sessionStorage.setItem('wv-editing', JSON.stringify(items)); } catch (_) {}
}

const SITE_PLAN: CartItem = {
  name: 'Site Plan',
  price: 49,
  img: '/images/site-plan.webp',
  categories: ['siteplan'],
};
const SOCIAL_REEL: CartItem = {
  name: 'Social media reel',
  price: 100,
  img: '/images/social-media-reel-poster.webp',
  categories: ['social'],
};

const PACKAGE_PREFIXES = ['Essential —', 'Signature —', 'Cinematic —'];

function readCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = JSON.parse(sessionStorage.getItem('wv-cart') || '[]');
    return Array.isArray(raw) ? raw : [];
  } catch (_) {
    return [];
  }
}
function writeCart(items: CartItem[]) {
  try { sessionStorage.setItem('wv-cart', JSON.stringify(items)); } catch (_) {}
}
function fmt(n: number) { return '$' + Number(n).toLocaleString('en-AU'); }

function PlanIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={18} height={18}>
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={18} height={18}>
      <rect x="6" y="3" width="12" height="18" rx="2.5" />
      <line x1="11" y1="18.5" x2="13" y2="18.5" />
    </svg>
  );
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [editing, setEditing] = useState<EditingEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readCart());
    setEditing(readEditing());
    setHydrated(true);
  }, []);

  const subtotal = useMemo(
    () =>
      items.reduce((s, it) => s + (Number(it.price) || 0), 0) +
      editing.reduce((s, e) => s + (Number(e.price) || 0), 0),
    [items, editing],
  );
  const hasAny = items.length > 0 || editing.length > 0;

  function update(next: CartItem[]) { setItems(next); writeCart(next); }
  function remove(name: string) { update(items.filter(i => i.name !== name)); }
  function removeEditing(idx: number) {
    const next = editing.filter((_, i) => i !== idx);
    setEditing(next);
    writeEditing(next);
  }

  // Recommend the counterpart upsells: a floor plan in the cart → Site Plan;
  // a video in the cart → Social media reel. Show whichever isn't there yet.
  const hasFloorplan = items.some(i => Array.isArray(i.categories) && i.categories.includes('floorplan'));
  const hasVideo = items.some(i => Array.isArray(i.categories) && i.categories.includes('video'));
  const hasSite = items.some(i => i.name === SITE_PLAN.name || i.name === 'Floor Plan + Site Plan' || (Array.isArray(i.categories) && i.categories.includes('siteplan')));
  const hasReel = items.some(i => i.name === SOCIAL_REEL.name || (Array.isArray(i.categories) && i.categories.includes('social')));

  const showSiteAddon = hasFloorplan && !hasSite;
  const showReelAddon = hasVideo && !hasReel;

  function addReel() { update([...items, SOCIAL_REEL]); }
  function addSite() { update([...items, SITE_PLAN]); }

  return (
    <>
      <header className="nav is-stuck">
        <div className="nav__brand">
          <Link href="/#top" data-home aria-label="Won Vision — home"><Wordmark /></Link>
        </div>
        <nav className="nav__links">
          <Link href="/#services">Services</Link>
          <Link href="/#contact">Contact</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/operate">How we operate</Link>
        </nav>
        <div className="nav__right">
          <Link href="/book" className="nav__cta">Book now</Link>
        </div>
        <button className="nav__burger" aria-label="Menu"><span></span><span></span><span></span></button>
      </header>
      <aside className="nav__drawer" aria-hidden="true">
        <ul>
          <li><Link href="/#services">Services</Link></li>
          <li><Link href="/#contact">Contact</Link></li>
          <li><Link href="/gallery"><em>Gallery</em></Link></li>
          <li><Link href="/operate">How we operate</Link></li>
          <li><Link href="/book" className="drawer-cta">Book now →</Link></li>
        </ul>
        <div className="nav__drawer__foot"><span>Won Vision</span><span>Melbourne · 2026</span></div>
      </aside>

      <section className="step-page">
        <div className="progress">
          <div className="progress__step is-active"><span className="progress__num">1</span><span>Cart</span></div>
          <span className="progress__line"></span>
          <div className="progress__step"><span className="progress__num">2</span><span>Details</span></div>
          <span className="progress__line"></span>
          <div className="progress__step"><span className="progress__num">3</span><span>Schedule</span></div>
          <span className="progress__line"></span>
          <div className="progress__step"><span className="progress__num">4</span><span>Confirm</span></div>
        </div>

        <div className="step-inner">
          <div className="step-form">
            <h2>Your <em>cart.</em></h2>
            <p className="lede">Review the line items. Add any recommended extras below. Then continue to details.</p>

            {hydrated && !hasAny && (
              <div className="cart-empty">
                <h3>No services yet.</h3>
                <p>Browse the catalogue and add what your listing needs.</p>
                <Link href="/book" className="cart-empty__cta">← Browse services</Link>
              </div>
            )}

            {hydrated && hasAny && (
              <>
                <section>
                  <h3>Line items</h3>
                  <ul className="cart-lines">
                    {items.map((it) => (
                      <li key={it.name} className="cart-line">
                        <div className="cart-line__thumb" style={{ backgroundImage: it.img ? `url('${it.img}')` : 'none' }} />
                        <div className="cart-line__info">
                          <div className="cart-line__name">{it.name}</div>
                          <div className="cart-line__price">{Number(it.price) === 0 ? 'POA' : fmt(it.price)}</div>
                        </div>
                        <button type="button" className="cart-line__remove" aria-label={`Remove ${it.name}`} onClick={() => remove(it.name)}>×</button>
                      </li>
                    ))}
                    {editing.map((e, idx) => (
                      <li key={`edit-${idx}`} className="cart-line">
                        <div className="cart-line__thumb cart-line__thumb--edit" aria-hidden="true" />
                        <div className="cart-line__info">
                          <div className="cart-line__name">{editLabel(e)}</div>
                          <div className="cart-line__price">{editScope(e)} · {Number(e.price) === 0 ? 'POA' : fmt(e.price)}</div>
                        </div>
                        <button type="button" className="cart-line__remove" aria-label={`Remove ${editLabel(e)}`} onClick={() => removeEditing(idx)}>×</button>
                      </li>
                    ))}
                  </ul>
                </section>

                {(showSiteAddon || showReelAddon) && (
                  <section className="cart-addons">
                    <h3>Recommended add-ons</h3>
                    {showSiteAddon && (
                      <div className="cart-addons__row">
                        <div className="cart-addons__thumb"><PlanIcon /></div>
                        <div className="cart-addons__info">
                          <div className="cart-addons__name">Site Plan</div>
                          <div className="cart-addons__desc">Standalone site plan with boundaries, orientation and lot dimensions — pairs with your floor plan.</div>
                        </div>
                        <div className="cart-addons__price">$49</div>
                        <button type="button" className="cart-addons__add" onClick={addSite}>Add</button>
                      </div>
                    )}
                    {showReelAddon && (
                      <div className="cart-addons__row">
                        <div className="cart-addons__thumb"><PhoneIcon /></div>
                        <div className="cart-addons__info">
                          <div className="cart-addons__name">Social media reel</div>
                          <div className="cart-addons__desc">A vertical 9:16 reel cut from your listing footage — built for Instagram Reels, TikTok and Facebook.</div>
                        </div>
                        <div className="cart-addons__price">$100</div>
                        <button type="button" className="cart-addons__add" onClick={addReel}>Add</button>
                      </div>
                    )}
                  </section>
                )}

                <div className="step-actions">
                  <Link href="/book" className="step-back">← Keep browsing</Link>
                  <Link href="/book/checkout" className="step-submit">Continue to details →</Link>
                </div>
              </>
            )}
          </div>

          {hydrated && hasAny && (
            <aside className="step-summary">
              <h3>Your booking</h3>
              <div className="step-summary__list">
                {items.map((it) => (
                  <div key={it.name} className="step-summary__item">
                    <div className="step-summary__thumb" style={{ backgroundImage: it.img ? `url('${it.img}')` : 'none' }} />
                    <div className="step-summary__name">{it.name}</div>
                    <div className="step-summary__price">{Number(it.price) === 0 ? 'POA' : fmt(it.price)}</div>
                  </div>
                ))}
                {editing.map((e, idx) => (
                  <div key={`edit-${idx}`} className="step-summary__item">
                    <div className="step-summary__thumb" />
                    <div className="step-summary__name">{editLabel(e)} · {editScope(e)}</div>
                    <div className="step-summary__price">{Number(e.price) === 0 ? 'POA' : fmt(e.price)}</div>
                  </div>
                ))}
              </div>
              <div className="step-summary__total">
                <span className="step-summary__total__label">Subtotal · GST inc.</span>
                <span className="step-summary__total__amt">{fmt(subtotal)}</span>
              </div>
              <Link href="/book" className="step-summary__edit">← Edit cart</Link>
            </aside>
          )}
        </div>
      </section>

      <style jsx>{`
        .cart-empty{padding:40px 20px;text-align:center;border:1px dashed rgba(74,74,72,0.22);margin-top:8px}
        .cart-empty h3{font-family:var(--display);font-weight:500;font-size:22px;color:var(--ink);margin-bottom:6px;letter-spacing:-0.005em}
        .cart-empty p{font-family:var(--body);font-size:13px;color:var(--graphite);margin-bottom:18px}
        .cart-empty__cta{
          display:inline-block;padding:12px 18px;background:var(--ink);color:var(--paper);
          font-family:var(--body);font-size:11px;letter-spacing:0.22em;text-transform:uppercase;text-decoration:none;font-weight:500;
        }
        .cart-empty__cta:hover{background:var(--steel)}

        .cart-lines{list-style:none;margin:0;padding:0;border-top:1px solid rgba(74,74,72,0.16)}
        .cart-line{display:grid;grid-template-columns:64px 1fr auto;gap:18px;align-items:center;padding:18px 0;border-bottom:1px solid rgba(74,74,72,0.1)}
        .cart-line__thumb{width:64px;height:64px;background:var(--soft) center/cover no-repeat;border:1px solid rgba(74,74,72,0.14)}
        .cart-line__thumb--edit{background:repeating-linear-gradient(135deg,var(--soft),var(--soft) 6px,rgba(74,74,72,0.06) 6px,rgba(74,74,72,0.06) 12px)}
        .cart-line__info{min-width:0}
        .cart-line__name{font-family:var(--display);font-weight:500;font-size:16px;color:var(--ink);letter-spacing:-0.005em;line-height:1.25}
        .cart-line__price{font-family:var(--body);font-size:13px;color:var(--graphite);margin-top:4px}
        .cart-line__remove{
          width:32px;height:32px;border:1px solid rgba(74,74,72,0.22);background:transparent;color:var(--graphite);
          font-size:18px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;
          transition:background .25s,color .25s,border-color .25s;
        }
        .cart-line__remove:hover{background:var(--ink);color:var(--paper);border-color:var(--ink)}

        .cart-addons{margin-top:36px;padding-top:18px;border-top:1px dashed rgba(74,74,72,0.22)}
        .cart-addons__row{display:grid;grid-template-columns:44px 1fr auto auto;gap:14px;align-items:center;padding:14px 0;border-top:1px solid rgba(74,74,72,0.12)}
        .cart-addons__row:first-of-type{border-top:none}
        .cart-addons__thumb{width:44px;height:44px;background:var(--soft);border:1px solid rgba(74,74,72,0.16);display:flex;align-items:center;justify-content:center;color:var(--ink)}
        .cart-addons__info{min-width:0}
        .cart-addons__name{font-family:var(--display);font-weight:500;font-size:15px;color:var(--ink);letter-spacing:-0.005em;line-height:1.2}
        .cart-addons__desc{font-family:var(--body);font-size:12px;line-height:1.5;color:var(--graphite);margin-top:3px;max-width:52ch}
        .cart-addons__price{font-family:var(--body);font-size:13px;color:var(--ink);font-weight:600;white-space:nowrap}
        .cart-addons__add{
          font-family:var(--body);font-size:10px;letter-spacing:0.22em;text-transform:uppercase;font-weight:500;
          padding:10px 14px;border:1px solid var(--ink);background:var(--ink);color:var(--paper);cursor:pointer;
          transition:background .25s,color .25s;
        }
        .cart-addons__add:hover{background:transparent;color:var(--ink)}

        @media (max-width:760px){
          .cart-line{grid-template-columns:48px 1fr auto;gap:12px}
          .cart-line__thumb{width:48px;height:48px}
          .cart-addons__row{grid-template-columns:36px 1fr auto;gap:10px}
          .cart-addons__add{grid-column:1 / -1;justify-self:stretch;text-align:center;margin-top:6px}
        }
      `}</style>
    </>
  );
}
