import { ref, reactive, computed } from 'vue';
import {
  chooseMedia,
  chooseMediaFromCamera,
  chooseMediaFromAlbum
} from '@/utils/wechat/media/choose.js';
import { getSettingScopes } from '@/utils/getSettingScope.js';

export default function useMedia(forms) {
  function ichooseMedia() {
    uni.showActionSheet({
      itemList: ['拍摄', '相册'],
      fail() {},
      success({ tapIndex }) {
        if (tapIndex === 0) {
          return ichooseMediaFromCamera();
        }

        // 从相册中选择
        return ichooseMediaFromAlbum();
      }
    });
  }

  function ipreviewMedia(e) {
    console.log(e);
  }
  function idelMedia([type, index]) {
    console.log('del', type, index);
    if (type === 'video') {
      forms.videos.length = 0; // 删除唯一的视频
      return;
    }
    forms.images.splice(index, 1);
  }

  function ichooseMediaFromCamera() {
    return getSettingScopes(['camera', 'record'])
      .then(res => {
        /* 只允许拍摄图片或视频 */
        return chooseMediaFromCamera({ count: 1 });
      })
      .then(res => {
        console.log(res);
      })
      .catch(console.log);
  }

  function ichooseMediaFromAlbum() {
    // 从相册中选择
    return chooseMediaFromAlbum({
      count: 3
    })
      .then(res => {
        console.log(res);
      })
      .catch(console.log);
  }

  return {
    ichooseMedia,
    ipreviewMedia,
    idelMedia
  };
}
