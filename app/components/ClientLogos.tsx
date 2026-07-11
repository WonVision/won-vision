/* Clients Won Vision shoots for. Logos are normalised to a uniform optical
   HEIGHT (a fixed box + object-fit:contain), so different source aspect ratios
   all read at one visual weight. Every logo shows in its real brand colour —
   no hover interaction.

   The one exception: logos whose artwork is white (designed for dark
   backgrounds) would be invisible on the white paper. Those are flagged `mono`
   and rendered solid black via CSS `brightness(0)`. */
type Client = {
  name: string;
  src: string;
  /* true for white/reverse artwork: rendered solid black so it reads on the
     white background (brand colour would be invisible) */
  mono?: boolean;
};

const clients: Client[] = [
  { name: 'Marshall White', src: '/logos/marshall-white.webp' },
  { name: 'Henley', src: '/logos/henley.webp' },
  { name: 'Jellis Craig', src: '/logos/jellis-craig.webp' },
  { name: 'Barry Plant', src: '/logos/barry-plant.webp' },
  { name: 'Harcourts', src: '/logos/harcourts.svg' },
  { name: 'Hunter French', src: '/logos/hunter-french.webp' },
  { name: 'Raine & Horne', src: '/logos/raine-horne.webp' },
  { name: 'Bella Real Estate', src: '/logos/bella.webp', mono: true },
  { name: 'Belle Property', src: '/logos/belle.webp' },
  { name: 'LJ Hooker', src: '/logos/lj-hooker.webp' },
  { name: 'Century 21', src: '/logos/century-21.webp' },
  { name: 'CM Realty', src: '/logos/cm-realty.webp' },
  { name: 'RT Edgar', src: '/logos/rt-edgar.webp', mono: true },
  { name: 'Area Specialist', src: '/logos/area-specialist-2.webp', mono: true },
  { name: 'Buxton', src: '/logos/buxton.svg' },
  { name: 'Anna Grace', src: '/logos/anna-grace.webp' },
  { name: 'Professionals Real Estate', src: '/logos/professionals.webp' },
  { name: 'CHN', src: '/logos/chn.webp' },
];

/* On mobile the list is split across two marquee lines (top scrolls right,
   bottom scrolls left) so more of the now-long client roster is on screen at
   once. On desktop both halves merge back into one centered wrap. */
const splitAt = Math.ceil(clients.length / 2);
const rowTop = clients.slice(0, splitAt);
const rowBottom = clients.slice(splitAt);

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
  /* desktop: tickers + rows collapse (display:contents) so every logo lays out
     as one centered wrap directly in the viewport */
  .clients__viewport{
    max-width:1040px;
    margin-inline:auto;
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    justify-content:center;
    gap:clamp(24px, 4vw, 52px);
  }
  .clients__ticker{display:contents;}
  .clients__row{display:contents;}
  /* duplicate rows exist only to seed the mobile marquee loop */
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
  }

  /* White/reverse artwork → rendered solid black so it reads on white paper */
  .clients__logo--mono img{filter:brightness(0);}

  @media (prefers-reduced-motion:reduce){
    .clients__ticker{animation:none !important;}
  }

  /* --- mobile: two continuous marquee lines — top → right, bottom → left --- */
  @media (max-width:760px){
    .clients__viewport{
      max-width:100%;
      display:block;
      overflow:hidden;
      /* feather both edges so logos glide in/out instead of hard-clipping */
      -webkit-mask-image:linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
              mask-image:linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
    }
    .clients__ticker{
      display:flex;
      width:max-content;
    }
    /* top line drifts right, bottom line drifts left (opposing motion) */
    .clients__ticker--top{animation:clients-scroll-right 34s linear infinite;}
    .clients__ticker--bottom{
      animation:clients-scroll-left 30s linear infinite;
      margin-top:clamp(18px, 5vw, 28px);
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
  /* leftward loop: original → duplicate */
  @keyframes clients-scroll-left{
    from{transform:translateX(0);}
    to{transform:translateX(-50%);}
  }
  /* rightward loop: start on the duplicate and slide back to the original */
  @keyframes clients-scroll-right{
    from{transform:translateX(-50%);}
    to{transform:translateX(0);}
  }
      `}</style>

      <span className="eyebrow clients__label">Trusted by Melbourne&rsquo;s best</span>

      {/* Mobile: two marquee lines, each holding two identical rows so the loop
          is seamless (translateX(-50%)); top scrolls right, bottom scrolls
          left. Desktop: the tickers/rows are display:contents and the dupes are
          hidden, so all logos collapse into one centered wrap. */}
      <div className="clients__viewport">
        <div className="clients__ticker clients__ticker--top">
          <div className="clients__row">{rowTop.map((c) => renderLogo(c))}</div>
          <div className="clients__row clients__row--dupe" aria-hidden="true">
            {rowTop.map((c) => renderLogo(c, true))}
          </div>
        </div>
        <div className="clients__ticker clients__ticker--bottom">
          <div className="clients__row">{rowBottom.map((c) => renderLogo(c))}</div>
          <div className="clients__row clients__row--dupe" aria-hidden="true">
            {rowBottom.map((c) => renderLogo(c, true))}
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
  return (
    <div key={key} className={`clients__logo${client.mono ? ' clients__logo--mono' : ''}`}>
      {/* plain <img>: renders any format with no optimizer config; below the fold so no LCP cost */}
      <img src={client.src} alt={dupe ? '' : client.name} aria-hidden={dupe || undefined} loading="lazy" decoding="async" />
    </div>
  );
}
