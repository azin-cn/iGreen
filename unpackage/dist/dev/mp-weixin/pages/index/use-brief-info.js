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
var api_apiIndex = require("../../api/api-index.js");
const extension = [{
  icon: "icon-tongji",
  color: "#764831",
  bg: "#FFEBE0"
}, {
  icon: "icon-pingjiacishu",
  color: "#486091",
  bg: "#E9ECFF"
}];
function useBriefInfo() {
  const recycleBriefInfo = common_vendor.ref([]);
  function onRefresh() {
    api_apiIndex.getBriefInfo().then((res) => {
      recycleBriefInfo.value = res.recycleBriefInfo.map((info, index) => __spreadValues(__spreadValues({}, info), extension[index]));
    });
  }
  common_vendor.onLoad(onRefresh);
  return {
    recycleBriefInfo,
    onRefresh
  };
}
exports.useBriefInfo = useBriefInfo;
