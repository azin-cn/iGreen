import { ref, reactive, computed } from 'vue';
import {
  chooseMedia,
  chooseMediaFromCamera,
  chooseMediaFromAlbum,
  chooseImageFromCamera,
  chooseImageFromAlbum,
  chooseVideoFromCamera,
  chooseVideoFromAlbum
} from '@/utils/wechat/media/choose.js';
import { isPicture } from '@/utils/file/format.js';
import { getSettingScopes } from '@/utils/getSettingScope.js';
import { compress, compressMedia } from '../../utils/wechat/media/compress';
import {
  hiddenLoading,
  showErrorToast,
  showLoading
} from '../../utils/wechat/toast';

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
        /* 拍摄图片或视频 */
        return processMediaSelect('camera');
      })
      .then(res => {
        return processMediaPath(res);
      })
      .catch(console.log);
  }

  function ichooseMediaFromAlbum() {
    // 从相册中选择
    return processMediaSelect('album')
      .then(res => {
        return processMediaPath(res);
      })
      .catch(console.log);
  }

  function processMediaSelect(type = 'camera') {
    const { images, videos, maxImageCount, maxVideoCount } = forms;
    // 允许照片或视频
    if (images.length < maxImageCount && videos.length < maxVideoCount) {
      return type === 'camera'
        ? chooseMediaFromCamera({ count: 1, maxDuration: forms.maxDuration })
        : chooseMediaFromAlbum({
            count: maxImageCount - images.length + maxVideoCount - videos.length
          });
    }
    // 只允许照片
    if (images.length < maxImageCount) {
      return type === 'camera'
        ? chooseImageFromCamera({ count: 1 })
        : chooseImageFromAlbum({ count: maxImageCount - images.length });
    }
    // 只允许视频
    if (videos.length < maxVideoCount) {
      return type === 'camera'
        ? chooseVideoFromCamera({ count: 1, maxDuration: forms.maxDuration })
        : chooseVideoFromAlbum({ count: maxVideoCount - videos.length });
    }
  }

  // compress分支具有压缩功能
  function processMediaPath(res) {
    return Promise.resolve().then(() => {
      // 通过后缀名判断是否为图片，如果选择四个图片，保留前三个
      // console.log(res);
      const { tempFiles } = res;
      const images = [],
        videos = [];
      let overflow = false;
      // 分类
      tempFiles.forEach(({ tempFilePath: path, duration = 0 }) => {
        isPicture(path)
          ? images.push(path)
          : duration > forms.maxDuration
          ? (overflow = true) // 超出60秒的视频过滤不添加
          : videos.push(path);
      });
      // 保证截取
      forms.images = [...forms.images, ...images];
      forms.videos = [...forms.videos, ...videos];
      forms.images.length = Math.min(forms.maxImageCount, forms.images.length);
      forms.videos.length = Math.min(forms.maxVideoCount, forms.videos.length);

      if (overflow) {
        showErrorToast({
          title: `限制${forms.maxDuration}秒`
        });
      }
    });
  }

  return {
    ichooseMedia,
    ipreviewMedia,
    idelMedia
  };
}
