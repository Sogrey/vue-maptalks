<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as maptalks from 'maptalks'
import 'maptalks/dist/maptalks.css'

const mapContainer = ref<HTMLElement | null>(null)
let map: maptalks.Map | null = null

onMounted(() => {
  if (mapContainer.value) {
    // 创建地图实例
    map = new maptalks.Map(mapContainer.value, {
      // 设置地图初始中心点 [经度, 纬度]
      center: [116.3974, 39.9093], // 北京
      // 设置地图初始缩放级别
      zoom: 12,
      // 配置一个底图图层
      baseLayer: new maptalks.TileLayer('base', {
        // 底图瓦片服务的URL模板
        urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        // 瓦片服务的子域名
        subdomains: ['a', 'b', 'c', 'd'],
        // 版权信息
        attribution:
          '&copy; <a href="http://www.osm.org/copyright">OSM</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }),
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

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}
</style>
