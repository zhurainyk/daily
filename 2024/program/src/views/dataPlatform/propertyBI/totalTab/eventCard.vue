<template>
    <border class="border">
        <div class="temp">
            <module-name :moduleName="'事件预警'"></module-name>
            <div class="sub-title"> </div>
            <div class="content">
                <div class="tab">
                    <div class="item">
                        <div class="label">合同即将到期</div>
                        <div class="value" :class="{ borderline: toContractB('00') }" @click="toContract('00')">{{
                            $data.contractExpiringSoonCount || 0 }}</div>
                    </div>
                    <div class="item">
                        <div class="label">年检即将到期</div>
                        <div class="value" :class="{ borderline: toYearCheckB('02') }" @click="toYearCheck('02')">{{
                            $data.annualInspectExpiringSoonCount || 0 }}</div>
                    </div>
                    <div class="item">
                        <div class="label">维保计划超期</div>
                        <div class="value" :class="{ borderline: toDetailB('01') }" @click="toDetail('01')">{{
                            $data.maintenancePlanExpiredCount || 0 }}</div>
                    </div>
                    <div class="item">
                        <div class="label">回召转派超期</div>
                        <div class="value" :class="{ borderline: toDetailB('03') }" @click="toDetail('03')">{{
                            $data.callbackUntransferedCount || 0 }}</div>
                    </div>
                    <div class="item">
                        <div class="label">待工程验收</div>
                        <div class="value" :class="{ borderline: toDetail2B('06') }" @click="toDetail2('06')">{{
                            $data.waitForEngineerAcceptanceCount || 0 }}</div>
                    </div>
                </div>
                <div class="tab">
                    <div class="item">
                        <div class="label">合同已到期</div>
                        <div class="value" :class="{ borderline: toContractB('01') }" @click="toContract('01')">{{
                            $data.contractExpiredCount || 0 }}</div>
                    </div>
                    <div class="item">
                        <div class="label">年检已到期</div>
                        <div class="value" :class="{ borderline: toYearCheckB('00') }" @click="toYearCheck('00')">{{
                            $data.annualInspectExpiredCount || 0 }}</div>
                    </div>
                    <div class="item">
                        <div class="label">维保超期</div>
                        <div class="value" :class="{ borderline: toDetailB('02') }" @click="toDetail('02')">{{
                            $data.maintenanceExpiredCount || 0 }}</div>
                    </div>
                    <div class="item">
                        <div class="label">回召超期</div>
                        <div class="value" :class="{ borderline: toDetailB('04') }" @click="toDetail('04')">{{
                            $data.callbackExpiredCount || 0 }}</div>
                    </div>
                    <div class="item">
                        <div class="label">待物业验收</div>
                        <div class="value" :class="{ borderline: toDetail2B('07') }" @click="toDetail2('07')">{{
                            $data.waitForPropertyAcceptanceCount || 0 }}</div>
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
const $router = useRouter()
const $store = useStore()
const props = defineProps({
    data: {
        type: Object,
        default: {}
    },
    companyId: {
        type: String
    }
})
const contractConfig = {
    '00': ['/elevator/icontract/save'],
    '01': ['/elevator/icontract/save'],
}

const menuAuth = computed(() => $store.state.menu.menuAuth)
const companyId = computed(() => props.companyId)
const toContract = (e) => {
    const permissionList = contractConfig[e]
    let mark = true;
    permissionList.forEach(x => {
        const res = menuAuth.value.includes(x)
        if (!res) {
            mark = false
        }
    })
    const params = { name: 'ContractManagement', query: { status: e, db_contState: '01', db_useCompanyId: companyId.value == 'all' ? '' : companyId.value, ui_isByCompany: '01' } }
    if (mark) {
        $router.push(params)
    }

}
const toContractB = (e) => {
    const permissionList = contractConfig[e]
    let mark = true;
    permissionList.forEach(x => {
        const res = menuAuth.value.includes(x)
        if (!res) {
            mark = false
        }
    })
    return mark
}

const yearCheckConfig = {
    '02': ['/elevator/ielevator/selectById', '/elevator/ielevator/save'],
    '00': ['/elevator/ielevator/selectById', '/elevator/ielevator/save'],
}
const toYearCheck = (e) => {
    const permissionList = yearCheckConfig[e]
    let mark = true;
    permissionList.forEach(x => {
        const res = menuAuth.value.includes(x)
        if (!res) {
            mark = false
        }
    })
    const params = {
        name: 'ElevManageCusotom',
        query: {
            db_inspectState: e,
            db_useCompanyId: companyId.value == 'all' ? '' : companyId.value, ui_isByCompany: '01'
        }
    }
    if (mark) {
        $router.push(params)
    }
}
const toYearCheckB = (e) => {
    const permissionList = yearCheckConfig[e]
    let mark = true;
    permissionList.forEach(x => {
        const res = menuAuth.value.includes(x)
        if (!res) {
            mark = false
        }
    })
    return mark
}
const orderConfig = {
    '01': ['/elevator_order/itaskInfo/selectByCondition', '/tkwl/insuPlatForm/taskList'],
    '02': ['/elevator_order/itaskInfo/selectByCondition', '/tkwl/insuPlatForm/taskList'],
    '03': ['/elevator_order/itaskInfo/selectByCondition', '/tkwl/insuPlatForm/taskList'],
    '04': ['/elevator_order/itaskInfo/selectByCondition', '/tkwl/insuPlatForm/taskList'],
    '06': ['/elevator_order/itaskInfo/selectByCondition', '/tkwl/insuPlatForm/taskList'],
    '07': ['/elevator_order/itaskInfo/selectByCondition', '/tkwl/insuPlatForm/taskList'],
}

const toDetail = (e) => {
    const permissionList = orderConfig[e]
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
            ui_overdue: e,
            db_useCompanyId: companyId.value == 'all' ? '' : companyId.value, ui_isByCompany: '01'
        }
    }
    console.log(mark)
    if (mark) {
        $router.push(params)
    }
}
const toDetailB = (e) => {
    const permissionList = orderConfig[e]
    let mark = true;
    permissionList.forEach(x => {
        const res = menuAuth.value.includes(x)
        if (!res) {
            mark = false
        }
    })
    return mark
}
const toDetail2B = (e) => {
    const permissionList = orderConfig[e]
    let mark = true;
    permissionList.forEach(x => {
        const res = menuAuth.value.includes(x)
        if (!res) {
            mark = false
        }
    })
    return mark
}

const toDetail2 = (e) => {
    const permissionList = orderConfig[e]
    let mark = true;
    permissionList.forEach(x => {
        const res = menuAuth.value.includes(x)
        if (!res) {
            mark = false
        }
    })
    console.log(mark)
    const params = {
        name: 'TaskManagementList',
        query: {
            db_taskState: e,
            db_useCompanyId: companyId.value == 'all' ? '' : companyId.value,
            ui_isByCompany: '01'
        }
    }
    if (mark) {
        $router.push(params)
    }
}

const $data = computed(() => props.data)
</script>
<style lang="scss" scoped>
.border {
    width: 100%;
    height: 100%;

    .temp {
        position: relative;

        .sub-title {
            position: absolute;
            top: 17px;
            left: 108px;
            font-size: 14px;
            color: #23FFFC;
        }

        .content {
            margin-top: 30px;
            display: flex;
            justify-content: space-between;

            .tab {
                position: relative;
                width: 50%;
                box-sizing: border-box;
                padding: 0 10px;

                .item {
                    margin: 8px 0;
                    text-align: center;

                    .label {
                        font-size: 14px;
                        color: #fff;
                        white-space: nowrap;
                    }

                    .value {
                        font-size: 22px;
                        color: #29B6FF;

                    }

                    .value.borderline {
                        text-decoration: underline;
                        cursor: pointer;
                    }
                }

                // .item:hover .label{
                //     color:#23FFFC;
                // }
            }

            .tab:first-child::after {
                content: '';
                position: absolute;
                right: 0;
                top: 0;
                width: 1px;
                height: 100%;
                background-color: rgba(0, 154, 252, .3);
            }
        }
    }

}
</style>