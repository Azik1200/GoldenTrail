import { API_BASE_URL, getCsrfCookie } from './auth';

export async function sendContact(info) {
  await getCsrfCookie();
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (match) headers['X-XSRF-TOKEN'] = decodeURIComponent(match[1]);
  const language =
    localStorage.getItem('language') || navigator.language?.slice(0, 2);
  if (language) {
    headers['X-Language'] = language;
    headers['X-Is-Ferroli'] = '0';
  }

  const resp = await fetch(`${API_BASE_URL}/api/contact`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify(info),
  });
  if (!resp.ok) throw new Error('Network request failed');
  return resp.json();
}
