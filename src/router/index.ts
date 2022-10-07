import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { devRoutes } from './dev-routes'

// @ts-ignore
const devModeRoutes = import.meta.env.DEV ? devRoutes : []

const router = createRouter({
  // @ts-ignore
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/m/:id',
      name: 'sitemap',
      component: () => import('../views/SitemapView/SitemapView.vue')
    },
    ...devModeRoutes,
  ]
})

export default router
