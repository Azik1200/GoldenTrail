import { request } from './auth';

export function getProfile() {
  return request('/api/profile');
}

export function updateProfile(data) {
  return request('/api/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

