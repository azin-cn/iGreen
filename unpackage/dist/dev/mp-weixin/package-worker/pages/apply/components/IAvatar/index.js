"use strict";
var common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = {
  name: "IAvatar",
  props: {
    src: {
      type: String,
      default: ""
    }
  },
  computed: {
    disabledSelection() {
      return !!this.src;
    }
  },
  emits: ["chooseMedia", "previewMedia", "delMedia"],
  methods: {
    chooseMedia(e) {
      if (!this.disabledSelection) {
        this.$emit("chooseMedia", e);
      }
    },
    previewMedia(e) {
      this.$emit("previewMedia", e);
    },
    delMedia(...args) {
      this.$emit("delMedia", args);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($props.src ? 1 : 0),
    b: common_vendor.t(1),
    c: $options.disabledSelection ? "" : "bg-hover-light",
    d: $options.disabledSelection ? "#ccc" : "#777777",
    e: common_vendor.o((...args) => $options.chooseMedia && $options.chooseMedia(...args)),
    f: $props.src
  }, $props.src ? {
    g: common_vendor.o(($event) => $options.delMedia("image", _ctx.index)),
    h: $props.src
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-79e37d44"], ["__file", "D:/workspace/Uniapp/project/iGreen/package-worker/pages/apply/components/IAvatar/index.vue"]]);
wx.createComponent(Component);
