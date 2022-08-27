"use strict";
var common_vendor = require("../../common/vendor.js");
var pagesUser_order_useForm = require("./use-form.js");
var pagesUser_order_useMedia = require("./use-media.js");
var pagesUser_order_usePopup = require("./use-popup.js");
require("../../utils/index.js");
require("../../utils/getSettingScope.js");
require("../../utils/wechat/media/choose.js");
require("../../utils/file/format.js");
if (!Array) {
  const _component_uni_section = common_vendor.resolveComponent("uni-section");
  const _component_uni_popup_message = common_vendor.resolveComponent("uni-popup-message");
  const _component_uni_popup = common_vendor.resolveComponent("uni-popup");
  (_component_uni_section + _component_uni_popup_message + _component_uni_popup)();
}
if (!Math) {
  (common_vendor.unref(IForms) + common_vendor.unref(ISelectMedia))();
}
const IForms = () => "./components/IForms/index.js";
const ISelectMedia = () => "./components/ISelectMedia/index.js";
const __default__ = {
  name: "Order"
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  setup(__props) {
    const { popupRef, popup, showMessage } = pagesUser_order_usePopup.usePopup();
    const { formList, forms, iconClick, submit, checkForm } = pagesUser_order_useForm.useForm(showMessage);
    const { ichooseMedia, ipreviewMedia, idelMedia } = pagesUser_order_useMedia.useMedia(forms);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(new Date().toLocaleString()),
        b: common_vendor.o(common_vendor.unref(iconClick)),
        c: common_vendor.p({
          forms: common_vendor.unref(forms),
          formList: common_vendor.unref(formList)
        }),
        d: common_vendor.o(common_vendor.unref(ichooseMedia)),
        e: common_vendor.o(common_vendor.unref(idelMedia)),
        f: common_vendor.p({
          images: common_vendor.unref(forms).images,
          videos: common_vendor.unref(forms).videos,
          maxImageCount: common_vendor.unref(forms).maxImageCount,
          maxVideoCount: common_vendor.unref(forms).maxVideoCount
        }),
        g: common_vendor.o((...args) => common_vendor.unref(submit) && common_vendor.unref(submit)(...args)),
        h: common_vendor.p({
          title: "\u9884\u7EA6\u63D0\u4EA4",
          type: "line"
        }),
        i: common_vendor.p({
          type: common_vendor.unref(popup).type,
          message: common_vendor.unref(popup).message,
          duration: common_vendor.unref(popup).duration
        }),
        j: common_vendor.sr(popupRef, "031394f8-3", {
          "k": "popupRef"
        }),
        k: common_vendor.p({
          type: "message"
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-031394f8"], ["__file", "D:/workspace/Uniapp/project/iGreen/pages-user/order/index.vue"]]);
wx.createPage(MiniProgramPage);
