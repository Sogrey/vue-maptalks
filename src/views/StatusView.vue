<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as maptalks from 'maptalks'
import 'maptalks/dist/maptalks.css'

const mapContainer = ref<HTMLElement | null>(null)
const mapStatus = ref<string[]>([])
let map: maptalks.Map | null = null

onMounted(() => {
  if (mapContainer.value) {
    map = new maptalks.Map(mapContainer.value, {
      center: [-0.113049, 51.498568], // 伦敦
      zoom: 14,
      centerCross: true,
      baseLayer: new maptalks.TileLayer('base', {
        urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        subdomains: ['a', 'b', 'c', 'd'],
        attribution: '&copy; OpenStreetMap contributors, &copy; CARTO'
      })
    })

    map.on('zoomend moving moveend', getStatus)
    getStatus()
  }
})

function getStatus() {
  if (!map) return
  const extent = map.getExtent()
  if (!extent) return
  const ex = [
    '{',
    'xmin:' + (extent.xmin ?? 0).toFixed(5),
    ', ymin:' + (extent.ymin ?? 0).toFixed(5),
    ', xmax:' + (extent.xmax ?? 0).toFixed(5),
    ', ymax:' + (extent.ymax ?? 0).toFixed(5),
    '}'
  ].join('')

  const center = map.getCenter()
  mapStatus.value = [
    'Center : [' + [center.x.toFixed(5), center.y.toFixed(5)].join() + ']',
    'Extent : ' + ex,
    'Size : ' + map.getSize().toArray().join(),
    'Zoom : ' + map.getZoom(),
    'MinZoom : ' + map.getMinZoom(),
    'MaxZoom : ' + map.getMaxZoom(),
    'Projection : ' + map.getProjection().code
  ]
}

onBeforeUnmount(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<template>
  <div class="status-page">
    <div class="status-panel">
      <h3>地图状态</h3>
      <div class="status-list">
        <div v-for="(status, index) in mapStatus" :key="index" class="status-item">
          {{ status }}
        </div>
      </div>
    </div>
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<style scoped>
.status-page {
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
}

.status-panel {
  position: absolute;
  top: 20px;
  right: 20px;
  background: #34495e;
  color: #fff;
  padding: 1rem;
  border-radius: 4px;
  z-index: 10;
  min-width: 250px;
  max-width: 350px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.status-panel h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  border-bottom: 1px solid #4a6278;
  padding-bottom: 0.5rem;
}

.status-list {
  font-family: monospace;
  font-size: 0.85rem;
}

.status-item {
  padding: 0.25rem 0;
  line-height: 1.4;
}

.map-container {
  width: 100%;
  height: 100%;
}
</style>
