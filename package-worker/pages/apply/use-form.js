import { redirectTo } from '@/utils/router';
import {
  hiddenLoading,
  showLoading,
  showSuccessToast
} from '@/utils/wechat/toast';
import { getLocation } from '@/utils/index.js';
import { submitApply } from '@/package-worker/api/index.js';

export default function useForm(userinfo, showMessage) {
  function submit() {
    checkForm()
      .then(() => {
        return submitApply(userinfo);
      })
      .then(() => {
        hiddenLoading(); // 不应放在finally处，toast和loading在模拟器上互相影响
        showSuccessToast({
          title: '申请成功'
        });
        // const timer = setTimeout(() => {
        //   redirectTo('/pages/index/index');
        //   clearTimeout(timer);
        // }, 1500);
      })
      .catch(e => {
        console.log(e);
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
        console.log(userinfo);
        const { username, phone, birth, gender, address } = userinfo;
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

  return {
    submit,
    checkForm
  };
}
