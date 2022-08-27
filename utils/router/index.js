export function navigateTo(url, params = {}) {
  url += Object.keys(params).length
    ? '?query=' + encodeURIComponent(JSON.stringify(params))
    : '';
  return new Promise((resolve, reject) => {
    uni.navigateTo({
      url,
      success: resolve,
      fail: reject
    });
  });
}

export function redirectTo(url, params = {}) {
  url += Object.keys(params).length
    ? '?query=' + encodeURIComponent(JSON.stringify(params))
    : '';
  return new Promise((resolve, reject) => {
    uni.redirectTo({
      url,
      success: resolve,
      fail: reject
    });
  });
}
