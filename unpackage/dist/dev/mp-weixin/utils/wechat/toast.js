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
var common_vendor = require("../../common/vendor.js");
function showToast(args) {
  common_vendor.index.showToast(__spreadValues({
    title: "Hello",
    duration: 1500
  }, args));
}
function showSuccessToast(args) {
  showToast(__spreadProps(__spreadValues({ title: "You are right" }, args), { icon: "success" }));
}
function showErrorToast(args) {
  showToast(__spreadProps(__spreadValues({ title: "\u7F51\u8DEF\u4E0D\u7A33\u5B9A" }, args), { icon: "error" }));
}
function showLoading(args) {
  common_vendor.index.showLoading(__spreadValues({
    title: "loading",
    mask: true,
    success: () => {
    },
    fail: () => {
    },
    complete: () => {
    }
  }, args));
}
function hiddenLoading() {
  common_vendor.index.hideLoading();
}
exports.hiddenLoading = hiddenLoading;
exports.showErrorToast = showErrorToast;
exports.showLoading = showLoading;
exports.showSuccessToast = showSuccessToast;
