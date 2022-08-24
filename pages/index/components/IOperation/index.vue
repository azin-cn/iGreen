<template>
  <!-- 用户：预约信息；员工：工作台面 -->
  <view
    class="card"
    style="background-color: white;margin-top: 12px; padding: 0 4px; padding-bottom: 12px;"
  >
    <view style="padding: 12px 0">{{ title }}</view>
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
            color: 'rgba(110,110,110,0.8)'
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
              mode="aspectFill"
              style="width: 100%; height: 100%"
            ></image>
          </swiper-item>
        </swiper>
      </view>
      <view class="calling flex-3 flex flex-column justify-between pt-1 pb-1">
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
</template>

<script>
export default {
  name: 'IOperation',
  props: {
    title: {
      type: String,
      default: '回收预约'
    },
    nearbyRecycleList: {
      type: Array,
      default: () => []
    },
    orderOperation: {
      type: Array,
      default: () => []
    },
    operationClick: {
      type: Function,
      default: () => () => console.log('operationClick')
    }
  }
};
</script>

<style></style>
