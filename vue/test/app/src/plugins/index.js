import VirtualScroll from './VirtualScroll.vue'
const plugin = {
    install(Vue){
        Vue.component('VirtualScroll',VirtualScroll)
    }
}

export default plugin