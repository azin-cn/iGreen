<script>
export default {
  onLaunch: function() {
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
    title: 'iGreen'
  }
};
</script>

<style lang="scss">
/*每个页面公共css */
@import '@/static/css/reset.css';
@import '@/static/fonts/iconfont.css';

.w {
  width: 96%;
  margin: 0 auto;
}
</style>
