<template>
    <border class="border">
        <div class="temp">
            <module-name :moduleName="'保险服务'"></module-name>
            <div class="content">
                <div class="tab">
                    <div class="item">
                        <div class="desc">
                            <span class="label">保险覆盖率</span>
                            <span class="unit">(%)</span>
                        </div>
                        <div class="value">{{ $data.insuranceCoverageRatio || 0 }}</div>
                    </div>
                    <div class="item">
                        <div class="desc">
                            <span class="label">年度故障发起</span>
                            <span class="unit">(次)</span>
                        </div>
                        <div class="value">{{ $data.insuranceCount || 0 }}</div>
                    </div>
                    <div class="item">
                        <div class="desc">
                            <span class="label">年度结算</span>
                            <span class="unit">(单)</span>
                        </div>
                        <div class="value">{{ $data.insurancePaidCount || 0 }}</div>
                    </div>
                </div>
                <div class="tab">
                    <div class="item">
                        <div class="desc">
                            <span class="label">年度平均支付比例</span>
                            <span class="unit">(%)</span>
                        </div>
                        <div class="value">{{ $data.insurancePaidRatio || 0 }}</div>
                    </div>
                    <div class="item">
                        <div class="desc">
                            <span class="label">年度平均处理时长</span>
                            <span class="unit">(小时)</span>
                        </div>
                        <div class="value">{{ $data.insuranceAvgDuration || 0 }}</div>
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
        default: {}
    }
})
const $data = computed(() => props.data)
</script>
<style lang="scss" scoped>
.border {
    width: 100%;
    height: 100%;
    box-sizing: border-box;


    .content {
        margin-top: 20px;
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;

        .tab:first-child {
            margin-top: 40px;
        }

        .tab {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;

            .item {
                .desc {
                    .label {
                        color: #fff;
                        font-size: 16px;
                    }

                    .unit {
                        color: #CCD3D6;
                        font-size: 14px;
                    }

                }

                .value {
                    font-size: 24px;
                    color: #29B6FF;
                    margin-top: 17px;
                    text-align: center;
                }
            }
        }
    }
}
</style>