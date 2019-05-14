import request from '@/utils/request';

export async function getCategories() {
  return request('/api/categories');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}
