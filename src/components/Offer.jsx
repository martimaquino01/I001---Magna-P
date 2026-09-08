import { Reveal, Split } from './Motion.jsx';
import { Figure } from './Media.jsx';
import { useLang } from '../i18n.jsx';

// Dados não-textuais; o texto vem de t.offer.cards (mesma ordem).
const CARDS = [
  { key: 'proprietario', img: 'img/p-terraco.jpg' },
  { key: 'investidor', img: 'img/p-torre.jpg' },
];

export default function Offer({ onPick }) {
  const { t } = useLang();
  return (
    <section className="offer" id="fazemos">
      <div className="shell">
        <div className="sechead">
          <Reveal as="p" className="eyebrow">{t.offer.eyebrow}</Reveal>
          <Split as="h2" className="h2">{t.offer.h}</Split>
        </div>

        <div className="mgrid">
          {CARDS.map((c, i) => {
            const tc = t.offer.cards[i];
            return (
              <div key={c.key}>
                <a className="mcard" href="#contacto" onClick={() => onPick(c.key)}>
                  <Figure src={c.img} alt={tc.alt} ratio="4 / 5" delay={i * 110} />
                  <div className="mcard__scrim" />
                  <div className="mcard__body">
                    <h3 className="mcard__t">{tc.title}</h3>
                    <p className="mcard__d">{tc.body}</p>
                    <span className="mcard__go">{tc.cta} <span aria-hidden="true">→</span></span>
                  </div>
                </a>
                <ul className="mcard__list">
                  {tc.list.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
