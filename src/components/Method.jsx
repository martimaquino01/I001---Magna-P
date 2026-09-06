import { Reveal, Split } from './Motion.jsx';
import { LoopVideo } from './Media.jsx';

const STEPS = [
  { t: 'Originação', d: 'Identificação do negócio junto de proprietários, rede local ou mercado aberto.' },
  { t: 'Dados', d: 'Cruzamento de fontes oficiais para apurar o valor praticado na zona e no período.' },
  { t: 'Verificação', d: 'Visita ao imóvel: estado de conservação, exposição, acessos e potencial de obra.' },
  { t: 'Decisão', d: 'Proposta ou recusa fundamentada, sempre com os números apresentados.' },
];

const SOURCES = ['INE', 'Confidencial Imobiliário', 'PORDATA', 'Censos'];

export default function Method() {
  return (
    <section className="method on-dark" id="metodo">
      <div className="shell method__grid">
        <LoopVideo src="video/loop-litoral.mp4" poster="img/poster-litoral.jpg" ratio="4 / 5" />

        <div>
          <div className="sechead">
            <Reveal as="p" className="eyebrow">O método</Reveal>
            <Split as="h2" className="h2">Como analisamos um *negócio.*</Split>
          </div>

          <div className="steps">
            {STEPS.map((s, i) => (
              <Reveal as="article" className="step" key={s.t} delay={i * 80}>
                <h3 className="step__t">{s.t}</h3>
                <p className="step__d">{s.d}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="sources">
            <span className="sources__lbl">Fontes</span>
            <ul>{SOURCES.map((s) => <li key={s}>{s}</li>)}</ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
