"use strict";
var common_vendor = require("../../common/vendor.js");
function navigateTo(url, params = {}) {
  url += Object.keys(params).length ? "?query=" + encodeURIComponent(JSON.stringify(params)) : "";
  return new Promise((resolve, reject) => {
    common_vendor.index.navigateTo({
      url,
      success: resolve,
      fail: reject
    });
  });
}
function redirectTo(url, params = {}) {
  url += Object.keys(params).length ? "?query=" + encodeURIComponent(JSON.stringify(params)) : "";
  return new Promise((resolve, reject) => {
    common_vendor.index.redirectTo({
      url,
      success: resolve,
      fail: reject
    });
  });
}
exports.navigateTo = navigateTo;
exports.redirectTo = redirectTo;
