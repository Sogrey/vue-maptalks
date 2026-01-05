<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as maptalks from 'maptalks'
import 'maptalks/dist/maptalks.css'

const mapContainer = ref<HTMLElement | null>(null)
let map: maptalks.Map | null = null
let polygon: maptalks.Polygon | null = null

onMounted(() => {
  if (mapContainer.value) {
    map = new maptalks.Map(mapContainer.value, {
      center: [-0.113049, 51.498568], // 伦敦
      zoom: 14,
      baseLayer: new maptalks.TileLayer('base', {
        urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        subdomains: ['a', 'b', 'c', 'd'],
        attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
      }),
      layers: [new maptalks.VectorLayer('v')]
    })

    addPolygon()
  }
})

function addPolygon() {
  if (!map) return
  const center = map.getCenter()
  polygon = new maptalks.Polygon(
    [
      center.add(-0.005, 0.005),
      center.add(0.005, 0.005),
      center.add(0.005, -0.005),
      center.add(-0.005, -0.005)
    ],
    {
      symbol: {
        polygonFill: '#fff',
        polygonOpacity: 0.5
      }
    }
  )
  const vLayer = map.getLayer('v') as maptalks.VectorLayer
  if (vLayer) {
    vLayer.addGeometry(polygon)
  }
}

function fitExtent() {
  if (map && polygon) {
    map.fitExtent(polygon.getExtent(), 0)
  }
}

onBeforeUnmount(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<template>
  <div class="fit-extent-page">
    <div class="info-bar">
      <h3>适应范围</h3>
      <button @click="fitExtent" class="btn btn-primary">Fit to extent</button>
    </div>
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<style scoped>
.fit-extent-page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.info-bar {
  padding: 1rem;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
}

.info-bar h3 {
  margin: 0;
  color: #333;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #3498db;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

.map-container {
  flex: 1;
  width: 100%;
}
</style>
