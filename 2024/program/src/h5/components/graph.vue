<template>
    <div class="graph-item" :id="props.graphId"></div>
</template>

<script setup>

import * as echarts from 'echarts'

import { onMounted, ref, reactive, computed, watch } from 'vue'
const props = defineProps({
    graphId: {
        type: String,
        require: true
    },
    legendList: {
        type: Array,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    xData: {
        type: Array,
        require: true
    },
    yData1: {
        type: Array,
        require: true
    },
    yData2: {
        type: Array,
        require: true
    },
})
function debouce(fn, delay = 500) {
    let timer;
    return function () {
        const context = this;
        const arg = arguments
        if (timer) return
        timer = setTimeout(() => {

            fn.apply(context, arg)
            timer = null
        }, delay)
    }
}
onMounted(() => {
    // const debouceFn = debouce(initEcharts)
    // debouceFn()
    window.addEventListener('resize', () => {
        window.location.reload()
    })
})

watch([props.xData, props.yData1, props.yData2, props], ([xData, yData1, yData2, props_]) => {
    // console.log(xData, yData1, yData2, props_)
    //props 中的属性  必须要监听才生效  否则会出现非响应式
    initEcharts(xData, yData1, yData2)
}, {
    deep: true
})
const initEcharts = (xdata, ydata1, ydata2) => {

    console.log(...xdata)
    let xData = [], yData1 = [], yData2 = []

    xData.push(...xdata)
    yData1.push(...ydata1)
    yData2.push(...ydata2)
    if (!xData.length) {
        // return
        xData = [
            "1-1"

        ]
        yData1 = [122]
        yData2 = [12];
    }
    var myChart = echarts.init(
        document.getElementById(props.graphId)
    );
    document.getElementById(props.graphId).setAttribute('_echarts_instance_', '')

    // console.log(xData)


    // console.log(props.title)
    const option = {
        backgroundColor: "#34258E", //背景色
        grid: {
            left: "2%",
            right: "2%",
            bottom: "2%",
            top: "22%",
            containLabel: true,
        },
        title: {
            text: props.title,
            textStyle: {
                align: 'center',
                color: '#fff',
                fontSize: 14,
            },

            itemGap: 2,
            top: '2%',
            left: '35%',
        },

        legend: {
            data: props.legendList,
            //图列 只有物联网需要图例
            itemWidth: 12, //宽
            itemHeight: 12, //高
            itemGap: 15, //图例之间的间距
            show: true,
            icon: "circle",
            top: "12%", //距离顶部的位置
            // left: '1%',
            //  left:'',
            x: "center", //图例在x方向的位置
            y: "top", //图例在y方向的位置
            textStyle: {
                color: "#fff",
                fontStyle: "normal",
            },
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "none",
            },
            formatter: function (params) {
                return params[0].name + " : " + params[0].value;
            },
        },
        xAxis: {
            show: true,
            type: "value",
            splitLine: {//分割线
                show: true,
                lineStyle: {
                    color: 'rgba(255,255,255,.2)'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: "#fff",
                },
            },
        },
        yAxis: [
            {
                type: "category",
                inverse: true,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: "#fff",
                    },
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
                data: xData,
            },
            {
                type: "category",
                inverse: true,
                axisTick: "none",
                axisLine: "none",
                show: false,
                axisLabel: {
                    textStyle: {
                        color: "#ffffff",
                        fontSize: "12",
                    },
                },
                data: yData1,
            },
        ],
        dataZoom: [
            {
                type: 'inside',
                yAxisIndex: 0,
                show: false,
                startValue: 0,
                endValue: 8
            }
        ],
        series: [
            {
                name: props.legendList[0],
                type: "bar",
                zlevel: 1,
                itemStyle: {

                    normal: {
                        barBorderRadius: 0,

                        label: {
                            //在柱状图挨着显示文字
                            show: false,
                            position: "right",
                            color: "#F0F0F0",
                            fontSize: '10'
                        },
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            {
                                offset: 0,
                                color: "#1EB1A6",
                            },
                            {
                                offset: 1,
                                color: "#1EB1A6",
                            },
                        ]),

                    },
                },
                barWidth: 8,
                data: yData1,
            },
            {
                name: props.legendList[1],
                type: "bar",
                zlevel: 1,
                itemStyle: {
                    normal: {
                        barBorderRadius: 0,

                        label: {
                            //在柱状图挨着显示文字
                            show: false,
                            position: "right",
                            color: "#F0F0F0",
                            fontSize: '10'
                        },

                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            {
                                offset: 0,
                                color: "#DAB61A",
                            },
                            {
                                offset: 1,
                                color: "#DAB61A",
                            },
                        ]),
                    },
                },
                barWidth: 8,
                data: yData2,
            },


        ],
    };
    myChart.setOption(option);
    if (xData.length > 9) {
        setInterval(() => {
            if (option.dataZoom[0].endValue == xData.length) {
                option.dataZoom[0].endValue = 8;
                option.dataZoom[0].startValue = 0;
            } else {
                option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1;
                option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1;
            }
            myChart.setOption(option);
        }, 5000)
    }
}
</script>

<style lang="scss" scoped>
.graph-item {
    width: 90%;
    margin: 0 auto;
    height: 80vw;
}
</style>