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
      zoom: 14,
      baseLayer: new maptalks.TileLayer('base', {
        urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        subdomains: ['a', 'b', 'c', 'd'],
        attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
      }),
      layers: [new maptalks.VectorLayer('v')]
    })
  }
})

function panUp() {
  map?.panBy([0, -200])
}

function panDown() {
  map?.panBy([0, 200])
}

function panLeft() {
  map?.panBy([-200, 0])
}

function panRight() {
  map?.panBy([200, 0])
}

function panToCoordinate() {
  if (!map) return
  const symbol = {
    markerType: 'x',
    markerLineColor: '#f00',
    markerLineWidth: 4,
    markerWidth: 20,
    markerHeight: 20
  }
  const coordinate = map.getCenter().add(0.008, 0.008)
  const vLayer = map.getLayer('v') as maptalks.VectorLayer
  if (vLayer) {
    vLayer.clear().addGeometry(new maptalks.Marker(coordinate, { symbol }))
  }
  map.panTo(coordinate)
}

onBeforeUnmount(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<template>
  <div class="panning-page">
    <div class="info-bar">
      <h3>地图平移控制</h3>
      <div class="controls">
        <button @click="panUp" class="btn">↑</button>
        <button @click="panDown" class="btn">↓</button>
        <button @click="panLeft" class="btn">←</button>
        <button @click="panRight" class="btn">→</button>
        <button @click="panToCoordinate" class="btn btn-primary">移动到目标点</button>
      </div>
    </div>
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<style scoped>
.panning-page {
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

.controls {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #42b883;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  min-width: 40px;
}

.btn:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

.btn-primary {
  background: #3498db;
}

.map-container {
  flex: 1;
  width: 100%;
}
</style>
