'use client';

import { useEffect, useState } from 'react';
import WonVisionLoader from './WonVisionLoader';

const STORAGE_KEY = 'wv-entered';

// wv-noscroll is added to <html> before paint (layout.tsx) to lock scroll while
// the splash is up. Removing it here is the single place scroll is restored.
const unlockScroll = () => document.documentElement.classList.remove('wv-noscroll');

export default function LoaderGate() {
  // Start hidden on the server / first paint to avoid an SSR flash, then
  // decide on the client whether the user has already seen the loader.
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Returning visit: the loader won't show, so clear any stale scroll lock.
    if (sessionStorage.getItem(STORAGE_KEY) === '1') {
      unlockScroll();
      return;
    }
    setShow(true);
  }, []);

  if (!show) return null;

  return (
    <WonVisionLoader
      onComplete={() => {
        sessionStorage.setItem(STORAGE_KEY, '1');
        unlockScroll();
      }}
    />
  );
}
