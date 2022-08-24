"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_index = require("../../utils/index.js");
function useOpeartion() {
  const {
    isWorker,
    phoneNumber
  } = getApp().globalData;
  const orderOperation = common_vendor.computed$1(() => {
    return isWorker.value ? [{
      name: "\u5DE5\u4F5C\u53F0\u9762",
      key: "__work__",
      icon: "icon-gongzuotai-daikexiadan",
      color: "#07AF72",
      bg: "#DCF7E1"
    }, {
      name: "\u8BE6\u7EC6\u4FE1\u606F",
      key: "__detail__",
      icon: "icon-yuyuejilu",
      color: "#FBAA01",
      bg: "#FEF1C7"
    }] : [
      {
        name: "\u5728\u7EBF\u9884\u7EA6",
        key: "__online__",
        icon: "icon-gongzuotai-daikexiadan",
        color: "#07AF72",
        bg: "#DCF7E1"
      },
      {
        name: "\u7535\u8BDD\u9884\u7EA6",
        key: "__phone__",
        icon: "icon-dianhuatianchong",
        color: "#FBAA01",
        bg: "#FEF1C7"
      }
    ];
  });
  function operationClick(key) {
    console.log("operationClick");
    switch (key) {
      case "__online__":
        console.log("__online__page");
        break;
      case "__phone__":
        utils_index.makePhoneCall(phoneNumber.value);
        break;
      case "__work__":
        console.log("__work__");
        break;
      case "__detail__":
        console.log("__detail__");
        break;
    }
  }
  return {
    orderOperation,
    operationClick
  };
}
exports.useOpeartion = useOpeartion;
