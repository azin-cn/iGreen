"use strict";
var common_vendor = require("../../../common/vendor.js");
var utils_index = require("../../../utils/index.js");
var packageWorker_pages_apply_usePopup = require("./use-popup.js");
var packageWorker_pages_apply_useForm = require("./use-form.js");
var packageWorker_pages_apply_useMedia = require("./use-media.js");
require("../../../utils/getSettingScope.js");
require("../../../utils/router/index.js");
require("../../../utils/wechat/toast.js");
require("../../api/index.js");
require("../../../utils/file/upload.js");
require("../../../api/config.js");
require("../../../utils/wechat/media/choose.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_checkbox2 + _easycom_uni_datetime_picker2 + _easycom_uni_forms2 + _easycom_uni_section2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_checkbox = () => "../../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_datetime_picker = () => "../../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_collapse_item = () => "../../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
const _easycom_uni_popup_message = () => "../../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_checkbox + _easycom_uni_datetime_picker + common_vendor.unref(IAvatar) + _easycom_uni_forms + _easycom_uni_section + _easycom_uni_collapse_item + _easycom_uni_collapse + _easycom_uni_popup_message + _easycom_uni_popup)();
}
const IAvatar = () => "./components/IAvatar/index.js";
const __default__ = {
  name: "ApplyWroker"
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  setup(__props) {
    const localdata = {
      bgImage: "/static/images/apply-bg.jpeg",
      radios: {
        genders: [
          {
            text: "\u7537",
            value: "\u7537"
          },
          {
            text: "\u5973",
            value: "\u5973"
          }
        ],
        marriage: [
          {
            text: "\u672A\u5A5A",
            value: "\u672A\u5A5A"
          },
          {
            text: "\u5DF2\u5A5A",
            value: "\u5DF2\u5A5A"
          },
          {
            text: "\u4FDD\u5BC6",
            value: "\u4FDD\u5BC6"
          }
        ]
      },
      members: {
        father: {
          key: "father",
          title: "\u7236\u4EB2",
          name: "\u8BF7\u8F93\u5165\u59D3\u540D",
          phone: "\u8BF7\u8F93\u5165\u8054\u7CFB\u53F7\u7801"
        },
        mother: {
          key: "mother",
          title: "\u6BCD\u4EB2",
          name: "\u8BF7\u8F93\u5165\u59D3\u540D",
          phone: "\u8BF7\u8F93\u5165\u8054\u7CFB\u53F7\u7801"
        }
      }
    };
    const userinfo = common_vendor.reactive({
      username: "",
      phone: "",
      gender: "",
      birth: "",
      address: "",
      latitude: 0,
      longitude: 0,
      avatar: "",
      members: {
        father: {
          name: "",
          phone: ""
        },
        mother: {
          name: "",
          phone: ""
        },
        children: []
      },
      marriage: "",
      introduction: ""
    });
    const backups = {
      avatar: ""
    };
    const { popupRef, popup, showMessage } = packageWorker_pages_apply_usePopup.usePopup();
    const { submit, checkForm } = packageWorker_pages_apply_useForm.useForm(userinfo, backups, showMessage);
    const { ichooseImage, idelImage } = packageWorker_pages_apply_useMedia.useMedia(userinfo);
    function mapIconClick(e) {
      utils_index.chooseLocation().then((res) => {
        const { address, latitude, longitude } = res;
        userinfo.address = address;
        userinfo.latitude = latitude;
        userinfo.longitude = longitude;
      });
    }
    return (_ctx, _cache) => {
      return {
        a: localdata.bgImage,
        b: common_vendor.o(($event) => userinfo.username = $event),
        c: common_vendor.p({
          trim: true,
          placeholder: "\u8BF7\u8F93\u5165\u59D3\u540D",
          modelValue: userinfo.username
        }),
        d: common_vendor.p({
          label: "\u59D3\u540D",
          required: true
        }),
        e: common_vendor.o(($event) => userinfo.phone = $event),
        f: common_vendor.p({
          trim: true,
          placeholder: "\u8BF7\u8F93\u5165\u8054\u7CFB\u53F7\u7801",
          modelValue: userinfo.phone
        }),
        g: common_vendor.p({
          label: "\u7535\u8BDD",
          required: true
        }),
        h: common_vendor.o(($event) => userinfo.gender = $event),
        i: common_vendor.p({
          localdata: localdata.radios.genders,
          modelValue: userinfo.gender
        }),
        j: common_vendor.p({
          label: "\u6027\u522B",
          required: true
        }),
        k: common_vendor.o(($event) => userinfo.birth = $event),
        l: common_vendor.p({
          type: "date",
          ["return-type"]: "timestamp",
          modelValue: userinfo.birth
        }),
        m: common_vendor.p({
          label: "\u51FA\u751F\u5E74\u6708",
          required: true
        }),
        n: common_vendor.o(mapIconClick),
        o: common_vendor.o(($event) => userinfo.address = $event),
        p: common_vendor.p({
          trim: true,
          suffixIcon: "map-pin-ellipse",
          placeholderStyle: "font-size: 30rpx; color: #919191",
          placeholder: "\u8BF7\u8F93\u5165\u5BB6\u5EAD\u4F4F\u5740",
          modelValue: userinfo.address
        }),
        q: common_vendor.p({
          label: "\u5BB6\u5EAD\u4F4F\u5740",
          required: true
        }),
        r: common_vendor.o(common_vendor.unref(ichooseImage)),
        s: common_vendor.o(common_vendor.unref(idelImage)),
        t: common_vendor.p({
          src: userinfo.avatar
        }),
        v: common_vendor.p({
          label: "\u5934\u50CF",
          required: true
        }),
        w: common_vendor.p({
          ["label-position"]: "top",
          border: true
        }),
        x: common_vendor.p({
          title: "\u57FA\u672C\u4FE1\u606F",
          type: "line"
        }),
        y: common_vendor.f(localdata.members, (member, k0, i0) => {
          return {
            a: "8034e3ec-19-" + i0 + "," + ("8034e3ec-18-" + i0),
            b: common_vendor.o(($event) => userinfo.members[member.key].name = $event),
            c: common_vendor.p({
              trim: true,
              placeholder: member.name,
              modelValue: userinfo.members[member.key].name
            }),
            d: "8034e3ec-20-" + i0 + "," + ("8034e3ec-18-" + i0),
            e: common_vendor.o(($event) => userinfo.members[member.key].phone = $event),
            f: common_vendor.p({
              trim: true,
              placeholder: member.phone,
              modelValue: userinfo.members[member.key].phone
            }),
            g: member.title,
            h: "8034e3ec-18-" + i0 + ",8034e3ec-17",
            i: common_vendor.p({
              title: member.title,
              ["show-animation"]: true
            })
          };
        }),
        z: common_vendor.p({
          label: "\u5BB6\u5EAD\u6210\u5458"
        }),
        A: common_vendor.o(($event) => userinfo.marriage = $event),
        B: common_vendor.p({
          localdata: localdata.radios.marriage,
          modelValue: userinfo.marriage
        }),
        C: common_vendor.p({
          label: "\u5A5A\u59FB\u60C5\u51B5"
        }),
        D: common_vendor.o(($event) => userinfo.introduction = $event),
        E: common_vendor.p({
          type: "textarea",
          placeholder: "\u8BF7\u8F93\u5165\u81EA\u6211\u4ECB\u7ECD",
          modelValue: userinfo.introduction
        }),
        F: common_vendor.p({
          label: "\u81EA\u6211\u4ECB\u7ECD"
        }),
        G: common_vendor.p({
          ["label-position"]: "top",
          border: true
        }),
        H: common_vendor.p({
          title: "\u62D3\u5C55\u4FE1\u606F",
          type: "line"
        }),
        I: common_vendor.o((...args) => common_vendor.unref(submit) && common_vendor.unref(submit)(...args)),
        J: common_vendor.p({
          type: common_vendor.unref(popup).type,
          message: common_vendor.unref(popup).message,
          duration: common_vendor.unref(popup).duration
        }),
        K: common_vendor.sr(popupRef, "8034e3ec-25", {
          "k": "popupRef"
        }),
        L: common_vendor.p({
          type: "message"
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8034e3ec"], ["__file", "D:/workspace/Uniapp/project/iGreen/package-worker/pages/apply/index.vue"]]);
wx.createPage(MiniProgramPage);
