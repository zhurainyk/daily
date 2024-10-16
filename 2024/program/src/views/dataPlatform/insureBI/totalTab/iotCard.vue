<template>
    <border class="border">
        <div class="temp">
            <module-name :moduleName="'物联网'"></module-name>
            <div class="content">
                <div class="left">
                    <div class="item">
                        <div class="desc">
                            <span class="label">安装设备数</span>
                            <span class="unit">(个)</span>
                        </div>
                        <div class="value">{{ $data.iotTotal || 0 }}</div>
                    </div>
                    <div class="item">
                        <div class="desc">
                            <span class="label">在线设备数</span>
                            <span class="unit">(个)</span>
                        </div>
                        <div class="value">{{ $data.iotOnlineTotal || 0 }}</div>
                    </div>
                </div>
                <div class="right">
                    <div class="circle">
                        <ecircle :value="$data.onlineRatio" :label="'在线率'"></ecircle>
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

    .content {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        width: 100%;
        padding: 20px;

        .left {
            flex-grow: 1;

            .item {
                margin-top: 10px;

                .desc {
                    display: flex;

                    .label {
                        color: #fff;
                        font-size: 16px;
                        white-space: nowrap;
                    }

                    .unit {
                        color: #CCD3D6;
                        font-size: 14px;
                        white-space: nowrap;
                    }
                }

                .value {
                    margin-top: 14px;
                    font-size: 24px;
                    color: #29B6FF;
                    text-align: center;
                }
            }
        }

        .right {
            width: 126px;

            .circle {
                width: 100px;
                height: 100px;
                margin: 0 auto;
                margin-top: 23px;
            }
        }
    }
}
</style>