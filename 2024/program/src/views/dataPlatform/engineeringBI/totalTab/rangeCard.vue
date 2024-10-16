<template>
    <border class="border">
        <div class="temp">
            <module-name :moduleName="'停梯时长'"></module-name>
            <div class="content">
                <div class="sub-head">
                    <span class="label">年度项目停梯时长排行</span>
                    <span class="unit">(小时)</span>
                </div>
                <div class="list">
                    <el-scrollbar height="100%">
                        <div class="item" v-for="(item, index) in $data" :key="index">
                            <div class="before">
                                <span class="index">{{ index + 1 }}</span>
                                <span class="name">.{{ item.name }}</span>
                            </div>
                            <span class="value">{{ item.data }}</span>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
        </div>
    </border>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'
const props = defineProps({
    data: {
        type: Array,
        default: []
    }
})
const $data = computed(() => props.data)
// const tableList = ref([
//     {
//         name: '重庆环球金融中心',
//         data: '22'
//     },
//     {
//         name: '重庆环球金融中心',
//         data: '22'
//     },
//     {
//         name: '重庆环球金融中心',
//         data: '22'
//     },
//     {
//         name: '重庆环球金融中心',
//         data: '22'
//     },
//     {
//         name: '重庆环球金融中心',
//         data: '22'
//     },
//     {
//         name: '重庆环球金融中心',
//         data: '22'
//     },
//     {
//         name: '重庆环球金融中心',
//         data: '22'
//     },
//     {
//         name: '重庆环球金融中心',
//         data: '22'
//     },
//     {
//         name: '重庆环球金融中心',
//         data: '22'
//     },
//     {
//         name: '重庆环球金融中心',
//         data: '22'
//     },
// ])
</script>
<style lang="scss" scoped>
.border {
    width: 100%;
    height: 100%;

    .content {
        margin-top: 20px;
        width: 100%;
        box-sizing: border-box;
        padding: 0 20px;

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
            height: 283px;

            .item {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;

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

}
</style>