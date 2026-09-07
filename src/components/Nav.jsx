import { useEffect, useRef, useState, useCallback } from 'react';
import Logo, { Wordmark } from './Logo.jsx';
import { useRafScroll } from '../hooks/useMotion.js';

const LINKS = [
  { href: '#fazemos', label: 'O que fazemos' },
  { href: '#metodo', label: 'O método' },
  { href: '#onde', label: 'Onde trabalhamos' },
  { href: '#contacto', label: 'Contacto' },
];

const META = [
  { k: 'Directo', v: '+351 935 904 830', href: 'https://wa.me/351935904830' },
  { k: 'Social', v: 'Instagram', href: 'https://www.instagram.com/themagnaproperties' },
  { k: 'Licença', v: 'AMI 27435' },
];

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const drawerRef = useRef(null);
  const burgerRef = useRef(null);

  // encolher / esconder ao descer, mostrar ao subir
  const onScroll = useCallback(() => {
    const y = window.scrollY || 0;
    setStuck(y > 24);
    setHidden(!open && y > 360 && y > lastY.current + 4);
    lastY.current = y;
  }, [open]);
  useRafScroll(onScroll);

  const close = useCallback(() => {
    setOpen(false);
    burgerRef.current?.focus();
  }, []);

  // travar o scroll do corpo, levar o foco para dentro e fechar com Escape
  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    if (open) drawerRef.current?.querySelector('a')?.focus();

    const onKey = (e) => { if (e.key === 'Escape' && open) close(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('is-locked');
    };
  }, [open, close]);

  return (
    <>
      <header className={['nav', stuck && 'stuck', hidden && 'hidden', open && 'open'].filter(Boolean).join(' ')}>
        <button
          ref={burgerRef}
          className={['burger', open && 'on'].filter(Boolean).join(' ')}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="menu-lateral"
          onClick={() => setOpen((v) => !v)}
        >
          <i /><i />
        </button>

        <a className="brand" href="#topo" aria-label="Magna Properties — início">
          <Logo size={24} />
          <Wordmark />
        </a>

        <a className="nav__aside" href="#contacto">Contacto</a>
      </header>

      <div
        className={['scrim', open && 'on'].filter(Boolean).join(' ')}
        onClick={close}
        aria-hidden="true"
      />

      <aside
        id="menu-lateral"
        ref={drawerRef}
        className={['drawer', open && 'open'].filter(Boolean).join(' ')}
        inert={!open}
      >
        <nav className="drawer__nav" aria-label="Menu">
          {LINKS.map((l, i) => (
            <a key={l.href} href={l.href} style={{ '--d': `${140 + i * 70}ms` }} onClick={() => setOpen(false)}>
              <span>{l.label}</span>
              <span className="drawer__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            </a>
          ))}
        </nav>

        <div className="drawer__foot">
          <ul className="drawer__meta">
            {META.map((m) => (
              <li key={m.k}>
                <span>{m.k}</span>
                {m.href
                  ? <a href={m.href} target="_blank" rel="noopener">{m.v}</a>
                  : <span className="drawer__v">{m.v}</span>}
              </li>
            ))}
          </ul>

          <a className="btn btn--solid btn--full" href="#contacto" onClick={() => setOpen(false)}>
            <span>Falar connosco</span><span className="arw">→</span>
          </a>
        </div>
      </aside>
    </>
  );
}
