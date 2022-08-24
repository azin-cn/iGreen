"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("../../common/vendor.js");
var utils_index = require("../../utils/index.js");
var utils_getSettingScope = require("../../utils/getSettingScope.js");
var api_apiIndex = require("../../api/api-index.js");
function useLocation() {
  const MapContext = common_vendor.ref(null);
  const markers = common_vendor.ref([]);
  const targetPos = {
    latitude: 39.92,
    longitude: 116.46,
    address: "\u5317\u4EAC\u5E02"
  };
  const points = common_vendor.ref([]);
  function navigateToMap() {
    console.log("navigateToMap");
    utils_getSettingScope.getUserLocationScope().then(() => {
      utils_index.openLocation(targetPos.latitude, targetPos.longitude, {
        address: "\u76EE\u7684\u5730"
      });
    });
  }
  function moveToLocation(lat, lon) {
    console.log("moveToLocation");
    utils_getSettingScope.getUserLocationScope().then(() => {
      lat && lon ? MapContext.value.moveToLocation(lat, lon) : MapContext.value.moveToLocation();
    }).catch(console.log);
  }
  function markertap(e) {
    const {
      markerId
    } = e;
    const marker = markers.value.filter((marker2) => {
      const flag = marker2.id === markerId;
      marker2.iconPath = flag ? "/static/images/selected.png" : "/static/images/destination.png";
      return flag;
    })[0];
    targetPos.latitude = marker.latitude;
    targetPos.longitude = marker.longitude;
  }
  const p1 = utils_getSettingScope.getUserLocationScope().then(utils_index.getLocation).then((res) => {
    targetPos.latitude = res.latitude;
    targetPos.longitude = res.longitude;
  }).catch(console.log);
  const p2 = api_apiIndex.getStoreMarkers().then((res) => {
    const target = res.markers.map((marker) => __spreadProps(__spreadValues({}, marker), {
      id: 1e4 * Math.random(),
      width: 40,
      height: 40,
      iconPath: "/static/images/destination.png"
    }));
    markers.value = target;
    MapContext.value.includePoints({
      points: target,
      padding: [80, 80, 80, 80]
    });
  });
  common_vendor.onLoad(async () => {
    await common_vendor.nextTick();
    MapContext.value = getApp().globalData.MapContext;
    Promise.allSettled([p1, p2]);
  });
  return {
    markers,
    targetPos,
    points,
    navigateToMap,
    moveToLocation,
    markertap
  };
}
exports.useLocation = useLocation;
