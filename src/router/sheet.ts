import { RouteRecordRaw, RouteLocationNormalized, RouteLocationRaw } from 'vue-router'

function isValidParamsOfSheet(to:RouteLocationNormalized): boolean | RouteLocationRaw{
    const action:string = Array.isArray(to.params.action) ? to.params.action[0] : to.params.action;
    return ['input', 'confirm', 'complete'].includes(action) ? true : {path: '/sheet'};
  }

const router_sheet: Array<RouteRecordRaw> = [
    {
        path: '/sheet/create/:action',
        name: 'SheetCreate',
        component: () => import('../views/Sheet.vue'),
        beforeEnter: [isValidParamsOfSheet],
      },
      {
        path: '/sheet/:id/:action',
        name: 'SheetEdit',
        component: () => import('../views/Sheet.vue'),
        beforeEnter: [isValidParamsOfSheet],
      },
      {
        path: '/sheet/:id/',
        name: 'SheetDetail',
        component: () => import('../views/Sheet.vue'),
      },
      {
        path: '/sheet',
        redirect: '/sheet/create/input',
      },
]


export default router_sheet