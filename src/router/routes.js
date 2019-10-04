
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'base64', component: () => import('pages/Base64.vue') },
      { path: 'qrgenerator', component: () => import('pages/Index.vue') },
      { path: 'qrreader', component: () => import('pages/QRReader.vue') },
      { path: 'todo', component: () => import('pages/Todo.vue') },
      { path: 'cordovatodo', component: () => import('pages/TodoCordova.vue') },
       { path: 'report', component: () => import('pages/Report.vue') },
      { path: 'location', component: () => import('pages/Location.vue') },
      { path: 'vuextodo', component: () => import('pages/vuextodo.vue') },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
