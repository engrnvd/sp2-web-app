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
      component: () => import('../views/projects/index.vue'),
      children: [
        {
          path: 'create',
          name: 'projects.create',
          component: () => import('../views/projects/create.vue'),
        },
      ],
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/p/:id?',
      name: 'sitemap',
      component: () => import('../views/SitemapView/SitemapEditor.vue')
    },
    { path: '/email-verified', component: () => import('@/views/EmailVerifiedView.vue') },
    ...devModeRoutes,
  ]
})

export default router
