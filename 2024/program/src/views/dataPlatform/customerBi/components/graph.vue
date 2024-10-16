<template>
    <div :id="props.graphId" class="common-graph"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { watch, computed, ref, reactive, inject, onMounted } from 'vue'
const props = defineProps({
    data: {
        type: Array,
        default: []
    },
    graphId: {
        type: String,
        require: true
    },
    showInfinity: {
        type: Boolean,
        default: false
    },
    fullscreen: {
        type: Boolean,
        default: false
    }
})
let max = 0
let maxNum = 0
const optionData = computed(() => {
    const xLabel = props.data.reduce((cur, pre) => {
        return [...cur, pre.name]
    }, [])
    let yLabel
    // let idData = props.data.reduce((pre, c) => {
    //     return [...pre, { value: c.data, id: parseInt(Math.random() * 100) }]
    // }, [])
    if (props.showInfinity) {
        max = props.data.reduce((cur, pre) => {
            return [...cur, isNaN(parseInt(pre.data)) ? 0 : parseInt(pre.data)]
        }, [])
        maxNum = Math.max(...max)

        max = maxNum * 1.3
        if (max == 0) {
            max = 500000
        }
        yLabel = props.data.reduce((cur, pre) => {
            return [...cur, { value: pre.data == '无故障' ? max : pre.data, elevatorId: pre.id || '' }]  //
        }, [])

    } else {
        yLabel = props.data.reduce((cur, pre) => {
            return [...cur, { value: pre.data, elevatorId: pre.id || '' }]
        }, [])
    }
    const colors = props.data.reduce((pre, c) => {
        return [...pre, (c.color ? c.color.split(',') : ["#58E3FD", "#1796FF"])]
    }, [])
    return {
        xLabel, yLabel, colors
    }
})

let myChartinterval
const draw = () => {
    if (myChartinterval) {
        myChartinterval.dispose()
    }
    myChartinterval = echarts.init(
        document.getElementById(props.graphId)
    );
    let brandXData = optionData.value.xLabel || ['西莱特', '威斯特', '迅达', '曼斯顿', '奥的斯', '西奥', '富士', '快意']
    let brandYData = optionData.value.yLabel || [102, 33, 45, 66, 25, 74, 19, 88]

    let colors = optionData.value.colors || [["#58E3FD", "#1796FF"], ["#58E3FD", "#1796FF"], ["#58E3FD", "#1796FF"], ["#58E3FD", "#1796FF"], ["#58E3FD", "#1796FF"], ["#58E3FD", "#1796FF"], ["#58E3FD", "#1796FF"], ["#58E3FD", "#1796FF"]]

    const option = {
        backgroundColor: "transparent", //背景色
        grid: {
            left: "2%",
            right: "2%",
            bottom: "2%",
            top: "5%",
            containLabel: true,
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "none",
            },
            formatter: function (params) {
                if (props.showInfinity && params[0].value == max) {
                    return params[0].name + " : " + '无故障';
                } else {
                    return params[0].name + " : " + params[0].value;
                }

            },
        },
        xAxis: {
            show: false,
            type: "value",
        },
        yAxis: [
            {
                type: "category",
                inverse: true,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: "#F0F0F0",
                        fontSize: 13,
                    },
                    formatter(params) {

                        if (params.length <= 4) {
                            return params
                        } else {
                            return params.slice(0, 3) + '...'
                        }
                    }
                },
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                data: brandXData,
                triggerEvent: true
            },
            {
                type: "category",
                inverse: true,
                axisTick: "none",
                axisLine: "none",
                show: false,
                axisLabel: {
                    textStyle: {
                        color: "#F0F0F0",
                        fontSize: "12",
                    },
                    margin: 8
                },
                data: brandYData,
            },

        ],
        dataZoom: [
            {
                type: 'slider',
                yAxisIndex: 0,
                startValue: 0,
                endValue: 6,
                show: true,
                borderColor: 'transparent',
                borderCap: 'round',
                zoomLock: true,
                brushSelect: false,
                borderColor: 'transparent',
                borderCap: 'round',
                zoomOnMouseWheel: true,
                //组件高度
                width: 4,
                top: 5, //左边的距离
                right: 0, //右边的距离
                bottom: 5, //右边的距离
                fillerColor: 'rgba(27,90,169,1)',
                // handleIcon: 'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5M36.9,35.8h-1.3z M27.8,35.8 h-1.3H27L27.8,35.8L27.8,35.8z',// 画一个圆形
                handleSize: '100%',
                handleStyle: {
                    color: 'rgba(27,90,169,1)',
                    borderWidth: 0
                },
                backgroundColor: 'rgba(37, 46, 100, 0.8)', //两边未选中的滑动条区域的颜色
                showDataShadow: false, //是否显示数据阴影 默认auto
                showDetail: false, //即拖拽时候是否显示详细数值信息 默认true
                filterMode: 'filter'
            }
        ],
        series: [
            {
                name: "值",
                type: "bar",
                zlevel: 1,
                itemStyle: {
                    normal: {
                        barBorderRadius: 4,
                        label: {
                            //在柱状图挨着显示文字
                            show: true,
                            position: "right",
                            color: "#F0F0F0",
                            formatter(params) {
                                if (props.showInfinity && params.value == max) {
                                    return '无故障'
                                } else {
                                    return params.value
                                }

                            },
                        },
                        color: function (params) {
                            return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                {
                                    offset: 0,
                                    color: colors[params.dataIndex][0],
                                },
                                {
                                    offset: 1,
                                    color: colors[params.dataIndex][1],
                                },
                            ])
                        },
                    },
                },
                barWidth: 8,
                data: brandYData,

            },
            // {
            //     name: "id",
            //     type: "bar",
            //     backgroundColor: "rgba(255,255,255,0)",
            //     barWidth: 20,
            //     barGap: "-130%",
            //     data: id,
            //     itemStyle: {
            //         normal: {
            //             color: "rgba(24,31,68,1)",
            //             barBorderRadius: 4,
            //         },
            //     },
            // },

        ],
    };
    myChartinterval.setOption(option);

    myChartinterval.off('click')
    myChartinterval.on('click', function (params) {
        console.log({ params })
        $bus.emit('showToast', { elevatorId: params.data.elevatorId, elevatorName: params.name, value: params.value })

        // eleinfo_ref.value.showToast({ elevatorId: params.data.elevatorId, elevatorName: params.name, value: params.value })
    })
}
watch(() => props.fullscreen, v => {
    setTimeout(() => {
        setTimeout(draw)
    })
}, {
    deep: true,
    immediate: true
})


watch(() => props.data, vx => {
    setTimeout(() => {
        setTimeout(draw)
    })
}, {
    deep: true, immediate: true
})

const $bus = inject('$bus')

</script>

<style scoped>
.common-graph {
    width: 100%;
    height: 100%;
}
</style>