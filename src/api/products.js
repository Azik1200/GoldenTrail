import { API_BASE_URL } from './auth';

export async function fetchProducts(params = {}) {
  const language =
    localStorage.getItem('language') || navigator.language?.slice(0, 2) || 'az';
  const headers = {};
  if (language) headers['Accept-Language'] = language;
  const query = new URLSearchParams();
  if (params.category) query.append('category', params.category);
  if (params.catalog) query.append('catalog', params.catalog);
  const resp = await fetch(
    `${API_BASE_URL}/api/products${query.size ? `?${query}` : ''}`,
    {
      credentials: 'include',
      headers,
    }
  );
  if (!resp.ok) throw new Error('Network request failed');
  return resp.json();
}

export async function fetchProduct(id) {
  const language =
    localStorage.getItem('language') || navigator.language?.slice(0, 2) || 'az';
  const headers = {};
  if (language) headers['Accept-Language'] = language;
  const resp = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    credentials: 'include',
    headers,
  });
  if (!resp.ok) throw new Error('Network request failed');
  return resp.json();
}

export async function fetchProductFilters() {
  const language =
    localStorage.getItem('language') || navigator.language?.slice(0, 2) || 'az';
  const headers = {};
  if (language) headers['Accept-Language'] = language;
  const resp = await fetch(`${API_BASE_URL}/api/products/filters`, {
    credentials: 'include',
    headers,
  });
  if (!resp.ok) throw new Error('Network request failed');
  return resp.json();
}
