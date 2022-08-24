"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("../common/vendor.js");
var utils_getSettingScope = require("./getSettingScope.js");
function getLocation() {
  return new Promise((resolve, reject) => {
    common_vendor.index.getLocation({
      type: "wgs84",
      success: resolve,
      fail: reject
    });
  });
}
function openLocation(latitude, longitude, options = {}) {
  return new Promise((resolve, reject) => {
    utils_getSettingScope.getUserLocationScope().then(() => {
      common_vendor.index.showLoading({
        title: "loading"
      });
      common_vendor.index.openLocation(__spreadProps(__spreadValues({
        latitude,
        longitude
      }, options), {
        success() {
          console.log("\u6210\u529F\u6253\u5F00\u5730\u56FE");
          resolve(true);
        },
        fail: () => {
          common_vendor.index.showModal({
            title: "\u8BF7\u9009\u62E9\u76EE\u6807\u5730\u70B9",
            showCancel: false
          });
        }
      }));
    }).finally(() => {
      common_vendor.index.hideLoading();
    });
  });
}
function makePhoneCall(phoneNumber) {
  return new Promise((resolve, reject) => {
    common_vendor.index.makePhoneCall({
      phoneNumber,
      success: resolve,
      fail: () => console.warn("cancel make phone call")
    });
  });
}
function registerTimeFormat() {
  Date.prototype.format = function(fmt) {
    var o = {
      "M+": this.getMonth() + 1,
      "d+": this.getDate(),
      "h+": this.getHours(),
      "m+": this.getMinutes(),
      "s+": this.getSeconds(),
      "q+": Math.floor((this.getMonth() + 3) / 3),
      "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return fmt;
  };
}
exports.getLocation = getLocation;
exports.makePhoneCall = makePhoneCall;
exports.openLocation = openLocation;
exports.registerTimeFormat = registerTimeFormat;
