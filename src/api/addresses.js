import { request } from './auth';

export function getAddresses() {
  return request('/api/address');
}

export function saveAddress(data) {
  return request('/api/address', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

