export default function formatPrice(value) {
  if (value == null || value === '') return '';
  const num = Number(String(value).replace(/[^0-9.,]/g, '').replace(',', '.'));
  if (Number.isNaN(num)) return String(value);
  const [int, dec] = num.toFixed(2).split('.');
  return dec === '00' ? `${int} ₼` : `${int}.${dec} ₼`;
}
