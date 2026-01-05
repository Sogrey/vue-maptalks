<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as maptalks from 'maptalks'
import 'maptalks/dist/maptalks.css'

const canvasContainer = ref<HTMLCanvasElement | null>(null)
let map: maptalks.Map | null = null

onMounted(() => {
  if (canvasContainer.value) {
    // 检测是否为高分辨率屏幕
    const screen = window.screen as any
    const res = (window.devicePixelRatio || (screen.deviceXDPI && screen.logicalXDPI ? screen.deviceXDPI / screen.logicalXDPI : 1)) > 1
    if (res) {
      const r = 2
      canvasContainer.value.width *= r
      canvasContainer.value.height *= r
      canvasContainer.value.style.cssText += `width:${Math.round(canvasContainer.value.width / r)}px;height:${Math.round(canvasContainer.value.height / r)}px`
    }

    map = new maptalks.Map(canvasContainer.value, {
      center: [-0.113049, 51.498568], // 伦敦
      zoom: 14,
      zoomControl: true,
      scaleControl: true,
      baseLayer: new maptalks.TileLayer('base', {
        urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        subdomains: ['a', 'b', 'c', 'd'],
        attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
      })
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
  <div class="canvas-page">
    <div class="info-bar">
      <h3>Canvas 渲染地图</h3>
      <p class="hint">地图在 Canvas 元素上渲染（支持高分辨率屏幕）</p>
    </div>
    <div class="canvas-wrapper">
      <canvas ref="canvasContainer" id="map" width="600" height="300"></canvas>
    </div>
  </div>
</template>

<style scoped>
.canvas-page {
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

.canvas-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
}

#map {
  border: 1px solid #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
