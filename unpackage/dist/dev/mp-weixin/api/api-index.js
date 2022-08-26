"use strict";
var backend_index = require("../backend/index.js");
function getBanners() {
  return backend_index.router(`/getBanners`);
}
function getNotices() {
  return backend_index.router("/getNotices");
}
function getBriefInfo() {
  return backend_index.router("/getBriefInfo");
}
function getNearbyInfo() {
  return backend_index.router("/getNearbyInfo");
}
function getStoreMarkers() {
  return backend_index.router("/getMarkers");
}
function getEmployeeTasks(id) {
  return backend_index.router(`/getEmployeeTasks`, {
    data: {
      id
    }
  });
}
exports.getBanners = getBanners;
exports.getBriefInfo = getBriefInfo;
exports.getEmployeeTasks = getEmployeeTasks;
exports.getNearbyInfo = getNearbyInfo;
exports.getNotices = getNotices;
exports.getStoreMarkers = getStoreMarkers;
