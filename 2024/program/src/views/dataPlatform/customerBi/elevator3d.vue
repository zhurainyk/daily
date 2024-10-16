<template>
    <div class="webgl-container">
        <swiper v-if="true" class="myscroll" :direction="'horizontal'" :slides-per-view="1" :mousewheel="mousewheel"
            :space-between="10" @swiper="onSwiper" @autoplayResume="autoplayResume" :pagination="{ clickable: true }"
            :autoplay="autoplayOptions" :modules="modules">
            <swiper-slide v-for="(row, _index) in elevatorList" :key="_index" class="row">
                <div class="elevatorlist" v-for="(item, index) in row" :key="item.elevatorId">
                    <div class="elevatorname">
                        <div class="marquee">
                            <div class="marquee-wrap">
                                <div class="marquee-content " :style="{ color: getColor(item) }">
                                    {{
                                            item.elevatorName
                                    }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tags">
                        <div class="cam" :class="getVideoState(item)"></div>
                        <div class="wifi" :class="getIotState(item)"></div>
                    </div>
                    <div class="elevatorway">
                        <div class="elevatorbody" :style="{ top: animation(item) }" :class="getElevatorState(item).bg">
                            <div class="tags">
                                <div class="people"
                                    :class="[getElevatorState(item).user, { kunren: item.priority == '01' }]">
                                </div>
                                <div class="floor">{{ item.floor }}</div>
                            </div>
                            <div class="main" @click="showToast(item)">
                                <div class="door-l"
                                    :class="{ doorleftopen: item.openDoor == '01', doorleftopening: item.openDoor == '03', doorleftclose: item.openDoor == '02' }"
                                    :style="{ backgroundColor: getColor(item) }"></div>
                                <div class="door-r"
                                    :class="{ doorrightopen: item.openDoor == '01', doorrightopening: item.openDoor == '03', doorrightclose: item.openDoor == '02' }"
                                    :style="{ backgroundColor: getColor(item) }"></div>
                            </div>
                        </div>
                        <div class="elevatorbodybg">
                            <div class="l"
                                :style="{ backgroundColor: getColor(item), opacity: opacity(item), boxShadow: light(item) }">
                            </div>
                            <div class="r"
                                :style="{ backgroundColor: getColor(item), opacity: opacity(item), boxShadow: light(item) }">
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
    <el-dialog v-model="dialogVisible" show-close title="状态：正常" width="1017px" draggable :modal="false"
        :close-on-click-modal="false">
        <div class="toast">
            <div class="left">
                <div class="state">状态：
                    <span style="color:#23FFFC">{{ currentState || '无' }}</span>
                </div>
                <div class="video">
                    <!-- <videoplayers :url="data.videoUrl"></videoplayers> -->
                    <!-- <vue3player :url="data.videoUrl"></vue3player> -->
                    <hlsplayer :show="dialogVisible" :url="data.videoUrl" style="width:390px;height:235px; ">
                    </hlsplayer>
                </div>

                <div class="unitList">
                    <div class="title">零部件列表</div>
                    <div class="table">
                        <div class="tab head">
                            <div class="item">名称</div>
                            <div class="item">品牌型号</div>
                            <div class="item">数量 </div>
                            <div class="item">磨损度</div>
                        </div>
                        <el-scrollbar height="calc(100% - 50px)">
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
                <module-name style="margin-top:-10px" :moduleName="'电梯基本信息'"></module-name>
                <div class="brand">
                    <div class="brandtab">电梯编号：{{ elevatorName }} </div>
                    <div class="brandtab">品牌型号：{{ ui_brandName }} {{ ui_modelName }}</div>
                </div>
                <div class="brand">
                    <div class="brandtab">救援识别码：{{ db_rescueCode }} </div>
                    <div class="brandtab">电梯注册码：{{ db_registCode }}</div>
                </div>
                <div class="brand">
                    <div class="brandtab">联系人：{{ user1 }} {{ phone1 }} </div>
                    <div class="brandtab"> {{ user2 }} {{ phone2 }}</div>
                </div>
                <!-- <div class="brand">电梯编号：{{ elevatorName }} </div>
                <div class="brand">品牌型号：{{ ui_brandName }} {{ ui_modelName }}</div> -->
                <!-- <div class="brand">救援识别码：{{ db_rescueCode }} </div>
                <div class="brand">电梯注册码：{{ db_registCode }} </div> -->
                <!-- <div class="connectlist">
                    <div class="label">联系人：</div>
                    <div class="connect">
                        <div class="item" v-if="user1 && phone1">
                            <span class="name">{{ user1 }}</span>
                            <span class="phone">{{ phone1 }}</span>
                        </div>
                        <div class="item" v-if="user2 && phone2">
                            <span class="name">{{ user2 }}</span>
                            <span class="phone">{{ phone2 }}</span>
                        </div>
                        <div class="item" v-if="user3 && phone3">
                            <span class="name">{{ user3 }}</span>
                            <span class="phone">{{ phone3 }}</span>
                        </div>
                        <div class="item" v-if="user4 && phone4">
                            <span class="name">{{ user4 }}</span>
                            <span class="phone">{{ phone4 }}</span>
                        </div>
                    </div>
                </div> -->
                <div class="server">
                    <div class="title">服务记录</div>
                    <div class="table">
                        <el-scrollbar height="100%">
                            <div class="tab" v-for="(item, index) in $data.serviceList" :key="index"
                                @click="editDetailFn(item)">
                                <div class=" item type">{{ item.ui_taskType }}</div>
                                <div class="item name">{{ item.db_id_taskName }}</div>
                                <div class="item desc">{{ item.ui_taskStateDesc }}</div>

                                <div class="item time">{{ item.ui_dealStarttime }}</div>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
                <div class="brand" style="margin-top:3px">故障统计</div>
                <div class="graphlist" v-if="true">

                    <div class="item">
                        <pie :pieId="'toastpie1_'" :isPercent="false" :data='$data.pie1'
                            style="width:100%; height: 90%; ">
                        </pie>
                        <div class="pie-title" style="text-align:center">故障原因分析</div>

                    </div>
                    <div class="item">
                        <pie :pieId="'toastpie2_'" :isPercent="false" :data='$data.pie2'
                            style="width:100%; height: 90%; ">
                        </pie>
                        <div class="title">导致故障原因 </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="runtitle">运行走势</div>
        <div class="daylinelist">
            <div class="dayline">
                <monthline :lineId="'daylinegraph1_'" :data="$data.graph1" :interval="5" :xKey="'day'" :tooltip="'日'"
                    style="width: 230px; height: 180px; ">
                </monthline>
                <div class="graph-title">运行次数走势</div>
            </div>
            <div class="dayline">
                <monthline :lineId="'daylinegraph2_'" :data="$data.graph2" :interval="5" :xKey="'day'" :tooltip="'日'"
                    style="width: 230px; height: 180px; ">
                </monthline>
                <div class="graph-title">运行时长走势</div>
            </div>
            <div class="dayline">
                <monthline :lineId="'daylinegraph3_'" :data="$data.graph3" :interval="5" :xKey="'day'" :tooltip="'日'"
                    style="width: 230px; height: 180px; ">
                </monthline>
                <div class="graph-title">运行里程走势</div>
            </div>
            <div class="dayline">
                <monthline :lineId="'daylinegraph4_'" :data="$data.graph4" :interval="5" :xKey="'day'" :tooltip="'日'"
                    style="width: 230px; height: 180px; ">
                </monthline>
                <div class="graph-title">开门次数走势</div>
            </div>
        </div>
    </el-dialog>
</template>
<script setup>
import { getVideoUrl } from '@/api/module/customerBI'
import { selectByIdApi } from '@/api/module/elevator'
import { getLatestSysCompPartState, getLatestEnvironmentState, getTaskInfoOfOneElevDesc } from '@/api/module/dataPlatform'
import { onMounted, reactive, ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import hlsplayer from './hlsplayer.vue'
import { menulist } from '@/router/menu'
import { Swiper, SwiperSlide } from 'swiper/vue';
import vue3player from '../common/vue3player.vue'
import { Pagination, A11y, Autoplay, Mousewheel, Scrollbar } from 'swiper'
import pie from '../project/pie.vue'
import monthline from '../project/monthline.vue'
import 'swiper/css';
// import 'swiper/scss/scrollbar'
import 'swiper/scss/pagination'
const modules = [Pagination, A11y, Autoplay, Mousewheel, Scrollbar]
const props = defineProps({
    elevatorList: {
        type: Array,
        default: []
    },
    list3d: {
        type: Array,
        default: []
    },
    fixedRow3d: {
        type: Array,
        default: []
    },
    scrollRow3d: {
        type: Array,
        default: []
    },
    token: {
        type: String
    }
})
//自动轮播的配置
const autoplayOptions = reactive({
    delay: 1000 * 10,
    disableOnInteraction: false, //鼠标移动上去就不动了
    loop: true,
    // duration:1000,
    pauseOnMouseEnter: true,
    reverseDirection: false,
    mousewheel: true
})
const mousewheel = true;
const scrollbar = {
    draggable: true
}
const onSwiper = (swiper) => {
    console.log(swiper);
    data.controlledSwiper = swiper;
};
const autoplayResume = (e) => {

    if (dialogVisible.value) {
        setTimeout(() => {
            window.$swiper3d.autoplay.pause()
        }, 500)
    }
}
// 定义弹窗
let dialogVisible = ref(false)
let ui_brandName = ref('')
let ui_modelName = ref('')
let db_rescueCode = ref('')
let db_registCode = ref('')
let user1 = ref('')
let phone1 = ref('')
let user2 = ref('')
let phone2 = ref('')
let user3 = ref('')
let phone3 = ref('')
let user4 = ref('')
let phone4 = ref('')
let $data = reactive({
    allList: [],
    serviceList: [],
    pie1: [],
    pie2: [],
    graph1: [],
    graph2: [],
    graph3: [],
    graph4: [],
})
const showToast = (e) => {
    // console.log({ e })
    currentState.value = e.state_desc
    elevatorName.value = e.elevatorName
    dialogVisible.value = true
    setTimeout(() => {
        window.$swiper3d.autoplay.pause()
    }, 200)
    getUrl(e.elevatorId)
    getLatestSysCompPartState({ db_elevId: e.elevatorId, token: props.token }).then(res => {
        if (res.data.data) {
            const result = JSON.parse(res.data.data)
            const sys = JSON.parse(result.db_sysCompPartState)
            console.log(sys)
            if (sys.data) {
                $data.allList = []
                sys.data.forEach(item => {
                    $data.allList.push(...item.list)
                })

            }
        }


    })

    getLatestEnvironmentState({ db_elevId: e.elevatorId, token: props.token }).then(res => {
        // console.log(res.data.data)
    })
    getTaskInfoOfOneElevDesc({ db_elevId: e.elevatorId, token: props.token }).then(res => {
        // console.log(res.data.data)
        if (res.data.data) {
            $data.serviceList = res.data.data.objectList || [];
        }
    })
    selectByIdApi({ id: e.elevatorId }).then(res => {
        if (res.data.data) {
            // console.log(res.data.data)
            ui_modelName.value = res.data.data.db_modelElseName
            ui_brandName.value = res.data.data.db_brandElseName
            db_rescueCode.value = res.data.data.db_rescueCode
            db_registCode.value = res.data.data.db_registCode
            user1.value = res.data.data.ui_sceneUserName1
            user2.value = res.data.data.ui_sceneUserName2
            user3.value = res.data.data.ui_sceneUserName3
            user4.value = res.data.data.ui_sceneUserName4
            phone1.value = res.data.data.ui_sceneUser1Phone
            phone2.value = res.data.data.ui_sceneUser2Phone
            phone3.value = res.data.data.ui_sceneUser3Phone
            phone4.value = res.data.data.ui_sceneUser4Phone
            const _data = JSON.parse(res.data.data.db_statisticInfo)
            const { faultReason, faultReasonAnalysis, runningTimes, runningDuration, runningMileage, openDoors } = _data
            // console.log(faultReasonAnalysis, '故障原因分析')
            // console.log(faultReason, '导致故障原因')

            // console.log(runningTimes, '运行次数走势')
            // console.log(runningDuration, '运行时长走势')
            // console.log(runningMileage, '运行里程走势')
            // console.log(openDoors, '开门次数走势')
            $data.pie1 = faultReasonAnalysis.data
            $data.pie2 = faultReason.data
            $data.graph1 = runningTimes
            $data.graph2 = runningDuration
            $data.graph3 = runningMileage
            $data.graph4 = openDoors

        }
    })
}
const handleClose = () => {
    dialogVisible.value = false
    setTimeout(() => {
        window.$swiper3d.autoplay.run()
    }, 200)
}
const $router = useRouter()
const editDetailFn = args => {
    let url = $router.resolve({
        name: menulist.taskDetail.name,
        params: {
            id: args.db_id
        }
    }).href
    window.open(url, '_blank')
}
let currentState = ref('')
let elevatorName = ref('')
const data = reactive({
    controlledSwiper: null,
    videoUrl: null
})
const getUrl = (elevatorId) => {
    getVideoUrl({ elevatorId, outProtocol: 'HLS', token: props.token }).then(res => {

        if (res?.data?.data) {
            // console.log('拿到地址：', res.data.data)
            data.videoUrl = res.data.data
        } else {
            data.videoUrl = ''
        }
    })
}
const elevatorList = computed(() => {
    return props.list3d
})
watch(props.elevatorList, (v) => {
    // console.log({ v })
}, {
    deep: true,
    immediate: true
})



// const animationObj = reactive({})

const webglDom = ref('')

function getElevatorState(item) {
    // 优先级 + 电梯类型 + 是否困人
    const key = `${item.elevatorType}_${item.priority}_${item.somebody_in}`
    if (item.elevatorName == '3#') {
        console.log({ key })
    }
    // <!--   01红色闪烁  02橙色 03黄色 04紫色  05灰色 06蓝色-->
    // 01红色闪烁  02橙色 03黄色 04紫色  05灰色 06蓝色 withbugpersonbg offlinebg warningbg withbugbg normalbg stoprunbg
    // withbugperson  offline warning  withbug  normal  stoprun 

    const classes = {
        /**
            * @直梯模块
            */
        '01_01_00': {
            bg: 'withbugpersonbg',
            user: 'bugwidthperson'// 故障困人
        },
        '01_01_01': {
            bg: 'withbugpersonbg',
            user: 'bugwidthperson'// 故障困人
        },
        '01_02_00': {
            bg: 'withbugbg',  // 故障无人
            user: 'noperson'
        },
        '01_02_01': {
            bg: 'withbugbg', // 故障有人
            user: 'widthperson'
        },
        '01_03_00': {
            bg: 'warningbg', // 警告无人
            user: 'noperson'
        },
        '01_03_01': {
            bg: 'warningbg', // 警告无人有人
            user: 'widthperson'
        },

        '01_04_00': {
            bg: 'stoprunbg', // 停止服务无人
            user: 'noperson'
        },
        '01_04_01': {
            bg: 'stoprunbg', // 停止服务有人
            user: 'widthperson'
        },
        '01_05_00': {
            bg: 'offlinebg', // 离线无人
            user: 'noperson'
        },
        '01_05_01': {
            bg: 'offlinebg', // 离线有人
            user: 'widthperson'
        },
        '01_06_00': {
            bg: 'normalbg', // 正常无人
            user: 'noperson'
        },
        '01_06_01': {
            bg: 'normalbg', // 正常有人
            user: 'widthperson'
        },

        /**
         * @扶梯模块 withbugpersonbg offlinebg warningbg withbugbg normalbg stoprunbg
         *  // futiwithbugperson futioffline futiwarning futiwithbug futinormal futistoprun
         */
        '02_01_00': {
            bg: 'withbugpersonbg',
            user: 'futiwithbugperson'// 故障困人
        },
        '02_01_01': {
            bg: 'withbugpersonbg',
            user: 'futiwithbugperson'// 故障困人
        },
        '02_02_00': {
            bg: 'withbugbg',  // 故障无人
            user: 'futiwithbug'
        },
        '02_02_01': {
            bg: 'withbugbg', // 故障有人
            user: 'futiwithbug'
        },
        '02_03_00': {
            bg: 'warningbg', // 警告无人
            user: 'futiwarning'
        },
        '02_03_01': {
            bg: 'warningbg', // 警告无人有人
            user: 'futiwarning'
        },

        '02_04_00': {
            bg: 'stoprunbg', // 停止服务无人
            user: 'futistoprun'
        },
        '02_04_01': {
            bg: 'stoprunbg', // 停止服务有人
            user: 'futistoprun'
        },
        '02_05_00': {
            bg: 'offlinebg', // 离线无人
            user: 'futioffline'
        },
        '02_05_01': {
            bg: 'offlinebg', // 离线有人
            user: 'futioffline'
        },
        '02_06_00': {
            bg: 'normalbg', // 正常无人
            user: 'futinormal'
        },
        '02_06_01': {
            bg: 'normalbg', // 正常有人
            user: 'futinormal'
        },
    }
    return classes[key] || {
        bg: 'offlinebg', // 离线无人
        user: 'offlinenouser'
    }
}

function animation(item) {
    const runway = 480;
    const totalFloors = item.totalFloors - 1;
    const unitLen = runway / (totalFloors)
    const currentFloor = Math.abs(parseInt(item.floorNum) - 1);

    let position = currentFloor * unitLen
    position = isNaN(position) ? 0 : position
    const lastPositioin = runway - position
    // console.log({ lastPositioin })

    return lastPositioin + 'px'
    // if (!animationObj[item.elevatorId]) {
    //     animationObj[item.elevatorId] = {
    //         currentFloor: Math.abs(parseInt(item.floor)),
    //         totalFloors: item.totalFloors,
    //         animationqueen: [Math.abs(parseInt(item.floor))]
    //     }

    // } else {
    //     animationObj[item.elevatorId].animationqueen.push(Math.abs(parseInt(item.floor)))
    // }
    // const run = ()=>{
    //     const {animationqueen} = animationObj[item.elevatorId]
    //     if(animationqueen.length){
    //         const currentAnimation = animationqueen.shift()

    //     }
    // }
    // run()
}
const item = reactive({ "elevatorId": "1524688836977202062", "running_direction": "00", "elevatorName": "8-3", "iotState": "02", "totalFloors": "30", "priority": "02", "state_desc": "正常", "online": "01", "somebody_in": "01", "elevatorType": "01", "floor": "26F", "openDoor": "00", "projectid": "1524688836977201090", "videoState": "02" })

// const run = () => {
//     item.floor = Math.floor(Math.random() * 31)
//     item.openDoor = '0' + (Math.floor(Math.random() * 3) + 1)
//     console.log(item.openDoor)
//     setTimeout(run, 6000)
// }
// run()
function getColor(item) {
    // 01红色闪烁  02橙色 03黄色 04紫色  05灰色 06蓝色
    const key = item.priority
    const colors = {
        '01': '#FF6882',
        '02': '#FE7917',
        '03': '#FED52F',
        '04': '#B149FF',
        '05': '#999999',
        '06': '#1AC9FF', //#29B6FF
    }
    return colors[key] || '#999999'
}
const getIotState = (item) => {
    let key
    switch (item.iotState) {
        case '00': {
            key = 'nonet';
            break;
        }
        case '01': {
            key = 'offnet';
            break;
        }
        case '02': {
            key = 'onnet';
            break;
        }
    }
    return key
}
const getVideoState = (item) => {
    let key
    switch (item.videoState) {
        case '00': {
            key = 'nocam';
            break;
        }
        case '01': {
            key = 'offcam';
            break;
        }
        case '02': {
            key = 'oncam';
            break;
        }
    }
    return key
}
const customerColor = ref('#FF6882')
const light = (item) => {
    if (['01', '02', '03', '04'].includes(item.priority)) {
        return `0 0 20px 2px ${getColor(item)}`
    } else {
        return ''
    }
}
const opacity = (item) => {
    if (['01', '02', '03', '04'].includes(item.priority)) {
        return '1'
    } else {
        return '.5'
    }
}
onMounted(() => {
    window.$swiper3d = data.controlledSwiper
})
</script>
<style lang="scss" scoped>
//电梯门颜色 
//绳子颜色
//绳子发光
//电梯厢背景
$color: v-bind(customerColor);

.webgl-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;

    .row {
        display: flex;
    }

    .myscroll {
        height: calc(100% - 0px);
    }

    :deep() .swiper-pagination-bullet.swiper-pagination-bullet-active {
        background-color: rgb(25, 155, 249);
    }


    :deep() .swiper-pagination-bullet {
        background-color: rgba(26, 202, 255, 1);
    }

    :deep() .swiper-pagination-bullet {
        width: 12px;
        height: 12px;
    }

    .elevatorlist {
        // min-width: 94px;
        // max-width: 128px;
        width: clamp(94px, 124px, 124px);


        .elevatorname {
            font-size: 16px;
            text-align: center;
            width: 84px;
            box-sizing: border-box;
            margin: 0 auto;
            margin-bottom: 11px;

            .marquee {
                width: 100%;
                overflow: hidden;
            }

            .marquee .marquee-wrap {
                width: 100%;
                background-color: black;
                animation: marquee-wrap 4s infinite linear;
            }

            .marquee .marquee-content {
                float: left;
                white-space: nowrap;
                min-width: 100%;

                font-size: 16px;
                text-align: center;
                animation: marquee-content 4s infinite linear;
            }

            @keyframes marquee-wrap {

                0%,
                100% {
                    transform: translateX(0);
                }

                50% {
                    transform: translateX(100%);
                }
            }

            @keyframes marquee-content {

                0%,
                100% {
                    transform: translateX(0);
                }

                50% {
                    transform: translateX(-100%);
                }
            }
        }

        .tags {
            display: flex;
            justify-content: center;
            margin-bottom: 16px;

            .cam {
                width: 19px;
                height: 22px;
                background: url('../../../public/images/dataplatform/3d/nocam.png') no-repeat center/cover;
                margin-right: 7px;

            }

            .cam.nocam {
                background: url('../../../public/images/dataplatform/3d/nocam.png') no-repeat center/cover;
            }

            .cam.offcam {
                background: url('../../../public/images/dataplatform/3d/offcam.png') no-repeat center/cover;
            }

            .cam.oncam {
                background: url('../../../public/images/dataplatform/3d/oncam.png') no-repeat center/cover;
            }

            .wifi {
                width: 21px;
                height: 19px;
                margin-left: 7px;
                background: url('../../../public/images/dataplatform/3d/nonet.png') no-repeat center/cover;
            }

            .wifi.nonet {
                background: url('../../../public/images/dataplatform/3d/nonet.png') no-repeat center/cover;
            }

            .wifi.offnet {
                background: url('../../../public/images/dataplatform/3d/offnet.png') no-repeat center/cover;
            }

            .wifi.onnet {
                background: url('../../../public/images/dataplatform/3d/onnet.png') no-repeat center/cover;
            }
        }

        .elevatorway {
            position: relative;
            width: 26px;
            // border-left: 1px solid rgba(92, 191, 253, .5);
            // border-right: 1px solid rgba(92, 191, 253, .5);
            margin: 0 auto;
            height: 566px;

            .elevatorbody {
                position: absolute;
                top: 480px;
                z-index: 2;
                width: 128px;
                height: 123px;
                margin-left: -51px;
                transition-duration: 4s;
                // transition-delay: 2s;
                background: url('../../../public/images/dataplatform/3d/offlinebg.png') no-repeat center/cover;

                .tags {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 29px;
                    display: flex;
                    justify-content: space-between;

                    .people {
                        width: 13px;
                        height: 29px;
                        margin-left: 44.6px;
                        background: url('../../../public/images/dataplatform/3d/noperson.png') no-repeat center/cover;
                    }

                    .people.bugwidthperson {
                        background: url('../../../public/images/dataplatform/3d/bugperson.png') no-repeat center/cover;
                    }

                    .people.kunren.bugwidthperson {
                        // box-shadow: 0 0 5px 1px #fff;
                        animation: kunren .5s infinite;
                    }

                    @keyframes kunren {
                        0% {
                            opacity: .3;
                        }

                        100% {
                            opacity: 1;
                        }
                    }

                    .people.widthperson {
                        background: url('../../../public/images/dataplatform/3d/person.png') no-repeat center/cover;
                    }

                    .people.noperson {
                        background: url('../../../public/images/dataplatform/3d/noperson.png') no-repeat center/cover;
                    }

                    .floor {
                        width: 26px;
                        height: 26px;
                        margin-right: 39px;
                        background: #34455D;
                        border-radius: 50%;
                        line-height: 26px;
                        text-align: center;
                        color: #23FFFC;
                        font-size: 14px;
                    }
                }

                .main {
                    position: absolute;
                    bottom: 33px;
                    left: 33.5px;
                    width: 51px;
                    height: 51px;
                    cursor: pointer;
                    // background-color: #009AFC;
                    display: flex;
                    justify-content: space-between;
                    overflow: hidden;

                    div {
                        width: 23.5px;
                        height: 100%;
                        background-color: #009AFC;
                    }

                    .door-l {
                        animation: doorleftclose 2s 1 forwards ease-in-out !important;
                    }

                    .door-l.doorleftopen {
                        animation: doorleftopen 2s 1 forwards ease-in-out !important;
                    }

                    .door-l.doorleftopening {
                        //开门中
                        // animation: doorleftopening 2s 1 forwards ease-in-out !important;
                    }

                    .door-l.doorleftclose {
                        // animation: doorleftclose 2s 1 forwards ease-in-out !important;
                    }

                    // 左侧半开门动画
                    @keyframes doorleftopening {
                        0% {
                            margin-left: 0;

                        }

                        100% {
                            margin-left: -10px;
                        }
                    }

                    //左侧完成开们动画
                    @keyframes doorleftopen {
                        0% {
                            margin-left: 0;

                        }

                        100% {
                            margin-left: -20.5px;
                        }
                    }

                    //左侧关门动画
                    @keyframes doorleftclose {
                        0% {
                            margin-left: -20px;
                        }

                        100% {
                            margin-left: 0;

                        }


                    }


                    .door-r {
                        animation: doorrightclose 2s 1 forwards ease-in-out !important;
                    }

                    .door-r.doorrightopening {
                        // animation: doorrightopening 2s 1 forwards ease-in-out !important;
                    }

                    .door-r.doorrightopen {
                        animation: doorrightopen 2s 1 forwards ease-in-out !important;
                    }

                    .door-r.doorrightclose {
                        // animation: doorrightclose 2s 1 forwards ease-in-out !important;
                    }

                    //右侧半开门动画
                    @keyframes doorrightopening {
                        0% {
                            margin-right: 0;

                        }

                        100% {
                            margin-right: -10px;
                        }
                    }

                    //右侧完成开门动画
                    @keyframes doorrightopen {
                        0% {
                            margin-right: 0;

                        }

                        100% {
                            margin-right: -20px;
                        }
                    }

                    //右侧完成关门动画
                    @keyframes doorrightclose {


                        0% {
                            margin-right: -19px;
                        }

                        100% {
                            margin-right: 0;

                        }
                    }
                }
            }

            .elevatorbody.withbugpersonbg {
                background: url('../../../public/images/dataplatform/3d/withbugpersonbg.png') no-repeat center/cover;
            }

            .elevatorbody.offlinebg {
                background: url('../../../public/images/dataplatform/3d/offlinebg.png') no-repeat center/cover;
            }

            .elevatorbody.warningbg {
                background: url('../../../public/images/dataplatform/3d/warningbg.png') no-repeat center/cover;
            }

            .elevatorbody.withbugbg {
                background: url('../../../public/images/dataplatform/3d/withbugbg.png') no-repeat center/cover;
            }

            .elevatorbody.normalbg {
                background: url('../../../public/images/dataplatform/3d/normalbg.png') no-repeat center/cover;
            }

            .elevatorbody.stoprunbg {
                background: url('../../../public/images/dataplatform/3d/stoprunbg.png') no-repeat center/cover;
            }

            .elevatorbodybg {
                position: absolute;
                top: 0;
                left: -13px;
                width: 54px;
                height: 100%;
                display: flex;
                justify-content: space-between;

                div {
                    width: 1px;
                    height: 100%;
                    // background-color: $color;
                    // box-shadow: 0 0 20px 2px $color;
                }
            }
        }






    }
}

.toast {
    width: 100%;
    height: 630px;
    user-select: text;
    background-color: rgba(0, 0, 0, 1);
    color: #fff;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 20px;

    .left {
        width: 391px;

        .video {
            width: 100%;
            height: 255px;
        }

        .unitList {
            .title {
                line-height: 40px;
                font-size: 14px;
            }

            .table {
                width: 100%;
                height: 260px;
                border: 1px solid rgba(22, 99, 180, .5);

                .tab {
                    display: flex;

                    .item {
                        justify-content: space-around;
                        text-align: center;
                        line-height: 40px;
                        color: #fff;
                        font-size: 12px;
                        width: 33.3%;
                    }
                }

                .tab.head .item {
                    color: #fff;
                }
            }
        }
    }

    .right {
        width: 556px;

        .brand {
            line-height: 27px;
            display: flex;
            justify-content: space-between;

            .brandtab {
                width: 50%;
            }
        }

        .connectlist {
            display: flex;
            line-height: 28px;

            .label {
                width: 60px;
            }

            .connect {
                width: calc(100% - 160px);
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;

                .item {
                    width: 50%;
                }
            }

        }




        .server {
            .title {
                line-height: 35px;
            }

            .table {
                border: 1px solid rgba(22, 99, 180, .5);
                height: 144px;
                width: 100%;
                box-sizing: border-box;

                .tab:hover {
                    background: #29b8ff6b;
                }

                .tab {
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    width: 100%;
                    margin: 8px 0;
                    cursor: pointer;

                    .item {}

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
                    }
                }
            }


        }



        .graphlist {
            height: 261px;
            border: 1px solid rgba(22, 99, 180, .5);
            display: flex;
            margin-top: 8px;
            justify-content: space-around;

            .item {
                width: 48%;

                .graph {
                    height: calc(100% - 0px);
                }

                .title {
                    line-height: 30px;
                    text-align: center;
                    color: #C0DFFF;
                    font-size: 12px;
                }

            }
        }
    }
}

.runtitle {
    margin-top: -20px;
    text-indent: 20px;
    color: #fff;
}

.daylinelist {
    width: 100%;
    height: 220px;
    // background-color: #fff;
    display: flex;
    justify-content: space-evenly;

    .dayline {
        width: 20%;
        height: 100%;

        div {
            text-align: center;
            color: #fff;
        }
    }
}
</style>