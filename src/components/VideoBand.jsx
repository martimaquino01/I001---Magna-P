import { Split } from './Motion.jsx';
import { LoopVideo } from './Media.jsx';
import { useLang } from '../i18n.jsx';

/** Faixa full-bleed: vídeo em loop + uma frase. Só corre quando está no ecrã. */
export default function VideoBand() {
  const { t } = useLang();
  return (
    <section className="band-video" aria-label="Algarve">
      <LoopVideo src="video/loop-costa.mp4" poster="img/poster-costa.jpg" />
      <div className="band-video__scrim" />
      <div className="band-video__body">
        <div className="shell">
          <Split as="p" className="band-video__q">
            {t.videoBand.q}
          </Split>
        </div>
      </div>
    </section>
  );
}
