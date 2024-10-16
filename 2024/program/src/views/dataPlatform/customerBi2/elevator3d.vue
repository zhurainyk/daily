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
                            <div class="tags top">
                                <div class="people"
                                    :class="[getElevatorState(item).user, { kunren: item.priority == '01' }]">
                                </div>
                                <div class="peopleNum">{{ item.passengers > 0 ? item.passengers : '' }}</div>
                            </div>
                            <div class="main" @click="showToast(item)">
                                <div class="door-l"
                                    :class="{ doorleftopen: item.openDoor == '01', doorleftopening: item.openDoor == '03', doorleftclose: item.openDoor == '02' }"
                                    :style="{ backgroundColor: getColor(item) }"></div>
                                <div class="door-r"
                                    :class="{ doorrightopen: item.openDoor == '01', doorrightopening: item.openDoor == '03', doorrightclose: item.openDoor == '02' }"
                                    :style="{ backgroundColor: getColor(item) }"></div>
                            </div>
                            <div class="tags bottom">

                                <div class="floor">{{ item.floor }}</div>
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
    <eleinfodialog ref="eleinfo_ref3" :token="props.token"></eleinfodialog>
</template>
<script setup>

import { onMounted, reactive, ref, watch, computed, inject } from 'vue'
import {useStore} from 'vuex'
import { useRouter } from 'vue-router'
import hlsplayer from './hlsplayer.vue'
import { menulist } from '@/router/menu'
import { Swiper, SwiperSlide } from 'swiper/vue';
import eleinfodialog from './eleInfoDialog.vue'
import { Pagination, A11y, Autoplay, Mousewheel, Scrollbar } from 'swiper'
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
    show:{
        type:Boolean
    },
    token: {
        type: String
    }
})
//自动轮播的配置
const autoplayOptions = reactive({
    delay: 1000 * 10,
    disableOnInteraction: true, //鼠标移动上去就不动了
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
    // console.log(swiper);
    data.controlledSwiper = swiper;
};
let dialogVisible = ref(false)
const autoplayResume = (e) => {

    if (dialogVisible.value) {
        setTimeout(() => {
            window.$swiper3d.autoplay.pause()
        }, 500)
    }
}
// 定义弹窗 
const eleinfo_ref3 = ref()
const $bus = inject('$bus')
const showToast = (e) => {
    // $bus.emit('showToast', e)
    eleinfo_ref3.value.showToast(e)
}
const handleClose = () => {
    dialogVisible.value = false
    setTimeout(() => {
        window.$swiper3d.autoplay.run()
    }, 200)
}
const $router = useRouter()


const data = reactive({
    controlledSwiper: null,
    videoUrl: null
})

watch(()=>props.show,v=>{
    console.log(v,'监听了')
    if(v){
        caculateHeight()
    }
})
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

const Store = useStore()
const isFullscreen = computed(() => Store.state.menu.fullsreen)
 let height = 0 
const caculateHeight = ()=>{
   height = document.getElementsByClassName('elevatorway')[0]?.getBoundingClientRect().height;
    if(!isFullscreen.value){
        height = height/0.81
    } 
}
function animation(item) {
    
    if(height == 0){
        caculateHeight()
    } 
    //  const runway = height; //566-480 轨道总长度
    // const totalFloors = item.totalFloors - 1;
    // const unitLen = runway / (totalFloors)
    // const currentFloor = Math.abs(parseInt((item.floorNum == '' ? 1 : item.floorNum)) - 1);

    // let position = currentFloor * unitLen
    // position = isNaN(position) ? 0 : position
    // const lastPositioin = ((runway - position) / runway)*100
    // return lastPositioin + '%'



    const runway = height; //566-480 轨道总长度
    const totalFloors = item.totalFloors  ; //用于计算的楼层数
    const unitLen = runway / (totalFloors) //每层楼的高度
    const currentFloor = Math.abs(parseInt(((item.floorNum == ''||item.floorNum == 0 || item.floorNum == 1 ) ? 1 : item.floorNum))-1 );//所在楼层数 （计算楼层数）
    console.log(item.elevatorName,currentFloor)
    let position = currentFloor * unitLen //计算位置
    position = isNaN(position) ? 0 : position 
    let lastPositioin = runway - position   
    
    const percent = (lastPositioin / runway) * 100
    console.log(item.elevatorName,'总轨道：',runway,'总楼层：',item.totalFloors,'当前计算楼层：',item.floorNum,'显示楼层：',item.floor,'百分比',percent)
 
    let res 
    if(percent<=0){
        res = `calc( 100% - 38px - 49px )`
        
    }else if(percent > 100){
        res = `calc( 0% - 38px )`
    }else if(percent == 100){
         res = `calc( 100% - 38px - 49px )`
    }
    
    else{
        res = `calc( ${percent}% - 38px )`
    }
     
    return res

    // const runway = 733; //566-480
    // const totalFloors = item.totalFloors - 1;
    // const unitLen = runway / (totalFloors)
    // const currentFloor = Math.abs(parseInt((item.floorNum == '' ? 1 : item.floorNum)) - 1);

    // let position = currentFloor * unitLen
    // position = isNaN(position) ? 0 : position
    // const lastPositioin = runway - position
    // return lastPositioin + 'px'
    
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
    caculateHeight()
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
            height: calc(100% - 160px);
            // height: 566px;
            margin-top:30px;
            .elevatorbody {
                position: absolute;
                top: calc(100% - 86px);
                z-index: 2;
                width: 128px;
                height: 123px;
                margin-left: -51px;
                transition-duration: 4s;
                // transition-delay: 2s;
                background: url('../../../public/images/dataplatform/3d/offlinebg.png') no-repeat center/cover;



                .tags {
                    position: absolute;
                    left: 0;
                    width: 100%;
                    height: 29px;
                    display: flex;
                    justify-content: center;

                    .people {
                        width: 13px;
                        height: 29px;
                        transform: translateX(4px);
                        background: url('../../../public/images/dataplatform/3d/noperson.png') no-repeat center/cover;
                    }

                    .peopleNum {
                        width: 16px;
                        height: 12px;
                        font-size: 14px;
                        color: #23FFFC;
                        line-height: 44px;
                        transform: translateX(4px);
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
                        overflow: hidden;
                    }
                }

                .taps.top {
                    top: 0;

                }

                .tags.bottom {
                    top: 80%;


                    .floor {
                        margin-right: 0;
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
</style>
