<template>
    <div>
        <button @click='add'>点击</button>
        <div>{{a}}</div>
        <div v-for='item in list' :key='item'>{{item}}</div>
    </div>
</template>

<script>
    // import { ref, reactive } from 'vue';

    export default {
       data(){
           return {
               a:1,
              
           }
       },
       computed:{
            list:{
                get(){
                    return [1,2,3,4]
                },
                set(v){
                    console.log(v)
                }
            }
       },
       methods:{
           add(){
               this.a  += 5
                console.log(this.$route )
              
               this.list= this.list.push(this.a)
           }
       }
    }
</script>

<style lang="scss" scoped>

</style>