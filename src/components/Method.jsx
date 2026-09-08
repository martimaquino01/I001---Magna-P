import { Reveal, Split } from './Motion.jsx';
import { LoopVideo } from './Media.jsx';
import { useLang } from '../i18n.jsx';

const SOURCES = ['INE', 'Confidencial Imobiliário', 'PORDATA', 'Censos'];

export default function Method() {
  const { t } = useLang();
  return (
    <section className="method on-dark" id="metodo">
      <div className="shell method__grid">
        <LoopVideo src="video/loop-litoral.mp4" poster="img/poster-litoral.jpg" ratio="4 / 5" />

        <div>
          <div className="sechead">
            <Reveal as="p" className="eyebrow">{t.method.eyebrow}</Reveal>
            <Split as="h2" className="h2">{t.method.h}</Split>
          </div>

          <div className="steps">
            {t.method.steps.map((s, i) => (
              <Reveal as="article" className="step" key={s.t} delay={i * 80}>
                <h3 className="step__t">{s.t}</h3>
                <p className="step__d">{s.d}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="sources">
            <span className="sources__lbl">{t.method.sourcesLabel}</span>
            <ul>{SOURCES.map((s) => <li key={s}>{s}</li>)}</ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
