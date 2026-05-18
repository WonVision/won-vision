import type { Metadata } from 'next';
import Link from 'next/link';
import { Wordmark } from '../components/Wordmark';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Terms and conditions for Won Vision Pty Ltd — a Melbourne real-estate property media studio. Services, booking, payment, licensing, cancellation and liability.',
  robots: { index: true, follow: true },
};

export default function TermsPage() {
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
          <h1 className="legal__title">Terms &amp; Conditions</h1>
          <p className="legal__meta">Won Vision Pty Ltd · Effective 18 May 2026</p>

          <p>
            These terms govern the supply of property media services by Won Vision Pty Ltd
            (&ldquo;Won Vision&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) to the client who books a shoot
            (&ldquo;you&rdquo;). By placing a booking you agree to these terms.
          </p>

          <h2>1. Services</h2>
          <p>
            Won Vision provides real-estate property media including listing photography,
            aerial/drone imagery, floor plans, and virtual editing services — virtual staging,
            decluttering, and day-to-dusk conversions. The specific deliverables for your job are
            those selected at the time of booking.
          </p>

          <h2>2. Booking &amp; payment</h2>
          <p>
            A booking is confirmed once the property details and a shoot slot have been submitted
            and accepted by us. Payment is taken at checkout or invoiced to the agency on agreed
            terms where an account is in place. Prices are quoted ex-GST unless stated otherwise;
            a tax invoice is issued after delivery.
          </p>

          <h2>3. Introductory promotion</h2>
          <p>
            Any introductory promotion is applied only via a manual code supplied by Won Vision and
            is available to new clients on their first three jobs only. No discount is applied
            automatically. The promotion may be withdrawn or varied at any time and cannot be
            combined with other offers.
          </p>

          <h2>4. Delivery timeframes</h2>
          <p>
            Standard photography is generally delivered the same day the property is shot. Aerial
            work, floor plans, and virtual editing services may require additional turnaround.
            Quoted timeframes are targets made in good faith and may be affected by weather,
            access, or factors outside our control.
          </p>

          <h2>5. Image licensing</h2>
          <p>
            On full payment, Won Vision grants the booking agent a licence to use the delivered
            images for marketing the specific listing the media was produced for, including online
            portals, social media, print, and signage. Won Vision retains copyright in all images
            and may use them for portfolio and promotional purposes. The licence does not extend to
            on-selling the images or use unrelated to the original listing without our written
            consent.
          </p>

          <h2>6. Cancellation &amp; reschedule</h2>
          <p>
            Bookings may be rescheduled where reasonable notice is given. Cancellations or changes
            made within 24 hours of the booked slot may incur a fee to cover crew already
            scheduled. Shoots may be postponed by us where weather or site conditions make safe or
            quality work impractical, particularly for aerial work.
          </p>

          <h2>7. Liability</h2>
          <p>
            To the extent permitted by law, Won Vision&rsquo;s liability for any claim arising from
            the services is limited to re-supplying the affected media or refunding the amount paid
            for that media. We are not liable for indirect or consequential loss. Nothing in these
            terms excludes rights you have under the Australian Consumer Law that cannot lawfully be
            excluded.
          </p>

          <h2>8. Governing law</h2>
          <p>
            These terms are governed by the laws of Victoria, Australia, and the parties submit to
            the non-exclusive jurisdiction of the courts of that State.
          </p>

          <h2>9. Contact</h2>
          <p>
            Questions about these terms can be sent to{' '}
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
                <li>Drone operations</li>
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
