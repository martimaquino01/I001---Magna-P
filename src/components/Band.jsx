import { useCallback, useRef } from 'react';
import { Reveal, Split } from './Motion.jsx';
import { useRafScroll, useReducedMotion } from '../hooks/useMotion.js';

export default function Band() {
  const sectionRef = useRef(null);
  const skyRef = useRef(null);
  const reduced = useReducedMotion();

  const onScroll = useCallback(() => {
    const sec = sectionRef.current, sky = skyRef.current;
    if (!sec || !sky) return;
    const r = sec.getBoundingClientRect();
    const vh = window.innerHeight;
    if (r.bottom < 0 || r.top > vh) return;
    const p = (vh - r.top) / (vh + r.height);           // 0 → 1 ao atravessar
    sky.style.transform = `translate3d(0, ${((p - 0.5) * -12).toFixed(2)}%, 0)`;
  }, []);
  useRafScroll(onScroll, !reduced);

  return (
    <section className="band" ref={sectionRef} aria-label="Declaração">
      <div className="band__sky" ref={skyRef} aria-hidden="true" />
      <div className="shell band__inner">
        <Split as="p" className="band__q">
          O mercado é o mesmo para todos. A diferença está na leitura dos números.
        </Split>
        <Reveal as="p" className="band__sig" delay={200}>Magna Properties · Algarve</Reveal>
      </div>
    </section>
  );
}
