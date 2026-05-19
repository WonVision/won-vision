import type { Metadata } from 'next';
import Link from 'next/link';
import { Wordmark } from '../components/Wordmark';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for Won Vision Pty Ltd — a Melbourne real-estate property media studio. What we collect, how it is used, storage, and your access and deletion rights.',
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <header className="nav">
        <div className="nav__brand">
          <Link href="/#top" aria-label="Won Vision — home">
            <Wordmark />
          </Link>
        </div>
        <nav className="nav__links">
          <Link href="/#services">Services</Link>
          <Link href="/#contact">Contact</Link>
          <Link href="/gallery">Gallery</Link>
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
          <li><Link href="/book" className="drawer-cta">Book now →</Link></li>
        </ul>
        <div className="nav__drawer__foot">
          <span>Won Vision</span><span>Melbourne · 2026</span>
        </div>
      </aside>

      <main className="legal">
        <article className="legal__article">
          <span className="eyebrow">Legal</span>
          <h1 className="legal__title">Privacy Policy</h1>
          <p className="legal__meta">Won Vision Pty Ltd · Effective 18 May 2026</p>

          <p>
            Won Vision Pty Ltd (&ldquo;Won Vision&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a
            Melbourne real-estate property media studio. This policy explains how we handle personal
            information collected through our booking process.
          </p>

          <h2>1. What we collect</h2>
          <p>
            When you book a shoot we collect the information you provide through the booking form:
            your name, email address, phone number, and the property address for the job. We do not
            ask for sensitive information.
          </p>

          <h2>2. How we use it</h2>
          <p>
            We use your information only to fulfil the shoot, contact you about the booking, and
            deliver the finished media. We may also use your contact details to follow up on a job
            or respond to enquiries you send us.
          </p>

          <h2>3. Storage &amp; third parties</h2>
          <p>
            Booking and contact data is held using reputable hosting and scheduling providers
            engaged to operate our website and bookings. These providers process data on our behalf
            and are not permitted to use it for their own purposes. We do not sell, rent, or trade
            your personal information to anyone.
          </p>

          <h2>4. Access &amp; deletion</h2>
          <p>
            You may request access to the personal information we hold about you, ask us to correct
            it, or request its deletion. We will action reasonable requests promptly, subject to any
            records we are required to retain for tax or legal purposes.
          </p>

          <h2>5. Contact</h2>
          <p>
            For any privacy request or question, contact us at{' '}
            <a href="mailto:hello@wonvision.com.au">hello@wonvision.com.au</a> or{' '}
            <a href="tel:+61416894541">0416 894 541</a>.
          </p>
        </article>
      </main>

      <footer className="foot">
        <div className="foot__inner">
          <div className="foot__top">
            <div>
              <Link href="/#top" aria-label="Won Vision — home"><Wordmark /></Link>
              <p>A Melbourne property media studio. Photography, video, drone, floor plans, virtual staging. Same day turn around.</p>
            </div>
            <div>
              <h4>Studio</h4>
              <ul>
                <li><Link href="/#services">Services</Link></li>
                <li><Link href="/gallery">Gallery</Link></li>
                <li><Link href="/book">Book now</Link></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li><a href="mailto:hello@wonvision.com.au">hello@wonvision.com.au</a></li>
                <li><a href="tel:+61416894541">0416 894 541</a></li>
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
