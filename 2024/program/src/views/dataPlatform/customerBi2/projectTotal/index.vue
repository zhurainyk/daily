<template>
    <div>
        <div class="projecttotal">
            <div class="left">
                <border class="baseinfo">
                    <module-name moduleName="项目基本信息"></module-name>
                    <div class="form">
                        <div class="tab">
                            <div class="label">项目名称： </div>
                            <div class="value">{{ $data.projectName }}</div>
                        </div>
                        <div class="tab">
                            <div class="label" style="white-space:nowrap;">项目地址： </div>
                            <div class="value">{{ $data.projectAddr }}</div>
                        </div>
                        <div class="tab">
                            <div class="label">项目负责人： </div>
                            <div class="value">{{ $data.chargeUser }} </div>
                        </div>
                    </div>
                </border>
                <border class="workinof">
                    <module-name moduleName="使用单位信息"></module-name>
                    <div class="form">
                        <div class="tab">
                            <div class="label">单位名称： </div>
                            <div class="value">{{ $data.useCompanyInfo.useCompanyName }}</div>
                        </div>
                        <div class="tab">
                            <div class="label">单位地址： </div>
                            <div class="value">{{
                                $data.useCompanyInfo.useCompanyAddr
                            }}</div>
                        </div>
                        <div class="tab top">
                            <div class="label">安全管理员：</div>
                        </div>
                        <div class="tab">
                            <idcard :userInfo="userInfo1" :userKeys="{
                                k0: 'securityPortraitUrl',
                                k1: 'securityName',
                                k2: 'securityPhone',
                                k3: 'securitySkillLevel',
                                k4: 'securityCertificate',
                            }"></idcard>
                        </div>
                    </div>
                </border>
            </div>
            <div class="center">
                <div class="cardlist">
                    <div class="temp">
                        <card>
                            <span>{{ $data.summaryData.iotCount }}</span>
                            <span>物联网设备数</span>
                        </card>
                        <card>
                            <span>{{ $data.summaryData.elevatorCount }}</span>
                            <span>直梯数</span>
                        </card>

                    </div>
                    <div class="temp">

                        <card sanjiaoColor="#29B6FF" borderColor="#009AFC" bg="rgb(20,77,146)">
                            <span>{{ $data.summaryData.onlineIotCount }}</span>
                            <span>在线设备数</span>
                        </card>
                        <card sanjiaoColor="#29B6FF" borderColor="#009AFC" bg="rgb(20,77,146)">
                            <span>{{ $data.summaryData.escalatorCount }}</span>
                            <span>扶梯数</span>
                        </card>
                    </div>
                </div>
                <div class="temp">
                    <border class="elevatorinfo">
                        <module-name moduleName="电梯信息"></module-name>
                        <div class="form">
                            <div class="item">
                                <div class="title">电梯品牌</div>
                                <div class="temp_">
                                    <div class="tab" v-for="(x, index) in $data.summaryData.elevBrandList" :key="index">
                                        <div class="value">
                                            {{ x.brandCount }}
                                        </div>
                                        <div class="label">
                                            {{ x.elevatorBrand }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="title">电梯梯龄</div>
                                <div class="temp_">
                                    <div class="tab" v-for="(x, index) in $data.summaryData.elevAgeList" :key="index">
                                        <div class="value">
                                            {{ x.ageCount }}
                                        </div>
                                        <div class="label">
                                            {{ x.ageName }}
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="item">
                                <div class="title">电梯三证</div>
                                <div class="temp_">
                                    <div class="tab">
                                        <div class="value">
                                            {{ $data.summaryData.acceptanceCount }}
                                        </div>
                                        <div class="label">
                                            电梯验收合格证
                                        </div>
                                    </div>
                                    <div class="tab">
                                        <div class="value">
                                            {{ $data.summaryData.operationCount }}
                                        </div>
                                        <div class="label">
                                            电梯使用运营证
                                        </div>
                                    </div>
                                    <div class="tab">
                                        <div class="value">
                                            {{ $data.summaryData.securityOperationCount }}
                                        </div>
                                        <div class="label">
                                            电梯安全管理员证
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="item">
                                <div class="title">电梯三标识</div>
                                <div class="temp_">
                                    <div class="tab">
                                        <div class="value">
                                            {{ $data.summaryData.useLabelCount }}
                                        </div>
                                        <div class="label">
                                            电梯使用标识
                                        </div>
                                    </div>
                                    <div class="tab">
                                        <div class="value">
                                            {{ $data.summaryData.emergencyPhoneCount }}
                                        </div>
                                        <div class="label">
                                            电梯应急救援标识
                                        </div>
                                    </div>
                                    <div class="tab">
                                        <div class="value">
                                            {{ $data.summaryData.warningLabelCount }}
                                        </div>
                                        <div class="label">
                                            电梯安全警示标识
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="item">
                                <div class="title">年检汇总</div>
                                <div class="temp_">
                                    <div class="tab">
                                        <div class="value">
                                            {{ $data.summaryData.annualInspectCount }}
                                        </div>
                                        <div class="label">
                                            已年检电梯数量
                                        </div>
                                    </div>
                                    <div class="tab">
                                        <div class="value">
                                            {{ $data.summaryData.unAnnualInspectCount }}
                                        </div>
                                        <div class="label">
                                            未年检电梯数量
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </border>
                </div>
                <div class="city"></div>
            </div>
            <div class="right">
                <border class="keepupinfo">
                    <module-name moduleName="维保单位信息"></module-name>
                    <div class="form">
                        <div class="tab">
                            <div class="label">单位名称： </div>
                            <div class="value">{{ $data.maintCompanyInfo.maintCompanyName }}</div>
                        </div>
                        <div class="tab">
                            <div class="label">单位地址： </div>
                            <div class="value">{{ $data.maintCompanyInfo.maintCompanyAddr }}</div>
                        </div>
                        <div class="tab imgs">
                            <div class="label">资质证书： </div>
                            <div class="value">
                                <div class="img" v-for="x in $data.maintCompanyInfo.maintCompanyCertificate || []" :key="x">

                                    <pdfpreview class="pdf" v-if="x" :pdfUrl="x"></pdfpreview>
                                </div>

                            </div>
                        </div>
                        <div class="tab ">
                            <div class="label">维保人员： </div>
                        </div>
                        <div class="tab idcard">
                            <!-- <idcard class="card" :userInfo="x"
                                :userKeys="{ k0: 'maintPersonnelPortraitUrl', k1: 'maintPersonnelName', k2: 'maintPersonnelPhone', k3: 'maintPersonnelSkillLevel', k4: 'maintPersonnelCertificate' }"
                                v-for="(x, i) in $data.maintCompanyInfo.maintPersonnelList">
                            </idcard> -->
                            <template v-if="$data.maintCompanyInfo.maintPersonnelList.length > 2">
                                <idcard class="card" :userInfo="x"
                                    :userKeys="{ k0: 'maintPersonnelPortraitUrl', k1: 'maintPersonnelName', k2: 'maintPersonnelPhone', k3: 'maintPersonnelSkillLevel', k4: 'maintPersonnelCertificate' }"
                                    v-for="(x, i) in $data.maintCompanyInfo.maintPersonnelList">
                                </idcard>

                            </template>
                            <template v-else>
                                <idcard class="card" :userInfo="userInfo_1"
                                    :userKeys="{ k0: 'maintPersonnelPortraitUrl', k1: 'maintPersonnelName', k2: 'maintPersonnelPhone', k3: 'maintPersonnelSkillLevel', k4: 'maintPersonnelCertificate' }">
                                </idcard>
                                <idcard class="card" :userInfo="userInfo_2"
                                    :userKeys="{ k0: 'maintPersonnelPortraitUrl', k1: 'maintPersonnelName', k2: 'maintPersonnelPhone', k3: 'maintPersonnelSkillLevel', k4: 'maintPersonnelCertificate' }">
                                </idcard>
                            </template>
                        </div>
                    </div>
                </border>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, computed, watch } from 'vue'
import idcard from './idcard.vue'
import { getProjectSummary } from '@/api/module/customerBI'
import pdfpreview from './pdfpreview.vue'
const props = defineProps({
    projectId: {},
    token: {}
})
const $data = ref({
    chargeUser: '',
    maintCompanyInfo: {
        maintPersonnelList: []
    },
    projectAddr: '',
    projectName: '',
    summaryData: {
        elevBrandList: []
    },
    useCompanyInfo: {},


})
const userInfo1 = ref({
    securityName: '',
    securityPhone: '',
    securitySkillLevel: '',
    securityCertificate: [],
    securityPortraitUrl: ''
})
const userInfo_1 = computed(() => {
    if ($data.value.maintCompanyInfo?.maintPersonnelList?.length) {
        return $data.value.maintCompanyInfo?.maintPersonnelList[0]
    } else {
        return {}
    }
})
const userInfo_2 = computed(() => {
    if ($data.value.maintCompanyInfo?.maintPersonnelList?.length > 1) {
        return $data.value.maintCompanyInfo?.maintPersonnelList[1]
    } else {
        return {}
    }
})

const currentProjectId = computed(() => props.projectId)

watch(() => props.projectId, projectId => {
    if (projectId) {
        getProjectSummary({ projectId }).then(x => {
            console.log({ '汇总': x })
            $data.value = x.data.data
            userInfo1.value.securityName = x.data.data.useCompanyInfo.securityName
            userInfo1.value.securityPhone = x.data.data.useCompanyInfo.securityPhone
            userInfo1.value.securitySkillLevel = x.data.data.useCompanyInfo.securitySkillLevel
            userInfo1.value.securityCertificate = x.data.data.useCompanyInfo.securityCertificate
            userInfo1.value.securityPortraitUrl = x.data.data.useCompanyInfo.securityPortraitUrl
        })
    }
}, {
    deep: true,
    immediate: true
})
</script>
<style  lang="scss" scoped>
$color: #FEFEFE;

.form {
    margin: 48px 0 0 40px;

    .tab {
        margin-bottom: 29px;
        display: flex;

        div {
            font-size: 16px;
            color: #FEFEFE;
        }
    }

    .tab.top {
        margin-top: 180px;
    }

    .tab.imgs .value {
        display: flex;
        min-height: 81px;

        .img {
            width: 114px;
            height: 81px;
            margin-right: 16px;
            background-color: black;

            img,
            .pdf {
                display: block;
                width: 70px;
                height: 100%;
                margin: 0 auto;
            }

        }
    }

    .tab.idcard {
        display: block;
        height: 610px;
        overflow-y: scroll;

        .card {
            margin: 20px auto;
        }
    }

    .tab.idcard::-webkit-scrollbar {
        display: none;
    }
}

.projecttotal {
    display: flex;
    box-sizing: border-box;
    padding: 0 20px;
    justify-content: space-between;
    color: $color;

    .left {
        width: 521px;

        .baseinfo {
            width: 100%;
            height: 280px;
            margin-bottom: 20px;


        }

        .workinof {
            width: 100%;
            height: 680px
        }
    }

    .center {
        width: calc(100% - 521px - 520px);

        .temp {
            width: 100%;
            box-sizing: border-box;
            padding: 0 20px;

        }

        .elevatorinfo {
            width: auto;
            height: 340px;

            .form {
                margin-left: 0;
                display: flex;
                justify-content: space-evenly;



                .item {
                    width: 20%;
                    display: block;
                    margin-bottom: 10px;
                    border-right: 1px solid rgb(16, 76, 138);
                    height: 100%;


                    .title {
                        text-align: center;
                        color: #fff;
                        font-size: 16px;
                        padding-bottom: 20px;
                    }

                    .temp_ {
                        height: 210px;
                        overflow-y: auto;
                    }

                    .temp_::-webkit-scrollbar-thumb {
                        background-color: rgb(32, 91, 167);
                    }

                    .temp_::-webkit-scrollbar-track {
                        background-color: rgb(32, 44, 94);
                    }

                    .tab {
                        display: block;
                        height: 50px;
                        text-align: center;
                        margin-bottom: 20px;

                        .label {


                            box-sizing: border-box;

                            color: rgba(192, 223, 255, 1);
                            font-size: 14px;


                        }

                        .value {
                            line-height: 30px;
                            box-sizing: border-box;


                            font-size: 28px;
                            color: #009AFC;
                        }
                    }
                }

                .item:last-child {
                    border-right: none;
                }

            }


        }

        .cardlist {
            width: 100%;
            margin-bottom: 500px;

            .temp {
                width: 100%;
                display: flex;
                justify-content: space-between;
            }

            .temp:first-child {
                margin-bottom: 28px;
            }
        }

        .city {
            position: absolute;
            top: 38px;
            bottom: 295px;
            left: 540px;
            right: 540px;
            width: auto;
            height: auto;
            margin-top: 35px;

            background: url('../../../../public/images/dataplatform/customer2/city.png') no-repeat center / cover;
            background-size: 100%;
        }


    }

    .right {
        width: 520px;
        height: 979px;

        .keepupinfo {
            width: 100%;
            height: 100%;
        }
    }
}
</style>