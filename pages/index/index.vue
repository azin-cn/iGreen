<template>
  <view class="index">
    <!-- header -->
    <view class="header" v-if="showHeader">
      <view class="header-bar"></view>
      <view class="nav-bar">{{ title }}</view>
    </view>

    <!-- swiper -->
    <IBanner
      :list="list"
      :filterStyle="filterStyle"
      @error="onImageLoadedError"
    />

    <!-- scroll -->
    <view class="wrapper">
      <INotice :notices="notices" />

      <!-- 分类回收 -->
      <view class="card" style="background-color: white;">
        <view style="margin-top: 12px; padding-top: 12px;">分类回收</view>
        <view
          class="recycle flex justify-between align-center flex-nowrap pt-3 pb-3 pl-2 pr-2"
          style="margin-bottom: 12px;"
        >
          <view
            class="recycle-item text-center"
            v-for="item in recycleList"
            :key="item.icon"
            :style="{
              padding: '0 4px'
            }"
          >
            <view
              class="iconfont"
              :class="item.icon"
              :style="{
                width: '110rpx',
                height: '110rpx',
                lineHeight: '110rpx',
                marginBottom: '4px',
                fontSize: '24px',
                color: item.color,
                backgroundColor: item.bg,
                borderRadius: '50%'
              }"
            />
            <view>{{ item.name }}</view>
          </view>
        </view>
      </view>

      <!-- 用户：个人信息；员工：工作个人信息 -->
      <IBriefInfo :recycleBriefInfo="recycleBriefInfo" :onRefresh="onRefresh" />

      <!-- 用户：预约信息；员工：工作台面 -->
      <IOperation
        :nearbyRecycleList="nearbyRecycleList"
        :orderOperation="orderOperation"
        :operationClick="operationClick"
      />

      <!-- 用户：地图导航；员工：日程安排 -->
      <IMap
        v-if="!isWorker"
        :markers="markers"
        :points="points"
        :navigateToMap="navigateToMap"
        :moveToLocation="moveToLocation"
        :markertap="markertap"
      />

      <ITask v-if="isWorker" :taskIconClick="taskIconClick" :tasks="tasks" />
    </view>
    
  </view>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue';
import { onShow, onPageScroll } from '@dcloudio/uni-app';

import { getSettingScope } from '@/utils/getSettingScope.js';

import IBanner from './components/IBanner/index.vue';
import INotice from './components/INotice';
import IBriefInfo from './components/IBriefInfo';
import IOperation from './components/IOperation';
import IMap from './components/IMap';
import ITask from './components/ITask';

import useSwiper from './use-swiper.js';
import useNotice from './use-notice.js';
import useBriefInfo from './use-brief-info.js';
import useNearbyInfo from './use-nearby-info.js';
import useOperation from './use-operation.js';
import useLocation from './use-location.js';
import useTask from './use-task.js';

// global
const $global = getApp().globalData;
const {
  title,
  isWorker,
  system: { statusBarHeight }
} = $global;
const swiperHeight = 160;
const navHeight = 54;
const headerHeight = statusBarHeight + navHeight;

// ref
const showHeader = ref(false);

// hook
const { list, filterStyle, onImageLoadedError } = useSwiper();
// useNotice
const { notices } = useNotice();
// todo useRecycle
const recycleList = ref([
  {
    name: '回收金属',
    icon: 'icon-a-ziyuan12',
    color: '#FBAA01',
    bg: '#FEF1C7'
  },
  {
    name: '旧衣回收',
    icon: 'icon-clothes-full',
    color: '#07AF72',
    bg: '#DCF7E1'
  },
  {
    name: '纸类回收',
    icon: 'icon-zhixiang_niupizhixiang-3',
    color: '#F95959',
    bg: '#FCE2E1'
  },
  {
    name: '塑料回收',
    icon: 'icon-zhusuji01',
    color: '#20AAE9',
    bg: '#DCF2FD'
  },
  {
    name: '电器回收',
    icon: 'icon-jiadiandianqi',
    color: '#5D86E2',
    bg: '#EAEDFE'
  }
]);
// useBriefInfo
const { recycleBriefInfo, onRefresh } = useBriefInfo();
// useOperation
const { orderOperation, operationClick } = useOperation();
// useNearbyInfo
const { nearbyRecycleList } = useNearbyInfo();
// useLocation
const {
  markers,
  targetPos,
  points,
  navigateToMap,
  moveToLocation,
  markertap
} = useLocation();
// useTask
const { tasks, taskIconClick } = useTask();

onPageScroll(e => {
  const { scrollTop: top } = e;
  // 设置前缀条件，避免频繁更新
  if (!showHeader.value && top >= swiperHeight - navHeight) {
    showHeader.value = true;
  } else if (showHeader && top < swiperHeight - navHeight) {
    showHeader.value = false;
  }
  if (top < swiperHeight) {
    // 避免一直累加
    filterStyle.value = {
      'backdrop-filter': `blur(${top / 8}px)`
    };
  }
});
</script>

<style lang="scss" scoped>
.index {
  height: 100%;
  background-color: #f7f7f7;
}

.header {
  $nav-height: 54px;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  // padding-bottom: 8px;
  background-color: white;
  height: calc(var(--status-bar-height) + $nav-height);
  transition: all 0.2s;

  .header-bar {
    height: var(--status-bar-height);
  }

  .nav-bar {
    height: $nav-height;
    line-height: $nav-height;
    padding-left: 12px;
    font-size: 32rpx;
    color: black;
    border-bottom: 1px solid rgba(131, 131, 131, 0.3);
  }
}

.wrapper {
  position: relative;
  z-index: 9;
  top: 340rpx;
  overflow: hidden;
  // z-index: 1;
  // flex: 1;
  width: 96vw; // 百分比可能会出现问题
  margin: 0 auto;
  // margin-top: -24px;
  text-align: center;
  border-radius: $i-border-radius;
}
</style>
