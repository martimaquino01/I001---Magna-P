import Logo, { Wordmark } from './Logo.jsx';

const COLS = [
  {
    title: 'Site',
    links: [
      { l: 'O que fazemos', h: '#fazemos' },
      { l: 'O método', h: '#metodo' },
      { l: 'Onde trabalhamos', h: '#onde' },
      { l: 'Contacto', h: '#contacto' },
    ],
  },
  {
    title: 'Directo',
    links: [
      { l: 'WhatsApp', h: 'https://wa.me/351935904830', ext: true },
      { l: 'Instagram', h: 'https://www.instagram.com/themagnaproperties', ext: true },
      { l: 'Livro de reclamações', h: 'https://www.livroreclamacoes.pt/inicio', ext: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="foot">
      <div className="shell">
        <div className="foot__grid">
          <div className="foot__brand">
            <a className="brand" href="#topo" aria-label="Magna Properties — início">
              <Logo size={30} />
              <Wordmark className="brand__word--lg" />
            </a>
            <p className="foot__claim">
              Investimento imobiliário no Algarve, decidido com dados reais de transação.
            </p>
          </div>

          {COLS.map((c) => (
            <nav className="foot__col" key={c.title} aria-label={c.title}>
              <span>{c.title}</span>
              {c.links.map((l) => (
                <a key={l.l} href={l.h} {...(l.ext ? { target: '_blank', rel: 'noopener' } : {})}>
                  {l.l}
                </a>
              ))}
            </nav>
          ))}
        </div>

        <div className="foot__bar">
          <p>© {new Date().getFullYear()} Magna Properties, Lda. · AMI 27435 · Algarve</p>
          <p className="foot__fine">Imagens meramente ilustrativas.</p>
          <a className="foot__up" href="#topo">Topo ↑</a>
        </div>
      </div>
      <div className="foot__sky" aria-hidden="true" />
    </footer>
  );
}
