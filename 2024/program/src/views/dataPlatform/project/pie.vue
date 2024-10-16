<template>
    <div class="pieitem" :id="props.pieId"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, watch, computed ,onBeforeUnmount,ref} from 'vue'
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
    isPercent: {
        type: Boolean,
        default: true
    },
    position: {
        type: Array,
        default: ['50%', '65%']
    },
    size: {
        type: Array,
        default: ["30%", "48%"]
    },
    config: {
        type: Object,
        default: null,
    }
})

onBeforeUnmount(()=>{ 
    if(echartsDom.value){
        echartsDom.value.dispose()
        echartsDom.value.clear() 
    }
})
const optionData = computed(() => {
    let arr = []
    let colors = ['#FED52F', '#23FFFC', '#009AFC', '#B149FF', '#FF6882']
    const len = colors.length
    props.data.forEach((item, index) => {
        arr.push({
            name: item.name,
            value: parseFloat(item.data) == 0 ? '' : parseFloat(item.data),
            desc: item.desc || colors[index % len],
            count: item.count || 0,
            unit: item.unit || ''
        })

    })
    if (arr.every(x => x.value === '')) {
        arr.forEach(x => {
            x.value = 0
        })
    }
    return arr
})
const echartsDom = ref('')
watch(() => optionData, newVal => {

    const option = {
        tooltip: {
            trigger: 'item',
            formatter: function (param) {
                return ` <span>${param.data.name} ：</span> <span style='color:#000'>${param.data.count} ${param.data.unit} </span>`;
            },
        },
        backgroundColor: "transparent",
        title: {
            text: props.title,
            textStyle: {
                align: 'center',
                color: '#fff',
                fontSize: 14,
            },
            show: false,

            itemGap: 2,
            top: '0%',
            left: '38%',
        },
        color: optionData.value.reduce((pre, cur) => {
            return [...pre, cur.desc]
        }, []), //'#ffcc00'
        legend: {
            // orient: 'vertical',
            x: 'left',
            y: 'center',
            color: 'red',
            data: optionData.value.reduce((pre, cur) => {
                return [...pre, cur.name]
            }, []),
            icon: 'circle',
            textStyle: {
                color: "#C0DFFF",
                fontStyle: "normal",
                fontSize: "12px",
            },
            // itemHeight: 10,
            // itemGap: 10,
            // itemWidth: 10,
            top: "5%", //距离顶部的位置
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
            radius: props.size,
            center: props.position,
            avoidLabelOverlap: false,
            data: optionData.value,
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
                    formatter: "{c|{c}%  }",  //图形外文字上下显示
                    borderWidth: 30,
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
                            // fontFamily: "MicrosoftYaHeiLight",
                            color: "#FEFEFE",
                            align: "center",
                        },
                        d: {
                            //name 文字样式
                            fontSize: 14,
                            lineHeight: 40,
                            color: "red",
                        },
                    },
                },
            },
        }]
    };
    if (props.config) {
        if (props.config.itemHeight) {
            option.legend.itemHeight = props.config.itemHeight
        }
        if (props.config.itemGap) {
            option.legend.itemGap = props.config.itemGap
        }
        if (props.config.itemWidth) {
            option.legend.itemWidth = props.config.itemWidth
        }
        if (props.config.legendFontSize) {
            option.legend.textStyle.fontSize = props.config.legendFontSize
        }

    }

    setTimeout(() => {

          echartsDom.value = echarts.init(document.getElementById(props.pieId))
          echartsDom.value.setOption(option)
    })
}, {
    deep: true,
    immediate: true
})

</script>

<style scoped>
.pieitem {
    width: 100%;
    height: 100%;

}
</style>