import { Reveal, Split } from './Motion.jsx';

export default function Approach() {
  return (
    <section className="approach">
      <div className="shell approach__grid">
        <Reveal as="p" className="eyebrow">Abordagem</Reveal>

        <Split as="h2" className="approach__h">
          Decisões sustentadas em *dados de transação.*
        </Split>

        <div className="approach__cols">
          <Reveal as="p" delay={60}>
            Avaliamos cada oportunidade a partir do valor efectivamente praticado na zona, e não
            do valor pedido. A análise antecede sempre a proposta — para quem vende e para quem
            compra.
          </Reveal>
          <Reveal as="p" delay={140}>
            Quando os números não sustentam o negócio, dizemo-lo. É uma posição que custa
            oportunidades no curto prazo e evita erros que se pagam durante anos.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
