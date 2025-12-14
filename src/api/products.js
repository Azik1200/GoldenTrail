import { API_BASE_URL } from './auth';

export async function fetchProducts(params = {}) {
  const language =
    localStorage.getItem('language') || navigator.language?.slice(0, 2);
  const headers = {};
  if (language) headers['X-Language'] = language;
  const url = new URL(`${API_BASE_URL}/api/products`);
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value
        .filter((v) => v !== undefined && v !== null && v !== "")
        .forEach((v) => url.searchParams.append(key, v));
    } else if (value !== "") {
      url.searchParams.append(key, value);
    }
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

