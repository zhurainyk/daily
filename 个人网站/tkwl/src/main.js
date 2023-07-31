import { createApp } from 'vue'
import { createRouter } from '@/router'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'

/* swiper */
// import 'swiper/swiper.min.css'
import './assets/css/swiper-bundle.min.css'
import './assets/js/swiper-bundle.min.js'
/* 重置样式 */
import './assets/css/reset.min.css'

// import 'jquery'

import './assets/css/bootstrap.min.css'
import './assets/js/bootstrap.min.js'

/*wow animate.css */
import 'wow.js/css/libs/animate.css'
import autoWow from '@/utils/wow.js'
const pinia = createPinia()

import App from './App.vue'

const router = createRouter()


const app = createApp(App)
app.mixin(autoWow)
app.use(ElementPlus)
app.use(pinia)
import {useCrumbStore} from '@/store/bread'
const crumbStore = useCrumbStore()
//路由前置守卫
router.beforeEach((to, from, next) => { 
    const crumbItemList = to.matched.map((item) => ({
        to: { ...item },
        name: item.name
    })); 
    crumbStore.replaceCrumb(crumbItemList);
    next()
});

app.use(router).mount('#app')

