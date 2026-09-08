import { useState } from 'react';
import { Reveal, Split } from './Motion.jsx';
import { Figure } from './Media.jsx';
import Field from './Field.jsx';
import { useLang } from '../i18n.jsx';

const WHATSAPP = '351935904830';
const EMPTY = { nome: '', contacto: '', zona: '', msg: '' };

export default function Contact({ perfil, onPick }) {
  const { t } = useLang();
  const c = t.contact;
  const f = c.form;
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (key) => (e) => {
    setForm((s) => ({ ...s, [key]: e.target.value }));
    setErrors((x) => (x[key] ? { ...x, [key]: undefined } : x));
  };

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.nome.trim()) next.nome = f.errName;
    if (!form.contacto.trim()) next.contacto = f.errContact;
    setErrors(next);

    const first = Object.keys(next)[0];
    if (first) {
      document.getElementById(first === 'nome' ? 'nome' : 'contacto-campo')?.focus();
      return;
    }

    const lines = [
      f.wa.hello,
      '',
      `${f.wa.name}: ${form.nome.trim()}`,
      `${f.wa.contact}: ${form.contacto.trim()}`,
      `${f.wa.profile}: ${perfil === 'investidor' ? f.wa.investor : f.wa.owner}`,
    ];
    if (form.zona.trim()) lines.push(`${f.wa.area}: ${form.zona.trim()}`);
    if (form.msg.trim()) lines.push('', form.msg.trim());

    const text = lines.join('\n');
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    setSent(true);
  };

  return (
    <section className="contact on-dark" id="contacto">
      <div className="shell contact__grid">
        <div>
          <Reveal as="p" className="eyebrow">{c.eyebrow}</Reveal>
          <Split as="h2" className="contact__h">{c.h}</Split>
          <Reveal as="p" className="contact__lead" delay={80}>{c.lead}</Reveal>

          <ul className="contact__direct">
            {c.direct.map((d, i) => (
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
            alt={c.figAlt}
            ratio="16 / 10"
            delay={120}
          />
        </div>

        <Reveal as="form" className="form" onSubmit={submit} noValidate delay={100}>
          <div className="form__head">
            <p className="form__title">{f.title}</p>
            <p className="form__note">{f.note}</p>
          </div>

          <fieldset>
            <legend className="form__legend">{f.legend}</legend>
            <div className={['seg', perfil === 'investidor' && 'seg--b'].filter(Boolean).join(' ')}>
              <input type="radio" name="perfil" id="p1" checked={perfil !== 'investidor'}
                     onChange={() => onPick('proprietario')} />
              <label htmlFor="p1">{f.owner}</label>
              <input type="radio" name="perfil" id="p2" checked={perfil === 'investidor'}
                     onChange={() => onPick('investidor')} />
              <label htmlFor="p2">{f.investor}</label>
              <i className="seg__pill" aria-hidden="true" />
            </div>
          </fieldset>

          <div className="form__row2">
            <Field id="nome" label={f.name} autoComplete="name"
                   value={form.nome} onChange={set('nome')} error={errors.nome} />
            <Field id="contacto-campo" label={f.contact} autoComplete="tel"
                   value={form.contacto} onChange={set('contacto')} error={errors.contacto} />
          </div>

          <Field id="zona" label={f.area} optional
                 value={form.zona} onChange={set('zona')} />

          <Field id="msg" label={f.deal} optional textarea rows={4}
                 value={form.msg} onChange={set('msg')} />

          <button className="btn btn--solid btn--full" type="submit">
            <span>{f.submit}</span><span className="arw">→</span>
          </button>

          <p className="form__fine">{f.fine}</p>

          {sent && (
            <p className="form__sent" role="status">{f.sent}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
