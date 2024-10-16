<template>
    <div class="realtime-bi ">
        <div class="BIlist">
            <mainstate :data="elevatorData.mainList" :total="elevatorData.total" :orderType='elevatorData.orderType'
                :token="elevatorData.token"></mainstate>
        </div>
        <div class="right">
            <border class="card workplan">
                <workplan :data="elevatorData.workplan"></workplan>
            </border>
            <border class="card pushmessage">
                <realtime :data="elevatorData.realTime"></realtime>
            </border>
        </div>
        <!-- <audio :src="require('../../../../public/music/bibi.mp3')" muted ref="audio" id="audio" preload="auto" controls
            hidden loop></audio>
        <el-tooltip placement="right">
            <template #content>
                <div style="color: #1ac9ff">
                    警报声：{{ dialogVisible ? '开' : '关' }}
                </div>
            </template>
            <div class="baojing" @click="handleClose">
                <svg v-show="!dialogVisible" t="1656066830393" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="4470" width="28" height="28">
                    <path
                        d="M837.818182 954.181818H186.181818V488.727273c0-179.2 146.618182-325.818182 325.818182-325.818182s325.818182 146.618182 325.818182 325.818182v465.454545z m-605.090909-46.545454h558.545454V488.727273c0-153.6-125.672727-279.272727-279.272727-279.272728s-279.272727 125.672727-279.272727 279.272728v418.909091z"
                        fill="#999999" p-id="4471"></path>
                    <path
                        d="M81.454545 907.636364h837.818182v46.545454h-837.818182zM521.309091 798.254545l-39.563636-20.945454 86.10909-172.218182h-186.181818l121.018182-239.709091 39.563636 20.945455-86.10909 172.218182h186.181818zM477.090909 0h46.545455v116.363636h-46.545455zM28.392727 378.414545l13.032728-44.683636 111.70909 32.581818-13.032727 44.683637zM849.92 366.289455l111.709091-32.628364 13.032727 44.683636-111.709091 32.628364zM716.846545 184.273455l73.774546-89.972364L826.647273 123.810909l-73.774546 89.972364zM174.126545 123.880727L210.571636 94.952727l72.401455 91.112728-36.445091 28.951272z"
                        fill="#999999" p-id="4472"></path>
                </svg>
                <svg v-show="dialogVisible" t="1656066830393" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="4470" width="28" height="28">
                    <path
                        d="M837.818182 954.181818H186.181818V488.727273c0-179.2 146.618182-325.818182 325.818182-325.818182s325.818182 146.618182 325.818182 325.818182v465.454545z m-605.090909-46.545454h558.545454V488.727273c0-153.6-125.672727-279.272727-279.272727-279.272728s-279.272727 125.672727-279.272727 279.272728v418.909091z"
                        fill="#1AC9FF" p-id="4471"></path>
                    <path
                        d="M81.454545 907.636364h837.818182v46.545454h-837.818182zM521.309091 798.254545l-39.563636-20.945454 86.10909-172.218182h-186.181818l121.018182-239.709091 39.563636 20.945455-86.10909 172.218182h186.181818zM477.090909 0h46.545455v116.363636h-46.545455zM28.392727 378.414545l13.032728-44.683636 111.70909 32.581818-13.032727 44.683637zM849.92 366.289455l111.709091-32.628364 13.032727 44.683636-111.709091 32.628364zM716.846545 184.273455l73.774546-89.972364L826.647273 123.810909l-73.774546 89.972364zM174.126545 123.880727L210.571636 94.952727l72.401455 91.112728-36.445091 28.951272z"
                        fill="#1AC9FF" p-id="4472"></path>
                </svg>
            </div>
        </el-tooltip>
        <el-tooltip placement="right">
            <template #content>
                <div style="color: #1ac9ff;cursor: pointer;" @click="autoRun" v-if="isKunren">电梯困人：{{ tipMsg }}</div>
            </template>
            <div class="alarm" @click="autoRun" v-if="isKunren" :class="{ kunrening: isKunren ? true : false }">
            </div>
        </el-tooltip> -->
    </div>
</template>
<script setup>

import { ref, reactive, computed, watch, onMounted, toRef, inject, onBeforeUnmount, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { getProjectList, getElevatorByProjectId, getStatisticsOfInsuBI, getWorkScheduleOfInsuBI, getLatestMessage } from '@/api/module/customerBI'
import mainstate from '../mainState.vue'
import { socketUrl as baseUrl } from '@/api/create-api'
import { getToken, setToken } from '@/utils/auth'
import configIndex from '../../../../../config/index'
import workplan from './workplan.vue'
import realtime from './realtime.vue'
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

const props = defineProps({
    projectId: {
        type: String,
        require: true
    },
    token: {
        type: String,
        require: true
    }
})
const store = useStore()
// let {getActivedTab} = mapGetters(['getActivedTab'])
// getActivedTab = computed(getActivedTab.bind(store))
const activedTab = computed(() => store.state.menu.activedTab)
onBeforeUnmount(() => {
    console.log('组件卸载-----', activedTab)
    if (activedTab.value != '01') { //tab切换或者退出
        if (ws?.close) {
            ws.close()
        }
        isConnected = false;
        clearTimeout(cancleTimer)
        ws = null;

        if (wsRT?.close) {
            wsRT.close()
        }
        isConnectedRT = false;
        clearTimeout(cancleTimerRT)
        wsRT = null;
    }
})
onUnmounted(() => {
    console.log('组件卸载完成-----', cRoute.name)
    if (cRoute.name != 'CustomerBi') { //tab切换或者退出
        if (ws?.close) {
            ws.close()
        }
        isConnected = false;
        clearTimeout(cancleTimer)
        ws = null;

        if (wsRT?.close) {
            wsRT.close()
        }
        isConnectedRT = false;
        clearTimeout(cancleTimerRT)
        wsRT = null;
    }
})
const cRoute = useRoute()
const projectId = computed(() => {
    return props.projectId
})
const token = computed(() => {
    return props.token || getToken(configIndex.build.token)
})
const elevatorData = reactive({
    mainList: [],
    orderType: '00',
})


let loading
let ws
let wsRT
let $bus = inject('$bus')
let clearInterRT
let clearInter
let isConnected
let isConnectedRT
let cancleTimer
let cancleTimerRT
let debounce
let isKunren = ref(false)
let tipMsg = ref('')
let throttleTime = 100;//解决第一次疯狂发送ws
setTimeout(() => {
    throttleTime = 1000
}, 1000)
onMounted(() => {
    getRealtimeMsg()

})
// const handleClose = () => {
//     dialogVisible.value = !dialogVisible.value 
//     checkBaojing()
// }
const audio = ref(null)
const dialogVisible = ref(false)
// const checkBaojing = (priority = false) => { //priority 其他项目困人
//     setTimeout(() => {
//         audio.value.muted = true
//         audio.value.play()
//         // console.log('是否困人:', isKunren.value, ', priority:', priority)

//         const hasPerson = elevatorData.mainList.find(item => item.priority == '01')

//         if (
//             dialogVisible.value // 判断铃声开关 1.开的时候 再判断是否有困人 
//         ) {
//             // console.log('铃声状态：开启')

//             if (hasPerson || priority || isKunren.value) {
//                 // audioMuted = false
//                 // console.log('触发困人报警')
//                 audio.value.muted = false
//             } else {
//                 setTimeout(() => {
//                     audio.value.muted = true
//                     // console.log('无困人')
//                 })
//             }
//         } else {
//             audio.value.muted = true
//             // console.log('铃声状态：关闭')
//         }
//     })
// }
// watch(() => elevatorData.mainList, (newVal) => {
//     checkBaojing()
// }, {
//     deep: true,
//     immediate: true
// })
watch(() => cRoute.name, (newV) => {
    console.log('路由：', { newV })
    if (newV != 'CustomerBi') {
        setTimeout(() => {
            console.log('断开ws ----------------')
            if (ws?.close) {
                ws.close()
            }
            isConnected = false;
            clearTimeout(cancleTimer)
            ws = null;

            if (wsRT?.close) {
                wsRT.close()
            }
            isConnectedRT = false;
            clearTimeout(cancleTimerRT)
            wsRT = null;
        })
    } else {
        setTimeout(() => {
            console.log('路由重连')
            websorcketCn()
        })
        // checkBaojing()
    }
}, {
    deep: true,
    immediate: true
})
// watch(() => elevatorData.mainList, (newVal) => {
//     checkBaojing()
// }, {
//     deep: true,
//     immediate: true
// })
// watch(isKunren, (newVal) => {
//     // console.log('项目困人：', newVal)
//     checkBaojing(newVal)

// }, {
//     deep: true,
//     immediate: true
// })
watch(projectId, (projectId) => {
    if (!projectId) return
    setTimeout(() => {
        changeProjectFn(projectId)
    })

}, {
    immediate: true,
    deep: true
})
let currentKunrenData = {}

const autoRun = () => {
    $bus.emit('autoRun', currentKunrenData)
}
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
            getElevatorListAPI(projectId.value)
        }, 15 * 1000)
    }
}
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
const websorcketCn = (immediate = false) => {
    console.log('能否触发debounce', activedTab)

    if (activedTab.value != '01') return
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
            `${baseUrl}/elevator/websocket/bi?token=${token.value}`, // url
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
                                getElevatorListAPI(projectId.value, true)
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
                                        item.passengers = unitElevator.passengers
                                        if ((item.priority == '01' || item.priority == '02') && item.priority != unitElevator.priority) {
                                            getElevatorListAPI(projectId.value, true)
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
                        // if (res.data.data) {
                        //     isKunren.value = true
                        //     tipMsg.value = res.data.data
                        //     console.log('消息推送 - 困人', res.data)
                        //     if (res.data.elevatorId && res.data.projectId) {
                        //         //跳转困人项目和列表
                        //         currentKunrenData = res.data
                        //         autoRun()
                        //     }
                        // } else if (res.data.data === '') {
                        //     isKunren.value = false
                        //     tipMsg.value = res.data.data
                        //     // console.log('消息推送 - 无')
                        // } else {
                        //     if (isKunren.value) {
                        //         isKunren.value = true
                        //         console.log('消息推送 - 持续困人')
                        //     } else {
                        //         console.log('消息推送 - 无-')
                        //         isKunren.value = false
                        //     }

                        // }
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
            `${baseUrl}/elevator_abeyance/websocket/bi?token=${token.value}`, // url
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



function changeId(id) {
    heartData.elevator.keyline = id
    heartData.workplan.keyline = id
    heartData.isKunren.keyline = id
}
function getStatisticAPI(e) {
    //右侧列表
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
const getRealtimeMsg = () => {//实时数据推送
    getLatestMessage({}).then(res => {
        if (res) {
            elevatorData.realTime = res.data.data || []
        }
    })
}
const getElevatorListAPI = (e, noloading = null) => {
    getElevatorByProjectId({ projectid: e, token: token.value, noloading }).then(res => {
        if (res?.data?.data?.data) {
            elevatorData.mainList = res.data.data.data
            elevatorData.total = res.data.data.total
            elevatorData.orderType = res.data.data.orderType
        }
    })
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
const changeProjectFn = (e) => {
    $bus.emit('resetState')

    // 断开websocket 重连
    if (clearInterRT) {
        clearTimeout(clearInterRT)
    }
    if (clearInter) {
        clearTimeout(clearInter)
    }

    getElevatorListAPI(e)
    ws?.close()
    isConnected = false
    changeId(e)
    getStatisticAPI(e)
    getWorkPlan(e)
    setTimeout(() => {
        // console.log('切换项目重连')
        websorcketCn()//重新获取电梯列表
    }, 1200)

}
</script>
<style lang="scss" scoped>
.baojing {
    cursor: pointer;
    position: absolute;
    bottom: 10px;
    left: 20px;
}

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

.alarm {
    cursor: pointer;
    position: absolute;
    bottom: 14px;
    left: 60px;
    width: 13px;
    height: 30px;
    background: url('../../../../public/images/dataplatform/customer2/kunren.png') no-repeat center/cover;
}

.realtime-bi {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;

    .BIlist {
        // width: calc(100% - 634px);

        // background-color: pink;
        height: calc(481px + 481px + 30px);
        // width: 1254px;
        width: calc(100% - 670px);
        max-width: 1240px;
        min-width: 1100px;
        margin: 0 18px;
        box-sizing: border-box;
    }

    .right {
        flex-shrink: 2;
        max-width: 634px;
        box-sizing: border-box;
        padding-right: 20px;
        max-height: 996px;
        min-height: 520px;
        overflow-y: auto;

        .card {
            max-height: 480px;
            width: 100%;
            // background: url('../../../../public/images/dataplatform/customer2/workplanbg.png') no-repeat center/cover;
            margin-bottom: 18px;
            margin-top: 10px;
            min-height: 240px;
        }

        .card:last-child {
            margin-bottom: 0;
        }
    }
}
</style>