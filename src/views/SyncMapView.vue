<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as maptalks from 'maptalks'
import 'maptalks/dist/maptalks.css'

const map0Container = ref<HTMLElement | null>(null)
const map1Container = ref<HTMLElement | null>(null)
let map0: maptalks.Map | null = null
let map1: maptalks.Map | null = null

onMounted(() => {
  if (map0Container.value && map1Container.value) {
    map0 = new maptalks.Map(map0Container.value, {
      center: [-0.113049, 51.498568], // 伦敦
      zoom: 14,
      zoomControl: true,
      baseLayer: new maptalks.TileLayer('base', {
        urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        subdomains: ['a', 'b', 'c', 'd'],
        attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
      })
    })

    map1 = new maptalks.Map(map1Container.value, {
      center: map0.getCenter(),
      zoom: map0.getZoom(),
      draggable: false,
      scrollWheelZoom: false,
      baseLayer: new maptalks.TileLayer('base1', {
        urlTemplate: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
        subdomains: ['a', 'b', 'c', 'd'],
        attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
      })
    })

    // 确保两个地图都已创建后再添加事件监听
    if (map0 && map1) {
      map0.on('moving moveend', () => {
        map1.setCenter(map0.getCenter())
      })

      map0.on('zooming zoomend', () => {
        map1.setCenterAndZoom(map0.getCenter(), map0.getZoom())
      })

      map0.on('pitch', () => {
        map1.setPitch(map0.getPitch())
      })

      map0.on('rotate', () => {
        map1.setBearing(map0.getBearing())
      })
    }
  }
})

onBeforeUnmount(() => {
  if (map0) {
    map0.remove()
    map0 = null
  }
  if (map1) {
    map1.remove()
    map1 = null
  }
})
</script>

<template>
  <div class="sync-map-page">
    <div class="info-bar">
      <h3>地图同步示例</h3>
      <p class="hint">左侧为主地图（可交互），右侧为从地图（同步显示）</p>
    </div>
    <div class="maps-wrapper">
      <div class="map-item">
        <div class="map-label">主地图 (Light)</div>
        <div ref="map0Container" class="map-container"></div>
      </div>
      <div class="map-item">
        <div class="map-label">从地图 (Dark)</div>
        <div ref="map1Container" class="map-container"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sync-map-page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.info-bar {
  padding: 1rem;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.info-bar h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.hint {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.maps-wrapper {
  flex: 1;
  display: flex;
}

.map-item {
  width: calc(50% - 1px);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.map-label {
  padding: 0.5rem 1rem;
  background: #34495e;
  color: #fff;
  font-weight: bold;
  text-align: center;
}

.map-container {
  flex: 1;
  border: 1px solid #ccc;
}
</style>
