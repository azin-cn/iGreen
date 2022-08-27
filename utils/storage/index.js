const TokenKey = '__token__';
const TokenExpired = '__token_expired__';

// 认证令牌
export function getToken() {
  const expire = uni.getStorageSync(TokenExpired);
  if (Date.now() > expire) return '';
  return uni.getStorageSync(TokenKey);
}

export function setToken(token, expire = Date.now() + 7 * 24 * 60 * 60 * 1000) {
  uni.setStorageSync(TokenExpired, expire);
  return uni.setStorageSync(TokenKey, token);
}

export function removeToken() {
  return uni.removeStorageSync(TokenKey);
}

export function setOpenId() {
  
}

// 定义规则：普通的storage过期时间key为 __{key}_expired__
function set(key, value, expire) {
  uni.setStorageSync(`__${key}_expired__`, expire);
  return uni.setStorageSync(key, value);
}

function get(key, defaultVal) {
  const expire = uni.getStorageSync(`__${key}_expired__`);
  if (Date.now() > expire) {
    return defaultVal;
  }
  return uni.getStorageSync(key);
}

export default {
  get,
  set
};
