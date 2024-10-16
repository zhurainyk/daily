<template>
    <border class="border">
        <div class="temp">
            <module-name :moduleName="'今日动态'"></module-name>
            <div class="content">
                <div class="left">
                    <div class="tab">
                        <span class="color">今日维保计划</span>
                        <span class="num" :class="{ bottomLine: bottomLine() }" @click="toDetail('')">{{
                            $data.regularUpkeepCount
                            || 0 }}</span>
                        <span class="color">(次)</span>
                    </div>
                </div>
                <div class="right">
                    <div class="tab">
                        <span class="color">待处理</span>
                        <span class="num" :class="{ bottomLine: bottomLine() }" @click="toDetail('03')">{{
                            $data.waitingForProcessingCount || 0 }}</span>
                        <span class="color">(次)</span>
                    </div>
                    <div class="tab">
                        <span class="color">处理中</span>
                        <span class="num" :class="{ bottomLine: bottomLine() }" @click="toDetail('04')">{{
                            $data.processingCount || 0 }}</span>
                        <span class="color">(次)</span>
                    </div>
                </div>
            </div>
        </div>
    </border>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import moment from 'moment'
const props = defineProps({
    data: {
        type: Object,
        default: {}
    },
    companyId: {
        type: String
    }
})
const $store = useStore()
const $router = useRouter()
const $data = computed(() => props.data)
const menuAuth = computed(() => $store.state.menu.menuAuth)
const companyId = computed(() => props.companyId)
const bottomLine = () => {
    const permissionList = config
    let mark = true;
    permissionList.forEach(x => {
        const res = menuAuth.value.includes(x)
        if (!res) {
            mark = false
        }
    })
    return mark
}
const config = ['/elevator_order/itaskInfo/selectByCondition', '/tkwl/insuPlatForm/taskList']
const toDetail = (code) => {
    const permissionList = config
    let mark = true;
    permissionList.forEach(x => {
        const res = menuAuth.value.includes(x)
        if (!res) {
            mark = false
        }
    })
    const params = {
        name: 'TaskManagementList',
        query: {
            ui_start_preEndtime: moment(new Date(new Date(new Date().toLocaleDateString()).getTime())).format('YYYY-MM-DD HH:mm:ss'),
            ui_end_preEndtime: moment(new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)).format('YYYY-MM-DD HH:mm:ss'),
            db_useCompanyId: companyId.value == 'all' ? '' : companyId.value,
            db_taskTypeCode: 'RegularUpkeep',
        }
    }
    if (code) {
        params.query.db_taskState = code
    } else {
        params.query.db_taskState = ''
    }
    if (mark) {
        $router.push(params)
    }
}
</script>
<style lang="scss" scoped>
.border {
    width: 100%;
    height: 100%;

    .temp {
        .content {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 30px;

            .left,
            .right {
                padding: 20px 40px;

                .tab {
                    span {
                        font-size: 14px;
                        color: #fff;
                    }

                    span.num {
                        font-size: 28px;
                        color: #009AFC;
                        padding: 0 6px;

                    }

                    span.num.bottomLine {
                        text-decoration: underline;
                        cursor: pointer;
                    }
                }
            }

        }

        // .content:hover .color{
        //     color:aqua;
        // }
    }
}
</style>