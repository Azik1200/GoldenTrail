import { API_BASE_URL } from './auth';

const base = (
  import.meta.env.VITE_SLIDE_IMAGE_BASE_URL || `${API_BASE_URL}/storage`
).replace(/\/$/, '');

export const SLIDE_IMAGE_BASE_URL = base;

export function formatSlideImageUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  const trimmed = String(path).replace(/^\/+/, '');
  return `${SLIDE_IMAGE_BASE_URL}/${trimmed}`;
}

export async function fetchSlides() {
  const language =
    localStorage.getItem('language') || navigator.language?.slice(0, 2);
  const headers = {};
  if (language) headers['X-Language'] = language;
  const resp = await fetch(`${API_BASE_URL}/api/slides`, {
    credentials: 'include',
    headers,
  });
  if (!resp.ok) throw new Error('Network request failed');
  return resp.json();
}
