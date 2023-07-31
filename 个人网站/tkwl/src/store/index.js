import { defineStore } from 'pinia'

export const store = defineStore({
    id: 'store',
    state: () => ({
        _wow:sessionStorage.getItem('wow')|| true
    }),
    getters:{
        wow:(state)=>state._wow
    },
    actions: {
        setWow(v) {
            this._wow = v
            sessionStorage.setItem('wow',v)
        },
        // actions 可以是异步的
        // async asyncCountPlus() {
        //     const res = await axios.get('xxxx')
        //     this.count = res.data
        // }
    }
})

// import {defineStore} from "pinia";
// import {ref, computed} from "vue"; 
// export const useCountStore = defineStore('count', ()=>{
//     const count = ref(0)
//     const dbCount = computed(()=>count.value*2)
//     const userInfo = reactive({
//         name: 'yxx',
//         age: 12
//     })
//     function countPlus(){
//         count.value++
//     }
// ​
//     return {count, dbCount, userInfo, countPlus}
// }) 