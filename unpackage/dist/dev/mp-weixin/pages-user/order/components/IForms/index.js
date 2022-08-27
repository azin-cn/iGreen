"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "IForms",
  props: {
    forms: {
      type: Object,
      default: () => ({})
    },
    formList: {
      type: Array,
      default: () => []
    }
  },
  emits: ["mapIconClick"],
  methods: {
    mapIconClick() {
      this.$emit("mapIconClick");
    }
  }
};
if (!Array) {
  const _easycom_uni_combox2 = common_vendor.resolveComponent("uni-combox");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_combox2 + _easycom_uni_forms_item2 + _easycom_uni_easyinput2 + _easycom_uni_section2 + _easycom_uni_datetime_picker2 + _easycom_uni_forms2)();
}
const _easycom_uni_combox = () => "../../../../uni_modules/uni-combox/components/uni-combox/uni-combox.js";
const _easycom_uni_forms_item = () => "../../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_easyinput = () => "../../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_section = () => "../../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_datetime_picker = () => "../../../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_forms = () => "../../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_combox + _easycom_uni_forms_item + _easycom_uni_easyinput + _easycom_uni_section + _easycom_uni_datetime_picker + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.formList, (item, index, i0) => {
      return {
        a: "775f489c-3-" + i0 + "," + ("775f489c-2-" + i0),
        b: common_vendor.o(($event) => item.value = $event),
        c: common_vendor.p({
          candidates: item.candidates,
          placeholder: item.placeholder,
          modelValue: item.value
        }),
        d: item.label,
        e: "775f489c-2-" + i0 + ",775f489c-1",
        f: common_vendor.p({
          label: item.label,
          required: item.required
        })
      };
    }),
    b: common_vendor.o($options.mapIconClick),
    c: common_vendor.o(($event) => $props.forms.address = $event),
    d: common_vendor.p({
      suffixIcon: "map-pin-ellipse",
      placeholderStyle: "font-size: 30rpx; color: #919191",
      placeholder: "\u7B80\u7565\u4F4D\u7F6E\u5373\u53EF",
      modelValue: $props.forms.address
    }),
    e: common_vendor.p({
      label: "\u4F4D\u7F6E"
    }),
    f: common_vendor.p({
      title: "\u8054\u7CFB\u4FE1\u606F",
      type: "line"
    }),
    g: common_vendor.o(($event) => $props.forms.ordertime = $event),
    h: common_vendor.p({
      type: "datetime",
      ["return-type"]: "timestamp",
      modelValue: $props.forms.ordertime
    }),
    i: common_vendor.p({
      required: true
    }),
    j: common_vendor.p({
      title: "\u9884\u7EA6\u65F6\u95F4",
      type: "line"
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/Uniapp/project/iGreen/pages-user/order/components/IForms/index.vue"]]);
wx.createComponent(Component);
