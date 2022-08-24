const TokenKey = '__token__';
const TokenExpired = '__token_expired__'

// 认证令牌
export function getToken() {
  const expire = uni.getStorageSync(TokenExpired)
  if (Date.now() > expire) return ''
  return uni.getStorageSync(TokenKey)
}

export function setToken(token, expire = Date.now() + 7 * 24 * 60 * 60 * 1000) {
  uni.setStorageSync(TokenExpired, expire)
  return uni.setStorageSync(TokenKey, token)
}

export function removeToken() {
  return uni.removeStorageSync(TokenKey)
}
