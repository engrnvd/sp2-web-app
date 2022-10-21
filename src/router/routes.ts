import { useAuthStore } from 'src/stores/auth.store'
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
      meta: { auth: true },
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
      meta: { auth: true },
      component: () => import('../views/profile/Profile.page.vue'),
      children: [
        {
          path: 'change-password',
          name: 'change-password',
          component: () => import('../views/profile/ChangePassword.page.vue'),
        },
        {
          path: 'delete-account',
          name: 'delete-account',
          component: () => import('../views/profile/DeleteAccount.page.vue'),
        },
      ]
    },
    {
      path: '/subscription',
      name: 'subscription',
      component: () => import('../views/subscription/Subscription.page.vue')
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

router.beforeEach(async (to, from) => {
  const auth = useAuthStore()
  const needsAuth = to.meta.auth || (to.name === 'sitemap' && to.params.id !== 'new')
  if (!auth.isLoggedIn && needsAuth) {
    auth.showLoginModal()
    return '/'
  }
})

export default router
