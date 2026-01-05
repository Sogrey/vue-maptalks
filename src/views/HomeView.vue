<script setup lang="ts">
import MaptalksMap from '../components/MaptalksMap.vue'
</script>

<template>
  <main class="home-page">
    <div class="map-wrapper">
      <MaptalksMap />
    </div>
  </main>
</template>

<style scoped>
.home-page {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.map-wrapper {
  width: 100%;
  height: 100%;
}
</style>
