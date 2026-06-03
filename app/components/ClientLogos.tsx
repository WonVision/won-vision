/* Clients Won Vision shoots for. Logos are normalised to a uniform optical
   HEIGHT (the box caps height + width and uses object-fit:contain), so it
   doesn't matter that source files have different aspect ratios — drop any
   clean PNG/SVG into /public/logos and it sits at the same visual weight.
   Greyscale + dimmed at rest to stay on Won Vision's mono brand; the source
   colour fades in on hover. */
type Client = {
  name: string;
  src: string;
  /* V Group's logo is built on a solid black field (dark-mode artwork). We
     keep it identical to the source rather than recolouring it, so it sits on
     its own sharp dark chip and the black reads as an intentional badge. */
  chip?: boolean;
};

const clients: Client[] = [
  { name: 'V Group Real Estate', src: '/logos/vgroup.webp', chip: true },
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
    /* generous, even rhythm between the three marks */
    gap:clamp(36px, 7vw, 88px);
    flex-wrap:nowrap;
    max-width:840px;
    margin-inline:auto;
  }
  /* Uniform bounding box: every logo is height-capped and width-capped and
     contained, so wide wordmarks and square icons all read at one weight. */
  .clients__logo{
    position:relative;
    flex:0 1 auto;
    box-sizing:border-box;
    width:clamp(96px, 22vw, 168px);
    height:clamp(34px, 5.5vw, 52px);
  }
  /* Dark badge for logos that ship on a black field (V Group). Sharp edges
     to match the Won Vision brand — no border-radius. Fills the box so the
     artwork's own black blends into one clean badge instead of a stray box. */
  .clients__logo--chip{
    background:#000;
    padding-inline:clamp(8px, 1.4vw, 14px);
  }
  .clients__logo img{
    width:100%;
    height:100%;
    object-fit:contain;
    object-position:center;
    /* mono + dimmed at rest */
    filter:grayscale(100%) contrast(1.02);
    opacity:0.5;
    transition:filter .45s ease, opacity .45s ease;
  }
  .clients__logo:hover img,
  .clients__logo:focus-within img{
    filter:grayscale(0%) contrast(1);
    opacity:1;
  }
  /* Touch / reduced-motion: show them mono but legible, no hover dependency */
  @media (hover:none){
    .clients__logo img{opacity:0.7}
  }
  @media (prefers-reduced-motion:reduce){
    .clients__logo img{transition:none}
  }
      `}</style>

      <span className="eyebrow clients__label">Trusted by Melbourne&rsquo;s best</span>

      <div className="clients__row">
        {clients.map((client) => (
          <div
            key={client.name}
            className={`clients__logo${client.chip ? ' clients__logo--chip' : ''}`}
          >
            {/* plain <img>: renders SVG/PNG/WebP with no optimizer config,
                and these sit below the fold so there's no LCP cost */}
            <img src={client.src} alt={client.name} loading="lazy" decoding="async" />
          </div>
        ))}
      </div>
    </section>
  );
}
