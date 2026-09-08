import { useLang } from '../i18n.jsx';

/**
 * Campo com etiqueta flutuante. A etiqueta sobe via CSS (:placeholder-shown),
 * por isso o placeholder tem de ser um espaço — não texto.
 */
export default function Field({
  id, label, value, onChange, type = 'text', autoComplete,
  textarea = false, rows = 4, error, optional = false,
}) {
  const { t } = useLang();
  const Tag = textarea ? 'textarea' : 'input';
  const extra = textarea ? { rows } : { type, autoComplete };

  return (
    <div className={['field', textarea && 'field--area', error && 'field--err'].filter(Boolean).join(' ')}>
      <Tag
        id={id}
        value={value}
        onChange={onChange}
        placeholder=" "
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        {...extra}
      />
      <label htmlFor={id}>
        {label}{optional && <span className="field__opt"> {t.common.optional}</span>}
      </label>
      {error && <p className="field__err" id={`${id}-err`} role="alert">{error}</p>}
    </div>
  );
}
