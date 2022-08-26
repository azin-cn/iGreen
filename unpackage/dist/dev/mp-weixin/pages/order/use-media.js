"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_wechat_media_choose = require("../../utils/wechat/media/choose.js");
var utils_getSettingScope = require("../../utils/getSettingScope.js");
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
      return utils_wechat_media_choose.chooseMediaFromCamera({ count: 1 });
    }).then((res) => {
      console.log(res);
    }).catch(console.log);
  }
  function ichooseMediaFromAlbum() {
    return utils_wechat_media_choose.chooseMediaFromAlbum({
      count: 3
    }).then((res) => {
      console.log(res);
    }).catch(console.log);
  }
  return {
    ichooseMedia,
    ipreviewMedia,
    idelMedia
  };
}
exports.useMedia = useMedia;
