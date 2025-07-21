const API_BASE_URL = (() => {
  const raw = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  try {
    const url = new URL(raw);
    if (
      window?.location.hostname === 'localhost' &&
      url.hostname !== 'localhost'
    ) {
      url.hostname = 'localhost';
    }
    return url.toString().replace(/\/$/, '');
  } catch {
    return raw;
  }
})();

async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    ...(options.headers || {}),
  };
  const language =
    localStorage.getItem('language') || navigator.language?.slice(0, 2);
  if (language) headers['Accept-Language'] = language;
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  if (match) headers['X-XSRF-TOKEN'] = decodeURIComponent(match[1]);
  const resp = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    ...options,
    headers,
  });
  if (!resp.ok) throw new Error('Network request failed');
  return resp.json();
}

export async function login(credentials) {
  await getCsrfCookie();
  const data = await request('/api/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  if (data.token) localStorage.setItem('token', data.token);
  return data;
}

export async function getCsrfCookie() {
  await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`, {
    credentials: 'include',
  });
}

export async function register(info) {
  await getCsrfCookie();
  const data = await request('/api/register', {
    method: 'POST',
    body: JSON.stringify(info),
  });
  if (data.token) localStorage.setItem('token', data.token);
  return data;
}

export async function logout() {
  await getCsrfCookie();
  await request('/api/logout', { method: 'POST' });
  localStorage.removeItem('token');
}

export async function me() {
  try {
    return await request('/api/me');
  } catch (err) {
    console.error(err);
    return null;
  }
}

export { API_BASE_URL, request };
