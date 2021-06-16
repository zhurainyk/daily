import Vue from "./myvue/vue.js";


let vm = new Vue({
    data:{
        msg:'hello world',
        name:'zhuyu'
    },
    el:'#app',
    methods:{
        handleClick(){
            console.log('click')
        }
    }
})
console.log('执行完毕',vm)