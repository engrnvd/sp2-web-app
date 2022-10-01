export const devRoutes = [
  {
    path: '/buttons',
    component: () => import('../views/dev/Buttons.vue')
  },
  {
    path: '/inputs',
    component: () => import('../views/dev/InputsView.vue')
  },
]
