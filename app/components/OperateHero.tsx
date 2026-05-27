'use client';

import { useEffect, useRef, useState } from 'react';

export default function OperateHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [clock, setClock] = useState('');

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, '0');
      const mm = d.getMinutes().toString().padStart(2, '0');
      setClock(`${hh}:${mm} AEST`);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const visible = Math.max(0, Math.min(1, 1 - rect.top / vh));
        el.style.setProperty('--p', String(visible));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="opHero" ref={heroRef} aria-label="How we operate — hero">

      {/* MASTHEAD — magazine-style top bar */}
      <div className="opHero__masthead">
        <div className="opHero__mast-l">
          <span className="opHero__mark">W&middot;V</span>
          <span className="opHero__divider" aria-hidden />
          <span>How We Operate</span>
        </div>
        <div className="opHero__mast-r">
          <span>Vol. 01 — Issue 05</span>
          <span className="opHero__divider" aria-hidden />
          <span>Melbourne</span>
          <span className="opHero__divider" aria-hidden />
          <span suppressHydrationWarning>{clock || '—'}</span>
        </div>
      </div>

      {/* MAIN GRID — type column · image column */}
      <div className="opHero__grid">
        <div className="opHero__type">
          <span className="opHero__chapter">Chapter One · The System</span>
          <h1 className="opHero__title">
            <span className="opHero__pre">How we</span>
            <span className="opHero__main">Operate.</span>
          </h1>
          <div className="opHero__lede">
            <p>
              Five stages, one system. The booking, the shoot, the edit, the portal,
              the delivery — built so the campaign goes live by tomorrow without
              trading off craft.
            </p>
          </div>
          <a href="#operate-flow" className="opHero__cta">
            <span>Begin the pipeline</span>
            <svg width="32" height="10" viewBox="0 0 32 10" fill="none" aria-hidden>
              <path d="M0 5h28M24 1l4 4-4 4" stroke="currentColor" strokeWidth="1" />
            </svg>
          </a>
        </div>

        <figure className="opHero__figure">
          <div className="opHero__frame">
            <div className="opHero__image" />
          </div>
          <figcaption className="opHero__caption">
            <span>Figure A</span>
            <span>Northcote · Two-bedroom · Shot 14:22 · Delivered 17:34</span>
          </figcaption>
        </figure>
      </div>

      {/* INDEX — quiet magazine-style index of the 5 stages */}
      <ol className="opHero__index" aria-label="Pipeline stages">
        <li><span>01</span><em>Brief</em></li>
        <li><span>02</span><em>Shoot</em></li>
        <li><span>03</span><em>Edit</em></li>
        <li><span>04</span><em>Portal</em></li>
        <li><span>05</span><em>Delivered</em></li>
      </ol>

      <style jsx>{`
        .opHero{
          --p: 0;
          position:relative;
          background:#fff; color:#000;
          padding: 96px 6vw 0;
          border-bottom: 1px solid #e5e5e5;
        }

        /* ---------- MASTHEAD ---------- */
        .opHero__masthead{
          display:flex; justify-content:space-between; align-items:center;
          padding-bottom: 20px;
          border-bottom: 1px solid #000;
          font-size: 11px; letter-spacing: .18em; text-transform: uppercase;
          font-weight: 500; color: #000;
          gap: 24px;
        }
        .opHero__mast-l, .opHero__mast-r{
          display:flex; align-items:center; gap:14px;
        }
        .opHero__mark{
          font-weight:700; letter-spacing:.04em; font-size:13px;
        }
        .opHero__divider{
          width:1px; height:11px; background:#000; display:inline-block;
        }
        .opHero__mast-r > span:last-child{
          font-variant-numeric: tabular-nums;
        }

        /* ---------- MAIN GRID ---------- */
        .opHero__grid{
          display:grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
          gap: 6vw;
          padding: 80px 0 96px;
          align-items: start;
        }

        .opHero__type{
          display:flex; flex-direction:column;
        }
        .opHero__chapter{
          font-size: 11px; letter-spacing: .3em; text-transform: uppercase;
          color:#737373; font-weight: 500;
          margin-bottom: 36px;
        }
        .opHero__title{
          margin: 0;
          line-height: .86;
          font-weight: 600;
          letter-spacing: -.045em;
          text-transform: none;
          color:#000;
          display:flex; flex-direction:column; gap: 8px;
        }
        .opHero__pre{
          font-size: clamp(28px, 3.4vw, 48px);
          font-weight: 400;
          letter-spacing: -.02em;
          color:#737373;
          font-style: italic;
        }
        .opHero__main{
          font-size: clamp(72px, 11vw, 200px);
          letter-spacing: -.05em;
          text-transform: uppercase;
          font-weight: 600;
        }
        .opHero__lede{
          margin-top: 40px;
          max-width: 48ch;
        }
        .opHero__lede p{
          margin: 0;
          font-size: clamp(16px, 1.25vw, 19px);
          line-height: 1.5;
          color: #000;
        }
        .opHero__cta{
          margin-top: 48px;
          align-self: flex-start;
          display:inline-flex; align-items:center; gap:18px;
          background:transparent; color:#000; text-decoration:none;
          padding: 14px 0 14px 0;
          font-size: 11px; letter-spacing: .26em; text-transform: uppercase; font-weight: 600;
          border-bottom: 1px solid #000;
          transition: gap .25s ease;
        }
        .opHero__cta:hover{gap: 28px;}
        .opHero__cta svg{display:block; flex-shrink:0;}

        /* ---------- FIGURE COLUMN ---------- */
        .opHero__figure{
          margin: 0;
          position: relative;
          align-self: stretch;
          display:flex; flex-direction:column;
        }
        .opHero__frame{
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: #f5f5f5;
        }
        .opHero__image{
          position:absolute; inset:0;
          background:
            linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.18) 100%),
            url('/images/showcase.webp') center/cover no-repeat;
          filter: grayscale(1) contrast(1.02);
          transform: scale(calc(1.02 + var(--p, 0) * 0.05));
          transition: transform .2s linear;
        }
        .opHero__caption{
          display:flex; justify-content:space-between;
          gap: 16px;
          margin-top: 14px;
          font-size: 10px; letter-spacing: .22em; text-transform: uppercase;
          font-weight: 500; color: #737373;
        }
        .opHero__caption span:first-child{
          color:#000; font-weight: 600;
        }

        /* ---------- INDEX ---------- */
        .opHero__index{
          list-style: none; margin: 0; padding: 28px 0 36px;
          border-top: 1px solid #000;
          display:grid; grid-template-columns: repeat(5, 1fr);
        }
        .opHero__index li{
          display:flex; align-items:baseline; gap: 14px;
          font-size: 11px; letter-spacing: .22em; text-transform: uppercase;
          font-weight: 600; color: #000;
        }
        .opHero__index span{
          font-size: 11px; color:#737373; font-weight: 500;
          font-variant-numeric: tabular-nums;
        }
        .opHero__index em{
          font-style:normal; letter-spacing: .18em;
        }

        /* ============== TABLET ============== */
        @media (max-width: 1024px){
          .opHero{padding: 86px 6vw 0;}
          .opHero__grid{
            grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
            gap: 5vw; padding: 60px 0 72px;
          }
          .opHero__pre{font-size:24px;}
          .opHero__lede p{font-size:16px;}
        }

        /* ============== MOBILE ============== */
        @media (max-width: 760px){
          .opHero{padding: 72px 6vw 0;}
          .opHero__masthead{
            flex-direction: column; align-items: flex-start; gap: 12px;
            padding-bottom: 16px;
            font-size: 10px;
          }
          .opHero__mast-r{flex-wrap: wrap;}
          .opHero__grid{
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 44px 0 56px;
          }
          .opHero__chapter{margin-bottom: 24px;}
          .opHero__pre{font-size: 22px;}
          .opHero__main{font-size: clamp(60px, 18vw, 96px);}
          .opHero__lede{margin-top: 28px;}
          .opHero__lede p{font-size: 15px;}
          .opHero__cta{margin-top: 32px;}
          .opHero__frame{aspect-ratio: 4 / 5;}

          .opHero__index{
            grid-template-columns: repeat(2, 1fr);
            gap: 14px 24px;
            padding: 22px 0 28px;
          }
        }

        @media (max-width: 420px){
          .opHero__main{font-size: clamp(52px, 18vw, 80px);}
          .opHero__mast-r > span:nth-child(1){display:none;}
        }

        @media (prefers-reduced-motion: reduce){
          .opHero__image{transform:none !important;}
        }
      `}</style>
    </section>
  );
}
