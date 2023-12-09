<script setup>
import {ref,onMounted} from 'vue'
import ModuleTitle from './moduleTitle.vue'
import ModuleMiddle from './moduleMiddle.vue'
import ModuleThird from './moduleThird.vue'

let loading = ref(true);
onMounted(()=>{
    setTimeout(()=>{
        loading.value = false;
    },1000)
})
</script>

<template>
    <dv-full-screen-container>
        <dv-loading v-if="loading">正在加载......</dv-loading>
        <div v-else>
            <ModuleTitle />
            <ModuleMiddle/>
            <ModuleThird />
        </div>
    </dv-full-screen-container>
</template>
<style>
</style>