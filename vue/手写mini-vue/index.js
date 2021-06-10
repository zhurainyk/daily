import Vue from './vue.js'
let vm = new Vue({
    el:'#app2',
    data:{
        msg:'hello world',
        name:'zhurainyk'
    },
    methods:{
        handle(){
            console.log('1111')
        }
    }
})
console.log('1')