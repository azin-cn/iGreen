"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
require("./backend/index.js");
var static_js_constants = require("./static/js/constants.js");
var utils_index = require("./utils/index.js");
require("./api/config.js");
require("./utils/storage/index.js");
require("./utils/request.js");
require("./utils/getSettingScope.js");
if (!Math) {
  "./pages/index/index.js";
  "./package-user/pages/order/index.js";
  "./package-worker/pages/workbench/index.js";
  "./package-worker/pages/apply/index.js";
  "./package-admin/pages/admin/index.js";
  "./package-admin/pages/super-admin/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    utils_index.registerTimeFormat();
    this.globalData.isWorker = common_vendor.ref(common_vendor.index.getStorageSync(static_js_constants.IS_WORKER));
    this.globalData.isAdmin = common_vendor.ref(common_vendor.index.getStorageSync(static_js_constants.IS_ADMIN));
    this.globalData.isSuperAdmin = common_vendor.ref(common_vendor.index.getStorageSync(static_js_constants.IS_SUPER_ADMIN));
    this.globalData.phoneNumber = common_vendor.ref("13159664733");
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
    isWorker: null,
    isAdmin: null,
    isSuperAdmin: null,
    phoneNumber: ""
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
