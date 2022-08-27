import { getExtName, isPicture } from '../../file/format';
import { hiddenLoading, showErrorToast, showLoading } from '../toast';

export function compress(filePath, type = 'image', quality = 80) {
  return new Promise((resolve, reject) => {
    switch (type) {
      case 'image':
        uni.compressImage({
          src: filePath,
          quality: 80,
          success: resolve,
          fail: reject
        });
        break;
      case 'video':
        quality = quality >= 80 ? 'height' : quality >= 50 ? 'medium' : 'low';
        uni.compressVideo({
          src: filePath,
          quality,
          success: resolve,
          fail: reject
        });
        break;
    }
  });
}
export function compressMedia(files = []) {
  showLoading({
    title: '压缩中...'
  });
  const target = [];
  const exts = [];
  files.forEach((file, index) => {
    const comp = isPicture(file)
      ? compress(file, 'image')
      : compress(file, 'video');
    exts.push(getExtName(file));
    target.push(comp);
  });
  return Promise.all(target)
    .then(files => {
      hiddenLoading();
      // console.log(files);
      const values = files.map(
        ({ tempFilePath: path }) => path // compress压缩后的文件路径无后缀
      );
      return [
        values,
        exts
      ];
    })
    .catch(e => {
      showErrorToast({
        // 自动关闭Loading
        title: '压缩失败，重新选择'
      });
    });
}
