import { Reveal, Split } from './Motion.jsx';
import { useLang } from '../i18n.jsx';

export default function Approach() {
  const { t } = useLang();
  return (
    <section className="approach">
      <div className="shell approach__grid">
        <Reveal as="p" className="eyebrow">{t.approach.eyebrow}</Reveal>

        <Split as="h2" className="approach__h">
          {t.approach.h}
        </Split>

        <div className="approach__cols">
          <Reveal as="p" delay={60}>{t.approach.p1}</Reveal>
          <Reveal as="p" delay={140}>{t.approach.p2}</Reveal>
        </div>
      </div>
    </section>
  );
}
