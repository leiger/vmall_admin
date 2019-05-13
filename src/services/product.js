import request from '@/utils/request';

export async function getAllProducts() {
  return request('/api/products');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}
