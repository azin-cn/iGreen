"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_file_upload = require("../../utils/file/upload.js");
var utils_index = require("../../utils/index.js");
var api_config = require("../../api/config.js");
var utils_wechat_toast = require("../../utils/wechat/toast.js");
function useForm(showMessage) {
  const sequence = ["phone", "username", "remarks"];
  const forms = common_vendor.reactive({
    phone: "",
    username: "",
    remarks: "",
    address: "",
    latitude: 0,
    longitude: 0,
    ordertime: "",
    images: [],
    videos: [],
    imageExts: [],
    videoExts: [],
    maxImageCount: 3,
    maxVideoCount: 1,
    maxDuration: 60
  });
  const formList = common_vendor.reactive([
    {
      label: "\u7535\u8BDD",
      required: true,
      value: "",
      placeholder: "\u8BF7\u8F93\u5165\u8054\u7CFB\u53F7\u7801\u4EE5\u4FBF\u6C9F\u901A",
      candidates: []
    },
    {
      label: "\u59D3\u540D",
      required: false,
      value: "",
      placeholder: "\u8BF7\u8F93\u5165\u59D3\u6C0F\u6216\u59D3\u540D",
      candidates: []
    },
    {
      label: "\u5907\u6CE8",
      required: false,
      value: "",
      placeholder: "\u53EF\u7B80\u5355\u5907\u6CE8\uFF0C\u5982\u7269\u54C1\u5927\u5C0F",
      candidates: []
    }
  ]);
  const backups = {
    images: null,
    videos: null
  };
  function iconClick() {
    common_vendor.index.chooseLocation({
      success({ address, latitude, longitude }) {
        forms.address = address;
        forms.latitude = latitude;
        forms.longitude = longitude;
      },
      fail() {
        console.log("map fail");
      }
    });
  }
  function submit() {
    checkForm().then(() => {
      utils_wechat_toast.showLoading();
      return processMedia();
    }).then(() => {
      console.log(forms, backups);
    }).then(() => {
      utils_wechat_toast.hiddenLoading();
      utils_wechat_toast.showSuccessToast({
        title: "\u9884\u7EA6\u6210\u529F"
      });
    }).catch((e) => {
      console.log(e);
      const { errMsg } = e;
      utils_wechat_toast.hiddenLoading();
      showMessage("error", typeof e === "string" || e instanceof Error ? e : errMsg.indexOf("uploadFile:fail") !== -1 ? errMsg : "\u7F51\u7EDC\u5F02\u5E38\uFF0C\u8BF7\u91CD\u65B0\u63D0\u4EA4\u6216\u4F7F\u7528\u7535\u8BDD\u8054\u7CFB");
    });
  }
  function checkForm() {
    sequence.forEach((key, index) => {
      forms[key] = formList[index]["value"].trim();
    });
    return Promise.resolve().then(() => {
      if (forms.phone) {
        return;
      }
      throw new Error("\u8054\u7CFB\u53F7\u7801\u4E3A\u7A7A");
    }).then(() => {
      if (forms.ordertime > Date.now() - 1 * 60 * 60 * 1e3) {
        return;
      }
      throw new Error("\u9884\u7EA6\u65F6\u95F4\u4E0D\u6B63\u786E\uFF0C\u70B9\u51FB\u65E5\u671F\u540E\u8BF7\u9009\u62E9\u65F6\u95F4");
    }).then(() => {
      if (forms.latitude && forms.longitude)
        return;
      return utils_index.getLocation();
    }).then(({ latitude, longitude } = {}) => {
      if (latitude && longitude) {
        forms.latitude = latitude;
        forms.longitude = longitude;
      }
    });
  }
  function processMedia() {
    return Promise.resolve().then(() => {
      const images = forms.images.map((image) => ({
        formName: "image",
        path: image
      }));
      if (!images.length)
        return "";
      return utils_file_upload.uploadFiles(api_config.MEDIA_URL, images, {
        header: {}
      });
    }).then((res = {}) => {
      resolveData(res, "image");
    }).then(() => {
      const videos = forms.videos.map((video) => ({
        formName: "image",
        path: video
      }));
      if (!videos.length)
        return;
      return utils_file_upload.uploadFiles(api_config.MEDIA_URL, videos, {
        header: {}
      });
    }).then((res = {}) => {
      resolveData(res, "video");
    });
  }
  function resolveData(res, type = "image") {
    var _a;
    console.log(res);
    const target = [];
    (_a = res.forEach) == null ? void 0 : _a.call(res, (r) => {
      const {
        code,
        msg,
        data: { url }
      } = JSON.parse(r.data);
      target.push(url || `\u4E0A\u4F20\u5931\u8D25\uFF0C${code}`);
    });
    type === "image" ? backups.images = target : backups.videos = target;
  }
  return {
    forms,
    formList,
    iconClick,
    submit,
    checkForm
  };
}
exports.useForm = useForm;
