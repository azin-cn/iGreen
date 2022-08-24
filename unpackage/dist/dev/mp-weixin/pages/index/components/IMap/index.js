"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "IExtension",
  props: {
    navigateToMap: {
      type: Function,
      default: () => () => console.log("navigateToMap")
    },
    moveToLocation: {
      type: Function,
      default: () => () => console.log("moveToLocation")
    },
    markers: {
      type: Array,
      default: () => []
    },
    points: {
      type: Array,
      default: () => []
    },
    markertap: {
      type: Function,
      default: () => () => console.log("markertap")
    }
  },
  onLoad() {
    getApp().globalData.MapContext = common_vendor.index.createMapContext("map", this);
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $props.navigateToMap && $props.navigateToMap(...args)),
    b: common_vendor.o((...args) => $props.moveToLocation && $props.moveToLocation(...args)),
    c: $props.markers,
    d: $props.points,
    e: common_vendor.o((...args) => $props.markertap && $props.markertap(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/Uniapp/project/iGreen/pages/index/components/IMap/index.vue"]]);
wx.createComponent(Component);
