"use strict";
require("../../../common/vendor.js");
var utils_wechat_toast = require("../../../utils/wechat/toast.js");
var utils_index = require("../../../utils/index.js");
var packageWorker_api_index = require("../../api/index.js");
function useForm(userinfo, showMessage) {
  function submit() {
    checkForm().then(() => {
      return packageWorker_api_index.submitApply(userinfo);
    }).then(() => {
      utils_wechat_toast.hiddenLoading();
      utils_wechat_toast.showSuccessToast({
        title: "\u7533\u8BF7\u6210\u529F"
      });
    }).catch((e) => {
      console.log(e);
      const { errMsg } = e;
      utils_wechat_toast.hiddenLoading();
      showMessage("error", typeof e === "string" || e instanceof Error ? e : (errMsg == null ? void 0 : errMsg.indexOf("uploadFile:fail")) !== -1 ? errMsg : "\u7F51\u7EDC\u5F02\u5E38\uFF0C\u8BF7\u91CD\u65B0\u63D0\u4EA4\u6216\u4F7F\u7528\u7535\u8BDD\u8054\u7CFB");
    });
  }
  function checkForm() {
    return Promise.resolve().then(() => {
      console.log(userinfo);
      const { username, phone, birth, gender, address } = userinfo;
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
  return {
    submit,
    checkForm
  };
}
exports.useForm = useForm;
