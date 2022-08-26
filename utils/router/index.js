export function navigateTo(url, params = {}) {
  url += '?query=' + encodeURIComponent(JSON.stringify(params))
  return new Promise((resolve, reject) => {
    uni.navigateTo({
      url,
      success: resolve,
      fail: reject,
    })
  })
}
