<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as maptalks from 'maptalks'
import 'maptalks/dist/maptalks.css'

const mapContainer = ref<HTMLElement | null>(null)
const clickEvents = ref<string[]>([])
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
      })
    })

    map.on('click', (param) => {
      const coordinate = param.coordinate.toFixed(5).toArray()
      const time = new Date().toLocaleTimeString()
      const eventStr = `${time}: click map on [${coordinate[0]}, ${coordinate[1]}]`
      clickEvents.value.unshift(eventStr)
      if (clickEvents.value.length > 10) {
        clickEvents.value.pop()
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
  <div class="events-page">
    <div class="events-panel">
      <h3>地图事件日志</h3>
      <div class="events-list">
        <div v-if="clickEvents.length === 0" class="no-events">暂无事件记录</div>
        <div v-for="(event, index) in clickEvents" :key="index" class="event-item">
          {{ event }}
        </div>
      </div>
      <button @click="clickEvents = []" class="btn btn-clear">清空日志</button>
    </div>
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<style scoped>
.events-page {
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
}

.events-panel {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(13, 13, 13, 0.9);
  color: #fff;
  padding: 1rem;
  border-radius: 4px;
  z-index: 10;
  width: 350px;
  max-height: 300px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.events-panel h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  border-bottom: 1px solid #333;
  padding-bottom: 0.5rem;
}

.events-list {
  max-height: 200px;
  overflow-y: auto;
  font-family: monospace;
  font-size: 0.85rem;
}

.no-events {
  color: #999;
  text-align: center;
  padding: 1rem;
}

.event-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #333;
  line-height: 1.4;
}

.event-item:last-child {
  border-bottom: none;
}

.btn {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.btn-clear {
  background: #e74c3c;
  color: white;
}

.btn:hover {
  opacity: 0.8;
}

.map-container {
  width: 100%;
  height: 100%;
}
</style>
