import { API_BASE_URL, getCsrfCookie, request } from './auth';

export async function fetchProducts() {
  const language =
    localStorage.getItem('language') || navigator.language?.slice(0, 2);
  const headers = {};
  if (language) headers['X-Language'] = language;
  const resp = await fetch(`${API_BASE_URL}/api/products`, {
    credentials: 'include',
    headers,
  });
  if (!resp.ok) throw new Error('Network request failed');
  return resp.json();
}

export async function fetchProduct(id) {
  const language =
    localStorage.getItem('language') || navigator.language?.slice(0, 2);
  const headers = {};
  if (language) headers['X-Language'] = language;
  const resp = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    credentials: 'include',
    headers,
  });
  if (!resp.ok) throw new Error('Network request failed');
  return resp.json();
}

export async function fetchProductFilters() {
  const language =
    localStorage.getItem('language') || navigator.language?.slice(0, 2);
  const headers = {};
  if (language) headers['X-Language'] = language;
  const resp = await fetch(`${API_BASE_URL}/api/products/filters`, {
    credentials: 'include',
    headers,
  });
  if (!resp.ok) throw new Error('Network request failed');
  return resp.json();
}

export async function filterProducts(filters) {
  await getCsrfCookie();
  return request('/api/products/filter', {
    method: 'POST',
    body: JSON.stringify(filters),
  });
}
