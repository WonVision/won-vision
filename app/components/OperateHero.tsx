export default function OperateHero() {
  return (
    <section className="gallery-hero">
      <div className="gallery-hero__bg"></div>
      <div className="gallery-hero__veil"></div>

      <header className="gallery-hero__top">
        <span className="eyebrow">Won Vision · How we operate</span>
      </header>

      <div className="gallery-hero__big">
        <div className="operate-hero__stack">
          <span className="operate-hero__pretitle">How We</span>
          <h1 className="typed">OPERATE</h1>
        </div>
      </div>

      <style jsx>{`
        .operate-hero__stack{
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          gap:18px;width:100%;
        }
        .operate-hero__pretitle{
          font-family:var(--body);font-size:14px;letter-spacing:0.36em;text-transform:uppercase;
          color:rgba(120,120,118,0.78);font-weight:500;
          text-align:center;
        }
        @media (max-width:760px){
          .operate-hero__stack{gap:12px}
          .operate-hero__pretitle{font-size:11px;letter-spacing:0.3em}
        }
      `}</style>
    </section>
  );
}
