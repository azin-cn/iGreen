"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "IBriefInfo",
  props: {
    recycleBriefInfo: {
      type: Array,
      default: () => []
    },
    onRefresh: {
      type: Function,
      default: () => console.log("onRefresh")
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $props.onRefresh && $props.onRefresh(...args)),
    b: common_vendor.f($props.recycleBriefInfo, (item, k0, i0) => {
      return {
        a: common_vendor.n(item.icon),
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.count),
        d: common_vendor.t(item.unit),
        e: item.icon,
        f: item.color,
        g: item.bg
      };
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/Uniapp/project/iGreen/pages/index/components/IBriefInfo/index.vue"]]);
wx.createComponent(Component);
