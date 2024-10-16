<template>
    <div id="graph2"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref, reactive, computed } from 'vue'
onMounted(() => {
    var myChart = echarts.init(
        document.getElementById("graph2")
    );
    var xData = [
        "西莱特",
        "威斯特",
        "迅达",
        "曼斯顿",
        "奥的斯",
        "西奥",
     
    ],

        yData = [122, 33, 33, 44, 55, 66,  ];
    yData = yData.sort((a, b) => b - a);
    var min = 0;
    var max = 10000;

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
                return params[0].name + " : " + params[0].value;
            },
        },
        xAxis: {
            show: true,
            type: "value",
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
                data: yData,
            },
        ],
        dataZoom: {
            show: false, //滚动条
            // type: 'slider',
            realtime: true,
            // height: 10,
            // start: 0,
            // end: 80,
            textStyle: false,
            //   filterMode: "empty",
            type: "slider",
            yAxisIndex: [0],
            start: 0,
            end: 100,
            width: 10,
            height: "80%",
            zoomLoxk: true,
            //   handleStyle:{
            //       color:#fff,
            //       shadowBlur:3,
            //       shadowColor:'rgba(0,0,0,.3)',
            //   }
            //   left: "95%"
        },
        series: [
            {
                name: "值",
                type: "bar",
                zlevel: 1,
                barGap: 0,//柱间距离
                itemStyle: {
                    normal: {
                        barBorderRadius: 0,

                        label: {
                            //在柱状图挨着显示文字
                            show: true,
                            position: "right",
                            color: "#F0F0F0",
                        },

                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            {
                                offset: 0,
                                color: "#19B0A6",
                            },
                            {
                                offset: 1,
                                color: "#19B0A6",
                            },
                        ]),
                    },
                },
                barWidth: 8,
                data: yData,
            },
            {
                name: "值",
                type: "bar",
                zlevel: 1,
                barGap: 0,//柱间距离
                itemStyle: {
                    normal: {
                        barBorderRadius: 0,

                        label: {
                            //在柱状图挨着显示文字
                            show: false,
                            position: "right",
                            color: "#F0F0F0",

                        },

                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            {
                                offset: 0,
                                color: "#D5AE14",
                            },
                            {
                                offset: 1,
                                color: "#D5AE14",
                            },
                        ]),
                    },
                },
                barWidth: 4,
                data: yData,
            },


            // { //去掉间隙
            //     name: "背景",
            //     type: "bar",
            //     backgroundColor: "rgba(255,255,255,0)",
            //     barWidth: 20,
            //     barGap: "-200%",
            //     data: xData,
            //     itemStyle: {
            //         normal: {
            //             color: "rgba(24,31,68,1)",
            //             barBorderRadius: 4,
            //         },
            //     },
            // },
        ],
    };
    myChart.setOption(option);
})
</script>

<style lang="scss" scoped>
#graph2 {
    width: 100%;
    height: 50vw;
}
</style>