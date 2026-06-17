'use client';

import { useEffect, useState } from 'react';

type Media = {
  src: string;
  caption?: string;
  type?: 'image' | 'video';
  poster?: string;
};

// Per-service example buckets — keyed by the slug used in book/page.tsx
// .cat[data-gallery="..."] attribute. Each .cat section maps to ONE service
// bucket, so opening Examples from a Video card shows only video examples,
// from a Drone card shows only drone examples, etc.
//
// To add more examples for a service later: drop a webp/mp4 into
// public/images or public/video, then push a new entry onto the matching
// array below — no other component changes required. Buckets with an empty
// array are treated as "no examples yet" and the Examples button is not
// injected for that section.
const galleries: Record<string, Media[]> = {
  photography: [
    { src: '/images/showcase.webp', caption: 'Bedroom' },
    { src: '/images/rental-compact.webp', caption: 'Living room' },
    { src: '/images/rental-standard.webp', caption: 'Living & dining' },
    { src: '/images/rental-large.webp', caption: 'Bedroom' },
    { src: '/images/sales-compact.webp', caption: 'Kitchen & dining' },
    { src: '/images/sales-standard.webp', caption: 'Living room' },
    { src: '/images/sales-premium.webp', caption: 'Bedroom' },
    { src: '/images/additional-photos.webp', caption: 'Bedroom detail' },
    { src: '/images/henry-st-photo-1.webp', caption: 'Living & kitchen' },
    { src: '/images/henry-st-photo-2.webp', caption: 'Kitchen' },
    { src: '/images/henry-st-photo-3.webp', caption: 'Twilight exterior' },
    { src: '/images/wv-exterior-1.webp', caption: 'Exterior' },
    { src: '/images/wv-exterior-2.webp', caption: 'Street view' },
  ],
  // Photo to Video — mirrors the gallery's "phototovideo" bucket. This is the
  // 3 Nitraria Street, Mickleham clip (ends on the V Group Real Estate mark).
  video: [
    {
      src: '/video/property-highlight.mp4',
      type: 'video',
      poster: '/images/property-highlight-poster.webp',
      caption: 'Photo to Video',
    },
  ],
  // Property Highlight — mirrors the gallery's "highlight" bucket exactly.
  highlight: [
    {
      src: '/video/cinematic-listing.mp4',
      type: 'video',
      poster: '/images/cinematic-1-poster.webp',
      caption: 'Property Highlight Video',
    },
    {
      src: '/video/cinematic-listing-2.mp4',
      type: 'video',
      poster: '/images/cinematic-2-poster.webp',
      caption: 'Property Highlight Video',
    },
    {
      src: '/video/property-highlight-2.mp4',
      type: 'video',
      poster: '/images/property-highlight-2-poster.webp',
      caption: 'Property Highlight Video',
    },
  ],
  cinematic: [
    {
      src: '/video/cinematic-v3.mp4',
      type: 'video',
      poster: '/images/cinematic-v3-poster.webp',
      caption: 'Cinematic Listing Video',
    },
    {
      src: '/video/cinematic-465.mp4',
      type: 'video',
      poster: '/images/cinematic-465-poster.webp',
      caption: 'Cinematic Listing Video',
    },
    {
      src: '/video/cinematic-baden.mp4',
      type: 'video',
      poster: '/images/cinematic-baden-poster.webp',
      caption: 'Cinematic Listing Video',
    },
  ],
  drone: [
    { src: '/images/drone-set.webp', caption: 'Aerial set' },
    { src: '/images/henry-st-aerial-1.webp', caption: 'Plot overview' },
    { src: '/images/wv-aerial-plot.webp', caption: 'Plot overview' },
  ],
  staging: [
    { src: '/images/staging-after.webp', caption: 'Virtual staging' },
    { src: '/images/wv-staging-after.webp', caption: 'Virtual staging' },
    { src: '/images/henry-st-staging-after.webp', caption: 'Virtual staging' },
    { src: '/images/dusk-after.webp', caption: 'Day-to-dusk' },
    { src: '/images/declutter-after.webp', caption: 'Decluttering' },
  ],
  // Floor plan render examples land here once we have delivered assets to
  // showcase. Until then the empty array suppresses the Examples button
  // on the standalone Floor Plan + Redraw cards (handled by the length
  // guard in inject()).
  floorplans: [],
  // Scoped to the Floor Plan + Site Plan bundle card only — shows the real
  // combined deliverable where the site plan sits on the same sheet as the
  // floor plan (not a standalone document).
  floorplanbundle: [
    {
      src: '/images/floor-site-plan-example.webp',
      caption: 'Floor plan + site plan — one connected sheet',
    },
  ],
};

const titles: Record<string, string> = {
  photography: 'Photography',
  video: 'Video',
  highlight: 'Property Highlight Video',
  cinematic: 'Cinematic Listing Video',
  drone: 'Aerial / drone',
  staging: 'Virtual staging',
  floorplans: 'Floor plans',
  floorplanbundle: 'Floor Plan + Site Plan',
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
        // Only inject where a gallery exists AND has at least one example —
        // no dead buttons on services that don't yet have showcase media.
        if (!key || !galleries[key] || galleries[key].length === 0) return;
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
      if (key && galleries[key] && galleries[key].length > 0) setActive(key);
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
                src={m.poster ? m.src : `${m.src}#t=0.1`}
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
