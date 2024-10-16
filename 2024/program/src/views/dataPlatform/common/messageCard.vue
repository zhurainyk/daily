<template>
    <border class="border">
        <div class="temp">
            <module-name :moduleName="'信息总览'"></module-name>
            <div class="content">
                <div class="card-list">
                    <div class="temp_">
                        <card class="card" @click="toDetail('ProCompany')" sanjiaoColor="#23FFFC" :customeStyle="{ width: '96%' }" borderColor="#068583"
                            bg="rgb(18,101,134)">
                            <span class="label">物业单位</span>
                            <span class="value">{{ $data.propCompanyCount || 0 }}</span>
                        </card>
                        <card class="card" @click="toDetail('InsureMaintenanceCompany')" sanjiaoColor="#23FFFC" :customeStyle="{ width: '96%', }" borderColor="#068583"
                            bg="rgb(18,101,134)">
                            <span class="label">维保单位</span>
                            <span class="value">{{ $data.maintConpanyCount || 0 }}</span>
                        </card>
                    </div>
                    <div class="temp_">
                        <card class="card" @click="toDetail('ProjectManagementInsure')" sanjiaoColor="#239AFF" :customeStyle="{ width: '96%' }" borderColor="#009AFC"
                            bg="rgb(11,52,109)">
                            <span class="label">项目数量</span>
                            <span class="value">{{ $data.projectCount || 0 }}</span>
                        </card>
                        <card class="card" @click="toDetail('ElevManageCusotom')" sanjiaoColor="#239AFF" :customeStyle="{ width: '96%', }" borderColor="#009AFC"
                            bg="rgb(11,52,109)">
                            <span class="label">电梯总数</span>
                            <span class="value">{{ $data.elevatorCount || 0 }}</span>
                        </card>
                    </div>
                    <div class="temp_">
                        <card class="card" sanjiaoColor="#FED52F" :customeStyle="{ width: '96%' }" borderColor="#FED52F"
                            bg="rgb(78,86,73)">
                            <span class="label">维保人员</span>
                            <span class="value">{{ $data.maintUserCount || 0 }}</span>
                        </card>
                    </div>
                </div>
                <div class="year-tab-list">
                    <div class="year-tab">
                        <div class="desc">
                            <div class="label">年度维保</div>
                            <div class="unit">(次)</div>
                        </div>
                        <div class="value">{{ $data.regularUpkeepCount || 0 }}</div>
                    </div>
                    <div class="year-tab">
                        <div class="desc">
                            <div class="label">年度回召</div>
                            <div class="unit">(次)</div>
                        </div>
                        <div class="value">{{ $data.callbackCount || 0 }}</div>
                    </div>
                    <div class="year-tab">
                        <div class="desc">
                            <div class="label">年度故障</div>
                            <div class="unit">(次)</div>
                        </div>
                        <div class="value">{{ $data.faultCount || 0 }}</div>
                    </div>
                    <div class="year-tab">
                        <div class="desc">
                            <div class="label">年度困人</div>
                            <div class="unit">(次)</div>
                        </div>
                        <div class="value">{{ $data.trappedCount || 0 }}</div>
                    </div>
                    <div class="year-tab">
                        <div class="desc">
                            <div class="label">年度满意度</div>
                            <div class="unit">(%)</div>
                        </div>
                        <div class="value">{{ $data.satisfactionRatio || 0 }}</div>
                    </div>
                </div>
            </div>
        </div>
    </border>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
const $router = useRouter()
const $store = useStore()
const props = defineProps({
    data: {
        type: Object,
        default: {}
    },
    companyId:{

    }
})

 
const menuAuth = computed(() => $store.state.menu.menuAuth)
const companyId = computed(()=>props.companyId)
const $data = computed(() => props.data)
const permissionConfig = {
    ProCompany:['/elevator/ipropCompany/save'],
    InsureMaintenanceCompany:['/elevator_supplychain/imaintCompany/save'],
    ProjectManagementInsure:['/elevator/iproject/save','/elevator/iproject/selectById'],
    ElevManageCusotom:['/elevator/ielevator/selectById','/elevator/ielevator/save']
}
const toDetail = (e)=>{
    const permissionList= permissionConfig[e] 
    let mark = true ; 
    permissionList.forEach(x=>{
      const res =  menuAuth.value.includes(x)
      if(!res){
        mark = false 
      }
    })
    if(mark){
        $router.push({
        name:e
    })
    }
    
    
}
</script>
<script>
export default {
    name: 'MessageCard'
}
</script>
<style lang="scss" scoped>
.border {
    width: 100%;

    height: 100%;

    .temp {}

    .content {
        .card-list {
            margin-top: 30px;

            .temp_ {
                display: flex;
                justify-content: space-between;
                margin: 12px auto;
                width: 100%;

                .card {
                    width: 40%;
                    padding: 0 5%;
                    cursor: pointer;
                }

            }


        }

        .year-tab-list {
            display: flex;
            justify-content: space-around;
            margin-top: 30px;

            .year-tab {
                padding: 0 5px;

                .desc {
                    display: flex;
                    padding: 8px 0;

                    .label {
                        font-size: 16px;
                        color: #fff;
                        white-space: nowrap;
                    }

                    .unit {
                        font-size: 14px;
                        color: #CCD3D6;
                        line-height: 22px;
                    }
                }

                .value {
                    color: #29B6FF;
                    font-size: 24px;
                    text-align: center;
                }
            }
        }
    }
}
</style>