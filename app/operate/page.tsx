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
          <Link href="/operate" aria-current="page">How we operate</Link>
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
          <li><Link href="/operate"><em>How we operate</em></Link></li>
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

        {/* CTA — identical to /gallery and homepage */}
        <section id="contact" className="cta-c" style={{ scrollMarginTop: 90 }}>
          <div className="cta-c__box">
            <div>
              <span className="eyebrow">Book the studio</span>
              <h2 className="cta-c__h">Bring your <em>next listing</em> to the studio.</h2>
            </div>
            <div className="cta-c__act">
              <Link href="/book" className="cta-c__btn cta-c__btn--solid">Book a shoot →</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="foot__inner">
          <div className="foot__top reveal-stagger">
            <div>
              <Link href="/#top" aria-label="Won Vision"><Wordmark /></Link>
              <p>A Melbourne property media studio. Photography, video, drone, floor plans, virtual staging. Same day turn around.</p>
            </div>
            <div>
              <h4>Studio</h4>
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
                <li><a href="mailto:hello@wonvision.com.au">hello@wonvision.com.au</a></li>
                <li><a href="tel:+61493714609">0493 714 609</a></li>
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
    </>
  );
}
