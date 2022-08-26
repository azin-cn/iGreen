<template>
  <view class="order">
    <view
      class="bg-image overflow-hidden"
      style="width: 100%; height: 300rpx; border: 4px solid white"
    >
      <image
        style="width: 100%;"
        src="../../static/images/recycle.jpg"
        mode="widthFix"
      />
    </view>

    <view
      class="notice flex justify-between align-center pr-1"
      style="height: 100rpx;"
    >
      <text class="icon iconfont icon-gonggao"></text>
      <text>准备时间：</text>
      <text class="flex-1">{{ new Date().toLocaleString() }}</text>
    </view>

    <!-- 订单列表 -->
    <IForms :forms="forms" :formList="formList" @mapIconClick="iconClick" />

    <ISelectMedia
      :images="forms.images"
      :videos="forms.videos"
      :maxImageCount="forms.maxImageCount"
      :maxVideoCount="forms.maxVideoCount"
      @chooseMedia="ichooseMedia"
      @delMedia="idelMedia"
    />

    <uni-section title="预约提交" type="line">
      <view
        class="example flex justify-between align-center"
        style="padding-bottom: 12px;"
      >
        <button
          style="width: 60%; margin: 0 auto; font-size: 16px"
          @click="submit"
        >
          提交订单
        </button>
      </view>
    </uni-section>

    <uni-popup ref="popupRef" type="message">
      <uni-popup-message
        :type="popup.type"
        :message="popup.message"
        :duration="popup.duration"
      />
    </uni-popup>
  </view>
</template>

<!-- 

网路部分：请求方式，请求token
UI部分：订单创建时间，提交时间，留言框，语音框，拍摄图片以确定体积大小，姓名，联系方式，获取当前位置，提交订单按钮
拓展部分：从后台获取用户以前的姓名、联系方式、地址，地址一般通过直接定位得到，快捷填入数据，

-->

<script>
export default {
  name: 'Order'
};
</script>

<script setup>
import { ref, reactive, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import IForms from './components/IForms';
import ISelectMedia from './components/ISelectMedia';

import useForm from './use-form.js';
import useMedia from './use-media.js';
import usePopup from './use-popup.js';

const { popupRef, popup, showMessage } = usePopup();
const { formList, forms, iconClick, submit, checkForm } = useForm(showMessage);
const { ichooseMedia, ipreviewMedia, idelMedia } = useMedia(forms);
</script>

<style lang="scss" scoped>
.order {
  height: 100%;
  background-color: white;
}

.notice {
  display: flex;
  align-items: center;
  height: 100rpx;
  text-align: left;
  color: $uni-color-success;
  font-size: 14px;
  background-color: white;
  border: 1px solid rgba(131, 131, 131, 0.3);

  .icon {
    font-size: 16px;
    padding: 0 12px;
    animation: icon-scale 0.8s 10;
  }
}

.example {
  padding: 0 15px;
  background-color: #fff;
}

.form-item {
  display: flex;
  align-items: center;
}

.button {
  display: flex;
  align-items: center;
  height: 35px;
  margin-left: 10px;
}
</style>
