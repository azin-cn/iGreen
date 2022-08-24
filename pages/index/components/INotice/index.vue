<template>
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
      <swiper-item
        class="text-ellipsis"
        v-for="notice in notices"
        :key="notice"
      >
        {{ notice }}
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  name: 'INotice',
  props: {
    notices: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
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
