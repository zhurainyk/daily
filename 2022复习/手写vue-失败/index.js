import Vue from './vue/vue.js'

const vm = new Vue({
    el:'#app',
    data:{
        msg:'hello'
    },
    methods:{
        handle(){
            alert('xxx')
        }
    }
})

console.log(vm)