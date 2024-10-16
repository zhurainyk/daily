<template>
    <border class="border">
        <div class="temp">
            <module-name :moduleName="'事件预警'"></module-name>
            <div class="sub-title"> </div>
            <div class="content">
                <div class="tab">
                    <div class="item">
                        <div class="label">合同即将到期</div>
                        <div class="value" :class="{ borderline: borderLine('00') }" @click="toContract('00')">{{
                            $data.contractExpiringSoonCount || 0 }}</div>
                    </div>
                </div>
                <div class="tab">
                    <div class="item">
                        <div class="label">合同已到期</div>
                        <div class="value" :class="{ borderline: borderLine('01') }" @click="toContract('01')">{{
                            $data.contractExpiredCount || 0 }}</div>
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
const menuAuth = computed(() => $store.state.menu.menuAuth)
const companyId = computed(() => props.companyId)
const permissionConfig = {
    '00': ['/elevator/icontract/selectByCondition'],
    '01': ['/elevator/icontract/selectByCondition'],
}
const toContract = (e) => {
    const permissionList = permissionConfig[e]
    let mark = true;
    permissionList.forEach(x => {
        const res = menuAuth.value.includes(x)
        if (!res) {
            mark = false
        }
    })
    const params = { name: 'ContractManagement', query: { status: e, db_contState: '01', db_useCompanyId: companyId.value == 'all' ? '' : companyId.value, ui_isByCompany: '03' } }
    if (mark) {
        $router.push(params)
    }
}
const borderLine = (e) => {
    const permissionList = permissionConfig[e]
    let mark = true;
    permissionList.forEach(x => {
        const res = menuAuth.value.includes(x)
        if (!res) {
            mark = false
        }
    })
    return mark
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
            margin-top: 22px;
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

                    .borderline {
                        text-decoration: underline;
                        cursor: pointer;
                    }
                }
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

}</style>