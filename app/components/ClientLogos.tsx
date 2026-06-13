/* Clients Won Vision shoots for. Logos are normalised to a uniform optical
   HEIGHT (a fixed box + object-fit:contain), so different source aspect ratios
   all read at one visual weight. Rest state is solid black-and-white; brand
   colour fades in on hover.

   Two rendering paths:
   - Most logos are dark artwork on transparent, so CSS `brightness(0)` blacks
     them out cleanly at rest and `filter:none` restores colour on hover.
   - V Group ships as light artwork on a black field (dark-mode logo). CSS can't
     black that out without leaving grey, so we crossfade a dedicated solid-black
     file (rest) and a colour-on-transparent file (hover). */
type Client = {
  name: string;
  src: string;
  /* present only for logos whose colour artwork can't be CSS-blacked cleanly:
     a separate pre-rendered black-and-white file shown at rest */
  bwSrc?: string;
};

const clients: Client[] = [
  { name: 'Marshall White', src: '/logos/marshall-white.webp' },
  { name: 'Jellis Craig', src: '/logos/jellis-craig.webp' },
  { name: 'Henley', src: '/logos/henley.webp' },
  { name: 'Raine & Horne', src: '/logos/raine-horne.webp' },
  { name: 'Hunter French', src: '/logos/hunter-french.webp' },
  { name: 'Pink & Blue Real Estate', src: '/logos/pink-blue.webp' },
  { name: 'V Group Real Estate', src: '/logos/vgroup-colour.webp', bwSrc: '/logos/vgroup-bw.webp' },
];

export default function ClientLogos() {
  return (
    <section className="clients" aria-label="Clients we work with">
      <style>{`
  .clients{
    background:var(--paper);
    padding:clamp(40px, 6vw, 72px) clamp(16px, 5vw, 40px);
    text-align:center;
  }
  .clients__label{
    display:block;
    margin:0 0 clamp(20px, 3vw, 32px);
  }
  .clients__viewport{
    max-width:1040px;
    margin-inline:auto;
  }
  /* desktop: ticker collapses so the row lays out directly in the viewport */
  .clients__ticker{display:contents;}
  .clients__row{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:clamp(24px, 4vw, 52px);
    flex-wrap:wrap;
  }
  /* duplicate row exists only to seed the mobile marquee loop */
  .clients__row--dupe{display:none;}
  /* Uniform bounding box: height- and width-capped + contained, so wide
     wordmarks and square marks all read at one weight. */
  .clients__logo{
    position:relative;
    flex:0 1 auto;
    box-sizing:border-box;
    width:clamp(80px, 15vw, 150px);
    height:clamp(34px, 5.5vw, 50px);
  }
  .clients__logo img{
    width:100%;
    height:100%;
    object-fit:contain;
    object-position:center;
    transition:filter .45s ease, opacity .45s ease;
  }

  /* --- CSS-blacked logos: solid black at rest, colour on hover --- */
  .clients__logo--mono img{filter:brightness(0);}
  .clients__logo--mono:hover img,
  .clients__logo--mono:focus-within img{filter:none;}

  /* --- crossfade logos (V Group): stack the two files, fade on hover --- */
  .clients__logo--swap .clients__bw,
  .clients__logo--swap .clients__colour{position:absolute;inset:0;}
  .clients__logo--swap .clients__colour{opacity:0;}
  .clients__logo--swap:hover .clients__bw,
  .clients__logo--swap:focus-within .clients__bw{opacity:0;}
  .clients__logo--swap:hover .clients__colour,
  .clients__logo--swap:focus-within .clients__colour{opacity:1;}

  /* Touch devices can't hover — show full colour so the brand colours aren't
     stranded behind an interaction they can't trigger. */
  @media (hover:none){
    .clients__logo--mono img{filter:none;}
    .clients__logo--swap .clients__bw{opacity:0;}
    .clients__logo--swap .clients__colour{opacity:1;}
  }
  @media (prefers-reduced-motion:reduce){
    .clients__logo img{transition:none;}
    .clients__ticker{animation:none;}
  }

  /* --- mobile: continuous horizontal ticker --- */
  @media (max-width:760px){
    .clients__viewport{
      max-width:100%;
      overflow:hidden;
      /* feather both edges so logos glide in/out instead of hard-clipping */
      -webkit-mask-image:linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
              mask-image:linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
    }
    .clients__ticker{
      display:flex;
      width:max-content;
      animation:clients-scroll 32s linear infinite;
    }
    .clients__row,
    .clients__row--dupe{
      display:flex;
      flex-wrap:nowrap;
      justify-content:flex-start;
      gap:0;
      width:max-content;
    }
    /* trailing margin on every cell (incl. the last) keeps each copy the same
       width, so translateX(-50%) lands the duplicate exactly on the original */
    .clients__logo{
      margin-right:clamp(28px, 9vw, 44px);
      flex:0 0 auto;
    }
  }
  @keyframes clients-scroll{
    from{transform:translateX(0);}
    to{transform:translateX(-50%);}
  }
      `}</style>

      <span className="eyebrow clients__label">Trusted by Melbourne&rsquo;s best</span>

      {/* viewport clips the overflow on mobile; the ticker holds two identical
          rows so the marquee loops seamlessly. On desktop the ticker is
          display:contents and the duplicate row is hidden — it stays a plain
          centered wrap. */}
      <div className="clients__viewport">
        <div className="clients__ticker">
          <div className="clients__row">{clients.map((c) => renderLogo(c))}</div>
          <div className="clients__row clients__row--dupe" aria-hidden="true">
            {clients.map((c) => renderLogo(c, true))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* One logo cell. `dupe` marks the second (mobile-ticker-only) copy: its key is
   suffixed and its alt text is dropped so screen readers don't read the row
   twice. */
function renderLogo(client: Client, dupe = false) {
  const key = dupe ? `${client.name}--dupe` : client.name;
  return client.bwSrc ? (
    <div key={key} className="clients__logo clients__logo--swap">
      <img className="clients__bw" src={client.bwSrc} alt={dupe ? '' : client.name} aria-hidden={dupe || undefined} loading="lazy" decoding="async" />
      <img className="clients__colour" src={client.src} alt="" aria-hidden="true" loading="lazy" decoding="async" />
    </div>
  ) : (
    <div key={key} className="clients__logo clients__logo--mono">
      {/* plain <img>: renders any format with no optimizer config; below the fold so no LCP cost */}
      <img src={client.src} alt={dupe ? '' : client.name} aria-hidden={dupe || undefined} loading="lazy" decoding="async" />
    </div>
  );
}
