<template>
    <border class="border">
        <div class="temp">
            <module-name :moduleName="'今日动态'"></module-name>
            <div class="content">
                <div class="head">
                    <div class="tab" v-for="(x, i) in headerTab" :class="{ first: i == 0 }" :key="x.label">
                        {{ x.label }}
                    </div>
                </div>
                <div class="list">
                    <el-scrollbar height="100%">
                        <div class="_temp" v-for="(x, i) in tableList" :key="x.label">
                            <div class="tab" v-for="(tab, y) in headerTab" :class="{ first: y == 0 }" :key="y"
                                :title="x[tab.key]">
                                {{ x[tab.key] }}
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
        </div>
    </border>
</template>
<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
    data: {
        type: Array,
        default: [

        ]
    }
})

const headerTab = ref([

    // {
    //     label: '日期',
    //     key: 'date'
    // },
    // {
    //     label: '电梯位置',
    //     key: 'elevatorLocation'
    // },
    // {
    //     label: '保养类型',
    //     key: 'taskType'
    // },
    {
        label: '任务名称',
        key: 'taskName',
    },
    {
        label: '任务状态',
        key: 'taskState'
    },
    {
        label: '责任人',
        key: 'chargeUserName'
    },
])
const tableList = computed(() => props.data)

</script>
<style lang="scss" scoped>
.border {
    width: 100%;
    height: 100%;

    .temp {
        .content {
            .head {
                display: flex;
                justify-content: space-around;
                padding: 24px 0 2px;

                .tab {
                    width: 18%;
                    text-align: center;
                    color: #fff;
                    font-size: 14px;
                }

                .tab.first {
                    text-align: left;
                    width: 60%;
                    text-indent: 20px;
                }
            }

            .list {
                height: 140px;

                ._temp {
                    display: flex;
                    justify-content: space-around;
                    padding: 12px 0;

                    .tab {
                        width: 18%;
                        text-align: center;
                        color: #C0DFFF;
                        font-size: 14px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }

                    .tab.first {
                        width: 60%;
                        text-align: left;
                        text-indent: 20px;
                    }
                }



            }
        }
    }
}
</style>