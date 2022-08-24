"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var api_apiIndex = require("./api/api-index.js");
var static_js_constants = require("./static/js/constants.js");
var utils_index = require("./utils/index.js");
require("./backend/index.js");
require("./backend/config.js");
require("./utils/storage/index.js");
require("./utils/request.js");
require("./utils/getSettingScope.js");
if (!Math) {
  "./pages/index/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    api_apiIndex.login();
    utils_index.registerTimeFormat();
    this.globalData.system = common_vendor.index.getSystemInfoSync();
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  globalData: {
    system: null,
    title: "iGreen",
    isWorker: common_vendor.ref(common_vendor.index.getStorageSync(static_js_constants.IS_WORKER)),
    phoneNumber: common_vendor.ref("13159664733")
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/workspace/Uniapp/project/iGreen/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
