import { Reveal, Split, Stat } from './Motion.jsx';
import { Figure } from './Media.jsx';
import { useLang } from '../i18n.jsx';

// Nome, imagem e valores são independentes do idioma; o texto (alt, d)
// vem de t.markets.items pela mesma ordem.
const MARKETS = [
  { name: 'Loulé', img: 'img/p-costa.jpg', stat: { value: 17, suffix: '%' } },
  { name: 'Faro', img: 'img/p-patio.jpg', stat: { value: 73, suffix: '%' } },
  { name: 'Olhão', img: 'img/p-villa.jpg', stat: { value: 97.5, decimals: 1, prefix: '+', suffix: '%' } },
];

export default function Markets() {
  const { t } = useLang();
  return (
    <section className="markets" id="onde">
      <div className="shell">
        <div className="sechead">
          <Reveal as="p" className="eyebrow">{t.markets.eyebrow}</Reveal>
          <Split as="h2" className="h2">{t.markets.h}</Split>
        </div>

        <div className="mgrid mgrid--3">
          {MARKETS.map((m, i) => {
            const tm = t.markets.items[i];
            return (
              <article className="mcard" key={m.name}>
                <Figure src={m.img} alt={tm.alt} ratio="3 / 4" delay={i * 110} />
                <div className="mcard__scrim" />
                <div className="mcard__body">
                  <p className="mcard__k">{m.name}</p>
                  <p className="mcard__stat"><Stat {...m.stat} /></p>
                  <p className="mcard__d">{tm.d}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
