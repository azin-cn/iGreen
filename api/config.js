export const BASE_URL =
  'https://mock.presstime.cn/mock/6304d0bac98102005630fe33/api';

export const MEDIA_URL = 'https://www.imgtp.com/api/upload';

// _request为设置BASE_URL的请求，request为不设定BASE_URL，为原有的请求方式
export function _request(url, options = {}) {
  const base_url = BASE_URL.replace(/\/$/, '');
  url = url.replace(/^\//, '');
  return request(`${base_url}/${url}`, options);
}
