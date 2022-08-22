<template>
  <view class="notice flex">
    <text class="iconfont icon-gonggao"></text>
    <text>公告：</text>
    <swiper
      class="flex-1 pl-1 pr-2"
      style="height: 100%;"
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
</template>

<script></script>

<style lang="scss" scoped>
.notice {
  height: 100rpx;
  line-height: 100rpx;
}
</style>
