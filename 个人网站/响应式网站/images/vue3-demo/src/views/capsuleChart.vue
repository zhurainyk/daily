<template>
    <dv-capsule-chart :config="config" :style="style" />
</template>

<script setup>
import {reactive,computed} from 'vue'

const {width,height,padding,config} = defineProps({
    width:{
        type:String,
        default:'100%'
    },
    height:{
        type:String,
        default:'200px'
    },
    padding:{
        type:String,
        default:'10px'
    },
    config:{
        type:Object,
        default:()=>({
            data: [
        {
            name: '南阳',
            value: 167
        },
        {
            name: '周口',
            value: 123
        },
        {
            name: '漯河',
            value: 98
        },
        {
            name: '郑州',
            value: 75
        },
        {
            name: '西峡',
            value: 66
            },
        ],
        colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
        unit: '万元'
        })
    },
})

const style = computed(()=>({
    width,
    height,
    padding
}))

</script>