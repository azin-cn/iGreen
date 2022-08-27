"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "ISelectMedia",
  props: {
    title: {
      type: String,
      default: "\u56FE\u7247\u89C6\u9891"
    },
    images: {
      type: Array,
      default: () => []
    },
    videos: {
      type: Array,
      default: () => []
    },
    maxImageCount: {
      type: Number,
      default: 3
    },
    maxVideoCount: {
      type: Number,
      default: 1
    }
  },
  computed: {
    disabledSelection() {
      return this.images.length === this.maxImageCount && this.videos.length === this.maxVideoCount;
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
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  _easycom_uni_section2();
}
const _easycom_uni_section = () => "../../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  _easycom_uni_section();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($props.images.length),
    b: common_vendor.t($props.maxImageCount),
    c: common_vendor.t($props.videos.length),
    d: common_vendor.t($props.maxVideoCount),
    e: $options.disabledSelection ? "" : "bg-hover-light",
    f: $options.disabledSelection ? "#ccc" : "",
    g: common_vendor.o((...args) => $options.chooseMedia && $options.chooseMedia(...args)),
    h: $props.images.length
  }, $props.images.length ? {
    i: common_vendor.f($props.images, (item, index, i0) => {
      return {
        a: common_vendor.o(($event) => $options.delMedia("image", index)),
        b: item,
        c: item
      };
    })
  } : {}, {
    j: $props.videos.length
  }, $props.videos.length ? {
    k: common_vendor.o(($event) => $options.delMedia("video")),
    l: $props.videos[0]
  } : {}, {
    m: common_vendor.p({
      title: $props.title,
      type: "line"
    })
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f14a0c9e"], ["__file", "D:/workspace/Uniapp/project/iGreen/pages/order/components/ISelectMedia/index.vue"]]);
wx.createComponent(Component);
