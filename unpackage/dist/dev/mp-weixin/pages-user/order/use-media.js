"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_wechat_media_choose = require("../../utils/wechat/media/choose.js");
var utils_file_format = require("../../utils/file/format.js");
var utils_getSettingScope = require("../../utils/getSettingScope.js");
var utils_wechat_media_compress = require("../../utils/wechat/media/compress.js");
function useMedia(forms) {
  function ichooseMedia() {
    common_vendor.index.showActionSheet({
      itemList: ["\u62CD\u6444", "\u76F8\u518C"],
      fail() {
      },
      success({ tapIndex }) {
        if (tapIndex === 0) {
          return ichooseMediaFromCamera();
        }
        return ichooseMediaFromAlbum();
      }
    });
  }
  function ipreviewMedia(e) {
    console.log(e);
  }
  function idelMedia([type, index]) {
    console.log("del", type, index);
    if (type === "video") {
      forms.videos.length = 0;
      return;
    }
    forms.images.splice(index, 1);
  }
  function ichooseMediaFromCamera() {
    return utils_getSettingScope.getSettingScopes(["camera", "record"]).then((res) => {
      return processMediaSelect("camera");
    }).then((res) => {
      return processMediaPath(res);
    }).catch(console.log);
  }
  function ichooseMediaFromAlbum() {
    return processMediaSelect("album").then((res) => {
      return processMediaPath(res);
    }).catch(console.log);
  }
  function processMediaSelect(type = "camera") {
    const { images, videos, maxImageCount, maxVideoCount } = forms;
    if (images.length < maxImageCount && videos.length < maxVideoCount) {
      return type === "camera" ? utils_wechat_media_choose.chooseMediaFromCamera({ count: 1 }) : utils_wechat_media_choose.chooseMediaFromAlbum({
        count: maxImageCount - images.length + maxVideoCount - videos.length
      });
    }
    if (images.length < maxImageCount) {
      return type === "camera" ? utils_wechat_media_choose.chooseImageFromCamera({ count: 1 }) : utils_wechat_media_choose.chooseImageFromAlbum({ count: maxImageCount - images.length });
    }
    if (videos.length < maxVideoCount) {
      return type === "camera" ? utils_wechat_media_choose.chooseVideoFromCamera({ count: 1 }) : utils_wechat_media_choose.chooseVideoFromAlbum({ count: maxVideoCount - videos.length });
    }
  }
  function processMediaPath(res) {
    return Promise.resolve().then(() => {
      console.log(res);
      const { tempFiles } = res;
      const images = [], videos = [];
      tempFiles.forEach(({ tempFilePath: path }) => {
        utils_file_format.isPicture(path) ? images.push(path) : videos.push(path);
      });
      if (images.length && videos.length) {
        return utils_wechat_media_compress.compressMedia(images).then(([values, exts]) => {
          correct(values, exts, "image");
        }).then(() => {
          return utils_wechat_media_compress.compressMedia(videos);
        }).then(([values, exts]) => {
          correct(values, exts, "video");
        });
      }
      if (images.length) {
        return utils_wechat_media_compress.compressMedia(images).then(([values, exts]) => {
          correct(values, exts, "image");
        });
      }
      if (videos.length) {
        return utils_wechat_media_compress.compressMedia(videos).then(([values, exts]) => {
          correct(values, exts, "video");
        });
      }
    });
  }
  function correct(values, exts, type = "image") {
    const max = type === "image" ? forms.maxImageCount : forms.maxVideoCount;
    const ins = type === "image" ? "images" : "videos";
    const ext = type === "image" ? "imageExts" : "videoExts";
    forms[ins] = [forms[ins], ...values];
    forms[ext] = [forms[ext], ...exts];
    forms[ins].length = Math.min(forms[ins].length, max);
    forms[ext].length = Math.min(forms[ext].length, max);
  }
  return {
    ichooseMedia,
    ipreviewMedia,
    idelMedia
  };
}
exports.useMedia = useMedia;
