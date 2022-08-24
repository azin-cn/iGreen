"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "ITask",
  props: {
    tasks: {
      type: Array,
      default: () => []
    },
    taskIconClick: {
      type: Function,
      default: () => () => console.log("taskIconClick")
    }
  }
};
if (!Array) {
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  (_easycom_uni_collapse_item2 + _easycom_uni_collapse2)();
}
const _easycom_uni_collapse_item = () => "../../../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
if (!Math) {
  (_easycom_uni_collapse_item + _easycom_uni_collapse)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.tasks, (task, k0, i0) => {
      return {
        a: common_vendor.t(task.address),
        b: common_vendor.f(task.icons, (item, k1, i1) => {
          return {
            a: item.icon,
            b: common_vendor.n(item.icon),
            c: item.color,
            d: common_vendor.o(($event) => $props.taskIconClick(task.id, item.key), item.icon)
          };
        }),
        c: task.time,
        d: "463754f6-1-" + i0 + ",463754f6-0",
        e: common_vendor.p({
          title: task.time + " \xB7 " + task.employer,
          ["show-animation"]: true
        })
      };
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/Uniapp/project/iGreen/pages/index/components/ITask/index.vue"]]);
wx.createComponent(Component);
