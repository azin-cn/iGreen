<template>
  <view class="example">
    <view
      class="flex justify-between align-center"
      style="padding-bottom: 20px;"
    >
      <text style="color: #808080;">{{ src ? 1 : 0 }}/{{ 1 }}</text>
      <view
        :hover-class="disabledSelection ? '' : 'bg-hover-light'"
        :style="{
          padding: '4rpx 8rpx',
          fontSize: '24rpx',
          borderRadius: '8rpx',
          border: '1px solid rgba(131,131,131,.3)',
          color: disabledSelection ? '#ccc' : '#777777'
        }"
        @click="chooseMedia"
      >
        拍摄/相册
      </view>
    </view>

    <!-- 上传图片显示区域 -->
    <view v-if="src" class="image flex justify-start align-center">
      <view
        class="overflow-hidden position-relative"
        :style="{
          width: '33.33%',
          height: '110px',
          padding: '4px',
          marginBottom: '18px'
        }"
      >
        <text
          class="del-icon iconfont icon-shanchu"
          @click="delMedia('image', index)"
        />
        <image
          style="width: 100%; height: 100%; border-radius: 8px;"
          :src="src"
          mode="aspectFill"
        />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'IAvatar',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  computed: {
    disabledSelection() {
      return !!this.src;
    }
  },
  emits: ['chooseMedia', 'previewMedia', 'delMedia'],
  methods: {
    chooseMedia(e) {
      if (!this.disabledSelection) {
        this.$emit('chooseMedia', e);
      }
    },
    previewMedia(e) {
      this.$emit('previewMedia', e);
    },
    delMedia(...args) {
      this.$emit('delMedia', args);
    }
  }
};
</script>

<style lang="scss" scoped>
.example {
  padding: 0 6px;
  background-color: #fff;
}

.del-icon {
  &::before {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    font-size: 32rpx;
    color: #888;
  }
}
</style>
