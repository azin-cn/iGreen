"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_index = require("../../utils/index.js");
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
    images: [
      "/static/images/Screenshot_2022-08-20-21-46-38-725_com.tencent.mm.jpg",
      "/static/images/bg-logo.jpg",
      "/static/images/recycle.jpg"
    ],
    videos: [
      "https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4"
    ],
    maxImageCount: 3,
    maxVideoCount: 1
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
      console.log(forms);
    }).catch((msg) => {
      showMessage("error", msg);
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
    }).then(({ latitude, longitude }) => {
      if (latitude && longitude) {
        forms.latitude = latitude;
        forms.longitude = longitude;
      }
    });
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
