import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { Wordmark } from '../components/Wordmark';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Won Vision gallery — selected Melbourne real estate photography, listing video, drone aerials, floor plans and virtual staging from across Melbourne and Victoria.',
};

export default function GalleryPage() {
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
          <Link href="/gallery" aria-current="page">Gallery</Link>
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
          <li><Link href="/gallery"><em>Gallery</em></Link></li>
          <li><Link href="/book" className="drawer-cta">Book now →</Link></li>
        </ul>
        <div className="nav__drawer__foot">
          <span>Won Vision</span><span>Melbourne · 2026</span>
        </div>
      </aside>

      {/* L — TYPE-AS-WINDOW HEADER */}
      <section className="gallery-hero">
        <div className="gallery-hero__bg"></div>
        <div className="gallery-hero__veil"></div>

        <header className="gallery-hero__top">
          <span className="eyebrow">Won Vision · Selected work</span>
        </header>

        <div className="gallery-hero__big">
          <h1 className="typed">GALLERY</h1>
        </div>
      </section>

      {/* FILTERS — two-level (top category + sub) */}
      <span id="galCtlSentinel" aria-hidden="true" style={{ display: 'block', height: 1, marginBottom: -1 }} />
      <div className="gallery-controls">
        <div className="gallery-controls__inner">
          <div className="filters" role="tablist" data-filter-row="top">
            <button className="filter is-active" data-cat="all">All</button>
            <button className="filter" data-cat="photography">Photography</button>
            <button className="filter" data-cat="virtual-editing">Virtual editing</button>
          </div>
        </div>
        <div className="gallery-controls__inner gallery-controls__sub" data-sub-for="photography" hidden>
          <div className="filters" role="tablist" data-filter-row="sub">
            <button className="filter is-active" data-sub="all">All</button>
            <button className="filter" data-sub="day">Day photography</button>
            <button className="filter" data-sub="aerial">Aerials</button>
          </div>
        </div>
        <div className="gallery-controls__inner gallery-controls__sub" data-sub-for="virtual-editing" hidden>
          <div className="filters" role="tablist" data-filter-row="sub">
            <button className="filter is-active" data-sub="all">All</button>
            <button className="filter" data-sub="staging">Virtual staging</button>
            <button className="filter" data-sub="declutter">Decluttering</button>
            <button className="filter" data-sub="dusk">Day to dusk</button>
          </div>
        </div>
      </div>

      {/* GALLERY GRID */}
      <section className="gallery">
        <div className="gallery__grid">

          <article className="gallery__item s8" data-cat="photography" data-sub="day"
                   data-place="Won Vision · Selected work"
                   data-full="/images/showcase.webp">
            <img src="/images/showcase.webp" alt="Showcase listing" />
            <div className="gallery__item__caption">
              <p className="place">Showcase</p>
              <p className="tags">Day photography</p>
            </div>
          </article>

          <article className="gallery__item s4" data-cat="photography" data-sub="day"
                   data-place="Won Vision · Selected work"
                   data-full="/images/rental-compact.webp">
            <img src="/images/rental-compact.webp" alt="Rental compact interior" />
            <div className="gallery__item__caption">
              <p className="place">Rental · Compact</p>
              <p className="tags">Day photography</p>
            </div>
          </article>

          <article className="gallery__item s4" data-cat="photography" data-sub="day"
                   data-place="Won Vision · Selected work"
                   data-full="/images/rental-standard.webp">
            <img src="/images/rental-standard.webp" alt="Rental standard interior" />
            <div className="gallery__item__caption">
              <p className="place">Rental · Standard</p>
              <p className="tags">Day photography</p>
            </div>
          </article>

          <article className="gallery__item s4" data-cat="photography" data-sub="day"
                   data-place="Won Vision · Selected work"
                   data-full="/images/rental-large.webp">
            <img src="/images/rental-large.webp" alt="Rental large interior" />
            <div className="gallery__item__caption">
              <p className="place">Rental · Large</p>
              <p className="tags">Day photography</p>
            </div>
          </article>

          <article className="gallery__item s4" data-cat="photography" data-sub="day"
                   data-place="Won Vision · Selected work"
                   data-full="/images/sales-compact.webp">
            <img src="/images/sales-compact.webp" alt="Sales compact interior" />
            <div className="gallery__item__caption">
              <p className="place">Sales · Compact</p>
              <p className="tags">Day photography</p>
            </div>
          </article>

          <article className="gallery__item s6" data-cat="photography" data-sub="day"
                   data-place="Won Vision · Selected work"
                   data-full="/images/sales-standard.webp">
            <img src="/images/sales-standard.webp" alt="Sales standard interior" />
            <div className="gallery__item__caption">
              <p className="place">Sales · Standard</p>
              <p className="tags">Day photography</p>
            </div>
          </article>

          <article className="gallery__item s6" data-cat="photography" data-sub="day"
                   data-place="Won Vision · Selected work"
                   data-full="/images/sales-premium.webp">
            <img src="/images/sales-premium.webp" alt="Sales premium interior" />
            <div className="gallery__item__caption">
              <p className="place">Sales · Premium</p>
              <p className="tags">Day photography</p>
            </div>
          </article>

          <article className="gallery__item s4" data-cat="photography" data-sub="day"
                   data-place="Won Vision · Selected work"
                   data-full="/images/additional-photos.webp">
            <img src="/images/additional-photos.webp" alt="Additional photos" />
            <div className="gallery__item__caption">
              <p className="place">Additional photos</p>
              <p className="tags">Day photography</p>
            </div>
          </article>

          {/* Virtual editing — before/after sliders */}
          <article className="gallery__item gallery__item--slider s6" data-cat="virtual-editing" data-sub="staging">
            <BeforeAfterSlider
              beforeSrc="/images/staging-before.webp"
              afterSrc="/images/staging-after.webp"
              beforeAlt="Empty room before virtual staging"
              afterAlt="Room after virtual staging"
              label="Virtual staging — empty → furnished"
            />
          </article>

          <article className="gallery__item gallery__item--slider s6" data-cat="virtual-editing" data-sub="declutter">
            <BeforeAfterSlider
              beforeSrc="/images/declutter-before.webp"
              afterSrc="/images/declutter-after.webp"
              beforeAlt="Cluttered room before decluttering"
              afterAlt="Room after decluttering"
              label="Decluttering — cleared & tidied"
            />
          </article>

          <article className="gallery__item gallery__item--slider s6" data-cat="virtual-editing" data-sub="dusk">
            <BeforeAfterSlider
              beforeSrc="/images/dusk-before.webp"
              afterSrc="/images/dusk-after.webp"
              beforeAlt="Daytime exterior before day-to-dusk"
              afterAlt="Exterior after day-to-dusk conversion"
              label="Day to dusk — daylight → dusk"
            />
          </article>

        </div>
        <p className="gallery__empty" data-gallery-empty hidden>Aerial work coming soon.</p>
      </section>

      {/* CTA STRIP — framed block (Option C) */}
      <section className="cta-c">
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

      {/* Filter bar: same pinned-gated + debounced nav-coupled lift as /book.
          Lift ONLY when the bar is actually pinned (sentinel + IO) AND the
          navbar has been hidden continuously >220ms (cancel-on-show). So it
          rises to cover the vacated nav area on a real scroll, never overlaps
          preceding content while unpinned, and never bounces on jitter. */}
      <Script id="wv-gallery-ctl" strategy="afterInteractive">{`
(function(){
  var bar = document.querySelector('.gallery-controls');
  var sentinel = document.getElementById('galCtlSentinel');
  var nav = document.querySelector('.nav');
  if(!bar || !nav) return;
  var HIDE_MS = 220, pend = null, pinned = false;
  var apply = function(){
    var shouldLift = pinned && nav.classList.contains('is-hidden');
    if(shouldLift){
      if(bar.classList.contains('is-navhidden')) return;
      if(pend) return;
      pend = setTimeout(function(){
        pend = null;
        if(pinned && nav.classList.contains('is-hidden')) bar.classList.add('is-navhidden');
      }, HIDE_MS);
    } else {
      if(pend){ clearTimeout(pend); pend = null; }
      bar.classList.remove('is-navhidden');
    }
  };
  if(sentinel && 'IntersectionObserver' in window){
    new IntersectionObserver(function(entries){
      pinned = entries[0].boundingClientRect.top <= 0;
      apply();
    }, { threshold:[0,1] }).observe(sentinel);
  }
  apply();
  new MutationObserver(apply).observe(nav, { attributes:true, attributeFilter:['class'] });
})();
`}</Script>
    </>
  );
}
