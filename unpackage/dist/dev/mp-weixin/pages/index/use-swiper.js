"use strict";
var common_vendor = require("../../common/vendor.js");
var api_apiIndex = require("../../api/api-index.js");
function useSwiper() {
  const list = common_vendor.ref([]);
  const filterStyle = common_vendor.ref({});
  common_vendor.onLoad(() => {
    api_apiIndex.getBanners().then((res) => {
      list.value = res.banners;
    });
  });
  function onImageLoadedError(e) {
    console.log("\u8F6E\u64AD\u56FE\u52A0\u8F7D\u5931\u8D25\uFF0C\u9519\u8BEF\u4FE1\u606F\uFF1A", e);
  }
  return {
    list,
    filterStyle,
    onImageLoadedError
  };
}
exports.useSwiper = useSwiper;
