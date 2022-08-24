<template>
  <!-- 用户：个人信息；员工：工作个人信息 -->
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
          <view class="name" style="font-size: 30rpx;">{{ item.name }}</view>
          <view class="count" style="font-size: 28rpx;">
            {{ item.count }} {{ item.unit }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'IBriefInfo',
  props: {
    recycleBriefInfo: {
      type: Array,
      default: () => []
    },
    onRefresh: {
      type: Function,
      default: () => console.log('onRefresh')
    }
  }
};
</script>

<style></style>
