<template>
  <uni-forms>
    <!-- 联系信息 -->
    <uni-section title="联系信息" type="line">
      <view class="example">
        <!-- 不通过动态数据获取 -->
        <uni-forms-item
          v-for="(item, index) in formList"
          :key="item.label"
          :label="item.label"
          :required="item.required"
        >
          <uni-combox
            :candidates="item.candidates"
            :placeholder="item.placeholder"
            v-model="item.value"
          />
        </uni-forms-item>
        <uni-forms-item label="位置">
          <uni-easyinput
            class="uni-mt-5"
            suffixIcon="map-pin-ellipse"
            v-model="forms.address"
            placeholderStyle="font-size: 30rpx; color: #919191"
            placeholder="简略位置即可"
            @iconClick="mapIconClick"
          />
        </uni-forms-item>
      </view>
    </uni-section>
    <!-- 预约时间 -->
    <uni-section title="预约时间" type="line">
      <view class="example">
        <uni-forms-item required>
          <uni-datetime-picker
            type="datetime"
            return-type="timestamp"
            v-model="forms.ordertime"
          />
        </uni-forms-item>
      </view>
    </uni-section>
  </uni-forms>
</template>

<script>
export default {
  name: 'IForms',
  props: {
    forms: {
      type: Object,
      default: () => ({})
    },
    formList: {
      type: Array,
      default: () => []
    }
  },
  emits: ['mapIconClick'],
  methods: {
    mapIconClick() {
      this.$emit('mapIconClick');
    }
  }
};
</script>

<style>
.example {
  padding: 0 15px;
  background-color: #fff;
}
</style>
