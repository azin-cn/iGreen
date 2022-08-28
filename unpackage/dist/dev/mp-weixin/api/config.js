"use strict";
const BASE_URL = "https://mock.presstime.cn/mock/6304d0bac98102005630fe33/api";
const MEDIA_URL = "https://www.imgtp.com/api/upload";
function _request(url, options = {}) {
  const base_url = BASE_URL.replace(/\/$/, "");
  url = url.replace(/^\//, "");
  return request(`${base_url}/${url}`, options);
}
exports.BASE_URL = BASE_URL;
exports.MEDIA_URL = MEDIA_URL;
exports._request = _request;
