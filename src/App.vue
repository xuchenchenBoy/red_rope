<script>
export default {
  created() {
    wx.cloud.init({
      traceUser: true,
    });
  },
};
</script>

<style>
@import '~weui-wxss/dist/style/weui.wxss';

page {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
}

.container {
  height: 100%;
  width: 100%;
}
</style>
