"use strict";
function getExtName(file) {
  return file.substring(file.lastIndexOf(".") + 1);
}
function isPicture(file) {
  return [
    "png",
    "jpg",
    "jpeg",
    "jfif",
    "bmp",
    "gif",
    "webp",
    "psd",
    "svg",
    "tiff"
  ].includes(getExtName(file.toLowerCase()));
}
exports.isPicture = isPicture;
