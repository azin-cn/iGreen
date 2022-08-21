<template>
  <view style="position: relative;">
    <swiper
      indicator-dots
      autoplay
      circular
      :interval="3000"
      :duration="600"
      class="swiper"
    >
      <!-- :style="style" -->
      <swiper-item v-for="item in list" :key="item">
        <image :src="item" mode="aspectFill" style="width: 100%;"></image>
      </swiper-item>
    </swiper>
    <view class="filter" :style="filterStyle"></view>
  </view>
</template>

<script>
export default {
  name: 'ISwiper',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    filterStyle: {
      type: Object,
      default: () => null
    }
  }
};
</script>

<style lang="scss" scoped>
.swiper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 380rpx;
  margin: 0 auto;
  // border: 10px solid #fff;
  background-color: #fff;
  border-radius: $i-border-radius;
}

.filter {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  height: 380rpx;
}
</style>
