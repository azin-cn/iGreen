<template>
  <view class="index">
    <!-- header -->
    <view class="header" v-if="showHeader">
      <view class="header-bar"></view>
      <view class="nav-bar">{{ title }}</view>
    </view>

    <!-- swiper -->
    <ISwiper :list="list" :filterStyle="swiperStyle" />

    <!-- scroll -->
    <view class="wrapper">
      <view class="card publish">
        <text class="icon iconfont icon-gonggao"></text>
        <text>公告：</text>
        <swiper autoplay :interval="3000" :duration="1000">
          <swiper-item>
            <view class="swiper-item"></view>
          </swiper-item>
          <swiper-item>
            <view class="swiper-item"></view>
          </swiper-item>
        </swiper>
      </view>

      <image src="../../static/images/icon.png" style="width: 100%;" mode="widthFix" />
      <image src="../../static/images/icon.png" style="width: 100%;" mode="widthFix" />
      <image src="../../static/images/icon.png" style="width: 100%;" mode="widthFix" />
      <image src="../../static/images/icon.png" style="width: 100%;" mode="widthFix" />
      <image src="../../static/images/icon.png" style="width: 100%;" mode="widthFix" />
      <image src="../../static/images/icon.png" style="width: 100%;" mode="widthFix" />
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onPageScroll } from '@dcloudio/uni-app';
import ISwiper from './components/Swiper/index.vue';
import useSwiper from './use-swiper.js';

// 静态
const $global = getApp().globalData;
const swiperHeight = 160;
const navHeight = 54;
const title = $global.title;
const headerHeight = $global.system.statusBarHeight + navHeight;

// hook
const { list, swiperStyle } = useSwiper();

// ref
const showHeader = ref(false);
const latitude = ref(89.755543);
const longitude = ref(25.05731);

onPageScroll(e => {
  const { scrollTop: top } = e;
  // 设置前缀条件，避免频繁更新
  if (!showHeader.value && top >= swiperHeight - navHeight) {
    showHeader.value = true;
  } else if (showHeader && top < swiperHeight - navHeight) {
    showHeader.value = false;
  }
  swiperStyle.value = { 'backdrop-filter': `blur(${top / 8}px)` };
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

.card {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  text-align: left;
  color: $uni-color-success;
  font-size: 14px;
  background-color: white;
  .icon {
    font-size: 16px;
    padding: 0 12px;
  }

  .title {
    text-align: left;
    font-size: 18px;
    // font-weight: 700;
  }
}

.publish {
  height: 100rpx;
  line-height: 100rpx;
}
</style>
