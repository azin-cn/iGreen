import { getToken } from './storage';

export default function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    const token = getToken();
    // 判断本地是否存在token，如果存在则带上请求头
    if (token) {
      options.header = {
        'content-type': 'application/json',
        Authentication: token
      };
    }

    // 请求拦截
    return uni.request({
      // url: request.BASE_URL || '' + url,
      url,
      method: options.method || 'GET',
      success: res => resolve(res.data),
      fail: e => {
        uni.showModal({
          title: '网络异常',
          content: '网络异常，请求失败',
          showCancel: false
        });
        reject(e);
      },
      ...options
    });
  });
}
