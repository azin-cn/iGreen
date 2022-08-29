<template>
  <view class="apply">
    <view class="bg-logo" style="overflow: hidden; width: 100%; height: 160px;">
      <image
        style="width: 100%; height: 100%"
        :src="localdata.bgImage"
        mode="widthFix"
        webp
      />
    </view>

    <uni-section title="基本信息" type="line">
      <view class="example">
        <!-- 基础用法，不包含校验规则 -->
        <uni-forms label-position="top" border>
          <uni-forms-item label="姓名" required>
            <uni-easyinput
              trim
              v-model="userinfo.username"
              placeholder="请输入姓名"
            />
          </uni-forms-item>
          <uni-forms-item label="电话" required>
            <uni-easyinput
              trim
              v-model="userinfo.phone"
              placeholder="请输入联系号码"
            />
          </uni-forms-item>
          <uni-forms-item label="性别" required>
            <uni-data-checkbox
              v-model="userinfo.gender"
              :localdata="localdata.radios.genders"
            />
          </uni-forms-item>
          <uni-forms-item label="出生年月" required>
            <uni-datetime-picker
              type="date"
              return-type="timestamp"
              v-model="userinfo.birth"
            />
          </uni-forms-item>
          <uni-forms-item label="家庭住址" required>
            <uni-easyinput
              trim
              class="uni-mt-5"
              suffixIcon="map-pin-ellipse"
              v-model="userinfo.address"
              placeholderStyle="font-size: 30rpx; color: #919191"
              placeholder="请输入家庭住址"
              @iconClick="mapIconClick"
            />
          </uni-forms-item>

          <uni-forms-item label="头像" required>
            <IAvatar
              :src="userinfo.avatar"
              @chooseMedia="ichooseImage"
              @delMedia="idelImage"
            />
          </uni-forms-item>
        </uni-forms>
      </view>
    </uni-section>

    <uni-section title="拓展信息" type="line">
      <view class="example">
        <uni-forms label-position="top" border>
          <uni-forms-item label="家庭成员">
            <uni-collapse>
              <uni-collapse-item
                class=""
                v-for="member in localdata.members"
                :key="member.title"
                :title="member.title"
                :show-animation="true"
              >
                <!-- 姓名 -->
                <view class="w-94" style="margin: 8px auto;">
                  <uni-easyinput
                    trim
                    v-model="userinfo.members[member.key].name"
                    :placeholder="member.name"
                  />
                </view>
                <!-- 电话 -->
                <view class="w-94" style="margin: 8px auto;">
                  <uni-easyinput
                    trim
                    v-model="userinfo.members[member.key].phone"
                    :placeholder="member.phone"
                  />
                </view>
              </uni-collapse-item>
            </uni-collapse>
          </uni-forms-item>

          <uni-forms-item label="婚姻情况">
            <view class="w-94">
              <uni-data-checkbox
                v-model="userinfo.marriage"
                :localdata="localdata.radios.marriage"
              />
            </view>
          </uni-forms-item>

          <uni-forms-item label="自我介绍">
            <uni-easyinput
              type="textarea"
              v-model="userinfo.introduction"
              placeholder="请输入自我介绍"
            />
          </uni-forms-item>
        </uni-forms>
      </view>
    </uni-section>

    <button
      :style="{
        width: '60%',
        height: '80rpx',
        lineHeight: '80rpx',
        margin: '0 auto',
        fontSize: '16px'
      }"
      @click="submit"
    >
      提交申请
    </button>

    <uni-popup ref="popupRef" type="message">
      <uni-popup-message
        :type="popup.type"
        :message="popup.message"
        :duration="popup.duration"
      />
    </uni-popup>
  </view>
</template>

<script>
export default {
  name: 'ApplyWroker'
};
</script>

<script setup>
import { ref, reactive } from 'vue';
import { chooseLocation } from '@/utils/index.js';

import IAvatar from './components/IAvatar';

import usePopup from './use-popup.js';
import useForm from './use-form.js';
import useMedia from './use-media.js';

// 静态数据
const localdata = {
  bgImage: '/package-worker/static/images/apply-bg.jpeg',
  radios: {
    genders: [
      {
        text: '男',
        value: '男'
      },
      {
        text: '女',
        value: '女'
      }
    ],

    marriage: [
      {
        text: '未婚',
        value: '未婚'
      },
      {
        text: '已婚',
        value: '已婚'
      },
      {
        text: '保密',
        value: '保密'
      }
    ]
  },
  members: {
    father: {
      key: 'father',
      title: '父亲',
      name: '请输入姓名',
      phone: '请输入联系号码'
    },
    mother: {
      key: 'mother',
      title: '母亲',
      name: '请输入姓名',
      phone: '请输入联系号码'
    }
  }
};

const userinfo = reactive({
  username: '',
  phone: '',
  gender: '',
  birth: '',
  address: '',
  latitude: 0,
  longitude: 0,
  avatar: '',
  members: {
    father: {
      name: '',
      phone: ''
    },
    mother: {
      name: '',
      phone: ''
    },
    children: []
  },
  marriage: '',
  introduction: ''
});

// backups 是为了在发生位置错误时能够保留表单数据而设计的
const backups = {
  avatar: ''
};
const { popupRef, popup, showMessage } = usePopup();
const { submit, checkForm } = useForm(userinfo, backups, showMessage);
const { ichooseImage, idelImage } = useMedia(userinfo);

function mapIconClick(e) {
  chooseLocation().then(res => {
    const { address, latitude, longitude } = res;
    userinfo.address = address;
    userinfo.latitude = latitude;
    userinfo.longitude = longitude;
  });
}
</script>

<style lang="scss" scoped>
.apply {
  height: 100%;
}
.w-94 {
  width: 94%;
  margin: 0 auto;
}

.example {
  padding: 0 30rpx;
  background-color: #fff;
}

.segmented-control {
  margin-bottom: 30rpx;
}

.button-group {
  margin-top: 30rpx;
  display: flex;
  justify-content: space-around;
}

.form-item {
  display: flex;
  align-items: center;
}

.button {
  display: flex;
  align-items: center;
  height: 70rpx;
  line-height: 70rpx;
  text-align: center;
}
</style>
