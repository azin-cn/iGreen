"use strict";
var common_vendor = require("../../common/vendor.js");
var pages_index_useSwiper = require("./use-swiper.js");
var pages_index_useNotice = require("./use-notice.js");
var pages_index_useBriefInfo = require("./use-brief-info.js");
var pages_index_useNearbyInfo = require("./use-nearby-info.js");
var pages_index_useOperation = require("./use-operation.js");
var pages_index_useLocation = require("./use-location.js");
var pages_index_useTask = require("./use-task.js");
require("../../api/api-index.js");
require("../../backend/index.js");
require("../../api/config.js");
require("../../static/js/constants.js");
require("../../utils/storage/index.js");
require("../../utils/request.js");
require("../../utils/index.js");
require("../../utils/getSettingScope.js");
require("../../utils/router/index.js");
if (!Math) {
  (IBanner + common_vendor.unref(INotice) + common_vendor.unref(IBriefInfo) + common_vendor.unref(IOperation) + common_vendor.unref(IMap) + common_vendor.unref(ITask))();
}
const IBanner = () => "./components/IBanner/index.js";
const INotice = () => "./components/INotice/index.js";
const IBriefInfo = () => "./components/IBriefInfo/index.js";
const IOperation = () => "./components/IOperation/index.js";
const IMap = () => "./components/IMap/index.js";
const ITask = () => "./components/ITask/index.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const $global = getApp().globalData;
    const {
      title,
      isWorker,
      system: { statusBarHeight }
    } = $global;
    const swiperHeight = 160;
    const navHeight = 54;
    const showHeader = common_vendor.ref(false);
    const { list, filterStyle, onImageLoadedError } = pages_index_useSwiper.useSwiper();
    const { notices } = pages_index_useNotice.useNotice();
    const recycleList = common_vendor.ref([
      {
        name: "\u56DE\u6536\u91D1\u5C5E",
        icon: "icon-a-ziyuan12",
        color: "#FBAA01",
        bg: "#FEF1C7"
      },
      {
        name: "\u65E7\u8863\u56DE\u6536",
        icon: "icon-clothes-full",
        color: "#07AF72",
        bg: "#DCF7E1"
      },
      {
        name: "\u7EB8\u7C7B\u56DE\u6536",
        icon: "icon-zhixiang_niupizhixiang-3",
        color: "#F95959",
        bg: "#FCE2E1"
      },
      {
        name: "\u5851\u6599\u56DE\u6536",
        icon: "icon-zhusuji01",
        color: "#20AAE9",
        bg: "#DCF2FD"
      },
      {
        name: "\u7535\u5668\u56DE\u6536",
        icon: "icon-jiadiandianqi",
        color: "#5D86E2",
        bg: "#EAEDFE"
      }
    ]);
    const { recycleBriefInfo, onRefresh } = pages_index_useBriefInfo.useBriefInfo();
    const { orderOperation, operationClick } = pages_index_useOperation.useOpeartion();
    const { nearbyRecycleList } = pages_index_useNearbyInfo.useNearByInfo();
    const {
      markers,
      targetPos,
      points,
      navigateToMap,
      moveToLocation,
      markertap
    } = pages_index_useLocation.useLocation();
    const { tasks, taskIconClick } = pages_index_useTask.useTask();
    common_vendor.onPageScroll((e) => {
      const { scrollTop: top } = e;
      if (!showHeader.value && top >= swiperHeight - navHeight) {
        showHeader.value = true;
      } else if (showHeader && top < swiperHeight - navHeight) {
        showHeader.value = false;
      }
      if (top < swiperHeight) {
        filterStyle.value = {
          "backdrop-filter": `blur(${top / 8}px)`
        };
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: showHeader.value
      }, showHeader.value ? {
        b: common_vendor.t(common_vendor.unref(title))
      } : {}, {
        c: common_vendor.o(common_vendor.unref(onImageLoadedError)),
        d: common_vendor.p({
          list: common_vendor.unref(list),
          filterStyle: common_vendor.unref(filterStyle)
        }),
        e: common_vendor.p({
          notices: common_vendor.unref(notices)
        }),
        f: common_vendor.f(recycleList.value, (item, k0, i0) => {
          return {
            a: common_vendor.n(item.icon),
            b: item.color,
            c: item.bg,
            d: common_vendor.t(item.name),
            e: item.icon
          };
        }),
        g: common_vendor.p({
          recycleBriefInfo: common_vendor.unref(recycleBriefInfo),
          onRefresh: common_vendor.unref(onRefresh)
        }),
        h: common_vendor.p({
          nearbyRecycleList: common_vendor.unref(nearbyRecycleList),
          orderOperation: common_vendor.unref(orderOperation),
          operationClick: common_vendor.unref(operationClick)
        }),
        i: !common_vendor.unref(isWorker)
      }, !common_vendor.unref(isWorker) ? {
        j: common_vendor.p({
          markers: common_vendor.unref(markers),
          points: common_vendor.unref(points),
          navigateToMap: common_vendor.unref(navigateToMap),
          moveToLocation: common_vendor.unref(moveToLocation),
          markertap: common_vendor.unref(markertap)
        })
      } : {}, {
        k: common_vendor.unref(isWorker)
      }, common_vendor.unref(isWorker) ? {
        l: common_vendor.p({
          taskIconClick: common_vendor.unref(taskIconClick),
          tasks: common_vendor.unref(tasks)
        })
      } : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-57280228"], ["__file", "D:/workspace/Uniapp/project/iGreen/pages/index/index.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
