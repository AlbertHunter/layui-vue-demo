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
    // component: () => import(/* webpackChunkName: "articles" */ '../views/article/Articles.vue'),
    component: Base,
    children: [
      {
        path: '/articles/index',
        component: () => import(/* webpackChunkName: "articles" */ '../views/article/Articles.vue'),
      },
      {
        path: '/articles/add',
        component: () => import(/* webpackChunkName: "articles" */ '../views/article/AddArticle.vue'),
      }
    ]
  },
  {
    path: '/orders',
    redirect: '/orders/index',
    name: 'Orders',
    component: Base,
    children: [
      {
        path: '/orders/index',
        component: () => import(/* webpackChunkName: "orders" */ '../views/order/OrderIndex.vue'),
      }
    ]
  },
  {
    path: '/member',
    redirect: '/member/index',
    name: 'Member',
    component: Base,
    children: [
      {
        path: '/member/index',
        component: () => import(/* webpackChunkName: "member" */ '../views/member/Index.vue'),
      },
      {
        path: '/member/loginLog',
        component: () => import(/* webpackChunkName: "member" */ '../views/member/LoginLog.vue'),
      }
    ]
  },
  {
    path: '/user',
    redirect: '/user/index',
    name: 'User',
    component: Base,
    children: [
      {
        path: '/User/index',
        component: () => import(/* webpackChunkName: "user" */ '../views/user/User.vue'),
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue'),
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ path: '/' }) : next()
    }
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
router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage;
  (isLogin || (to.name === 'Login' || to.name === 'Register')) ? next() : next({ name: 'Login' })
})

export default router
