<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <h1>Vue Maptalks 示例</h1>
      <nav>
        <RouterLink to="/">基础地图</RouterLink>
        <RouterLink to="/pitch-rotate">倾斜旋转</RouterLink>
        <RouterLink to="/panning">平移控制</RouterLink>
        <RouterLink to="/fit-extent">适应范围</RouterLink>
        <RouterLink to="/status">地图状态</RouterLink>
        <RouterLink to="/canvas">Canvas 渲染</RouterLink>
        <RouterLink to="/map-events">地图事件</RouterLink>
        <RouterLink to="/sync-map">地图同步</RouterLink>
        <RouterLink to="/export-image">导出图片</RouterLink>
        <RouterLink to="/wms">WMS 图层</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  margin-bottom: 0;
}

header h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #2c3e50;
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 1400px;
  margin: 0 auto;
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

nav a {
  text-decoration: none;
  color: #2c3e50;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

nav a:hover {
  background-color: #f0f0f0;
}

nav a.router-link-exact-active {
  background-color: #42b883;
  color: white;
}

nav a.router-link-exact-active:hover {
  background-color: #42b883;
}
</style>
