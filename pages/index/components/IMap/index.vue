<template>
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
</template>

<script>
export default {
  name: 'IExtension',
  props: {
    navigateToMap: {
      type: Function,
      default: () => () => console.log('navigateToMap')
    },
    moveToLocation: {
      type: Function,
      default: () => () => console.log('moveToLocation')
    },
    markers: {
      type: Array,
      default: () => []
    },
    points: {
      type: Array,
      default: () => []
    },
    markertap: {
      type: Function,
      default: () => () => console.log('markertap')
    }
  },
  onLoad() {
    getApp().globalData.MapContext = uni.createMapContext('map', this) // createMapContext只有绑定了当前的this才能够被其他组件中调用
  }
};
</script>

<style></style>
