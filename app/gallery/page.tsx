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
          <Link href="/#top" aria-label="Won Vision">
            <Wordmark />
          </Link>
        </div>
        <nav className="nav__links">
          <Link href="/#services">Services</Link>
          <Link href="/#contact">Contact</Link>
          <Link href="/gallery" aria-current="page">Gallery</Link>
          <Link href="/operate">How we operate</Link>
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
          <li><Link href="/operate">How we operate</Link></li>
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
            <button className="filter" data-cat="video">Video</button>
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
        <div className="gallery-controls__inner gallery-controls__sub" data-sub-for="video" hidden>
          <div className="filters" role="tablist" data-filter-row="sub">
            <button className="filter is-active" data-sub="all">All</button>
            <button className="filter" data-sub="cinematic">Agent listing video</button>
            <button className="filter" data-sub="highlight">Property highlight</button>
            <button className="filter" data-sub="staged">Virtual staged listing video</button>
            <button className="filter" data-sub="socialreel">Social media reel</button>
          </div>
        </div>
      </div>

      {/* GALLERY GRID */}
      <section className="gallery">
        <div className="gallery__grid">

          <article className="gallery__item s8" data-cat="photography" data-sub="day"
                   data-place="Won Vision · Selected work"
                   data-full="/images/showcase.webp">
            <img src="/images/showcase.webp" alt="Listing bedroom" />
            <div className="gallery__item__caption">
              <p className="tags">Day photography</p>
            </div>
          </article>

          <article className="gallery__item s4" data-cat="photography" data-sub="day"
                   data-place="Won Vision · Selected work"
                   data-full="/images/rental-compact.webp">
            <img src="/images/rental-compact.webp" alt="Listing living room" />
            <div className="gallery__item__caption">
              <p className="tags">Day photography</p>
            </div>
          </article>

          <article className="gallery__item s4" data-cat="photography" data-sub="day"
                   data-place="Won Vision · Selected work"
                   data-full="/images/rental-standard.webp">
            <img src="/images/rental-standard.webp" alt="Listing living and dining" />
            <div className="gallery__item__caption">
              <p className="tags">Day photography</p>
            </div>
          </article>

          <article className="gallery__item s4" data-cat="photography" data-sub="day"
                   data-place="Won Vision · Selected work"
                   data-full="/images/rental-large.webp">
            <img src="/images/rental-large.webp" alt="Listing bedroom" />
            <div className="gallery__item__caption">
              <p className="tags">Day photography</p>
            </div>
          </article>

          <article className="gallery__item s4" data-cat="photography" data-sub="day"
                   data-place="Won Vision · Selected work"
                   data-full="/images/sales-compact.webp">
            <img src="/images/sales-compact.webp" alt="Listing kitchen and dining" />
            <div className="gallery__item__caption">
              <p className="tags">Day photography</p>
            </div>
          </article>

          <article className="gallery__item s6" data-cat="photography" data-sub="day"
                   data-place="Won Vision · Selected work"
                   data-full="/images/sales-standard.webp">
            <img src="/images/sales-standard.webp" alt="Listing living room" />
            <div className="gallery__item__caption">
              <p className="tags">Day photography</p>
            </div>
          </article>

          <article className="gallery__item s6" data-cat="photography" data-sub="day"
                   data-place="Won Vision · Selected work"
                   data-full="/images/sales-premium.webp">
            <img src="/images/sales-premium.webp" alt="Listing bedroom" />
            <div className="gallery__item__caption">
              <p className="tags">Day photography</p>
            </div>
          </article>

          <article className="gallery__item s4" data-cat="photography" data-sub="day"
                   data-place="Won Vision · Selected work"
                   data-full="/images/additional-photos.webp">
            <img src="/images/additional-photos.webp" alt="Listing bedroom detail" />
            <div className="gallery__item__caption">
              <p className="tags">Day photography</p>
            </div>
          </article>

          {/* Selected day photography */}
          <article className="gallery__item s8" data-cat="photography" data-sub="day"
                   data-place="Won Vision · Selected work"
                   data-full="/images/henry-st-photo-1.webp">
            <img src="/images/henry-st-photo-1.webp" alt="Listing living and kitchen" />
            <div className="gallery__item__caption">
              <p className="tags">Day photography</p>
            </div>
          </article>

          <article className="gallery__item s6" data-cat="photography" data-sub="day"
                   data-place="Won Vision · Selected work"
                   data-full="/images/henry-st-photo-2.webp">
            <img src="/images/henry-st-photo-2.webp" alt="Listing kitchen" />
            <div className="gallery__item__caption">
              <p className="tags">Day photography</p>
            </div>
          </article>

          <article className="gallery__item s6" data-cat="photography" data-sub="day"
                   data-place="Won Vision · Selected work"
                   data-full="/images/henry-st-photo-3.webp">
            <img src="/images/henry-st-photo-3.webp" alt="Listing twilight exterior" />
            <div className="gallery__item__caption">
              <p className="tags">Day photography</p>
            </div>
          </article>

          <article className="gallery__item s6" data-cat="photography" data-sub="day"
                   data-place="Won Vision · Selected work"
                   data-full="/images/wv-exterior-1.webp">
            <img src="/images/wv-exterior-1.webp" alt="Listing exterior" />
            <div className="gallery__item__caption">
              <p className="tags">Day photography</p>
            </div>
          </article>

          <article className="gallery__item s6" data-cat="photography" data-sub="day"
                   data-place="Won Vision · Selected work"
                   data-full="/images/wv-exterior-2.webp">
            <img src="/images/wv-exterior-2.webp" alt="Listing street view" />
            <div className="gallery__item__caption">
              <p className="tags">Day photography</p>
            </div>
          </article>

          {/* Selected aerials */}
          <article className="gallery__item s6" data-cat="photography" data-sub="aerial"
                   data-place="Won Vision · Selected work"
                   data-full="/images/henry-st-aerial-1.webp">
            <img src="/images/henry-st-aerial-1.webp" alt="Listing aerial" />
            <div className="gallery__item__caption">
              <p className="tags">Aerials</p>
            </div>
          </article>

          <article className="gallery__item s6" data-cat="photography" data-sub="aerial"
                   data-place="Won Vision · Selected work"
                   data-full="/images/wv-aerial-plot.webp">
            <img src="/images/wv-aerial-plot.webp" alt="Listing aerial plot overview" />
            <div className="gallery__item__caption">
              <p className="tags">Aerials</p>
            </div>
          </article>

          {/* Virtual editing — before/after sliders */}
          <article className="gallery__item gallery__item--slider s6" data-cat="virtual-editing" data-sub="staging">
            <BeforeAfterSlider
              beforeSrc="/images/staging-before.webp"
              afterSrc="/images/staging-after.webp"
              beforeAlt="Empty room before virtual staging"
              afterAlt="Room after virtual staging"
              label="Virtual staging"
            />
          </article>

          <article className="gallery__item gallery__item--slider s6" data-cat="virtual-editing" data-sub="staging">
            <BeforeAfterSlider
              beforeSrc="/images/wv-staging-before.webp"
              afterSrc="/images/wv-staging-after.webp"
              beforeAlt="Empty living room before virtual staging"
              afterAlt="Living room after virtual staging"
              label="Virtual staging"
            />
          </article>

          <article className="gallery__item gallery__item--slider s6" data-cat="virtual-editing" data-sub="staging">
            <BeforeAfterSlider
              beforeSrc="/images/henry-st-staging-before.webp"
              afterSrc="/images/henry-st-staging-after.webp"
              beforeAlt="Living room before virtual staging"
              afterAlt="Living room after virtual staging"
              label="Virtual staging"
            />
          </article>

          <article className="gallery__item gallery__item--slider s6" data-cat="virtual-editing" data-sub="staging">
            <BeforeAfterSlider
              beforeSrc="/images/staging-bedroom-before.webp"
              afterSrc="/images/staging-bedroom-after.webp"
              beforeAlt="Bedroom before virtual staging"
              afterAlt="Bedroom after virtual staging"
              label="Virtual staging"
            />
          </article>

          <article className="gallery__item gallery__item--slider s6" data-cat="virtual-editing" data-sub="staging">
            <BeforeAfterSlider
              beforeSrc="/images/staging-living-before.webp"
              afterSrc="/images/staging-living-after.webp"
              beforeAlt="Living room before virtual staging"
              afterAlt="Living room after virtual staging"
              label="Virtual staging"
            />
          </article>

          <article className="gallery__item gallery__item--slider s6" data-cat="virtual-editing" data-sub="declutter">
            <BeforeAfterSlider
              beforeSrc="/images/declutter-before.webp"
              afterSrc="/images/declutter-after.webp"
              beforeAlt="Cluttered room before decluttering"
              afterAlt="Room after decluttering"
              label="Decluttering"
            />
          </article>

          <article className="gallery__item gallery__item--slider s6" data-cat="virtual-editing" data-sub="declutter">
            <BeforeAfterSlider
              beforeSrc="/images/declutter-living-before.webp"
              afterSrc="/images/declutter-living-after.webp"
              beforeAlt="Cluttered living room before decluttering"
              afterAlt="Living room after decluttering"
              label="Decluttering"
            />
          </article>

          <article className="gallery__item gallery__item--slider s6" data-cat="virtual-editing" data-sub="declutter">
            <BeforeAfterSlider
              beforeSrc="/images/declutter-kitchen-before.webp"
              afterSrc="/images/declutter-kitchen-after.webp"
              beforeAlt="Cluttered kitchen before decluttering"
              afterAlt="Kitchen after decluttering"
              label="Decluttering"
            />
          </article>

          <article className="gallery__item gallery__item--slider s6" data-cat="virtual-editing" data-sub="declutter">
            <BeforeAfterSlider
              beforeSrc="/images/declutter-garage-before.webp"
              afterSrc="/images/declutter-garage-after.webp"
              beforeAlt="Cluttered garage before decluttering"
              afterAlt="Garage after decluttering"
              label="Decluttering"
            />
          </article>

          <article className="gallery__item gallery__item--slider s6" data-cat="virtual-editing" data-sub="declutter">
            <BeforeAfterSlider
              beforeSrc="/images/declutter-room-before.webp"
              afterSrc="/images/declutter-room-after.webp"
              beforeAlt="Cluttered room before decluttering"
              afterAlt="Room after decluttering"
              label="Decluttering"
            />
          </article>

          <article className="gallery__item gallery__item--slider s6" data-cat="virtual-editing" data-sub="dusk">
            <BeforeAfterSlider
              beforeSrc="/images/dusk-before.webp"
              afterSrc="/images/dusk-after.webp"
              beforeAlt="Daytime exterior before day-to-dusk"
              afterAlt="Exterior after day-to-dusk conversion"
              label="Day to dusk"
            />
          </article>

          {/* Video — agent listing film (lead), plays inline */}
          <article className="gallery__item gallery__item--video s6" data-cat="video" data-sub="cinematic"
                   data-place="Won Vision · Agent listing">
            <video
              src="/video/agent-listing-video.mp4"
              poster="/images/agent-listing-video-poster.webp"
              controls
              preload="metadata"
              playsInline
            />
            <div className="gallery__item__caption">
              <p className="tags">Agent listing video</p>
            </div>
          </article>

          {/* Video — social media reel (vertical 9:16), plays inline */}
          <article className="gallery__item gallery__item--video s6" data-cat="video" data-sub="socialreel"
                   data-place="Won Vision · Social media reel">
            <video
              src="/video/social-media-reel.mp4"
              poster="/images/social-media-reel-poster.webp"
              controls
              preload="metadata"
              playsInline
            />
            <div className="gallery__item__caption">
              <p className="tags">Social media reel</p>
            </div>
          </article>

          {/* Video — cinematic listing film · Bella Real Estate, plays inline */}
          <article className="gallery__item gallery__item--video s6" data-cat="video" data-sub="cinematic"
                   data-place="Won Vision · Agent listing">
            <video
              src="/video/cinematic-v3.mp4"
              poster="/images/cinematic-v3-poster.webp"
              controls
              preload="metadata"
              playsInline
            />
            <div className="gallery__item__caption">
              <p className="tags">Agent listing video</p>
            </div>
          </article>

          {/* Video — cinematic listing film, plays inline */}
          <article className="gallery__item gallery__item--video s6" data-cat="video" data-sub="cinematic"
                   data-place="Won Vision · Agent listing">
            <video
              src="/video/cinematic-v4.mp4"
              poster="/images/cinematic-v4-poster.webp"
              controls
              preload="metadata"
              playsInline
            />
            <div className="gallery__item__caption">
              <p className="tags">Agent listing video</p>
            </div>
          </article>

          {/* Video — cinematic listing film · RT Edgar, plays inline */}
          <article className="gallery__item gallery__item--video s6" data-cat="video" data-sub="cinematic"
                   data-place="Won Vision · Agent listing">
            <video
              src="/video/cinematic-rt-edgar.mp4"
              poster="/images/cinematic-rt-edgar-poster.webp"
              controls
              preload="metadata"
              playsInline
            />
            <div className="gallery__item__caption">
              <p className="tags">Agent listing video</p>
            </div>
          </article>

          {/* Video — agent listing film · 465 Seventh Avenue (Barry Plant), plays inline */}
          <article className="gallery__item gallery__item--video s6" data-cat="video" data-sub="cinematic"
                   data-place="Won Vision · Agent listing">
            <video
              src="/video/cinematic-465.mp4"
              poster="/images/cinematic-465-poster.webp"
              controls
              preload="metadata"
              playsInline
            />
            <div className="gallery__item__caption">
              <p className="tags">Agent listing video</p>
            </div>
          </article>

          {/* Video — property highlight film, plays inline */}
          <article className="gallery__item gallery__item--video s6" data-cat="video" data-sub="highlight"
                   data-place="Won Vision · Property highlight">
            <video
              src="/video/property-highlight-2.mp4"
              poster="/images/property-highlight-2-poster.webp"
              controls
              preload="metadata"
              playsInline
            />
            <div className="gallery__item__caption">
              <p className="tags">Property highlight</p>
            </div>
          </article>

          {/* Video — property highlight film, plays inline */}
          <article className="gallery__item gallery__item--video s6" data-cat="video" data-sub="highlight"
                   data-place="Won Vision · Property highlight">
            <video
              src="/video/property-highlight-3.mp4"
              poster="/images/property-highlight-3-poster.webp"
              controls
              preload="metadata"
              playsInline
            />
            <div className="gallery__item__caption">
              <p className="tags">Property highlight</p>
            </div>
          </article>

          {/* Video — Century 21 property highlight film, plays inline */}
          <article className="gallery__item gallery__item--video s6" data-cat="video" data-sub="highlight"
                   data-place="Won Vision · Property highlight">
            <video
              src="/video/property-highlight-4.mp4"
              poster="/images/property-highlight-4-poster.webp"
              controls
              preload="metadata"
              playsInline
            />
            <div className="gallery__item__caption">
              <p className="tags">Property highlight</p>
            </div>
          </article>

          {/* Video — property highlight film · 16 Village Avenue, Doncaster (Buxton), plays inline */}
          <article className="gallery__item gallery__item--video s6" data-cat="video" data-sub="highlight"
                   data-place="Won Vision · Property highlight">
            <video
              src="/video/property-highlight-doncaster.mp4"
              poster="/images/property-highlight-doncaster-poster.webp"
              controls
              preload="metadata"
              playsInline
            />
            <div className="gallery__item__caption">
              <p className="tags">Property highlight</p>
            </div>
          </article>

          {/* Video — property highlight film · 2-68 Spray Street, Elwood (RT Edgar), plays inline */}
          <article className="gallery__item gallery__item--video s6" data-cat="video" data-sub="highlight"
                   data-place="Won Vision · Property highlight">
            <video
              src="/video/property-highlight-elwood.mp4"
              poster="/images/property-highlight-elwood-poster.webp"
              controls
              preload="metadata"
              playsInline
            />
            <div className="gallery__item__caption">
              <p className="tags">Property highlight</p>
            </div>
          </article>

          {/* Video — virtual staged listing video · G01/73 Tennyson St, Elwood, plays inline */}
          <article className="gallery__item gallery__item--video s6" data-cat="video" data-sub="staged"
                   data-place="Won Vision · Virtual staged listing video">
            <video
              src="/video/staged-tennyson-g01.mp4"
              poster="/images/staged-tennyson-g01-poster.webp"
              controls
              preload="metadata"
              playsInline
            />
            <div className="gallery__item__caption">
              <p className="tags">Virtual staged listing video</p>
            </div>
          </article>

          {/* Video — virtual staged listing video · 101/73 Tennyson St, Elwood, plays inline */}
          <article className="gallery__item gallery__item--video s6" data-cat="video" data-sub="staged"
                   data-place="Won Vision · Virtual staged listing video">
            <video
              src="/video/staged-tennyson-101.mp4"
              poster="/images/staged-tennyson-101-poster.webp"
              controls
              preload="metadata"
              playsInline
            />
            <div className="gallery__item__caption">
              <p className="tags">Virtual staged listing video</p>
            </div>
          </article>

        </div>
        <p className="gallery__empty" data-gallery-empty hidden>Work coming soon.</p>
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
              <Link href="/#top" aria-label="Won Vision"><Wordmark /></Link>
              <p>A Melbourne property media studio. Photography, video, drone, floor plans, virtual staging. Same day photo turn around.</p>
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
                <li><a href="mailto:main@wonvision.com.au">main@wonvision.com.au</a></li>
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
            <span>Same day photo turn around.</span>
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
  var HIDE_MS = 220, pend = null;
  // Compute "pinned" live from the sentinel rect instead of caching the IO
  // value — a stale cached pinned=false leaves the reserved nav band as a
  // gap at the top when the nav hides. (See matching fix on /book.)
  var isPinned = function(){
    if(sentinel) return sentinel.getBoundingClientRect().top <= 0;
    return window.scrollY > 1;
  };
  var apply = function(){
    var shouldLift = isPinned() && nav.classList.contains('is-hidden');
    if(shouldLift){
      if(bar.classList.contains('is-navhidden')) return;
      if(pend) return;
      pend = setTimeout(function(){
        pend = null;
        if(isPinned() && nav.classList.contains('is-hidden')) bar.classList.add('is-navhidden');
      }, HIDE_MS);
    } else {
      if(pend){ clearTimeout(pend); pend = null; }
      bar.classList.remove('is-navhidden');
    }
  };
  if(sentinel && 'IntersectionObserver' in window){
    new IntersectionObserver(apply, { threshold:[0,1] }).observe(sentinel);
  }
  window.addEventListener('scroll', apply, { passive: true });
  apply();
  new MutationObserver(apply).observe(nav, { attributes:true, attributeFilter:['class'] });
})();
`}</Script>
    </>
  );
}
