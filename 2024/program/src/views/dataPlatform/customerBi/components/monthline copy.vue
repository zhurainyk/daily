<template>
    <div class="monthline" :id="props.lineId"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { watch, computed, onBeforeUnmount, ref } from 'vue'
const props = defineProps({
    lineId: {
        type: String,
        require: true
    },
    lineColor: {
        type: Array,
        require: true,
        default: ['#009AFC', '#FF6882', '#9544E3', '#5ed8a7']
    },
    areaColor: {
        type: Array,
        require: true,
        default: [['rgba(0, 154, 252, 1)', 'rgba(1, 22, 53, .5)'], ['#FF6882', '#041A41'], ['#9544E3', 'rgba(1, 22, 53, .5)'], ['#5ed8a7', '#041A41']],

    },
    data: {
        type: Array,
        require: true,
        default: [
            {
                data: {
                    faultCount: 5,
                    totalCount: 10,
                    trappedCount: 4
                },
                month: 7
            },
            {
                data: {
                    faultCount: 8,
                    totalCount: 12,
                    trappedCount: 2
                },
                month: 8
            },
            {
                data: {
                    faultCount: 9,
                    totalCount: 15,
                    trappedCount: 3
                },
                month: 9
            }
        ]

    },
    title: {
        type: String

    },
    tooltip: {
        type: String,
        default: '月'
    },
    interval: {
        type: Number,
        default: 0
    },
    xKey: {
        type: String,
        default: 'month'
    },
    yKey: {
        type: Array,
        default: []
    },
})
onBeforeUnmount(() => {
    if (echartsDom.value) {
        echartsDom.value.dispose()
        echartsDom.value.clear()
    }
})
const optionData = computed(() => {
    let xLabel = []
    const obj = {}

    props.yKey.forEach(key => {
        obj[key] = []
    })
    if (props.data.length) {
        console.log(props.data, props.yKey)
        props.data.forEach(item => {
            xLabel.push(item[props.xKey])
            obj.unit = item.desc || ''
            props.yKey.forEach(key => {
                obj[key].push(item.data[key] || 0)
            })
        })
    }

    obj.xLabel = xLabel
    return obj
})

const word = {
    'trappedCount': '困人',
    "faultCount": '故障停梯',
    "totalCount": '总数',
    'trapped': '困人',
    "fault": '故障停梯',
    "total": '总数',
    'upkeep': '维保'

}
const echartsDom = ref('')
watch(() => optionData, newVal => {

    let xLabel = optionData.value.xLabel
    const option = {
        tooltip: {
            trigger: "axis",
            formatter: function (param) {


                let content = `<h2>${param[0].axisValue}${props.tooltip}</h2>`
                param.forEach((item, index) => {
                    content += `<div>${word[item.seriesName]}：${item.value}${optionData.value.unit}</div>`
                })
                return content
            }
        },
        title: {
            text: props.title ? props.title : '',
            textStyle: {
                color: '#fff',
                align: 'center',
                fontSize: 14
            },
            // subtext: bugsObj.desc,
            // subtextStyle: {
            //     color: '#fff',
            //     align: 'center',
            //     fontSize: 14
            // },
            itemGap: 2,
            top: '0%',
            left: 'center',
        },
        grid: {
            top: "8%",
            left: "2%",
            right: "3%",
            bottom: "10%",

        },

        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                axisLine: {
                    //坐标轴轴线相关设置。数学上的x轴
                    show: true,
                    lineStyle: {
                        color: "rgba(22, 99, 180, .2)",
                    },
                },
                axisLabel: {
                    //坐标轴刻度标签的相关设置
                    textStyle: {
                        color: "#fff",
                        // padding: 16,
                        fontSize: 10,
                    },
                    interval: props.interval,
                    show: true,
                    formatter: function (data) {
                        return data;
                    },
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: "red",
                    },
                },
                axisTick: {
                    show: false,
                },
                data: xLabel,
            },
        ],
        yAxis: [
            {
                type: "value",
                gridIndex: 0,
                splitLine: {
                    show: false,
                },
                backgroundColor: "",
                axisTick: {
                    show: false,
                },
                show: false,

                axisLine: {
                    lineStyle: {
                        color: 'red',
                    },
                    show: false,
                },
                axisLabel: {
                    color: "rgb(170,170,170)",
                    formatter: "{value} %",
                    show: false,
                },
            },
        ],
        series: [],
    };
    props.yKey.forEach((key, index) => {
        const x = {
            name: key,
            type: "line",
            symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbolSize: 0,
            smooth: true,
            lineStyle: {
                normal: {
                    width: 4,
                    color: props.lineColor[index], // 线条颜色
                },
                borderColor: "rgba(0,0,0,.4)",
            },
            itemStyle: {
                color: "rgba(25,163,223,1)",
                borderColor: "#646ace",
                borderWidth: 2,
            },
            tooltip: {
                show: true,
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0,
                                color: props.areaColor[index][0],
                            },
                            {
                                offset: 1,
                                color: props.areaColor[index][1],
                            },
                        ],
                        false
                    ),
                    shadowColor: "transparent",
                    shadowBlur: 20,
                },
            },
            data: optionData.value[key],
        }
        option.series.push(x)
    })
    setTimeout(() => {
        echartsDom.value = echarts.init(document.getElementById(props.lineId))
        echartsDom.value.setOption(option)
    })
}, {
    deep: true,
    immediate: true
})

</script>

<style scoped>
.monthline {
    width: 100%;
    height: 100%;
}
</style>