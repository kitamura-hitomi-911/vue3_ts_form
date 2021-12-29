import { createRouter, createWebHashHistory, RouteRecordRaw, RouteLocationNormalized } from 'vue-router'
import Home from '../views/Home.vue'

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
  {
    path: '/sheet/:action',
    name: 'Sheet',
    component: () => import('../views/Sheet.vue'),
    beforeEnter: [isValidParamsOfSheet],
  },
  {
    path: '/sheet',
    redirect: '/sheet/input',
  },
]

function isValidParamsOfSheet(to:RouteLocationNormalized){
  const action:string = Array.isArray(to.params.action) ? to.params.action[0] : to.params.action;
  return ['input', 'edit', 'confirm', 'complete', 'show'].includes(action) ? true : {path: '/sheet'};
}

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
