import { Reveal, Split } from './Motion.jsx';
import { Figure } from './Media.jsx';

const CARDS = [
  {
    key: 'proprietario',
    title: 'Para proprietários',
    img: 'img/p-terraco.jpg',
    alt: 'Terraço e piscina de uma moradia com zona de estar coberta',
    body: 'Avaliamos o imóvel com dados de transação da zona e uma visita ao local. Quando os números o justificam, apresentamos proposta de compra directa.',
    cta: 'Receber uma avaliação',
    list: [
      'Avaliação com dados de transação',
      'Visita e verificação no local',
      'Proposta directa ou colocação em rede',
    ],
  },
  {
    key: 'investidor',
    title: 'Para investidores',
    img: 'img/p-torre.jpg',
    alt: 'Fachada de um edifício residencial contemporâneo com piscina',
    body: 'Cada oportunidade passa por análise de viabilidade antes de ser apresentada. Trabalhamos por critério definido, não por listagem.',
    cta: 'Definir critérios',
    list: [
      'Análise de viabilidade prévia',
      'Oportunidades fora do mercado aberto',
      'Acompanhamento até à escritura',
    ],
  },
];

export default function Offer({ onPick }) {
  return (
    <section className="offer" id="fazemos">
      <div className="shell">
        <div className="sechead">
          <Reveal as="p" className="eyebrow">O que fazemos</Reveal>
          <Split as="h2" className="h2">Dois pontos de partida, o mesmo *critério.*</Split>
        </div>

        <div className="mgrid">
          {CARDS.map((c, i) => (
            <div key={c.key}>
              <a className="mcard" href="#contacto" onClick={() => onPick(c.key)}>
                <Figure src={c.img} alt={c.alt} ratio="4 / 5" delay={i * 110} />
                <div className="mcard__scrim" />
                <div className="mcard__body">
                  <h3 className="mcard__t">{c.title}</h3>
                  <p className="mcard__d">{c.body}</p>
                  <span className="mcard__go">{c.cta} <span aria-hidden="true">→</span></span>
                </div>
              </a>
              <ul className="mcard__list">
                {c.list.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
