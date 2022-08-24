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
exports.getToken = getToken;
exports.setToken = setToken;
