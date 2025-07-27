import { API_BASE_URL } from './auth';

export async function fetchCatalogs() {
  const language =
    localStorage.getItem('language') || navigator.language?.slice(0, 2);
  const headers = {};
  if (language) headers['X-Language'] = language;
  const resp = await fetch(`${API_BASE_URL}/api/catalogs`, {
    credentials: 'include',
    headers,
  });
  if (!resp.ok) throw new Error('Network request failed');
  return resp.json();
}
