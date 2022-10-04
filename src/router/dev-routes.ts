export const devRoutes = [
  {
    path: '/dev',
    name: 'dev',
    component: () => import('../views/dev/DevView.vue'),
    children: [
      {
        path: 'buttons',
        component: () => import('../views/dev/Buttons.vue')
      },
      {
        path: 'inputs',
        component: () => import('../views/dev/InputsView.vue')
      },
    ]
  }

]
