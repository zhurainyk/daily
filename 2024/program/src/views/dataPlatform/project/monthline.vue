<template>
    <div class="monthline" :id="props.lineId"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, watch, computed } from 'vue'
const props = defineProps({
    lineId: {
        type: String,
        require: true
    },
    lineColor: {
        type: String,
        require: true,
        default: '#FF6882'
    },
    areaColor: {
        type: Array,
        require: true,
        default: ["#FF6882", "#01234c"],

    },
    data: {
        type: Array,
        require: true,
        default:[]

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
        type: String,
        default: 'data'
    },


})
const optionData = computed(() => {
    let xLabel = []
    let yLabel = [] 
    let unit
    props.data.forEach(item => {
        xLabel.push(item[props.xKey])
        yLabel.push(item[props.yKey])
        unit = item.desc || ''
    })
    return {
        xLabel, yLabel, unit
    }
})

watch(() => optionData, newVal => {
    // console.log(newVal)

    let xLabel = optionData.value.xLabel
    // let yLabel = data.data['02'].data.reduce((cur, pre) => {
    //   return [...cur, pre.data]
    // }, [])

    let yLabel = optionData.value.yLabel  // new Array(12).fill(0).map((item, index) => Math.random() * 30)
    const option = {
        tooltip: {
            trigger: "axis",
            formatter: function (param) {

                return `${param[0].axisValue}${props.tooltip}：${param[0].value} ${optionData.value.unit}`
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
                        color: props.lineColor,
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
        series: [
            {
                name: "",
                type: "line",
                symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
                showAllSymbol: true,
                symbolSize: 0,
                smooth: true,
                lineStyle: {
                    normal: {
                        width: 3,
                        color: props.lineColor, // 线条颜色
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
                    //区域填充样式
                    normal: {
                        //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                {
                                    offset: 0,
                                    color: props.areaColor[0],
                                },
                                {
                                    offset: 1,
                                    color: props.areaColor[1],
                                },
                            ],
                            false
                        ),
                        shadowColor: "transparent", //阴影颜色
                        shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                    },
                },
                data: yLabel,
            },
        ],
    };



    setTimeout(() => {
        const echartsDom = echarts.init(document.getElementById(props.lineId))
        echartsDom.setOption(option)
    })
}, {
    deep: true,

})
onMounted(() => {
    //召修原因


})
</script>

<style scoped>
.monthline {
    width: 100%;
    height: 100%;
}
</style>