'use client';

import { useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    n: '01',
    label: 'Step One · Brief',
    title: ['The booking', 'is the brief'],
    body: 'Cart, address, access notes and timing land in our system before the shoot is confirmed. No morning-of emails. The photographer arrives knowing the property, the package, and the access plan.',
  },
  {
    n: '02',
    label: 'Step Two · Shoot',
    title: ['A fixed standard,', 'not a fixed clock'],
    body: 'High-end camera gear, bracketed exposures on every interior frame, drone coverage where it counts. We don’t leave until every hero room has the frame we’d put on the cover.',
  },
  {
    n: '03',
    label: 'Step Three · Edit',
    title: ['The edit happens', 'while we’re', 'on the road'],
    body: 'Our editing team gets the files the moment they’re offloaded. Colour calibration, vertical correction, sky and window pulls — all handled by trained eyes who know what a hero shot looks like.',
  },
  {
    n: '04',
    label: 'Step Four · Portal',
    title: ['Everything lands', 'in your', 'Client Portal'],
    body: 'One private link. Live shoot status, final gallery with bulk download, per-photo edit requests, re-share to your team. The reason we can promise same-day without dropping standards.',
  },
  {
    n: '05',
    label: 'Step Five · Delivered',
    title: ['Photos same day.', 'Standard.'],
    body: 'Photos: same day. Video: 48 hours. Floor plans: 48 hours. Not “up to” — that’s the standard. The campaign is live by tomorrow.',
  },
];

const HERO_IMG = '/images/signature.webp';

function Stage({ idx }: { idx: number }) {
  return (
    <>
      <div className={`op-stage op-s1 ${idx === 0 ? 'on' : ''}`}>
        <img src={HERO_IMG} alt="" />
      </div>
      <div className={`op-stage op-s2 ${idx === 1 ? 'on' : ''}`}>
        <div className="brk"><img src={HERO_IMG} alt="" /><span className="brk-label">&minus;2 EV</span></div>
        <div className="brk"><img src={HERO_IMG} alt="" /><span className="brk-label">0 EV</span></div>
        <div className="brk"><img src={HERO_IMG} alt="" /><span className="brk-label">+2 EV</span></div>
      </div>
      <div className={`op-stage op-s3 ${idx === 2 ? 'on' : ''}`}>
        <img src={HERO_IMG} alt="" />
        <div className="edit-marks" aria-hidden>
          <span className="mark m1"></span>
          <span className="mark m2"></span>
          <span className="mark m3"></span>
        </div>
      </div>
      <div className={`op-stage op-s4 ${idx === 3 ? 'on' : ''}`}>
        <div className="portal-frame">
          <div className="portal-bar">
            <span className="dot"></span>
            <span className="portal-bar__title">Won Vision &middot; Client Portal</span>
            <span className="spacer"></span>
            <span className="pill">Ref WV-2604</span>
            <span className="pill live">Live</span>
          </div>
          <div className="portal-body">
            <img src={HERO_IMG} alt="" />
          </div>
          <div className="portal-meta">
            <div><strong>32</strong>Photos ready</div>
            <div><strong>1</strong>Video editing</div>
            <div><strong>2</strong>Floor plans 48h</div>
            <div><strong>0</strong>Open requests</div>
          </div>
        </div>
      </div>
      <div className={`op-stage op-s5 ${idx === 4 ? 'on' : ''}`}>
        <img src={HERO_IMG} alt="" />
        <span className="delivered-tag">Delivered</span>
      </div>
    </>
  );
}

export default function OperateConveyor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const scrolled = Math.max(0, -rect.top);
        const span = Math.max(1, rect.height - vh);
        const p = Math.max(0, Math.min(1, scrolled / span));
        setProgress(p);
        const next = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length));
        setIdx(next);
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
    <>
      <div className="op-wrap" ref={wrapRef}>
        <div className="op-sticky">
          {/* IMAGE FRAME — right on desktop, top on mobile/tablet */}
          <div className="op-right">
            <Stage idx={idx} />
          </div>
          {/* TEXT FRAME — left on desktop, bottom on mobile/tablet */}
          <div className="op-left">
            {STEPS.map((s, i) => (
              <div key={s.n} className={`op-step ${i === idx ? 'on' : ''}`} data-step={i}>
                <span className="op-num">{s.n}</span>
                <div className="op-label">{s.label}</div>
                <h3 className="op-title">
                  {s.title.map((line, li) => (
                    <span key={li}>{line}{li < s.title.length - 1 && <br />}</span>
                  ))}
                </h3>
                <p className="op-body">{s.body}</p>
              </div>
            ))}
            <div className="op-dots" aria-hidden>
              {STEPS.map((_, i) => (
                <span key={i} className={i <= idx ? 'on' : ''}></span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="op-progress" style={{ '--p': `${progress * 100}%` } as React.CSSProperties} aria-hidden />

      <style jsx>{`
        .op-progress{
          position:fixed; left:0; right:0; bottom:0; height:2px;
          background:transparent; z-index:50; pointer-events:none;
        }
        .op-progress::before{
          content:''; display:block; height:100%; background:#000;
          width:var(--p, 0%); transition:width .12s linear;
        }

        /* =========================================
           DESKTOP — side-by-side sticky conveyor
           ========================================= */
        .op-wrap{
          position:relative;
          /* 5 steps × 120vh = 600vh runway */
          height:600vh;
        }
        .op-sticky{
          position:sticky; top:0;
          height:100vh; width:100%;
          display:grid;
          grid-template-columns:1fr 1fr;
          grid-template-areas: 'text image';
          overflow:hidden;
          background:#fff;
        }
        .op-left{
          grid-area: text;
          padding:0 6vw; position:relative;
          border-right:1px solid #e5e5e5;
          overflow:hidden;
        }
        .op-right{
          grid-area: image;
          position:relative; overflow:hidden; background:#0a0a0a;
        }
        .op-step{
          position:absolute; left:6vw; right:6vw; top:50%;
          transform:translateY(calc(-50% + 28px));
          opacity:0; transition:opacity .55s ease, transform .55s ease;
          pointer-events:none;
        }
        .op-step.on{
          opacity:1; transform:translateY(-50%);
          pointer-events:auto;
        }
        .op-num{
          display:block; font-weight:600; letter-spacing:-.05em;
          color:#000; line-height:.85; margin-bottom:24px;
          font-size:clamp(96px, 16vw, 280px);
        }
        .op-label{
          font-size:11px; letter-spacing:.3em; text-transform:uppercase;
          color:#737373; font-weight:500; margin-bottom:18px;
        }
        .op-title{
          font-weight:600; letter-spacing:-.02em; text-transform:uppercase;
          line-height:1.05; margin-bottom:20px;
          font-size:clamp(22px, 2.6vw, 40px);
        }
        .op-body{
          font-size:clamp(14px, 1.05vw, 16px);
          line-height:1.55; color:#404040; max-width:42ch;
        }
        .op-dots{
          position:absolute; left:50%; bottom:30px; transform:translateX(-50%);
          display:flex; gap:8px; z-index:5;
        }
        .op-dots span{
          display:block; width:24px; height:2px; background:#e5e5e5;
          transition:background .3s ease;
        }
        .op-dots span.on{background:#000;}

        /* Tablet portrait — rebalance side-by-side proportions */
        @media (max-width: 1024px) and (min-width: 901px){
          .op-sticky{grid-template-columns: 45% 55%;}
          .op-num{font-size:clamp(80px, 14vw, 180px); margin-bottom:18px;}
          .op-title{font-size:clamp(20px, 3vw, 30px);}
          .op-body{font-size:14px;}
          .op-step{transform:translateY(calc(-50% + 20px));}
        }

        /* =========================================
           MOBILE / SMALL TABLET — STACKED VERTICAL
           Same scroll mechanic, layout flips so image
           is on top and text frame is below.
           ========================================= */
        @media (max-width: 900px){
          .op-sticky{
            grid-template-columns: 1fr;
            grid-template-rows: 50vh 50vh;
            grid-template-areas:
              'image'
              'text';
          }
          .op-left{
            border-right:0;
            border-top:1px solid #e5e5e5;
            padding: 0 6vw;
          }
          .op-step{
            left: 6vw; right: 6vw;
            transform: translateY(calc(-50% + 18px));
          }
          .op-num{font-size: clamp(72px, 18vw, 120px); margin-bottom: 14px;}
          .op-label{font-size: 10px; margin-bottom: 12px;}
          .op-title{font-size: clamp(20px, 5.5vw, 28px); margin-bottom: 14px;}
          .op-body{font-size: 14px; line-height: 1.5;}
          .op-dots{bottom: 18px;}
        }

        @media (max-width: 600px){
          .op-sticky{grid-template-rows: 44vh 56vh;}
          .op-num{font-size: clamp(64px, 20vw, 96px); margin-bottom: 10px;}
          .op-title{font-size: clamp(18px, 6vw, 24px);}
          .op-body{font-size: 13.5px;}
        }
      `}</style>

      <style jsx global>{`
        .op-stage{
          position:absolute; inset:0;
          display:flex; align-items:center; justify-content:center;
          opacity:0; transition:opacity .6s ease;
        }
        .op-stage.on{opacity:1;}
        .op-stage > img{
          width:100%; height:100%; object-fit:cover;
          transition:filter .6s ease, transform .6s ease;
        }

        /* Stage 1 — Brief */
        .op-s1 > img{filter:grayscale(1) contrast(.95);}

        /* Stage 2 — Brackets as PILLARS, evenly spaced, filling more of the frame */
        .op-s2{
          background:#0a0a0a;
          display:flex; align-items:stretch; justify-content:space-between;
          gap: 2.5%;
          padding: 6% 5%;
        }
        .op-s2 .brk{
          position:relative; overflow:hidden;
          flex: 1 1 0;
          height: 100%;
        }
        .op-s2 .brk img{
          width:100%; height:100%; object-fit:cover;
          object-position: center center;
        }
        .op-s2 .brk:nth-child(1) img{filter:brightness(.4) grayscale(1);}
        .op-s2 .brk:nth-child(2) img{filter:brightness(1) grayscale(1);}
        .op-s2 .brk:nth-child(3) img{filter:brightness(1.7) grayscale(1);}
        .op-s2 .brk-label{
          position:absolute; bottom:14px; left:50%; transform:translateX(-50%);
          font-size:9px; letter-spacing:.22em; text-transform:uppercase;
          color:#fff; background:rgba(0,0,0,.75); padding:6px 10px; font-weight:600;
          white-space:nowrap;
        }

        /* Stage 3 — Edit */
        .op-s3 > img{filter:grayscale(.5) contrast(1.15) brightness(1.05); transform:scale(1.02);}
        .op-s3::after{
          content:''; position:absolute; inset:0;
          background:repeating-linear-gradient(180deg, transparent 0 3px, rgba(255,255,255,.04) 3px 4px);
          pointer-events:none;
        }
        .edit-marks{position:absolute; inset:0; pointer-events:none;}
        .edit-marks .mark{
          position:absolute; width:64px; height:64px; border:1px solid #fff;
          animation:opPulse 1.8s ease-in-out infinite;
        }
        .edit-marks .mark::after{
          content:'+'; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
          color:#fff; font-size:14px; font-weight:300;
        }
        .edit-marks .m1{top:30%; left:18%;}
        .edit-marks .m2{top:55%; left:62%; animation-delay:.6s;}
        .edit-marks .m3{top:22%; left:70%; animation-delay:1.2s;}
        @keyframes opPulse{0%,100%{opacity:.4;} 50%{opacity:1;}}

        /* Stage 4 — Portal */
        .op-s4{background:#0a0a0a; padding:4%;}
        .portal-frame{
          width:100%; height:100%; background:#fff; color:#000;
          border:1px solid #fff;
          display:grid; grid-template-rows:auto 1fr auto;
          font-family: var(--font-sora), system-ui, sans-serif;
          min-height:0;
        }
        .portal-bar{
          display:flex; align-items:center; gap:8px;
          padding:10px 14px; border-bottom:1px solid #000;
          font-size:10px; letter-spacing:.18em; text-transform:uppercase; font-weight:600;
          min-width:0;
        }
        .portal-bar__title{white-space:nowrap; overflow:hidden; text-overflow:ellipsis; min-width:0;}
        .portal-bar .dot{width:7px; height:7px; background:#000; flex-shrink:0;}
        .portal-bar .spacer{flex:1; min-width:8px;}
        .portal-bar .pill{
          border:1px solid #000; padding:3px 8px; font-size:9px; letter-spacing:.16em;
          flex-shrink:0;
        }
        .portal-bar .pill.live{background:#000; color:#fff;}
        .portal-body{position:relative; overflow:hidden;}
        .portal-body img{width:100%; height:100%; object-fit:cover; filter:grayscale(.1);}
        .portal-meta{
          display:grid; grid-template-columns:repeat(4, 1fr);
          border-top:1px solid #000; font-size:10px; letter-spacing:.14em; text-transform:uppercase;
        }
        .portal-meta div{padding:10px 12px; border-right:1px solid #000;}
        .portal-meta div:last-child{border-right:0;}
        .portal-meta strong{
          display:block; font-weight:600; font-size:13px; letter-spacing:-.01em;
          text-transform:none; margin-bottom:4px;
        }

        /* Stage 5 — Delivered */
        .op-s5 > img{filter:none;}
        .delivered-tag{
          position:absolute; bottom:20px; right:20px;
          font-size:11px; letter-spacing:.3em; font-weight:600; color:#fff;
          background:#000; padding:8px 14px;
        }

        /* Mobile portal tightening */
        @media (max-width: 900px){
          .op-s2{padding: 5% 6%; gap: 3%;}
          .portal-bar{font-size:9px; padding:8px 10px; gap:6px;}
          .portal-bar .pill{font-size:8px; padding:2px 6px;}
          .portal-meta{font-size:8px; grid-template-columns:repeat(2, 1fr);}
          .portal-meta div{padding:8px 10px;}
          .portal-meta div:nth-child(2n){border-right:0;}
          .portal-meta div:nth-child(-n+2){border-bottom:1px solid #000;}
          .portal-meta strong{font-size:12px;}
          .edit-marks .mark{width:48px; height:48px;}
          .delivered-tag{font-size:10px; padding:6px 10px; bottom:14px; right:14px;}
        }
        @media (max-width: 600px){
          .op-s2{padding: 6% 5%;}
          .op-s2 .brk-label{font-size:8px; padding:4px 7px; bottom:10px;}
        }
      `}</style>
    </>
  );
}
