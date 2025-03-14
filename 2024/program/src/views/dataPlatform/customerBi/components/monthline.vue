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
const echartsDom = ref('')
/**
 * 注意：
 * props.data 中所有数据必须在同一个层级 不能嵌套
 * tooltip旧的写法已经不能兼容了
 */
const word = {
    'trappedCount': '困人',
    "faultCount": '故障停梯',
    "totalCount": '总数',
    'trapped': '困人',
    "fault": '故障停梯',
    "total": '总数',
    'upkeep': '维保'

}
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

watch(() => optionData, newVal => {
    let xLabel = optionData.value.xLabel
    const option = {
        title: {
            text: props.title ? props.title : '',
            textStyle: {
                color: '#fff',
                align: 'center',
                fontSize: 14
            },
            itemGap: 2,
            top: '0%',
            left: 'center',
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (param) {
                console.log(param)
                let content = `<h2>${param[0].axisValue}${props.tooltip}</h2>`
                param.forEach((item, index) => {
         
                    content += `<div>  ${word[item.seriesName]}：${item.value}${optionData.value.unit}</div>`
                })
                return content
            },
            axisPointer: {
                label: {
                    show: false,
                    backgroundColor: '#fff',
                    color: '#556677',
                    borderColor: 'rgba(0,0,0,0)',
                    shadowColor: 'rgba(0,0,0,0)',
                    shadowOffsetY: 0
                },
                lineStyle: {
                    width: 0
                }
            },
            backgroundColor: '#fff',
            textStyle: {
                color: '#5c6c7c'
            },
            padding: [10, 10],
            extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
        },
        grid: {
            top: "8%",
            left: "2%",
            right: "3%",
            bottom: "10%",
        },
        xAxis: [{
            type: 'category',
            data: xLabel,
            axisLine: {
                lineStyle: {
                    color: "rgba(22, 99, 180, .2)",
                },
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                // 默认x轴字体大小
                fontSize: 12,
                // margin:文字到x轴的距离
                // margin: 15,
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
            boundaryGap: false
        }],
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
            {
                type: 'value',
                position: 'right',
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#556677'
                    },
                    formatter: '{value}',
                    show: false,
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#DCE2E8'
                    }
                },
                splitLine: {
                    show: false
                }
            }
        ],
        series: [

            // {
            //     name: 'Adidas',
            //     type: 'line',
            //     data: [10, 10, 30, 12, 15, 3, 7],
            //     symbolSize: 1,
            //     symbol: 'circle',
            //     smooth: true,
            //     yAxisIndex: 0,
            //     showSymbol: false,
            //     lineStyle: {
            //         width: 5,
            //         color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
            //             offset: 0,
            //             color: '#9effff'
            //         },
            //         {
            //             offset: 1,
            //             color: '#9E87FF'
            //         }
            //         ]),
            //         shadowColor: 'rgba(158,135,255, 0.3)',
            //         shadowBlur: 10,
            //         shadowOffsetY: 20
            //     },
            //     itemStyle: {
            //         normal: {
            //             color: colorList[0],
            //             borderColor: colorList[0]
            //         }
            //     }
            // }, 
            // {
            //     name: 'Nike',
            //     type: 'line',
            //     data: [5, 12, 11, 14, 25, 16, 10],
            //     symbolSize: 1,
            //     symbol: 'circle',
            //     smooth: true,
            //     yAxisIndex: 0,
            //     showSymbol: false,
            //     lineStyle: {
            //         width: 5,
            //         color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
            //             offset: 0,
            //             color: '#73DD39'
            //         },
            //         {
            //             offset: 1,
            //             color: '#73DDFF'
            //         }
            //         ]),
            //         shadowColor: 'rgba(115,221,255, 0.3)',
            //         shadowBlur: 10,
            //         shadowOffsetY: 20
            //     },
            //     itemStyle: {
            //         normal: {
            //             color: colorList[1],
            //             borderColor: colorList[1]
            //         }
            //     }
            // },
            // {
            //     name: '老北京布鞋',
            //     type: 'line',
            //     data: [150, 120, 170, 140, 500, 160, 110],
            //     symbolSize: 1,
            //     yAxisIndex: 1,
            //     symbol: 'circle',
            //     smooth: true,
            //     showSymbol: false,
            //     lineStyle: {
            //         width: 5,
            //         color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
            //             offset: 0,
            //             color: '#fe9a'
            //         },
            //         {
            //             offset: 1,
            //             color: '#fe9a8b'
            //         }
            //         ]),
            //         shadowColor: 'rgba(254,154,139, 0.3)',
            //         shadowBlur: 10,
            //         shadowOffsetY: 20
            //     },
            //     itemStyle: {
            //         normal: {
            //             color: colorList[2],
            //             borderColor: colorList[2]
            //         }
            //     }
            // }

        ]
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
        const echartsDom = echarts.init(document.getElementById(props.lineId))
        echartsDom.setOption(option)
    })
}, {
    deep: true,

})

</script>

<style scoped>
.monthline {
    width: 100%;
    height: 100%;
}
</style>