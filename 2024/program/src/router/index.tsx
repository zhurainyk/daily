import { createRouter, createWebHistory } from 'vue-router'
import { menuRoute, perfiex } from './menu'
import { parseQueryVz, stringifyQueryVz } from './routerUtil'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...menuRoute.whiteList,
    ...menuRoute.singlePage,
    {
      path: `/${perfiex}`,
      component: () => import('@/views/layout/layout'),
      children: [...menuRoute.routes]
    }
  ],
  stringifyQuery: stringifyQueryVz,
  parseQuery: parseQueryVz
})

export default router
