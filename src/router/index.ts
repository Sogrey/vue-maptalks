import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/pitch-rotate',
      name: 'pitch-rotate',
      component: () => import('../views/PitchRotateView.vue'),
    },
    {
      path: '/panning',
      name: 'panning',
      component: () => import('../views/PanningView.vue'),
    },
    {
      path: '/fit-extent',
      name: 'fit-extent',
      component: () => import('../views/FitExtentView.vue'),
    },
    {
      path: '/status',
      name: 'status',
      component: () => import('../views/StatusView.vue'),
    },
    {
      path: '/canvas',
      name: 'canvas',
      component: () => import('../views/CanvasView.vue'),
    },
    {
      path: '/map-events',
      name: 'map-events',
      component: () => import('../views/MapViewEvents.vue'),
    },
    {
      path: '/sync-map',
      name: 'sync-map',
      component: () => import('../views/SyncMapView.vue'),
    },
    {
      path: '/export-image',
      name: 'export-image',
      component: () => import('../views/ExportImageView.vue'),
    },
    {
      path: '/wms',
      name: 'wms',
      component: () => import('../views/WMSView.vue'),
    },
  ],
})

export default router
