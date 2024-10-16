 <template>
    <div class="pieitem" :id="props.pieId"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, watch, computed } from 'vue'
const props = defineProps({
    title: {
        type: String,
        require: true
    },
    pieId: {
        type: String,
        require: true
    },
    data: {
        type: Array,
        require: true,

    }
})
const optionData = computed(() => {
    let arr = []
    props.data.forEach(item => {
        arr.push({
            name: item.name,
            value: parseFloat(item.data),
            desc: item.desc,
            count: item.count || 0
        })
    })
    return arr
})

watch(() => optionData, newVal => {
    console.log(newVal)

    const option = {
        tooltip: {
            trigger: 'item',
            // formatter: "{a} <br/>{b} : {c}  "
            formatter: function (param) {
                console.log(param);
                return ` <span>${param.data.name} ：</span> <span style='color:#000'>${param.data.count}  </span>`;
            },

        },
        backgroundColor: "#34258E",
        title: {
            text: props.title,
            textStyle: {
                align: 'center',
                color: '#fff',
                fontSize: 14,
            },

            itemGap: 2,
            top: '0%',
            left: '38%',
        },
        color: optionData.value.reduce((pre, cur) => {
            return [...pre, cur.desc]
        }, []), //'#ffcc00'
        legend: {
            orient: 'vertical',
            x: 'left',
            y: 'center',
            color: 'red',
            data: optionData.value.reduce((pre, cur) => {
                return [...pre, cur.name]
            }, []),
            textStyle: {
                color: "#C0DFFF",
                fontStyle: "normal",
                fontSize: "12px",
            },
            top: "10%", //距离顶部的位置
            right: '5%',
            formatter: function (name) {
                if (name.length > 7) {
                    return name.slice(0, 7) + '...'

                } else {
                    return name;
                }
            }

        },

        series: [{
            name: props.title,
            type: 'pie',
            radius: '45%',
            center: ['63%', '55%'],
            data: optionData.value,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        //	                            position:'inside',
                        formatter: '{b} : {c} '
                    }
                },
                labelLine: {
                    show: true
                }
            },
            labelLine: {
                //图形外文字线
                show: false,

                normal: {
                    length: 10,
                    length2: 10,
                    lineStyle: {
                        color: "transparent",
                    },
                },
            },
            label: {
                normal: {
                    // formatter: " {c|{c}%}", //图形外文字上下显示
                    formatter: function (param) {
                        if (param.value == 0) {
                            return ''
                        } else {
                            return param.value + '%'
                        }
                    },
                    borderWidth: 20,
                    borderRadius: 4,
                    padding: [0, 0], //文字和图的边距
                    rich: {
                        a: {
                            color: "#FEFEFE",
                            fontSize: 14,
                            lineHeight: 30,
                        },
                        b: {
                            //name 文字样式
                            fontSize: 14,
                            lineHeight: 40,
                            color: "#FEFEFE",
                        },
                        c: {
                            //value 文字样式
                            fontSize: 12,
                            lineHeight: 20,
                            fontFamily: "MicrosoftYaHeiLight",
                            color: "#FEFEFE",
                            align: "center",
                        },
                    },
                },
            },
        }]
    };
    setTimeout(() => {
        const echartsDom = echarts.init(document.getElementById(props.pieId))
        echartsDom.setOption(option)
    })
}, {
    deep: true,
    immediate: true
})
onMounted(() => {
    //召修原因


})
</script>

<style scoped>
.pieitem {
    width: 90%;
    height: 65vw;
    margin: 0 auto
}
</style>