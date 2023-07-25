import { createRouter, createWebHistory } from 'vue-router'
import Base from '@/views/public/Base'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    redirect: '/dashboard/index',
    name: 'Dashboard',
    component: Base,
    children: [
      {
        path: '/dashboard/index',
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard/Index.vue'),
      }
    ]
  },
  {
    path: '/articles',
    redirect: '/articles/index',
    name: 'Articles',
    // component: () => import(/* webpackChunkName: "home" */ '../views/article/Articles.vue'),
    component: Base,
    children: [
      {
        path: '/articles/index',
        component: () => import(/* webpackChunkName: "home" */ '../views/article/Articles.vue'),
      },
      {
        path: '/articles/add',
        component: () => import(/* webpackChunkName: "home" */ '../views/article/AddArticle.vue'),
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
