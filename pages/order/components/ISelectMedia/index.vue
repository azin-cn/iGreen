<template>
  <uni-section :title="title" type="line">
    <view class="example">
      <view
        class="flex justify-between align-center"
        style="padding-bottom: 20px;"
      >
        <text style="color: #808080;">
          图片: {{ images.length }}/{{ maxImageCount }} - 视频:
          {{ videos.length }}/{{ maxVideoCount }}
        </text>
        <view
          :hover-class="disabledSelection ? '' : 'bg-hover-light'"
          style="padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(131,131,131,.3);"
          :style="{
            color: disabledSelection ? '#ccc' : ''
          }"
          @click="disabledSelection ? '' : chooseMedia"
        >
          拍摄/相册
        </view>
      </view>

      <!-- 上传图片显示区域 -->
      <view v-if="images.length" class="image flex justify-start align-center">
        <view
          v-for="(item, index) in images"
          :key="item"
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
            :src="item"
            mode="aspectFill"
          />
        </view>
      </view>
      <!-- 上传视频显示区域 -->
      <view
        v-if="videos.length"
        class="video position-relative flex justify-center align-center"
      >
        <text
          class="del-icon iconfont icon-shanchu"
          @click="delMedia('video')"
        />
        <video
          :src="videos[0]"
          :muted="false"
          :initial-time="0"
          :show-fullscreen-btn="false"
          :show-mute-btn="true"
          controls
          object-fit="contain"
          style="overflow: hidden; margin: 0 auto; width: 98%; border-radius: 6px;"
        />
      </view>
    </view>
  </uni-section>
</template>

<script>
export default {
  name: 'ISelectMedia',
  props: {
    title: {
      type: String,
      default: '图片视频'
    },
    images: {
      type: Array,
      default: () => []
    },
    videos: {
      type: Array,
      default: () => []
    },
    maxImageCount: {
      type: Number,
      default: 3
    },
    maxVideoCount: {
      type: Number,
      default: 1
    }
  },
  computed: {
    disabledSelection() {
      return (
        this.images.length === this.maxImageCount &&
        this.videos.length === this.maxVideoCount
      );
    }
  },
  emits: ['chooseMedia', 'previewMedia', 'delMedia'],
  methods: {
    chooseMedia(e) {
      this.$emit('chooseMedia', e);
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
  padding: 0 15px;
  background-color: #fff;
}

.del-icon {
  &::before {
    position: absolute;
    z-index: 99;
    top: 0;
    right: 0;
    font-size: 32rpx;
    color: #888;
  }
}
</style>
