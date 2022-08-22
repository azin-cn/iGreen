<template>
  <view class="card">
    <view class="header"><slot name="header"></slot></view>
    <view class="content"><slot name="content"></slot></view>
  </view>
</template>

<script>
export default {
  name: 'ICard'
};
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  margin-bottom: 12px;
  padding: 12px 10px;
  background-color: white;
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    padding-top: 12px;
  }
}
</style>
