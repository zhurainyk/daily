import VirtualScroll from './VirtualScroll.vue'
const plugin = {
    install(Vue){
        console.log('222')
        Vue.component('VirtualScroll',VirtualScroll)
    }
}

console.log('1')
export default plugin