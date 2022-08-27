"use strict";
var common_vendor = require("../../common/vendor.js");
var api_apiIndex = require("../../api/api-index.js");
function useNearByInfo() {
  const nearbyRecycleList = common_vendor.ref([]);
  common_vendor.onLoad(() => {
    api_apiIndex.getNearbyInfo().then((res) => {
      nearbyRecycleList.value = res.nearbyRecycleList;
    });
  });
  return {
    nearbyRecycleList
  };
}
exports.useNearByInfo = useNearByInfo;
