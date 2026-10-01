/* Clients Won Vision shoots for, as one slow sliding belt. Logos are
   normalised to a uniform optical HEIGHT (a fixed box + object-fit:contain),
   so different source aspect ratios all read at one visual weight. The belt
   is greyscale and the logo under the cursor returns to full brand colour.

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

/* One continuous marquee on every screen size. The row is rendered twice so
   the loop can translate by -50% and land the copy exactly on the original,
   with no visible seam. */

export default function ClientLogos() {
  return (
    <section className="clients" aria-label="Clients we work with">
      <style>{`
  .clients{
    background:var(--paper);
    padding:clamp(40px, 6vw, 72px) 0;
    text-align:center;
  }
  .clients__label{
    display:block;
    margin:0 0 clamp(20px, 3vw, 32px);
  }
  .clients__viewport{
    overflow:hidden;
    /* feather both edges so logos glide in and out instead of hard-clipping */
    -webkit-mask-image:linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
            mask-image:linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  }
  .clients__ticker{
    display:flex;
    width:max-content;
    animation:clients-scroll-left 60s linear infinite;
  }
  /* Hold the belt still while someone is reading it, so the logo they want to
     hover doesn't slide out from under the cursor. */
  .clients__viewport:hover .clients__ticker{animation-play-state:paused;}
  .clients__row{
    display:flex;
    flex-wrap:nowrap;
    align-items:center;
    width:max-content;
  }
  /* Uniform bounding box: height- and width-capped + contained, so wide
     wordmarks and square marks all read at one weight. The trailing margin
     sits on every cell (incl. the last) so both copies measure the same and
     translateX(-50%) stays seamless. */
  .clients__logo{
    position:relative;
    box-sizing:border-box;
    flex:0 0 auto;
    width:clamp(104px, 11vw, 150px);
    height:clamp(38px, 4.4vw, 50px);
    margin-right:clamp(32px, 5vw, 64px);
  }
  .clients__logo img{
    width:100%;
    height:100%;
    object-fit:contain;
    object-position:center;
    /* Grey by default; the one under the cursor returns to brand colour. */
    filter:grayscale(1);
    opacity:0.55;
    transition:filter .3s ease, opacity .3s ease;
  }
  .clients__logo:hover img{
    filter:none;
    opacity:1;
  }
  /* White/reverse artwork has no visible brand colour on white paper, so it
     stays solid black and only lifts in contrast on hover. */
  .clients__logo--mono img{filter:brightness(0);opacity:0.45;}
  .clients__logo--mono:hover img{filter:brightness(0);opacity:1;}

  @media (prefers-reduced-motion:reduce){
    .clients__ticker{animation:none;}
    .clients__viewport{overflow-x:auto;}
  }

  @keyframes clients-scroll-left{
    from{transform:translateX(0);}
    to{transform:translateX(-50%);}
  }
      `}</style>

      <span className="eyebrow clients__label">Trusted by Melbourne&rsquo;s best</span>

      <div className="clients__viewport">
        <div className="clients__ticker">
          <div className="clients__row">{clients.map((c) => renderLogo(c))}</div>
          <div className="clients__row" aria-hidden="true">
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
  return (
    <div key={key} className={`clients__logo${client.mono ? ' clients__logo--mono' : ''}`}>
      {/* plain <img>: renders any format with no optimizer config; below the fold so no LCP cost */}
      <img src={client.src} alt={dupe ? '' : client.name} aria-hidden={dupe || undefined} loading="lazy" decoding="async" />
    </div>
  );
}
