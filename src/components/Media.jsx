import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from '../hooks/useMotion.js';

const BASE = import.meta.env.BASE_URL;

/** Imagem que entra com um wipe e amplia devagar em hover. */
export function Figure({ src, alt, ratio = '4 / 3', delay = 0, className = '', children }) {
  const [ref, inView] = useInView({ threshold: 0.12 });
  return (
    <figure
      ref={ref}
      className={['fig', inView && 'in', className].filter(Boolean).join(' ')}
      style={{ '--ratio': ratio, '--d': `${delay}ms` }}
    >
      <img src={`${BASE}${src}`} alt={alt} loading="lazy" decoding="async" />
      {children}
    </figure>
  );
}

/**
 * Loop de vídeo que só descarrega e corre quando está no ecrã.
 * Poupa dados no telemóvel e evita ter três vídeos a decodificar ao mesmo tempo.
 */
export function LoopVideo({ src, poster, ratio = '16 / 9', className = '', children }) {
  const [wrapRef, inView] = useInView({ once: false, threshold: 0.25 });
  const videoRef = useRef(null);
  const reduced = useReducedMotion();

  // A reprodução liga e desliga com o scroll, mas a cortina de revelação
  // só abre uma vez — senão voltava a fechar sempre que o vídeo saía do ecrã.
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { if (inView) setRevealed(true); }, [inView]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView && !reduced) {
      if (!v.getAttribute('src')) {
        v.setAttribute('src', `${BASE}${src}`);
        v.load();
      }
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    } else {
      v.pause();
    }
  }, [inView, src, reduced]);

  return (
    <div
      ref={wrapRef}
      className={['loop', revealed && 'in', className].filter(Boolean).join(' ')}
      style={{ '--ratio': ratio }}
    >
      <video
        ref={videoRef}
        muted loop playsInline preload="none"
        poster={poster ? `${BASE}${poster}` : undefined}
      />
      {children}
    </div>
  );
}
