<template>
    <div id="mainstate">
        <div class="totalstates">
            <div class="total">
                <div class="dianti" :class="{ checked: checkState.elevatorType == '01' }"
                    @click='groupByPriority("", "01")'>
                    <i class="icon-tianti"></i>
                    总数（{{ eleTotal.elevatorTotal }}）
                </div>
                <div class="futi" :class="{ checked: checkState.elevatorType == '02' }" @click='groupByPriority("", "02")'>
                    <i class="icon-futi"></i>
                    总数（{{ eleTotal.escalatorTotal }}）
                </div>
            </div>
            <div class="states">
                <div class="online" :class="{ checked: checkState.priority == '06' }" @click='groupByPriority("06", "")'>
                    <i class="icon-online"></i>
                    正常（{{ eleTotal.onlineTotal }}）
                </div>
                <div class="offline" :class="{ checked: checkState.priority == '05' }" @click='groupByPriority("05", "")'>
                    <!-- 灰色 -->
                    <i class="icon-offline"></i>
                    离线（{{ eleTotal.offlineTotal }}）
                </div>
                <div class="warning" :class="{ checked: checkState.priority == '04' }" @click='groupByPriority("04", "")'>
                    <!-- 紫色 -->
                    <i class="icon-warning"></i>
                    停运（{{ eleTotal.stopTotal }}）
                </div>
                <div class="service" :class="{ checked: checkState.priority == '03' }" @click='groupByPriority("03", "")'>
                    <i class="icon-service "></i>
                    <!-- 黄色   -->
                    预警（{{ eleTotal.warningTotal }}）
                </div>

                <div class="bug" :class="{ checked: checkState.priority == '02' }" @click='groupByPriority("02", "")'>
                    <!-- 橙色   -->
                    <i class="icon-bug"></i>
                    故障（{{ eleTotal.problemTotal }}）
                </div>
                <div class="bug" :class="{ checked: checkState.priority == '01' }" @click='groupByPriority("01", "")'>
                    <!-- 红色   -->
                    <i class="icon-bugperson"></i>
                    困人（{{ eleTotal.trappedTotal }}）
                </div>
            </div>
        </div>
        <div class="mainlist" id='mainList'>
            <div class="d2_d3" v-show="d2_d3">
                <div v-if="groupList.fixedRow.length < eleSize">
                    <div v-for="(row, _index) in groupList.fixedRow" :key="_index" class="row"
                        :class="{ 'sticky': row.find(item => item.priority == '01') }">
                        <div v-for="(item, index) in row" @click="showToast(item)" :key="index" class="elevatorItem"
                            :class="{ marginleft: index == 0 && !isFullscreen, fullscreen: isFullscreen }">
                            <!-- priority背景 01红色闪烁  02橙色 03黄色 04紫色  05灰色 06蓝色  -->
                            <div class="item itemrect" :class="getElevatorState(item).bg">
                                <div class="elevator">
                                    <div class="name">
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
                                    <div class="elevatorstate">
                                        <div class="elevatortype " :class="getElevatorState(item).user">
                                            <!-- 是否有人 优先级最高01 且是直梯01-->
                                            <div v-if="item.priority == '01' || item.somebody_in == '01'" class="withperson"
                                                :class="{ rect: item.elevatorType == '01' && item.priority == '01' ? true : false, personwidth: item.elevatorType == '02' }">
                                            </div>
                                            <div class="peopleNum">{{ item.passengers > 0 ? item.passengers : '' }}</div>
                                            <div class="detail" :style="{ color: getColor(item) }">
                                                <div class="detailTitle">
                                                    <span class="name">楼层： </span>
                                                    <span class="value">{{ item.floor }}</span>
                                                </div>
                                                <div class="detailTitle">
                                                    <span class="name">方向：</span>
                                                    <span class="value">{{
                                                        item.running_direction == '01' ? '上行' :
                                                        item.running_direction == '02' ? '下行' : '无'
                                                    }}</span>
                                                </div>
                                                <div class="detailTitle">
                                                    <span class="name">是否有人：</span>
                                                    <span class="value">{{
                                                        item.somebody_in == '01' ? '是' : '否'
                                                    }}</span>
                                                </div>
                                                <div class="detailTitle">
                                                    <span class="name">开关门：</span>
                                                    <span class="value">{{ item.openDoor == '01' ? '开门' : '关门' }}</span>
                                                </div>
                                                <div class="detailTitle">
                                                    <span class="name">状态：</span>
                                                    <span class="value" :title="item.state_desc">{{
                                                        item.state_desc
                                                    }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="btnstate">
                                    <!-- 电梯上下行箭头  elevatorType=1 才显示电梯箭头-->
                                    <div class="updown"
                                        :style="{ visibility: item.elevatorType == 1 ? 'visible' : 'hidden' }">
                                        <div class="up">
                                            <!-- run 开启电梯上下行动画 -->
                                            <!-- <i class="up-icon" :class="{ run:true }"></i> -->
                                            <i class="up-icon" :class="{ run: item.running_direction == '01' }"></i>
                                        </div>
                                        <div class="down">
                                            <i class="down-icon  " :class="{ run: item.running_direction == '02' }"></i>
                                        </div>
                                    </div>
                                    <!-- 电梯上下行箭头end -->

                                    <!-- 电梯楼层显示&扶梯上下行箭头 -->
                                    <div class="floor">
                                        <!-- 楼层显示 -->
                                        <div v-show="item.elevatorType == 1" class="num">{{ item.floor }}</div>
                                        <!-- 扶梯上下行箭头 -->
                                        <div v-show="item.elevatorType == 2" class="futi-updown">
                                            <!-- run 开启扶梯动画 -->
                                            <div class="futi-up " :class="{ run: item.running_direction == '01' }">
                                            </div>
                                            <div class="futi-down " :class="{ run: item.running_direction == '02' }">
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 电梯楼层显示&扶梯上下行箭头 end-->
                                    <!-- 电梯开关门  -->
                                    <div v-show="item.elevatorType == 1" class="door">
                                        <div class="door-l">
                                            <!-- run 开启动画  openDoor-->
                                            <i class="icon-door-l close"
                                                :class="{ run: item.openDoor == '01', opening: item.openDoor == '03', closing: item.openDoor == '02' }"></i>
                                        </div>
                                        <div class="door-r">
                                            <i class="icon-door-r close"
                                                :class="{ run: item.openDoor == '01', opening: item.openDoor == '03', closing: item.openDoor == '02' }"></i>
                                        </div>
                                    </div>
                                    <!-- 电梯开关门 end  -->
                                    <!-- 物联网状态 00：未安装 01：已安装 02：在线 -->
                                    <div class="iotState" :class="getIotState(item)">
                                    </div>
                                    <!-- 摄像头状态 00：未安装 01：已安装 02：在线 -->
                                    <div class="videoState" :class="getVideoState(item)">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <template v-else>
                    <el-scrollbar class="scrollheight2">
                        <div v-for="(row, _index) in groupList.list" :key="_index" class="row">
                            <div v-for="(item, index) in row" @click="showToast(item)" :key="index" class="elevatorItem"
                                :class="{ marginleft: index == 0 && !isFullscreen, fullscreen: isFullscreen }">
                                <!-- priority背景 01红色闪烁  02橙色 03黄色 04紫色  05灰色 06蓝色 -->
                                <div class="item itemrect" :class="getElevatorState(item).bg">
                                    <div class="elevator">
                                        <div class="name">
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
                                        <div class="elevatorstate">
                                            <div class="elevatortype " :class="getElevatorState(item).user">
                                                <!-- 是否有人 优先级最高01 且是直梯01-->
                                                <div v-if="item.priority == '01' || item.somebody_in == '01'"
                                                    class="withperson"
                                                    :class="{ rect: item.elevatorType == '01' && item.priority == '01' ? true : false, personwidth: item.elevatorType == '02' }">
                                                </div>
                                                <div class="peopleNum">{{ item.passengers > 0 ? 5 : '5' }}
                                                </div>
                                                <div class="detail" :style="{ color: getColor(item) }">
                                                    <div class="detailTitle">
                                                        <span class="name">楼层：</span>
                                                        <span class="value">{{ item.floor }}</span>
                                                    </div>
                                                    <div class="detailTitle">
                                                        <span class="name">方向：</span>
                                                        <span class="value">{{
                                                            item.running_direction == '01' ? '上行' :
                                                            item.running_direction == '02' ? '下行' : '无'
                                                        }}</span>
                                                    </div>
                                                    <div class="detailTitle">
                                                        <span class="name">是否有人：</span>
                                                        <span class="value">{{
                                                            item.somebody_in == '01' ? '是' : '否'
                                                        }}</span>
                                                    </div>
                                                    <div class="detailTitle">
                                                        <span class="name">开关门：</span>
                                                        <span class="value">{{
                                                            item.openDoor == '01' ? '开门' : '关门'
                                                        }}</span>
                                                    </div>
                                                    <div class="detailTitle">
                                                        <span class="name">状态：</span>
                                                        <span class="value">{{ item.state_desc }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="btnstate">
                                        <!-- 电梯上下行箭头  elevatorType=1 才显示电梯箭头-->
                                        <div class="updown"
                                            :style="{ visibility: item.elevatorType == 1 ? 'visible' : 'hidden' }">
                                            <div class="up">
                                                <!-- run 开启电梯上下行动画 -->
                                                <!-- <i class="up-icon" :class="{ run: true }"></i> -->
                                                <i class="up-icon" :class="{ run: item.running_direction == '01' }"></i>
                                            </div>
                                            <div class="down">
                                                <i class="down-icon  " :class="{ run: item.running_direction == '02' }"></i>
                                            </div>
                                        </div>
                                        <!-- 电梯上下行箭头end -->

                                        <!-- 电梯楼层显示&扶梯上下行箭头 -->
                                        <div class="floor">
                                            <!-- 楼层显示 -->
                                            <div v-show="item.elevatorType == 1" class="num">{{ item.floor }}</div>
                                            <!-- 扶梯上下行箭头 -->
                                            <div v-show="item.elevatorType == 2" class="futi-updown">
                                                <!-- run 开启扶梯动画 -->
                                                <div class="futi-up " :class="{ run: item.running_direction == '01' }">
                                                </div>
                                                <div class="futi-down " :class="{ run: item.running_direction == '02' }">
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 电梯楼层显示&扶梯上下行箭头 end-->
                                        <!-- 电梯开关门  -->
                                        <div v-show="item.elevatorType == 1" class="door">
                                            <div class="door-l">
                                                <!-- run 开启动画  openDoor-->
                                                <i class="icon-door-l close"
                                                    :class="{ run: item.openDoor == '01', opening: item.openDoor == '03', closing: item.openDoor == '02' }"></i>
                                            </div>
                                            <div class="door-r">
                                                <i class="icon-door-r close"
                                                    :class="{ run: item.openDoor == '01', opening: item.openDoor == '03', closing: item.openDoor == '02' }"></i>
                                            </div>
                                        </div>
                                        <!-- 电梯开关门 end  -->
                                        <!-- 物联网状态 00：未安装 01：已安装 02：在线 -->
                                        <div class="iotState" :class="getIotState(item)">
                                        </div>
                                        <!-- 摄像头状态 00：未安装 01：已安装 02：在线 -->
                                        <div class="videoState" :class="getVideoState(item)">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>
                </template>
                <!-- 滚动列表 -->
                <el-scrollbar class="scrollheight" v-if="groupList.fixedRow.length < eleSize">
                    <swiper class="myscroll" :direction="'vertical'" :slides-per-view="eleSize - groupList.fixedRow.length"
                        :mousewheel="mousewheel" :space-between="10" @swiper="onSwiper" @autoplayPause="autoplayPause"
                        @autoplayStart="autoplayStart" @autoplayResume="autoplayResume" :pagination="true"
                        :scrollbar='scrollbar' :autoplay="autoplayOptions" :modules="modules">
                        <swiper-slide v-for="(row, _index) in groupList.scrollRow" :key="_index" class="row">
                            <div v-for="(item, index) in row" @click="showToast(item)" :key="index" class="elevatorItem"
                                :class="{ marginleft: index == 0 && !isFullscreen, fullscreen: isFullscreen }">
                                <!-- priority背景 01红色闪烁  02橙色 03黄色 04紫色  05灰色 06蓝色  -->
                                <div class="item itemrect" :class="getElevatorState(item).bg">
                                    <div class="elevator">
                                        <div class="name">
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
                                        <div class="elevatorstate">
                                            <div class="elevatortype " :class="getElevatorState(item).user">
                                                <!-- 是否有人 优先级最高01 且是直梯01-->
                                                <div v-if="item.priority == '01' || item.somebody_in == '01'"
                                                    class="withperson"
                                                    :class="{ rect: item.elevatorType == '01' && item.priority == '01' ? true : false, personwidth: item.elevatorType == '02' }">
                                                </div>
                                                <div class="peopleNum">{{ item.passengers > 0 ? item.passengers : '' }}
                                                </div>
                                                <div class="detail" :style="{ color: getColor(item) }">
                                                    <div class="detailTitle">
                                                        <span class="name">楼层：</span>
                                                        <span class="value">{{ item.floor }}</span>
                                                    </div>
                                                    <div class="detailTitle">
                                                        <span class="name">方向：</span>
                                                        <span class="value">{{
                                                            item.running_direction == '01' ? '上行' :
                                                            item.running_direction == '02' ? '下行' : '无'
                                                        }}</span>
                                                    </div>
                                                    <div class="detailTitle">
                                                        <span class="name">是否有人：</span>
                                                        <span class="value">{{
                                                            item.somebody_in == '01' ? '是' : '否'
                                                        }}</span>
                                                    </div>
                                                    <div class="detailTitle">
                                                        <span class="name">开关门：</span>
                                                        <span class="value">{{
                                                            item.openDoor == '01' ? '开门' : '关门'
                                                        }}</span>
                                                    </div>
                                                    <div class="detailTitle">
                                                        <span class="name">状态：</span>
                                                        <span class="value">{{ item.state_desc }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="btnstate">
                                        <!-- 电梯上下行箭头  elevatorType=1 才显示电梯箭头-->
                                        <div class="updown"
                                            :style="{ visibility: item.elevatorType == 1 ? 'visible' : 'hidden' }">
                                            <div class="up">
                                                <!-- run 开启电梯上下行动画 -->
                                                <!-- <i class="up-icon" :class="{ run: true }"></i> -->
                                                <i class="up-icon" :class="{ run: item.running_direction == '01' }"></i>
                                            </div>
                                            <div class="down">
                                                <i class="down-icon  " :class="{ run: item.running_direction == '02' }"></i>
                                            </div>
                                        </div>
                                        <!-- 电梯上下行箭头end -->

                                        <!-- 电梯楼层显示&扶梯上下行箭头 -->
                                        <div class="floor">
                                            <!-- 楼层显示 -->
                                            <div v-show="item.elevatorType == 1" class="num">{{ item.floor }}</div>
                                            <!-- 扶梯上下行箭头 -->
                                            <div v-show="item.elevatorType == 2" class="futi-updown">
                                                <!-- run 开启扶梯动画 -->
                                                <div class="futi-up " :class="{ run: item.running_direction == '01' }">
                                                </div>
                                                <div class="futi-down " :class="{ run: item.running_direction == '02' }">
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 电梯楼层显示&扶梯上下行箭头 end-->
                                        <!-- 电梯开关门  -->
                                        <div v-show="item.elevatorType == 1" class="door">
                                            <div class="door-l">
                                                <!-- run 开启动画  openDoor-->
                                                <i class="icon-door-l close"
                                                    :class="{ run: item.openDoor == '01', opening: item.openDoor == '03', closing: item.openDoor == '02' }"></i>
                                            </div>
                                            <div class="door-r">
                                                <i class="icon-door-r close"
                                                    :class="{ run: item.openDoor == '01', opening: item.openDoor == '03', closing: item.openDoor == '02' }"></i>
                                            </div>
                                        </div>
                                        <!-- 电梯开关门 end  -->
                                        <!-- 物联网状态 00：未安装 01：已安装 02：在线 -->
                                        <div class="iotState" :class="getIotState(item)">
                                        </div>
                                        <!-- 摄像头状态 00：未安装 01：已安装 02：在线 -->
                                        <div class="videoState" :class="getVideoState(item)">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </el-scrollbar>
            </div>

            <div v-show="!d2_d3" style="width:100%;height:100% ;margin-top:15px ">
                <elevator3d :elevatorList="evevatorList" :token="props.token" :list3d="groupList.list3d"
                :show='!d2_d3'
                    :fixedRow3d="groupList.fixedRow3d" :scrollRow3d="groupList.scrollRow3d"></elevator3d>
            </div>
            <el-switch class="d2d3 mb-2" size="large" v-model="d2_d3" inline-prompt
                style="--el-switch-off-color: rgb(25,155,249); --el-switch-on-color: rgb(25,155,249)" active-text="2D"
                inactive-text="3D" />
        </div>
    </div>
    <eleinfodialog ref="eleinfo_ref2" :token="props.token"></eleinfodialog>
</template>

<script   setup>

import { ref, reactive, computed, watch, defineProps, nextTick, onMounted, inject } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import hlsplayer from './hlsplayer.vue'

import { Swiper, SwiperSlide } from 'swiper/vue';
import vue3player from '../common/vue3player.vue'
import { Pagination, A11y, Autoplay, Mousewheel, Scrollbar } from 'swiper'
import 'swiper/css';
import eleinfodialog from './eleInfoDialog.vue'
import 'swiper/scss/scrollbar'
import { menulist } from '@/router/menu'
import syscontroller from '@/api/module/syscontroller'
import pie from '../project/pie.vue'
import monthline from '../project/monthline.vue'
import elevator3d from './elevator3d.vue'
import moment from 'moment'
const eleinfo_ref2 = ref()
const modules = [Pagination, A11y, Autoplay, Mousewheel, Scrollbar]
const d2_d3 = ref(true)
const props = defineProps({
    data: {
        type: Object,
        // eslint-disable-next-line vue/require-valid-default-prop
        default: []
    },
    total: {
        type: Object,
        // eslint-disable-next-line vue/require-valid-default-prop
        default: {}
    },
    token: {
        type: String,
        default: null
    },
})

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
const autoplayPause = (e) => {

}
const $router = useRouter()
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
const autoplayStart = (e) => {

}
const autoplayResume = (e) => {
    if (dialogVisible.value) {
        setTimeout(() => {
            window.$swiper.autoplay.pause()
        }, 500)
    }
}
const getLostDegree = (item) => {
    let str = ''
    switch (item.ui_lossDegree) {
        case '00': {
            str = '正常'
            break;
        }
        case '20': {
            str = '轻微损耗'
            break;
        }
        case '50': {
            str = '中度损耗'
            break;
        }
        case '80': {
            str = '重度损耗'
            break;
        }
        case '100': {
            str = '需更换'
            break;
        }
    }
    return str
}


// 定义弹窗
let dialogVisible = ref(false)
const handleClose = () => {
    dialogVisible.value = false
    setTimeout(() => {
        window.$swiper.autoplay.run()
    }, 200)
}

const showToast = (e) => {
    $bus.emit('toastState', true)
    eleinfo_ref2.value.showToast(e)
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


const scrollHeight = computed(() => {
    return (eleSize.value - groupList.fixedRow.length) * eleHeight + 'px'
})
const scrollHeight2 = computed(() => {
    return eleSize.value * eleHeight + 'px'
})
const orderType = computed(() => props.orderType)

const Store = useStore()
const isFullscreen = computed(() => Store.state.menu.fullsreen)
const eleTotal = computed(() => props.total || {})

function getElevatorState(item) {
    // 优先级 + 电梯类型 + 是否困人
    const key = `${item.elevatorType}_${item.priority}_${item.somebody_in}`

    // <!-- priority 01红色闪烁  02红色 03橙色 04黄色  05灰色 06蓝色  -->
    // 01红色闪烁  02橙色 03黄色 04紫色  05灰色 06蓝色 withbugpersonbg offlinebg warningbg withbugbg normalbg stoprunbg
    // withbugperson  offline warning  withbug  normal  stoprun 

    const classes = {
        /**
            * @直梯模块
            */
        '01_01_00': {
            bg: 'withbugpersonbg',
            user: 'withbugperson'// 故障困人
        },
        '01_01_01': {
            bg: 'withbugpersonbg',
            user: 'withbugperson'// 故障困人
        },
        '01_02_00': {
            bg: 'withbugbg',  // 故障无人
            user: 'withbug'
        },
        '01_02_01': {
            bg: 'withbugbg', // 故障有人
            user: 'withbug'
        },
        '01_03_00': {
            bg: 'warningbg', // 警告无人
            user: 'warning'
        },
        '01_03_01': {
            bg: 'warningbg', // 警告无人有人
            user: 'warning'
        },

        '01_04_00': {
            bg: 'stoprunbg', // 停止服务无人
            user: 'stoprun'
        },
        '01_04_01': {
            bg: 'stoprunbg', // 停止服务有人
            user: 'stoprun'
        },
        '01_05_00': {
            bg: 'offlinebg', // 离线无人
            user: 'offline'
        },
        '01_05_01': {
            bg: 'offlinebg', // 离线有人
            user: 'offline'
        },
        '01_06_00': {
            bg: 'normalbg', // 正常无人
            user: 'normal'
        },
        '01_06_01': {
            bg: 'normalbg', // 正常有人
            user: 'normal'
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
    return colors[key]
}
const testList = [
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
]



/**
 * @author huangjf
 * @description 校正windows页面在系统进行缩放后导致页面被放大的问题，通常放大比例是125%、150%
 * **/
class DevicePixelRatio {
    constructor() {
        //this.flag = false;
    }
    //获取系统类型
    _getSystem() {
        let flag = false;
        var agent = navigator.userAgent.toLowerCase();
        //      var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
        //      if(isMac) {
        //          return false;
        //      }
        //现只针对windows处理，其它系统暂无该情况，如有，继续在此添加
        if (agent.indexOf("windows") >= 0) {
            return true;
        }
    }
    //获取页面缩放比例
    //  _getDevicePixelRatio() {
    //      let t = this;
    //  }
    //监听方法兼容写法
    _addHandler(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    }
    //校正浏览器缩放比例
    _correct() {
        let t = this;
        //页面devicePixelRatio（设备像素比例）变化后，计算页面body标签zoom修改其大小，来抵消devicePixelRatio带来的变化。
        // document.getElementsByTagName('body')[0].style.zoom = 1 / window.devicePixelRatio;
        document.getElementsByClassName('mainlist')[0].style.zoom = 1 / window.devicePixelRatio;
    }
    //监听页面缩放
    _watch() {
        let t = this;
        t._addHandler(window, 'resize', function () { //注意这个方法是解决全局有两个window.resize
            //重新校正
            t._correct()
        })
    }
    //初始化页面比例
    init() {
        let t = this;
        if (t._getSystem()) { //判断设备，目前只在windows系统下校正浏览器缩放比例
            //初始化页面校正浏览器缩放比例
            t._correct();
            //开启监听页面缩放
            t._watch();
        }
    }
}


const groupList = reactive({
    list: [],// 总列表
    fixedRow: [],// 固定
    scrollRow: [],// 滚动
    list3d: [],
    fixedRow3d: [],
    scrollRow3d: []
})
const evevatorList = computed(() => props.data)
const Slice = 5//分组常量
let Slice3D = 10//3d分组常量

const checkState = reactive({ //点击背景常量
    priority: '06',
    elevatorType: ''
})
watch(evevatorList, list => {
    const priority = checkState.priority
    const elevatorType = checkState.elevatorType
    groupByPriority(priority, elevatorType)
}, {
    deep: true,
    immediate: true
})

function groupByLen(arr = [], len = 5, bool) {
    const group = []
    for (let i = 0; i < arr.length; i += len) {
        group.push(arr.slice(i, i + len))
    }
    return group
}
function slice2D3D(newval) {
    {
        groupList.list = []
        groupList.fixedRow = []
        groupList.scrollRow = []
        const fixCode = (orderType.value == '00') ? ['01', '02', '03', '04'] : [] //固定列表的code 
        // eslint-disable-next-line array-callback-return
        const fixedRowLength = newval.reduce((pre, cur) => {
            if (fixCode.includes(cur.priority)) {
                return pre + 1
            }
            return pre
        }, 0)
        let prefixneed = 0;
        if (fixedRowLength % Slice > 0) {
            // console.log('需要替补', 5 - fixedRowLength % 5)
            prefixneed = Slice - fixedRowLength % Slice
        }
        let fixedRowTemp = []
        let listTmep = []
        newval.forEach((item, index) => {
            if (fixCode.includes(item.priority)) {
                fixedRowTemp.unshift(item)//前置插入
                listTmep.unshift(item)//前置插入
            } else {
                listTmep.push(item)//普通列表后置插入
                if (prefixneed > 0) { //补满Slice个
                    fixedRowTemp.push(item)//替补靠后
                    prefixneed--
                } else {
                    groupList.scrollRow.push(item)
                }

            }
        })
        fixedRowTemp.forEach(item => {
            if (fixCode.includes(item.priority)) {
                groupList.fixedRow.unshift(item)
            } else {
                groupList.fixedRow.push(item)
            }

        })
        listTmep.forEach(item => {
            if (fixCode.includes(item.priority)) {
                groupList.list.unshift(item)
            } else {
                groupList.list.push(item)
            }

        })
        groupList.fixedRow = groupList.fixedRow.sort((a, b) => a.priority - b.priority) //升序
        groupList.list = groupByLen(groupList.list, Slice)
        groupList.fixedRow = groupByLen(groupList.fixedRow, Slice, false)// 固定列表分组  不够Slice个的补替
        groupList.scrollRow = groupByLen(groupList.scrollRow, Slice, true)//滚动列表
    }
    {
        groupList.list3d = []
        groupList.fixedRow3d = []
        groupList.scrollRow3d = []
        const fixCode = (orderType.value == '00') ? ['01', '02', '03', '04'] : [] //固定列表的code   orderType排序方式
        // eslint-disable-next-line array-callback-return
        const fixedRowLength = newval.reduce((pre, cur) => {
            if (fixCode.includes(cur.priority)) {
                return pre + 1
            }
            return pre
        }, 0)
        let prefixneed = 0;
        if (fixedRowLength % Slice3D > 0) {
            // console.log('需要替补', 5 - fixedRowLength % 5)
            prefixneed = Slice3D - fixedRowLength % Slice3D
        }
        let fixedRowTemp = []
        let listTmep = []
        newval.forEach((item, index) => {
            if (fixCode.includes(item.priority)) {
                fixedRowTemp.unshift(item)//前置插入
                listTmep.unshift(item)//前置插入
            } else {
                listTmep.push(item)//普通列表后置插入
                if (prefixneed > 0) { //补满Slice个
                    fixedRowTemp.push(item)//替补靠后
                    prefixneed--
                } else {
                    groupList.scrollRow3d.push(item)
                }

            }
        })
        fixedRowTemp.forEach(item => {
            if (fixCode.includes(item.priority)) {
                groupList.fixedRow3d.unshift(item)
            } else {
                groupList.fixedRow3d.push(item)
            }

        })
        listTmep.forEach(item => {
            if (fixCode.includes(item.priority)) {
                groupList.list3d.unshift(item)
            } else {
                groupList.list3d.push(item)
            }

        })
        groupList.fixedRow3d = groupList.fixedRow3d.sort((a, b) => a.priority - b.priority) //升序
        groupList.list3d = groupByLen(groupList.list3d, Slice3D)
        groupList.fixedRow3d = groupByLen(groupList.fixedRow3d, Slice3D, false)// 固定列表分组  不够Slice个的补替
        groupList.scrollRow3d = groupByLen(groupList.scrollRow3d, Slice3D, true)//滚动列表
    }

    // console.log({ groupList })


}

function groupByPriority(priority = '', elevatorType = '') {
    // console.log({ elevatorType })
    checkState.priority = priority
    checkState.elevatorType = elevatorType

    const list = evevatorList.value.filter(x => {
        if (!priority && !elevatorType) {
            return x
        } else if (priority && !elevatorType) {
            return x.priority == priority
        }
        else if (!priority && elevatorType) {
            return x.elevatorType == elevatorType
        }
        else {
            return x.priority == priority && x.elevatorType == elevatorType
        }
    })
    // console.log({ checkState, list })
    slice2D3D(list)
}
const onSwiper = (swiper) => {
    // console.log(swiper);
    data.controlledSwiper = swiper;
};

const data = reactive({
    controlledSwiper: null,
    videoUrl: null
})

const $bus = inject('$bus')
onMounted(() => {
    // console.log('拿到：', data.controlledSwiper)
    caculateHeight()
    // new DevicePixelRatio().init();
    window.$swiper = data.controlledSwiper

    $bus.on('resetState', () => {
        console.log('触发resetState')
        checkState.priority = '06'
        checkState.elevatorType = ''
    })
    $bus.off('showToast2', showToast2)
    $bus.on('showToast2', showToast2)
    console.log('高度：',document.getElementById('mainList').getBoundingClientRect())
})

const caculateHeight = ()=>{
  let height =  document.getElementById('mainList').getBoundingClientRect().height
  let width =  document.getElementById('mainList').getBoundingClientRect().width


  if(!isFullscreen.value){
      height = height/0.81
  }
  eleSize.value = Math.floor(height/eleHeight) || 4
  Slice3D = Math.max(Math.floor(width/124),8) + 2
}

const showToast2 = (e) => {
    eleinfo_ref2.value.showToast(e)
    $bus.emit('toastState', true)
}



//css变量
const eleSize =  ref(4) //只能放下4排
const eleHeight = 225, eleSpeed = '2.5s', eleDelay = '10s'

</script>

<style lang="scss" scoped>
$ele-size: v-bind('eleSize');
$ele-height: v-bind('eleHeight');
$ele-speed: v-bind('eleSpeed');
$ele-delay :v-bind('eleDelay');

:deep() .el-dialog__headerbtn {
    font-size: 33px !important;
}

:deep().el-switch__action {
    background: rgb(3, 36, 80);
}

.d2d3 {
    position: absolute;
    bottom: 19px;
    right: 0;
    z-index: 99;
    height: 20px;
}

.swiper {
    width: 100%;
    height: v-bind('scrollHeight');

    .swiper-slide {
        height: 230px;
    }
}



.runtitle {
    margin-top: -20px;
    text-indent: 20px;
    color: #fff;
}

.daylinelist {
    width: 100%;
    height: 210px;

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

#mainstate {
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    .icon-tianti {
        display: inline-block;
        width: 18px;
        height: 18px;
        background: url('../../../public/images/dataplatform/customer/iconuser.png') no-repeat center/cover;
        vertical-align: top;
    }

    .icon-futi {
        display: inline-block;
        width: 18px;
        height: 18px;
        background: url('../../../public/images/dataplatform/customer/iconfuti.png') no-repeat center/cover;
        vertical-align: top;
    }

    .totalstates {
        display: flex;
        color: #fff;
        padding: 6px 0;
        justify-content: space-between;

        .total {
            display: flex;
            width: 24%;
            // margin-left: 35px;

            .futi {
                margin-left: 30px;
            }

            div {
                white-space: nowrap;
                padding: 4px 5px;
                box-sizing: border-box;
                border-radius: 5px;
            }

            div.checked {
                border: 1px solid rgba(0, 154, 252, 0.5);
                box-shadow: 0 0 3px 1px rgb(37, 169, 245);
            }
        }

        .states {
            display: flex;
            width: 60%;
            margin-right: 10px;
            justify-content: flex-end;

            div {
                color: #C0DFFF;
                margin-left: 4%;
                white-space: nowrap;
                padding: 4px 5px;
                box-sizing: border-box;
                border-radius: 5px;
                white-space: nowrap;
            }

            div.checked {


                border: 1px solid rgba(0, 154, 252, 0.5);
                box-shadow: 0 0 3px 1px rgb(37, 169, 245);

            }

            div>i {
                display: inline-block;
                width: 12px;
                height: 12px;
                border-radius: 50%;

            }

            i.icon-online {
                background-color: #1AC9FF;
            }

            i.icon-offline {
                background-color: #999999;
            }

            i.icon-bug {
                background-color: #FE7917;
            }

            i.icon-bugperson {
                background-color: #FF6882;
            }

            i.icon-warning {
                background-color: #B149FF;
            }

            i.icon-service {
                background-color: #FED52F;
            }
        }
    }


    .mainlist {
        position: relative;
        width: calc(100% - 26px);
        height: calc(100% - 40px);
        box-sizing: border-box;
        margin: 0 auto;

        .d2_d3 {
            margin-top: 15px;

            .row {
                height: 208.33px;
                margin-bottom: 8px;


            }

            .scrollheight {
                height: v-bind('scrollHeight')
            }

            .scrollheight2 {
                height: v-bind('scrollHeight2')
            }
        }

        .marginleft.elevatorItem {
            margin-left: 10px;
        }

        @keyframes rowMove {
            0% {
                transform: translate(0, 0);
            }

            80%,
            100% {
                transform: translate(0, calc($ele-height * -1px));
            }
        }

        @keyframes move {
            0% {
                transform: translate(0, 0);
            }

            100% {
                transform: translate(0, calc($ele-size * $ele-height * -1px));
            }
        }

        // .scrollbox {
        //     width: 100%;
        //     height: 450px;
        //     animation: move calc($ele-speed * $ele-size ) $ele-delay steps($ele-size) infinite;

        //     .row {
        //         animation: rowMove $ele-speed $ele-delay infinite;
        //     }
        // }

        .row {
            width: calc(100% - 20px);
            margin: 0 auto;
            height: $ele-height px;
            box-sizing: border-box;
            background: url('../../../public/images/dataplatform/customer/sitebg.png') no-repeat bottom/100%;
            display: flex;
            justify-content: flex-start;

            // animation: rowMove calc( $ele-speed ) infinite;
            @keyframes personBg {
                0% {
                    opacity: 0.4;
                }

                50% {
                    opacity: 1;
                }

                0% {
                    opacity: 0.4;
                }
            }

            .elevatorItem {
                // width: 18%;
                // width: clamp(16%, 180px , 18%);
                // width:clamp(180px,16%,200px);
                // min-width: 180px;
                // width:130px;
                width: clamp(16%, 130px , 18%);
                // padding-right: 40px;
                height: 100%;
                margin-left: 20px;
                margin-right: 1%;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                transform: translateY(-24px);
               
                .item {
                    &.itemrect{
                        width:130px; 
                         height: 180px;
                    }
                    // width: 100%;
                    // width: clamp(16%, 180px , 18%);//++ xx3
                   
                    // padding-right: 40px;
                    position: relative; //++
                   
                    background: url('../../../public/images/dataplatform/customer/withbg.png') no-repeat bottom center;
                    display: flex;
                    // justify-content: space-between;
                    justify-content: center;//++
                    transform: translateY(6px);

                    .elevator {
                        // width: calc(100% - 40px); //btnstate 30px  间隙10px
                        width:100%;//++
                        height: 150px;
                        // margin-left: 11px;

                        &>.name {
                            width: 100%;
                            height: 30px;
                            margin-top: 21px;
                            transform: translateY(-10px);

                            .marquee {
                                width: 100%;
                                overflow: hidden;
                            }

                            .marquee .marquee-wrap {
                                width: 100%;
                                background-color: black;
                                animation: marquee-wrap 8s infinite linear;
                            }

                            .marquee .marquee-content {
                                float: left;
                                white-space: nowrap;
                                min-width: 100%;
                                color: #29B6FF;
                                font-size: 22px;
                                text-align: center;
                                animation: marquee-content 8s infinite linear;
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

                        .elevatorstate {
                            width: 100%;
                            transform: translateX(3px);
                            display: flex;
                            justify-content: center;

                            .elevatortype {
                                width: 70px;
                                position: relative;
                                height: 70px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                background-position:top;

                                .peopleNum {
                                    position: absolute;
                                    bottom: 8px;
                                    right: 30px;
                                    color: #fff;
                                    font-size: 14px;
                                }

                                .withperson {
                                    width: 36px;
                                    height: 56px;
                                    background: #fff;
                                    // border-radius: 50%; 
                                    overflow: hidden;
                                    z-index: -1;
                                    // margin-left: -12px;
                                }
                                // @media screen and (min-width: 3840px) {
                                //     .withperson{
                                //         margin-top:-66px;
                                //     }
                                // }

                                .withperson.personwidth {
                                    width: 60px;
                                }

                                @media screen and (max-width: 1920px) {
                                    .withperson {
                                        margin-bottom: 0;
                                        // margin-left: -28%;
                                    }
                                }

                                @media screen and (max-width: 1440px) {
                                    .withperson {
                                        margin-bottom: -12px;
                                        margin-left: -2px;
                                    }
                                }

                                @media screen and (max-width: 1680px) {
                                    .withperson {
                                        margin-bottom: -12px;
                                        margin-left: -10px;
                                    }
                                }

                                @media screen and (max-width: 1600px) {
                                    .withperson {
                                        margin-bottom: -12px;
                                        margin-left: -0;
                                    }
                                }

                                @media screen and (max-width: 1400px) {
                                    .withperson {
                                        margin-bottom: -12px;
                                        margin-left: 1px;
                                    }
                                }

                                .detail {
                                    opacity: .0;

                                    position: absolute;
                                    top: -35px;
                                    left: 0px;
                                    width: 140px;
                                    height: 170px;
                                    z-index: -999;
                                    font-size: 10px;
                                    background-color: rgba(0, 23, 47, .89);
                                    border-radius: 4px;
                                    transition-duration: .3s;

                                    .detailTitle {
                                        display: flex;
                                        justify-content: space-between;
                                        box-sizing: border-box;
                                        width: 100%;
                                        padding: 7px 8px;

                                        .name {
                                            font-size: 14px;
                                            text-align: left;
                                            color: #fff;
                                            min-width: 45px;
                                        }

                                        .value {
                                            font-size: 14px;
                                            text-align: right;
                                            color: #23FFFC;
                                            white-space: nowrap;
                                            text-overflow: ellipsis;
                                            overflow: hidden;
                                            min-width: 30px;
                                        }
                                    }
                                }

                                .withperson.rect {
                                    width: 36px;
                                    height: 56px;
                                    animation: personBg 1s infinite ease-in-out;
                                    transform: translateX(2px);
                                }


                            }

                            @media screen and (max-width: 1600px) {
                                .elevatortype {
                                    width: 56%;
                                }
                            }

                            @media screen and (min-width: 1350px) and (max-width: 1450px) {
                                .elevatortype {
                                    width: 65%;
                                    margin-left: 20px;
                                }
                            }

                            // withbugperson  offline warning  withbug  normal  stoprun 
                            .stoprun {
                                //停运
                                background: url('../../../public/images/dataplatform/customer/stoprun.png') no-repeat;
                            }

                            .normal {
                                //电梯在线
                                background: url('../../../public/images/dataplatform/customer/useronline.png') no-repeat top;
                            }

                            // .online {
                            //     //电梯在线有人
                            //     background: url('../../../public/images/dataplatform/customer/withuser.png') no-repeat;
                            // }

                            .withbugperson {
                                //电梯故障困人
                                position: relative;
                                background: url('../../../public/images/dataplatform/customer/withbug.png') no-repeat;
                            }

                            // .withbug {
                            //     //电梯故障困人
                            //     background: url('../../../public/images/dataplatform/customer/withbug.png') no-repeat;
                            // }

                            .offline {
                                //离线无人
                                background: url('../../../public/images/dataplatform/customer/userloseline.png') no-repeat;
                            }

                            .warning {
                                //预警
                                background: url('../../../public/images/dataplatform/customer/warninguser.png') no-repeat;
                            }

                            .withbug {
                                //故障

                                background: url('../../../public/images/dataplatform/customer/stopserviceuser.png') no-repeat;
                            }

                            // .normalnouser {
                            //     //正常无人
                            //     background: url('../../../public/images/dataplatform/customer/useronline.png') no-repeat;
                            // }
                            // withbugperson  offline warning  withbug  normal  stoprun 
                            // futiwithbugperson futioffline futiwarning futiwithbug futinormal futistoprun
                            .futinormal {
                                //扶梯在线
                                background: url('../../../public/images/dataplatform/customer/futionline.png') no-repeat;
                            }

                            .futiwarning {
                                //扶梯预警
                                background: url('../../../public/images/dataplatform/customer/futiwarninguser.png') no-repeat;
                            }

                            .futiwithbug {
                                //扶梯故障
                                background: url('../../../public/images/dataplatform/customer/futistopserviceuser.png') no-repeat;
                            }

                            .futistoprun {
                                //扶梯停止服务
                                background: url('../../../public/images/dataplatform/customer/futistoprun.png') no-repeat;
                            }

                            .futioffline {
                                //扶梯离线
                                background: url('../../../public/images/dataplatform/customer/futiloseline.png') no-repeat;
                            }

                            .futiwithbugperson {
                                //扶梯故障困人
                                background: url('../../../public/images/dataplatform/customer/futiwithbug.png') no-repeat;
                            }

                        }

                    }

                    .btnstate {
                        position: absolute;
                        right:-50px;
                        bottom: 0;
                        width: 30px;
                        min-width: 30px;
                        // height: 120px;
                        // margin-top: 45px;
                        // margin-left:10px;

                        //上下箭头
                        .updown {
                            width: 100%;
                            display: flex;
                            justify-content: space-between;

                            .up {
                                position: relative;
                                height: 16px;
                                overflow: hidden;
                                width: 50%;

                                .up-icon {
                                    display: inline-block;
                                    width: 90%;
                                    height: 16px;
                                    background: url('../../../public/images/dataplatform/customer/up1.png') no-repeat center/cover;

                                }
                                 
                                 @media screen and (min-width: 2400px) {
                                    .up-icon{
                                        height:30px
                                    }
                                }

                                

                                .up-icon.run {
                                    animation: runup 1s infinite;
                                }

                            }

                            @keyframes runup {
                                0% {
                                    background: url('../../../public/images/dataplatform/customer/up2.png') no-repeat;
                                    // transform: translateY(25px);
                                    opacity: 0.1;
                                }

                                50% {
                                    background: url('../../../public/images/dataplatform/customer/up2.png') no-repeat;
                                    // transform: translateY(25px);
                                    opacity: 1;
                                }

                                100% {
                                    background: url('../../../public/images/dataplatform/customer/up2.png') no-repeat;
                                    // transform: translateY(-25px);
                                    opacity: 0.1;
                                }
                            }

                            @keyframes rundown {
                                0% {
                                    background: url('../../../public/images/dataplatform/customer/down2.png') no-repeat;
                                    // transform: translateY(-25px);
                                    opacity: 0.1;
                                }

                                50% {
                                    background: url('../../../public/images/dataplatform/customer/down2.png') no-repeat;
                                    // transform: translateY(-25px);
                                    opacity: 1;
                                }

                                100% {
                                    background: url('../../../public/images/dataplatform/customer/down2.png') no-repeat;
                                    // transform: translateY(25px);
                                    opacity: 0.1;
                                }
                            }

                            .down {
                                position: relative;
                                height: 16px;
                                overflow: hidden;
                                width: 50%;

                                .down-icon {
                                    display: inline-block;
                                    width: 90%;
                                    height: 16px;
                                    background: url('../../../public/images/dataplatform/customer/down1.png') no-repeat;

                                }
                                 @media screen and (min-width: 2400px) {
                                    .down-icon{
                                        height:30px
                                    }
                                }

                                .down-icon.run {
                                    animation: rundown 1s infinite;
                                }
                            }
                        }

                        //楼层
                        .floor {
                            display: flex;
                            margin-top: 4px;
                            justify-content: center;
                            align-items: center;

                            .num {
                                width: 26px;
                                height: 26px;
                                border-radius: 50%;
                                background-color: #34455D;
                                color: #23FFFC;
                                font-size: 14px;
                                text-align: center;
                                line-height: 26px;
                                overflow: hidden;
                            }

                            //扶梯
                            .futi-updown {
                                width: 28px;
                                height: 33px;
                                position: relative;
                                overflow: hidden;

                                .futi-up {
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    width: 22px;
                                    height: 23px;
                                    background: url('../../../public/images/dataplatform/customer/topRight.png') no-repeat;
                                }

                                @keyframes futiRunUp {
                                    0% {
                                        background: url('../../../public/images/dataplatform/customer/topRight1.png') no-repeat;
                                        opacity: 0.3;
                                    }

                                    50% {
                                        background: url('../../../public/images/dataplatform/customer/topRight1.png') no-repeat;
                                        opacity: 1;
                                    }

                                    100% {
                                        background: url('../../../public/images/dataplatform/customer/topRight1.png') no-repeat;
                                        opacity: 0.3;
                                    }
                                }

                                @keyframes futiRunDown {
                                    0% {
                                        background: url('../../../public/images/dataplatform/customer/bottomLeft1.png') no-repeat;
                                        opacity: 0.3;
                                    }

                                    0% {
                                        background: url('../../../public/images/dataplatform/customer/bottomLeft1.png') no-repeat;
                                        opacity: 1;
                                    }

                                    100% {
                                        background: url('../../../public/images/dataplatform/customer/bottomLeft1.png') no-repeat;
                                        opacity: 0.3;
                                    }
                                }

                                .futi-up.run {
                                    animation: futiRunUp 1s infinite
                                }

                                .futi-down.run {
                                    animation: futiRunDown 1s infinite
                                }

                                .futi-down {
                                    position: absolute;
                                    bottom: 0;
                                    right: 0;
                                    width: 22px;
                                    height: 23px;
                                    background: url('../../../public/images/dataplatform/customer/bottomLeft.png') no-repeat;
                                }
                            }
                        }

                        //门
                        .door {

                            width: 22px;
                            display: flex;
                            margin: 4px auto 0;
                            position: relative;
                            justify-content: space-between;
                            z-index: -1;

                            .door-l,
                            .door-r {
                                width: 10px;
                                height: 19px;
                                position: relative;
                                overflow: hidden;
                                border-radius: 2px;
                                background: #34455dbd;

                                .icon-door-l,
                                .icon-door-r {
                                    display: block;
                                    width: 100%;
                                    height: 100%;
                                    border-radius: 2px;

                                }

                                .icon-door-l.close {
                                    animation: closeToRight 2s 1 forwards ease-in-out;
                                }

                                .icon-door-r.close {
                                    animation: closeToLeft 2s 1 forwards ease-in-out;
                                }

                                .icon-door-l.close.run {
                                    animation: runToLeft 2s 1 forwards ease-in-out;
                                }

                                .icon-door-r.close.run {
                                    animation: runToRight 2s 1 forwards ease-in-out;
                                }



                                .icon-door-l.close.opening {
                                    animation: openToLeft 2s 1 forwards ease-in-out;
                                }

                                @keyframes openToLeft {
                                    0% {
                                        transform: translate(0);
                                        background: #23FFFC;
                                    }

                                    100% {
                                        transform: translate(-4px);
                                        background: #23FFFC;
                                    }
                                }

                                .icon-door-r.close.opening {

                                    animation: openToRight 2s 1 forwards ease-in-out;
                                }

                                @keyframes openToRight {
                                    0% {
                                        transform: translate(0);
                                        background: #23FFFC;
                                    }

                                    100% {
                                        transform: translate(4px);
                                        background: #23FFFC;
                                    }
                                }

                                .icon-door-l.close.closing {
                                    animation: closingToLeft 2s 1 forwards ease-in-out !important;
                                }

                                @keyframes closingToLeft {
                                    0% {
                                        transform: translate(-8px);
                                        background: #23FFFC;
                                    }

                                    100% {
                                        transform: translate(-4px);
                                        background: #23FFFC;
                                    }
                                }

                                .icon-door-r.close.closing {
                                    animation: closingToRight 2s 1 forwards ease-in-out !important;
                                }

                                @keyframes closingToRight {
                                    0% {
                                        transform: translate(8px);
                                        background: #23FFFC;
                                    }

                                    100% {
                                        transform: translate(4px);
                                        background: #23FFFC;
                                    }
                                }



                                @keyframes runToLeft {
                                    0% {
                                        transform: translate(0);
                                        background: #23FFFC;
                                    }

                                    100% {
                                        transform: translate(-8px);
                                        background: #23FFFC;
                                    }
                                }

                                @keyframes runToRight {
                                    0% {
                                        transform: translate(0);
                                        background: #23FFFC;
                                    }

                                    100% {
                                        transform: translate(8px);
                                        background: #23FFFC;
                                    }
                                }

                                @keyframes closeToRight {
                                    0% {
                                        transform: translate(-8px);
                                        background: #23FFFC;
                                    }

                                    100% {
                                        transform: translate(0px);
                                        background: #23FFFC;
                                    }
                                }

                                @keyframes closeToLeft {
                                    0% {
                                        transform: translate(8px);
                                        background: #23FFFC;
                                    }

                                    100% {
                                        transform: translate(0px);
                                        background: #23FFFC;
                                    }
                                }

                            }

                        }

                        //物联网
                        .iotState {
                            width: 28px;
                            height: 22px;
                            // background-color: #fff;
                            margin: 6px auto 0;


                        }

                        .iotState.nonet {
                            background: url('../../../public/images/dataplatform/customer/nonet.png') no-repeat;
                        }

                        .iotState.offnet {
                            background: url('../../../public/images/dataplatform/customer/offnet.png') no-repeat;
                        }

                        .iotState.onnet {
                            background: url('../../../public/images/dataplatform/customer/onnet.png') no-repeat;
                        }

                        // 摄像头
                        .videoState {
                            width: 21px;
                            height: 24px;
                            // background-color: pink;
                            margin: 5px auto 0;


                        }

                        .videoState.nocam {
                            background: url('../../../public/images/dataplatform/customer/nocam.png') no-repeat;
                        }

                        .videoState.offcam {
                            background: url('../../../public/images/dataplatform/customer/offcam.png') no-repeat;
                        }

                        .videoState.oncam {
                            background: url('../../../public/images/dataplatform/customer/oncam.png') no-repeat;
                        }
                    }
                }

                .item.withbugpersonbg {
                    //故障背景
                    background: url('../../../public/images/dataplatform/customer/bugbg.png') no-repeat bottom center;
                }

                .item.offlinebg {
                    background: url('../../../public/images/dataplatform/customer/offlinebg.png') no-repeat bottom center;
                }

                .item.warningbg {
                    background: url('../../../public/images/dataplatform/customer/warningbg.png') no-repeat bottom center;
                }

                .item.withbugbg {

                    background: url('../../../public/images/dataplatform/customer/stopservicebg.png') no-repeat bottom center;
                }

                .item.normalbg {
                    background: url('../../../public/images/dataplatform/customer/withbg.png') no-repeat bottom center;
                }

                .item.stoprunbg {
                    background: url('../../../public/images/dataplatform/customer/stoprunbg.png') no-repeat bottom center;
                }
            }

            .elevatorItem.fullscreen {
                margin-right: 2%;

                .withperson.rect {
                    width: 40px;
                    height: 56px;
                    animation: personBg 1s infinite ease-in-out;


                }

                .peopleNum {
                    right: 38px;
                }
            }



            .elevatorItem:first-child {
                // margin-left: 60px;
            }

            // .elevatorItem .item:hover .detail {
            //     opacity: 1 !important;
            //     left: 95px !important;
            //     z-index: 999 !important;
            // }

            .elevatorItem:nth-child(5n) .elevator .elevatorstate .elevatortype .detail {
                left: 0px;
            }

            // .elevatorItem:nth-child(5n) :hover .detail {
            //     opacity: 1 !important;
            //     left: -88px !important;
            //     z-index: 999 !important;
            // }
        }

        .row.sticky {
            background-color: rgb(4, 39, 87);
            position: sticky;
            top: 10px;
            left: 0;
            z-index: 999;

        }
    }

}
</style>
