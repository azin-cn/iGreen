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
        ? chooseMediaFromCamera({ count: 1 })
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
    // 只允许视频，可以多一层if保证条件成立
    if (videos.length < maxVideoCount) {
      return type === 'camera'
        ? chooseVideoFromCamera({ count: 1 })
        : chooseVideoFromAlbum({ count: maxVideoCount - videos.length });
    }
  }

  function processMediaPath(res) {
    return Promise.resolve().then(() => {
      // 通过后缀名判断是否为图片，如果选择四个图片，保留前三个
      console.log(res);
      const { tempFiles } = res;
      const images = [],
        videos = [];
      // 分类
      tempFiles.forEach(({ tempFilePath: path }) => {
        isPicture(path) ? images.push(path) : videos.push(path);
      });

      if (images.length && videos.length) {
        return compressMedia(images)
          .then(([values, exts]) => {
            // console.log(res);
            correct(values, exts, 'image');
          })
          .then(() => {
            return compressMedia(videos);
          })
          .then(([values, exts]) => {
            correct(values, exts, 'video');
          });
      }

      if (images.length) {
        return compressMedia(images).then(([values, exts]) => {
          // 保证截取
          // console.log(res);
          correct(values, exts, 'image');
        });
      }

      if (videos.length) {
        return compressMedia(videos).then(([values, exts]) => {
          // 保证截取
          correct(values, exts, 'video');
        });
      }
    });
  }

  function correct(values, exts, type = 'image') {
    console.log(forms.images, forms.videos);
    const max = type === 'image' ? forms.maxImageCount : forms.maxVideoCount;
    const ins = type === 'image' ? 'images' : 'videos';
    const ext = type === 'image' ? 'imageExts' : 'videoExts';
    forms[ins] = [...forms[ins], ...values];
    forms[ext] = [...forms[ext], ...exts];
    // 保证截取
    forms[ins].length = Math.min(forms[ins].length, max);
    forms[ext].length = Math.min(forms[ext].length, max);

    // 检查数据
    console.log(forms.images, forms.imageExts, forms.videos, forms.videoExts);
  }

  return {
    ichooseMedia,
    ipreviewMedia,
    idelMedia
  };
}
