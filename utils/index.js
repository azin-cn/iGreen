export function getLocation() {
  return new Promise((resolve, reject) => {
    uni.getLocation({
      type: 'wgs84',
      success: resolve,
      fail: reject
    });
  })
}
