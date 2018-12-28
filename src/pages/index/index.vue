<template>
  <div class="container">
    <map class="map" show-location></map>
  </div>
</template>

<script>
import wxSync from '@/utils/wxApiSync'

export default {
  onShareAppMessage() {
    return {
      title: 'ta就在你走的这条小路上',
      path: '/pages/index/main'
    }
  },
  async beforeMount() {
    // wx.authorize('scope.userLocation')
    const settings = await wxSync({ api: 'getSetting' })
    if (settings.authSetting['scope.userLocation']) {
      const location = await wxSync({ api: 'getLocation' })
    } else {
      try {
        const location = await wxSync({ 
          api: 'authorize',
          params: { scope: 'scope.userLocation' 
        }})
      } catch () {
        wx.showToast({
          title: '无法获取位置，将无法体验功能哦',
          icon: 'none',
          duration: 2000
        });
      }
    }
  },
};
</script>

<style scoped>
  .map {
    width: 100%;
    height: 100%;
  }
</style>
