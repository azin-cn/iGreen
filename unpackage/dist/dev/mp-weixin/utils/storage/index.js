"use strict";
var common_vendor = require("../../common/vendor.js");
const TokenKey = "__token__";
const TokenExpired = "__token_expired__";
function getToken() {
  const expire = common_vendor.index.getStorageSync(TokenExpired);
  if (Date.now() > expire)
    return "";
  return common_vendor.index.getStorageSync(TokenKey);
}
function setToken(token, expire = Date.now() + 7 * 24 * 60 * 60 * 1e3) {
  common_vendor.index.setStorageSync(TokenExpired, expire);
  return common_vendor.index.setStorageSync(TokenKey, token);
}
function set(key, value, expire) {
  common_vendor.index.setStorageSync(`__${key}_expired__`, expire);
  return common_vendor.index.setStorageSync(key, value);
}
function get(key, defaultVal) {
  const expire = common_vendor.index.getStorageSync(`__${key}_expired__`);
  if (Date.now() > expire) {
    return defaultVal;
  }
  return common_vendor.index.getStorageSync(key);
}
var storage = {
  get,
  set
};
exports.getToken = getToken;
exports.setToken = setToken;
exports.storage = storage;
