import { ref, reactive } from 'vue';
import { uploadFiles } from '@/utils/file/upload.js';
import { getUserLocationScope } from '@/utils/getSettingScope';
import { getLocation } from '@/utils/index.js';
import { submitOrder } from '../../api';
import { redirectTo } from '@/utils/router';
import {
  hiddenLoading,
  showLoading,
  showSuccessToast
} from '@/utils/wechat/toast';
import { MEDIA_URL } from '@/api/config';
export default function useForm(showMessage) {
  const sequence = ['phone', 'username', 'remarks'];

  const forms = reactive({
    phone: '',
    username: '',
    remarks: '',
    address: '',
    latitude: 0,
    longitude: 0,
    ordertime: '',
    images: [],
    videos: [],
    imageExts: [],
    videoExts: [],
    maxImageCount: 3,
    maxVideoCount: 1,
    maxDuration: 60
  });
  const formList = reactive([
    {
      label: '电话',
      required: true,
      value: '',
      placeholder: '请输入联系号码以便沟通',
      candidates: []
    },
    {
      label: '姓名',
      required: false,
      value: '',
      placeholder: '请输入姓氏或姓名',
      candidates: []
    },
    {
      label: '备注',
      required: false,
      value: '',
      placeholder: '可简单备注，如物品大小',
      candidates: []
    }
  ]);

  const backups = {
    images: null,
    videos: null
  };

  // location icon
  function iconClick() {
    uni.chooseLocation({
      success({ address, latitude, longitude }) {
        forms.address = address;
        forms.latitude = latitude;
        forms.longitude = longitude;
      },
      fail() {
        console.log('map fail');
      }
    });
  }

  function submit() {
    checkForm()
      .then(() => {
        showLoading();
        return processMedia();
      })
      .then(() => {
        // 提交forms数据，将backups中图片和视频的网络地址复制到forms中
        console.log(forms, backups);

        return submitOrder({
          ...forms, // images、videos的本地地址
          ...backups // images、videos的网络地址
        });
      })
      .then(() => {
        hiddenLoading(); // 不应放在finally处，toast和loading在模拟器上互相影响
        showSuccessToast({
          title: '预约成功'
        });
        const timer = setTimeout(() => {
          redirectTo('/pages/index/index');
          clearTimeout(timer);
        }, 1500);
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
    sequence.forEach((key, index) => {
      forms[key] = formList[index]['value'].trim();
    });
    return Promise.resolve()
      .then(() => {
        if (forms.phone) {
          return;
        }
        throw new Error('联系号码为空');
      })
      .then(() => {
        if (forms.ordertime > Date.now() - 1 * 60 * 60 * 1000) {
          return;
        }
        throw new Error('预约时间不正确，点击日期后请选择时间');
      })
      .then(() => {
        // 检查经纬度是否存在，如果不存在经纬度，则获取当前的位置
        if (forms.latitude && forms.longitude) return;
        return getLocation();
      })
      .then(({ latitude, longitude } = {}) => {
        if (latitude && longitude) {
          forms.latitude = latitude;
          forms.longitude = longitude;
        }
      });
  }

  function processMedia() {
    return Promise.resolve()
      .then(() => {
        // 提交图片地址，如果提交不成功，需要保存
        const images = forms.images.map(image => ({
          formName: 'image',
          path: image
        }));
        if (!images.length) return '';
        return uploadFiles(MEDIA_URL, images, {
          header: {}
        });
      })
      .then((res = {}) => {
        // 处理图片地址
        resolveData(res, 'image');
      })
      .then(() => {
        // 提交视频地址
        const videos = forms.videos.map(video => ({
          formName: 'image',
          path: video
        }));
        if (!videos.length) return;
        return uploadFiles(MEDIA_URL, videos, {
          header: {}
        });
      })
      .then((res = {}) => {
        // 处理视频地址
        // console.log(res);
        resolveData(res, 'video');
      });
  }

  function resolveData(res, type = 'image') {
    console.log(res);
    const target = [];
    res.forEach?.(r => {
      const {
        code,
        msg,
        data: { url }
      } = r;
      target.push(url || `上传失败，${code}`);
    });
    type === 'image' ? (backups.images = target) : (backups.videos = target);
  }

  return {
    forms,
    formList,
    iconClick,
    submit,
    checkForm
  };
}
