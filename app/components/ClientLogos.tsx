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
  { name: 'V Group Real Estate', src: '/logos/vgroup-colour.webp', bwSrc: '/logos/vgroup-bw.webp' },
  { name: 'Henley', src: '/logos/henley.webp' },
  { name: 'Raine & Horne', src: '/logos/raine-horne.webp' },
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
  .clients__row{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:clamp(36px, 7vw, 88px);
    flex-wrap:nowrap;
    max-width:840px;
    margin-inline:auto;
  }
  /* Uniform bounding box: height- and width-capped + contained, so wide
     wordmarks and square marks all read at one weight. */
  .clients__logo{
    position:relative;
    flex:0 1 auto;
    box-sizing:border-box;
    width:clamp(96px, 22vw, 168px);
    height:clamp(34px, 5.5vw, 52px);
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
  }
      `}</style>

      <span className="eyebrow clients__label">Trusted by Melbourne&rsquo;s best</span>

      <div className="clients__row">
        {clients.map((client) =>
          client.bwSrc ? (
            <div key={client.name} className="clients__logo clients__logo--swap">
              <img className="clients__bw" src={client.bwSrc} alt={client.name} loading="lazy" decoding="async" />
              <img className="clients__colour" src={client.src} alt="" aria-hidden="true" loading="lazy" decoding="async" />
            </div>
          ) : (
            <div key={client.name} className="clients__logo clients__logo--mono">
              {/* plain <img>: renders any format with no optimizer config; below the fold so no LCP cost */}
              <img src={client.src} alt={client.name} loading="lazy" decoding="async" />
            </div>
          )
        )}
      </div>
    </section>
  );
}
