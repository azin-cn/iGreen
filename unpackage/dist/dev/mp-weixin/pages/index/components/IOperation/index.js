"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "IOperation",
  props: {
    title: {
      type: String,
      default: "\u56DE\u6536\u9884\u7EA6"
    },
    nearbyRecycleList: {
      type: Array,
      default: () => []
    },
    orderOperation: {
      type: Array,
      default: () => []
    },
    operationClick: {
      type: Function,
      default: () => () => console.log("operationClick")
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.title),
    b: common_vendor.f($props.nearbyRecycleList, (item, k0, i0) => {
      return {
        a: item,
        b: item
      };
    }),
    c: common_vendor.f($props.orderOperation, (item, k0, i0) => {
      return {
        a: common_vendor.n(item.icon),
        b: common_vendor.t(item.name),
        c: item.icon,
        d: item.color,
        e: item.bg,
        f: common_vendor.o(($event) => $props.operationClick(item.key), item.icon)
      };
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/Uniapp/project/iGreen/pages/index/components/IOperation/index.vue"]]);
wx.createComponent(Component);
