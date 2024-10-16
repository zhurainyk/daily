<template>
    <div id="databoard">
        <div class="floor">
            <moduleName :module-name="$data.floor1.module"></moduleName>
            <baseline class="baseline"></baseline>
            <div class="content">
                <div class="left">
                    <div class="title">
                        <span>(本月)</span>
                        <span>
                            总数:{{ totalCount1== '0.00' ? 0 : totalCount1}}
                        </span>
                        <span>
                            困人:{{ trappedCount1== '0.00' ? 0 : trappedCount1}}
                        </span>
                        <span>
                            故障停梯:{{ faultCount1== '0.00' ? 0 : faultCount1}}
                        </span>

                        <span>
                            维保:{{ upkeep== '0.00' ? 0 : upkeep}}
                        </span>

                    </div>
                    <monthline :yKey="['total', 'trapped', 'fault', 'upkeep']" :data="$data.floor1.monthline"
                        class="common-graph" :lineId="'_line1'">
                    </monthline>
                    <div class="subTitle">停梯时长走势</div>
                </div>
                <div class="right">
                    <pie class="common-graph" :position="['50%', '70%']" :config="pieConfig" :pieId="'_pie1'"
                        :data='$data.floor1.pie'>
                    </pie>
                    <div class="subTitle">
                        停梯时长分布
                        <cbutton class="cbutton" @change="changeType" :originKey="'A125'"
                            :directList="[{ label: '全部', value: { freq: '', iscurrentDate: '' } }, { label: '本月', value: { freq: '03', iscurrentDate: '1' } }]">
                        </cbutton>
                    </div>
                </div>
            </div>
        </div>
        <div class="floor">
            <moduleName class="modulename" :module-name="$data.floor2.module"></moduleName>
            <baseline class="baseline"></baseline>
            <div class="content">
                <div class="left">
                    <div class="title">
                        <span>(本月)</span>
                        <span>
                            总数:{{ totalCount2 }}
                        </span>
                        <span>
                            困人:{{ trappedCount2 }}
                        </span>
                        <span>
                            故障停梯:{{ faultCount2 }}
                        </span>


                    </div>
                    <monthline class="common-graph" :yKey="['totalCount', 'trappedCount', 'faultCount']"
                        :data="$data.floor2.monthline" :lineId="'_line2'">
                    </monthline>
                    <div class="subTitle">回召走势</div>
                </div>
                <div class="right">
                    <pie class="common-graph" :pieId="'_pie2'" :config="pieConfig" :data='$data.floor2.pie'>
                    </pie>
                    <div class="subTitle">
                        回召类型分布
                        <cbutton class="cbutton" @change="changeType" :originKey="'A121'"
                            :directList="[{ label: '全部', value: { freq: '', iscurrentDate: '' } }, { label: '本月', value: { freq: '03', iscurrentDate: '1' } }]">
                        </cbutton>
                    </div>
                </div>
            </div>
        </div>
        <div class="floor">
            <baseline></baseline>
            <div class="content">
                <div class="left slice">
                    <div class="subText">
                        故障排行
                        <cbutton class="cbutton m" @change="changeType" :originKey="'A130'" :directList="[
                            { label: '近一年', value: 'A130' },
                            { label: '近30日', value: 'A127' },
                            { label: '近90日', value: 'A128' },
                            { label: '近半年', value: 'A129' },
                        
                        ]"></cbutton>
                    </div>
                    <baseline></baseline>
                    <graph class="common-graph graph" :graphId="'_graph1'" :data="$data.floor3.graph"></graph>
                </div>
                <div class="right">
                    <pie class="common-graph slice" :size='["26%", "42%"]' :config="pieConfig" :pieId="'_pie3'"
                        :data='$data.floor3.pie'>
                    </pie>
                    <div class="subTitle">
                        故障原因
                        <cbutton class="cbutton" @change="changeType" :originKey="'A020'"
                            :directList="[{ label: '全部', value: { freq: '', iscurrentDate: '' } }, { label: '本月', value: { freq: '03', iscurrentDate: '1' } }]">
                        </cbutton>
                    </div>
                </div>
            </div>
        </div>
        <div class="floor">
            <moduleName class="modulename" :module-name="$data.floor4.module"></moduleName>
            <baseline class="baseline"></baseline>
            <div class="content">
                <div class="left slice">
                    <div class="subText">
                        近30日日均运行次数排行
                    </div>
                    <baseline></baseline>
                    <graph class="common-graph graph" :graphId="'_graph2'" :data="$data.floor4.graph1"></graph>
                </div>
                <div class="left slice">
                    <div class="subText">
                        非正常停梯次数（近6万次运行内）
                    </div>
                    <baseline></baseline>
                    <graph :showInfinity="true" class="common-graph graph" :graphId="'_graph3'"
                        :data="$data.floor4.graph2"></graph>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, computed, watch } from 'vue'
import baseline from './components/baseline.vue'
import monthline from './components/monthline.vue'
import cbutton from './components/cbutton.vue'
import pie from '../project/pie.vue'
import graph from './components/graph.vue'
const props = defineProps({
    data: {
        type: Object,
        default: {}
    }
})
const emit = defineEmits(['change'])
const totalCount1 = ref(0)
const totalCount2 = ref(0)
const faultCount1 = ref(0)
const faultCount2 = ref(0)
const upkeep = ref(0)
const trappedCount1 = ref(0)
const trappedCount2 = ref(0)
const pieConfig = {
    itemHeight: 10,
    itemGap: 10,
    itemWidth: 10,
    legendFontSize: '10px'
}
watch(() => props.data.A125, (v) => {
    setTimeout(() => {
        if (v) {
            $data.floor1.pie = []
            $data.floor1.pie.push(...v)
        }
    })
}, {
    deep: true,
    immediate: true
})
watch(() => props.data.A121, (v) => {
    setTimeout(() => {
        if (v) {
            $data.floor2.pie = []
            $data.floor2.pie.push(...v)
        }
    })
}, {
    deep: true,
    immediate: true
})
watch(() => props.data.A020, (v) => {
    setTimeout(() => {
        if (v) {
            $data.floor3.pie = []
            $data.floor3.pie.push(...v)
        }
    })
}, {
    deep: true,
    immediate: true
})
watch(() => props.data.A127, (v) => {
    setTimeout(() => {
        if (v) {
            $data.floor3.graph = []
            $data.floor3.graph.push(...v)
            console.log('floor3:', JSON.parse(JSON.stringify($data.floor3.graph)))
        }
    })
}, {
    deep: true,
    immediate: true
})
watch(() => props.data.A126, (v) => {
    setTimeout(() => {
        if (v) {
            $data.floor4.graph1 = []
            $data.floor4.graph1.push(...v)
            console.log(JSON.stringify($data.floor4.graph1))
        }
    })
}, {
    deep: true,
    immediate: true
})
watch(() => props.data.A131, (v) => {
    setTimeout(() => {
        if (v) {
            $data.floor4.graph2 = []
            $data.floor4.graph2.push(...v)
        }
    })
}, {
    deep: true,
    immediate: true
})
watch(() => props.data.A124, (v) => {
    setTimeout(() => {
        if (v) {
            $data.floor1.monthline = []
            $data.floor1.monthline.push(...v)
            totalCount1.value = $data.floor1.monthline[$data.floor1.monthline.length - 1]?.data.total
            faultCount1.value = $data.floor1.monthline[$data.floor1.monthline.length - 1]?.data.fault
            trappedCount1.value = $data.floor1.monthline[$data.floor1.monthline.length - 1]?.data.trapped
            upkeep.value = $data.floor1.monthline[$data.floor1.monthline.length - 1]?.data.upkeep
            console.log({ totalCount1, faultCount1, trappedCount1, 'xxx': $data.floor1.monthline })
        }
    })
}, {
    deep: true,
    immediate: true
})
watch(() => props.data.A122, (v) => {
    setTimeout(() => {
        if (v) {
            $data.floor2.monthline = []
            $data.floor2.monthline.push(...v)
            totalCount2.value = $data.floor2.monthline[$data.floor2.monthline.length - 1]?.data.totalCount
            faultCount2.value = $data.floor2.monthline[$data.floor2.monthline.length - 1]?.data.faultCount
            trappedCount2.value = $data.floor2.monthline[$data.floor2.monthline.length - 1]?.data.trappedCount
        }
    })
}, {
    deep: true,
    immediate: true
})
const $data = reactive({
    floor1: {
        module: '停梯',
        monthline: [],
        pie: []
    },
    floor2: {
        module: '回召',
        monthline: [],
        pie: []
    },
    floor3: {

        graph: [],
        pie: []
    },
    floor4: {
        module: '运行',
        graph1: [],
        graph2: []
    }
})
const changeType = (originKey, value) => {
    emit('change', originKey, value)
}
</script>
<style lang="scss" scoped>
#databoard {
    width: 100%;

    .baseline {
        transform: translateY(10px);
    }

    .floor {
        .modulename {
            margin-top: 0;
        }

        .content {
            color: #fff;
            font-size: 14px;
            text-align: center;
            display: flex;

            .title {
                padding: 10px 20px 0;
                box-sizing: border-box;
                display: flex;
                flex-wrap: nowrap;

                span {
                    margin-right: 8px;
                    white-space: nowrap;
                }



                span:last-child {
                    margin-right: 0;
                }
            }

            .common-graph {
                margin: 0 auto;
            }

            .left {
                width: 50%;

                .common-graph {
                    width: 250px;
                    height: 165px;
                }

                .common-graph.graph {
                    width: 250px;
                    height: 185px;
                }

                .subText {
                    position: relative;
                    text-align: left;
                    padding-top: 10px;
                    color: #23FFFC;
                    text-indent: 10px;
                    transform: translateY(8px);

                    .cbutton {
                        position: absolute;
                        right: 0px;
                        top: 3px;
                    }

                    .cbutton.m {
                        top: 5px;
                        right:10px;
                    }
                }
            }

            .left.slice {
                box-sizing: border-box;
                padding-left: 50px;
                margin: 0 auto;
            }

            .right {
                width: 50%;

                .common-graph {
                    width: 250px;
                    height: 185px;
                }

                .common-graph.slice {
                    width: 250px;
                    height: 205px;
                }


            }


            .subTitle {
                position: relative;

                .cbutton {
                    position: absolute;
                    right: 20px;
                    top: -5px;
                }
            }
        }


    }

    .floor:first-child {
        .modulename {
            // margin-top: 15px;
        }
    }
}
</style>