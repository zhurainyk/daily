/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unsafe-optional-chaining */
<template>
    <div id="elevator">
        <div class="top healthy">
            <moduleName :module-name="health"></moduleName>
            <div class="baseline"></div>
            <div class="graph">
                <div class="bugs width">
                    <div id="bugsline"></div>
                    <div class="name" style='margin-top:-5px;'>{{ bugsObj.title }}</div>
                </div>
                <div class="stayTime width">
                    <div id="staytimeline"></div>
                    <div class="name" style='margin-top:-5px;'>{{ stayTime.title }}</div>
                </div>

            </div>
        </div>
        <div class="center">
            <div class="emergency item">
                <moduleName :module-name="emergency"></moduleName>
                <div class="baseline"></div>
                <div class="detail" style="margin-top:10px;">
                    <div class="tab">
                        <div class="left">
                            <p class="num">{{ emergencyObj.left.data }}</p>
                            <p class="name">近30天应急</p>
                        </div>
                        <div class="right">
                            <p class="num">{{ emergencyObj.right.data }}</p>
                            <p class="name">近30天解救人数</p>
                        </div>
                    </div>
                    <div id="pie1" style="width:250px;height:305px;margin:0 auto;"></div>
                    <div class="title" style="margin-top:-50px;text-align: center;text-indent: 17px;">{{
                            emergencyObj.title
                    }}</div>
                </div>
            </div>
            <div class="repair item">
                <moduleName :module-name="repair"></moduleName>
                <div class="baseline"></div>
                <div class="detail" style="margin-top:10px;">
                    <div class="tab">
                        <div class="left">
                            <p class="num">{{ repairObj.left.data }}</p>
                            <p class="name">近30天故障数</p>
                        </div>
                        <div class="right">
                            <p class="num">{{ repairObj.right.data }}</p>
                            <p class="name" style="white-space:nowrap">近30天处理完成次数</p>
                        </div>
                    </div>
                    <div id="reapair_pie" style="width:250px;height:305px;margin:0 auto;"></div>
                    <div class="title" style="margin-top:-50px;text-align: center;text-indent: 17px;">{{ repairObj.title
                    }}</div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="service">
                <moduleName :module-name="service"></moduleName>
                <div class="baseline"></div>
                <div class="detail">
                    <div class="tab">
                        <div class="right">
                            <div class="num">{{ serviceObj.right.data }}</div>
                            <div class="name">总服务次数</div>
                            <div class="unit">{{ serviceObj.right.desc }}</div>
                        </div>
                        <div class="left">
                            <div class="num">{{ serviceObj.left.data }}</div>
                            <div class="name">总服务时长</div>
                            <div class="unit">{{ serviceObj.left.desc }}</div>
                        </div>

                    </div>
                    <div id="taskType" style="width:200px;height:130px;"></div>
                    <div class="title">
                        任务类型分布
                    </div>
                </div>
            </div>
            <div class="internet">
                <moduleName :module-name="internet"></moduleName>
                <div class="baseline"></div>
                <div class="detail">
                    <div class="tab">
                        <div class="left">
                            <div class="num">
                                {{ internetObj.topLeft.data }}
                            </div>
                            <div class="name"> {{ internetObj.topLeft.name }} </div>
                            <div class="unit"> {{ internetObj.topLeft.desc }}</div>
                        </div>
                        <div class="right">
                            <div class="num"> {{ internetObj.topRight.data }}</div>
                            <div class="name"> {{ internetObj.topRight.name }} </div>
                            <div class="unit"> {{ internetObj.topRight.desc }}</div>
                        </div>
                    </div>
                    <div class="tab">
                        <div class="left">
                            <div class="num"> {{ internetObj.bottomRight.data }}</div>
                            <div class="name"> {{ internetObj.bottomRight.name }} </div>
                            <div class="unit"> {{ internetObj.bottomRight.desc }}</div>
                        </div>
                        <div class="right">

                            <div class="num"> {{ internetObj.bottomLeft.data }}</div>
                            <div class="name"> {{ internetObj.bottomLeft.name }} </div>
                            <div class="unit"> {{ internetObj.bottomLeft.desc }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="change">
                <moduleName :module-name="change"></moduleName>
                <div class="baseline"></div>
                <div class="detail" style="margin-top:70px">
                    <div class="tab">
                        <div class="left">
                            <div class="num">{{ changeObj.total }}</div>
                            <div class="name">{{ changeObj.title }} </div>
                            <div class="unit">{{ changeObj.desc }}</div>
                        </div>
                    </div>
                    <div v-if="false" id="changeContent" style="width:200px;height:130px;"></div>
                    <div class="title" v-if="false">
                        {{ changeObj.subTitle }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup  >
import { ref, onMounted, defineProps, computed, watch, reactive, onActivated } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
    data: {
        type: Object,
        default: {}
    }
})

const health = computed(() => '电梯健康状态')
const emergency = computed(() => '应急处置')
const repair = computed(() => '召修')
const service = computed(() => '服务')
const internet = computed(() => '物联网')
const change = computed(() => '换件')
// 故障走势
const bugsObj = reactive({})

bugsObj.total = computed(() => props.data?.['0104']?.data)
bugsObj.desc = computed(() => '总体故障次数')
// eslint-disable-next-line no-unsafe-optional-chaining
bugsObj.title = computed(() => '故障走势（月）')
bugsObj.xData = computed(() => props.data?.['0101']?.map((item) => item.month))
bugsObj.yData = computed(() => props.data?.['0101']?.map((item) => item.data))
// 停梯走势
const stayTime = reactive({})
stayTime.total = computed(() => props.data?.['0103']?.data)
// eslint-disable-next-line no-unsafe-optional-chaining
stayTime.desc = computed(() => props.data?.['0103']?.name + props.data?.['0103']?.desc)
// eslint-disable-next-line no-unsafe-optional-chaining
stayTime.title = computed(() => '停梯时长走势（月）')
stayTime.xData = computed(() => props.data?.['0102']?.map((item) => item.month))
stayTime.yData = computed(() => props.data?.['0102']?.map((item) => item.data))
// 总换件数
// const changeTimes = reactive({})
// changeTimes.total = computed(() => props.data?.['01']?.data?.['0103']?.data)
// // eslint-disable-next-line no-unsafe-optional-chaining
// changeTimes.desc = computed(() => props.data?.['01']?.data?.['0103']?.name + props.data?.['01']?.data?.['0103']?.desc)
// // eslint-disable-next-line no-unsafe-optional-chaining
// changeTimes.title = computed(() => props.data?.['01']?.data?.['0106']?.name + props.data?.['01']?.data?.['0106']?.desc)
// changeTimes.xData = computed(() => props.data?.['01']?.data?.['0106']?.data.map((item) => item.name) || [])
// changeTimes.yData = computed(() => props.data?.['01']?.data?.['0106']?.data.map((item) => item.data) || [])
// 应急处置
const emergencyObj = reactive({})
emergencyObj.left = computed(() => props.data?.['0201'] || {})
emergencyObj.right = computed(() => props.data?.['0202'] || {})
emergencyObj.reasons = computed(() => props.data?.['0203']?.data.map(item => item.name))
emergencyObj.title = computed(() => '故障原因分析')
emergencyObj.colors = computed(() => props.data?.['0203']?.data.map(item => item.desc))
emergencyObj.pies = computed(() => props.data?.['0203']?.data.map(item => ({
    name: item.name,
    value: item.data.slice(0, -1) == 0 ? '' : item.data.slice(0, -1),
    count: item.count || 0
})))

// 召修原因
const repairObj = reactive({})
repairObj.left = computed(() => props.data?.['0104'] || {})
repairObj.right = computed(() => props.data?.['0302'] || {})
repairObj.reasons = computed(() => props.data?.['0303']?.data.map(item => item.name))
repairObj.title = computed(() => '导致故障原因')
repairObj.colors = computed(() => props.data?.['0303']?.data.map(item => item.desc))
repairObj.pies = computed(() => props.data?.['0303']?.data.map(item => ({
    name: item.name,
    value: item.data.slice(0, -1) == 0 ? '' : item.data.slice(0, -1),
    count: item.count || 0
})))
// 服务
const serviceObj = reactive({})
serviceObj.left = computed(() => props.data?.['0401'] || {})
serviceObj.right = computed(() => props.data?.['0402'] || {})
serviceObj.title = computed(() => props.data?.['0403']?.name)
serviceObj.xData = computed(() => props.data?.['0403']?.map(item => item.name))
serviceObj.yData = computed(() => props.data?.['0403']?.map(item => item.data))

// 物联网
const internetObj = reactive({})
internetObj.topLeft = computed(() => props.data?.['0501'] || {})
internetObj.topRight = computed(() => props.data?.['0502'] || {})
internetObj.bottomLeft = computed(() => props.data?.['0503'] || {})
internetObj.bottomRight = computed(() => props.data?.['0504'] || {})

// 换件
const changeObj = reactive({})
changeObj.total = computed(() => props.data?.['0601']?.data)
changeObj.title = computed(() => props.data?.['0601']?.name)
changeObj.desc = computed(() => props.data?.['0601']?.desc)
changeObj.subTitle = computed(() => props.data?.['0602']?.name)
changeObj.xData = computed(() => props.data?.['0602']?.data.map(item => item.name) || [])
changeObj.yData = computed(() => props.data?.['0602']?.data.map(item => item.data) || [])
let timer1 = null;
let timer2 = null;
const initEcharts = () => {
    if (timer1) {
        clearInterval(timer1)
    }
    if (timer2) {
        clearInterval(timer2)
    }
    { // 故障走势
        const option = {
            tooltip: {
                trigger: "axis",
                formatter: function (param) {
                    console.log(param)
                    return `${param[0].axisValue}月：${param[0].value}`
                }
            },
            title: {
                show: false,
                text: bugsObj.total,
                textStyle: {
                    align: 'center',
                    color: '#FF6882',
                    fontSize: 28,
                },
                subtext: bugsObj.desc,
                subtextStyle: {
                    color: '#fff',
                    align: 'center',
                    fontSize: 14
                },
                itemGap: 2,
                top: '5%',
                left: 'center',
            },
            grid: {
                top: "5%",
                left: "2%",
                right: "3%",
                bottom: "10%",

            },

            xAxis: [
                {
                    type: "category",
                    boundaryGap: false,
                    axisLine: {
                        // 坐标轴轴线相关设置。数学上的x轴
                        show: true,
                        lineStyle: {
                            color: "rgba(22, 99, 180, .2)",
                        },
                    },
                    axisLabel: {
                        // 坐标轴刻度标签的相关设置
                        textStyle: {
                            color: "#fff",
                            // padding: 16,
                            fontSize: 10,
                        },
                        interval: 0,
                        show: true,
                        formatter(data) {
                            return data
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
                    data: bugsObj.xData,
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
                            color: "#0c3b71",
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
                    name: bugsObj.title,
                    type: "line",
                    symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
                    showAllSymbol: true,
                    symbolSize: 0,
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 3,
                            color: "#FF6882", // 线条颜色
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
                        // 区域填充样式
                        normal: {
                            // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: "#FF6882",
                                    },
                                    {
                                        offset: 1,
                                        color: "#041A41",
                                    },
                                ],
                                false
                            ),
                            shadowColor: "transparent", // 阴影颜色
                            shadowBlur: 20, // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                        },
                    },
                    data: bugsObj.yData,
                },
            ],
        }

        const myChart = echarts.init(
            document.getElementById("bugsline")
        )
        document.getElementById('bugsline').setAttribute('_echarts_instance_', '')
        // 绘制图表
        myChart.setOption(option)
    }
    { // 停梯时长
        const option = {
            tooltip: {
                trigger: "axis",
                formatter: function (param) {
                    console.log(param)
                    return `${param[0].axisValue}月：${param[0].value}`
                }
            },
            title: {
                show: false,
                text: stayTime.total,
                textStyle: {
                    align: 'center',
                    color: '#B149FF',
                    fontSize: 28,
                },
                subtext: stayTime.desc,
                subtextStyle: {
                    color: '#fff',
                    align: 'center',
                    fontSize: 14
                },
                itemGap: 2,
                top: '5%',
                left: 'center',
            },
            grid: {
                top: "5%",
                left: "2%",
                right: "3%",
                bottom: "10%",
            },

            xAxis: [
                {
                    type: "category",
                    boundaryGap: false,
                    axisLine: {
                        // 坐标轴轴线相关设置。数学上的x轴
                        show: true,
                        lineStyle: {
                            color: "rgba(22, 99, 180, .2)",
                        },
                    },
                    axisLabel: {
                        // 坐标轴刻度标签的相关设置
                        textStyle: {
                            color: "#fff",
                            // padding: 16,
                            fontSize: 10,
                        },
                        interval: 0,
                        show: true,
                        formatter(data) {
                            return data
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
                    data: stayTime.xData,
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
                            color: "#0c3b71",
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
                    name: stayTime.desc,
                    type: "line",
                    symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
                    showAllSymbol: true,
                    symbolSize: 0,
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 3,
                            color: "#B149FF", // 线条颜色
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
                        // 区域填充样式
                        normal: {
                            // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: "#B149FF",
                                    },
                                    {
                                        offset: 1,
                                        color: "#161D55",
                                    },
                                ],
                                false
                            ),
                            shadowColor: "transparent", // 阴影颜色
                            shadowBlur: 20, // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                        },
                    },
                    data: stayTime.yData,
                },
            ],
        }

        const myChart = echarts.init(
            document.getElementById("staytimeline")
        )
        document.getElementById('staytimeline').setAttribute('_echarts_instance_', '')
        // 绘制图表
        myChart.setOption(option)
    }

    {
        // 应急处置

        const colors = emergencyObj.colors

        const legens = emergencyObj.reasons
        const xData = emergencyObj.pies
        if (xData.every(x => x.value === '')) {
            xData.forEach(x => {
                x.value = 0
            })
        }
        const option = {
            tooltip: {
                trigger: "item",
                // formatter: ' {a0} <br /> {b0}: {c0}% '
                formatter: function (param) {
                    console.log(param);
                    return `<h3 >${param.seriesName}</h3> <span>${param.data.name} ：</span> <span style='color:#000'>${param.data.count}  </span>`;
                },
            },
            grid: {
                top: "0%", // 距上边距

                left: "40%", // 距离左边距

                right: "40%", // 距离右边距

                bottom: "0%", // 距离下边距
            },
            color: colors,
            legend: {
                // 图列的设置
                // type: 'scroll',
                // orient: 'horizontal',
                itemWidth: 22, // 宽
                itemHeight: 12, // 高
                itemGap: 10, // 图例之间的间距
                data: legens,
                icon: "circle",
                top: "5%", // 距离顶部的位置
                //  left:'',
                x: "center", // 图例在x方向的位置
                y: "top", // 图例在y方向的位置
                textStyle: {
                    color: "#C0DFFF",
                    fontStyle: "normal",
                    fontSize: "12px",
                },
            },
            series: [
                {
                    name: emergencyObj.title,
                    type: "pie",
                    radius: ["27%", "48%"],
                    avoidLabelOverlap: false,

                    center: ["48%", "60%"],
                    emphasis: {
                        label: {
                            // 鼠标移上去的样式
                            show: true,
                            fontSize: "16",
                            fontWeight: "normal",
                        },
                    },

                    labelLine: {
                        // 图形外文字线
                        show: false,

                        normal: {
                            length: 5,
                            length2: 5,
                            lineStyle: {
                                color: "transparent",
                            },
                        },
                    },
                    label: {
                        normal: {
                            formatter: " {c|{c}%}", // 图形外文字上下显示
                            borderWidth: 30,
                            borderRadius: 4,
                            padding: [0, 2], // 文字和图的边距
                            rich: {
                                a: {
                                    color: "#FEFEFE",
                                    fontSize: 14,
                                    lineHeight: 30,
                                },
                                b: {
                                    // name 文字样式
                                    fontSize: 14,
                                    lineHeight: 40,
                                    color: "#FEFEFE",
                                },
                                c: {
                                    // value 文字样式
                                    fontSize: 12,
                                    lineHeight: 20,
                                    fontFamily: "MicrosoftYaHeiLight",
                                    color: "#fff",
                                    align: "center",
                                },
                            },
                        },
                    },
                    data: xData,
                },
            ],
        }

        const myChart = echarts.init(
            document.getElementById("pie1")
        )
        document.getElementById('pie1').setAttribute('_echarts_instance_', '')

        // 绘制图表
        myChart.setOption(option)
    }
    {
        // 召修原因

        const colors = repairObj.colors

        const legens = repairObj.reasons
        const xData = repairObj.pies
        if (xData.every(x => x.value === '')) {
            xData.forEach(x => {
                x.value = 0
            })
        }
        const option = {
            tooltip: {
                trigger: "item",
                // formatter: ' {a0} <br /> {b0}: {c0}% '
                formatter: function (param) {
                    console.log(param);
                    return `<h3 >${param.seriesName}</h3> <span>${param.data.name} ：</span> <span style='color:#000'>${param.data.count}  </span>`;
                },
            },
            grid: {
                top: "0%", // 距上边距

                left: "40%", // 距离左边距

                right: "40%", // 距离右边距

                bottom: "10%", // 距离下边距
            },
            color: colors,
            legend: {
                // 图列的设置
                itemWidth: 18, // 宽
                itemHeight: 12, // 高
                itemGap: 5, // 图例之间的间距
                data: legens,
                icon: "circle",
                top: "5%", // 距离顶部的位置
                //  left:'',
                x: "center", // 图例在x方向的位置
                y: "top", // 图例在y方向的位置
                textStyle: {
                    color: "#C0DFFF",
                    fontStyle: "normal",
                    fontSize: "12px",
                },
            },
            series: [
                {
                    name: repairObj.title,
                    type: "pie",
                    radius: ["27%", "48%"],
                    avoidLabelOverlap: false,

                    center: ["48%", "60%"],
                    emphasis: {
                        label: {
                            // 鼠标移上去的样式
                            show: true,
                            fontSize: "16",
                            fontWeight: "normal",
                        },
                    },

                    labelLine: {
                        // 图形外文字线
                        show: false,

                        normal: {
                            length: 5,
                            length2: 5,
                            lineStyle: {
                                color: "transparent",
                            },
                        },
                    },
                    label: {
                        normal: {
                            formatter: " {c|{c}%}", // 图形外文字上下显示
                            borderWidth: 30,
                            borderRadius: 4,
                            padding: [0, 2], // 文字和图的边距
                            rich: {
                                a: {
                                    color: "#FEFEFE",
                                    fontSize: 14,
                                    lineHeight: 30,
                                },
                                b: {
                                    // name 文字样式
                                    fontSize: 14,
                                    lineHeight: 40,
                                    color: "#FEFEFE",
                                },
                                c: {
                                    // value 文字样式
                                    fontSize: 12,
                                    lineHeight: 20,
                                    fontFamily: "MicrosoftYaHeiLight",
                                    color: "#fff",
                                    align: "center",
                                },
                            },
                        },
                    },
                    data: xData,
                },
            ],
        }

        const myChart = echarts.init(
            document.getElementById("reapair_pie")
        )
        document.getElementById('reapair_pie').setAttribute('_echarts_instance_', '')

        // 绘制图表
        myChart.setOption(option)
    }
    {

        // 任务类型分布
        console.log(serviceObj.xData)
        const myChart = echarts.init((document.getElementById("taskType")))
        document.getElementById('taskType').setAttribute('_echarts_instance_', '')
        const xData = serviceObj.xData,
            yData = serviceObj.yData
        const min = 0
        const max = Math.max(...serviceObj.yData) + 10
        const option = {
            backgroundColor: "",

            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "line",
                    lineStyle: {
                        opacity: 0,
                    },
                },
                // backgroundColor: "rgba(255,255,255,.5)",
                //   formatter: ' {a0} <br /> {b0}: {c0}% '
                formatter(param) {
                    // console.log(param);
                    return `<h3 >${param[0].seriesName}</h3> <span>${param[0].name} ：</span> <span style='color:#000'>${param[0].data}  </span>`
                },
            },

            grid: {
                left: "0%",
                right: "0%",
                bottom: "0%",
                top: "15%", // 边距
                // height: "85%", //图表高度
                containLabel: true,
                z: 22,
            },
            xAxis: [
                {
                    type: "category",
                    gridIndex: 0,
                    data: xData,
                    axisTick: {
                        alignWithLabel: true,
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#0c3b71",
                        },
                    },
                    axisLabel: {
                        show: true,
                        color: "#fff",
                        fontSize: 10,
                        interval: 0,
                        formatter: function (params) {
                            var newParamsName = ""; // 最终拼接成的字符串
                            var paramsNameNumber = params.length; // 实际标签的个数
                            var provideNumber = 3; // 每行能显示的字的个数
                            var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                            /**
                            * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                            */
                            // 条件等同于rowNumber>1
                            if (paramsNameNumber > provideNumber) {
                                /** 循环每一行,p表示行 */
                                for (var p = 0; p < rowNumber; p++) {
                                    var tempStr = ""; // 表示每一次截取的字符串
                                    var start = p * provideNumber; // 开始截取的位置
                                    var end = start + provideNumber; // 结束截取的位置
                                    // 此处特殊处理最后一行的索引值
                                    if (p == rowNumber - 1) {
                                        // 最后一次不换行
                                        tempStr = params.substring(start, paramsNameNumber);
                                    } else {
                                        // 每一次拼接字符串并换行
                                        tempStr = params.substring(start, end) + "\n";
                                    }
                                    newParamsName += tempStr; // 最终拼成的字符串
                                }
                            } else {
                                // 将旧标签的值赋给新标签
                                newParamsName = params;
                            }
                            //将最终的字符串返回
                            return newParamsName;
                        },

                    },
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
                    min,
                    max,
                    axisLine: {
                        lineStyle: {
                            color: "#0c3b71",
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
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: 0,
                    show: false,
                    startValue: 0,
                    endValue: 4
                }
            ],
            series: [
                {
                    name: '任务类型分布',
                    type: "bar",
                    barWidth: "35%",
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    label: {
                        // 在柱状图挨着显示文字
                        show: true,
                        position: "top",
                        color: "#F0F0F0",
                    },
                    itemStyle: {
                        normal: {
                            barBorderRadius: [6, 6, 0, 0],

                            // 渐变色
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: "#009AFC"
                                },

                                {
                                    offset: 1,
                                    color: "#012254"
                                }
                            ])
                        },
                    },
                    data: yData,
                    zlevel: 11,
                },

            ],
        }
        myChart.setOption(option)
        if (yData.length > 5) {
            timer1 = setInterval(() => {
                if (option.dataZoom[0].endValue == yData.length) {
                    option.dataZoom[0].endValue = 4;
                    option.dataZoom[0].startValue = 0;
                } else {
                    option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1;
                    option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1;
                }
                myChart.setOption(option);
            }, 10000)
        }

    }
    {
        // 换件类型分布
        return
        const myChart1 = echarts.init((document.getElementById("changeContent")))
        document.getElementById('changeContent').setAttribute('_echarts_instance_', '')
        const xData = changeObj.xData,
            yData = changeObj.yData
        const min = 0
        const max = Math.max(...changeObj.yData) + 10
        const option = {
            backgroundColor: "",
            title: {
                show: false,
                text: '305',
                textStyle: {
                    align: 'center',
                    color: '#009AFC',
                    fontSize: 28,
                },
                subtext: '总换件数 （次）',
                subtextStyle: {
                    color: '#fff',
                    align: 'center',
                    fontSize: 14
                },
                itemGap: 2,
                top: '5%',
                left: 'center',
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "line",
                    lineStyle: {
                        opacity: 0,
                    },
                },
                // backgroundColor: "rgba(255,255,255,.5)",
                //   formatter: ' {a0} <br /> {b0}: {c0}% '
                formatter(param) {
                    // console.log(param);
                    return `<h3 >${param[0].seriesName}</h3> <span>${param[0].name} ：</span> <span style='color:#000'>${param[0].data}  </span>`
                },
            },

            grid: {
                left: "5%",
                right: "0%",
                bottom: "0%",
                top: "15%", // 边距
                // height: "85%", //图表高度
                containLabel: true,
                z: 22,
            },
            xAxis: [
                {
                    type: "category",
                    gridIndex: 0,
                    data: xData,
                    axisTick: {
                        alignWithLabel: true,
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#0c3b71",
                        },
                    },
                    axisLabel: {
                        show: true,
                        color: "#fff",
                        fontSize: 10,
                        interval: 0,
                        formatter: function (params) {
                            var newParamsName = ""; // 最终拼接成的字符串
                            var paramsNameNumber = params.length; // 实际标签的个数
                            var provideNumber = 3; // 每行能显示的字的个数
                            var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                            /**
                            * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                            */
                            // 条件等同于rowNumber>1
                            if (paramsNameNumber > provideNumber) {
                                /** 循环每一行,p表示行 */
                                for (var p = 0; p < rowNumber; p++) {
                                    var tempStr = ""; // 表示每一次截取的字符串
                                    var start = p * provideNumber; // 开始截取的位置
                                    var end = start + provideNumber; // 结束截取的位置
                                    // 此处特殊处理最后一行的索引值
                                    if (p == rowNumber - 1) {
                                        // 最后一次不换行
                                        tempStr = params.substring(start, paramsNameNumber);
                                    } else {
                                        // 每一次拼接字符串并换行
                                        tempStr = params.substring(start, end) + "\n";
                                    }
                                    newParamsName += tempStr; // 最终拼成的字符串
                                }
                            } else {
                                // 将旧标签的值赋给新标签
                                newParamsName = params;
                            }
                            //将最终的字符串返回
                            return newParamsName;
                        },

                    },
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
                    min,
                    max,
                    axisLine: {
                        lineStyle: {
                            color: "#0c3b71",
                        },
                        show: false,
                    },
                    axisLabel: {
                        color: "rgb(170,170,170)",
                        formatter: "{value} %",
                        show: false,
                    },
                },
                // {//背景条形
                //   type: "value",
                //   gridIndex: 0,
                //   min,
                //   max,
                //   splitNumber: 0,
                //   splitLine: {
                //     show: false,
                //   },
                //   axisLine: {
                //     show: false,
                //   },
                //   axisTick: {
                //     show: false,
                //   },
                //   axisLabel: {
                //     show: false,
                //   },
                //   splitArea: {
                //     show: true,
                //     areaStyle: {
                //       color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"],
                //     },
                //   },
                // },
            ],
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: 0,
                    show: false,
                    startValue: 0,
                    endValue: 4
                }
            ],
            series: [
                {
                    name: "总换件数 （件）",
                    type: "bar",
                    barWidth: "35%",
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    label: {
                        // 在柱状图挨着显示文字
                        show: true,
                        position: "top",
                        color: "#F0F0F0",
                    },
                    itemStyle: {
                        normal: {
                            barBorderRadius: [6, 6, 0, 0],
                            // color: function (params) {
                            //     const color = [
                            //         "#FED52F",
                            //         "#23FFFC",
                            //         "#009AFC",
                            //         "#B149FF",
                            //         "#FF6882",
                            //         "#FF6882",
                            //     ];
                            //     return color[params.dataIndex];
                            // },
                            // 渐变色
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: "#009AFC"
                                },
                                //   {
                                //     offset: 0.5,
                                //     color: "#027eff"
                                //   },
                                {
                                    offset: 1,
                                    color: "#012254"
                                }
                            ])
                        },
                    },
                    data: yData,
                    zlevel: 11,
                },
                //   {
                //     name: "背景",
                //     type: "bar",
                //     barWidth: "50%",
                //     xAxisIndex: 0,
                //     yAxisIndex: 1,
                //     barGap: "-135%",
                //     data: [100, 100, 100, 100, 100, 100, 100],
                //     itemStyle: {
                //       normal: {
                //         color: "rgba(255,255,255,0.1)"
                //       }
                //     },
                //     zlevel: 9
                //   }
            ],
        }
        myChart1.setOption(option)
        if (yData?.length > 5) {
            timer2 = setInterval(() => {
                if (option.dataZoom[0].endValue == yData.length) {
                    option.dataZoom[0].endValue = 4;
                    option.dataZoom[0].startValue = 0;
                } else {
                    option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1;
                    option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1;
                }
                myChart1.setOption(option);
            }, 10000)
        }
    }
}
watch(() => props.data, (newVal) => {
    initEcharts()
}, {

    deep: true,

})


</script>

<style lang="scss" scoped>
$fontSize: 22px;

#elevator {
    width: calc(100% - 10px);
    margin: 0 5px;
    height: 100%;

    .baseline {
        border-bottom: 1px solid rgba(0, 154, 252, .2);
        width: calc(100% - 40px);
        margin: 10px auto 0;
    }

    .top {
        width: 100%;
        height: 250px;
        box-sizing: border-box;

        .graph {
            display: flex;
            justify-content: space-around;

            .bugs,
            .stayTime {
                width: 45%;
            }

            .stayTime {
                margin: 0 5px;
            }



            #bugsline,
            #staytimeline,
            #changegraph {
                height: 200px;
                // background-color: #fff;
            }

            .bugsline {}

            .name {
                line-height: 40px;
                color: #fff;
                font-size: 14px;
                text-align: center;
            }

        }
    }

    .center {
        display: flex;
        width: 100%;
        height: 420px;
        margin-top: 10px;
        box-sizing: border-box;

        .item {
            width: 50%;

            .detail {
                width: calc(100% - 50px);
                margin: 22px auto 0;

                .tab {
                    display: flex;

                    .left {
                        width: 50%;
                        border-right: 1px solid rgba(255, 255, 255, .3);
                        text-align: center;

                        .num {
                            color: #B149FF;
                            font-size: 28px;
                        }

                        .name {
                            font-size: 14px;
                            color: #fff;
                        }
                    }

                    .right {
                        text-align: center;
                        width: 50%;

                        .num {
                            color: #B149FF;
                            font-size: 28px;
                        }

                        .name {
                            font-size: 14px;
                            color: #fff;
                        }
                    }

                }

                .pie1 {
                    width: 227px;
                    height: 227px;
                }

                .pie2 {
                    width: 100%;
                    height: 227px;
                }

                .title {
                    color: #fff;
                    text-align: center;
                }

            }

        }
    }

    .bottom {
        display: flex;

        .service {
            width: 200px;

            .detail {
                .tab {
                    display: flex;

                    .left,
                    .right {
                        position: relative;
                        width: 50%;
                        margin-top: 5px;
                        color: #fff;
                        font-size: 14px;
                        text-align: center;

                        .num {
                            color: #009AFC;
                            font-size: $fontSize;
                        }

                    }

                    .left::after {
                        position: absolute;
                        content: '';
                        width: 1px;
                        height: 50px;
                        top: 5px;
                        right: 0;
                        background: rgba(255, 255, 255, .3);
                    }

                }

                .title {
                    color: #fff;
                    text-align: center;
                    line-height: 40px;
                    font-size: 14px;
                }
            }

        }

        .internet {
            width: 200px;

            .detail {
                padding-top: 25px;

                .tab {

                    display: flex;

                    .left,
                    .right {
                        position: relative;
                        width: 50%;
                        margin-top: 10px;
                        color: #fff;
                        font-size: 14px;
                        text-align: center;

                        .num {
                            color: #009AFC;
                            font-size: $fontSize;
                        }

                    }

                    .left::after {
                        position: absolute;
                        content: '';
                        width: 1px;
                        height: 50px;
                        top: 5px;
                        right: 0;
                        background: rgba(255, 255, 255, .3);
                    }

                }

                .title {
                    color: #fff;
                    font-size: 14px;
                    text-align: center;
                    line-height: 40px;
                }
            }
        }

        .change {
            flex-grow: 1;

            .detail {
                .tab {

                    .left {
                        position: relative;
                        width: 50%;
                        margin: 0 auto;
                        margin-top: 5px;

                        color: #fff;
                        font-size: 14px;
                        text-align: center;

                        .num {
                            color: #009AFC;
                            font-size: $fontSize;
                        }

                    }

                }

                .title {
                    color: #fff;
                    text-align: center;
                    line-height: 40px;
                    font-size: 14px;
                }
            }
        }
    }
}
</style>