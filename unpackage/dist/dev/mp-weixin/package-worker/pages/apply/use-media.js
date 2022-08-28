"use strict";
var utils_wechat_media_choose = require("../../../utils/wechat/media/choose.js");
function useMedia(userinfo) {
  function ichooseImage() {
    return utils_wechat_media_choose.chooseImage({
      count: 1
    }).then((res) => {
      const { tempFiles = [] } = res;
      const { tempFilePath } = tempFiles[0] || {};
      if (tempFilePath) {
        userinfo.avatar = tempFilePath;
      }
    });
  }
  function idelImage() {
    return new Promise.resolve(userinfo.avatar = "");
  }
  return {
    ichooseImage,
    idelImage
  };
}
exports.useMedia = useMedia;
