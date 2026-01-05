<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as maptalks from 'maptalks'
import 'maptalks/dist/maptalks.css'

const mapContainer = ref<HTMLElement | null>(null)
let map: maptalks.Map | null = null

onMounted(() => {
  if (mapContainer.value) {
    map = new maptalks.Map(mapContainer.value, {
      center: [-0.113049, 51.498568], // 伦敦
      zoom: 6,
      spatialReference: {
        projection: 'EPSG:4326'
      },
      baseLayer: new maptalks.WMSTileLayer('wms', {
        tileSystem: [1, -1, -180, 90],
        urlTemplate: 'https://ows.terrestris.de/osm/service',
        crs: 'EPSG:4326',
        layers: 'OSM-WMS',
        styles: '',
        version: '1.3.0',
        format: 'image/png',
        transparent: true,
        uppercase: true
      }),
      attribution: {
        content: '&copy ows.terrestris.de'
      }
    })
  }
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<template>
  <div class="wms-page">
    <div class="info-bar">
      <h3>WMS 图层 (EPSG:4326)</h3>
      <p class="hint">使用 WMS 服务加载地图数据</p>
    </div>
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<style scoped>
.wms-page {
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

.map-container {
  flex: 1;
  width: 100%;
}
</style>
