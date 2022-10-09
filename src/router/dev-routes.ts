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
      {
        path: 'notify',
        component: () => import('../views/dev/NotifyView.vue')
      },
      {
        path: 'confirm',
        component: () => import('../views/dev/ConfirmView.vue')
      },
      {
        path: 'dropdown',
        component: () => import('../views/dev/DropdownView.vue')
      },
      {
        path: 'editable',
        component: () => import('../views/dev/EditableView.vue')
      },
    ]
  }

]
