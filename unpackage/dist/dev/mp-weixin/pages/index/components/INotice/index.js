"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "INotice",
  props: {
    notices: {
      type: Array,
      default: () => []
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.notices, (notice, k0, i0) => {
      return {
        a: common_vendor.t(notice),
        b: notice
      };
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-69498fe1"], ["__file", "D:/workspace/Uniapp/project/iGreen/pages/index/components/INotice/index.vue"]]);
wx.createComponent(Component);
