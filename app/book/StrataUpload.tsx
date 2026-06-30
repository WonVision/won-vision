'use client';

// Optional strata-plan upload, shown on the schedule step only when the cart
// contains a floor/site plan. Uploads go straight to Vercel Blob (same anon
// route the editing-reference uploader uses) and the returned URLs are stashed
// in sessionStorage('wv-strata'); the confirmation page reads them onto the
// booking payload, and booking-submit.js links them into the Ops job notes.

import { useEffect, useRef, useState } from 'react';
import { upload } from '@vercel/blob/client';

type Plan = { name: string; url: string };

const STORE_KEY = 'wv-strata';
const PLAN_CATS = ['floorplan', 'siteplan'];

function cartHasPlan(): boolean {
  try {
    const cart = JSON.parse(sessionStorage.getItem('wv-cart') || '[]');
    return cart.some(
      (it: { categories?: string[] }) =>
        Array.isArray(it.categories) &&
        it.categories.some((c) => PLAN_CATS.includes(String(c).toLowerCase())),
    );
  } catch {
    return false;
  }
}

export function StrataUpload() {
  const [show, setShow] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cart lives in sessionStorage, so gating is client-only — decide on mount.
  useEffect(() => {
    setShow(cartHasPlan());
    try {
      setPlans(JSON.parse(sessionStorage.getItem(STORE_KEY) || '[]'));
    } catch {
      /* ignore */
    }
  }, []);

  function persist(next: Plan[]) {
    setPlans(next);
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }

  async function pick(files: FileList) {
    setErr(null);
    setBusy(true);
    try {
      const added: Plan[] = [];
      for (const file of Array.from(files)) {
        const res = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/book/upload-ref',
        });
        added.push({ name: file.name, url: res.url });
      }
      persist([...plans, ...added]);
    } catch {
      setErr('Upload failed — tap to retry');
    } finally {
      setBusy(false);
    }
  }

  if (!show) return null;

  return (
    <section>
      {/* .wv-drop / .wv-imgchip live in the cart + editing components' style
          blocks, which aren't mounted on the schedule page — scope them here
          so the box matches the booking aesthetic. The rest (section/h3/.row/
          label/.hint) comes from globals.css. */}
      <style>{`
        .wv-drop{display:flex;align-items:center;gap:8px;width:100%;border:1px dashed var(--steel);padding:10px 12px;font-size:11.5px;color:var(--steel);background:var(--paper);cursor:pointer;font-family:var(--body);text-align:left}
        .wv-drop svg{width:15px;height:15px;flex:0 0 15px}
        .wv-drop:disabled{opacity:.6;cursor:default}
        .wv-imgchip{display:flex;align-items:center;gap:8px;margin-bottom:8px}
        .wv-imgchip__nme{font-size:11.5px;color:var(--graphite);flex:1;word-break:break-all}
        .wv-imgchip__rm{font-size:14px;color:var(--steel);background:none;border:0;cursor:pointer}
      `}</style>
      <h3>Strata plans</h3>
      <div className="row">
        <label htmlFor="strataUpload">Have a strata plan? (optional)</label>
        {plans.map((p, i) => (
          <div className="wv-imgchip" key={p.url}>
            <span className="wv-imgchip__nme">{p.name}</span>
            <button
              type="button"
              className="wv-imgchip__rm"
              aria-label={`Remove ${p.name}`}
              onClick={() => persist(plans.filter((_, j) => j !== i))}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          className="wv-drop"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M5 19h14M12 15V5M8 9l4-4 4 4" strokeLinecap="square" />
          </svg>
          {busy ? 'Uploading…' : (err ?? 'Add strata plan (PDF or image)')}
        </button>
        <input
          id="strataUpload"
          ref={inputRef}
          type="file"
          accept="application/pdf,image/jpeg,image/png,image/heic,image/webp"
          multiple
          hidden
          onChange={(e) => {
            if (e.target.files?.length) void pick(e.target.files);
            e.target.value = '';
          }}
        />
        <small className="hint">Optional — but sending your strata/lot plan now speeds up your floor plan delivery.</small>
      </div>
    </section>
  );
}
