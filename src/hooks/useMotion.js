import { useCallback, useEffect, useRef, useState } from 'react';

/** `true` quando o utilizador pediu menos movimento no sistema. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

/**
 * Devolve [ref, inView]. Por omissão dispara uma vez e desliga-se.
 * Nota: nunca aplicar `clip-path` ao próprio elemento observado — no Chromium
 * um alvo recortado devolve isIntersecting:false e a revelação nunca acontece.
 */
export function useInView({ threshold = 0.15, rootMargin = '0px 0px -6% 0px', once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setInView(true); return; }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) io.unobserve(el);
      } else if (!once) {
        setInView(false);
      }
    }, { threshold, rootMargin });

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}

/** Corre `handler` em cada scroll/resize, sempre dentro de um rAF. */
export function useRafScroll(handler, enabled = true) {
  const cb = useCallback(handler, [handler]);
  useEffect(() => {
    if (!enabled) return;
    let ticking = false;
    const run = () => { ticking = false; cb(); };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [cb, enabled]);
}
