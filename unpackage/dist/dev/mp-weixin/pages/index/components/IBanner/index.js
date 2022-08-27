"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "IBanner",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    filterStyle: {
      type: Object,
      default: () => null
    }
  },
  emits: ["error"],
  methods: {
    onError(e) {
      this.$emit("error", e);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.list, (item, k0, i0) => {
      return {
        a: item,
        b: item
      };
    }),
    b: common_vendor.o((...args) => $options.onError && $options.onError(...args)),
    c: common_vendor.s($props.filterStyle)
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2e5fc196"], ["__file", "D:/workspace/Uniapp/project/iGreen/pages/index/components/IBanner/index.vue"]]);
wx.createComponent(Component);
