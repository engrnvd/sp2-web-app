import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { devRoutes } from './dev-routes'

// @ts-ignore
const devModeRoutes = import.meta.env.DEV ? [
  {
    path: '/dev',
    name: 'dev',
    component: () => import('../views/dev/DevView.vue'),
    children: [...devRoutes]
  }
] : []

const router = createRouter({
  // @ts-ignore
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    ...devModeRoutes,
  ]
})

export default router
