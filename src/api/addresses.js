import { request } from './auth';

export function getAddresses() {
  return request('/api/profile/addresses');
}

export function createAddress(data) {
  return request('/api/profile/addresses', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateAddress(id, data) {
  return request(`/api/profile/addresses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function deleteAddress(id) {
  return request(`/api/profile/addresses/${id}`, {
    method: 'DELETE',
  });
}

