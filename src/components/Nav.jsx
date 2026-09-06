import { useEffect, useRef, useState, useCallback } from 'react';
import Logo, { Wordmark } from './Logo.jsx';
import { useRafScroll } from '../hooks/useMotion.js';

const LINKS = [
  { href: '#fazemos', label: 'O que fazemos' },
  { href: '#metodo', label: 'O método' },
  { href: '#onde', label: 'Onde trabalhamos' },
];

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const lastY = useRef(0);

  // encolher / esconder ao descer, mostrar ao subir
  const onScroll = useCallback(() => {
    const y = window.scrollY || 0;
    setStuck(y > 24);
    setHidden(!open && y > 360 && y > lastY.current + 4);
    lastY.current = y;
  }, [open]);
  useRafScroll(onScroll);

  // secção activa
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const els = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive('#' + e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // fechar com Escape e travar o scroll do corpo
  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('is-locked');
    };
  }, [open]);

  return (
    <>
      <header className={['nav', stuck && 'stuck', hidden && 'hidden', open && 'open'].filter(Boolean).join(' ')}>
        <a className="brand" href="#topo" aria-label="Magna Properties — início">
          <Logo size={26} />
          <Wordmark />
        </a>

        <nav className="nav__links" aria-label="Principal">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className={active === l.href ? 'active' : undefined}>
              {l.label}
            </a>
          ))}
        </nav>

        <a className="btn btn--ghost nav__cta" href="#contacto">Contacto</a>

        <button
          className={['burger', open && 'on'].filter(Boolean).join(' ')}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <i /><i />
        </button>
      </header>

      <div className={['menu', open && 'open'].filter(Boolean).join(' ')} inert={!open}>
        <nav className="menu__nav" aria-label="Menu">
          {[...LINKS, { href: '#contacto', label: 'Contacto' }].map((l, i) => (
            <a key={l.href} href={l.href} style={{ '--d': `${120 + i * 70}ms` }} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="menu__meta">
          <div><span>Directo</span><a href="https://wa.me/351935904830">+351 935 904 830</a></div>
          <div><span>Social</span><a href="https://www.instagram.com/themagnaproperties" target="_blank" rel="noopener">Instagram</a></div>
          <div><span>Licença</span><span>AMI 27435</span></div>
        </div>
      </div>
    </>
  );
}
