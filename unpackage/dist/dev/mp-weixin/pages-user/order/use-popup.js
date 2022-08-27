"use strict";
var common_vendor = require("../../common/vendor.js");
function usePopup() {
  const popupRef = common_vendor.ref(null);
  const popup = common_vendor.ref({
    type: "error",
    message: "\u51FA\u73B0\u9519\u8BEF",
    duration: 2e3
  });
  function showMessage(type, message, duration = 2e3) {
    type = type || popup.value.type;
    message = message || popup.value.message;
    duration = duration || popup.value.duration;
    popup.value = {
      type,
      message,
      duration
    };
    popupRef.value.open();
  }
  return {
    popupRef,
    popup,
    showMessage
  };
}
exports.usePopup = usePopup;
