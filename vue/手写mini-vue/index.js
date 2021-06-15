import Vue from './myvue/vue.js'
let vm = new Vue({
    el:'#app',
    data:{
        msg:'hello world',
        name:'zhurainyk',
        obj:{
            width:111,
            height:222,
            child:{
                name:333
            }
        }
    },
    methods:{
        handle(){
            console.log('1111')
        },
         handle2(){
            console.log('222a')
        },
    }
})
console.log('运行成功',vm)