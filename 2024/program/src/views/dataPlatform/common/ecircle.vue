<template>
    <div style="width: 100% !important; height: 100% !important" :id="domId"></div>
</template>
<script>
export default {
    name: 'ecircle'
}
</script>
<script setup>
import * as echarts from 'echarts'
import { ref, reactive, computed, watch, onMounted } from 'vue'
const props = defineProps({
    // modelValue: {
    //     type: Number,
    //     default: 0
    // },
    // text: {
    //     type: String,
    //     default: () => '在线率'
    // },
    value: {
        type: [String, Number],
        default: 0
    },
    label: {
        type: String,
        default: '在线率'
    }

})
const Value = computed(() => props.value)
const Label = computed(() => props.label)
const domId = computed(() => 'circle_' + Math.random().toString().slice(5))
const initEacharts = (percent = '95%', text = '') => {
    const percentNum = String(percent).slice(0, -1)
    const option = {
        backgroundColor: "transparent",
        title: [
            {
                text: percent,
                subtext: text,
                x: "center",
                y: "center",
                itemGap: -5,
                textStyle: {
                    fontSize: "22",
                    color: "#23FFFC",
                    fontFamily: "MicrosoftYaHei",
                    // foontWeight: "normal",
                },

                subtextStyle: {
                    fontSize: 12,
                    color: "#fff",
                },
            },
        ],
        polar: {
            radius: ["85%", "100%"],
            center: ["50%", "50%"],
        },
        angleAxis: {
            max: 100,
            show: false,
        },
        radiusAxis: {
            type: "category",
            show: true,
            axisLabel: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
        },
        series: [
            {
                name: "",
                type: "bar",
                roundCap: true,
                barWidth: 20,
                showBackground: true,
                backgroundStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "#163c67",
                        },
                        {
                            offset: 1,
                            color: "#7f8ea6",
                        },
                    ]),
                },
                avoidLabelOverlap: false,
                data: [percentNum],
                coordinateSystem: "polar",
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "#6cddff",
                        },
                        {
                            offset: 1,
                            color: "#16a2ad",
                        },
                    ]),
                },
            },
        ],
    };
    setTimeout(()=>{
        const nodeDom = document.getElementById(domId.value)
        const circleDom = echarts.init(nodeDom);
        nodeDom.setAttribute('_echarts_instance_', '')
        circleDom.setOption(option);
    })
}
watch(() => Value, v => {
    console.log({ v, Label })
    if (v) {
        setTimeout(() => {
            initEacharts(v.value, Label.value)
        })
    }
}, {
    immediate: true,
    deep: true
})

const emits = defineEmits(['update:modelValue'])
const updateValue = (num) => {
    emits('update:modelValue', num)
}
</script>