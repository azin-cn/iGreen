import { BASE_URL } from '@/api/config.js';
import { IS_WORKER } from '@/static/js/constants.js';
import storage, { getToken, setToken } from '@/utils/storage';
import request from '@/utils/request.js';

// todo 实现defaultURL
request.BASE_URL = BASE_URL;

export default function router(url, options = {}) {
  switch (url) {
    case '/login':
      console.warn('information：请结合storage中的数据查阅');
      return login(options);
    case '/getUserInfo':
      return getUserInfo(options);
    case '/getBanners':
      return getBanners(options);
    case '/getNotices':
      return getNotices(options);
    case '/getBriefInfo':
      return getBriefInfo(options);
    case '/getNearbyInfo':
      return getNearbyInfo(options);
    case '/getMarkers':
      return getStoreMarkers(options);
    case '/getEmployeeTasks':
      return getEmployeeTasks(options);
  }
}

// _request为设置BASE_URL的请求，request为不设定BASE_URL，为原有的请求方式
export function _request(url, options = {}) {
  const base_url = BASE_URL.replace(/\/$/, '');
  url = url.replace(/^\//, '');
  return request(`${base_url}/${url}`, options);
}

function login(options) {
  if (getToken()) {
    // 如果token存在则查看是否为isWorker
    const isWorker = uni.getStorageSync(IS_WORKER);
    if (isWorker?.toString()) {
      // 如果存在值 true/false
      return Promise.resolve('已登录');
    }
    return getUserInfo();
  }

  return new Promise((resolve, reject) => {
    uni.login({
      success: resolve,
      fail: reject
    });
  })
    .then(res => {
      console.log('微信登录', res);
      return request('http://ssr.v2.yefengzhijia.xyz:8080/wx/getCode2Session', {
        data: {
          code: res.code
        }
      });
    })
    .then(res => {
      console.log(res);
      const {
        code,
        data: { openid, session_key, token },
        msg
      } = res;

      if (code === 200) {
        setToken(token); // 存储token
        storage.set('openid', openid);
        return token;
      }
      throw new Error(`获取token失败 ${code} ${msg}`);
    })
    .then(rToken => {
      return getUserInfo();
    })
    .catch(console.log);
}

function getUserInfo(options = {}) {
  const token = options.data?.token || getToken();
  if (!token) return login();

  return request('http://ssr.v2.yefengzhijia.xyz:8080/user/userInfo', {
    ...options,
    data: {
      rToken: token
    }
  }).then(res => {
    const {
      data: { roles }
    } = res;

    // console.log(res)

    // 判断是否为员工
    let isWorker =
      roles.filter(
        // 排除普通用户
        role =>
          !/user:((select\/)|(view\/))?((view)|(select))+$/.test(role.power)
      ).length !== 0;

    uni.setStorageSync(IS_WORKER, isWorker);
    getApp().globalData.isWorker.value = isWorker;
    return res;
  });
}

function getBanners(options) {
  return _request('/getBanners', options);
}

function getNotices(options) {
  return _request('/getNotices', options);
}

function getBriefInfo(options) {
  return _request('/getBriefInfo', options);
}

function getNearbyInfo(options) {
  return _request('/getNearbyInfo', options);
}

function getStoreMarkers(options) {
  return _request('/getMarkers', options);
}

function getEmployeeTasks(options) {
  const { id } = options.data;
  return _request(`/employee/${id}`, options).then(res => {
    res.tasks = res.tasks.sort((t1, t2) => {
      if (!t1.time) {
        t1.time = new Date(t1.timestamp).format('yyyy-MM-dd hh:mm:ss');
      }
      if (!t2.time) {
        t2.time = new Date(t2.timestamp).format('yyyy-MM-dd hh:mm:ss');
      }
      return t1.timestamp - t2.timestamp;
    });
    return res;
  });
}
