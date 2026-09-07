import { useCallback, useEffect, useRef, useState } from 'react';
import { useRafScroll, useReducedMotion } from '../hooks/useMotion.js';

const BASE = import.meta.env.BASE_URL;

export default function Hero({ onPick }) {
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
        <p className="hero__eyebrow">Investimento imobiliário · Algarve</p>

        <h1 className="hero__title">
          <span className="ln"><span>Possui um imóvel</span></span>
          <span className="ln"><span>ou quer investir?</span></span>
          <span className="ln"><span><em>Fale connosco.</em></span></span>
        </h1>

        <div className="hero__cta">
          <a className="btn btn--solid" href="#contacto" onClick={() => onPick('proprietario')}>
            <span>Tenho um imóvel</span><span className="arw">→</span>
          </a>
          <a className="btn btn--line" href="#contacto" onClick={() => onPick('investidor')}>
            <span>Quero investir</span><span className="arw">→</span>
          </a>
        </div>
      </div>

      <a className="hero__cue" href="#fazemos" aria-label="Ver mais">
        <span aria-hidden="true" />
      </a>
      <div className="hero__line" aria-hidden="true" />
    </section>
  );
}
