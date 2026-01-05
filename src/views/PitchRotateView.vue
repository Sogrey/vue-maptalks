<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as maptalks from 'maptalks'
import 'maptalks/dist/maptalks.css'

const mapContainer = ref<HTMLElement | null>(null)
let map: maptalks.Map | null = null
let animationId: number | null = null

const pitch = ref(0)
const bearing = ref(0)
let direction = 'up'
let paused = false

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

    addMarkers()
    startAnimation()
  }
})

function addMarkers() {
  if (!map) return
  const center = map.getCenter()
  const vLayer = map.getLayer('v') as maptalks.VectorLayer
  if (vLayer) {
    const markers: maptalks.Marker[] = [
      new maptalks.Marker(center.add(-0.008, -0.008)),
      new maptalks.Marker(center.add(0.008, -0.008)),
      new maptalks.Marker(center.add(-0.008, 0.008)),
      new maptalks.Marker(center.add(0.008, 0.008))
    ]
    vLayer.addGeometry(markers)
  }
}

function startAnimation() {
  const animate = () => {
    if (pitch.value > 50) {
      direction = 'down'
    } else if (pitch.value < 0) {
      direction = 'up'
    }

    if (direction === 'down') {
      pitch.value--
    } else {
      pitch.value++
    }

    map?.setPitch(pitch.value)
    map?.setBearing(bearing.value++)

    if (!paused) {
      animationId = requestAnimationFrame(animate)
    }
  }
  animate()
}

function pauseAnimation() {
  paused = true
}

function resumeAnimation() {
  paused = false
  startAnimation()
}

function resetAnimation() {
  paused = true
  pitch.value = 0
  bearing.value = 0
  map?.setPitch(0)
  map?.setBearing(0)
}

onBeforeUnmount(() => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
  }
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<template>
  <div class="pitch-rotate-page">
    <div class="info-bar">
      <div class="info-item">
        <span class="label">Pitch:</span>
        <span class="value">{{ pitch }}°</span>
      </div>
      <div class="info-item">
        <span class="label">Bearing:</span>
        <span class="value">{{ bearing }}°</span>
      </div>
      <div class="controls">
        <button @click="pauseAnimation" class="btn btn-warning">暂停</button>
        <button @click="resumeAnimation" class="btn btn-success">继续</button>
        <button @click="resetAnimation" class="btn btn-danger">重置</button>
      </div>
    </div>
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<style scoped>
.pitch-rotate-page {
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

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.label {
  font-weight: bold;
  color: #333;
}

.value {
  color: #42b883;
  font-family: monospace;
  font-size: 1.1rem;
}

.controls {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

.btn-warning {
  background: #f39c12;
  color: white;
}

.btn-success {
  background: #42b883;
  color: white;
}

.btn-danger {
  background: #e74c3c;
  color: white;
}

.map-container {
  flex: 1;
  width: 100%;
}
</style>
