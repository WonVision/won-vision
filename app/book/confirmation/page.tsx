import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { Wordmark } from '../../components/Wordmark';

export const metadata: Metadata = {
  title: 'Booking confirmed',
  description:
    'Your Won Vision real estate shoot booking is locked in. The studio will reach out within one working day to confirm details.',
};

export default function ConfirmationPage() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <style>{`
  /* Confirmation page — mirrors the booking confirmation email layout
     (hero / portal CTA / map / shoot details / add-to-calendar) but
     widened and made fluid for the website. Pure B&W per design_won_vision. */
  .confirm-page{padding:120px var(--gutter) 96px;background:#FFFFFF;text-align:center}
  .confirm-page__inner{max-width:880px;margin:0 auto;text-align:left}
  .confirm-page__inner > .progress,
  .confirm-page__inner > .confirm-page__hero{text-align:center}
  .confirm-page__hero{margin-bottom:32px}
  .confirm-page__check{background:#000000;color:#FFFFFF;border-radius:0;margin:0 auto 28px}
  .confirm-page h1{font-family:var(--display);font-weight:500;font-size:clamp(40px,5vw,68px);line-height:1.05;letter-spacing:-0.005em;color:#000000;margin:0 0 14px}
  .confirm-page h1 em{font-style:italic;color:#000000;font-weight:400}
  .confirm-page .lede{font-family:var(--display);font-style:italic;font-size:clamp(16px,1.6vw,20px);color:#404040;margin:0 auto 24px;max-width:560px}
  .confirm-page__ref{
    display:inline-block;background:#FFFFFF;color:#000000;
    border:1px solid #000000;padding:10px 18px;border-radius:0;
    font-family:var(--body);font-size:11px;letter-spacing:0.32em;text-transform:uppercase;font-weight:600;
    margin-bottom:0;
  }

  /* Portal CTA card */
  .confirm-page__portal{
    background:#FFFFFF;border:1px solid #E5E5E5;
    padding:32px;margin:32px 0;text-align:center;max-width:none;
  }
  .confirm-page__portal h4{font-family:var(--display);font-weight:500;font-size:22px;color:#000000;margin:0 0 8px;letter-spacing:-0.005em}
  .confirm-page__portal p{font-family:var(--body);font-size:14px;color:#404040;line-height:1.6;margin:0 auto 20px;max-width:480px}
  .confirm-page__portal a{
    display:inline-block;background:#000000;color:#FFFFFF;border:1px solid #000000;
    padding:16px 28px;border-radius:0;
    font-family:var(--body);font-size:13px;letter-spacing:0.22em;text-transform:uppercase;font-weight:500;
    text-decoration:none;transition:background .25s ease, color .25s ease;
  }
  .confirm-page__portal a:hover{background:#FFFFFF;color:#000000}

  /* Map */
  .confirm-map{
    position:relative;height:320px;max-width:none;margin:24px 0 0;
    background:#F5F5F5;border:1px solid #E5E5E5;overflow:hidden;
  }
  .confirm-map__canvas{
    position:absolute;inset:0;background:#F5F5F5;
    filter:grayscale(1) contrast(1.05) brightness(0.98);
  }
  .confirm-map .leaflet-container{background:#F5F5F5 !important;outline:none !important}
  .confirm-map .leaflet-control-attribution,
  .confirm-map .leaflet-control-zoom,
  .confirm-map .leaflet-control-container{display:none !important}
  .confirm-map__label{
    position:absolute;top:14px;left:14px;z-index:5;background:#FFFFFF;
    padding:8px 12px;font-family:var(--body);font-size:10px;letter-spacing:0.22em;
    text-transform:uppercase;color:#000000;font-weight:600;border:1px solid #E5E5E5;
  }
  .map-pulse{transform-origin:center;animation:cmPulse 2.4s ease-in-out infinite}
  @keyframes cmPulse{
    0%,100%{stroke-opacity:0.55;fill-opacity:0.18;transform:scale(1)}
    50%{stroke-opacity:0.2;fill-opacity:0.05;transform:scale(1.5)}
  }

  /* Shoot details table — same look as the email detail rows */
  .confirm-details{margin:32px 0 28px;border-top:1px solid #E5E5E5}
  .confirm-details__row{
    display:grid;grid-template-columns:180px 1fr;gap:24px;padding:18px 4px;
    border-bottom:1px solid #E5E5E5;align-items:start;
  }
  .confirm-details__label{
    font-family:var(--body);font-size:10px;letter-spacing:0.22em;text-transform:uppercase;
    color:#737373;font-weight:500;padding-top:3px;
  }
  .confirm-details__value{font-family:var(--body);font-size:16px;line-height:1.5;color:#000000;font-weight:500;word-break:break-word}
  .confirm-details__value a{color:#000000;text-decoration:underline}

  /* Add-to-calendar */
  .confirm-cta{margin:0 0 16px}
  .confirm-cta a{
    display:block;background:#FFFFFF;color:#000000;border:1px solid #000000;
    padding:18px 24px;text-align:center;border-radius:0;text-decoration:none;
    font-family:var(--body);font-size:13px;letter-spacing:0.22em;text-transform:uppercase;font-weight:500;
    transition:background .25s ease, color .25s ease;
  }
  .confirm-cta a:hover{background:#000000;color:#FFFFFF}
  .confirm-cta__note{font-family:var(--body);font-size:11px;color:#737373;text-align:center;margin:10px 0 0;letter-spacing:0.04em}

  .confirm-footnote{font-family:var(--body);font-size:13px;color:#737373;text-align:center;margin:32px auto 0;line-height:1.7;max-width:520px}
  .confirm-footnote strong{color:#000000}
  .confirm-footnote a{color:#000000;text-decoration:underline}

  @media (max-width:760px){
    .confirm-page{padding:88px var(--gutter) 56px}
    .confirm-page__check{width:60px;height:60px;font-size:26px;margin-bottom:24px}
    .confirm-page__portal{padding:22px;margin:24px 0}
    .confirm-map{height:240px}
    .confirm-details__row{grid-template-columns:1fr;gap:6px;padding:14px 4px}
    .confirm-details__label{padding-top:0}
    .confirm-details__value{font-size:15px}
  }
  @media (max-width:480px){
    .confirm-page__check{width:54px;height:54px;font-size:22px}
    .confirm-page .lede{font-size:15px}
    .confirm-map{height:200px}
    .confirm-page__portal a,.confirm-cta a{padding:14px 20px;font-size:12px;letter-spacing:0.2em}
  }
`}</style>

      <header className="nav is-stuck">
        <div className="nav__brand">
          <Link href="/#top" data-home aria-label="Won Vision — home"><Wordmark /></Link>
        </div>
        <nav className="nav__links">
          <Link href="/#services">Services</Link>
          <Link href="/#contact">Contact</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/operate">How we operate</Link>
        </nav>
        <div className="nav__right">
          <Link href="/book" className="nav__cta">Book now</Link>
        </div>
        <button className="nav__burger" aria-label="Menu"><span></span><span></span><span></span></button>
      </header>
      <aside className="nav__drawer" aria-hidden="true">
        <ul>
          <li><Link href="/#services">Services</Link></li>
          <li><Link href="/#contact">Contact</Link></li>
          <li><Link href="/gallery"><em>Gallery</em></Link></li>
          <li><Link href="/operate">How we operate</Link></li>
          <li><Link href="/book" className="drawer-cta">Book now →</Link></li>
        </ul>
        <div className="nav__drawer__foot"><span>Won Vision</span><span>Melbourne · 2026</span></div>
      </aside>

      <section className="confirm-page">
        <div className="progress">
          <div className="progress__step is-done"><span className="progress__num">1</span><span>Cart</span></div>
          <span className="progress__line is-done"></span>
          <div className="progress__step is-done"><span className="progress__num">2</span><span>Details</span></div>
          <span className="progress__line is-done"></span>
          <div className="progress__step is-done"><span className="progress__num">3</span><span>Schedule</span></div>
          <span className="progress__line is-done"></span>
          <div className="progress__step is-active"><span className="progress__num">4</span><span>Confirm</span></div>
        </div>

        <div className="confirm-page__inner">
          <div className="confirm-page__hero">
            <div className="confirm-page__check">✓</div>
            <h1>Booking <em>locked in.</em></h1>
            <p className="lede">A confirmation email with the full call sheet will reach you one working day before the shoot.</p>
            <span className="confirm-page__ref" id="bookingRef">Ref: WV-PENDING</span>
          </div>

          <div className="confirm-page__portal" id="portalCard">
            <h4>Your client portal</h4>
            <p id="portalCopy">Track shoot status, download files when ready, and message the studio — all from a single page tied to this booking.</p>
            <a id="portalLink" target="_blank" rel="noopener noreferrer" hidden>Open client portal →</a>
            <p id="portalPending" style={{ fontSize: 13, color: '#737373', margin: 0 }}>We&apos;ll email your portal link to <strong id="portalPendingEmail" style={{ color: '#000' }}>your address</strong> shortly.</p>
          </div>

          <div className="confirm-map" id="confirmMap" hidden>
            <div className="confirm-map__canvas" id="confirmMapCanvas" aria-label="Booked property location"></div>
            <div className="confirm-map__label" id="confirmMapLabel">Property location</div>
          </div>

          <div className="confirm-details" id="confirmDetails">
            <div className="confirm-details__row">
              <div className="confirm-details__label">Date &amp; Time</div>
              <div className="confirm-details__value" id="detailWhen">—</div>
            </div>
            <div className="confirm-details__row">
              <div className="confirm-details__label">Address</div>
              <div className="confirm-details__value" id="detailAddress">—</div>
            </div>
            <div className="confirm-details__row">
              <div className="confirm-details__label">Package</div>
              <div className="confirm-details__value" id="detailPackage">—</div>
            </div>
            <div className="confirm-details__row" id="detailNotesRow" hidden>
              <div className="confirm-details__label">Notes</div>
              <div className="confirm-details__value" id="detailNotes">—</div>
            </div>
            <div className="confirm-details__row">
              <div className="confirm-details__label">Reference</div>
              <div className="confirm-details__value" id="detailRef">—</div>
            </div>
          </div>

          <div className="confirm-cta">
            <a id="calendarLink" href="#" target="_blank" rel="noopener noreferrer">Add to calendar</a>
            <p className="confirm-cta__note">Works with Google Calendar, Apple Calendar, Outlook &amp; more.</p>
          </div>

          <p className="confirm-footnote">A confirmation email has been sent to <strong id="clientEmail">your address</strong>.<br />If urgent, call <a href="tel:+61493714609">0493 714 609</a>.</p>
        </div>
      </section>

      <footer className="foot">
        <div className="foot__inner">
          <div className="foot__top">
            <div>
              <Link href="/#top" data-home aria-label="Won Vision — home"><Wordmark /></Link>
              <p>A Melbourne property media studio.</p>
            </div>
            <div><h4>Studio</h4><ul>
              <li><Link href="/#services">Services</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/book">Book now</Link></li>
            </ul></div>
            <div><h4>Contact</h4><ul>
              <li><a href="mailto:hello@wonvision.com.au">hello@wonvision.com.au</a></li>
              <li><a href="tel:+61493714609">0493 714 609</a></li>
            </ul></div>
            <div><h4>Operations</h4><ul>
              <li>Won Vision Pty Ltd</li>
              <li><Link href="/terms">Terms</Link></li>
              <li><Link href="/privacy">Privacy</Link></li>
            </ul></div>
          </div>
          <div className="foot__rule"></div>
          <div className="foot__bot">
            <span>© 2026 Won Vision Pty Ltd</span>
            <span>Same day turn around.</span>
            <span>Melbourne · Made in-house</span>
          </div>
        </div>
      </footer>

      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossOrigin=""
        strategy="afterInteractive"
      />
      <Script src="https://ops.outbounddesign.com.au/booking-submit.js" strategy="afterInteractive" />
      <Script id="wv-confirm" strategy="afterInteractive">{`
(function(){
  // Persist a snapshot of the confirmed booking so revisits to this page
  // (browser back, popup-blocked portal click + refresh, etc.) don't bounce
  // the user back to /book step 1 after cleanupCart() wipes the cart.
  const CONFIRMED_KEY = 'wv-confirmed';

  function boot(){
    let cart = JSON.parse(sessionStorage.getItem('wv-cart') || '[]');
    let editing = JSON.parse(sessionStorage.getItem('wv-editing') || '[]');
    let details = JSON.parse(sessionStorage.getItem('wv-details') || '{}');
    let schedule = JSON.parse(sessionStorage.getItem('wv-schedule') || '{}');
    const confirmed = JSON.parse(sessionStorage.getItem(CONFIRMED_KEY) || 'null');

    if (confirmed && confirmed.jobNumber){
      // Re-hydrate from the confirmed snapshot if the live cart was wiped.
      if (!cart.length && confirmed.cart) cart = confirmed.cart;
      if (!details.email && confirmed.details) details = confirmed.details;
      if (!schedule.selectedDate && confirmed.schedule) schedule = confirmed.schedule;
    }

    if (!cart.length) { window.location.href = '/book'; return; }
    if (!details.email) { window.location.href = '/book/checkout'; return; }
    if (!schedule.selectedDate) { window.location.href = '/book/schedule'; return; }

    const fallbackRef = (confirmed && confirmed.jobNumber)
      ? confirmed.jobNumber
      : 'WV-' + Date.now().toString(36).toUpperCase().slice(-6);
    const refEl = document.getElementById('bookingRef');
    const linkEl = document.getElementById('portalLink');
    const emailEl = document.getElementById('clientEmail');
    refEl.textContent = 'Ref: ' + fallbackRef;
    if (details.email) emailEl.textContent = details.email;

    // Belt-and-braces new-tab open for the portal CTA. target="_blank"
    // alone has been unreliable on this page (popup blockers + occasional
    // same-tab navigation reports). Bind an explicit window.open with
    // preventDefault on success so the click always opens a fresh tab.
    if (linkEl){
      linkEl.addEventListener('click', function(ev){
        const href = linkEl.getAttribute('href');
        if (!href) return;
        const win = window.open(href, '_blank', 'noopener,noreferrer');
        if (win){
          ev.preventDefault();
          try { win.opener = null; } catch(e) {}
        }
      });
    }

    // Populate shoot-details table from sessionStorage (mirrors the
    // confirmation email body for at-a-glance review on this page).
    (function fillDetails(){
      const fullAddress = [details.address, details.suburb, details.state, details.postcode]
        .filter(Boolean).join(', ');
      const pkg = (cart || []).map(function(it){ return it.name; }).filter(Boolean).join(' · ') || '—';
      const whenEl = document.getElementById('detailWhen');
      const addrEl = document.getElementById('detailAddress');
      const pkgEl = document.getElementById('detailPackage');
      const notesEl = document.getElementById('detailNotes');
      const notesRow = document.getElementById('detailNotesRow');
      const refDetailEl = document.getElementById('detailRef');
      const dateObj = schedule.selectedDate ? new Date(schedule.selectedDate + 'T12:00:00') : null;
      const dateStr = dateObj ? dateObj.toLocaleDateString('en-AU', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      }) : '';
      const timeStr = schedule.selectedTime
        || (schedule.selectedWindow ? schedule.selectedWindow : '')
        || (schedule.anytime ? 'Anytime that day' : '');
      if (whenEl) whenEl.textContent = [dateStr, timeStr].filter(Boolean).join(' · ') || '—';
      if (addrEl) addrEl.textContent = fullAddress || details.address || '—';
      if (pkgEl) pkgEl.textContent = pkg;
      if (details.propertyNotes && notesEl && notesRow){
        notesEl.textContent = details.propertyNotes;
        notesRow.hidden = false;
      }
      if (refDetailEl) refDetailEl.textContent = fallbackRef;
    })();

    // Build a Google Calendar template URL — opens the agent's default
    // calendar app in a new tab with the event pre-filled.
    (function fillCalendar(){
      const calEl = document.getElementById('calendarLink');
      if (!calEl) return;
      const dateRaw = schedule.selectedDate;
      const timeRaw = schedule.selectedTime || '09:00';
      if (!dateRaw) return;
      // Parse 9:00, 9am, 09:30, etc. → 24h HH:MM
      function to24h(s){
        if (!s) return '09:00';
        const m = String(s).trim().toLowerCase().match(/^(\\d{1,2})(?::(\\d{2}))?\\s*(am|pm)?$/);
        if (!m) return '09:00';
        let h = parseInt(m[1], 10);
        const min = parseInt(m[2] || '0', 10);
        const ap = m[3];
        if (ap === 'pm' && h < 12) h += 12;
        if (ap === 'am' && h === 12) h = 0;
        return (h < 10 ? '0' + h : String(h)) + ':' + (min < 10 ? '0' + min : String(min));
      }
      const hhmm = to24h(timeRaw);
      const ymd = dateRaw.replace(/-/g, '');
      const startLocal = ymd + 'T' + hhmm.replace(':', '') + '00';
      // Default 90-min slot.
      function plus90(hhmmStr){
        const parts = hhmmStr.split(':');
        let h = parseInt(parts[0], 10), m = parseInt(parts[1], 10) + 90;
        h += Math.floor(m / 60); m = m % 60;
        if (h >= 24) h = 23;
        return (h < 10 ? '0' + h : String(h)) + (m < 10 ? '0' + m : String(m)) + '00';
      }
      const endLocal = ymd + 'T' + plus90(hhmm);
      const text = 'Won Vision shoot — ' + ((cart || []).map(function(it){ return it.name; }).join(' · ') || 'Property shoot');
      const fullAddress = [details.address, details.suburb, details.state, details.postcode].filter(Boolean).join(', ');
      const detailsText = 'Booking ref: ' + fallbackRef + '\\n\\nProperty: ' + fullAddress + '\\nContact studio: 0493 714 609 · hello@wonvision.com.au';
      const url = 'https://www.google.com/calendar/render?action=TEMPLATE'
        + '&text=' + encodeURIComponent(text)
        + '&dates=' + startLocal + '/' + endLocal
        + '&details=' + encodeURIComponent(detailsText)
        + '&location=' + encodeURIComponent(fullAddress);
      calEl.setAttribute('href', url);
    })();

    function applyPortal(jobNumber, response){
      const ref = jobNumber || (response && response.jobNumber) || fallbackRef;
      refEl.textContent = 'Ref: ' + ref;
      const realUrl = (response && (response.portalUrl || response.portal_url || response.clientUrl))
        || (confirmed && confirmed.portalUrl)
        || null;
      const pendingEmailEl = document.getElementById('portalPendingEmail');
      const pendingEl = document.getElementById('portalPending');
      if (realUrl){
        linkEl.setAttribute('href', realUrl);
        linkEl.hidden = false;
        if (pendingEl) pendingEl.hidden = true;
      } else {
        linkEl.removeAttribute('href');
        linkEl.hidden = true;
        if (pendingEl){
          pendingEl.hidden = false;
          if (pendingEmailEl && details.email) pendingEmailEl.textContent = details.email;
        }
      }
      // Snapshot for revisits.
      try {
        sessionStorage.setItem(CONFIRMED_KEY, JSON.stringify({
          jobNumber: ref,
          portalUrl: realUrl,
          cart: cart,
          details: details,
          schedule: schedule,
          confirmedAt: Date.now(),
        }));
      } catch (e) {}
    }

    const booking = {
      services: cart,
      editing: editing,
      property: {
        address: details.address || '',
        unit: details.unit || '',
        suburb: details.suburb || '',
        state: details.state || '',
        postcode: details.postcode || '',
        country: details.country || 'Australia',
        notes: details.propertyNotes || '',
        lat: details.lat || null,
        lon: details.lon || null,
      },
      contact: {
        firstName: details.firstName || '',
        lastName: details.lastName || '',
        email: details.email || '',
        phone: details.phone || '',
        agency: details.agency || '',
        agency_location: details.agencyLocation || null,
      },
      schedule: {
        date: schedule.selectedDate || '',
        time: schedule.selectedTime || '',
        accessMethod: schedule.accessMethod || '',
        accessNotes: schedule.accessNotes || '',
        meetingPerson: schedule.meetingPerson || (schedule.meetingRole || ''),
        accessPhone: schedule.accessPhone || '',
        anytime: schedule.anytime || '',
      },
      paymentMethod: schedule.paymentMethod || '',
      notes: details.propertyNotes || '',
      discountCode: schedule.discountCode || '',
    };

    (function(){
      const lat = parseFloat(details.lat), lon = parseFloat(details.lon);
      if (isNaN(lat) || isNaN(lon) || typeof L === 'undefined') return;
      const wrap = document.getElementById('confirmMap');
      const canvas = document.getElementById('confirmMapCanvas');
      const lbl = document.getElementById('confirmMapLabel');
      if (!wrap || !canvas) return;
      wrap.hidden = false;
      const label = [details.address, details.suburb].filter(Boolean).join(', ');
      if (lbl && label) lbl.textContent = label;
      const map = L.map(canvas, {
        attributionControl:false, zoomControl:false,
        scrollWheelZoom:false, doubleClickZoom:false, dragging:false,
        touchZoom:false, boxZoom:false, keyboard:false, tap:false,
      });
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
        subdomains:'abcd', maxZoom:19, crossOrigin:true,
      }).addTo(map);
      map.setView([lat, lon], 17);
      L.circleMarker([lat, lon], {
        radius:8, color:'#FAFAF7', weight:2, fillColor:'#4A6178', fillOpacity:1, interactive:false,
      }).addTo(map);
      setTimeout(() => map.invalidateSize(), 80);
    })();

    function showSubmitError(err){
      var msg = (err && err.message) ? err.message : String(err || 'Booking submit failed');
      console.error('[OutboundOps]', err);
      var banner = document.getElementById('bookingError');
      if (!banner){
        banner = document.createElement('div');
        banner.id = 'bookingError';
        banner.style.cssText = 'margin:16px auto;max-width:560px;padding:12px 16px;border:1px solid #B33A3A;background:#FFF4F4;color:#7A1F1F;border-radius:8px;font-size:14px;line-height:1.4;text-align:left';
        var ref = document.getElementById('bookingRef');
        if (ref && ref.parentNode) ref.parentNode.insertBefore(banner, ref.nextSibling);
        else document.body.insertBefore(banner, document.body.firstChild);
      }
      banner.textContent = 'We saved your booking locally but couldn\\'t reach the studio system: ' + msg + '. Please contact us to confirm.';
    }

    // booking-submit.js loads via <Script afterInteractive>, which can land
    // AFTER this boot() runs. Poll for the helper instead of failing on
    // first miss — without this, the discount usage never increments and
    // the call sheet never reaches ops.
    function waitForOps(maxMs){
      return new Promise(function(resolve, reject){
        var startedAt = Date.now();
        (function tick(){
          if (window.OutboundOps && typeof window.OutboundOps.submitBooking === 'function'){
            resolve();
            return;
          }
          if (Date.now() - startedAt > maxMs){
            reject(new Error('Ops helper script failed to load'));
            return;
          }
          setTimeout(tick, 100);
        })();
      });
    }

    function cleanupCart(){
      setTimeout(() => {
        sessionStorage.removeItem('wv-cart');
        sessionStorage.removeItem('wv-editing');
        sessionStorage.removeItem('wv-details');
        sessionStorage.removeItem('wv-schedule');
      }, 1500);
    }

    waitForOps(8000).then(function(){
      window.OutboundOps.submitBooking({
        slug: 'won-vision',
        booking: booking,
        onSuccess: function(jobNumber, response){
          applyPortal(jobNumber, response);
          cleanupCart();
        },
        onError: function(err){
          applyPortal(fallbackRef, {});
          showSubmitError(err);
          // Don't clear the cart on error so the user can retry / studio
          // can recover the data manually.
        },
      });
    }).catch(function(err){
      applyPortal(fallbackRef, {});
      showSubmitError(err);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
`}</Script>
    </>
  );
}
