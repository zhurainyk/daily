import {
 createRouter,
 createWebHistory
} from 'vue-router'
import home from '../h5App.vue'

const history = createWebHistory()

const router = createRouter({
 history,
 routes: [{
  path: '/serverreport',
  component: home
 }]
})
export default router;
