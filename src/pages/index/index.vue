<template>
  <div class="container">
    <map class="map" show-location></map>
  </div>
</template>

<script>
export default {
  onShareAppMessage() {
    return {
      title: 'ta就在你走的这条小路上',
      path: '/pages/index/main'
    }
  }
};
</script>

<style scoped>
  .map {
    width: 100%;
    height: 100%;
  }
</style>
