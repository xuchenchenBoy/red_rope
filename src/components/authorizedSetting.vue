<template>
  <view class="wrapper">
    <button @opensetting="bindopensetting" open-type="openSetting" class="weui-btn btn" type="primary" size="mini">设置</button>
    <view>同意获取地理坐标<br/>能获得更好的体验哦~</view>
  </view>
</template>

<script>
  export default {
    methods: {
      bindopensetting(e) {
        const isAgree = e.target.authSetting['scope.userLocation']
        this.$emit('opensettingSuc', isAgree)
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    padding: 300rpx 50rpx;
    text-align: center;
    color: #999;
    font-size: 24rpx;
  }

  .btn {
    margin-bottom: 30rpx;
  }
</style>