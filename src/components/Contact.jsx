import { useState } from 'react';
import { Reveal, Split } from './Motion.jsx';
import { Figure } from './Media.jsx';
import Field from './Field.jsx';

const WHATSAPP = '351935904830';

const DIRECT = [
  { k: 'WhatsApp', v: '+351 935 904 830', href: `https://wa.me/${WHATSAPP}` },
  { k: 'Instagram', v: '@themagnaproperties', href: 'https://www.instagram.com/themagnaproperties' },
  { k: 'Licença', v: 'AMI 27435' },
  { k: 'Área', v: 'Algarve — Loulé, Faro, Olhão' },
];

const EMPTY = { nome: '', contacto: '', zona: '', msg: '' };

export default function Contact({ perfil, onPick }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((x) => (x[key] ? { ...x, [key]: undefined } : x));
  };

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.nome.trim()) next.nome = 'Diga-nos como o tratar.';
    if (!form.contacto.trim()) next.contacto = 'Precisamos de uma forma de responder.';
    setErrors(next);

    const first = Object.keys(next)[0];
    if (first) {
      document.getElementById(first === 'nome' ? 'nome' : 'contacto-campo')?.focus();
      return;
    }

    const lines = [
      'Olá Magna Properties,',
      '',
      `Nome: ${form.nome.trim()}`,
      `Contacto: ${form.contacto.trim()}`,
      `Perfil: ${perfil === 'investidor' ? 'Investidor' : 'Proprietário'}`,
    ];
    if (form.zona.trim()) lines.push(`Zona: ${form.zona.trim()}`);
    if (form.msg.trim()) lines.push('', form.msg.trim());

    const text = lines.join('\n');
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    setSent(true);
  };

  return (
    <section className="contact on-dark" id="contacto">
      <div className="shell contact__grid">
        <div>
          <Reveal as="p" className="eyebrow">Contacto</Reveal>
          <Split as="h2" className="contact__h">Apresente-nos o *negócio.*</Split>
          <Reveal as="p" className="contact__lead" delay={80}>
            Descreva o que tem ou o que procura. Respondemos com uma avaliação fundamentada,
            incluindo quando a resposta é negativa.
          </Reveal>

          <ul className="contact__direct">
            {DIRECT.map((d, i) => (
              <Reveal as="li" key={d.k} delay={i * 70}>
                <span className="k">{d.k}</span>
                {d.href
                  ? <a href={d.href} target="_blank" rel="noopener">{d.v}</a>
                  : <span>{d.v}</span>}
              </Reveal>
            ))}
          </ul>

          <Figure
            className="contact__fig"
            src="img/p-infinity.jpg"
            alt="Moradia contemporânea com piscina de bordo infinito"
            ratio="16 / 10"
            delay={120}
          />
        </div>

        <Reveal as="form" className="form" onSubmit={submit} noValidate delay={100}>
          <div className="form__head">
            <p className="form__title">Pedido de análise</p>
            <p className="form__note">Resposta em 24 h úteis.</p>
          </div>

          <fieldset>
            <legend className="form__legend">Sou</legend>
            <div className={['seg', perfil === 'investidor' && 'seg--b'].filter(Boolean).join(' ')}>
              <input type="radio" name="perfil" id="p1" checked={perfil !== 'investidor'}
                     onChange={() => onPick('proprietario')} />
              <label htmlFor="p1">Proprietário</label>
              <input type="radio" name="perfil" id="p2" checked={perfil === 'investidor'}
                     onChange={() => onPick('investidor')} />
              <label htmlFor="p2">Investidor</label>
              <i className="seg__pill" aria-hidden="true" />
            </div>
          </fieldset>

          <div className="form__row2">
            <Field id="nome" label="Nome" autoComplete="name"
                   value={form.nome} onChange={set('nome')} error={errors.nome} />
            <Field id="contacto-campo" label="Telefone ou email" autoComplete="tel"
                   value={form.contacto} onChange={set('contacto')} error={errors.contacto} />
          </div>

          <Field id="zona" label="Concelho ou zona" optional
                 value={form.zona} onChange={set('zona')} />

          <Field id="msg" label="O negócio" optional textarea rows={4}
                 value={form.msg} onChange={set('msg')} />

          <button className="btn btn--solid btn--full" type="submit">
            <span>Enviar por WhatsApp</span><span className="arw">→</span>
          </button>

          <p className="form__fine">
            Abre o WhatsApp com a mensagem já escrita. Nada é guardado neste site.
          </p>

          {sent && (
            <p className="form__sent" role="status">
              Mensagem preparada no WhatsApp. Se não abriu, escreva-nos para +351 935 904 830.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
