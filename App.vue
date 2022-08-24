<script>
import { ref } from 'vue';
import { login } from '@/api/api-index';
import { IS_WORKER } from '@/static/js/constants.js';
import { registerTimeFormat, getLocation } from '@/utils/index.js';
export default {
  onLaunch: function() {
    login();
    registerTimeFormat();
    this.globalData.system = uni.getSystemInfoSync();
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
    isWorker: ref(uni.getStorageSync(IS_WORKER)),
    phoneNumber: ref('13159664733')
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
