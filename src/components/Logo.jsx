/** Logótipo Magna Properties — lockup completo (monograma + texto), PNG dourado.
 *  O tamanho é definido na CSS (.nav .brand__logo / .foot .brand__logo). */
export default function Logo({ className = '' }) {
  return (
    <img
      className={['brand__logo', className].filter(Boolean).join(' ')}
      src="/img/logo.png"
      alt="Magna Properties"
      width="160" height="143"
      decoding="async"
    />
  );
}
