<template>
    <border class="border">
        <div class="temp">
            <module-name :moduleName="'排行'"></module-name>
            <div class="content">
                <div class="select-tab">
                    <div class="option " :class="{ actived: tabIndex == '01' }" @click='rangeClick("01")'>项目排行</div>
                    <div class="option " :class="{ actived: tabIndex == '02' }" @click='rangeClick("02")'>维保公司排行</div>
                </div>
                <div class="main-list">
                    <div class="_temp">
                        <div class="sub-head">
                            <span class="label">年度故障发起总数排行</span>
                            <span class="unit">(次)</span>
                        </div>
                        <div class="list" >
                            <el-scrollbar height="100%">
                                <template v-if="$data[tabIndex].occurFaultRank">
                                    <div class="item" v-for="(item, index) in $data[tabIndex].occurFaultRank || []" :key="index">
                                    <div class="before">
                                        <span class="index">{{ index + 1 }}</span>
                                        <span class="name">.{{ item.name }}</span>
                                    </div>
                                    <span class="value">{{ item.count }}</span>
                                </div>
                                </template>
                               
                            </el-scrollbar>
                        </div>
                    </div>
                    <div class="_temp">
                        <div class="sub-head">
                            <span class="label">年度结算总数排行</span>
                            <span class="unit">(单)</span>
                        </div>
                        <div class="list" >
                            <el-scrollbar height="100%">
                                <template v-if="$data[tabIndex].insurancePaidRank">
                                    <div class="item" v-for="(item, index) in $data[tabIndex].insurancePaidRank || []"
                                    :key="index">
                                    <div class="before">
                                        <span class="index">{{ index + 1 }}</span>
                                        <span class="name">.{{ item.name }}</span>
                                    </div>
                                    <span class="value">{{ item.count }}</span>
                                </div> 
                                </template>
                               
                            </el-scrollbar>
                        </div>
                    </div>
                    <div class="_temp">
                        <div class="sub-head">
                            <span class="label">年度支付排行</span>
                            <span class="unit">(元)</span>
                        </div> 
                        <div class="list" >
                            <el-scrollbar height="100%">
                                <template v-if="$data[tabIndex].insurancePaidMoneyRank">
                                    <div class="item" v-for="(item, index) in $data[tabIndex].insurancePaidMoneyRank || []"
                                    :key="index">
                                    <div class="before">
                                        <span class="index">{{ index + 1 }}</span>
                                        <span class="name">.{{ item.name }}</span>
                                    </div>
                                    <span class="value">{{ item.count }}</span>
                                </div>
                                </template> 
                            </el-scrollbar>
                        </div>
                    </div>
                    <div class="_temp">
                        <div class="sub-head">
                            <span class="label">年度平均处理时长排行</span>
                            <span class="unit">(小时)</span>
                        </div>
                        <div class="list">
                            <el-scrollbar height="100%">
                                <template  v-if="$data[tabIndex].insuranceAvgDurationRank">
                                    <div class="item" v-for="(item, index) in $data[tabIndex].insuranceAvgDurationRank || []"
                                    :key="index">
                                    <div class="before">
                                        <span class="index">{{ index + 1 }}</span>
                                        <span class="name">.{{ item.name }}</span>
                                    </div>
                                    <span class="value">{{ item.avgDuration }}</span>
                                </div>
                                </template>
                                
                            </el-scrollbar>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </border>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'
const props = defineProps({
    data: {
        type: Object,
        default: { '01': {}, '02': {} }
    }
})
const $data = computed(() => props.data)

const tabIndex = ref('01')
const rangeClick = (v) => {
    tabIndex.value = v
}
const tableList = ref([
    {
        name: '重庆环球金融中心',
        data: '32'
    },
    {
        name: '中成化油器厂房',
        data: '12'
    },
    {
        name: '仙鱼建筑办公楼',
        data: '8'
    },
    {
        name: '重庆环球金融中心',
        data: '22'
    },
    {
        name: '重庆环球金融中心',
        data: '22'
    },
])
</script>
<style lang="scss" scoped>
.border {
    width: 100%;
    height: 100%;

    .content {
        width: 100%;
        height: 100%;
        box-sizing: border-box;

        .select-tab {
            display: flex;
            margin-top: 30px;

            .option {
                position: relative;
                color: #999999;
                font-size: 16px;
                padding: 8px 20px;

            }

            .option:hover {
                color: #fff;
                cursor: pointer;
            }

            .option.actived {
                color: #fff;
            }

            .option.actived::after {
                content: '';
                position: absolute;
                width: 36px;
                height: 3px;
                background: #009AFC;
                border-radius: 2px;
                bottom: 2px;
                left: 50%;
                margin-left: -18px;

            }
        }

        .main-list {
            width: 100%;
            padding: 0 20px;
            box-sizing: border-box;

            ._temp {
                margin-top: 20px;

                .sub-head {
                    position: relative;
                    display: flex;
                    justify-content: space-between;
                    padding: 8px 0;

                    .label {
                        color: #23FFFC;
                        font-size: 14px;
                    }

                    .unit {
                        color: #F0F0F0;
                        font-size: 12px;
                    }
                }

                .sub-head ::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    left: 0;
                    height: 1px;
                    background: #009AFC;
                    opacity: 0.2;
                }

                .list {
                    height: 105px;

                    .item {
                        display: flex;
                        justify-content: space-between;
                        padding: 5px 0;

                        .before {
                            font-family: MicrosoftYaHei;

                            .index {
                                color: #f0f0f0;
                                font-size: 14px;
                            }

                            .name {
                                color: #f0f0f0;
                                font-size: 14px;
                            }
                        }

                        .value {
                            width: 100px;
                            text-align: right;
                            font-size: 14px;
                            font-family: MicrosoftYaHeiLight;
                            color: #f0f0f0;
                        }
                    }

                    .item:nth-child(-n + 3) .before .index {
                        color: #23fffc;
                        font-size: 18px;
                    }
                }
            }

            ._temp:first-child {
                margin-top: 14px;
            }
        }

    }

}</style>