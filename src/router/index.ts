import { createRouter, createWebHashHistory, RouteRecordRaw, RouteLocationNormalized } from 'vue-router'
import Home from '../views/Home.vue'
import router_sheet from '../router/sheet'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  ...router_sheet,
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
