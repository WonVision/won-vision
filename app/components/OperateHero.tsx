export default function OperateHero() {
  return (
    <section className="gallery-hero">
      <div className="gallery-hero__bg"></div>
      <div className="gallery-hero__veil"></div>

      <header className="gallery-hero__top">
        <span className="eyebrow">Won Vision · How we operate</span>
      </header>

      <div className="gallery-hero__big">
        <span className="operate-hero__pretitle">How We</span>
        <h1 className="typed">OPERATE</h1>
      </div>

      <style jsx>{`
        .operate-hero__pretitle{
          display:block;text-align:center;
          font-family:var(--body);font-size:14px;letter-spacing:0.32em;text-transform:uppercase;
          color:rgba(120,120,118,0.85);font-weight:500;
          margin-bottom:14px;
        }
        @media (max-width:760px){
          .operate-hero__pretitle{font-size:11px;letter-spacing:0.28em;margin-bottom:10px}
        }
      `}</style>
    </section>
  );
}
