<template>
    <div class="cbutton" @click="change">
        {{currentDirect.label}}
    </div>
</template>

<script setup>
import { computed, reactive, ref, watch, onMounted } from 'vue'
const emit = defineEmits(['change'])
const props = defineProps({
    directList: {
        type: Array,
        default: [{
            label: '全部',
            value: 'A020'
        }, {
            label: '部分',
            value: 'A120'
        }]
    },
    originKey: {
        type: String,

        default: 'A020'
    }
})
const directLen = computed(() => {
    return props.directList.length
})
const directList = computed(() => {
    return props.directList
})
const originKey = computed(() => props.originKey)
let index = ref(0);
let currentDirect = computed(() => directList.value[index.value])
const change = () => {

    ++index.value;

    if (index.value == directLen.value) {
        index.value = 0;
    }
    setTimeout(() => {

        emit('change', originKey.value, currentDirect.value.value)
    })
}


</script>

<style scoped>
.cbutton {
    width: 60px;
    height: 26px;
    background: rgba(35, 154, 255, 0.2);
    border: 1px solid rgba(35, 154, 255, 0.3);
    line-height: 26px;
    font-size: 14px;
    color: #009AFC;
    text-align: center;
    text-indent: 0;

}

.cbutton:hover {
    cursor: pointer;
    box-shadow: 0 0 1px rgba(35, 154, 255, 0.3), 0 0 3px rgba(35, 152, 255, 0.39);
    transition-duration: .2s;
}
</style>