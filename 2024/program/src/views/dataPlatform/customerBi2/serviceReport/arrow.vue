<template>
    <svg t="1673856006789" :style="{ transform: direction == 'up' ? 'rotate(180deg) translateY(-4px)' : 'translateY(4px)' }"
        class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2661" :width="data.size"
        :height="data.size">
        <path
            d="M554.666667 712.533333V106.666667h-85.333334v601.6l-132.266666-132.266667L277.333333 640l234.666667 234.666667 234.666667-234.666667-59.733334-59.733333-132.266666 132.266666z"
            :fill="color" p-id="2662"></path>
    </svg>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
    color: {
        type: String,
        // default: '#18C097'
    },
    dirc: {
        default: 'up',
        type: String, //方向 up down
    },
    size: {
        default: '32'
    }
})
const data = computed(() => props)
const direction = computed(() => {
    return props.dirc ? props.dirc : 'up'
})
const color = computed(() => {
    return props.color ? props.color : props.dirc == 'up' ? '#DE8536' : '#18C097';
})
</script>