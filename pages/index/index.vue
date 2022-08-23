<template>
  <view class="index">
    <!-- header -->
    <view class="header" v-if="showHeader">
      <view class="header-bar"></view>
      <view class="nav-bar">{{ title }}</view>
    </view>

    <!-- swiper -->
    <IBanner :list="list" :filterStyle="filterStyle" />

    <!-- scroll -->
    <view class="wrapper">
      <view class="notice pr-1" style="height: 100rpx;">
        <text class="icon iconfont icon-gonggao"></text>
        <text>公告：</text>
        <swiper
          class="flex-1 pl-1 pr-2"
          style="height: 100rpx;  line-height: 100rpx;"
          autoplay
          vertical
          circular
          :interval="3000"
          :duration="1000"
        >
          <swiper-item class="text-ellipsis">
            公告信息一公告信息一公告信息一公告信息一
          </swiper-item>
          <swiper-item class="text-ellipsis">
            公告信息二公告信息二公告信息二公告信息二公告信息二
          </swiper-item>
          <swiper-item class="text-ellipsis">
            公告信息三公告信息三公告信息三公告信息三公告信息三
          </swiper-item>
        </swiper>
      </view>

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

      <!-- 个人信息 -->
      <view class="card" style="background-color: white;">
        <view
          class="position-relative"
          style="margin-top: 12px; padding-top: 12px;"
        >
          个人信息
          <text
            class="position-absolute right-0 pr-3 iconfont icon-yunduanshuaxin"
            @click.stop.prevent="onRefresh"
          />
        </view>
        <view
          class="recycle-brief-info flex justify-between align-center pl-1 pr-1"
          style="padding: 14px 8px"
        >
          <view
            class="info-item flex justify-between align-center pl-4 pr-4"
            v-for="item in recycleBriefInfo"
            :key="item.icon"
            :style="{
              width: '48%',
              height: '140rpx',
              borderRadius: '24rpx',
              color: item.color,
              backgroundColor: item.bg
            }"
          >
            <view
              class="iconfont"
              :class="item.icon"
              :style="{ fontSize: '72rpx' }"
            />
            <view class="text">
              <view class="name" style="font-size: 30rpx;">
                {{ item.name }}
              </view>
              <view class="count" style="font-size: 28rpx;">
                {{ item.count }} {{ item.unit }}
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 预约信息 -->
      <view
        class="card"
        style="background-color: white;margin-top: 12px; padding: 0 4px; padding-bottom: 12px;"
      >
        <view style="padding: 12px 0">回收预约</view>
        <view class="content flex justify-between" style="height: 110px;">
          <view
            class="nearby-recycle position-relative flex-4 flex"
            style="height: 100%;"
          >
            <view
              class="tip position-absolute"
              :style="{
                zIndex: 1,
                bottom: '6px',
                marginLeft: '50%',
                transform: 'translateX(-50%)',
                color: 'rgba(131,131,131,0.6)'
              }"
            >
              附近信息
            </view>
            <swiper
              autoplay
              circular
              :interval="4000"
              :duration="1000"
              style="overflow: hidden; width: 90%; height: 100%; margin: 0 auto; border-radius: 8px;"
            >
              <swiper-item v-for="item in nearbyRecycleList" :key="item">
                <image
                  :src="item"
                  mode="widthFix"
                  style="width: 100%; height: 100%"
                ></image>
              </swiper-item>
            </swiper>
          </view>
          <view
            class="calling flex-3 flex flex-column justify-between pt-1 pb-1"
          >
            <view
              v-for="item in orderOperation"
              :key="item.icon"
              class="flex justify-between align-center"
              :style="{
                width: '100%',
                height: '46%',
                padding: '0 14px',
                color: item.color,
                borderRadius: '8px',
                backgroundColor: item.bg
              }"
              @click.stop="operationClick(item.key)"
            >
              <view class="iconfont" :class="item.icon" />
              <view class="name">{{ item.name }}</view>
            </view>
          </view>
        </view>
      </view>

      <!-- 地图导航 -->
      <view class="card" style="padding-bottom: 12px; background-color: white;">
        <view
          class="position-relative"
          style="margin-top: 12px; padding: 12px 4px;"
        >
          地图导航
          <text
            class="position-absolute iconfont icon-daohang"
            style="right: 100rpx; padding: 0 8rpx;"
            @click.stop.prevent="navigateToMap"
          />
          <text
            class="position-absolute iconfont icon-dingwei"
            style="right: 30rpx; padding: 0 8rpx; font-size: 17px;"
            @click.stop.prevent="moveToLocation"
          />
        </view>

        <map
          id="map"
          style="width: 98%; height: 400px; margin: 0 auto;"
          show-location
          :markers="markers"
          :include-points="points"
          @markertap="markertap"
        />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';
import { onShow, onPageScroll } from '@dcloudio/uni-app';

import { getSettingScope } from '@/utils/getSettingScope.js';

import IBanner from './components/IBanner/index.vue';
import useSwiper from './use-swiper.js';
import useBriefInfo from './use-brief-info.js';
import useOperation from './use-operation.js';
import useLocation from './use-location.js';

// 静态
const $global = getApp().globalData;
const {
  title,
  system: { statusBarHeight }
} = $global;
const swiperHeight = 160;
const navHeight = 54;
const headerHeight = statusBarHeight + navHeight;

// ref
const showHeader = ref(false);

// hook
const { list, filterStyle } = useSwiper();
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

const { recycleBriefInfo, onRefresh } = useBriefInfo();

const { orderOperation, phoneNumber, operationClick } = useOperation();

// todo useNearByRecycle
const nearbyRecycleList = ref([
  'https://img0.baidu.com/it/u=1703483666,1983445664&fm=253&fmt=auto&app=138&f=JPG?w=640&h=426',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.microelecone.com%2Fuploads%2Fallimg%2F200204%2F1-200204024025238.gif&refer=http%3A%2F%2Fwww.microelecone.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663744185&t=deb68af0c7750aa18fd89cd07904cc44'
]);

const {
  MapContext,
  markers,
  targetPos,
  points,
  navigateToMap,
  moveToLocation,
  markertap
} = useLocation();


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

.notice {
  display: flex;
  align-items: center;
  height: 100rpx;
  margin-bottom: 12px;
  text-align: left;
  color: $uni-color-success;
  font-size: 14px;
  background-color: white;

  .icon {
    font-size: 16px;
    padding: 0 12px;
    animation: icon-scale 0.8s 10;
  }
}

@keyframes icon-scale {
  0% {
  }

  50% {
    transform: scale(1.5);
  }

  100% {
    transform: scale(1);
  }
}
</style>
