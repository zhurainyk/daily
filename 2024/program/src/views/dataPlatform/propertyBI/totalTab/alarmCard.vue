<template>
    <border class="border">
        <div class="temp">
            <module-name :moduleName="'实时报警'"></module-name>
            <div class="content">
                <el-scrollbar height="100%">
                    <div class="item" v-for="(item, index) in tablelist" @click="editDetailFn(item)" :key="index">
                        <div class="left">
                            <div class="label"
                                :style="{ color: item.color, borderColor: item.color, backgroundColor: item.bgcolor || 'rgba(253,103,131,0.2)' }">
                                {{ item.eventDesc }}</div>
                            <div class="value" :title="item.elevatorName">{{ item.elevatorName }}</div>
                        </div>
                        <div class="right">
                            <div class="date">{{ item.date }} </div>
                            <div class="time"> {{ item.time }}</div>
                        </div>
                    </div>
                </el-scrollbar>
            </div>
        </div>
    </border>
    <eleinfodialog ref="eleinfo_ref" :emitKey="'_propertybi'"></eleinfodialog>
</template>
<script setup>
import { ref, reactive, computed, watch, onMounted, inject } from 'vue'
import { menulist } from '@/router/menu'
import { useRouter, useRoute } from 'vue-router'
import { getTaskIdByOrder } from '@/api/module/customerBI'
import eleinfodialog from '../../customerBi2/eleInfoDialog.vue'
import { socketUrl } from '@/api/create-api'
import { getToken } from '@/utils/auth'
import configIndex from '@/../config/index'

const props = defineProps({
    data: {
        type: Array,
        default: []
    },
    companyId: {
        type: String
    }
})
const token = computed(() => {
    return getToken(configIndex.build.token)
})
// const tablelist = computed(() => [...props.data])
const tablelist = ref([])
watch(() => props.data, v => {
    if (v.length) {
        tablelist.value.push(...v)
    }
}, {
    immediate: true,
    deep: true
})
const companyId = computed(() => props.companyId)
watch(companyId, v => {
    if (v) {
        // initSocket(v)
        // heartData.keyline = v
    }
}, {
    immediate: true,
    deep: true
})
// let tablelist2 = reactive([
//     { id: '1', orderTypeDesc: '工单进度', color: '#23FFFC', bgc: 'rgba(35, 255, 252, 0.2)', orderContent: '更新推更新推送更新推送更新推送更新推送送更新推更新推送更新推送更新推送更新推送送更新推更新推送更新推送更新推送更新推送送', date: '2022-5-12', time: '10:50:50' },
//     { id: '2', orderTypeDesc: '审批进度', color: '#239AFF', bgc: 'rgba(35, 154, 255, 0.2)', orderContent: '更新推更新推送更新推送更新推送更新推送送', date: '2022-5-12', time: '10:50:50' },
//     { id: '3', orderTypeDesc: '电梯物联网', color: '#FED52F', bgc: 'rgba(254, 213, 47, 0.2)', orderContent: '更更新推更新推送更新推送更新推送更新推送送新推送', date: '2022-5-12', time: '10:50:50' },
//     { id: '4', orderTypeDesc: '工单进度', color: '#23FFFC', bgc: 'rgba(35, 255, 252, 0.2)', orderContent: '更新推送', date: '2022-5-12', time: '10:50:50' },
//     { id: '5', orderTypeDesc: '审批进度', color: '#239AFF', bgc: 'rgba(35, 154, 255, 0.2)', orderContent: '更新推送', date: '2022-5-12', time: '10:50:50' },
//     { id: '6', orderTypeDesc: '电梯物联网', color: '#FED52F', bgc: 'rgba(254, 213, 47, 0.2)', orderContent: '更新推送', date: '2022-5-12', time: '10:50:50' },
// ])


let wsRT
let clearInterRT
let isConnectedRT
let cancleTimerRT
let throttleTime = 100;//解决第一次疯狂发送ws
let cRoute = useRoute()
let setTimerRT = () => {
    if (cRoute.name == 'PropertyBI') {
        clearInterRT = setTimeout(() => {
            wsRT = null;
            isConnectedRT = false
            initSocket()
        }, 15 * 1000)
    }
}
watch(() => cRoute.name, (newV) => {
    if (newV != 'PropertyBI') {
        setTimeout(() => {
            if (wsRT?.close) {
                wsRT.close()
            }
            isConnectedRT = false;
            clearTimeout(cancleTimerRT)
            wsRT = null;
        })
    } else {
        setTimeout(() => {
            initSocket()
        })
    }
}, {
    deep: true,
    immediate: true
})
setTimeout(() => {
    throttleTime = 1000
}, 1000)

let heartData = { "socketType": "05", "keyline": "" }

function useWebSocketRT(url, onOpenFunc, onMessageFunc, onCloseFunc, onErrorFunc, heartMessage, timer, isReconnect) {
    // eslint-disable-next-line no-unreachable
    const connect = () => {
        // 如果未链接webSocket，则创建一个新的webSocket
        if (!isConnectedRT) {
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
                wsRT.send(JSON.stringify(heartData))
                // console.log('发送wsRT心跳成功')
                throttle = null
                heartCheck()
            }

        }, throttleTime * 5)


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
const initSocket = () => {
    setTimeout(() => {
        console.log(socketUrl)
        useWebSocketRT(
            `${socketUrl}/elevator/websocket/bi?token=${token.value}`, // url
            null, // onopen回调
            (e) => { // onmessage回调

                if (clearInterRT) {
                    // console.log('关闭定时器')
                    clearTimeout(clearInterRT)
                    clearInterRT = null;
                }
                const res = JSON.parse(e.data) // 后端返回的数据
                // console.log('------------消息：', res)
                // if (loading) {
                //     loading.close()
                //     loading = null
                // }
                switch (res.data?.socketType) {
                    case '05': {
                        if (res.data.projectId) {
                            let repeatMark = res.data.date + res.data.time + res.data.elevatorId + res.data.projectId + res.data.eventName
                            let mark0 = tablelist.value[0].date + tablelist.value[0].time + tablelist.value[0].elevatorId + tablelist.value[0].projectId + tablelist.value[0].eventName
                            if (mark0 === repeatMark) return//防止重复推送
                            tablelist.value.unshift({
                                date: res.data.date,
                                time: res.data.time,
                                elevatorId: res.data.elevatorId,
                                elevatorName: res.data.elevatorName,
                                eventDesc: res.data.eventDesc,
                                eventName: res.data.eventName,
                                projectId: res.data.projectId,
                                bgcolor: res.data.bgcolor,
                                color: res.data.color
                            })
                            if (tablelist.value.length > 100) {
                                tablelist.value.pop()
                            }

                            if (res.data.eventName == '困人' || res.data.eventDesc == '人工报警' || res.data.eventDesc == '紧急按钮报警') {
                                autoRun({
                                    date: res.data.date,
                                    time: res.data.time,
                                    elevatorId: res.data.elevatorId,
                                    elevatorName: res.data.elevatorName,
                                    eventDesc: res.data.eventDesc,
                                    eventName: res.data.eventName,
                                    projectId: res.data.projectId,
                                    bgcolor: res.data.bgcolor,
                                    color: res.data.color
                                })
                                emit({
                                    date: res.data.date,
                                    time: res.data.time,
                                    elevatorId: res.data.elevatorId,
                                    elevatorName: res.data.elevatorName,
                                    eventDesc: res.data.eventDesc,
                                    eventName: res.data.eventName,
                                    projectId: res.data.projectId,
                                    bgcolor: res.data.bgcolor,
                                    color: res.data.color
                                })
                            }
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
                setTimerRT() //开启重连机制
            }, // onclose回调
            null, // onerror回调
            heartData,
            null, // 传送心跳包的间隔时间
            true // 断掉立即重连
        )
    }, 200)
}
onMounted(() => {
    initSocket()
    $bus.on('alarm_property_toast', autoRun)
})

const emit = (data) => {
    $bus.emit('alarm_property', data)
}

const $router = useRouter()

const $bus = inject('$bus')
const eleinfo_ref = ref(null)
let toastVisible = false //公共弹窗状态
const editDetailFn = (e) => {
    eleinfo_ref.value.showToast(e)
}
$bus.on('toastState_propertybi', visible => {
    toastVisible = visible
    console.log('弹窗状态1----------------', toastVisible)
})
const autoRun = (data) => {
    if (toastVisible) return //如果已经打开 就不用再次打开
    editDetailFn(data)
}


</script>

<style lang="scss" scoped>
.border {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding-top: 1px;

    .content {
        height: 288px;
        width: calc(100% - 14px);
        box-sizing: border-box;
        width: 100%;
        margin: 20px auto 0;
        // background-color: #fff;

        .item {
            display: flex;
            padding: 7px 13px;
            width: 100%;
            overflow: hidden;
            box-sizing: border-box;
            justify-content: space-between;


            .left {

                display: flex;
            }

            .left {
                width: 75%;
                margin-left: 5%;
                flex-grow: 1;
            }

            .right {
                width: 20%;

            }

            .right {

                color: #F3FCFF;
                // font-size: 16px;
                vertical-align: baseline;
                line-height: 24px;
                // text-align: center;

                .time {

                    white-space: nowrap;
                    font-family: SourceHanSansCN-Regular;
                }

                .date {
                    white-space: nowrap;
                    font-family: SourceHanSansCN-Regular;
                }
            }

            .label {
                width: 90px;
                min-width: 90px;
                height: 24px;
                background: rgba(35, 255, 252, 0.2);
                border: 1px solid #23FFFC;
                font-size: 14px;
                color: #23FFFC;
                margin-top: 5px;
                line-height: 24px;
                text-align: center;
                font-family: SourceHanSansCN-Regular;
            }

            .value {
                font-size: 16px;
                color: #F3FCFF;
                line-height: 24px;
                margin-left: 14px;

                text-overflow: ellipsis;
                overflow: hidden;
                -webkit-line-clamp: 2;
                display: -webkit-box;

                -webkit-box-orient: vertical;
                font-family: SourceHanSansCN-Regular;
            }
        }
    }
}
</style>