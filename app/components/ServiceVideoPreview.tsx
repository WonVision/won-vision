'use client';

import { useEffect, useState } from 'react';

// Injects a "Watch film" play button into any .svc-card that carries a
// data-video attribute, and opens that video in the same dark lightbox
// overlay the photo gallery uses. The button's click is intercepted on
// the capturing phase (mirrors ServiceGalleryLightbox) so it never
// reaches the card's bubble-phase add-to-cart handler.

const PLAY_SVG =
  '<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">' +
  '<path d="M8 5v14l11-7z"/>' +
  '</svg>' +
  '<span>Watch film</span>';

export default function ServiceVideoPreview() {
  const [src, setSrc] = useState<string | null>(null);

  // Inject the play button (MutationObserver so cards re-rendered by the
  // booking flow still get one). Cards with data-video skip the generic
  // "Examples" button via ServiceGalleryLightbox's own guard.
  useEffect(() => {
    const inject = (root: ParentNode = document) => {
      const cards = root.querySelectorAll<HTMLElement>('.svc-card[data-video]');
      cards.forEach((card) => {
        const media = card.querySelector('.svc-card__media');
        const video = card.dataset.video;
        if (!media || !video || media.querySelector('[data-video-btn]')) return;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'svc-card__video-btn';
        btn.setAttribute('data-video-btn', video);
        btn.setAttribute('aria-label', 'Watch the cinematic film');
        btn.innerHTML = PLAY_SVG;
        media.appendChild(btn);
      });
    };

    inject();
    const mo = new MutationObserver(() => inject());
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);

  // Capturing click delegate — intercept before the card's add-to-cart.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement | null)?.closest(
        '[data-video-btn]',
      ) as HTMLElement | null;
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      setSrc(btn.dataset.videoBtn ?? null);
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSrc(null);
    };
    document.addEventListener('click', handler, true);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('click', handler, true);
      document.removeEventListener('keydown', esc);
    };
  }, []);

  useEffect(() => {
    if (src) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [src]);

  if (!src) return null;

  return (
    <div
      className="svc-lb"
      role="dialog"
      aria-modal="true"
      aria-label="Cinematic film"
      onClick={() => setSrc(null)}
    >
      <div className="svc-lb__bar">
        <span className="svc-lb__title">Premium Cinematic — film</span>
        <button
          className="svc-lb__close"
          type="button"
          aria-label="Close film"
          onClick={(e) => {
            e.stopPropagation();
            setSrc(null);
          }}
        >
          ×
        </button>
      </div>
      <div className="svc-lb__video" onClick={(e) => e.stopPropagation()}>
        <video
          src={src}
          poster="/images/cinematic.webp"
          controls
          autoPlay
          playsInline
        />
      </div>
    </div>
  );
}
