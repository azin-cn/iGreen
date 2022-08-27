"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "uniCombox",
  emits: ["input", "update:modelValue"],
  props: {
    border: {
      type: Boolean,
      default: true
    },
    label: {
      type: String,
      default: ""
    },
    labelWidth: {
      type: String,
      default: "auto"
    },
    placeholder: {
      type: String,
      default: ""
    },
    candidates: {
      type: Array,
      default() {
        return [];
      }
    },
    emptyTips: {
      type: String,
      default: "\u62B1\u6B49\uFF0C\u6682\u65E0\u5339\u914D"
    },
    modelValue: {
      type: [String, Number],
      default: ""
    }
  },
  data() {
    return {
      showSelector: false,
      inputVal: ""
    };
  },
  computed: {
    labelStyle() {
      if (this.labelWidth === "auto") {
        return "";
      }
      return `width: ${this.labelWidth}`;
    },
    filterCandidates() {
      return this.candidates.filter((item) => {
        return item.toString().indexOf(this.inputVal) > -1;
      });
    },
    showEmptyTips() {
      return this.filterCandidates.length === 0;
    }
  },
  watch: {
    modelValue: {
      handler(newVal) {
        this.inputVal = newVal;
      },
      immediate: true
    }
  },
  methods: {
    toggleSelector() {
      this.showSelector = !this.showSelector;
    },
    onFocus() {
      this.showSelector = this.candidates.length && this.emptyTips.length;
    },
    onBlur() {
      setTimeout(() => {
        this.showSelector = false;
      }, 153);
    },
    onSelectorClick(index) {
      this.inputVal = this.filterCandidates[index];
      this.showSelector = false;
      this.$emit("input", this.inputVal);
      this.$emit("update:modelValue", this.inputVal);
    },
    onInput() {
      setTimeout(() => {
        this.$emit("input", this.inputVal);
        this.$emit("update:modelValue", this.inputVal);
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.label
  }, $props.label ? {
    b: common_vendor.t($props.label),
    c: common_vendor.s($options.labelStyle)
  } : {}, {
    d: $props.placeholder,
    e: common_vendor.o([($event) => $data.inputVal = $event.detail.value, (...args) => $options.onInput && $options.onInput(...args)]),
    f: common_vendor.o((...args) => $options.onFocus && $options.onFocus(...args)),
    g: common_vendor.o((...args) => $options.onBlur && $options.onBlur(...args)),
    h: $data.inputVal,
    i: common_vendor.p({
      type: $data.showSelector ? "top" : "bottom",
      size: "14",
      color: "#999"
    }),
    j: common_vendor.o((...args) => $options.toggleSelector && $options.toggleSelector(...args)),
    k: $data.showSelector
  }, $data.showSelector ? common_vendor.e({
    l: $options.showEmptyTips
  }, $options.showEmptyTips ? {
    m: common_vendor.t($props.emptyTips)
  } : {}, {
    n: common_vendor.f($options.filterCandidates, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index,
        c: common_vendor.o(($event) => $options.onSelectorClick(index))
      };
    })
  }) : {}, {
    o: common_vendor.n($props.border ? "" : "uni-combox__no-border")
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-06b292c9"], ["__file", "D:/workspace/Uniapp/project/iGreen/uni_modules/uni-combox/components/uni-combox/uni-combox.vue"]]);
wx.createComponent(Component);
