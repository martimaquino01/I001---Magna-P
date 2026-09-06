import { useEffect, useMemo, useState } from 'react';
import { useInView, useReducedMotion } from '../hooks/useMotion.js';

/** Bloco que aparece com um pequeno deslize quando entra no ecrã. */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={['reveal', inView && 'in', className].filter(Boolean).join(' ')}
      style={delay ? { '--d': `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Título que sobe palavra a palavra. Envolver um troço em asteriscos
 * pinta-o com a cor de acento: `Dados de *transação.*`
 */
export function Split({ as: Tag = 'h2', className = '', step = 32, children }) {
  const [ref, inView] = useInView();
  const tokens = useMemo(() => parse(String(children)), [children]);

  return (
    <Tag ref={ref} className={['split', inView && 'in', className].filter(Boolean).join(' ')}>
      {tokens.map((tok, i) =>
        tok.space ? ' ' : (
          <span className="w" key={i}>
            <span className="w-i" style={{ '--wd': `${i * step}ms` }}>
              {tok.accent ? <em className="accent">{tok.text}</em> : tok.text}
            </span>
          </span>
        )
      )}
    </Tag>
  );
}

function parse(text) {
  const out = [];
  let accent = false;
  for (const tok of text.split(/(\s+)/)) {
    if (!tok) continue;
    if (/^\s+$/.test(tok)) { out.push({ space: true }); continue; }
    let t = tok;
    if (t.startsWith('*')) { accent = true; t = t.slice(1); }
    let closes = false;
    if (t.endsWith('*')) { closes = true; t = t.slice(0, -1); }
    out.push({ text: t, accent });
    if (closes) accent = false;
  }
  return out;
}

/** Número que conta até ao valor quando fica visível. Formata em pt-PT. */
export function Stat({ value, decimals = 0, prefix = '', suffix = '', duration = 1400 }) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView({ threshold: 0.5 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) { setN(value); return; }

    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      setN(value * (1 - Math.pow(1 - p, 4)));       // easeOutQuart
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduced]);

  const shown = decimals ? n.toFixed(decimals).replace('.', ',') : String(Math.round(n));
  return <span ref={ref}>{prefix}{shown}{suffix}</span>;
}
