'use client';

import { useState } from 'react';

type Service = {
  num: string;
  name: string;
  meta: string;
  href: string;
  img: string;
  caption: string;
};

const SHOW_VIDEO = true;

const allServices: Service[] = [
  {
    num: '01',
    name: 'Photography',
    meta: 'Stills · Twilight',
    href: '/book#cat-rental',
    img: '/images/showcase.webp',
    caption: 'Photography',
  },
  {
    num: '02',
    name: 'Video',
    meta: 'Listing Video · Cinematic',
    href: '/book#cat-video',
    img: '/images/cinematic.webp',
    caption: 'Video',
  },
  {
    num: '03',
    name: 'Drone',
    meta: 'Aerial',
    href: '/book#cat-drone',
    img: '/images/drone-additional.webp',
    caption: 'Drone',
  },
  {
    num: '04',
    name: 'Floor plans',
    meta: '2D · 3D',
    href: '/book#cat-floorplans',
    img: '',
    caption: 'Floor plans',
  },
  {
    num: '05',
    name: 'Virtual staging',
    meta: 'Architectural',
    href: '/book#cat-staging',
    img: '/images/staging-after.webp',
    caption: 'Virtual staging',
  },
];

const services: Service[] = allServices.filter(
  (s) => SHOW_VIDEO || s.name !== 'Video',
);

export default function ServicesEditorial() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="services-editorial" aria-label="Services">
      <div className="se__list">
        <span className="se__eyebrow">Services</span>
        <div className="se__rows">
          {services.map((s, i) => (
            <a
              key={s.num}
              href={s.href}
              className="se__row"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              aria-label={`Book ${s.name}`}
            >
              <span className="se__num">{s.num}</span>
              <span className="se__name">{s.name}</span>
              <span className="se__meta">{s.meta}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="se__pane" aria-hidden="true">
        {services.map((s, i) => (
          <figure
            key={s.num}
            className={'se__fig' + (i === active ? ' is-active' : '')}
          >
            {s.img && <img src={s.img} alt="" />}
            <figcaption>{s.caption}</figcaption>
          </figure>
        ))}
      </div>

      {/* Mobile-only stacked photo tiles. CSS hides this on desktop. */}
      <div className="se__tiles">
        {services.map((s) => (
          <a key={s.num} href={s.href} className="se__tile" aria-label={`Book ${s.name}`}>
            {s.img && <img src={s.img} alt="" />}
            <span className="se__tile__veil" aria-hidden="true" />
            <div className="se__tile__label">
              <div>
                <span className="se__tile__num">{s.num} — {s.name}</span>
                <span className="se__tile__name">{s.name}</span>
              </div>
              <span className="se__tile__arrow" aria-hidden="true">→</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
