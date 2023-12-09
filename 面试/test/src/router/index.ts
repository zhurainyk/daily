import { createRouter, createWebHistory } from 'vue-router'
import main from '../views/main.vue'
import babel from '@/views/babel/babel-test.vue'
import virturescroll from '@/views/virtureScroll/virture-scroll.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: main
    },
    {
      path:'/babel',
      name:'babel',
      component: ()=>import('@/views/babel/babel-test.vue')
    },
       {
      path:'/virturescroll',
      name:'virturescroll',
      component: virturescroll
    }
  ]
})

export default router
