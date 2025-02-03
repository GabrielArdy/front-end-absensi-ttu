const routes = [
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/home',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') },
      { path: '/report', component: () => import('pages/Report.vue') },
      { path: '/profile', component: () => import('pages/Profile.vue') }
    ]
  },
  {
    path: '/camera',
    component: () => import('layouts/Frame.vue'),
    children: [
      {
        path: '/checkin',
        component: () => import('pages/CheckIn.vue'),
        name: 'PageCheckIn'
      },
      {
        path: '/checkout',
        component: () => import('pages/CheckOut.vue'),
        name: 'PageCheckOut'
      }
    ]
  },
  {
    path: '/qr',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/QRPage.vue') }
    ]
  },
  {
    path: '/alter',
    component: () => import('layouts/Frame.vue'),
    children: [
      { path: '', component: () => import('pages/Alter.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
