 <template>
    <div class="pieitem" :id="props.pieId"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, watch, computed } from 'vue'
const props = defineProps({
    // title: {
    //     type: String,
    //     require: true
    // },
    pieId: {
        type: String,
        require: true
    },
    data: {
        type: Array,
        require: true,

    },

})

const optionData = computed(() => {
    let xData = []
    let yData = []
    let colors = []

    props.data.forEach((item) => {
        xData.push(item.name)
        yData.push(item.data)
        colors.push(item.desc)
    })
    return {
        xData, yData, colors
    }
})

watch(() => optionData, newVal => {
    setTimeout(() => {
        console.log({ newVal })
        const myChart = echarts.init(document.getElementById(props.pieId));
        document.getElementById(props.pieId).setAttribute('_echarts_instance_', '')
        let ageValue = newVal.value.yData || [40, 20, 30, 10, 60, 90]
        let ageData = newVal.value.xData || ['1-3年', '4-6年', '7-9年', '10-12年', '12-15年', '超15年']
        let colors = newVal.value.colors || ['#FED52F', '#23FFFC', '#009AFC', '#B149FF', '#FF6882', '#FF6882']
        console.log(ageValue, ageData, colors)
        var min = 0;
        var max = (Math.max(...ageValue) - Math.min(...ageValue)) < 50 ? Math.max(...ageValue) + 50 : Math.max(...ageValue) + 50;
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
                // formatter: function (param) {
                //     // console.log(param)
                //     return `<h3 >${param[0].seriesName}</h3> <span>${param[0].name} ：</span> <span style='color:#000'>${param[0].data}  </span>`;
                // },
            },
            grid: {
                left: "0%",
                right: "0%",
                bottom: "0%",
                top: "0%", //边距
                height: "100%", //图表高度
                containLabel: true,
                z: 22,
            },
            xAxis: [
                {
                    type: "category",
                    gridIndex: 0,
                    data: ageData,
                    axisTick: {
                        alignWithLabel: true,
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255, 255, 255, .3)",
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
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: 0,
                    show: false,
                    startValue: 0,
                    endValue: 4
                }
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
            series: [
                {
                    name: "",
                    type: "bar",
                    barWidth: "35%",
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    label: {
                        //在柱状图挨着显示文字
                        show: true,
                        position: "top",
                        color: "#F0F0F0",
                    },
                    itemStyle: {
                        normal: {
                            barBorderRadius: [6, 6, 0, 0],
                            color: function (params) {
                                const color = [...colors]
                                return color[params.dataIndex];
                            },
                        },
                    },
                    data: ageValue,
                    zlevel: 11,
                },
            ],
        };
        myChart.setOption(option);
        if (ageData.length > 5) {
            setInterval(() => {
                if (option.dataZoom[0].endValue == ageData.length) {
                    option.dataZoom[0].endValue = 4;
                    option.dataZoom[0].startValue = 0;
                } else {
                    option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1;
                    option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1;
                }
                myChart.setOption(option);
            }, 10000)
        }
    })
}, {
    deep: true,

})
onMounted(() => {
    //召修原因


})
</script>

<style scoped>
.pieitem {
    width: 100%;
    height: 100%;

}
</style>