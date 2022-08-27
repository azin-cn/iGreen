"use strict";
var common_vendor = require("../../../common/vendor.js");
var utils_file_format = require("../../file/format.js");
var utils_wechat_toast = require("../toast.js");
function compress(filePath, type = "image", quality = 80) {
  return new Promise((resolve, reject) => {
    switch (type) {
      case "image":
        common_vendor.index.compressImage({
          src: filePath,
          quality: 80,
          success: resolve,
          fail: reject
        });
        break;
      case "video":
        quality = quality >= 80 ? "height" : quality >= 50 ? "medium" : "low";
        common_vendor.index.compressVideo({
          src: filePath,
          quality,
          success: resolve,
          fail: reject
        });
        break;
    }
  });
}
function compressMedia(files = []) {
  utils_wechat_toast.showLoading({
    title: "\u538B\u7F29\u4E2D..."
  });
  const target = [];
  const exts = [];
  files.forEach((file, index) => {
    const comp = utils_file_format.isPicture(file) ? compress(file, "image") : compress(file, "video");
    exts.push(utils_file_format.getExtName(file));
    target.push(comp);
  });
  return Promise.all(target).then((files2) => {
    utils_wechat_toast.hiddenLoading();
    const values = files2.map(({ tempFilePath: path }) => path);
    return [
      values,
      exts
    ];
  }).catch((e) => {
    utils_wechat_toast.showErrorToast({
      title: "\u538B\u7F29\u5931\u8D25\uFF0C\u91CD\u65B0\u9009\u62E9"
    });
  });
}
exports.compressMedia = compressMedia;
