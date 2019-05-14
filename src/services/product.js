import request from '@/utils/request';

export async function getAllProducts() {
  return request('/api/products');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function putNewProduct(params) {
  return request('/api/products', {
    method: 'POST',
    data: params,
  });
}
