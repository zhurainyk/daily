
<template>
  <div>
    <button v-for='x in navList' :key='x.label' @click='handleRouter(x)'>{{x.label}}</button>
  </div>
  
  <RouterView /> 
</template>
<script setup lang="ts">
import { RouterLink, RouterView ,useRouter} from 'vue-router'
 import {ref} from 'vue'
 const navList = ref([
   {
     label:'babel',
     path:'babel'
   },
   {
     label:'virtureScroll',
     path:'virturescroll'
   }
 ])
 const currentNav = ref(0)

 const router = useRouter()
 const handleRouter = (x) =>{
   router.push({name:x.path})
 }
</script>

<style scoped>
 
</style>
