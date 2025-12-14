import { API_BASE_URL } from './auth';

export async function fetchBlogs() {
  const language =
    localStorage.getItem('language') || navigator.language?.slice(0, 2);
  const headers = {};
  if (language) {
    headers['X-Language'] = language;
    headers['X-Is-Ferroli'] = '0';
  }
  const resp = await fetch(`${API_BASE_URL}/api/blogs`, {
    credentials: 'include',
    headers,
  });
  if (!resp.ok) throw new Error('Network request failed');
  return resp.json();
}

export async function fetchBlog(slug) {
  const language =
    localStorage.getItem('language') || navigator.language?.slice(0, 2);
  const headers = {};
  if (language) {
    headers['X-Language'] = language;
    headers['X-Is-Ferroli'] = '0';
  }
  const resp = await fetch(`${API_BASE_URL}/api/blogs/${slug}`, {
    credentials: 'include',
    headers,
  });
  if (!resp.ok) throw new Error('Network request failed');
  return resp.json();
}
