'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

const steps = [
  {
    num: '01',
    name: 'Brief',
    desc: 'Cart, address, access notes and timing land in our system before the shoot is confirmed. The photographer arrives knowing the property, the package and the access plan.',
  },
  {
    num: '02',
    name: 'Shoot',
    desc: 'High-end gear, bracketed exposures on every interior frame, drone coverage where it counts. We don’t leave until every hero room has the frame.',
  },
  {
    num: '03',
    name: 'Edit',
    desc: 'Files offloaded straight to our editing team — colour calibration, vertical correction, sky and window pulls, all by trained eyes.',
  },
  {
    num: '04',
    name: 'Portal',
    desc: 'One private link. Live shoot status, final gallery with bulk download, per-photo edit requests, re-share to your team.',
  },
  {
    num: '05',
    name: 'Delivered',
    desc: 'Photos: same day. Video: 48 hours. Floor plans: 48 hours. Not “up to” — that’s the standard. Campaign live by tomorrow.',
  },
];

export default function ProcessStepper() {
  const ref = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('is-visible');
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Mobile only — track which scroll-snap card is most visible and light
  // up the matching segment in the progress bar. Harmless on desktop (the
  // row doesn't scroll and the bar is display:none).
  useEffect(() => {
    const row = rowRef.current;
    const bar = barRef.current;
    if (!row || !bar) return;
    const segs = bar.querySelectorAll('span');
    const update = () => {
      const cards = row.querySelectorAll<HTMLElement>('.ps__step');
      if (!cards.length) return;
      const rowRect = row.getBoundingClientRect();
      let bestI = 0;
      let bestOverlap = -Infinity;
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const overlap =
          Math.min(r.right, rowRect.right) - Math.max(r.left, rowRect.left);
        if (overlap > bestOverlap) {
          bestOverlap = overlap;
          bestI = i;
        }
      });
      segs.forEach((s, i) => s.classList.toggle('is-active', i === bestI));
    };
    update();
    row.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      row.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section id="process" className="process-stepper" ref={ref} aria-label="Process">
      <div className="ps__inner">
        <span className="ps__eyebrow">Process — how a shoot runs</span>
        <div className="ps__row" ref={rowRef}>
          <span className="ps__rule" aria-hidden="true" />
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="ps__step"
              style={{ '--i': i } as CSSProperties}
            >
              <span className="ps__dot" aria-hidden="true" />
              <span className="ps__num">{s.num} / {s.name}</span>
              <h3 className="ps__name">{s.name}</h3>
              <p className="ps__desc">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="ps__bar" ref={barRef} aria-hidden="true">
          {steps.map((s, i) => (
            <span key={s.num} className={i === 0 ? 'is-active' : ''} />
          ))}
        </div>
      </div>
    </section>
  );
}
