<template>
    <div class="border">
        <div class="monthline-list">
            <div class="_monthline">
                <div class="graph">
                    <monthline :lineId="'monthline_a2'" :data="$data.A124" :interval="1"
                        :yKey="['total', 'trapped', 'fault', 'upkeep']">
                    </monthline>
                </div>
                <div class="subtitle">停梯时长走势</div>
            </div>
            <div class="_monthline">
                <div class="graph">
                    <monthline :lineId="'monthline_b3'" :data="$data.A122" :interval="1"
                        :yKey="['totalCount', 'trappedCount', 'faultCount']">
                    </monthline>
                </div>
                <div class="subtitle">回召走势</div>
            </div>
            <div class="_monthline">
                <div class="graph">
                    <monthline :lineId="'monthline_c4'" :data="$data.A151" :interval="1" :yKey="['totalCount']">
                    </monthline>
                </div>
                <div class="subtitle">维保次数走势</div>
            </div>
        </div>
        <div class="pie-list">
            <div class="pie">
                <div class="graph">
                    <pie style="width:100%;height:100%" :pieId="'pie_a'" :isPercent="false" :data='$data.A125'>
                    </pie>
                </div>
                <div class="subtitle">停梯时长分布</div>
            </div>
            <div class="pie">
                <div class="graph">
                    <pie style="width:100%;height:100%" :pieId="'pie_b'" :isPercent="false" :data='$data.A121'>
                    </pie>
                </div>
                <div class="subtitle">回召类型分布</div>
            </div>
            <div class="pie">
                <div class="graph">
                    <pie style="width:100%;height:100%" :pieId="'pie_c'" :isPercent="false" :data='$data.A020'>
                    </pie>
                </div>
                <div class="subtitle">故障原因分布</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import pie from '../../project/pie.vue'
import monthline from '../../customerBi/components/monthline.vue'
import { reactive, ref, onMounted, computed, watch } from 'vue'


let list = []
for (let i = 1; i < 31; i++) {
    const o = {
        data: "965",
        day: 1,
        desc: "(次)",
        id: "",
        name: "运行次数"
    }
    o.day = i;
    o.data = Math.floor(Math.random() * 1000)

    list.push(o)
}
const $data = reactive({
    pie1: [
        {
            count: "0",
            data: "0%",
            desc: "#23F77C",
            id: "",
            name: "控制故障1"
        },
        {
            count: "0",
            data: "0%",
            desc: "#255FFC",
            id: "",
            name: "控制故障2"
        },
        {
            count: "0",
            data: "0%",
            desc: "#99FF5C",
            id: "",
            name: "控制统3"
        },
        {
            count: "0",
            data: "0%",
            desc: "#88FFFC",
            id: "",
            name: "控制障4"
        },
        {
            count: "0",
            data: "0%",
            desc: "#FFFFFC",
            id: "",
            name: "控制系故障6"
        },
        {
            count: "0",
            data: "0%",
            desc: "#23FCCC",
            id: "",
            name: "系统故障7"
        },
    ],
    graph1: [],

    A020: [],
    A124: [],
    A121: [],
    A122: [],
    A125: [],
    A151: []
})
onMounted(() => {
    console.log({ list })
    $data.graph1 = list
})
const props = defineProps({
    data: {
        type: Array,
        default: () => {
            return {
                A020: [],
                A124: [],
                A121: [],
                A122: [],
                A125: [],
                A151: [],
            }
        }
    }
})
$data.A020 = computed(() => props.data.A020)
$data.A124 = computed(() => props.data.A124)
$data.A121 = computed(() => props.data.A121)
$data.A122 = computed(() => props.data.A122)
$data.A125 = computed(() => props.data.A125)
$data.A151 = computed(() => props.data.A151)



</script>

<style lang="scss" scoped>
.border {
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    .monthline-list {
        display: flex;
        justify-content: space-between;

        ._monthline {
            width: 30%;

            .graph {
                width: 98%;
                margin: 0 auto;
                height: 190px;
                box-sizing: border-box;
            }

            .subtitle {
                text-align: center;
                padding: 10px 0;
                color: #fff;
            }
        }
    }

    .pie-list {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;

        .pie {
            width: 33%;

            .graph {
                width: 98%;
                margin: 0 auto;
                height: 320px;
                box-sizing: border-box;
            }

            .subtitle {
                text-align: center;
                padding: 10px 0;
                color: #fff;
            }
        }
    }

}
</style>