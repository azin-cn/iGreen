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
var common_vendor = require("../../../common/vendor.js");
function chooseMedia(args = {}) {
  return common_vendor.index.chooseMedia(__spreadValues({
    count: 9,
    mediaType: ["mix"],
    sourceType: ["album", "camera"],
    sizeType: ["compressed"]
  }, args));
}
function chooseMediaFromAlbum(args = {}) {
  return chooseMedia(__spreadProps(__spreadValues({}, args), {
    sourceType: ["album"]
  }));
}
function chooseMediaFromCamera(args = {}) {
  return chooseMedia(__spreadProps(__spreadValues({}, args), {
    sourceType: ["camera"]
  }));
}
function chooseImage(args = {}) {
  return chooseMedia(__spreadProps(__spreadValues({}, args), {
    mediaType: ["image"]
  }));
}
function chooseImageFromAlbum(args = {}) {
  return chooseImage(__spreadProps(__spreadValues({}, args), {
    sourceType: ["album"]
  }));
}
function chooseImageFromCamera(args = {}) {
  return chooseImage(__spreadProps(__spreadValues({}, args), {
    sourceType: ["camera"]
  }));
}
function chooseVideo(args = {}) {
  return chooseMedia(__spreadProps(__spreadValues({}, args), {
    mediaType: ["video"]
  }));
}
function chooseVideoFromAlbum(args = {}) {
  return chooseVideo(__spreadProps(__spreadValues({}, args), {
    sourceType: ["album"]
  }));
}
function chooseVideoFromCamera(args = {}) {
  return chooseVideo(__spreadProps(__spreadValues({}, args), {
    sourceType: ["camera"]
  }));
}
exports.chooseImage = chooseImage;
exports.chooseImageFromAlbum = chooseImageFromAlbum;
exports.chooseImageFromCamera = chooseImageFromCamera;
exports.chooseMediaFromAlbum = chooseMediaFromAlbum;
exports.chooseMediaFromCamera = chooseMediaFromCamera;
exports.chooseVideoFromAlbum = chooseVideoFromAlbum;
exports.chooseVideoFromCamera = chooseVideoFromCamera;
