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
var api_config = require("../api/config.js");
var static_js_constants = require("../static/js/constants.js");
var utils_storage_index = require("../utils/storage/index.js");
var utils_request = require("../utils/request.js");
utils_request.request.BASE_URL = api_config.BASE_URL;
function router(url, options = {}) {
  switch (url) {
    case "/login":
      console.warn("information\uFF1A\u8BF7\u7ED3\u5408storage\u4E2D\u7684\u6570\u636E\u67E5\u9605");
      return login();
    case "/getUserInfo":
      return getUserInfo(options);
    case "/getBanners":
      return getBanners(options);
    case "/getNotices":
      return getNotices(options);
    case "/getBriefInfo":
      return getBriefInfo(options);
    case "/getNearbyInfo":
      return getNearbyInfo(options);
    case "/getMarkers":
      return getStoreMarkers(options);
    case "/getEmployeeTasks":
      return getEmployeeTasks(options);
  }
}
function _request(url, options = {}) {
  const base_url = api_config.BASE_URL.replace(/\/$/, "");
  url = url.replace(/^\//, "");
  return utils_request.request(`${base_url}/${url}`, options);
}
function login(options) {
  if (utils_storage_index.getToken()) {
    const isWorker = common_vendor.index.getStorageSync(static_js_constants.IS_WORKER);
    if (isWorker == null ? void 0 : isWorker.toString()) {
      return Promise.resolve("\u5DF2\u767B\u5F55");
    }
    return getUserInfo();
  }
  return new Promise((resolve, reject) => {
    common_vendor.index.login({
      success: resolve,
      fail: reject
    });
  }).then((res) => {
    console.log("\u5FAE\u4FE1\u767B\u5F55", res);
    return utils_request.request("http://ssr.v2.yefengzhijia.xyz:8080/wx/getCode2Session", {
      data: {
        code: res.code
      }
    });
  }).then((res) => {
    console.log(res);
    const {
      code,
      data: { openid, session_key, token },
      msg
    } = res;
    if (code === 200) {
      utils_storage_index.setToken(token);
      utils_storage_index.storage.set("openid", openid);
      return token;
    }
    throw new Error(`\u83B7\u53D6token\u5931\u8D25 ${code} ${msg}`);
  }).then((rToken) => {
    return getUserInfo();
  }).catch(console.log);
}
function getUserInfo(options = {}) {
  var _a;
  const token = ((_a = options.data) == null ? void 0 : _a.token) || utils_storage_index.getToken();
  if (!token)
    return login();
  return utils_request.request("http://ssr.v2.yefengzhijia.xyz:8080/user/userInfo", __spreadProps(__spreadValues({}, options), {
    data: {
      rToken: token
    }
  })).then((res) => {
    const {
      data: { roles }
    } = res;
    let isWorker = roles.filter((role) => !/user:((select\/)|(view\/))?((view)|(select))+$/.test(role.power)).length !== 0;
    common_vendor.index.setStorageSync(static_js_constants.IS_WORKER, isWorker);
    getApp().globalData.isWorker.value = isWorker;
    return res;
  });
}
function getBanners(options) {
  return _request("/getBanners", options);
}
function getNotices(options) {
  return _request("/getNotices", options);
}
function getBriefInfo(options) {
  return _request("/getBriefInfo", options);
}
function getNearbyInfo(options) {
  return _request("/getNearbyInfo", options);
}
function getStoreMarkers(options) {
  return _request("/getMarkers", options);
}
function getEmployeeTasks(options) {
  const { id } = options.data;
  return _request(`/employee/${id}`, options).then((res) => {
    res.tasks = res.tasks.sort((t1, t2) => {
      if (!t1.time) {
        t1.time = new Date(t1.timestamp).format("yyyy-MM-dd hh:mm:ss");
      }
      if (!t2.time) {
        t2.time = new Date(t2.timestamp).format("yyyy-MM-dd hh:mm:ss");
      }
      return t1.timestamp - t2.timestamp;
    });
    return res;
  });
}
exports.router = router;
