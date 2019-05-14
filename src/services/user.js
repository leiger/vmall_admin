import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request(`/api/admins`);
}

export async function accountLogin(params) {
  return request('/api/admins', {
    method: 'POST',
    data: params,
  });
}
