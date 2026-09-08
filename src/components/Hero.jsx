import { useCallback, useEffect, useRef, useState } from 'react';
import { useRafScroll, useReducedMotion } from '../hooks/useMotion.js';
import { useLang } from '../i18n.jsx';

const BASE = import.meta.env.BASE_URL;

export default function Hero({ onPick }) {
  const { t } = useLang();
  const [ready, setReady] = useState(false);
  const videoRef = useRef(null);
  const reduced = useReducedMotion();

  // entrada
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, []);

  // fonte pelo tamanho do ecrã; respeita o modo de poupança de dados
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const saveData = navigator.connection && navigator.connection.saveData;
    const big = window.innerWidth >= 900 && !saveData;
    v.src = `${BASE}video/hero-${big ? '1080' : '720'}.mp4`;
    v.load();
    const play = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    v.addEventListener('loadeddata', play, { once: true });
    play();
  }, []);

  // parallax discreto
  const onScroll = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const y = window.scrollY || 0;
    const vh = window.innerHeight;
    if (y > vh * 1.1) return;
    const p = Math.min(y / vh, 1);
    v.style.transform = `scale(${(1.06 - p * 0.03).toFixed(4)}) translate3d(0, ${(p * 6).toFixed(2)}%, 0)`;
  }, []);
  useRafScroll(onScroll, !reduced);

  return (
    <section className={['hero', ready && 'ready'].filter(Boolean).join(' ')} id="topo">
      <div className="hero__media">
        <video
          ref={videoRef}
          className="hero__video"
          muted loop playsInline preload="none"
          poster={`${BASE}img/hero-poster.jpg`}
        />
        <div className="hero__scrim" />
      </div>

      <div className="hero__inner shell">
        <p className="hero__eyebrow">{t.hero.eyebrow}</p>

        <h1 className="hero__title">
          <span className="ln"><span>{t.hero.titleLines[0]}</span></span>
          <span className="ln"><span>{t.hero.titleLines[1]}</span></span>
          <span className="ln"><span><em>{t.hero.titleLines[2]}</em></span></span>
        </h1>

        <div className="hero__cta">
          <a className="btn btn--solid" href="#contacto" onClick={() => onPick('proprietario')}>
            <span>{t.hero.ctaOwner}</span><span className="arw">→</span>
          </a>
          <a className="btn btn--line" href="#contacto" onClick={() => onPick('investidor')}>
            <span>{t.hero.ctaInvestor}</span><span className="arw">→</span>
          </a>
        </div>
      </div>

      <a className="hero__cue" href="#fazemos" aria-label={t.hero.cue}>
        <span aria-hidden="true" />
      </a>
    </section>
  );
}
