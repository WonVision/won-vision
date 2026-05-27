'use client';

import { useEffect, useRef, useState } from 'react';

const TICKER = [
  '01 · BRIEF',
  '02 · SHOOT',
  '03 · EDIT',
  '04 · PORTAL',
  '05 · DELIVERED',
];

export default function OperateHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [clock, setClock] = useState('');

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, '0');
      const mm = d.getMinutes().toString().padStart(2, '0');
      const ss = d.getSeconds().toString().padStart(2, '0');
      setClock(`${hh}:${mm}:${ss}`);
    };
    tick();
    const id = setInterval(tick, 1000);
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
      {/* Top meta strip */}
      <div className="opHero__meta">
        <div className="opHero__metaL">
          <span className="opHero__pulse" aria-hidden />
          <span>Won Vision Studio</span>
          <span className="opHero__sep" aria-hidden>·</span>
          <span>Melbourne</span>
        </div>
        <div className="opHero__metaR">
          <span className="opHero__metaItem">
            <em>Live</em>
            <strong>{clock || '00:00:00'}</strong>
          </span>
          <span className="opHero__metaItem">
            <em>Today</em>
            <strong>142 photos delivered</strong>
          </span>
          <span className="opHero__metaItem">
            <em>Avg turnaround</em>
            <strong>3h 12m</strong>
          </span>
        </div>
      </div>

      {/* Masked stacked title */}
      <div className="opHero__stage" aria-hidden>
        <div className="opHero__image" />
      </div>
      <h1 className="opHero__title">
        <span className="opHero__line opHero__line--mask"><span>HOW</span></span>
        <span className="opHero__line opHero__line--mask"><span>WE</span></span>
        <span className="opHero__line opHero__line--mask"><span>OPERATE</span></span>
        {/* Screen reader text */}
        <span className="opHero__sr">How we operate</span>
      </h1>

      {/* Editorial deck */}
      <div className="opHero__deck">
        <div className="opHero__deckL">
          <span className="opHero__eyebrow">How we operate</span>
          <p>
            Five stages, one system. The booking, the shoot, the edit, the portal, the delivery —
            built so the campaign goes live by tomorrow without trading off craft.
          </p>
        </div>
        <div className="opHero__deckR">
          <a href="#operate-flow" className="opHero__cta">
            <span>Begin the pipeline</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </a>
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="opHero__marquee" aria-hidden>
        <div className="opHero__marqueeTrack">
          {Array.from({ length: 8 }).map((_, n) => (
            <div className="opHero__marqueeRow" key={n}>
              {TICKER.map((t, i) => (
                <span key={`${n}-${i}`}>{t}<i>///</i></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .opHero{
          --p: 0;
          position:relative;
          background:#fff; color:#000;
          padding: 130px 6vw 0;
          border-bottom: 1px solid #e5e5e5;
          overflow: hidden;
        }

        /* ---------- META BAR ---------- */
        .opHero__meta{
          display:flex; justify-content:space-between; align-items:center;
          gap:24px;
          font-size:10px; letter-spacing:.22em; text-transform:uppercase; font-weight:600;
          color:#000;
          padding-bottom:28px;
          border-bottom:1px solid #e5e5e5;
        }
        .opHero__metaL{display:flex; align-items:center; gap:14px;}
        .opHero__sep{color:#a3a3a3;}
        .opHero__pulse{
          width:8px; height:8px; background:#000;
          animation: opPulse 1.6s ease-in-out infinite;
        }
        @keyframes opPulse{0%,100%{opacity:.35;} 50%{opacity:1;}}
        .opHero__metaR{display:flex; gap:36px; align-items:center;}
        .opHero__metaItem{display:flex; flex-direction:column; gap:4px; text-align:right;}
        .opHero__metaItem em{
          font-style:normal; font-size:9px; letter-spacing:.28em; color:#737373; font-weight:500;
        }
        .opHero__metaItem strong{
          font-size:13px; font-weight:600; letter-spacing:.04em; color:#000;
          font-variant-numeric: tabular-nums;
        }

        /* ---------- MASKED TITLE ---------- */
        .opHero__stage{
          position:absolute; inset:auto 6vw 0 6vw; top:160px;
          z-index:0; pointer-events:none;
        }
        .opHero__image{
          position:absolute; inset:0;
          background:
            linear-gradient(180deg, rgba(0,0,0,.18) 0%, rgba(0,0,0,.55) 100%),
            url('/images/showcase.webp') center/cover no-repeat;
          filter: grayscale(1) contrast(1.05);
          transform: scale(calc(1.04 + var(--p, 0) * 0.06));
          transition: transform .2s linear;
        }

        .opHero__title{
          position:relative; z-index:2;
          margin: 36px 0 0;
          line-height: .82;
          font-weight: 600;
          letter-spacing: -.045em;
          font-size: clamp(72px, 18vw, 280px);
          text-transform: uppercase;
          display:flex; flex-direction:column;
          padding-top: 4px;
        }
        .opHero__line{
          display:block; position:relative;
        }
        .opHero__line + .opHero__line{margin-top: -.04em;}
        .opHero__line--mask > span{
          display:inline-block;
          background:
            linear-gradient(180deg, rgba(0,0,0,.05) 0%, rgba(0,0,0,.7) 100%),
            url('/images/showcase.webp');
          background-size: cover, cover;
          background-position: center, center;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          filter: grayscale(1) contrast(1.1);
        }
        /* Offset the third line so the type breaks the grid */
        .opHero__line:nth-child(2){padding-left: 4vw;}
        .opHero__line:nth-child(3){padding-left: 1vw;}
        .opHero__sr{
          position:absolute; width:1px; height:1px; overflow:hidden;
          clip:rect(0 0 0 0); white-space:nowrap;
        }

        /* ---------- DECK ROW ---------- */
        .opHero__deck{
          position:relative; z-index:3;
          display:grid; grid-template-columns: 1.4fr 1fr;
          gap:48px; align-items:end;
          margin-top: 56px;
          padding: 36px 0 60px;
          border-top:1px solid #e5e5e5;
        }
        .opHero__deckL{display:flex; flex-direction:column; gap:14px;}
        .opHero__eyebrow{
          font-size:10px; letter-spacing:.3em; text-transform:uppercase;
          color:#737373; font-weight:500;
        }
        .opHero__deckL p{
          font-size: clamp(16px, 1.5vw, 20px);
          line-height: 1.45; color:#000;
          max-width: 56ch;
        }
        .opHero__deckR{display:flex; justify-content:flex-end;}
        .opHero__cta{
          display:inline-flex; align-items:center; gap:12px;
          background:#000; color:#fff; text-decoration:none;
          padding: 16px 22px;
          font-size:11px; letter-spacing:.22em; text-transform:uppercase; font-weight:600;
          transition: transform .25s ease, background .25s ease;
        }
        .opHero__cta:hover{transform:translateX(4px);}
        .opHero__cta svg{display:block;}

        /* ---------- MARQUEE ---------- */
        .opHero__marquee{
          position:relative; z-index:3;
          margin: 0 -6vw;
          border-top:1px solid #000;
          border-bottom:1px solid #000;
          background:#000; color:#fff;
          overflow:hidden;
          padding: 14px 0;
        }
        .opHero__marqueeTrack{
          display:flex; gap:0;
          animation: opMarquee 28s linear infinite;
          width:max-content;
        }
        .opHero__marqueeRow{
          display:flex; gap:0; align-items:center; white-space:nowrap;
          padding-right: 0;
        }
        .opHero__marqueeRow span{
          font-size: 13px;
          letter-spacing: .26em;
          text-transform: uppercase;
          font-weight: 600;
          padding: 0 28px;
          display:inline-flex; align-items:center; gap:18px;
        }
        .opHero__marqueeRow i{
          font-style:normal; color:#737373; font-weight:400; letter-spacing:.1em;
        }
        @keyframes opMarquee{
          from{transform:translateX(0);}
          to{transform:translateX(-50%);}
        }

        /* ===== Tablet ===== */
        @media (max-width: 1024px){
          .opHero{padding-top:110px;}
          .opHero__metaR{gap:22px;}
          .opHero__metaItem strong{font-size:12px;}
          .opHero__deck{grid-template-columns:1fr; gap:28px;}
          .opHero__deckR{justify-content:flex-start;}
        }

        /* ===== Mobile ===== */
        @media (max-width: 760px){
          .opHero{padding: 96px 6vw 0;}
          .opHero__meta{
            flex-direction:column; align-items:flex-start; gap:18px;
            padding-bottom:22px;
          }
          .opHero__metaR{
            width:100%; gap:20px; flex-wrap:wrap;
            justify-content:space-between;
          }
          .opHero__metaItem{text-align:left;}
          .opHero__metaItem strong{font-size:11px;}

          .opHero__stage{top:130px; inset:auto 6vw 0 6vw;}
          .opHero__title{margin-top:24px; font-size: clamp(56px, 21vw, 110px); letter-spacing:-.035em;}
          .opHero__line:nth-child(2){padding-left: 6vw;}
          .opHero__line:nth-child(3){padding-left: 2vw;}

          .opHero__deck{margin-top:32px; padding: 24px 0 40px;}
          .opHero__deckL p{font-size:15px;}
          .opHero__cta{padding:14px 18px; font-size:10px;}

          .opHero__marqueeRow span{font-size:11px; padding: 0 18px;}
        }

        @media (max-width: 420px){
          .opHero__metaItem:nth-child(3){display:none;}
        }

        @media (prefers-reduced-motion: reduce){
          .opHero__image{transform:none !important;}
          .opHero__marqueeTrack{animation:none;}
          .opHero__pulse{animation:none; opacity:.7;}
        }
      `}</style>
    </section>
  );
}
