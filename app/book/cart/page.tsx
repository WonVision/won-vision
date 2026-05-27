'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Wordmark } from '../../components/Wordmark';

type CartItem = {
  name: string;
  price: number;
  img: string;
  categories: string[];
};

const REEL: CartItem = {
  name: 'Social Reel',
  price: 99,
  img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80',
  categories: ['video', 'social'],
};
const SITE_PLAN: CartItem = {
  name: 'Site Plan',
  price: 49,
  img: '/images/floor-plan.webp',
  categories: ['floorplan', 'siteplan'],
};

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
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readCart());
    setHydrated(true);
  }, []);

  const subtotal = useMemo(() => items.reduce((s, it) => s + (Number(it.price) || 0), 0), [items]);

  function update(next: CartItem[]) { setItems(next); writeCart(next); }
  function remove(name: string) { update(items.filter(i => i.name !== name)); }

  const hasVideo = items.some(i => i.categories.includes('video') && !i.categories.includes('social'));
  const hasReel = items.some(i => i.name === REEL.name);
  const hasSite = items.some(i => i.name === SITE_PLAN.name || i.name === 'Floor Plan + Site Plan');
  const hasPackage = items.some(i => i.name.includes(' — ') || ['Essential', 'Signature', 'Cinematic'].some(p => i.name.startsWith(p)));
  // Approximation: any package added that doesn't bundle a site plan → show add-on. Essential is the only one that doesn't bundle.
  const hasEssential = items.some(i => i.name.startsWith('Essential') && !hasSite);

  const showReelAddon = hasVideo && !hasReel;
  const showSiteAddon = hasPackage && !hasSite && hasEssential;

  function addReel() { update([...items, REEL]); }
  function addSite() { update([...items, SITE_PLAN]); }

  return (
    <main className="cart-page">
      <nav className="cart-page__nav">
        <Link href="/" className="cart-page__brand" aria-label="Won Vision home">
          <Wordmark />
        </Link>
        <Link href="/book" className="cart-page__back">← Keep browsing</Link>
      </nav>

      <section className="cart-page__shell">
        <header className="cart-page__head">
          <span className="cart-page__eyebrow">Your booking</span>
          <h1>Your <em>cart</em></h1>
          <p>Review what's in. Add any recommended extras below. Then continue to checkout.</p>
        </header>

        {hydrated && items.length === 0 && (
          <div className="cart-page__empty">
            <h2>No services yet.</h2>
            <p>Browse the catalogue and add what your listing needs.</p>
            <Link href="/book" className="cart-page__cta">Browse services →</Link>
          </div>
        )}

        {hydrated && items.length > 0 && (
          <>
            <ul className="cart-page__list">
              {items.map((it) => (
                <li key={it.name} className="cart-page__item">
                  <div className="cart-page__item__thumb" style={{ backgroundImage: it.img ? `url('${it.img}')` : 'none' }} />
                  <div className="cart-page__item__info">
                    <div className="cart-page__item__name">{it.name}</div>
                    <div className="cart-page__item__price">{Number(it.price) === 0 ? 'POA' : fmt(it.price)}</div>
                  </div>
                  <button type="button" className="cart-page__item__remove" aria-label={`Remove ${it.name}`} onClick={() => remove(it.name)}>×</button>
                </li>
              ))}
            </ul>

            {(showReelAddon || showSiteAddon) && (
              <section className="cart-page__addons">
                <div className="cart-page__addons__label">Recommended add-ons</div>

                {showReelAddon && (
                  <div className="cart-page__addons__row">
                    <div className="cart-page__addons__thumb"><PhoneIcon /></div>
                    <div className="cart-page__addons__info">
                      <div className="cart-page__addons__name">Social Reel</div>
                      <div className="cart-page__addons__desc">A short-form social cut of your chosen video — 30s vertical 9:16, captions, hook-first edit. Built for Instagram &amp; TikTok.</div>
                    </div>
                    <div className="cart-page__addons__price">$99</div>
                    <button type="button" className="cart-page__addons__add" onClick={addReel}>Add</button>
                  </div>
                )}

                {showSiteAddon && (
                  <div className="cart-page__addons__row">
                    <div className="cart-page__addons__thumb"><PlanIcon /></div>
                    <div className="cart-page__addons__info">
                      <div className="cart-page__addons__name">Site Plan</div>
                      <div className="cart-page__addons__desc">Standalone site plan with boundaries, orientation and lot dimensions — add it to round out your package.</div>
                    </div>
                    <div className="cart-page__addons__price">$49</div>
                    <button type="button" className="cart-page__addons__add" onClick={addSite}>Add</button>
                  </div>
                )}
              </section>
            )}

            <footer className="cart-page__foot">
              <div className="cart-page__total">
                <span className="cart-page__total__label">Subtotal · GST inc.</span>
                <span className="cart-page__total__amt">{fmt(subtotal)}</span>
              </div>
              <Link href="/book/checkout" className="cart-page__next">Next →</Link>
            </footer>
          </>
        )}
      </section>

      <style jsx>{`
        .cart-page{min-height:100svh;background:var(--paper);color:var(--ink);display:flex;flex-direction:column}
        .cart-page__nav{display:flex;align-items:center;justify-content:space-between;padding:18px var(--gutter,24px);border-bottom:1px solid rgba(74,74,72,0.12)}
        .cart-page__brand{color:var(--ink);text-decoration:none}
        .cart-page__back{font-family:var(--body);font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:var(--graphite);text-decoration:none;font-weight:500}
        .cart-page__back:hover{color:var(--ink)}
        .cart-page__shell{flex:1;width:100%;max-width:780px;margin:0 auto;padding:48px var(--gutter,24px) 80px}
        .cart-page__head{margin-bottom:32px}
        .cart-page__eyebrow{font-family:var(--body);font-size:10px;letter-spacing:0.26em;text-transform:uppercase;color:var(--steel);font-weight:500}
        .cart-page__head h1{font-family:var(--display);font-weight:500;font-size:42px;line-height:1.05;letter-spacing:-0.015em;color:var(--ink);margin:8px 0 10px}
        .cart-page__head h1 em{font-style:italic;color:var(--steel);font-weight:400}
        .cart-page__head p{font-family:var(--body);font-size:14px;line-height:1.6;color:var(--graphite);max-width:520px}
        .cart-page__empty{padding:48px 24px;text-align:center;border:1px dashed rgba(74,74,72,0.22)}
        .cart-page__empty h2{font-family:var(--display);font-weight:500;font-size:22px;color:var(--ink);margin-bottom:6px;letter-spacing:-0.005em}
        .cart-page__empty p{font-family:var(--body);font-size:13px;color:var(--graphite);margin-bottom:18px}
        .cart-page__cta{display:inline-block;padding:13px 20px;background:var(--ink);color:var(--paper);font-family:var(--body);font-size:11px;letter-spacing:0.22em;text-transform:uppercase;text-decoration:none;font-weight:500}
        .cart-page__cta:hover{background:var(--steel)}

        .cart-page__list{list-style:none;margin:0;padding:0;border-top:1px solid rgba(74,74,72,0.16)}
        .cart-page__item{display:grid;grid-template-columns:56px 1fr auto;gap:16px;align-items:center;padding:18px 0;border-bottom:1px solid rgba(74,74,72,0.1)}
        .cart-page__item__thumb{width:56px;height:56px;background:var(--soft) center/cover no-repeat;border:1px solid rgba(74,74,72,0.14)}
        .cart-page__item__info{min-width:0}
        .cart-page__item__name{font-family:var(--display);font-weight:500;font-size:16px;color:var(--ink);letter-spacing:-0.005em;line-height:1.25}
        .cart-page__item__price{font-family:var(--body);font-size:13px;color:var(--graphite);margin-top:4px}
        .cart-page__item__remove{
          width:32px;height:32px;border:1px solid rgba(74,74,72,0.2);background:transparent;color:var(--graphite);
          font-size:18px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;
          transition:background .25s,color .25s,border-color .25s;
        }
        .cart-page__item__remove:hover{background:var(--ink);color:var(--paper);border-color:var(--ink)}

        .cart-page__addons{margin-top:28px;padding:18px 0 6px;border-top:1px dashed rgba(74,74,72,0.22);display:flex;flex-direction:column;gap:14px}
        .cart-page__addons__label{font-family:var(--body);font-size:10px;letter-spacing:0.24em;text-transform:uppercase;color:var(--graphite);font-weight:500}
        .cart-page__addons__row{display:grid;grid-template-columns:40px 1fr auto auto;gap:14px;align-items:center}
        .cart-page__addons__thumb{width:40px;height:40px;background:var(--soft);border:1px solid rgba(74,74,72,0.16);display:flex;align-items:center;justify-content:center;color:var(--ink)}
        .cart-page__addons__info{min-width:0}
        .cart-page__addons__name{font-family:var(--display);font-weight:500;font-size:15px;color:var(--ink);letter-spacing:-0.005em;line-height:1.2}
        .cart-page__addons__desc{font-family:var(--body);font-size:12px;line-height:1.5;color:var(--graphite);margin-top:3px;max-width:48ch}
        .cart-page__addons__price{font-family:var(--body);font-size:13px;color:var(--ink);font-weight:600;white-space:nowrap}
        .cart-page__addons__add{
          font-family:var(--body);font-size:10px;letter-spacing:0.22em;text-transform:uppercase;font-weight:500;
          padding:10px 14px;border:1px solid var(--ink);background:var(--ink);color:var(--paper);cursor:pointer;
          transition:background .25s,color .25s;
        }
        .cart-page__addons__add:hover{background:transparent;color:var(--ink)}

        .cart-page__foot{margin-top:36px;padding-top:22px;border-top:1px solid rgba(74,74,72,0.18);display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap}
        .cart-page__total{display:flex;flex-direction:column;gap:4px}
        .cart-page__total__label{font-family:var(--body);font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:var(--graphite);font-weight:500}
        .cart-page__total__amt{font-family:var(--display);font-weight:500;font-size:30px;color:var(--ink);letter-spacing:-0.01em;line-height:1}
        .cart-page__next{
          font-family:var(--body);font-size:12px;letter-spacing:0.22em;text-transform:uppercase;font-weight:500;
          padding:16px 28px;background:var(--ink);color:var(--paper);text-decoration:none;
          transition:background .25s;
        }
        .cart-page__next:hover{background:var(--steel)}

        @media (max-width:560px){
          .cart-page__head h1{font-size:32px}
          .cart-page__addons__row{grid-template-columns:36px 1fr auto;gap:10px}
          .cart-page__addons__add{grid-column:1 / -1;justify-self:stretch;text-align:center}
        }
      `}</style>
    </main>
  );
}
