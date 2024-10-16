<template>
   <el-input v-model="num"></el-input>
   <el-button></el-button>
</template>

<script setup>
 import {ref,reactive,computed,watch,defineProps,defineEmits,defineExpose} from 'vue'

const props = defineProps({
    name:{
        type:String,
        default:'test'
    }
})
let num = ref(0)
const $emit = defineEmits(['add'])


</script>

<style>

</style>