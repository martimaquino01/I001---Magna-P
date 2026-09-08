import Logo from './Logo.jsx';
import { useLang } from '../i18n.jsx';

export default function Footer() {
  const { t } = useLang();
  const ft = t.footer;
  return (
    <footer className="foot">
      <div className="shell">
        <div className="foot__grid">
          <div className="foot__brand">
            <a className="brand" href="#topo" aria-label={t.nav.brand}>
              <Logo />
            </a>
            <p className="foot__claim">{ft.claim}</p>
          </div>

          {ft.cols.map((col) => (
            <nav className="foot__col" key={col.title} aria-label={col.title}>
              <span>{col.title}</span>
              {col.links.map((l) => (
                <a key={l.l} href={l.h} {...(l.ext ? { target: '_blank', rel: 'noopener' } : {})}>
                  {l.l}
                </a>
              ))}
            </nav>
          ))}
        </div>

        <div className="foot__bar">
          <p>© {new Date().getFullYear()} {ft.rights}</p>
          <p className="foot__fine">{ft.fine}</p>
          <a className="foot__up" href="#topo">{ft.up}</a>
        </div>
      </div>
    </footer>
  );
}
