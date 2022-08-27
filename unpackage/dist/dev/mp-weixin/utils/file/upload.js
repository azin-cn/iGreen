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
var common_vendor = require("../../common/vendor.js");
function upload(url, formName, filePath, options = {}) {
  return new Promise((resolve, reject) => {
    common_vendor.index.uploadFile(__spreadValues({
      url,
      name: formName,
      filePath,
      formData: {},
      success: resolve,
      fail: reject
    }, options));
  });
}
function uploadFiles(url, files, options) {
  const target = files.map((file) => upload(url, file.formName, file.path, options));
  return Promise.all(target);
}
exports.uploadFiles = uploadFiles;
