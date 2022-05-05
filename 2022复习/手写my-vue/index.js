

import Vue from './vue/vue.js'

const vm  = new Vue({
    el:'#app',
    data:{
        msg:'hello world',
        name:'zhuyu'
    },
    methods:{
        handleClick(){
            alert('xxxx')
        }
    }
})
console.log(vm)