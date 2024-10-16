<template>
    <border class="border">
        <div class="temp">
            <module-name :moduleName="'今日动态'"></module-name>
            <div class="content">
                <div class="_temp">
                    <div class="item">
                        <span class="label">维修会审 </span>
                        <span class="value" :class="{bottomline:hasLine('00')}" @click="toDetail('00')"> {{ $data.insuAuditCount || 0 }} </span>
                        <span class="unit"> (次)</span>
                    </div>
                    <div class="item">
                        <span class="label">故障定损 </span>
                        <span class="value" :class="{bottomline:hasLine('01')}" @click="toDetail('01')"> {{ $data.assessLossCount||0 }} </span>
                        <span class="unit"> (次)</span>
                    </div>
                </div>
                <div class="_temp">
                    <div class="item">
                        <span class="label">结算审核 </span>
                        <span class="value" :class="{bottomline:hasLine('02')}" @click="toDetail('02')"> {{ $data.settleAuditCount|| 0 }} </span>
                        <span class="unit"> (次)</span>
                    </div>
                    <div class="item">
                        <span class="label">付款确认 </span>
                        <span class="value" :class="{bottomline:hasLine('03')}" @click="toDetail('03')"> {{ $data.comfirmPayCount || 0}} </span>
                        <span class="unit"> (次)</span>
                    </div>
                </div>
            </div>
        </div>
    </border>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router' 
import {useStore} from 'vuex'
const $router = useRouter()
const $store = useStore()
const props = defineProps({
    data: {
        type: Object,
        default: {}
    },
    companyId:{
        type:String
    }
})
const $data = computed(()=>props.data)
const menuAuth = computed(() => $store.state.menu.menuAuth)
const companyId = computed(()=>props.companyId)
const hasLine = (e)=>{
    const permissionList= permissionConfig[e] 
    let mark = true ; 
    permissionList.forEach(x=>{
      const res =  menuAuth.value.includes(x)
      if(!res){
        mark = false 
      }
    })
    return mark
}
const permissionConfig = {
    '00':['/elevator_order/iinsuranceInfo/maintPlanInsuAudit'],
    '01':['/elevator_order/iinsuranceInfo/assessLossPass','/elevator_order/iinsuranceInfo/assessLossReject'], 
    '02':['/elevator_order/iinsuranceInfo/settleAudit'],
    '03':['/elevator_order/iinsuranceInfo/payComfirm'],
}
const routeMap = {
    '00':'InsureInuserAudit',
    '01':'InsureassessLoss',
    '02':'InsuresettleAudit',
    '03':'InsurePayComfirm',
}
const toDetail = (e )=>{
    const permissionList= permissionConfig[e] 
    let mark = true ; 
    permissionList.forEach(x=>{
      const res =  menuAuth.value.includes(x)
      if(!res){
        mark = false 
      }
    })
    const params = { name: routeMap[e], query: { db_insuCompanyId:companyId.value=='all'?'': companyId.value,ui_isByCompany:'03'} } 
    if(mark){
        $router.push( params )
    }
}
</script>
<style lang="scss" scoped>
.border {
    width: 100%;
    height: 100%;

    .temp {
        .content {
            margin-top: 15px;

            ._temp {
                display: flex;
                justify-content: center;
                margin-bottom: 10px;

                .item:last-child {
                    // margin-left: 24%;
                    text-indent: 20%;
                }

                .item {
                    width:50%;
                    text-indent: 40%;

                    .label,
                    .unit {
                        font-size: 14px;
                        color: #fff;
                    }

                    .value {
                        font-size: 28px;
                        color: #009AFC;
                        
                    }
                    .value.bottomline{
                        text-decoration: underline;
                        cursor: pointer;
                    }
                }
            }


        }
    }
}
</style>