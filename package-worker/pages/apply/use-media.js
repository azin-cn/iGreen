import { chooseImage } from '@/utils/wechat/media/choose.js';

export default function useMedia(userinfo) {
  function ichooseImage() {
    return chooseImage({
      count: 1
    }).then(res => {
      console.log(res);
      const { tempFiles = [] } = res;
      const { tempFilePath } = tempFiles[0] || {};
      if (tempFilePath) {
        userinfo.avatar = tempFilePath;
        console.log(tempFilePath);
      }
    });
  }

  function idelImage() {
    return new Promise.resolve((userinfo.avatar = ''));
  }

  return {
    ichooseImage,
    idelImage
  };
}
