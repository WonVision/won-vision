import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { Wordmark } from '../components/Wordmark';
import ServiceGalleryLightbox from '../components/ServiceGalleryLightbox';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

export const metadata: Metadata = {
  title: 'Book a shoot',
  description:
    'Book a Melbourne real estate shoot with Won Vision — photography, listing video, drone, floor plans, virtual staging and headshots. Flexible packages and add-ons across Melbourne and Victoria.',
};

export default function BookPage() {
  const SHOW_VIDEO = true;
  return (
    <>
      <style>{`
  /* ---------- Service catalogue page ---------- */
  .svc-page{padding:48px var(--gutter) 160px;background:var(--paper)}
  .svc-page__intro{
    max-width:var(--max);margin:0 auto 48px;
    display:flex;justify-content:space-between;align-items:end;gap:32px;flex-wrap:wrap;
  }
  .svc-page__intro h2{font-family:var(--display);font-weight:500;font-size:clamp(40px,5vw,72px);line-height:1.02;color:var(--ink);letter-spacing:-0.005em;margin-top:14px}
  .svc-page__intro h2 em{font-style:italic;color:var(--steel);font-weight:400}
  .svc-page__intro p{color:var(--graphite);font-size:15px;line-height:1.6;max-width:380px}

  .cat{max-width:var(--max);margin:0 auto;padding-top:48px}
  .cat__head{
    display:flex;justify-content:space-between;align-items:end;gap:24px;
    border-bottom:1px solid rgba(74,74,72,0.18);padding-bottom:18px;margin-bottom:24px;
  }
  .cat__head h3{
    font-family:var(--display);font-weight:500;
    font-size:clamp(28px,3.4vw,44px);color:var(--ink);letter-spacing:-0.005em;line-height:1;
  }
  .cat__head h3 em{font-style:italic;color:var(--steel);font-weight:400}
  .cat__count{font-family:var(--body);font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:var(--steel);font-weight:500}

  .svc-grid{
    display:grid;grid-template-columns:repeat(3,1fr);gap:18px;
  }
  .svc-card{
    display:flex;flex-direction:column;
    background:var(--paper);
    border:1px solid rgba(74,74,72,0.16);
    overflow:hidden;
    cursor:pointer;
    transition:transform .35s var(--ease), border-color .25s ease, box-shadow .25s ease;
    position:relative;
  }
  .svc-card:hover{transform:translateY(-3px);border-color:var(--ink)}
  .svc-card.is-added{border-color:var(--steel);background:rgba(74,97,120,0.04)}

  .svc-card__media{
    aspect-ratio:5/3;overflow:hidden;background:var(--soft);
    position:relative;
  }
  .svc-card__media__img{
    position:absolute;inset:0;
    background-size:cover;background-position:center;
    filter:saturate(0.94);transition:filter .35s ease;
  }
  .svc-card:hover .svc-card__media__img{filter:saturate(1.04)}
  .svc-card__badge{
    position:absolute;top:12px;left:12px;z-index:2;
    background:var(--steel);color:var(--paper);
    padding:6px 10px;
    font-family:var(--body);font-size:9px;letter-spacing:0.32em;text-transform:uppercase;font-weight:600;
    opacity:0;transform:translateY(-4px);transition:opacity .3s ease, transform .3s var(--ease);
  }
  .svc-card.is-added .svc-card__badge{opacity:1;transform:none}

  .svc-card__body{
    padding:16px 18px 18px;
    display:flex;flex-direction:column;gap:8px;flex:1;
  }
  .svc-card__name{
    font-family:var(--display);font-weight:500;
    font-size:18px;line-height:1.2;color:var(--ink);letter-spacing:-0.005em;
  }
  .svc-card__desc{
    font-family:var(--body);font-size:12px;line-height:1.5;color:var(--graphite);
    flex:1;
  }
  .svc-card__foot{
    display:flex;justify-content:space-between;align-items:center;
    margin-top:6px;padding-top:12px;border-top:1px solid rgba(74,74,72,0.12);
  }
  .svc-card__price{
    font-family:var(--display);font-weight:500;
    font-size:20px;color:var(--ink);letter-spacing:-0.01em;
  }
  .svc-card__price small{font-family:var(--body);font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:var(--graphite);font-weight:500;margin-left:4px}
  .svc-card__add{
    font-family:var(--body);font-size:11px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;
    padding:8px 14px;border:1px solid var(--ink);color:var(--ink);background:transparent;
    transition:background .25s ease, color .25s ease, border-color .25s ease;
  }
  .svc-card:hover .svc-card__add{background:var(--ink);color:var(--paper)}
  .svc-card.is-added .svc-card__add{background:var(--steel);color:var(--paper);border-color:var(--steel)}
  .svc-card.is-added .svc-card__add::before{content:'\\2713 '}

  @media (max-width:1100px){.svc-grid{grid-template-columns:repeat(2,1fr)}}
  @media (max-width:760px){
    .svc-page{padding:32px var(--gutter) 140px}
    .svc-page__intro{flex-direction:column;align-items:flex-start;gap:12px;margin-bottom:32px}
    .cat{padding-top:32px}
    .cat__head{flex-direction:column;align-items:flex-start;gap:6px;padding-bottom:14px;margin-bottom:18px}
    .cat__head h3{font-size:28px}
    .svc-grid{grid-template-columns:repeat(2,1fr);gap:12px}
    .svc-card__media{aspect-ratio:5/4}
    .svc-card__name{font-size:15px}
    .svc-card__desc{font-size:11px}
    .svc-card__price{font-size:17px}
  }
  @media (max-width:440px){
    .svc-grid{grid-template-columns:repeat(2,1fr);gap:10px}
    .svc-grid--single{grid-template-columns:1fr;gap:12px}
  }

  /* ---------- Before/after comparison sliders ---------- */
  .ba-row{
    display:grid;grid-template-columns:repeat(3,1fr);gap:18px;
    margin-top:8px;
  }
  @media (max-width:900px){
    .ba-row{grid-template-columns:1fr;gap:14px}
  }
  .ba-slider{margin:0;display:flex;flex-direction:column;gap:10px}
  .ba-slider__frame{
    position:relative;width:100%;aspect-ratio:4/3;
    background:var(--soft);overflow:hidden;
    border:1px solid var(--border);
    user-select:none;touch-action:none;cursor:ew-resize;
  }
  .ba-slider__img{
    position:absolute;inset:0;width:100%;height:100%;
    object-fit:cover;display:block;pointer-events:none;
  }
  .ba-slider__before-clip{
    position:absolute;inset:0;will-change:clip-path;
  }
  .ba-slider__tag{
    position:absolute;top:10px;
    font-family:var(--body);font-size:10px;letter-spacing:0.22em;
    text-transform:uppercase;font-weight:600;
    padding:5px 9px;background:var(--ink);color:var(--paper);
    pointer-events:none;z-index:3;
  }
  .ba-slider__tag--before{left:10px}
  .ba-slider__tag--after{right:10px;background:var(--paper);color:var(--ink);border:1px solid var(--ink)}
  .ba-slider__divider{
    position:absolute;top:0;bottom:0;width:2px;
    background:var(--paper);
    transform:translateX(-50%);
    z-index:4;outline:none;cursor:ew-resize;
    box-shadow:0 0 0 1px rgba(0,0,0,0.18);
  }
  .ba-slider__divider:focus-visible{box-shadow:0 0 0 2px var(--ink)}
  .ba-slider__handle{
    position:absolute;top:50%;left:50%;
    transform:translate(-50%,-50%);
    width:40px;height:40px;background:var(--paper);
    border:1px solid var(--ink);
    display:flex;align-items:center;justify-content:center;
    gap:2px;font-family:var(--body);
    color:var(--ink);font-size:18px;line-height:1;
    pointer-events:none;
  }
  .ba-slider__handle-arrow{font-weight:600}
  .ba-slider__label{
    font-family:var(--body);font-size:11px;letter-spacing:0.22em;
    text-transform:uppercase;color:var(--ink);font-weight:600;
    text-align:center;
  }

  /* ---------- Floor-plan customiser ---------- */
  .fp-config{
    display:grid;grid-template-columns:1fr 1.05fr;
    gap:0;
    background:var(--paper);
    border:1px solid rgba(74,74,72,0.16);
    margin-bottom:24px;
    overflow:hidden;
  }
  .fp-config__media{position:relative;background:var(--soft);min-height:180px}
  .fp-config__img{
    position:absolute;inset:0;
    background-size:cover;background-position:center;
    filter:saturate(0.94);
    transition:background-image .4s ease, filter .35s ease;
  }
  .fp-config__body{
    padding:18px 22px;
    display:flex;flex-direction:column;gap:12px;
  }
  .fp-config__body h4{
    font-family:var(--display);font-weight:500;
    font-size:18px;color:var(--ink);line-height:1.1;letter-spacing:-0.005em;
  }
  .fp-config__body > p{font-size:11px;line-height:1.5;color:var(--graphite);max-width:420px;margin:0}

  .fp-group{display:flex;flex-direction:column;gap:6px}
  .fp-group > label{font-family:var(--body);font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:var(--graphite);font-weight:500}
  .fp-pills{display:flex;gap:6px;flex-wrap:wrap}
  .fp-pills button{
    font-family:var(--body);
    padding:7px 12px;
    border:1px solid rgba(74,74,72,0.22);background:transparent;color:var(--graphite);
    cursor:pointer;
    transition:background .25s ease, color .25s ease, border-color .25s ease;
    display:flex;flex-direction:column;align-items:flex-start;gap:0;line-height:1.1;
    font-size:11px;letter-spacing:0.16em;text-transform:uppercase;font-weight:600;
    text-align:left;
  }
  .fp-pills button small{
    font-family:var(--body);font-size:9px;letter-spacing:0.06em;
    color:inherit;opacity:0.6;text-transform:none;
    margin-top:1px;font-weight:400;
  }
  .fp-pills button:hover{border-color:var(--steel);color:var(--steel)}
  .fp-pills button.is-active{background:var(--steel);color:var(--paper);border-color:var(--steel)}
  .fp-pills button.is-active small{opacity:0.85}

  .fp-style-section{margin-top:6px}
  .fp-style-section + .fp-style-section{margin-top:10px}
  .fp-style-section__head{
    display:flex;justify-content:space-between;align-items:baseline;
    padding-top:6px;margin-bottom:6px;
    border-top:1px solid rgba(74,74,72,0.14);
  }
  .fp-style-section__name{
    font-family:var(--body);font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:var(--ink);font-weight:600;
  }
  .fp-style-section__name em{font-style:italic;color:var(--steel);font-weight:400}
  .fp-style-section__from{
    font-family:var(--body);font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:var(--steel);font-weight:500;
  }
  .fp-style-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
  .fp-style-grid--two{grid-template-columns:repeat(2,1fr)}
  .fp-style-card{
    display:flex;flex-direction:column;align-items:flex-start;gap:1px;
    padding:8px 12px;
    background:transparent;border:1px solid rgba(74,74,72,0.22);
    cursor:pointer;text-align:left;
    transition:background .25s ease, color .25s ease, border-color .25s ease;
  }
  .fp-style-card:hover{border-color:var(--steel);color:var(--steel)}
  .fp-style-card.is-active{background:var(--steel);color:var(--paper);border-color:var(--steel)}
  .fp-style-card__label{
    display:flex;flex-direction:column;gap:1px;
    font-family:var(--body);font-size:10px;letter-spacing:0.16em;text-transform:uppercase;font-weight:600;
    color:inherit;
  }
  .fp-style-card__label small{
    font-family:var(--body);font-size:9px;letter-spacing:0.04em;text-transform:none;font-weight:400;
    color:var(--graphite);
  }
  .fp-style-card:hover .fp-style-card__label small{color:var(--steel)}
  .fp-style-card.is-active .fp-style-card__label small{color:rgba(250,250,247,0.85)}
  @media (max-width:640px){
    .fp-style-grid{grid-template-columns:repeat(2,1fr)}
  }

  .fp-foot{
    display:flex;justify-content:space-between;align-items:center;gap:14px;
    margin-top:6px;padding-top:12px;border-top:1px solid rgba(74,74,72,0.14);
  }
  .fp-foot__label{display:block;font-family:var(--body);font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:var(--graphite);font-weight:500;margin-bottom:2px}
  .fp-foot__price{
    display:block;
    font-family:var(--display);font-weight:500;
    font-size:24px;color:var(--ink);letter-spacing:-0.01em;line-height:1;
  }
  .fp-add{
    position:relative;isolation:isolate;overflow:hidden;
    font-family:var(--body);font-size:11px;letter-spacing:0.22em;text-transform:uppercase;font-weight:500;
    color:var(--paper);background:transparent;border:1px solid var(--steel);
    padding:10px 16px;cursor:pointer;
    transition:color .4s var(--ease), border-color .4s var(--ease);
    white-space:nowrap;
  }
  .fp-add::before{
    content:'';position:absolute;inset:0;z-index:-1;
    background:var(--steel);
    transform:scaleX(1);transform-origin:right center;
    transition:transform .55s var(--ease);
  }
  .fp-add:hover{color:var(--steel)}
  .fp-add:hover::before{transform:scaleX(0);transform-origin:left center}

  .fp-sub{
    font-family:var(--body);font-size:11px;letter-spacing:0.22em;text-transform:uppercase;
    color:var(--steel);font-weight:500;
    margin:32px 0 14px;
    padding-top:8px;
  }

  @media (max-width:760px){
    .fp-config{grid-template-columns:1fr}
    .fp-config__media{min-height:160px}
    .fp-config__body{padding:16px 18px;gap:10px}
    .fp-foot{flex-direction:column;align-items:stretch;gap:10px}
    .fp-add{width:100%;text-align:center;padding:12px 16px}
    .fp-style-grid{grid-template-columns:repeat(2,1fr)}
    .fp-style-grid--two{grid-template-columns:repeat(2,1fr)}
    .fp-pills button{flex:1 1 auto}
  }

  /* ---------- Packages ---------- */
  .pkg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
  .pkg-card{
    display:flex;flex-direction:column;
    background:var(--paper);
    border:1px solid rgba(74,74,72,0.16);
    overflow:hidden;
    transition:border-color .25s ease, transform .35s var(--ease);
    scroll-margin-top:120px;
  }
  .pkg-card:hover{border-color:var(--ink);transform:translateY(-3px)}
  .pkg-card.is-target{border-color:var(--steel);box-shadow:0 12px 40px rgba(10,10,10,0.12)}
  .pkg-card__media{aspect-ratio:5/3;background:var(--soft);overflow:hidden;position:relative}
  .pkg-card__media__img{position:absolute;inset:0;background-size:cover;background-position:center;filter:saturate(0.94)}
  .pkg-card__tag{
    position:absolute;top:12px;left:12px;z-index:2;
    background:var(--ink);color:var(--paper);
    padding:6px 10px;
    font-family:var(--body);font-size:9px;letter-spacing:0.32em;text-transform:uppercase;font-weight:600;
  }
  .pkg-card__body{padding:18px 20px 20px;display:flex;flex-direction:column;gap:12px;flex:1}
  .pkg-card__name{font-family:var(--display);font-weight:500;font-size:22px;line-height:1.1;color:var(--ink);letter-spacing:-0.005em}
  .pkg-card__name em{font-style:italic;color:var(--steel);font-weight:400}
  .pkg-card__desc{font-family:var(--body);font-size:12px;line-height:1.55;color:var(--graphite)}
  .pkg-card__incl{font-family:var(--body);font-size:11px;line-height:1.6;color:var(--ink);margin:0;padding:0;list-style:none}
  .pkg-card__incl li{padding:4px 0;border-top:1px solid rgba(74,74,72,0.1)}
  .pkg-card__incl li:first-child{border-top:none}
  .pkg-card__pricerow{
    display:flex;align-items:baseline;gap:8px;padding-top:10px;border-top:1px solid rgba(74,74,72,0.12)
  }
  .pkg-card__from{font-family:var(--body);font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:var(--graphite);font-weight:500}
  .pkg-card__price{font-family:var(--display);font-weight:500;font-size:26px;color:var(--ink);letter-spacing:-0.01em;line-height:1}
  .pkg-card__list{font-family:var(--body);font-size:12px;color:var(--graphite);text-decoration:line-through;font-weight:500}
  .pkg-card__tiers{display:flex;flex-direction:column;gap:6px}
  .pkg-card__tiers > label{font-family:var(--body);font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:var(--graphite);font-weight:500}
  .pkg-card__pills{display:flex;gap:6px;flex-wrap:wrap}
  .pkg-card__pills button{
    flex:1 1 0;min-width:0;
    font-family:var(--body);font-size:11px;letter-spacing:0.14em;text-transform:uppercase;font-weight:500;
    padding:10px 8px;border:1px solid rgba(74,74,72,0.2);background:transparent;color:var(--ink);cursor:pointer;
    display:flex;flex-direction:column;align-items:center;gap:2px;line-height:1.1;
    transition:background .25s ease, color .25s ease, border-color .25s ease;
  }
  .pkg-card__pills button small{font-size:9px;letter-spacing:0.18em;color:var(--graphite);font-weight:500}
  .pkg-card__pills button:hover{border-color:var(--ink)}
  .pkg-card__pills button.is-active{background:var(--ink);color:var(--paper);border-color:var(--ink)}
  .pkg-card__pills button.is-active small{color:rgba(250,250,247,0.85)}
  .pkg-card__add{
    position:relative;isolation:isolate;overflow:hidden;
    margin-top:4px;
    font-family:var(--body);font-size:11px;letter-spacing:0.22em;text-transform:uppercase;font-weight:500;
    color:var(--paper);background:transparent;border:1px solid var(--ink);
    padding:13px 18px;cursor:pointer;
    transition:color .4s var(--ease), border-color .4s var(--ease);
  }
  .pkg-card__add::before{
    content:'';position:absolute;inset:0;z-index:-1;
    background:var(--ink);
    transform:scaleX(1);transform-origin:right center;
    transition:transform .55s var(--ease);
  }
  .pkg-card__add:hover{color:var(--ink)}
  .pkg-card__add:hover::before{transform:scaleX(0);transform-origin:left center}
  .pkg-card.is-added .pkg-card__add{color:var(--paper);border-color:var(--steel)}
  .pkg-card.is-added .pkg-card__add::before{background:var(--steel);transform:scaleX(1) !important;transform-origin:left center}
  .pkg-card.is-added .pkg-card__add::after{content:' ✓'}
  @media (max-width:1100px){.pkg-grid{grid-template-columns:repeat(2,1fr)}}
  @media (max-width:760px){
    .pkg-grid{grid-template-columns:1fr;gap:14px}
    .pkg-card__name{font-size:19px}
    .pkg-card__price{font-size:22px}
  }
  /* Stack tier pills vertically when the pkg-card lives inside a multi-col svc-grid on phone */
  @media (max-width:440px){
    .svc-grid .pkg-card__pills{flex-direction:column;align-items:stretch}
    .svc-grid .pkg-card__pills button{width:100%;justify-content:center;padding:8px 10px}
    .svc-grid .pkg-card__name{font-size:17px}
    .svc-grid .pkg-card__price{font-size:20px}
    .svc-grid .pkg-card__body{padding:14px 14px 16px;gap:10px}
  }

  /* ---------- Floating cart toggle (FAB) ---------- */
  .cart-fab{
    position:fixed;bottom:24px;right:24px;z-index:90;
    width:60px;height:60px;border-radius:50%;
    background:var(--steel);color:var(--paper);
    border:none;cursor:pointer;
    display:flex;align-items:center;justify-content:center;
    transition:background .25s ease, transform .35s var(--ease);
  }
  .cart-fab:hover{background:var(--steel-dark);transform:translateY(-2px) scale(1.04)}
  .cart-fab svg{width:22px;height:22px;display:block;position:relative;z-index:1}
  .cart-fab__count{
    position:absolute;top:-4px;right:-4px;z-index:2;
    min-width:22px;height:22px;padding:0 6px;
    background:var(--ink);color:var(--paper);border-radius:11px;
    font-family:var(--body);font-size:10px;font-weight:600;
    display:flex;align-items:center;justify-content:center;
    transform:scale(0);transition:transform .35s var(--ease);
    border:2px solid var(--paper);
  }
  .cart-fab.has-items .cart-fab__count{transform:scale(1)}
  .cart-fab__pulse,.cart-fab__pulse::before{
    position:absolute;inset:0;border-radius:50%;
    border:1px solid var(--steel);
    pointer-events:none;opacity:0;
  }
  .cart-fab__pulse::before{content:'';inset:0}
  .cart-fab.has-items .cart-fab__pulse{
    animation:cartPulse 2.4s ease-out infinite;
  }
  .cart-fab.has-items .cart-fab__pulse::before{
    animation:cartPulse 2.4s ease-out infinite;
    animation-delay:1.2s;
  }
  @keyframes cartPulse{
    0%{opacity:0.55;transform:scale(1)}
    100%{opacity:0;transform:scale(1.7)}
  }

  /* ---------- Cart widget ---------- */
  .cart{
    position:fixed;
    right:24px;bottom:96px;
    width:380px;max-width:calc(100vw - 32px);
    max-height:min(72vh, 640px);
    background:var(--paper);
    border:1px solid rgba(74,74,72,0.18);
    box-shadow:0 12px 40px rgba(10,10,10,0.18);
    z-index:95;
    display:flex;flex-direction:column;
    transform:translateY(16px) scale(0.96);
    transform-origin:bottom right;
    opacity:0;pointer-events:none;
    transition:opacity .3s ease, transform .35s var(--ease);
  }
  .cart.is-open{opacity:1;transform:none;pointer-events:auto}

  .cart__head{
    display:flex;justify-content:space-between;align-items:center;
    padding:16px 18px;border-bottom:1px solid rgba(74,74,72,0.14);
    flex-shrink:0;
  }
  .cart__head h3{font-family:var(--display);font-weight:500;font-size:20px;color:var(--ink);line-height:1;letter-spacing:-0.005em}
  .cart__head h3 em{font-style:italic;color:var(--steel);font-weight:400}
  .cart__close{
    width:32px;height:32px;
    border:1px solid rgba(74,74,72,0.25);background:transparent;cursor:pointer;
    display:flex;align-items:center;justify-content:center;font-size:18px;color:var(--ink);
    transition:background .25s ease, color .25s ease, border-color .25s ease;
  }
  .cart__close:hover{background:var(--ink);color:var(--paper);border-color:var(--ink)}

  .cart__scroll{flex:1;overflow-y:auto;padding:12px 18px;min-height:60px}
  .cart__empty{
    text-align:center;padding:28px 12px;color:var(--graphite);
  }
  .cart__empty h4{font-family:var(--display);font-weight:500;font-size:18px;color:var(--ink);margin-bottom:6px;letter-spacing:-0.005em}
  .cart__empty p{font-size:12px;line-height:1.55}

  .cart__list{display:flex;flex-direction:column;gap:0}
  .cart__item{
    display:grid;grid-template-columns:48px 1fr auto;gap:10px;align-items:center;
    padding:10px 0;border-top:1px solid rgba(74,74,72,0.1);
  }
  .cart__item:first-child{border-top:none}
  .cart__item__thumb{
    width:48px;height:48px;background:var(--soft) center/cover;
  }
  .cart__item__info{min-width:0}
  .cart__item__name{font-family:var(--display);font-weight:500;font-size:14px;color:var(--ink);line-height:1.2;letter-spacing:-0.005em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .cart__item__price{font-family:var(--body);font-size:11px;color:var(--graphite);margin-top:2px}
  .cart__item__remove{
    width:26px;height:26px;border:1px solid rgba(74,74,72,0.25);background:transparent;cursor:pointer;
    display:flex;align-items:center;justify-content:center;font-size:13px;color:var(--graphite);
    transition:border-color .2s ease, color .2s ease, background .2s ease;
  }
  .cart__item__remove:hover{border-color:var(--ink);color:var(--paper);background:var(--ink)}

  .cart__total{
    display:flex;justify-content:space-between;align-items:baseline;
    padding:14px 18px;border-top:1px solid rgba(74,74,72,0.18);
    background:var(--soft);
    flex-shrink:0;
  }
  .cart__total__label{font-family:var(--body);font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:var(--graphite);font-weight:500}
  .cart__total__amt{font-family:var(--display);font-weight:500;font-size:22px;color:var(--ink);letter-spacing:-0.01em}

  .cart__foot{
    padding:14px 18px 16px;
    border-top:1px solid rgba(74,74,72,0.14);
    flex-shrink:0;
  }

  .cart__submit{
    position:relative;isolation:isolate;overflow:hidden;
    margin-top:4px;
    font-family:var(--body);font-size:12px;letter-spacing:0.22em;text-transform:uppercase;font-weight:500;
    color:var(--paper);background:transparent;
    padding:14px 22px;border:1px solid var(--steel);
    cursor:pointer;width:100%;
    transition:color .4s var(--ease), border-color .4s var(--ease);
  }
  .cart__submit::before{
    content:'';position:absolute;inset:0;z-index:-1;
    background:var(--steel);
    transform:scaleX(1);transform-origin:right center;
    transition:transform .55s var(--ease);
  }
  .cart__submit:hover{color:var(--steel)}
  .cart__submit:hover::before{transform:scaleX(0);transform-origin:left center}
  .cart__submit:disabled{opacity:0.5;cursor:not-allowed}

  @media (max-width:560px){
    .cart-fab{bottom:18px;right:18px;width:54px;height:54px}
    .cart{
      right:14px;left:auto;bottom:82px;
      width:min(340px, calc(100vw - 28px));
      max-width:none;
      max-height:min(70vh, 540px);
    }
    .cart__head{padding:12px 14px}
    .cart__head h3{font-size:16px}
    .cart__scroll{padding:8px 14px}
    .cart__total{padding:10px 14px}
    .cart__total__amt{font-size:16px}
    .cart__foot{padding:10px 14px 12px}
    .cart__submit{padding:12px 16px;font-size:10px}
    .cart__item{grid-template-columns:32px 1fr auto;gap:8px;padding:8px 0}
    .cart__item__thumb{width:32px;height:32px}
    .cart__item__name{font-size:12px}
    .cart__item__price{font-size:10px}
  }

  /* ---------- Section-jump filter strip ---------- */
  /* padding-top clears the fixed navbar (~77px unstuck / ~69 stuck) so it
     never clips the chips. When the navbar is GENUINELY hidden the strip
     lifts via transform so the chips rise to cover the vacated nav area
     (no empty white band). The lift is DEBOUNCED in JS — it only toggles
     after the nav has been continuously hidden >220ms and drops the instant
     it returns — so the nav's trackpad-flapping (it toggles on any >6px
     delta, no hysteresis) is collapsed to a no-op and the strip cannot
     bounce. transform = compositor-only, so no reflow either. */
  .svc-jump{
    position:sticky;top:0;z-index:90;background:var(--paper);
    max-width:var(--max);margin:0 auto;padding-top:84px;
    border-bottom:1px solid var(--border);
    transition:transform .28s var(--ease);
  }
  .svc-jump.is-navhidden{transform:translateY(-72px)}
  .svc-jump__strip{
    display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;
    -webkit-overflow-scrolling:touch;scroll-snap-type:x proximity;
    padding:0 0 12px;
  }
  .svc-jump__strip::-webkit-scrollbar{display:none}
  .svc-jump__chip{
    flex:0 0 auto;white-space:nowrap;scroll-snap-align:start;
    border:1px solid var(--border-strong);background:var(--paper);color:var(--ink);
    font-family:var(--body);font-size:12px;font-weight:500;letter-spacing:0.02em;
    padding:9px 16px;text-decoration:none;cursor:pointer;
    transition:border-color .25s var(--ease),background .25s var(--ease),color .25s var(--ease);
  }
  .svc-jump__chip:hover{border-color:var(--ink)}
  .svc-jump__chip[aria-current="true"]{background:var(--ink);color:var(--paper);border-color:var(--ink)}
  /* Land anchored sections clear of the fixed nav + sticky strip */
  .cat{scroll-margin-top:140px}
  @media (max-width:760px){
    .svc-jump{padding-top:78px}
    .svc-jump.is-navhidden{transform:translateY(-66px)}
    .cat{scroll-margin-top:128px}
    .svc-jump__chip{font-size:11px;padding:8px 13px}
  }
`}</style>

      <header className="nav">
        <div className="nav__brand">
          <Link href="/#top" aria-label="Won Vision — home"><Wordmark /></Link>
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
      </aside>

      {/* L — TYPE-AS-WINDOW HEADER */}
      <section className="gallery-hero">
        <div className="gallery-hero__bg"></div>
        <div className="gallery-hero__veil"></div>

        <header className="gallery-hero__top">
          <span className="eyebrow">Won Vision · Book a shoot</span>
        </header>

        <div className="gallery-hero__big">
          <h1 className="typed">BOOK</h1>
        </div>
      </section>

      {/* SERVICE CATALOGUE */}
      <section className="svc-page">
        <div className="svc-page__intro">
          <div>
            <span className="eyebrow">Catalogue</span>
            <h2>Pick what your <em>listing needs.</em></h2>
          </div>
        </div>

        <span id="svcJumpSentinel" aria-hidden="true" style={{ display: 'block', height: 1, marginBottom: -1 }} />
        <nav className="svc-jump" id="svcJump" aria-label="Jump to a service section">
          <div className="svc-jump__strip">
            <a href="#cat-packages" className="svc-jump__chip">Packages</a>
            <a href="#cat-photography" className="svc-jump__chip">Photography &amp; aerial</a>
            {SHOW_VIDEO && <a href="#cat-video" className="svc-jump__chip">Videography</a>}
            <a href="#cat-floorplans" className="svc-jump__chip">Floor plans &amp; site plan</a>
            <a href="#cat-staging" className="svc-jump__chip">Virtual editing</a>
          </div>
        </nav>

        {/* PACKAGES */}
        <div className="cat" id="cat-packages" data-gallery="photography">
          <div className="cat__head"><h3><em>Packages</em></h3><span className="cat__count">pick a tier</span></div>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--graphite)', marginBottom: 18 }}>
            Bundled offerings that combine our most-requested services at significant savings versus à la carte. Pick a package, choose the property tier — we handle the rest. New clients: ask us for an intro promo on your first 3 jobs — applied manually with your code at checkout. No automatic discount.
          </p>

          <div className="pkg-grid">

            <article
              className="pkg-card"
              data-pkg="showcase"
              data-cats="photography,floorplan,drone"
              data-pkg-name="Essential"
              data-pkg-img="/images/showcase.webp"
              data-tiers='{"compact":{"label":"Compact · 15 photos","price":350,"promo":280},"standard":{"label":"Standard · 20 photos","price":450,"promo":360},"premium":{"label":"Premium · 25 photos","price":550,"promo":440}}'
            >
              <div className="pkg-card__media">
                <span className="pkg-card__tag">Most booked</span>
                <div className="pkg-card__media__img" style={{ backgroundImage: "url('/images/showcase.webp')" }}></div>
              </div>
              <div className="pkg-card__body">
                <h4 className="pkg-card__name">Essential</h4>
                <p className="pkg-card__desc">Photos, floor plan, and aerial context in one shoot — the standard suburban listing bundle.</p>
                <ul className="pkg-card__incl">
                  <li>15 / 20 / 25 HDR photos (by tier)</li>
                  <li>2D floor plan with dimensions</li>
                  <li>Drone set — 5 edited images</li>
                  <li>Next-business-day delivery</li>
                </ul>
                <div className="pkg-card__tiers">
                  <label>Property size</label>
                  <div className="pkg-card__pills" data-pkg-tiers>
                    <button type="button" data-tier="compact" className="is-active">Compact<small>15 photos</small></button>
                    <button type="button" data-tier="standard">Standard<small>20 photos</small></button>
                    <button type="button" data-tier="premium">Premium<small>25 photos</small></button>
                  </div>
                </div>
                <div className="pkg-card__pricerow">
                  <span className="pkg-card__from">From</span>
                  <span className="pkg-card__price" data-pkg-price>$350</span>
                  <span className="pkg-card__list" data-pkg-list hidden></span>
                </div>
                <button type="button" className="pkg-card__add" data-pkg-add>Add to booking →</button>
              </div>
            </article>

            {SHOW_VIDEO && (
            <article
              className="pkg-card"
              data-pkg="signature"
              data-cats="photography,floorplan,drone,video"
              data-pkg-name="Signature"
              data-pkg-img="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85"
              data-tiers='{"compact":{"label":"Compact · 15 photos","price":675,"promo":540},"standard":{"label":"Standard · 20 photos","price":750,"promo":600},"premium":{"label":"Premium · 25 photos","price":825,"promo":660}}'
            >
              <div className="pkg-card__media">
                <span className="pkg-card__tag">Complete deliverable</span>
                <div className="pkg-card__media__img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85')" }}></div>
              </div>
              <div className="pkg-card__body">
                <h4 className="pkg-card__name">Signature</h4>
                <p className="pkg-card__desc">Photo + plan + drone + Standard Listing Video — agent footage and drone footage included.</p>
                <ul className="pkg-card__incl">
                  <li>15 / 20 / 25 HDR photos (by tier)</li>
                  <li>2D floor plan + 5-image drone set</li>
                  <li>Standard Listing Video · 30–60s</li>
                  <li>Includes agent footage + drone footage</li>
                </ul>
                <div className="pkg-card__tiers">
                  <label>Property size</label>
                  <div className="pkg-card__pills" data-pkg-tiers>
                    <button type="button" data-tier="compact" className="is-active">Compact<small>15 photos</small></button>
                    <button type="button" data-tier="standard">Standard<small>20 photos</small></button>
                    <button type="button" data-tier="premium">Premium<small>25 photos</small></button>
                  </div>
                </div>
                <div className="pkg-card__pricerow">
                  <span className="pkg-card__from">From</span>
                  <span className="pkg-card__price" data-pkg-price>$540</span>
                  <span className="pkg-card__list" data-pkg-list>$675</span>
                </div>
                <button type="button" className="pkg-card__add" data-pkg-add>Add to booking →</button>
              </div>
            </article>
            )}

            {SHOW_VIDEO && (
            <article
              className="pkg-card"
              data-pkg="cinematic"
              data-cats="photography,floorplan,drone,video"
              data-pkg-name="Cinematic"
              data-pkg-img="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85"
              data-tiers='{"compact":{"label":"Compact · 15 photos","price":1100,"promo":880},"standard":{"label":"Standard · 20 photos","price":1200,"promo":960},"premium":{"label":"Premium · 25 photos","price":1300,"promo":1040}}'
            >
              <div className="pkg-card__media">
                <span className="pkg-card__tag">Flagship</span>
                <div className="pkg-card__media__img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85')" }}></div>
              </div>
              <div className="pkg-card__body">
                <h4 className="pkg-card__name">Cinematic</h4>
                <p className="pkg-card__desc">Photo + plan + drone + Premium Listing Video — the flagship luxury deliverable.</p>
                <ul className="pkg-card__incl">
                  <li>15 / 20 / 25 HDR photos (by tier)</li>
                  <li>2D floor plan + 5-image drone set</li>
                  <li>Premium Listing Video · 60–90s</li>
                  <li>Includes agent footage + drone footage</li>
                </ul>
                <div className="pkg-card__tiers">
                  <label>Property size</label>
                  <div className="pkg-card__pills" data-pkg-tiers>
                    <button type="button" data-tier="compact" className="is-active">Compact<small>15 photos</small></button>
                    <button type="button" data-tier="standard">Standard<small>20 photos</small></button>
                    <button type="button" data-tier="premium">Premium<small>25 photos</small></button>
                  </div>
                </div>
                <div className="pkg-card__pricerow">
                  <span className="pkg-card__from">From</span>
                  <span className="pkg-card__price" data-pkg-price>$880</span>
                  <span className="pkg-card__list" data-pkg-list>$1,100</span>
                </div>
                <button type="button" className="pkg-card__add" data-pkg-add>Add to booking →</button>
              </div>
            </article>
            )}

          </div>
        </div>

        {/* PHOTOGRAPHY + AERIAL/DRONE */}
        <div className="cat" id="cat-photography" data-gallery="photography" data-cats="photography,drone">
          <div className="cat__head"><h3>Photography <em>&amp; aerial</em></h3><span className="cat__count">Photo + drone</span></div>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--graphite)', marginBottom: 18 }}>
            Pure photography pricing by photo count, plus a standalone drone set. Full HDR retouching, sky replacement and agent-facing licensing included. Bundle photo + plan + drone at 18–29% off via Packages above.
          </p>

          <div className="pkg-grid">

            <article
              className="pkg-card"
              data-pkg="photography"
              data-cats="photography"
              data-pkg-name="Photography"
              data-pkg-img="/images/sales-standard.webp"
              data-tiers='{"eight":{"label":"8 photos","price":149},"fifteen":{"label":"15 photos","price":195},"twenty":{"label":"20 photos","price":245},"twentyfive":{"label":"25 photos","price":295}}'
              style={{ gridColumn: 'span 2' }}
            >
              <div className="pkg-card__media">
                <span className="pkg-card__tag">Photo-only</span>
                <div className="pkg-card__media__img" style={{ backgroundImage: "url('/images/sales-standard.webp')" }}></div>
              </div>
              <div className="pkg-card__body">
                <h4 className="pkg-card__name">Photography</h4>
                <p className="pkg-card__desc">Full HDR retouching, sky replacement and agent-facing licensing — pick the photo count that fits the property.</p>
                <ul className="pkg-card__incl">
                  <li>Full HDR retouching</li>
                  <li>Sky replacement</li>
                  <li>Agent-facing licensing</li>
                  <li>Next-business-day delivery</li>
                </ul>
                <div className="pkg-card__tiers">
                  <label>Photo count</label>
                  <div className="pkg-card__pills" data-pkg-tiers>
                    <button type="button" data-tier="eight" className="is-active">8<small>photos</small></button>
                    <button type="button" data-tier="fifteen">15<small>photos</small></button>
                    <button type="button" data-tier="twenty">20<small>photos</small></button>
                    <button type="button" data-tier="twentyfive">25<small>photos</small></button>
                  </div>
                </div>
                <div className="pkg-card__pricerow">
                  <span className="pkg-card__from">From</span>
                  <span className="pkg-card__price" data-pkg-price>$149</span>
                  <span className="pkg-card__list" data-pkg-list hidden></span>
                </div>
                <button type="button" className="pkg-card__add" data-pkg-add>Add to booking →</button>
              </div>
            </article>

            <article
              className="pkg-card"
              data-pkg="drone-set"
              data-cats="drone"
              data-pkg-name="Drone Set"
              data-pkg-img="/images/drone-set.webp"
              data-tiers='{"lite":{"label":"Lite · 3 photos","price":139},"standard":{"label":"Standard · 5 photos","price":159}}'
            >
              <div className="pkg-card__media" style={{ aspectRatio: '5 / 6' }}>
                <span className="pkg-card__tag">Aerial</span>
                <div className="pkg-card__media__img" style={{ backgroundImage: "url('/images/drone-set.webp')", backgroundSize: '135%', backgroundPosition: 'center 45%' }}></div>
              </div>
              <div className="pkg-card__body">
                <h4 className="pkg-card__name">Drone Set</h4>
                <p className="pkg-card__desc">Edited aerial stills — hero, POI and plot overview shots, same-day delivery.</p>
                <ul className="pkg-card__incl">
                  <li>Hero + POI shots</li>
                  <li>Plot / land overview</li>
                  <li>Same-day delivery</li>
                </ul>
                <div className="pkg-card__tiers">
                  <label>Photo count</label>
                  <div className="pkg-card__pills" data-pkg-tiers>
                    <button type="button" data-tier="lite" className="is-active">Lite<small>3 photos</small></button>
                    <button type="button" data-tier="standard">Standard<small>5 photos</small></button>
                  </div>
                </div>
                <div className="pkg-card__pricerow">
                  <span className="pkg-card__from">From</span>
                  <span className="pkg-card__price" data-pkg-price>$139</span>
                  <span className="pkg-card__list" data-pkg-list hidden></span>
                </div>
                <button type="button" className="pkg-card__add" data-pkg-add>Add to booking →</button>
              </div>
            </article>

          </div>
        </div>

        {/* VIDEO */}
        {SHOW_VIDEO && (
        <div className="cat" id="cat-video" data-gallery="video" data-cats="video">
          <div className="cat__head"><h3>Videography</h3><span className="cat__count">3 products</span></div>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--graphite)', marginBottom: 18 }}>
            Property Highlight Video is footage only — no agent on camera. Standard and Premium Listing Video both include agent footage and drone footage; Premium extends to a 60–90s edit.
          </p>

          <div className="svc-grid">

            <article className="svc-card" data-svc="Property Highlight Video (30–60s · no agent)" data-price="349" data-desc="Property Highlight Video · 30–60s. Footage only, no agent on camera. 16:9, music-bedded." data-img="/images/cinematic.webp">
              <div className="svc-card__media"><div className="svc-card__media__img" style={{ backgroundImage: "url('/images/cinematic.webp')" }}></div></div>
              <span className="svc-card__badge">In booking</span>
              <div className="svc-card__body">
                <h4 className="svc-card__name">Property Highlight Video</h4>
                <ul className="pkg-card__incl">
                  <li>30–60s edit · 16:9 cinematic</li>
                  <li>No agent on camera</li>
                  <li>Music-bedded, full grade</li>
                </ul>
                <div className="svc-card__foot"><span className="svc-card__price">$349</span><span className="svc-card__add">Add +</span></div>
              </div>
            </article>

            <article
              className="pkg-card"
              data-pkg="listing-video"
              data-cats="video"
              data-gallery="none"
              data-pkg-name="Listing Video"
              data-pkg-img="/images/cinematic.webp"
              data-tiers='{"standard":{"label":"Standard · 30–60s","price":499},"premium":{"label":"Premium · 60–90s","price":649}}'
            >
              <div className="pkg-card__media">
                <span className="pkg-card__tag">Listing video</span>
                <div className="pkg-card__media__img" style={{ backgroundImage: "url('/images/cinematic.webp')" }}></div>
              </div>
              <div className="pkg-card__body">
                <h4 className="pkg-card__name">Listing Video</h4>
                <ul className="pkg-card__incl">
                  <li>Cinematic 16:9 listing film</li>
                  <li>Agent footage on camera</li>
                  <li>Drone footage included</li>
                  <li>Music-bedded · full grade</li>
                  <li>Standard 30–60s · Premium 60–90s</li>
                </ul>
                <div className="pkg-card__tiers">
                  <label>Edit length</label>
                  <div className="pkg-card__pills" data-pkg-tiers>
                    <button type="button" data-tier="standard" className="is-active">Standard<small>30–60s</small></button>
                    <button type="button" data-tier="premium">Premium<small>60–90s</small></button>
                  </div>
                </div>
                <div className="pkg-card__pricerow">
                  <span className="pkg-card__from">From</span>
                  <span className="pkg-card__price" data-pkg-price>$499</span>
                  <span className="pkg-card__list" data-pkg-list hidden></span>
                </div>
                <button type="button" className="pkg-card__add" data-pkg-add>Add to booking →</button>
              </div>
            </article>

            <article className="svc-card" data-svc="Social Reel (30s · 9:16)" data-price="195" data-desc="30-second vertical reel cut for Instagram and TikTok with music and captions." data-img="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80">
              <div className="svc-card__media"><div className="svc-card__media__img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80')" }}></div></div>
              <span className="svc-card__badge">In booking</span>
              <div className="svc-card__body">
                <h4 className="svc-card__name">Social Reel</h4>
                <p className="svc-card__desc">30s portrait 9:16 cut for Instagram and TikTok.</p>
                <div className="svc-card__foot"><span className="svc-card__price">$195</span><span className="svc-card__add">Add +</span></div>
              </div>
            </article>

          </div>
        </div>
        )}

        {/* FLOORPLANS & SITE PLAN */}
        <div className="cat" id="cat-floorplans" data-gallery="floorplans" data-cats="floorplan">
          <div className="cat__head"><h3>Floor <em>plans &amp; site plan</em></h3><span className="cat__count">2D · 3D · Site plan</span></div>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--graphite)', marginBottom: 18 }}>
            Pick 2D for a clean black &amp; white plan view, or 3D for a photoreal dollhouse render. Add a standalone site plan with boundaries, orientation and lot dimensions.
          </p>

          <div className="svc-grid">

            <article
              className="pkg-card"
              data-pkg="floor-plan"
              data-cats="floorplan"
              data-pkg-name="Floor Plan"
              data-pkg-img=""
              data-tiers='{"twod":{"label":"2D · Plan view","price":129},"threed":{"label":"3D · Dollhouse","price":219}}'
            >
              <div className="pkg-card__media">
                <span className="pkg-card__tag">Floor plan</span>
                <div className="pkg-card__media__img"></div>
              </div>
              <div className="pkg-card__body">
                <h4 className="pkg-card__name">Floor Plan</h4>
                <p className="pkg-card__desc">Pick your style — 2D shaded plan or 3D photoreal dollhouse render. Includes dimensions, room labels and a north arrow.</p>
                <div className="pkg-card__tiers">
                  <label>Style</label>
                  <div className="pkg-card__pills" data-pkg-tiers>
                    <button type="button" data-tier="twod" className="is-active">2D<small>Plan view</small></button>
                    <button type="button" data-tier="threed">3D<small>Dollhouse</small></button>
                  </div>
                </div>
                <div className="pkg-card__pricerow">
                  <span className="pkg-card__from">From</span>
                  <span className="pkg-card__price" data-pkg-price>$129</span>
                  <span className="pkg-card__list" data-pkg-list hidden></span>
                </div>
                <button type="button" className="pkg-card__add" data-pkg-add>Add to booking →</button>
              </div>
            </article>

            <article className="svc-card" data-svc="Site Plan" data-price="49" data-desc="Standalone site plan — boundaries, orientation, lot dimensions." data-img="">
              <div className="svc-card__media"><div className="svc-card__media__img"></div></div>
              <span className="svc-card__badge">In booking</span>
              <div className="svc-card__body">
                <h4 className="svc-card__name">Site Plan</h4>
                <p className="svc-card__desc">Standalone site plan — boundaries, orientation, lot dimensions.</p>
                <div className="svc-card__foot"><span className="svc-card__price">$49</span><span className="svc-card__add">Add +</span></div>
              </div>
            </article>

            <article className="svc-card" data-svc="Floorplan Redraw" data-price="30" data-desc="Redraw an existing plan in Won Vision linework. Per page." data-img="">
              <div className="svc-card__media"><div className="svc-card__media__img"></div></div>
              <span className="svc-card__badge">In booking</span>
              <div className="svc-card__body">
                <h4 className="svc-card__name">Floorplan Redraw</h4>
                <p className="svc-card__desc">Redraw an existing plan in Won Vision linework. Per page.</p>
                <div className="svc-card__foot"><span className="svc-card__price">$30</span><span className="svc-card__add">Add +</span></div>
              </div>
            </article>

          </div>
        </div>

        {/* VIRTUAL EDITING — info only, paid per image in Vision Studio client portal */}
        <div className="cat" id="cat-staging" data-gallery="staging" data-cats="virtual-editing">
          <div className="cat__head"><h3>Virtual <em>editing</em></h3><span className="cat__count">Per image · client portal</span></div>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--graphite)', marginBottom: 8 }}>
            Virtual staging, decluttering and day-to-dusk are <strong>not booked here</strong>. After delivery you'll review the gallery in the <strong>Vision Studio client portal</strong> and pay per image — only for the photos you choose.
          </p>

          {/* Before/after comparison sliders — real Won Vision editing samples */}
          <div className="ba-row" style={{ marginTop: 16 }}>
            <BeforeAfterSlider
              label="Virtual staging · $20 / img"
              beforeAlt="Empty room before virtual staging"
              afterAlt="Virtually staged room"
              beforeSrc="/images/staging-before.webp"
              afterSrc="/images/staging-after.webp"
            />
            <BeforeAfterSlider
              label="Day-to-dusk · $10 / img"
              beforeAlt="Exterior at day"
              afterAlt="Exterior at dusk"
              beforeSrc="/images/dusk-before.webp"
              afterSrc="/images/dusk-after.webp"
            />
            <BeforeAfterSlider
              label="Declutter · $10 / img"
              beforeAlt="Cluttered living room"
              afterAlt="Decluttered living room"
              beforeSrc="/images/declutter-before.webp"
              afterSrc="/images/declutter-after.webp"
            />
          </div>
        </div>

      </section>

      {/* Floating cart toggle */}
      <button className="cart-fab" id="cartFab" aria-label="Open booking cart">
        <span className="cart-fab__pulse" aria-hidden="true"></span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 5h2l2.4 11.2a2 2 0 002 1.6h8.6a2 2 0 002-1.6L22 8H6" />
          <circle cx="9" cy="20" r="1.2" />
          <circle cx="18" cy="20" r="1.2" />
        </svg>
        <span className="cart-fab__count" id="cartCount">0</span>
      </button>

      {/* Cart widget */}
      <aside className="cart" id="cart" aria-hidden="true">
        <header className="cart__head">
          <h3>Your <em>booking</em></h3>
          <button className="cart__close" id="cartClose" aria-label="Close">×</button>
        </header>

        <div className="cart__scroll" id="cartScroll">
          <div className="cart__empty" id="cartEmpty">
            <h4>No services yet.</h4>
            <p>Tap any card to add it. Cart fills as you go.</p>
          </div>
          <div className="cart__list" id="cartList" hidden></div>
        </div>

        <div className="cart__total" id="cartTotal" hidden>
          <span className="cart__total__label">Subtotal · GST inc.</span>
          <span className="cart__total__amt" id="cartAmt">$0</span>
        </div>

        <div className="cart__foot">
          <button type="button" className="cart__submit" id="cartNext" disabled>Next →</button>
        </div>
      </aside>

      <footer className="foot">
        <div className="foot__inner">
          <div className="foot__top">
            <div>
              <Link href="/#top" data-home aria-label="Won Vision — home"><Wordmark /></Link>
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
                <li><a href="tel:+61493714609">0493 714 609</a></li>
                <li><a href="https://www.instagram.com/won.vision/" target="_blank" rel="noopener">Instagram</a></li>
              </ul>
            </div>
            <div>
              <h4>Operations</h4>
              <ul>
                <li>Won Vision Pty Ltd</li>
                <li><a href="/terms">Terms</a></li>
                <li><a href="/privacy">Privacy</a></li>
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

      {/* Booking cart logic */}
      <Script id="wv-book-cart" strategy="afterInteractive">{`
(function(){
  const cards   = document.querySelectorAll('.svc-card');
  const fab     = document.getElementById('cartFab');
  const count   = document.getElementById('cartCount');
  const cart    = document.getElementById('cart');
  const close   = document.getElementById('cartClose');
  const list    = document.getElementById('cartList');
  const empty   = document.getElementById('cartEmpty');
  const total   = document.getElementById('cartTotal');
  const amt     = document.getElementById('cartAmt');
  const next    = document.getElementById('cartNext');
  if(!cards.length || !fab) return;

  const items = new Map();

  // Resolve the categories array for a card element. Cards may declare an
  // explicit \`data-cats\` (used by packages spanning multiple categories);
  // otherwise the closest .cat[data-cats] ancestor wins. This is what powers
  // category-scoped promo codes server-side.
  function readCats(el){
    if (!el) return [];
    const own = el.getAttribute && el.getAttribute('data-cats');
    const fromCat = !own && el.closest ? (el.closest('.cat')?.getAttribute('data-cats') || '') : '';
    const raw = own || fromCat || '';
    return raw.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  }

  try {
    const saved = JSON.parse(sessionStorage.getItem('wv-cart') || '[]');
    saved.forEach(it => {
      items.set(it.name, {
        price: String(it.price),
        img: it.img,
        categories: Array.isArray(it.categories) ? it.categories : [],
      });
      const card = Array.from(cards).find(c => c.dataset.svc === it.name);
      if (card) card.classList.add('is-added');
    });
  } catch (_) {}

  function persist(){
    try {
      const payload = Array.from(items.entries()).map(([name, data]) => ({
        name,
        price: Number(data.price) || 0,
        img: data.img,
        categories: Array.isArray(data.categories) ? data.categories : [],
      }));
      sessionStorage.setItem('wv-cart', JSON.stringify(payload));
    } catch (_) {}
  }

  function fmt(n){ return '$' + Number(n).toLocaleString('en-AU'); }

  function render(){
    const n = items.size;
    count.textContent = String(n);
    fab.classList.toggle('has-items', n > 0);
    if(next) next.disabled = (n === 0);
    empty.style.display = n === 0 ? '' : 'none';
    list.hidden = n === 0;
    total.hidden = n === 0;

    let subtotal = 0;
    list.innerHTML = '';
    items.forEach((data, name) => {
      subtotal += Number(data.price) || 0;
      const row = document.createElement('div');
      row.className = 'cart__item';
      const priceLabel = (Number(data.price) === 0) ? 'POA' : fmt(data.price);
      row.innerHTML = \`
        <div class="cart__item__thumb" style="background-image:url('\${data.img}')"></div>
        <div class="cart__item__info">
          <div class="cart__item__name">\${name}</div>
          <div class="cart__item__price">\${priceLabel}</div>
        </div>
        <button type="button" class="cart__item__remove" aria-label="Remove">×</button>
      \`;
      row.querySelector('.cart__item__remove').addEventListener('click', () => {
        toggleCard(name, false);
      });
      list.appendChild(row);
    });
    amt.textContent = subtotal === 0 ? '$0' : fmt(subtotal);
    persist();
  }

  function findCard(name){
    return Array.from(cards).find(c => c.dataset.svc === name);
  }

  function toggleCard(name, force){
    const card = findCard(name);
    const isAdded = items.has(name);
    const nextState = (typeof force === 'boolean') ? force : !isAdded;
    if(nextState && card){
      items.set(name, {
        price: card.dataset.price,
        img: card.dataset.img,
        categories: readCats(card),
      });
      card.classList.add('is-added');
      openCart();
    } else {
      items.delete(name);
      if(card) card.classList.remove('is-added');
    }
    render();
  }

  cards.forEach(card => {
    card.addEventListener('click', () => toggleCard(card.dataset.svc));
  });

  function openCart(){ cart.classList.add('is-open'); cart.setAttribute('aria-hidden','false'); fab.classList.add('is-open'); }
  function closeCart(){ cart.classList.remove('is-open'); cart.setAttribute('aria-hidden','true'); fab.classList.remove('is-open'); }

  fab.addEventListener('click', () => {
    cart.classList.contains('is-open') ? closeCart() : openCart();
  });
  close.addEventListener('click', closeCart);
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && cart.classList.contains('is-open')) closeCart();
  });

  if(next){
    next.addEventListener('click', () => {
      if(items.size === 0) return;
      persist();
      window.location.href = '/book/checkout';
    });
  }

  // Package picker — Showcase / Signature / Cinematic
  (function(){
    const fmtAud = (n) => '$' + Number(n).toLocaleString('en-AU');
    const cards = document.querySelectorAll('.pkg-card');
    const state = new Map(); // pkgKey -> tierKey

    cards.forEach(card => {
      const pkgKey = card.dataset.pkg;
      const pkgName = card.dataset.pkgName;
      const pkgImg = card.dataset.pkgImg;
      let tiers;
      try { tiers = JSON.parse(card.dataset.tiers || '{}'); } catch (_) { tiers = {}; }
      const initialPill = card.querySelector('[data-pkg-tiers] button.is-active');
      const initialTier = initialPill ? initialPill.dataset.tier : Object.keys(tiers)[0];
      state.set(pkgKey, initialTier || 'compact');

      const priceEl = card.querySelector('[data-pkg-price]');
      const listEl  = card.querySelector('[data-pkg-list]');
      const addBtn  = card.querySelector('[data-pkg-add]');
      const pillBtns = card.querySelectorAll('[data-pkg-tiers] button');

      function currentName(){
        const t = state.get(pkgKey);
        return pkgName + ' — ' + tiers[t].label;
      }

      function refresh(){
        const t = state.get(pkgKey);
        const tier = tiers[t];
        if(priceEl) priceEl.textContent = fmtAud(tier.price);
        if(listEl){ listEl.textContent = ''; listEl.hidden = true; }

        // Reflect cart state: highlight card if any tier of this package is in cart
        const inCart = Array.from(items.keys()).some(k => k.startsWith(pkgName + ' — '));
        card.classList.toggle('is-added', inCart);
      }

      pillBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          pillBtns.forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          state.set(pkgKey, btn.dataset.tier);
          refresh();
        });
      });

      if(addBtn){
        addBtn.addEventListener('click', () => {
          // Remove any other tier of this package, then add the chosen tier
          Array.from(items.keys()).forEach(k => {
            if(k.startsWith(pkgName + ' — ')) items.delete(k);
          });
          const t = state.get(pkgKey);
          const tier = tiers[t];
          items.set(currentName(), {
            price: String(tier.price),
            img: pkgImg,
            categories: readCats(card),
          });
          render();
          openCart();
          refresh();
        });
      }

      refresh();
    });

    // Deep-link: /book?package=showcase|signature|cinematic
    try {
      const params = new URLSearchParams(window.location.search);
      const wanted = (params.get('package') || '').toLowerCase();
      if(wanted){
        const target = document.querySelector('.pkg-card[data-pkg="' + wanted + '"]');
        if(target){
          target.classList.add('is-target');
          setTimeout(() => target.scrollIntoView({ behavior:'smooth', block:'start' }), 200);
          setTimeout(() => target.classList.remove('is-target'), 3000);
        }
      }
    } catch (_) {}
  })();

  render();
})();
`}</Script>

      {/* Section-jump strip: scrollspy + click-jump + stay-on-nav-hide */}
      <Script id="wv-book-jump" strategy="afterInteractive">{`
(function(){
  var strip = document.getElementById('svcJump');
  if(!strip) return;
  var chips = Array.prototype.slice.call(strip.querySelectorAll('.svc-jump__chip'));
  if(!chips.length) return;

  function chipFor(id){
    for(var i=0;i<chips.length;i++){
      if(chips[i].getAttribute('href') === '#'+id) return chips[i];
    }
    return null;
  }
  function setActive(chip){
    if(!chip || chip.getAttribute('aria-current')==='true') return;
    chips.forEach(function(c){ c.removeAttribute('aria-current'); });
    chip.setAttribute('aria-current','true');
    chip.scrollIntoView({ inline:'center', block:'nearest', behavior:'smooth' });
  }

  // Click -> smooth jump (scroll-margin-top handles the offset)
  chips.forEach(function(chip){
    chip.addEventListener('click', function(e){
      var id = chip.getAttribute('href').slice(1);
      var sec = document.getElementById(id);
      if(!sec) return;
      e.preventDefault();
      setActive(chip);
      sec.scrollIntoView({ behavior:'smooth', block:'start' });
      if(history.replaceState) history.replaceState(null,'','#'+id);
    });
  });

  // Initial deep-link from home page: /book#cat-xxx. The browser-native
  // jump fires before images/layout finish, often landing short of the
  // section. Re-scroll once on load (and again after window.load) so the
  // section header sits at the top of the viewport under the sticky nav
  // (scroll-margin-top handles the offset). Also handle in-page hashchange.
  function smoothScrollToHash(hash){
    if(!hash || hash.length < 2) return;
    var id = hash.slice(1);
    var sec = document.getElementById(id);
    if(!sec) return;
    sec.scrollIntoView({ behavior:'smooth', block:'start' });
    var chip = chipFor(id);
    if(chip) setActive(chip);
  }
  if(window.location.hash){
    // Two passes: one immediately (after interactive), one after window.load
    // when images and any late layout shifts have settled.
    requestAnimationFrame(function(){ smoothScrollToHash(window.location.hash); });
    window.addEventListener('load', function(){
      setTimeout(function(){ smoothScrollToHash(window.location.hash); }, 60);
    });
  }
  window.addEventListener('hashchange', function(){
    smoothScrollToHash(window.location.hash);
  });

  // Scrollspy: highlight the section currently in view
  var cats = Array.prototype.slice.call(document.querySelectorAll('.cat[id]'));
  if('IntersectionObserver' in window && cats.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting) setActive(chipFor(en.target.id));
      });
    }, { rootMargin:'-140px 0px -55% 0px', threshold:0 });
    cats.forEach(function(c){ io.observe(c); });
  }

  // DEBOUNCED + PINNED-GATED nav coupling.
  //  - DEBOUNCE: the site nav flaps is-hidden on tiny scroll deltas; only
  //    lift after it has stayed hidden continuously for HIDE_MS, drop the
  //    instant it returns. Sub-HIDE_MS flaps cancel the pending lift → no
  //    bounce.
  //  - PINNED GATE: the lift is a transform that pulls the strip UP. If
  //    applied while the strip is still in normal flow (not yet stuck), it
  //    rides up over the preceding intro heading and covers it. So only
  //    ever lift when the strip is actually pinned at the top — detected
  //    via a 1px sentinel placed immediately before it. When not pinned,
  //    force-drop the lift (no transform → cannot overlap the heading).
  var nav = document.querySelector('.nav');
  var sentinel = document.getElementById('svcJumpSentinel');
  if(nav){
    var HIDE_MS = 220, pend = null, pinned = false;
    var apply = function(){
      var shouldLift = pinned && nav.classList.contains('is-hidden');
      if(shouldLift){
        if(strip.classList.contains('is-navhidden')) return;     // already lifted
        if(pend) return;                                         // already waiting
        pend = setTimeout(function(){
          pend = null;
          if(pinned && nav.classList.contains('is-hidden')) strip.classList.add('is-navhidden');
        }, HIDE_MS);
      } else {
        if(pend){ clearTimeout(pend); pend = null; }              // cancel pending lift
        strip.classList.remove('is-navhidden');                  // drop immediately
      }
    };
    if(sentinel && 'IntersectionObserver' in window){
      new IntersectionObserver(function(entries){
        // pinned once the sentinel (just above the strip) has scrolled to
        // or above the viewport top.
        pinned = entries[0].boundingClientRect.top <= 0;
        apply();
      }, { threshold:[0,1] }).observe(sentinel);
    }
    apply();
    new MutationObserver(apply).observe(nav, { attributes:true, attributeFilter:['class'] });
  }
})();
`}</Script>
      <ServiceGalleryLightbox />
    </>
  );
}
