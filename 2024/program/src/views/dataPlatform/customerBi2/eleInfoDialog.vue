<template>
    <el-dialog v-model="dialogVisible" :show-close="true" class='notice-dialog' draggable :modal="false"
        :close-on-click-modal="false" @close="closeDialog">
        <template #header="{ close, titleId, titleClass }">
            <div class="my-header">
                <moduleName :id="titleId" :class="titleClass" :moduleName="dialogmoduleName"></moduleName>
            </div>
        </template>
        <div class="toastx">
            <div class="floor1">
                <div class="left">
                    <div class="temp">
                        <div class="tab block">
                            <span class="label">状态：</span>
                            <span class="value ellipsis" :title="currentState || '无'">{{ currentState || '无' }}</span>
                        </div>
                        <talk ref="talkdom" :url="talkUrl"></talk>
                        <div class="tab btns">
                            <span class="btn" @click="dialogFn(1)">作业</span>
                            <span class="btn" @click="dialogFn(2)">报修</span>
                            <span class="btn" @click="dialogFn(3)">报警</span>
                        </div>

                    </div>
                    <div class="cam">
                        <hlsplayer v-if="isHls" ref="newplayer" :show="dialogVisible" :url="videoUrl" :isLoading="isLoading"
                            style="width:391px;height:210px; ">
                        </hlsplayer>
                        <flvplayer v-if="isFlv" ref="newplayer" :url="videoUrl" style="width:391px;height:210px; "
                            :isLoading="isLoading">
                        </flvplayer>
                        <wssplayer v-if="!isHls && !isFlv && isWss" ref="newplayer" :url="videoUrl"
                            style="width:391px;height:210px; " :isLoading="isLoading"></wssplayer>
                    </div>

                    <div class="tablename">
                        零部件列表
                    </div>
                    <div class="table">
                        <div class="tab head">
                            <div class="item">名称</div>
                            <div class="item">品牌型号</div>
                            <div class="item">数量 </div>
                            <div class="item">磨损度</div>
                        </div>
                        <div style="height:calc(100% - 50px)">
                            <el-scrollbar height="100%">
                                <div class="tab" v-for="(item, index) in  $data.allList" :key="index">
                                    <div class="item">{{ item.db_id_partInstanceName }}</div>
                                    <div class="item" :title="item.ui_partBrandName + item.db_model"
                                        style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{
                                            item.ui_partBrandName
                                        }}{{ item.db_model }}</div>
                                    <div class="item">{{ item.db_defaultCount }}{{ item.ui_unitName }}</div>
                                    <div class="item">{{ item.ui_lossDegreeDesc }}</div>
                                </div>
                            </el-scrollbar>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="temp">
                        <div class="tab">
                            <div class="label">项目：</div>
                            <div class="value"> {{ ui_projectName }}</div>
                        </div>
                        <div class="tab">
                            <div class="label">电梯编号：</div>
                            <div class="value"> {{ elevatorName }}</div>
                        </div>
                        <div class="tab">
                            <div class="label">电梯温度：</div>
                            <div class="value">{{ temperature }}</div>
                        </div>
                        <div class="tab">
                            <div class="label">电梯湿度：</div>
                            <div class="value">{{ humidity }}</div>
                        </div>
                    </div>
                    <div class="basicinfo">
                        <div class="form">
                            <div class="card">
                                <div class="item">
                                    <span class="label">品牌型号：</span>
                                    <span class="value">{{ ui_brandName }} {{ ui_modelName }}</span>
                                </div>
                                <div class="item">
                                    <span class="label">电梯注册码：</span>
                                    <span class="value">{{ db_registCode }}</span>
                                </div>
                                <div class="item">
                                    <span class="label">救援识别码：</span>
                                    <span class="value">{{ db_rescueCode }}</span>
                                    <span class="qcode" @click="showQcode" title="电梯二维码"><svg t="1678095768033" class="icon"
                                            viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                            p-id="9259" width="28" height="28">
                                            <path
                                                d="M136.533333 537.6h750.933334a25.6 25.6 0 0 0 0-51.2H136.533333a25.6 25.6 0 0 0 0 51.2zM196.266667 341.333333v-68.266666c0-41.642667 34.850133-76.8 76.8-76.8h477.866666c41.949867 0 76.8 35.157333 76.8 76.8v68.266666a25.6 25.6 0 0 0 51.2 0v-68.266666c0-69.8368-57.685333-128-128-128H273.066667c-70.314667 0-128 58.1632-128 128v68.266666a25.6 25.6 0 0 0 51.2 0z m631.466666 341.333334v68.266666c0 43.264-33.8432 76.8-76.8 76.8H273.066667c-42.9568 0-76.8-33.536-76.8-76.8v-68.266666a25.6 25.6 0 0 0-51.2 0v68.266666c0 71.645867 56.8832 128 128 128h477.866666c71.1168 0 128-56.354133 128-128v-68.266666a25.6 25.6 0 0 0-51.2 0z"
                                                fill="#23fffc" p-id="9260"></path>
                                        </svg></span>
                                </div>
                                <div class="item">
                                    <span class="label">年检状态：</span>
                                    <span class="value">{{ yearCheckState }}</span>
                                </div>
                                <div class="item">
                                    <span class="label">下次年检日期：</span>
                                    <span class="value">{{ nextYearCheckDate }}</span>
                                </div>
                            </div>
                            <div class="card">
                                <div class="item">
                                    <span class="label">联系人：</span>
                                    <span class="value"></span>
                                </div>
                                <div class="item">
                                    <span class="label">{{ user1 }} {{ phone1 }}</span>
                                    <span class="value"> </span>
                                </div>
                                <div class="item">
                                    <span class="label">{{ user2 }} {{ phone2 }}</span>
                                    <span class="value"> </span>
                                </div>
                            </div>
                            <div class="card">
                                <div class="item">
                                    <div class="label">
                                        是否有机房：
                                    </div>
                                    <div class="value">{{ db_machineRoom == '00' ? '无机房' : db_machineRoom == '01' ? '有机房'
                                        : '' }}
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="label">
                                        额定载重量：
                                    </div>
                                    <div class="value">{{ db_ratedLoad }}</div>
                                </div>
                                <div class="item">
                                    <div class="label">
                                        传动方式：
                                    </div>
                                    <div class="value">{{ driveWay[db_driveWay] || '' }}</div>
                                </div>
                                <div class="item">
                                    <div class="label">
                                        额定速度：
                                    </div>
                                    <div class="value">{{ db_ratedSpeed }}</div>
                                </div>
                                <div class="item">
                                    <div class="label">
                                        曳引比：
                                    </div>
                                    <div class="value">{{ tractionRatio[db_tractionRatio] || '' }}</div>
                                </div>
                                <div class="item">
                                    <div class="label">
                                        使用性质：
                                    </div>
                                    <div class="value">{{ usePlace[db_usePlaceCode] || '' }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="imgslist">
                            <div class="img-floor">
                                <div class="title">
                                    三证：
                                </div>
                                <div class="list">
                                    <div class="imginfo">
                                        <div class="img">
                                            <pdfpreview class="pdf" v-if="db_acceptanceCertUrl"
                                                :pdfUrl="db_acceptanceCertUrl"></pdfpreview>
                                            <!-- <img v-if="db_acceptanceCertUrl" :src="db_acceptanceCertUrl" alt=""> -->
                                        </div>
                                        <div class="img-title">电梯合格证</div>
                                    </div>
                                    <div class="imginfo">
                                        <div class="img">
                                            <pdfpreview class="pdf" v-if="db_perationCertUrl" :pdfUrl="db_perationCertUrl">
                                            </pdfpreview>
                                            <!-- <img v-if="db_perationCertUrl" :src="db_perationCertUrl" alt=""> -->
                                        </div>
                                        <div class="img-title">电梯使用运营证</div>
                                    </div>
                                    <div class="imginfo">
                                        <div class="img">
                                            <pdfpreview class="pdf" v-if="db_operationCertUrl"
                                                :pdfUrl="db_operationCertUrl"></pdfpreview>
                                            <!-- <img v-if="db_operationCertUrl" :src="db_operationCertUrl" alt=""> -->
                                        </div>
                                        <div class="img-title">电梯安全管理员证</div>
                                    </div>
                                </div>
                            </div>
                            <div class="img-floor">
                                <div class="title">
                                    三标识：
                                </div>
                                <div class="list">
                                    <div class="imginfo">
                                        <div class="img">
                                            <pdfpreview class="pdf" v-if="db_useLabelUrl" :pdfUrl="db_useLabelUrl">
                                            </pdfpreview>
                                            <!-- <img v-if="db_useLabelUrl" :src="db_useLabelUrl" alt=""> -->
                                        </div>
                                        <div class="img-title">电梯使用标识</div>
                                    </div>
                                    <div class="imginfo">
                                        <div class="img">
                                            <pdfpreview class="pdf" v-if="db_emergencyPhoneUrl"
                                                :pdfUrl="db_emergencyPhoneUrl"></pdfpreview>
                                            <!-- <img v-if="db_emergencyPhoneUrl" :src="db_emergencyPhoneUrl" alt=""> -->
                                        </div>
                                        <div class="img-title">电梯应急救援标识</div>
                                    </div>
                                    <div class="imginfo">
                                        <div class="img">
                                            <pdfpreview class="pdf" v-if="db_warningLabelUrl" :pdfUrl="db_warningLabelUrl">
                                            </pdfpreview>
                                            <!-- <img v-if="db_warningLabelUrl" :src="db_warningLabelUrl" alt=""> -->
                                        </div>
                                        <div class="img-title">电梯安全警示标识</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="floor2">
                <div class="left">
                    <div class="tablename flex">
                        <span @click="changeTab(true)" :class="{ active: isTab }">服务记录</span>
                        <span v-if="emergenceyAuth" @click="changeTab(false)" :class="{ active: !isTab }">应急处置</span>
                    </div>
                    <div class="table" v-if="isTab">
                        <el-scrollbar height="100%">
                            <div class="tab" v-for="(item, index) in $data.serviceList" :key="index"
                                @click="editDetailFn(item)">
                                <div class="item type">{{ item.ui_taskType }}</div>
                                <div class="item name">{{ item.db_id_taskName }}</div>
                                <div class="item desc">{{ item.ui_taskStateDesc }}</div>
                                <div class="item time">{{ moment(item.db_preEndtime).format('YYYY-MM-DD HH:mm:ss') }}
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                    <div class="table alarmlist" v-else>
                        <el-scrollbar height="100%">
                            <div class="tab" v-for="(item, index) in alarmList" :key="index" @click="alarmDetail(item)">
                                <div class="item type">{{ item.db_srcDetail }}</div>
                                <div class="item name">{{ item.ui_projectName }} {{ item.db_projectNum }}</div>
                                <div class="item time">{{ item.ui_alarmTime }}</div>
                            </div>
                        </el-scrollbar>
                    </div>

                </div>
                <div class="right">
                    <div class="tablename">
                        故障统计
                    </div>
                    <div class="table">
                        <div class="graph">
                            <pie class="pie" :pieId="'toastpie1_'" :isPercent="false" :data='$data.pie1'>
                            </pie>
                            <div class="pietitle" style="text-align:center">故障原因</div>
                        </div>
                        <div class="graph">
                            <pie class="pie" :pieId="'toastpie2_'" :isPercent="false" :data='$data.pie2'>
                            </pie>
                            <div class="pietitle">回召类型分布 </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="floor3">
                <div class="tablename">运行走势</div>
                <div class="table">
                    <div class="dayline">
                        <monthline :lineId="'daylinegraph1_'" :data="$data.graph1" :interval="5" :xKey="'day'"
                            :tooltip="'日'">
                        </monthline>
                        <div class="graph-title">运行次数</div>
                    </div>
                    <div class="dayline">
                        <monthline :lineId="'daylinegraph2_'" :data="$data.graph2" :interval="5" :xKey="'day'"
                            :tooltip="'日'">
                        </monthline>
                        <div class="graph-title">运行时长</div>
                    </div>
                    <div class="dayline">
                        <monthline :lineId="'daylinegraph3_'" :data="$data.graph3" :interval="5" :xKey="'day'"
                            :tooltip="'日'">
                        </monthline>
                        <div class="graph-title">运行里程</div>
                    </div>
                    <div class="dayline">
                        <monthline :lineId="'daylinegraph4_'" :data="$data.graph4" :interval="5" :xKey="'day'"
                            :tooltip="'日'">
                        </monthline>
                        <div class="graph-title">开关门次数</div>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
    <el-dialog v-model="alarmDetailVisible" width="40%" :append-to-body="appendToBody">
        <template #title>
            <div class="dialog-title">
                应急处置
            </div>
        </template>
        <div class="mbase-info">

            <div class="body">
                <div>
                    <label>项目名称:</label>
                    <span>{{ alarmInfo.ui_projectName }}</span>
                </div>
                <div>
                    <label>电梯编号:</label>
                    <span>{{ alarmInfo.db_projectNum }}</span>
                </div>
                <div>
                    <label>接警来源:</label>
                    <span>{{ alarm_src[alarmInfo.db_alarmSrcCode] }}</span>
                </div>
                <div>
                    <label>接警时间:</label>
                    <span>{{ alarmInfo.ui_alarmTime }}</span>
                </div>
                <div class="emergency-item-image-body">
                    <label>困人图片:</label>
                    <ul class="emergency-item-image" v-if="images.length">
                        <li v-for="(y, index) in images" :key="y">
                            <el-image :src="y" :preview-src-list="images" :initial-index="index" fit="cover" lazy />
                            <!-- <img :src="y" @click="onpenImg(y)" /> -->
                        </li>
                    </ul>
                </div>
                <div class="emergency-item-video">
                    <label>困人视频:</label>
                    <div v-if="videos.length">
                        <template v-for="y in videos">
                            <template v-if="(y || '').indexOf('pending') > -1">
                                <div :key="y" class="pengding">
                                    <label>视频正在拉取中...</label>
                                </div>
                            </template>
                            <template v-else>
                                <video :key="y" :src="y" :autoplay="false" controls></video>
                            </template>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <div class="dialog-footer" v-if="alarmInfo.db_alarmState == '01'">
                <el-button @click="conformAlarm(0)">误报</el-button>
                <el-button type="primary" @click="conformAlarm(1)">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
    <qcode :qrurl="qrcodeUrl" :dialogVisiable="qrcodeShow" @close="closeQrcode">
        {{ ui_projectName }} {{ elevatorName }}
    </qcode>

    <el-dialog v-model="baoxiuDialog" width="40%" :show-close="false" :append-to-body="appendToBody" v-if="baoxiuDialog">
        <template #title>
            <div class="dialog-title">
                新增报修
            </div>
        </template>
        <div class="mbase-info">

            <div class="body">
                <div>
                    <label>项目名称:</label>
                    <span>{{ ui_projectName }}</span>
                </div>
                <div>
                    <label>电梯编号:</label>
                    <span>{{ elevatorName }}</span>
                </div>

                <div>
                    <label>问题描述:</label>
                    <el-input class="input" v-model="db_faultAppearanceId"></el-input>
                </div>
                <div class="emergency-item-image-body">
                    <label>图片:</label>
                    <el-upload v-model:file-list="db_faultAppearanceUrl" class="avatar-uploader imgs"
                        list-type="picture-card" :show-file-list="true" multiple :http-request="(...argument) => beforeAvatarsUpload(...argument, 'customer')
                            " :on-preview="handlePictureCardPreview" :data="scope" :on-remove="handleRemove">
                        <el-icon class="avatar-uploader-icon2">+</el-icon>
                    </el-upload>
                </div>
            </div>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="baoxiuConform(0)">取消</el-button>
                <el-button type="primary" @click="baoxiuConform(1)">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="imgPreview" append-to-body>
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
</template>
<script setup>
import moment from 'moment'
import pdfpreview from './projectTotal/pdfpreview.vue'
import { ref, reactive, onMounted, inject, computed } from 'vue';
import hlsplayer from '../customerBi/hlsplayer.vue'
import flvplayer from '../customerBi/flvplayer.vue'
import wssplayer from '../customerBi/wssplayer.vue'
import pie from '../project/pie.vue'
import monthline from '../project/monthline.vue'
import { getVideoUrl, getElevatorByProjectId, ialarmListselectByCondition, acceptAlarm, refuseAlarm, manualOperation, manualAlarm, baoxiuApi } from '@/api/module/customerBI'
import { selectByIdApi } from '@/api/module/elevator'
import { menulist } from '@/router/menu'
import { useRouter, useRoute } from 'vue-router'
import { getToken } from '@/utils/auth'
import { useStore } from 'vuex'
import configIndex from '../../../../config/index'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import qcode from '@/components/common/PrintElevtorQrcode.vue'
import { getLatestSysCompPartState, getLatestEnvironmentState, getTaskInfoOfOneElevDesc } from '@/api/module/dataPlatform'
import { tempUrlJson } from '@/api/create-api'
import { react } from '@babel/types';
import { ElMessage, ElMessageBox } from 'element-plus'
import { AddEdit } from '@/components/singlelist/components/addEdit.vue'
import { uploadIOFilesApi } from '@/api/module/commont'
const props = defineProps({
    token: {

    },
    emitKey: {
        type: String,
        default: ''
    }

})


const store = useStore()
const $router = useRouter()
const $route = useRoute()

const imgPreview = ref(false)
const dialogImageUrl = ref('')

const isLoading = ref(true)
const isTab = ref(true)
const alarmList = ref([])
const changeTab = (v) => {
    console.log(v)
    isTab.value = v
}
const alarm_src = ref({})
const alarmInfo = ref({})
const alarmDetailVisible = ref(false)
const videos = computed(() => {
    return alarmInfo.value.db_videoUrl?.split(',') || []
})
const images = computed(() => {
    return alarmInfo.value.db_imgUrl?.split(',') || []
})
let alarmDetailCallBack = () => { }
const alarmDetail = (item, isTo = true, cb = () => { }) => {
    appendToBody.value = isTo
    alarmInfo.value = item
    alarmDetailVisible.value = true
    alarmDetailCallBack = cb //接警记录 误报刷新接警记录列表
}
const conformAlarm = (type) => {
    const o = { db_id: alarmInfo.value.db_id }
    const cb = (x) => {
        if (x.data.data.check) {
            ElMessage.success('操作成功')
            alarmDetailVisible.value = false
            getAlarmList(alarmInfo.value.db_elevId)
        } else {
            ElMessage.error(x.data.data.rowMessageList.toString())
        }
    }
    if (type) {
        acceptAlarm(o).then(x => {
            cb(x)
            getServiceList(alarmInfo.value.db_elevId)//确认处置后 更新服务列表
            alarmDetailCallBack()//接警记录 误报刷新接警记录列表
        })
    } else {
        refuseAlarm(o).then(x => {
            cb(x)
            alarmDetailCallBack()//接警记录 误报刷新接警记录列表
        })
    }


}

// 定义报修
const dialogFn = async (index) => {
    let msg = ''
    let res = '提交成功'
    let api = ''
    let params = ''
    switch (index) {
        case 1: {
            msg = '请确认该梯正在作业？(该操作只能工作人员进行，请勿随意点击，如造成严重后果将承担相应责任)'
            api = manualOperation
            params = { elevId: currentEleId.value }
            break;
        }
        case 2: {
            baoxiuDialog.value = true
            return
        }
        case 3: {
            msg = '请确认是否发生紧急情况？(请勿恶意虚假报警，如造成严重后果，将承担相应法律责任)'
            api = manualAlarm
            params = { elevId: currentEleId.value }
            break;
        }

    }
    ElMessageBox.confirm(
        msg,
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {

            api(params).then(x => {
                ElMessage({
                    type: 'success',
                    message: res,
                })
            })

        })
        .catch(() => {

        })
}

const baoxiuDialog = ref(false)
const db_faultAppearanceId = ref('')
const db_faultAppearanceUrl = ref([])
let db_faultAppearanceUrl_temp = []
const beforeAvatarsUpload = (args, filekey) => {
    console.log(args, filekey)
    if (
        args.file.name.indexOf('.jpg') > -1 ||
        args.file.name.indexOf('.png') > -1 ||
        args.file.name.indexOf('.jpeg') > -1
    ) {
        uploadIOFilesApi({
            serverName: store.state.user.type,
            tableName: $route.name,
            urlName: `db_${filekey}Url`,
            multipartFiles: args.file
        }).then(x => {
            if (x.data.success) {
                // db_faultAppearanceUrl.value = x.data.data
                // temp.url = x.data.data
                // temp.name = temp.name.replace(',', '')
                // db_faultAppearanceUrl.value.push({
                //     name: args.file.name.replace(',', ''),
                //     url: x.data.data 
                // })
                // console.log(db_faultAppearanceUrl.value)
                db_faultAppearanceUrl_temp.push({
                    name: args.file.name,
                    uid: args.file.uid,
                    url: x.data.data
                })
            }
        })

        // dialogModel.value[`db_${model.filekey}Name`] = args.file.name

        return true
    }
    return false
}
const handlePictureCardPreview = uploadFile => {
    dialogImageUrl.value = uploadFile.url
    imgPreview.value = true
}
const handleRemove = (files, uploadFiles) => {
    console.log({ files, uploadFiles })
    console.log(JSON.parse(JSON.stringify(db_faultAppearanceUrl_temp)))
    db_faultAppearanceUrl_temp = db_faultAppearanceUrl_temp.filter(x => x.uid != files.raw.uid)
    console.log(JSON.parse(JSON.stringify(db_faultAppearanceUrl_temp)))

}
const baoxiuConform = (index) => {
    if (index) {
        let imgUrls = ''
        if (db_faultAppearanceUrl_temp.length) {
            let db_faultAppearanceUrl_temp2 = JSON.parse(JSON.stringify(db_faultAppearanceUrl_temp))
            imgUrls = db_faultAppearanceUrl_temp2.map(x => {
                return x.url
            }).join(",");
        }
        const params = {
            "db_callRepairType": "",
            "db_callRepairTypeCode": "",
            "db_cllaRepairsUserId": "",
            "db_elevId": currentEleId.value,
            "db_environmentState": "",
            "db_faultAppearanceId": db_faultAppearanceId.value,
            "db_faultAppearanceName": "",
            "db_faultAppearanceUrl": imgUrls,
            "db_faultCode": "",
            "db_faultCodeId": "",
            "db_faultReason": "",
            "db_faultReasonAnalysis": "",
            "db_id": "",
            "db_lastMaintDoorTimes": "",
            "db_lastMaintDuration": "",
            "db_lastMaintRunDuration": "",
            "db_lastMaintRunMileage": "",
            "db_lastMaintRunTimes": "",
            "db_lastRepairDoorTimes": "",
            "db_lastRepairDuration": "",
            "db_lastRepairRunDuration": "",
            "db_lastRepairRunMileage": "",
            "db_lastRepairRunTimes": "",
            "db_partList": "",
            "db_registCode": "",
            "db_solution": "",
            "db_stopDuration": "",
            "db_sysCompPartState": "",
            "db_taskId": "",
            "db_timeoutRule": "",
            "taskInfo": {
                "db_projectId": currentProjectId.value
            }
        }
        baoxiuApi(params).then(x => {
            console.log(x)
            if (x.data.data.check) {
                ElMessage({
                    type: 'success',
                    message: '提交成功',
                })
                baoxiuDialog.value = false
                db_faultAppearanceId.value = ''
                db_faultAppearanceUrl.value = []
                db_faultAppearanceUrl_temp = []
            } else {
                ElMessage({
                    type: 'error',
                    message: x.data.data.rowMessageList.toString(),
                })
            }

        })
    } else {
        baoxiuDialog.value = false
        db_faultAppearanceId.value = ''
        db_faultAppearanceUrl.value = []
        db_faultAppearanceUrl_temp = []
    }

}
// 定义弹窗
const showTalk = computed(() => store.state.menu.menuAuth.findIndex(
    (x) => x.indexOf(`/elevator/ielevator/voice`) > -1
) > -1)
const newplayer = ref()
let dialogVisible = ref(false)
const dialogmoduleName = ref('电梯基本信息')
let currentState = ref('')
let currentEleId = ref('') //电梯id
let videoUrl = ref('')
let ui_brandName = ref('')
let ui_modelName = ref('')
let ui_projectName = ref('')
let db_rescueCode = ref('')
let yearCheckState = ref('未年检')
let nextYearCheckDate = ref('')
let db_registCode = ref('')
let user1 = ref('')
let phone1 = ref('')
let user2 = ref('')
let phone2 = ref('')
let user3 = ref('')
let phone3 = ref('')
let user4 = ref('')
let phone4 = ref('')
let db_machineRoom = ref('')
let db_ratedLoad = ref('')
let db_driveWay = ref('')
let db_usePlaceCode = ref('')
let db_ratedSpeed = ref('')
let db_tractionRatio = ref('')
let db_acceptanceCertUrl = ref('')
let db_perationCertUrl = ref('')
let db_operationCertUrl = ref('')
let db_useLabelUrl = ref('')
let db_emergencyPhoneUrl = ref('')
let db_warningLabelUrl = ref('')
const currentProjectId = ref('')
const tractionRatio = reactive({ '01': "1:1", '02': "2:1", '03': "3:1", '04': "4:1" })
const driveWay = reactive({ '01': '同步', '02': '异步' })
const usePlace = ref({})
let $data = reactive({
    allList: [],
    serviceList: [],
    pie1: [],
    pie2: [],
    graph1: [],
    graph2: [],
    graph3: [],
    graph4: [],
    thirtyAvgRunningTimes: "",
    fiveFaultsRunningTimes: '',
    faultDistribution: []
})
let elevatorName = ref('')
let temperature = ref('')
let humidity = ref('')
let appendToBody = ref(true)

const isHls = ref(false)
const isFlv = ref(false)

const qrcodeUrl = ref('')
const qrcodeShow = ref(false)
const showQcode = () => {
    console.log('ddd')
    qrcodeShow.value = true
}
const closeQrcode = () => {
    qrcodeShow.value = false
}
const showToast = (e) => {
    console.log({ e })
    appendToBody.value = true
    // qrcodeUrl.value = `/pages/index/index?x={db_id:${e.elevatorId},projectName:${e.elevatorName}}`
    // qrcodeUrl.value = `/pages_login/elevatorFiles/fileDetail`"1598209343138959360" ////bind_id=test123456
    console.log('二维码id:', e.elevatorId, tempUrlJson)
    currentEleId.value = e.elevatorId
    alarmInfo.value = e
    qrcodeUrl.value = `${tempUrlJson}/static/wechat?db_id=${e.elevatorId}`// ${e.elevatorId}  "1598209343138959360" https://ecp.tlzn-cq.com:8131/static/wechat/1524688836977202167&福城北苑B区
    currentState.value = e.state_desc
    elevatorName.value = e.elevatorName
    temperature.value = e.temperature
    humidity.value = e.humidity
    if (e.value && e.value != '0') {

    } else {

    }
    dialogVisible.value = true

    setTimeout(() => {
        window?.$swiper?.autoplay?.pause()
    }, 200)

    getLatestSysCompPartState({ db_elevId: e.elevatorId, token: props.token || getToken(configIndex.build.token) }).then(res => {
        if (res.data.data) {
            const result = JSON.parse(res.data.data)
            let sys = {}
            if (result && result.db_sysCompPartState) {
                sys = JSON.parse(result.db_sysCompPartState)
            }

            console.log(sys)
            if (sys.data) {
                $data.allList = []
                sys.data.forEach(item => {
                    $data.allList.push(...item.list)
                })
            }
        }
    })
    getLatestEnvironmentState({ db_elevId: e.elevatorId, token: props.token || getToken(configIndex.build.token) }).then(res => {
    })
    getServiceList(e.elevatorId)

    getUrl(e.elevatorId)
    isFlv.value = false;
    isHls.value = false;
    isLoading.value = true
    selectByIdApi({ id: e.elevatorId }).then(res => {
        if (res.data.data) {
            currentProjectId.value = res.data.data.db_projectId
            getElevatorByProjectId({ projectid: res.data.data.db_projectId }).then(x => {
                if (x?.data?.data?.data) {
                    const list = x.data.data.data
                    if (list?.length) {
                        // e.elevatorId elevatorId
                        const temp = list.find(x => x.elevatorId == e.elevatorId)
                        if (temp) {
                            currentState.value = temp.state_desc
                            temperature.value = temp.temperature
                            humidity.value = temp.humidity
                        }
                    }
                }
            })
            ui_projectName.value = res.data.data.ui_projectName
            elevatorName.value = res.data.data.db_id_projectNum
            ui_modelName.value = res.data.data.db_modelElseName
            ui_brandName.value = res.data.data.db_brandElseName
            db_rescueCode.value = res.data.data.db_rescueCode

            const currentTime = new Date().getTime()
            const day335 = 1000 * 3600 * 24 * 335
            const day365 = 1000 * 3600 * 24 * 365
            const db_latestInspectDate = res.data.data.db_latestInspectDate

            if (db_latestInspectDate) {
                nextYearCheckDate.value = moment(Number(db_latestInspectDate) + day365).format('YYYY-MM-DD')
            } else {
                nextYearCheckDate.value = '--'
            }
            const db_inspectState = res.data.data.db_inspectState
            yearCheckState.value = db_inspectState == '00' ? '未年检' : db_inspectState == '01' ? '已年检' : '--'



            db_registCode.value = res.data.data.db_registCode
            user1.value = res.data.data.ui_sceneUserName1
            user2.value = res.data.data.ui_sceneUserName2
            user3.value = res.data.data.ui_sceneUserName3
            user4.value = res.data.data.ui_sceneUserName4
            phone1.value = res.data.data.ui_sceneUser1Phone
            phone2.value = res.data.data.ui_sceneUser2Phone
            phone3.value = res.data.data.ui_sceneUser3Phone
            phone4.value = res.data.data.ui_sceneUser4Phone

            db_machineRoom.value = res.data.data.db_machineRoom
            db_ratedLoad.value = res.data.data.db_ratedLoad
            db_driveWay.value = res.data.data.db_driveWay
            db_usePlaceCode.value = res.data.data.db_usePlaceCode
            db_ratedSpeed.value = res.data.data.db_ratedSpeed
            db_tractionRatio.value = res.data.data.db_tractionRatio

            db_acceptanceCertUrl.value = res.data.data.db_acceptanceCertUrl
            db_perationCertUrl.value = res.data.data.db_perationCertUrl
            db_operationCertUrl.value = res.data.data.db_operationCertUrl
            db_useLabelUrl.value = res.data.data.db_useLabelUrl
            db_emergencyPhoneUrl.value = res.data.data.db_emergencyPhoneUrl
            db_warningLabelUrl.value = res.data.data.db_warningLabelUrl

            const _data = JSON.parse(res.data.data.db_statisticInfo)
            const { faultDistribution, fiveFaultsRunningTimes, thirtyAvgRunningTimes, faultReasonAnalysis, runningTimes, runningDuration, runningMileage, openDoors } = _data
            // console.log(faultReasonAnalysis, '故障原因分析')
            // console.log(faultReason, '导致故障原因')

            // console.log(runningMileage, '运行里程走势')
            // console.log(openDoors, '开门次数走势')
            // console.log(faultDistribution, '回招分布')
            console.log({ runningTimes, pie1: faultReasonAnalysis.data })
            $data.pie1 = faultReasonAnalysis.data
            $data.pie2 = faultDistribution.data
            $data.graph1 = runningTimes
            $data.fiveFaultsRunningTimes = fiveFaultsRunningTimes
            $data.thirtyAvgRunningTimes = thirtyAvgRunningTimes
            $data.graph2 = runningDuration
            $data.graph3 = runningMileage
            $data.graph4 = openDoors

        }
    })
    const elevatorId = e.elevatorId

    getAlarmList(elevatorId)

}
const getServiceList = (e) => {
    getTaskInfoOfOneElevDesc({ db_elevId: e, token: props.token || getToken(configIndex.build.token) }).then(res => {
        if (res.data.data) {
            $data.serviceList = res.data.data.objectList || [];
        }
    })
}
let getAlarmList = (elevatorId) => {
    if (!emergenceyAuth.value) return
    ialarmListselectByCondition({
        db_elevId: elevatorId,
        ui_currentPage: 1,
        ui_pageSize: 10,
        ui_type: "A0",
        db_alarmState: "01",
        db_projectId: ''
    }).then(x => {
        console.log(x)
        if (x.data?.data?.objectList?.length) {
            alarmList.value = x.data.data.objectList
        } else {
            alarmList.value = []
        }
    })
}
const emergenceyAuth = computed(
    () =>
        store.state.menu.menuAuth.findIndex(
            (x) => x.indexOf(`/elevator_order/ialarm/acceptAlarm`) > -1
        ) > -1
)

const talkUrl = ref('')
const talkdom = ref()
const getUrl = (elevatorId) => {
    let v = '未安装摄像头'
    getVideoUrl({ elevatorId, token: props.token || getToken(configIndex.build.token) }).then(x => {
        // isHls.value = true
        // isFlv.value = false
        // isLoading.value = false
        // videoUrl.value = 'http://172.16.181.113:6080/rtp/34020000001110000001_34020000001340000001/hls.m3u8'
        const data = x.data.data
        if (!data) {
            isHls.value = true
            isFlv.value = false
            talkUrl.value = ''
        } else if (data && typeof data === 'string') {
            isHls.value = true
            isFlv.value = false
            v = data
            talkUrl.value = ''
        } else if (data && typeof data === 'object') {
            if (data.intercom) {
                talkUrl.value = data.intercom
            }
            if (data.videpType === 'ali') {
                isHls.value = true
                isFlv.value = false
                v = data.hls
            } else if (data.videpType === 'hx') {
                if (isWss.value) {
                    isHls.value = false
                    isFlv.value = false
                    v = data.ws //支持ws协议播放
                } else {
                    isHls.value = false
                    isFlv.value = true
                    v = data.http_flv
                }

            }
            if (v.startsWith('https')) {

            } else if (v.startsWith('http')) {
                v = v.replace('http', 'https')
            }

        }
        isLoading.value = false
        videoUrl.value = v
        console.log('当前播放器:', isHls.value, isFlv.value, isWss.value)
        console.log('当前语音通话地址：', talkUrl.value)
    })

}

const editDetailFn = args => {
    console.log({ args }, menulist.OrderDetail)
    let url = $router.resolve({
        name: menulist.taskDetail.name,
        params: {
            id: args.db_id
        }
    }).href
    window.open(url, '_blank')
}
const $bus = inject('$bus')
const closeDialog = () => {
    db_acceptanceCertUrl.value = ''
    db_perationCertUrl.value = ''
    db_operationCertUrl.value = ''
    db_useLabelUrl.value = ''
    db_emergencyPhoneUrl.value = ''
    db_warningLabelUrl.value = ''
    console.log('点击关闭', newplayer)
    qrcodeShow.value = false
    newplayer.value?.destroy()
    isHls.value = true //关闭isWss 
    talkdom.value?.stopTalk()
    isTab.value = true
    $bus.emit('toastState' + props.emitKey, false)
}
let isWss = ref(false)
onMounted(() => {
    selectByAllTypeApi({ constType: 'used_place' }).then(x => {
        usePlace.value = x.data.data
    })
    isWss.value = getVersion()
    console.log('浏览器版本：', isWss.value)
    if (isWss.value) {
        create()
    }
    selectByAllTypeApi({
        constType: 'alarm_src'
    }).then(res => {
        console.log(res)
        alarm_src.value = res.data.data
    });
})
const create = () => {
    if (!window.CVH5Lib) {
        let script1 = document.createElement('script')
        script1.type = 'text/javascript'
        script1.src = '/elevator/h5player.js'
        document.getElementsByTagName('head')[0].appendChild(script1)

        let script2 = document.createElement('script')
        script2.type = 'text/javascript'
        script2.src = '/elevator/canvas_alpha.js'
        document.getElementsByTagName('head')[0].appendChild(script2)
    }
}
const getVersion = () => {
    const s1 = navigator.userAgent
    const key1 = 'Chrome'
    const index1 = s1.indexOf(key1)
    if (index1 > -1) {
        let value = false
        try {
            const s2 = s1.slice(index1)
            const key2 = '.'
            const index2 = s2.indexOf(key2)
            if (index2 > -1) {
                const s3 = s2.slice(0, index2)
                const s4 = s3.split('/')
                const version = s4[1]
                console.log(version)
                if (version > 100) {
                    value = false
                } else if (version <= 100) {
                    value = true
                } else {
                    value = false
                }
            }
        } catch (e) {
            value = false
            console.log('版本获取报错：', e)
        } finally {
            return value
        }
    } else {
        return false
    }
}
defineExpose({
    showToast,
    dialogVisible,
    alarmDetail
})
</script>
<style lang="scss">
$bg: rgb(28, 40, 59);
$fcolor: #C0DFFF;


.dialog-footer {
    align-items: center;
    display: flex;
    justify-content: center;
    width: 100%;
}

.notice-dialog {
    background-color: #000;
    width: clamp(1000px, 82%, 1330px);

    .modulename {
        margin-left: 50%;
    }

    .my-header {
        padding: 1px;
    }

    .toastx::-webkit-scrollbar-thumb {

        background-color: rgb(32, 91, 167);

    }

    .toastx::-webkit-scrollbar-track {
        background-color: #000;

    }

    .toastx::-webkit-scrollbar {}

    .toastx {
        margin-right: 10px;
        height: 750px;
        width: calc(100% - 10px);
        margin-top: 12px;
        box-sizing: border-box;
        padding: 8px 25px 20px 25px;
        overflow-y: scroll;

        .floor1 {
            display: flex;
            justify-content: space-between;
            font-size: 14px;

            .tab .label {
                color: #fff;
                white-space: nowrap;
            }

            .tab .value {
                color: #23FFFC;
                white-space: nowrap;

            }

            .left {
                width: 391px;



                .temp {
                    padding-bottom: 12px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .tab.block {
                        display: flex;
                    }

                    .tab .value.ellipsis {
                        display: inline-block;
                        text-overflow: ellipsis;
                        max-width: 120px;
                        overflow: hidden;
                        white-space: nowrap;
                    }

                    .tab.btns {
                        display: flex;

                        .btn {
                            padding: 0 6px;
                            color: #23FFFC;
                            cursor: pointer;
                            font-size: 14px;
                            height: 16px;
                            position: relative;
                        }

                        .btn::after {
                            position: absolute;
                            content: '';
                            width: 1px;
                            height: 100%;
                            background-color: #fff;
                            top: 1px;
                            right: 0;
                        }

                        .btn:last-child::after {
                            background-color: transparent;
                        }

                    }
                }


                .cam {
                    position: relative;
                    width: 391px;
                    height: 210px;
                    background-color: $bg;
                }

                .tablename {
                    color: #fff;
                    line-height: 39px;
                }

                .table {
                    width: 100%;
                    height: 166px;
                    background-color: $bg;

                    .tab {
                        display: flex;

                        .item {
                            justify-content: space-around;
                            text-align: center;
                            line-height: 40px;
                            color: $fcolor;
                            font-size: 12px;
                            width: 33.3%;
                        }
                    }

                    .tab.head .item {
                        color: $fcolor;
                    }
                }

            }

            .right {
                width: 842px;

                .temp {
                    display: flex;
                    justify-content: space-between;
                    padding-bottom: 12px;

                    .tab {
                        display: flex;
                    }

                    .tab:nth-child(1) {
                        // margin-right: 400px
                    }

                }

                .basicinfo {
                    width: 842px;
                    min-height: 414px;
                    background-color: $bg;
                    display: flex;

                    .form {
                        width: 350px;
                        box-sizing: border-box;
                        padding-left: 31px;
                        color: $fcolor;
                        font-size: 14px;

                        .card {
                            .item {
                                display: flex;
                                flex-wrap: nowrap;
                                white-space: nowrap;
                                align-items: center;

                                .qcode {
                                    margin-left: 20px;
                                    cursor: pointer;
                                }


                            }
                        }

                        // .card:nth-child(1) .item {
                        //     margin: 13px 0;
                        // }

                        // .card:nth-child(2) .item {
                        //     margin: 13px 0;
                        // }

                        // .card:nth-child(2) {
                        //     margin: 20px 0;
                        // }

                        // .card:nth-child(3) .item {
                        //     margin: 10px 0;
                        // }
                        .card:nth-child(1) .item {
                            margin: 6px 0;
                        }

                        .card:nth-child(1) .item:nth-child(3) {
                            margin: -6px 0;
                        }

                        .card:nth-child(2) .item {
                            margin: 6px 0;
                        }

                        .card:nth-child(1) {
                            margin-top: 14px;
                        }

                        .card:nth-child(2) {
                            margin: 20px 0;
                        }

                        .card:nth-child(3) .item {
                            margin: 6px 0;
                        }

                    }

                    .imgslist {
                        flex-grow: 1;
                        box-sizing: border-box;
                        padding-right: 32px;


                        .img-floor {
                            margin-bottom: 30px;

                            .title {
                                color: $fcolor;
                                // padding: 27px 0 21px 0;
                                line-height: 30px;
                                padding-top: 8px;
                            }

                            .list {
                                display: flex;
                                justify-content: space-between;

                                .imginfo {
                                    width: 132px;

                                    .img {
                                        width: 100%;
                                        height: 94px;
                                        background-color: rgb(6, 18, 22);
                                        overflow: hidden;
                                        // img {
                                        //     width: 80px;
                                        //     margin: 0 auto;
                                        //     height: 100%;
                                        //     display: block;
                                        // }

                                        .pdf {
                                            width: 80%;
                                            margin: 0 auto;
                                            height: 100%;

                                            display: block;
                                        }
                                    }

                                    .img-title {
                                        text-align: center;
                                        padding-top: 16px;
                                        color: $fcolor;
                                    }
                                }

                            }

                        }
                    }
                }
            }
        }

        .floor2 {
            display: flex;
            justify-content: space-between;
            z-index: 999;

            .tablename {
                color: #fff;
                font-size: 14px;
                padding: 13px 0 15px 0;
            }

            .tablename.flex {
                display: flex;
                box-sizing: border-box;

                span {
                    margin-right: 20px;
                    padding-bottom: 2px;
                    cursor: pointer;
                }

                span.active {
                    border-bottom: 1px solid #23FFFC;

                }
            }

            .left .table {
                width: 610px;
                height: 221px;
                background-color: $bg;
                box-sizing: border-box;
                margin-top: -2px;

                .tab:hover {
                    background: #29b8ff6b;
                }

                .tab {
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    width: 100%;
                    margin: 16px 0;
                    cursor: pointer;
                    color: $fcolor;
                    font-size: 16px;

                    .item.type {
                        margin-left: 5px;
                        width: 90px;
                        height: 24px;
                        line-height: 24px;
                        text-align: center;
                        border: 1px solid #23FFFC;
                        color: #23FFFC;
                    }

                    .item.name {
                        width: 35%;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        text-indent: 10px;
                    }

                    .item.desc {
                        width: 100px;
                        text-align: center;
                    }

                    .item.time {
                        width: 160px;
                        text-align: center;
                        white-space: nowrap;

                    }

                }
            }

            .left .table.alarmlist {
                .tab:hover {
                    // background: transparent;
                }
            }

            .right .table {
                width: 626px;
                height: 221px;
                background-color: $bg;
                display: flex;

                .graph {
                    width: 50%;
                    height: 100%;

                    .pie {
                        width: 80%;
                        height: 90%;
                        margin: 0 auto;
                    }

                    .pietitle {
                        text-align: center;
                        color: $fcolor;
                    }
                }
            }
        }

        .floor3 {
            .tablename {
                color: #fff;
                font-size: 14px;
                padding: 17px 0 15px 0;
            }

            .table {
                width: 1250px;
                height: 221px;
                background-color: $bg;
                margin: 0 auto;
                display: flex;
                justify-content: space-evenly;

                .dayline {
                    width: 23%;
                    height: 90%;

                    div {
                        text-align: center;
                        color: $fcolor;
                    }
                }
            }
        }
    }
}

.dialog-title {
    font-size: 18px;
    text-align: center;
    padding-top: 20px;
}

.mbase-info {
    margin: 0 30px;
    background-color: white;
    max-height: 650px;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }

    .head {
        margin-bottom: 20px;
        padding-top: 10px;
    }

    .body {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        margin-left: 30px;

        >div {
            width: 540px;
            margin-left: 30px;
            margin-top: 18px;
            display: flex;
            align-items: flex-start;

            >label {
                font-weight: bold;
                white-space: nowrap;
                margin-right: 20px;
                width: 100px;
                text-align: right;
                line-height: 40px;
            }

            >span {
                width: 400px;
                background: #f1f1f1;
                border-radius: 10px;
                height: 40px;
                display: flex;
                padding-left: 10px;
                align-items: center;
            }

            .input {
                width: 410px;
                height: 40px;
                display: flex;

            }

            .avatar-uploader-icon {
                font-size: 30px;
                border: 1px dashed #8c939d;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                width: 178px;
                height: 178px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            // :deep() .el-upload-list__item-actions .el-upload-list__item-preview {
            //   display: none;
            // }

            img {
                width: 178px;
                height: 178px;
            }

            .avatar-uploader.imgs {
                .avatar-uploader-icon {
                    width: 60px;
                    height: 80px;
                }

                // img {
                //     width: 60px;
                //     height: 80px;
                // }

                :deep() .el-upload-list--picture-card .el-upload-list__item {
                    width: 60px;
                    height: 80px;
                }

                :deep() .el-upload-list--picture-card .el-upload--picture-card {
                    width: 60px;
                    height: 80px;
                }

                :deep().el-upload-list__item.is-success {
                    width: 60px;
                    height: 80px;
                }
            }

            .file-img {
                width: 320px !important;
            }

            &.emergency-item-image-body {
                width: 100%;
            }

            .emergency-item-image {
                display: flex;
                flex: 1;
                flex-wrap: wrap;

                >li {
                    list-style: none;
                    margin-left: 5px;
                    width: 150px;
                    height: 150px;
                    overflow: hidden;
                    border-radius: 10px;
                    margin-bottom: 10px;

                    &::after {
                        content: ' ' attr(attr-num) '';
                        display: flex;
                        width: 100%;
                        text-align: center;
                        justify-content: center;
                    }

                    .el-image {
                        width: 100%;
                        height: 100%;
                    }
                }
            }

            &.emergency-item-video {
                width: 100%;

                >div {
                    width: calc(100% - 200px);
                    display: flex;
                    flex-wrap: wrap;

                    >div {
                        margin-left: 10px;
                        margin-bottom: 10px;
                    }
                }

                .pengding {
                    width: 250px;
                    height: 150px;
                    background-color: #606266;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    >label {
                        color: white;
                        text-align: center;
                    }
                }
            }

            img {
                height: 250px;
                cursor: pointer;
            }

            video {
                width: 250px;
                height: 150px;
                margin-right: 10px;
            }
        }
    }
}
</style>