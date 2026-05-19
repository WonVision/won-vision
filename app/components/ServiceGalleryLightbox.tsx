'use client';

import { useEffect, useState } from 'react';

type Media = {
  src: string;
  caption?: string;
  type?: 'image' | 'video';
  poster?: string;
};

const galleries: Record<string, Media[]> = {
  photography: [
    { src: '/images/showcase.webp', caption: 'Showcase' },
    { src: '/images/rental-compact.webp', caption: 'Rental · Compact' },
    { src: '/images/rental-standard.webp', caption: 'Rental · Standard' },
    { src: '/images/rental-large.webp', caption: 'Rental · Large' },
    { src: '/images/sales-compact.webp', caption: 'Sales · Compact' },
    { src: '/images/sales-standard.webp', caption: 'Sales · Standard' },
    { src: '/images/sales-premium.webp', caption: 'Sales · Premium' },
    { src: '/images/additional-photos.webp', caption: 'Additional photos' },
  ],
  staging: [
    { src: '/images/staging-after.webp', caption: 'Virtual staging' },
    { src: '/images/dusk-after.webp', caption: 'Day-to-dusk' },
    { src: '/images/declutter-after.webp', caption: 'Decluttering' },
  ],
  drone: [
    { src: '/images/drone-set.webp', caption: 'Drone set' },
    { src: '/images/drone-additional.webp', caption: 'Additional aerial' },
  ],
  video: [
    {
      src: '/video/cinematic-demo.mp4',
      type: 'video',
      poster: '/images/cinematic.webp',
      caption: 'Listing Video · 90s',
    },
  ],
};

const titles: Record<string, string> = {
  photography: 'Photography',
  staging: 'Virtual staging',
  drone: 'Aerial / drone',
  video: 'Video',
};

const ICON_SVG =
  '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true">' +
  '<rect x="3" y="5" width="18" height="14"/>' +
  '<path d="M3 16l5-5 4 4 3-3 6 6"/>' +
  '<circle cx="8" cy="9" r="1.4"/>' +
  '</svg>' +
  '<span>Examples</span>';

export default function ServiceGalleryLightbox() {
  const [active, setActive] = useState<string | null>(null);

  // Inject an "Examples" button into every .svc-card / .pkg-card whose
  // resolved gallery key actually has media. Keyed by the card's own
  // data-gallery override or its parent .cat's data-gallery. Uses a
  // MutationObserver so cards added later (booking flow re-renders) still
  // get a button.
  useEffect(() => {
    const inject = (root: ParentNode = document) => {
      const cards = root.querySelectorAll<HTMLElement>(
        '.svc-card, .pkg-card',
      );
      cards.forEach((card) => {
        const media = card.querySelector(
          '.svc-card__media, .pkg-card__media',
        );
        if (!media || media.querySelector('[data-gallery-btn]')) return;
        const cardOverride = card.dataset.gallery;
        const cat = card.closest('.cat') as HTMLElement | null;
        const catKey = cat?.dataset.gallery;
        const key = cardOverride || catKey;
        // Only inject where a gallery exists — no dead buttons.
        if (!key || !galleries[key]) return;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'svc-card__gallery-btn';
        btn.setAttribute('data-gallery-btn', key);
        btn.setAttribute('aria-label', `${titles[key] ?? key} examples`);
        btn.innerHTML = ICON_SVG;
        media.appendChild(btn);
      });
    };

    inject();

    const mo = new MutationObserver(() => inject());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => mo.disconnect();
  }, []);

  // Click delegate (capturing) — intercept gallery-btn clicks before the
  // svc-card add-to-cart handler runs; open the lightbox instead.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement | null)?.closest(
        '[data-gallery-btn]',
      ) as HTMLElement | null;
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      const key = btn.dataset.galleryBtn;
      if (key && galleries[key]) setActive(key);
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    document.addEventListener('click', handler, true);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('click', handler, true);
      document.removeEventListener('keydown', esc);
    };
  }, []);

  // Lock body scroll while the lightbox is open
  useEffect(() => {
    if (active) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [active]);

  if (!active) return null;

  const items = galleries[active] ?? [];

  return (
    <div
      className="svc-lb"
      role="dialog"
      aria-modal="true"
      aria-label={`${titles[active] ?? active} gallery`}
      onClick={() => setActive(null)}
    >
      <div className="svc-lb__bar">
        <span className="svc-lb__title">{titles[active] ?? active} — examples</span>
        <button
          className="svc-lb__close"
          type="button"
          aria-label="Close gallery"
          onClick={(e) => {
            e.stopPropagation();
            setActive(null);
          }}
        >
          ×
        </button>
      </div>
      <div className="svc-lb__grid" onClick={(e) => e.stopPropagation()}>
        {items.map((m, i) =>
          m.type === 'video' ? (
            <figure key={i} className="svc-lb__fig svc-lb__fig--video">
              <video
                src={m.src}
                poster={m.poster}
                controls
                playsInline
                preload="metadata"
              />
              {m.caption && <figcaption>{m.caption}</figcaption>}
            </figure>
          ) : (
            <figure key={i} className="svc-lb__fig">
              <img src={m.src} alt={m.caption ?? ''} loading="lazy" />
              {m.caption && <figcaption>{m.caption}</figcaption>}
            </figure>
          ),
        )}
      </div>
    </div>
  );
}
