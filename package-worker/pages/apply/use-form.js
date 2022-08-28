import { redirectTo } from '@/utils/router';
import {
  hiddenLoading,
  showLoading,
  showSuccessToast
} from '@/utils/wechat/toast';
import { getLocation } from '@/utils/index.js';
import { submitApply } from '@/package-worker/api/index.js';
import upload, { uploadFiles } from '../../../utils/file/upload';
import { MEDIA_URL } from '../../../api/config';

export default function useForm(userinfo, backups, showMessage) {
  function submit() {
    showLoading();
    checkForm()
      .then(() => {
        // 上传头像
        return processMedia();
      })
      .then(() => {
        // 去除响应式收集依赖，网络地址覆盖本地地址
        return submitApply({ ...userinfo, avatar: backups.avatar });
      })
      .then(() => {
        hiddenLoading(); // 不应放在finally处，toast和loading在模拟器上互相影响
        showSuccessToast({
          title: '申请成功'
        });
        const timer = setTimeout(() => {
          redirectTo('/pages/index/index');
          clearTimeout(timer);
        }, 1500);
      })
      .catch(e => {
        const { errMsg } = e;
        hiddenLoading();
        showMessage(
          'error',
          typeof e === 'string' || e instanceof Error
            ? e
            : errMsg?.indexOf('uploadFile:fail') !== -1
            ? errMsg
            : '网络异常，请重新提交或使用电话联系'
        );
      });
  }

  function checkForm() {
    return Promise.resolve()
      .then(() => {
        // 在easy-input组件中，默认去除trim
        const { username, phone, birth, gender, address, avatar } = userinfo;
        if (!username) {
          throw new Error('姓名未填写');
        }
        if (!phone) {
          throw new Error('联系方式未填写');
        }
        if (!gender) {
          throw new Error('性别未填写');
        }
        if (!birth || birth > Date.now()) {
          throw new Error('出生年月不正确');
        }
        if (!address) {
          throw new Error('地址未填写');
        }
        if (!avatar) {
          throw new Error('未选择头像');
        }
      })
      .then(() => {
        // 检查经纬度是否存在，如果不存在经纬度，则获取当前的位置
        if (userinfo.latitude && userinfo.longitude) return;
        return getLocation();
      })
      .then(({ latitude, longitude } = {}) => {
        if (latitude && longitude) {
          userinfo.latitude = latitude;
          userinfo.longitude = longitude;
        }
      });
  }

  function processMedia() {
    return uploadFiles(MEDIA_URL, [
      { formName: 'image', path: userinfo.avatar }
    ]).then(res => {
      console.log(res);
      const {
        code,
        msg,
        data: { url }
      } = JSON.parse(res[0].data);
      backups.avatar = url;
    });
  }

  return {
    submit,
    checkForm
  };
}
