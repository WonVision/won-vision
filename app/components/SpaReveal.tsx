'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * script.js sets up its scroll-reveal IntersectionObservers ONCE at load.
 * Next.js client navigation swaps the DOM without re-running it, so on a
 * soft nav (e.g. gallery → home, browser back) the new page's
 * .reveal / .reveal-stagger / .gallery__item elements are never observed
 * and stay opacity:0 → "half the page doesn't load".
 *
 * On every route change (not the first paint — that keeps the nice
 * hard-load staggered entrance) we force-reveal them and nudge the nav
 * light/stuck recompute. Content appears immediately on soft nav instead
 * of blank.
 */
export default function SpaReveal() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const t = setTimeout(() => {
      document
        .querySelectorAll('.reveal, .reveal-stagger, .gallery__item')
        .forEach((el) => el.classList.add('in'));
      // nudge script.js nav light/stuck (it re-queries on scroll)
      window.dispatchEvent(new Event('scroll'));
    }, 60);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
