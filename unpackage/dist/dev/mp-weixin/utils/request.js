"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var common_vendor = require("../common/vendor.js");
var utils_storage_index = require("./storage/index.js");
function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    const token = utils_storage_index.getToken();
    if (token) {
      options.header = {
        "content-type": "application/json",
        "Authentication": token
      };
    }
    return common_vendor.index.request(__spreadValues({
      url,
      method: options.method || "GET",
      success: (res) => resolve(res.data),
      fail: (e) => {
        common_vendor.index.showModal({
          title: "\u7F51\u7EDC\u5F02\u5E38",
          content: "\u7F51\u7EDC\u5F02\u5E38\uFF0C\u8BF7\u6C42\u5931\u8D25",
          showCancel: false
        });
        reject(e);
      }
    }, options));
  });
}
exports.request = request;
