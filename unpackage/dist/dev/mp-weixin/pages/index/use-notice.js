"use strict";
var common_vendor = require("../../common/vendor.js");
var api_apiIndex = require("../../api/api-index.js");
function useNotice() {
  const notices = common_vendor.ref([]);
  common_vendor.onLoad(() => {
    api_apiIndex.getNotices().then((res) => {
      notices.value = res.notices;
    });
  });
  return {
    notices
  };
}
exports.useNotice = useNotice;
