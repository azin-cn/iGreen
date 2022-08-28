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
var utils_router_index = require("../../../utils/router/index.js");
var utils_wechat_toast = require("../../../utils/wechat/toast.js");
var utils_index = require("../../../utils/index.js");
var packageWorker_api_index = require("../../api/index.js");
var utils_file_upload = require("../../../utils/file/upload.js");
var api_config = require("../../../api/config.js");
function useForm(userinfo, backups, showMessage) {
  function submit() {
    utils_wechat_toast.showLoading();
    checkForm().then(() => {
      return processMedia();
    }).then(() => {
      return packageWorker_api_index.submitApply(__spreadProps(__spreadValues({}, userinfo), { avatar: backups.avatar }));
    }).then(() => {
      utils_wechat_toast.hiddenLoading();
      utils_wechat_toast.showSuccessToast({
        title: "\u7533\u8BF7\u6210\u529F"
      });
      const timer = setTimeout(() => {
        utils_router_index.redirectTo("/pages/index/index");
        clearTimeout(timer);
      }, 1500);
    }).catch((e) => {
      const { errMsg } = e;
      utils_wechat_toast.hiddenLoading();
      showMessage("error", typeof e === "string" || e instanceof Error ? e : (errMsg == null ? void 0 : errMsg.indexOf("uploadFile:fail")) !== -1 ? errMsg : "\u7F51\u7EDC\u5F02\u5E38\uFF0C\u8BF7\u91CD\u65B0\u63D0\u4EA4\u6216\u4F7F\u7528\u7535\u8BDD\u8054\u7CFB");
    });
  }
  function checkForm() {
    return Promise.resolve().then(() => {
      const { username, phone, birth, gender, address, avatar } = userinfo;
      if (!username) {
        throw new Error("\u59D3\u540D\u672A\u586B\u5199");
      }
      if (!phone) {
        throw new Error("\u8054\u7CFB\u65B9\u5F0F\u672A\u586B\u5199");
      }
      if (!gender) {
        throw new Error("\u6027\u522B\u672A\u586B\u5199");
      }
      if (!birth || birth > Date.now()) {
        throw new Error("\u51FA\u751F\u5E74\u6708\u4E0D\u6B63\u786E");
      }
      if (!address) {
        throw new Error("\u5730\u5740\u672A\u586B\u5199");
      }
      if (!avatar) {
        throw new Error("\u672A\u9009\u62E9\u5934\u50CF");
      }
    }).then(() => {
      if (userinfo.latitude && userinfo.longitude)
        return;
      return utils_index.getLocation();
    }).then(({ latitude, longitude } = {}) => {
      if (latitude && longitude) {
        userinfo.latitude = latitude;
        userinfo.longitude = longitude;
      }
    });
  }
  function processMedia() {
    return utils_file_upload.uploadFiles(api_config.MEDIA_URL, [
      { formName: "image", path: userinfo.avatar }
    ]).then((res) => {
      console.log(res);
      const {
        code,
        msg,
        data: { url }
      } = res[0];
      backups.avatar = url;
    });
  }
  return {
    submit,
    checkForm
  };
}
exports.useForm = useForm;
