import { Split } from './Motion.jsx';
import { LoopVideo } from './Media.jsx';

/** Faixa full-bleed: vídeo em loop + uma frase. Só corre quando está no ecrã. */
export default function VideoBand() {
  return (
    <section className="band-video" aria-label="Algarve">
      <LoopVideo src="video/loop-costa.mp4" poster="img/poster-costa.jpg" />
      <div className="band-video__scrim" />
      <div className="band-video__body">
        <div className="shell">
          <Split as="p" className="band-video__q">
            Um imóvel vale o que a zona *paga por ele* — não o que o anúncio pede.
          </Split>
        </div>
      </div>
    </section>
  );
}
