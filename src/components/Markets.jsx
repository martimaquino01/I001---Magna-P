import { Reveal, Split, Stat } from './Motion.jsx';
import { Figure } from './Media.jsx';

// Imagens ilustrativas de arquitectura e litoral — não são fotografias
// documentais de cada concelho. Substituir por fotografia local quando houver.
const MARKETS = [
  {
    name: 'Loulé',
    img: 'img/p-costa.jpg',
    alt: 'Vista aérea de uma povoação costeira sobre falésia',
    stat: { value: 17, suffix: '%' },
    d: 'Concentra 17% das transações do Algarve, acima de 2.000 negócios por ano.',
  },
  {
    name: 'Faro',
    img: 'img/p-patio.jpg',
    alt: 'Pátio caiado com piscina e vegetação mediterrânica',
    stat: { value: 73, suffix: '%' },
    d: '73% do parque habitacional em residência permanente, com procura estável todo o ano.',
  },
  {
    name: 'Olhão',
    img: 'img/p-villa.jpg',
    alt: 'Moradia contemporânea branca com palmeiras e piscina',
    stat: { value: 97.5, decimals: 1, prefix: '+', suffix: '%' },
    d: 'Valorização de 97,5% em seis anos — a mais elevada da região.',
  },
];

export default function Markets() {
  return (
    <section className="markets" id="onde">
      <div className="shell">
        <div className="sechead">
          <Reveal as="p" className="eyebrow">Onde trabalhamos</Reveal>
          <Split as="h2" className="h2">Mercados onde *operamos.*</Split>
        </div>

        <div className="mgrid mgrid--3">
          {MARKETS.map((m, i) => (
            <article className="mcard" key={m.name}>
              <Figure src={m.img} alt={m.alt} ratio="3 / 4" delay={i * 110} />
              <div className="mcard__scrim" />
              <div className="mcard__body">
                <p className="mcard__k">{m.name}</p>
                <p className="mcard__stat"><Stat {...m.stat} /></p>
                <p className="mcard__d">{m.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
