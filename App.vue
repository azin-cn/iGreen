<script>
import { ref } from 'vue';
import { login } from '@/api/api-index';
import { IS_WORKER, IS_ADMIN, IS_SUPER_ADMIN } from '@/static/js/constants.js';
import { registerTimeFormat, getLocation } from '@/utils/index.js';
export default {
  onLaunch: function() {
    registerTimeFormat();
    this.globalData.isWorker = ref(uni.getStorageSync(IS_WORKER));
    this.globalData.isAdmin = ref(uni.getStorageSync(IS_ADMIN));
    this.globalData.isSuperAdmin = ref(uni.getStorageSync(IS_SUPER_ADMIN));
    this.globalData.phoneNumber = ref('13159664733');
    this.globalData.system = uni.getSystemInfoSync();
    // login();
  },
  onShow: function() {
    console.log('App Show');
  },
  onHide: function() {
    console.log('App Hide');
  },
  globalData: {
    system: null,
    title: 'iGreen',
    isWorker: null,
    isAdmin: null,
    isSuperAdmin: null,
    phoneNumber: ''
  }
};
</script>

<style lang="scss">
/*每个页面公共css */
@import '@/static/css/reset.css';
@import '@/static/css/free.css';
@import '@/static/fonts/iconfont.css';

.w {
  width: 96%;
  margin: 0 auto;
}
</style>
