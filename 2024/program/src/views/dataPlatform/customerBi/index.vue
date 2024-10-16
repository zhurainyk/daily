<template>
    <div id="customer-bi">
        <div class="trans-common">
            <div class="header">
                <div class="title">
                    {{ getCompanyName }}
                </div>
                <div class="select-border">
                    <el-select filterable v-model="currentProjectId" class="m-2 selectcontent" placeholder="请选择项目"
                        size="small" style="
                  background: transparent;
                  line-height: 40px;
                  color: #fff;
                  font-size: 16px;
                " @change="changeProject">
                        <el-option v-for="(item, index) in options" :key="index" :label="item.name" :value="item.id" />
                    </el-select>
                </div>
            </div>
            <div class="main">
                <div class="left">
                    <div class="BIlist">
                        <mainstate :data="elevatorData.mainList" :total="elevatorData.total"
                            :orderType='elevatorData.orderType' :token="elevatorData.token"></mainstate>
                    </div>
                    <div class="bottom">
                        <div class="plan">
                            <workplan :data="elevatorData.workplan"></workplan>
                        </div>
                        <div class="realtimeInfo">
                            <realtime :data="elevatorData.realTime"></realtime>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <!-- <elevator :data="elevatorData.rightData"></elevator> -->
                    <databoard :data="elevatorData.rightData" @change="changeDataboard"></databoard>
                </div>
            </div>
        </div>
        <audio :src="require('../../../public/music/bibi.mp3')" muted ref="audio" id="audio" preload="auto" controls hidden
            loop></audio>
        <el-tooltip placement="bottom">
            <template #content>
                <div style="color: #1ac9ff" v-if="isKunren">电梯困人：{{ tipMsg }}</div>
                <div style="color: #1ac9ff" v-else>
                    警报声：{{ dialogVisible ? '开' : '关' }}
                </div>
            </template>
            <div class="baojing" @click="handleClose">
                <svg v-show="!dialogVisible" t="1656066830393" class="icon" :class="{ kunrening: isKunren ? true : false }"
                    viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4470" width="28"
                    height="28">
                    <path
                        d="M837.818182 954.181818H186.181818V488.727273c0-179.2 146.618182-325.818182 325.818182-325.818182s325.818182 146.618182 325.818182 325.818182v465.454545z m-605.090909-46.545454h558.545454V488.727273c0-153.6-125.672727-279.272727-279.272727-279.272728s-279.272727 125.672727-279.272727 279.272728v418.909091z"
                        :fill="isKunren ? '#FF6882' : '#999999'" p-id="4471"></path>
                    <path
                        d="M81.454545 907.636364h837.818182v46.545454h-837.818182zM521.309091 798.254545l-39.563636-20.945454 86.10909-172.218182h-186.181818l121.018182-239.709091 39.563636 20.945455-86.10909 172.218182h186.181818zM477.090909 0h46.545455v116.363636h-46.545455zM28.392727 378.414545l13.032728-44.683636 111.70909 32.581818-13.032727 44.683637zM849.92 366.289455l111.709091-32.628364 13.032727 44.683636-111.709091 32.628364zM716.846545 184.273455l73.774546-89.972364L826.647273 123.810909l-73.774546 89.972364zM174.126545 123.880727L210.571636 94.952727l72.401455 91.112728-36.445091 28.951272z"
                        :fill="isKunren ? '#FF6882' : '#999999'" p-id="4472"></path>
                </svg>

                <svg v-show="dialogVisible" t="1656066830393" class="icon" :class="{ kunrening: isKunren ? true : false }"
                    viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4470" width="28"
                    height="28">
                    <path
                        d="M837.818182 954.181818H186.181818V488.727273c0-179.2 146.618182-325.818182 325.818182-325.818182s325.818182 146.618182 325.818182 325.818182v465.454545z m-605.090909-46.545454h558.545454V488.727273c0-153.6-125.672727-279.272727-279.272727-279.272728s-279.272727 125.672727-279.272727 279.272728v418.909091z"
                        :fill="isKunren ? '#FF6882' : '#1AC9FF'" p-id="4471"></path>
                    <path
                        d="M81.454545 907.636364h837.818182v46.545454h-837.818182zM521.309091 798.254545l-39.563636-20.945454 86.10909-172.218182h-186.181818l121.018182-239.709091 39.563636 20.945455-86.10909 172.218182h186.181818zM477.090909 0h46.545455v116.363636h-46.545455zM28.392727 378.414545l13.032728-44.683636 111.70909 32.581818-13.032727 44.683637zM849.92 366.289455l111.709091-32.628364 13.032727 44.683636-111.709091 32.628364zM716.846545 184.273455l73.774546-89.972364L826.647273 123.810909l-73.774546 89.972364zM174.126545 123.880727L210.571636 94.952727l72.401455 91.112728-36.445091 28.951272z"
                        :fill="isKunren ? '#FF6882' : '#1AC9FF'" p-id="4472"></path>
                </svg>
            </div>
        </el-tooltip>
    </div>
</template>
<script   setup  name='customerBi'>
import { ref, computed, watch, onMounted, reactive, inject } from 'vue'
import { useStore, mapState } from 'vuex'
import { useRoute } from 'vue-router'
import mainstate from './mainState.vue'
import realtime from './realtime.vue'
import workplan from './workplan.vue'
import elevator from './elevator.vue'
import databoard from './databoard.vue'
import { getProjectList, getElevatorByProjectId, getStatisticsOfInsuBI, getWorkScheduleOfInsuBI, getLatestMessage } from '@/api/module/customerBI'
import { getDataApi } from '@/api/module/dataPlatform'
import { getToken, setToken } from '@/utils/auth'
import configIndex from '../../../../config/index'
// import baseUrl from '@/api/apiConfig.tsx'
import { socketUrl as baseUrl } from '@/api/create-api'
import { ElMessage } from 'element-plus'





const getCompanyName = computed(() => {
    const s = store.state.user.userInfo.ui_extra
    return s ? JSON.parse(s)?.system_name : '梯控物联全国电梯大数据中心'
})

// console.log('地址：', baseUrl)
const audio = ref(null)
const elevatorData = reactive({
    orderType: '00'
})
const currentProjectId = ref('')
let ws = null
let loading = null;
const options = reactive([])
const dialogVisible = ref(false)
function setScale(scale = '1,0.81', isFull = false) {
    const selectorAll = document.querySelectorAll('.trans-common')
    for (let i = 0; i < selectorAll.length; i++) {
        selectorAll[i].style = `transform: scale(${scale}) ;transform-origin: top left `
    }
}
let isKunren = ref(false)
let tipMsg = ref('')
const store = useStore()
const isFullscreen = computed(() => store.state.menu.fullsreen)

const heartData = {
    elevator: {
        socketType: '01',
        keyline: ''
    },
    workplan: {
        socketType: '02',
        keyline: ''
    },
    isKunren: {
        socketType: '04',
        keyline: ''
    }
}
function changeId(id) {
    heartData.elevator.keyline = id
    heartData.workplan.keyline = id
    heartData.isKunren.keyline = id
    // console.log('切换项目：', id)
}

const getElevatorListAPI = (e, noloading = null) => {
    getElevatorByProjectId({ projectid: e, token, noloading }).then(res => {
        // console.log(res)

        if (res?.data?.data?.data) {
            elevatorData.mainList = res.data.data.data
            elevatorData.total = res.data.data.total
            elevatorData.orderType = res.data.data.orderType
        }
    })
}

const changeProject = (e) => {


    $bus.emit('resetState')

    // 断开websocket 重连
    if (clearInterRT) {
        clearTimeout(clearInterRT)
    }
    if (clearInter) {
        clearTimeout(clearInter)
    }
    getWorkPlan(e)
    getElevatorListAPI(e)
    currentProjectId.value = e
    loading = $loading('#customer-bi')
    ws.close()
    isConnected = false
    changeId(e)
    getStatisticAPI(e)
    setTimeout(() => {
        // console.log('切换项目重连')
        websorcketCn()//重新获取电梯列表
    }, 1200)

}
let tm = null
let debounce = null
const websorcketCn = (immediate = false) => {
    // console.log('能否触发debounce')
    if (debounce) {
        clearTimeout(debounce)
    }
    debounce = setTimeout(() => {
        // console.log('触发debounce')
        if (ws?.close) {
            ws.close()
        }
        if (wsRT?.close) {
            wsRT.close()
        }
        ws = null
        isConnected = false
        wsRT = null
        isConnectedRT = false;
        clearTimeout(cancleTimer)
        clearTimeout(cancleTimerRT)
        useWebSocket(
            `${baseUrl}/elevator/websocket/bi?token=${token}`, // url
            null, // onopen回调
            (e) => { // onmessage回调
                if (clearInter) {
                    clearTimeout(clearInter)
                    clearInter = null;
                }
                const res = JSON.parse(e.data) // 后端返回的数据
                // console.log('收到ws推送：', new Date())
                // console.log('收到ws推送：' + new Date(), res.data)
                if (loading) {
                    loading.close()
                    loading = null
                }
                switch (res.data?.socketType) {
                    case '01': {
                        if (res.data?.data) {
                            const unitElevator = res.data.data;
                            elevatorData.total = unitElevator.total
                            if (unitElevator.priority == '01' || unitElevator.priority == '02') {
                                getElevatorListAPI(currentProjectId.value, true)
                                // console.log('接警请求:', new Date())
                            } else {

                                let _index = null
                                elevatorData.mainList.forEach((item, index) => {
                                    if (item.elevatorId == unitElevator.elevatorId) {
                                        _index = index;
                                        item.elevatorName = unitElevator.elevatorName
                                        item.elevatorType = unitElevator.elevatorType
                                        item.floor = unitElevator.floor
                                        item.floorNum = unitElevator.floorNum
                                        item.online = unitElevator.online
                                        item.openDoor = unitElevator.openDoor
                                        // item.priority = unitElevator.priority
                                        item.projectid = unitElevator.projectid
                                        item.running_direction = unitElevator.running_direction
                                        item.somebody_in = unitElevator.somebody_in
                                        item.state_desc = unitElevator.state_desc
                                        if ((item.priority == '01' || item.priority == '02') && item.priority != unitElevator.priority) {
                                            getElevatorListAPI(currentProjectId.value, true)
                                        } else {
                                            item.priority = unitElevator.priority
                                        }

                                    }
                                })


                            }
                        }

                        // elevatorData.total = res.data.total
                        break
                    }

                    case '04': {
                        if (res.data.data) {
                            isKunren.value = true
                            tipMsg.value = res.data.data
                            // console.log('消息推送 - 困人')
                        } else if (res.data.data === '') {
                            isKunren.value = false
                            tipMsg.value = res.data.data
                            // console.log('消息推送 - 无')
                        } else {
                            if (isKunren.value) {
                                isKunren.value = true
                                // console.log('消息推送 - 持续困人')
                            } else {
                                // console.log('消息推送 - 无-')
                                isKunren.value = false
                            }

                        }
                        break;
                    }
                }
            },
            async (e) => {
                // console.log('关闭ws回调 --------启动定时器---')
                if (clearInter) {
                    // console.log('先关闭定时器')
                    clearTimeout(clearInter)
                    clearInter = null;
                }
                setTimer(true)//true=避免重复调用 
            }, // onclose回调
            null, // onerror回调
            heartData,
            null, // 传送心跳包的间隔时间
            true // 断掉立即重连
        )

        useWebSocketRT(
            `${baseUrl}/elevator_abeyance/websocket/bi?token=${token}`, // url
            null, // onopen回调
            (e) => { // onmessage回调

                if (clearInterRT) {
                    // console.log('关闭定时器')
                    clearTimeout(clearInterRT)
                    clearInterRT = null;
                }
                const res = JSON.parse(e.data) // 后端返回的数据
                if (loading) {
                    loading.close()
                    loading = null
                }
                switch (res.data?.socketType) {
                    case '02': {
                        if (res.data.data) {
                            elevatorData.realTime.unshift(res.data.data)
                        }
                        break;
                    }
                }
            },
            async (e) => {
                // console.log('关闭ws回调 --------启动定时器---')
                if (clearInterRT) {
                    // console.log('先关闭定时器')
                    clearTimeout(clearInterRT)
                    clearInterRT = null;
                }
                setTimerRT()
            }, // onclose回调
            null, // onerror回调
            heartData,
            null, // 传送心跳包的间隔时间
            true // 断掉立即重连
        )
    }, 500)


}
const getProjectAPI = (noloading = {}) => { // 获取项目
    // loading = $loading('#customer-bi')
    getProjectList(noloading).then(res => {
        // console.log(res.data.data.length === 0, 'xxxx')
        if (res.data?.token) {
            token = res.data.token
            // console.log({ token })
            elevatorData.token = token

        }
        if (res.data.data?.length) {
            options.push(...res.data.data)
            currentProjectId.value = res.data.data[0].id
            changeId(currentProjectId.value)
            getElevatorListAPI(currentProjectId.value)
            getStatisticAPI(currentProjectId.value)
            getWorkPlan(currentProjectId.value)
            // console.log('获取项目重连')
            websorcketCn()
        }
        else {
            if (res.data.data?.length === 0) {
                loading.close()
            } else {
                ElMessage.error('项目列表获取失败')
                if (loading?.close) {
                    loading.close()
                }
            }

        }
    }).catch(e => {
        // console.log({ e })
        // ElMessage.error('服务器错误')
    })
}


elevatorData.mainList = []

elevatorData.mainList2 = [
    {
        elevatorId: "1524688836977201052",
        elevatorName: "xxxxxxx1",
        elevatorType: "01",
        floor: "9",
        online: "01",
        openDoor: "03",
        priority: "03",
        running_direction: "01",
        somebody_in: "00",
        state_desc: "正常",

    },
    {
        elevatorId: "172717907737800704732",
        elevatorName: "PH100006",
        elevatorType: "01",
        floor: "01",
        online: "01",
        openDoor: "02",
        priority: "05",
        running_direction: "00",
        somebody_in: "01",
        state_desc: "困人",
    },
    {
        elevatorId: "17271790773780070447",
        elevatorName: "PH100006",
        elevatorType: "01",
        floor: "01",
        online: "01",
        openDoor: "00",
        priority: "03",
        running_direction: "00",
        somebody_in: "00",
        state_desc: "警告",
    },
    {
        elevatorId: "17271790773780070447",
        elevatorName: "PH100006",
        elevatorType: "01",
        floor: "01",
        online: "01",
        openDoor: "00",
        priority: "03",
        running_direction: "00",
        somebody_in: "01",
        state_desc: "警告",
    },
    {
        elevatorId: "xxx2",
        elevatorName: "xxffs2",
        elevatorType: "01",
        floor: "01",
        online: "01",
        openDoor: "00",
        priority: "04",
        running_direction: "00",
        somebody_in: "01",
        state_desc: "停止服务",
    },
    {
        elevatorId: "17271790773780070447",
        elevatorName: "PH100006",
        elevatorType: "01",
        floor: "01",
        online: "01",
        openDoor: "00",
        priority: "04",
        running_direction: "00",
        somebody_in: "00",
        state_desc: "停止服务",
    },
    {
        elevatorId: "172717907737800704427",
        elevatorName: "PH100006",
        elevatorType: "01",
        floor: "01",
        online: "01",
        openDoor: "00",
        priority: "04",
        running_direction: "00",
        somebody_in: "00",
        state_desc: "停止服务",
    },
    {
        elevatorId: "172717907737800704437",
        elevatorName: "PH100006",
        elevatorType: "01",
        floor: "01",
        online: "01",
        openDoor: "00",
        priority: "04",
        running_direction: "00",
        somebody_in: "00",
        state_desc: "停止服务",
    },
    {
        elevatorId: "17271790773780070447",
        elevatorName: "PH100006",
        elevatorType: "01",
        floor: "01",
        online: "01",
        openDoor: "00",
        priority: "05",
        running_direction: "00",
        somebody_in: "00",
        state_desc: "离线",
    },
    {
        elevatorId: "17271790773780070447",
        elevatorName: "PH100006",
        elevatorType: "01",
        floor: "01",
        online: "01",
        openDoor: "00",
        priority: "06",
        running_direction: "00",
        somebody_in: "00",
        state_desc: "正常",
    },
    {
        elevatorId: "17271790773780070447",
        elevatorName: "PH100006",
        elevatorType: "01",
        floor: "01",
        online: "01",
        openDoor: "00",
        priority: "05",
        running_direction: "00",
        somebody_in: "01",
        state_desc: "离线",
    },
    {
        elevatorId: "17271790773780070447",
        elevatorName: "PH100006",
        elevatorType: "01",
        floor: "01",
        online: "01",
        openDoor: "00",
        priority: "06",
        running_direction: "00",
        somebody_in: "01",
        state_desc: "正常",
    },

    {
        elevatorId: "1727179077378007047",
        elevatorName: "PH100006",
        elevatorType: "02",
        floor: "01",
        online: "01",
        openDoor: "00",
        priority: "05",
        running_direction: "00",
        somebody_in: "01",
        state_desc: "困人",
    },
    {
        elevatorId: "172717907737800704732",
        elevatorName: "PH100006",
        elevatorType: "02",
        floor: "01",
        online: "01",
        openDoor: "00",
        priority: "05",
        running_direction: "00",
        somebody_in: "01",
        state_desc: "困人",
    },
    {
        elevatorId: "17271790773780070447",
        elevatorName: "PH100006",
        elevatorType: "02",
        floor: "01",
        online: "01",
        openDoor: "00",
        priority: "03",
        running_direction: "00",
        somebody_in: "00",
        state_desc: "困人",
    },
    {
        elevatorId: "17271790773780070447",
        elevatorName: "PH100006",
        elevatorType: "02",
        floor: "01",
        online: "01",
        openDoor: "00",
        priority: "03",
        running_direction: "00",
        somebody_in: "01",
        state_desc: "困人",
    },
    {
        elevatorId: "17271790773780070447",
        elevatorName: "PH100006",
        elevatorType: "02",
        floor: "01",
        online: "01",
        openDoor: "00",
        priority: "04",
        running_direction: "00",
        somebody_in: "01",
        state_desc: "困人",
    },
    {
        elevatorId: "17271790773780070447",
        elevatorName: "PH100006",
        elevatorType: "02",
        floor: "01",
        online: "01",
        openDoor: "00",
        priority: "04",
        running_direction: "00",
        somebody_in: "00",
        state_desc: "困人",
    },
    {
        elevatorId: "17271790773780070447",
        elevatorName: "PH100006",
        elevatorType: "02",
        floor: "01",
        online: "01",
        openDoor: "00",
        priority: "05",
        running_direction: "00",
        somebody_in: "00",
        state_desc: "困人",
    },
    {
        elevatorId: "17271790773780070447",
        elevatorName: "PH100006",
        elevatorType: "02",
        floor: "01",
        online: "01",
        openDoor: "00",
        priority: "06",
        running_direction: "00",
        somebody_in: "00",
        state_desc: "困人",
    },
    {
        elevatorId: "17271790773780070447",
        elevatorName: "PH100006",
        elevatorType: "02",
        floor: "01",
        online: "01",
        openDoor: "00",
        priority: "05",
        running_direction: "00",
        somebody_in: "01",
        state_desc: "困人",
    },
    {
        elevatorId: "17271790773780070447",
        elevatorName: "PH100006",
        elevatorType: "02",
        floor: "01",
        online: "01",
        openDoor: "00",
        priority: "06",
        running_direction: "00",
        somebody_in: "01",
        state_desc: "困人",
    },

]
let parmas = [
    { freq: '03', dateTime: '', projectid: currentProjectId.value, funcType: 'A122', count: '12', regionCode: '', iscurrentDate: '0' },// 回召每月走势统计
    { freq: '', dateTime: '', projectid: currentProjectId.value, funcType: 'A121', count: '', regionCode: '', iscurrentDate: '' },//  回召类型分布统计
    { freq: '03', dateTime: '', projectid: currentProjectId.value, funcType: 'A124', count: '12', regionCode: '', iscurrentDate: '0' },//  停梯时长
    { freq: '', dateTime: '', projectid: currentProjectId.value, funcType: 'A125', count: '', regionCode: '', iscurrentDate: '0' },//   停梯时长类型分布
    { freq: '', dateTime: '', projectid: currentProjectId.value, funcType: 'A126', count: '', regionCode: '', iscurrentDate: '1' },//    近30日项目内电梯日均运行次数
    { freq: '', dateTime: '', projectid: currentProjectId.value, funcType: 'A130', count: '', regionCode: '', iscurrentDate: '1' },//  近30电梯故障排行统计
    { freq: '', dateTime: '', projectid: currentProjectId.value, funcType: 'A131', count: '', regionCode: '', iscurrentDate: '1' },// 电梯5次故障运行次数排行
    { freq: '', dateTime: '', projectid: currentProjectId.value, funcType: 'A020', count: '', regionCode: '', iscurrentDate: '' },// 故障原因
]
const changeDataboard = (originKey, value) => {
    const projectid = currentProjectId.value
    parmas.forEach(x => {
        x.projectid = projectid
    })
    let temp = null
    if (typeof value === 'string') {
        console.log('字符串', originKey, value)
        temp = parmas.find(x => (x.funcType == 'A128' || x.funcType == 'A127' || x.funcType == 'A129' || x.funcType == 'A130'))
        temp.funcType = value

    } else if (typeof value === 'object') {
        console.log('对象', originKey, value)
        temp = parmas.find(x => x.funcType == originKey)
        temp.freq = value.freq
        temp.iscurrentDate = value.iscurrentDate
    }
    console.log({ parmas })
    getDataApi([temp], null, false).then(res => {
        if (res?.data?.data) {
            const data = res.data.data;
            if (typeof value === 'string') {
                elevatorData.rightData.A127 = data[temp.funcType].data.data
            } else if (typeof value === 'object') {
                elevatorData.rightData[originKey] = data[originKey].data.data
                console.log('拿到的数据：', elevatorData.rightData[originKey])
            }

        }
    })

}

const getStatisticAPI = (projectid) => { // 右侧列表

    parmas.forEach(x => {
        x.projectid = projectid
    })
    console.log({ parmas })
    getDataApi(parmas, null, true).then(res => {
        if (res?.data?.data) {
            const data = res.data.data;
            elevatorData.rightData = {
                'A125': data.A125.data.data,
                'A121': data.A121.data.data,
                'A020': data.A020.data.data,
                'A126': data.A126.data.data,
                'A131': data.A131.data.data,
                'A122': data.A122.data,
                'A124': data.A124.data,
                'A127': data?.A130?.data?.data || data?.A127?.data?.data || data?.A128?.data?.data || data?.A129?.data?.data,
            }
            return;

        }
    })

}
const getWorkPlan = (projectid) => { // 工作计划
    getWorkScheduleOfInsuBI({ projectid }).then(res => {
        if (res.data?.data?.length) {
            res.data.data.forEach((item, index) => {
                item.index = index + 1
            })
            elevatorData.workplan = res.data.data
        } else {
            elevatorData.workplan = []
        }
        // console.log({ 'getWorkPlan:': elevatorData.workplan })
    })
}
let token = null
const cRoute = useRoute()


watch(
    () => isFullscreen,
    (newVal) => {
        // console.log(newVal.value)
        if (newVal.value) {
            // console.log('开启全屏')
            setTimeout(() => {
                setScale('1', true)
            })
        } else {
            // console.log('关闭全屏')
            setTimeout(() => {
                setScale()
            })
        }
    },
    {
        deep: true,
        immediate: true
    }
)
watch(() => cRoute.name, (newV) => {

    if (newV != 'CustomerBi') {
        // console.log('断开ws ----------------')
        // console.log('断开ws ----------------')
        if (ws?.close) {
            ws.close()
        }
        isConnected = false;
        clearTimeout(cancleTimer)
        ws = null;
    } else {
        console.log('路由重连')
        websorcketCn()
        checkBaojing()
    }
}, {
    deep: true
})
const checkBaojing = (priority = false) => { //priority 其他项目困人
    setTimeout(() => {
        audio.value.muted = true
        audio.value.play()
        // console.log('是否困人:', isKunren.value, ', priority:', priority)

        const hasPerson = elevatorData.mainList.find(item => item.priority == '01')

        if (
            dialogVisible.value // 判断铃声开关 1.开的时候 再判断是否有困人 
        ) {
            // console.log('铃声状态：开启')

            if (hasPerson || priority || isKunren.value) {
                // audioMuted = false
                // console.log('触发困人报警')
                audio.value.muted = false
            } else {
                setTimeout(() => {
                    audio.value.muted = true
                    // console.log('无困人')
                })
            }
        } else {
            audio.value.muted = true
            // console.log('铃声状态：关闭')
        }
    })
}
watch(() => elevatorData.mainList, (newVal) => {
    checkBaojing()
}, {
    deep: true,
    immediate: true
})
watch(isKunren, (newVal) => {
    // console.log('项目困人：', newVal)
    checkBaojing(newVal)

},
    {
        deep: true,
        immediate: true
    })
let audioMuted = null
const handleClose = () => {
    dialogVisible.value = !dialogVisible.value
    // console.log('手动开关：', dialogVisible.value)
    checkBaojing()
}
let $bus = inject('$bus')
onMounted(() => {

    loading = $loading('#customer-bi')
    token = getToken(configIndex.build.token)
    setScale()
    getProjectAPI()
    getRealtimeMsg()
    // console.log({ store: isFullscreen.value })
    // WebSocket函数使用实例//47.108.205.51:8131/elevator
    window.onunload = function () {
        if (ws) {
            ws.close()
        }
    }
})
const getRealtimeMsg = () => {
    getLatestMessage({}).then(res => {
        if (res) {
            // console.log({ res })
            elevatorData.realTime = res.data.data || []
        }
    })
}

function throttle(fn) {
    let timer = null;
    return function () {
        if (timer) {
            return
        }
        timer = setTimeout(() => {
            fn.call(this, ...arguments)
            timer = null
        })
    }
}

/* WebSocket封装
         * @param url: WebSocket接口地址与携带参数必填
         * @param onOpenFunc: WebSocket的onopen回调函数，如果不需要可传null
         * @param onMessageFunc: WebSocket的onmessage回调函数，如果不需要可传null
         * @param onCloseFunc: WebSocket的onclose回调函数，如果不需要可传null
         * @param onErrorFunc: WebSocket的onerror回调函数，如果不需要可传null
         * @param heartMessage: 发送后台的心跳包参数,必填 (给服务端的心跳包就是定期给服务端发送消息)
         * @param timer: 给后台传送心跳包的间隔时间，不传时使用默认值3000毫秒
         * @param isReconnect: 是否断掉立即重连，不传true时不重连
        */
let isConnected = false // 设定已链接webSocket标记
let cancleTimer = null  //取消心跳

let throttleTime = 100;//解决第一次疯狂发送ws
setTimeout(() => {
    throttleTime = 1000
}, 1000)
// 定时任务
let clearInter//清除
let setTimer = (repeat = false) => {
    if (cRoute.name == 'CustomerBi') {
        //开启重连
        let n = 0
        clearInter = setTimeout(() => {
            // console.log('定时器开启' + n++)
            ws = null;
            isConnected = false
            websorcketCn()
            // console.log('定时重连1')
            getElevatorListAPI(currentProjectId.value)
        }, 15 * 1000)
    }
}

function useWebSocket(url, onOpenFunc, onMessageFunc, onCloseFunc, onErrorFunc, heartMessage, timer, isReconnect) {
    // 创建并链接webSocket
    // eslint-disable-next-line no-unreachable
    const connect = () => {
        // 如果未链接webSocket，则创建一个新的webSocket
        if (!isConnected) {
            // console.log('创建新的ws连接')

            ws = new WebSocket(url)
            isConnected = true
        }
    }
    // 向后台发送心跳消息
    // eslint-disable-next-line no-unreachable
    let throttle = null //节流
    const heartCheck = () => {
        if (throttle) return
        throttle = setTimeout(() => {
            if (ws?.send) {
                ws.send(JSON.stringify(heartData.elevator))
                ws.send(JSON.stringify(heartData.isKunren))
                // console.log('发送ws心跳成功')
            }
            throttle = null
        }, throttleTime)
    }

    // 初始化事件回调函数
    // eslint-disable-next-line no-unreachable
    const initEventHandle = () => {
        ws.addEventListener('open', (e) => {

            // console.log('连接ws-open')
            // console.log(' 连接1open', '发送心跳')
            // 给后台发心跳请求，在onmessage中取得消息则说明链接正常
            heartCheck()
            // 如果传入了函数，执行onOpenFunc
            if (!onOpenFunc) {
                return false
            }
            onOpenFunc(e)
        })
        ws.addEventListener('message', (e) => {
            // console.log('onmessage')
            // console.log(' 连接1message',)
            // 接收到任何后台消息都说明当前连接是正常的
            if (!e) {
                // console.log('get nothing from service')
                return false
            }
            // 如果获取到后台消息，则timer毫秒后再次发起心跳请求给后台，检测是否断连
            clearTimeout(cancleTimer)
            cancleTimer = setTimeout(() => {
                heartCheck()
                // console.log('连接1message延时发送心跳')
            }, !timer ? 1000 * 10 : timer)

            // 如果传入了函数，执行onMessageFunc
            if (!onMessageFunc) {
                return false
            }
            onMessageFunc(e)
        })
        ws.addEventListener('close', (e) => {
            clearTimeout(cancleTimer)
            // console.log('关闭了连接1')
            // 如果传入了函数，执行onCloseFunc
            if (!onCloseFunc) {
                return false
            }
            isConnected = false
            onCloseFunc(e)
            // if (isReconnect) { // 如果断开立即重连标志为true
            //     // 重新链接webSocket
            //     console.log('关闭后 重新开启ws连接', e)
            //     connect()
            // }
        })
        ws.addEventListener('error', (e) => {
            clearTimeout(cancleTimer)
            // console.log('ws报错')
            // 如果传入了函数，执行onErrorFunc
            clearTimeout(cancleTimer)
            if (!onErrorFunc) {
                return false
            }
            isConnected = false //如果报错 继续重连
            onErrorFunc(e)

            if (isReconnect) { // 如果断开立即重连标志为true
                // 重新链接webSocket

                // console.log('报错后 重新开启ws连接')
                connect()
            }
        })
    }
    // 初始化webSocket
    // eslint-disable-next-line no-unreachable
    (() => {
        // 1.创建并链接webSocket
        connect()
        // 2.初始化事件回调函数
        initEventHandle()
        // 3.返回是否已连接
        return ws
    })()
}

// 实时信息推送socket
let isConnectedRT = false
let cancleTimerRT = null
let clearInterRT//清除
let wsRT = null
let setTimerRT = () => {
    if (cRoute.name == 'CustomerBi') {
        //开启重连
        let n = 0
        clearInterRT = setTimeout(() => {
            // console.log('定时器开启' + n++)
            wsRT = null;
            isConnectedRT = false
            // console.log('定时重连2')
            websorcketCn()
            // getElevatorListAPI(currentProjectId.value)
        }, 15 * 1000)
    }
}
function useWebSocketRT(url, onOpenFunc, onMessageFunc, onCloseFunc, onErrorFunc, heartMessage, timer, isReconnect) {
    // eslint-disable-next-line no-unreachable
    const connect = () => {
        // 如果未链接webSocket，则创建一个新的webSocket
        if (!isConnectedRT) {
            // console.log('创建新的ws连接')

            wsRT = new WebSocket(url)
            isConnectedRT = true
        }
    }
    // 向后台发送心跳消息
    // eslint-disable-next-line no-unreachable
    let throttle = null //节流
    const heartCheck = () => {
        if (throttle) return
        throttle = setTimeout(() => {
            if (wsRT?.send) {
                wsRT.send(JSON.stringify(heartData.workplan))
                // console.log('发送wsRT心跳成功')
            }
            throttle = null
        }, throttleTime)


    }

    // 初始化事件回调函数
    // eslint-disable-next-line no-unreachable
    const initEventHandle = () => {
        wsRT.addEventListener('open', (e) => {
            // console.log(' 连接2open', '发送心跳')
            // console.log('连接ws-open')

            // 给后台发心跳请求，在onmessage中取得消息则说明链接正常
            heartCheck()
            // 如果传入了函数，执行onOpenFunc
            if (!onOpenFunc) {
                return false
            }
            onOpenFunc(e)
        })
        wsRT.addEventListener('message', (e) => {
            // console.log(' 连接2message')
            // 接收到任何后台消息都说明当前连接是正常的
            if (!e) {
                // console.log('get nothing from service')
                return false
            }
            // 如果获取到后台消息，则timer毫秒后再次发起心跳请求给后台，检测是否断连
            clearTimeout(cancleTimerRT)
            cancleTimerRT = setTimeout(() => {
                heartCheck()
                // console.log('连接2message延时发送心跳')
            }, !timer ? 1000 * 10 : timer)

            // 如果传入了函数，执行onMessageFunc
            if (!onMessageFunc) {
                return false
            }
            onMessageFunc(e)
        })
        wsRT.addEventListener('close', (e) => {

            // console.log('关闭了连接2')
            clearTimeout(cancleTimerRT)
            // 如果传入了函数，执行onCloseFunc
            if (!onCloseFunc) {
                return false
            }
            isConnectedRT = false
            onCloseFunc(e)
            // if (isReconnect) { // 如果断开立即重连标志为true
            //     // 重新链接webSocket
            //     console.log('关闭后 重新开启ws连接', e)
            //     connect()
            // }
        })
        wsRT.addEventListener('error', (e) => {
            clearTimeout(cancleTimerRT)
            // console.log('ws报错')
            // 如果传入了函数，执行onErrorFunc

            if (!onErrorFunc) {
                return false
            }
            isConnectedRT = false //如果报错 继续重连
            onErrorFunc(e)

            if (isReconnect) { // 如果断开立即重连标志为true
                // 重新链接webSocket

                // console.log('报错后 重新开启ws连接')
                connect()
            }
        })
    }
    // 初始化webSocket
    // eslint-disable-next-line no-unreachable
    (() => {
        // 1.创建并链接webSocket
        connect()
        // 2.初始化事件回调函数
        initEventHandle()
        // 3.返回是否已连接
        return wsRT
    })()
}

</script>
 
<style lang="scss" scoped>
.toast {
    line-height: 100px;
    text-align: center;
    background-color: rgba(0, 0, 0, 1);
    color: #23fffc;
    font-size: 20px;
}

.baojing {
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 20px;

    @keyframes breath {
        from {
            opacity: 0.3;
        }

        to {
            opacity: 1;
        }
    }

    .kunrening {
        animation: breath 0.5s infinite;
    }
}

#customer-bi {
    user-select: none;
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 1px;
    background: url('../../../public/images/dataplatform/customer/customer-bg.png') no-repeat center/cover;

    .header {
        width: 100%;
        box-sizing: border-box;
        height: 65px;
        background: url('../../../public/images/dataplatform/bg/top_bg.png') no-repeat center/cover;
        position: relative;

        .select-border {
            width: 301px;
            height: 34px;
            position: relative;
            top: 14px;
            left: 547px;
            overflow: hidden;
            border: 1px solid rgba(0, 154, 252, 0.5);
            box-shadow: 0 0 3px 1px rgb(37, 169, 245);
            transform: skew(-25deg, 0deg);

            .selectcontent {
                margin-left: 20px;
                width: 200px;
                height: 40px;
                transform: skew(25deg, 0deg);
                border: none;
                outline: none;
                background-color: transparent;

                :deep() .el-input__wrapper {
                    background: transparent;
                    border: none;
                    font-weight: bold;
                    box-shadow: none !important;
                }

                :deep().el-select__icon {
                    color: #29b6ff;
                }

                :deep() .el-input__inner {
                    color: #29b6ff;
                    font-size: 16px;
                    font-weight: bold;
                }

                :deep() .el-select.el-input.is-focus.el-input__wrapper {
                    box-shadow: none !important;
                }

                :deep() .el-input--small {
                    --el-input-height: '';
                }
            }
        }

        .title {
            position: absolute;
            top: 13px;
            letter-spacing: 1px;
            font-family: 'SourceHanSansCN-Regular';
            font-size: 24px;
            color: #f3fcff;
            font-weight: bold;
            line-height: 36px;
            width: 22%;
            white-space: nowrap;
            text-align: center;
            text-shadow: 0 0 1px #f3fcff, 0 0 3px #f0f4f5;
        }
    }

    .main {
        width: 100%;
        height: calc(100% - 65px);
        box-sizing: border-box;
        display: flex;

        .left {
            width: calc(100% - 650px);
            margin: 0 15px;
            height: 1000px;
            box-sizing: border-box;

            .BIlist {
                height: calc(100% - 252px);

                :deep().el-dialog.is-draggable {
                    background: #000;
                }

                :deep().el-dialog__header {
                    margin-right: 0;
                    background-color: #000;
                    border-radius: 10px 10px 0 0;

                    line-height: 30px;

                    &>.el-dialog__title {
                        color: transparent;
                    }
                }

                :deep().el-dialog__body {
                    border-radius: 0 10px 10px 0;

                    &>div {
                        border-radius: 0 0 10px 10px;
                    }
                }
            }

            .bottom {
                display: flex;

                .plan,
                .realtimeInfo {
                    width: 640px;
                    height: 252px;
                    box-sizing: border-box;
                    overflow: hidden;
                    // margin: 0 12px;
                    background: url('../../../public/images/dataplatform/customer/card-bg.png') no-repeat center/cover;
                }

                .plan {
                    margin: 0 10px;
                }
            }
        }

        .right {
            width: 620px;
            height: 1000px;
            background: url('../../../public/images/dataplatform/customer/card-bg-2.png') no-repeat center/cover;
        }
    }
}
</style>