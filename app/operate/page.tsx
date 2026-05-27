import type { Metadata } from 'next';
import Link from 'next/link';
import { Wordmark } from '../components/Wordmark';
import OperateHero from '../components/OperateHero';
import OperateConveyor from '../components/OperateConveyor';

export const metadata: Metadata = {
  title: 'How We Operate',
  description:
    'How Won Vision operates — the booking, the shoot, the in-house edit, the Client Portal, and the same-day delivery. Built so the campaign goes live by tomorrow without trading off craft.',
  alternates: { canonical: 'https://wonvision.com.au/operate' },
  openGraph: {
    title: 'How We Operate — Won Vision',
    description:
      'Five stages, one system. Photos same day. Video and floor plans in 48 hours. Every shoot lands in your Client Portal.',
    url: 'https://wonvision.com.au/operate',
    type: 'website',
  },
};

export default function OperatePage() {
  return (
    <>
      <header className="nav">
        <div className="nav__brand">
          <Link href="/#top" aria-label="Won Vision">
            <Wordmark />
          </Link>
        </div>
        <nav className="nav__links">
          <Link href="/#services">Services</Link>
          <Link href="/#contact">Contact</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/operate" aria-current="page">Operate</Link>
        </nav>
        <div className="nav__right">
          <Link href="/book" className="nav__cta">Book now</Link>
        </div>
        <button className="nav__burger" aria-label="Menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </header>
      <aside className="nav__drawer" aria-hidden="true">
        <ul>
          <li><Link href="/#services">Services</Link></li>
          <li><Link href="/#contact">Contact</Link></li>
          <li><Link href="/gallery">Gallery</Link></li>
          <li><Link href="/operate"><em>Operate</em></Link></li>
          <li><Link href="/book" className="drawer-cta">Book now →</Link></li>
        </ul>
        <div className="nav__drawer__foot">
          <span>Won Vision</span><span>Melbourne · 2026</span>
        </div>
      </aside>

      <main id="top">
        <OperateHero />

        <div id="operate-flow">
          <OperateConveyor />
        </div>

        <section className="op-cta">
          <div className="op-cta__inner">
            <h2>
              Most studios sell<br />
              a shoot. We sell<br />
              a campaign.
            </h2>
            <Link href="/book" className="op-cta__btn">Book a shoot</Link>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="foot__inner">
          <div className="foot__grid">
            <div>
              <h4>Won Vision</h4>
              <ul>
                <li>Melbourne real estate photography</li>
                <li>Same day · 100km service radius</li>
              </ul>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                <li><Link href="/#services">Services</Link></li>
                <li><Link href="/gallery">Gallery</Link></li>
                <li><Link href="/operate">How we operate</Link></li>
                <li><Link href="/book">Book now</Link></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li><a href="mailto:admin@wonvision.com.au">admin@wonvision.com.au</a></li>
                <li><a href="https://www.instagram.com/won.vision/" target="_blank" rel="noopener">Instagram</a></li>
              </ul>
            </div>
            <div>
              <h4>Operations</h4>
              <ul>
                <li>Won Vision Pty Ltd</li>
                <li><Link href="/terms">Terms</Link></li>
                <li><Link href="/privacy">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="foot__rule"></div>
          <div className="foot__bot">
            <span>© 2026 Won Vision Pty Ltd</span>
            <span>Same day turn around.</span>
            <span>Melbourne · Made in-house</span>
          </div>
        </div>
      </footer>

      <style>{`
        .op-cta{
          background:#fff; color:#000;
          border-top:1px solid #e5e5e5;
          padding: 140px 6vw;
          text-align:center;
        }
        .op-cta__inner{display:flex; flex-direction:column; align-items:center; gap:36px;}
        .op-cta h2{
          font-size: clamp(36px, 6vw, 84px);
          font-weight:600; letter-spacing:-.03em; text-transform:uppercase;
          line-height:.98; margin:0;
        }
        .op-cta__btn{
          display:inline-block; background:#000; color:#fff;
          padding: 18px 42px;
          font-size:12px; letter-spacing:.24em; text-transform:uppercase; font-weight:600;
          text-decoration:none;
        }
        @media (max-width: 760px){
          .op-cta{padding: 90px 6vw;}
        }
      `}</style>
    </>
  );
}
