import { API_BASE_URL } from './auth';

export async function fetchProducts(params = {}) {
  const language =
    localStorage.getItem('language') || navigator.language?.slice(0, 2);
  const headers = {};
  if (language) {
    headers['X-Language'] = language;
    headers['X-Is-Ferroli'] = '0';
  }
  const url = new URL(`${API_BASE_URL}/api/products`);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });
  const resp = await fetch(url.toString(), {
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
  if (language) {
    headers['X-Language'] = language;
    headers['X-Is-Ferroli'] = '0';
  }
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
  if (language) {
    headers['X-Language'] = language;
    headers['X-Is-Ferroli'] = '0';
  }
  const resp = await fetch(`${API_BASE_URL}/api/products/filters`, {
    credentials: 'include',
    headers,
  });
  if (!resp.ok) throw new Error('Network request failed');
  return resp.json();
}

