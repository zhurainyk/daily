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
        <div class="mainlist">
            <div style="margin-top:15px" v-show="d2_d3">
                <div v-if="groupList.fixedRow.length < 3">
                    <div v-for="(row, _index) in groupList.fixedRow" :key="_index" class="row"
                        style="height:208.33px;margin-bottom:8px;"
                        :class="{ 'sticky': row.find(item => item.priority == '01') }">
                        <div v-for="(item, index) in row" @click="showToast(item)" :key="index" class="elevatorItem"
                            :style="{ marginLeft: (index == 0 && !isFullscreen) ? '10px' : '' }">
                            <!-- priority背景 01红色闪烁  02橙色 03黄色 04紫色  05灰色 06蓝色  -->
                            <div class="item" :class="getElevatorState(item).bg">
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
                                        <div class="elevatortype " style="width:70px;height:70px;"
                                            :class="getElevatorState(item).user">
                                            <!-- 是否有人 优先级最高01 且是直梯01-->
                                            <div v-if="item.priority == '01' || item.somebody_in == '01'" class="withperson"
                                                :style="{ width: item.elevatorType == '02' ? '60px' : '40px' }"
                                                :class="{ rect: item.elevatorType == '01' && item.priority == '01' ? true : false }">
                                            </div>
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
                    <el-scrollbar height="645px">
                        <div v-for="(row, _index) in groupList.list" :key="_index" class="row">
                            <div v-for="(item, index) in row" @click="showToast(item)" :key="index" class="elevatorItem"
                                :style="{ marginLeft: (index == 0 && !isFullscreen) ? '10px' : '' }">
                                <!-- priority背景 01红色闪烁  02橙色 03黄色 04紫色  05灰色 06蓝色 -->
                                <div class="item" :class="getElevatorState(item).bg">
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
                                            <div class="elevatortype " style="width:70px;height:70px;"
                                                :class="getElevatorState(item).user">
                                                <!-- 是否有人 优先级最高01 且是直梯01-->
                                                <div v-if="item.priority == '01' || item.somebody_in == '01'"
                                                    class="withperson"
                                                    :style="{ width: item.elevatorType == '02' ? '60px' : '40px' }"
                                                    :class="{ rect: item.elevatorType == '01' && item.priority == '01' ? true : false }">
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
                <el-scrollbar :height="scrollHeight" v-if="groupList.fixedRow.length < 3">
                    <swiper class="myscroll" :direction="'vertical'" :slides-per-view="3 - groupList.fixedRow.length"
                        :mousewheel="mousewheel" :space-between="10" @swiper="onSwiper" @autoplayPause="autoplayPause"
                        @autoplayStart="autoplayStart" @autoplayResume="autoplayResume" :pagination="true"
                        :scrollbar='scrollbar' :autoplay="autoplayOptions" :modules="modules">
                        <swiper-slide v-for="(row, _index) in groupList.scrollRow" :key="_index" class="row">
                            <div v-for="(item, index) in row" @click="showToast(item)" :key="index" class="elevatorItem"
                                :style="{ marginLeft: (index == 0 && !isFullscreen) ? '10px' : '' }">
                                <!-- priority背景 01红色闪烁  02橙色 03黄色 04紫色  05灰色 06蓝色  -->
                                <div class="item" :class="getElevatorState(item).bg">
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
                                            <div class="elevatortype " style="width:70px;height:70px;"
                                                :class="getElevatorState(item).user">
                                                <!-- 是否有人 优先级最高01 且是直梯01-->
                                                <div v-if="item.priority == '01' || item.somebody_in == '01'"
                                                    class="withperson"
                                                    :style="{ width: item.elevatorType == '02' ? '60px' : '40px' }"
                                                    :class="{ rect: item.elevatorType == '01' && item.priority == '01' ? true : false }">
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

            <div v-show="!d2_d3" style="width:100%;height:100% ;margin-top:15px">
                <elevator3d :elevatorList="evevatorList" :token="props.token" :list3d="groupList.list3d"
                    :fixedRow3d="groupList.fixedRow3d" :scrollRow3d="groupList.scrollRow3d"></elevator3d>
            </div>
            <el-switch class="d2d3 mb-2" size="large" v-model="d2_d3" inline-prompt
                style="--el-switch-off-color: rgb(25,155,249); --el-switch-on-color: rgb(25,155,249)" active-text="2D"
                inactive-text="3D" />
        </div>


    </div>
    <el-dialog v-model="dialogVisible" show-close title="状态：正常" width="1017px" draggable :modal="false"
        :close-on-click-modal="false">
        <div class="toast">
            <div class="left">
                <div class="state">状态:
                    <span style="color:#23FFFC">{{ currentState || '无' }}</span>
                </div>
                <div class="state">温度:
                    <span style="color:#23FFFC">{{ temperature || '无' }}</span>
                    &nbsp;&nbsp;&nbsp; 湿度:
                    <span style="color:#23FFFC">{{ humidity || '无' }}</span>
                </div>
                <div class="video">
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
                <module-name style="margin-top: -34px;  padding-bottom: 14px;width:120px;"
                    :moduleName="'电梯基本信息'"></module-name>
                <div style='  border: 1px solid rgba(22, 99, 180, .5);box-sizing:border-box;padding:5px 10px;'>
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
                </div>

                <div class="server">
                    <div class="title">服务记录</div>
                    <div class="table">
                        <el-scrollbar height="100%">
                            <div class="tab" v-for="(item, index) in $data.serviceList" :key="index"
                                @click="editDetailFn(item)">
                                <div class=" item type">{{ item.ui_taskType }}</div>
                                <div class="item name">{{ item.db_id_taskName }}</div>
                                <div class="item desc">{{ item.ui_taskStateDesc }}</div>

                                <div class="item time">{{ moment(item.db_preEndtime).format('YYYY-MM-DD HH:mm:ss') }}
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
                <div class="brand" style="margin-top:3px">故障统计</div>
                <div class="graphlist" v-if="true">

                    <div class="item">
                        <div class="vtitle">
                            非正常停梯次数(近6万次运行内):{{ isNaN($data.fiveFaultsRunningTimes) ? $data.fiveFaultsRunningTimes :
                                `${$data.fiveFaultsRunningTimes}次` }}
                        </div>
                        <pie :pieId="'toastpie1_'" :isPercent="false" :data='$data.pie1' style="width:100%; height: 80%; ">
                        </pie>
                        <div class="pie-title" style="text-align:center">故障原因</div>

                    </div>
                    <div class="item">
                        <div class="vtitle">
                            近30日日均运行次数：{{ $data.thirtyAvgRunningTimes || 0 }}次
                        </div>
                        <pie :pieId="'toastpie2_'" :isPercent="false" :data='$data.pie2' style="width:100%; height: 80%; ">
                        </pie>
                        <div style='text-align:center'>回召类型分布 </div>
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

<script   setup>
import { getVideoUrl } from '@/api/module/customerBI'
import { selectByIdApi } from '@/api/module/elevator'
import { ref, reactive, computed, watch, defineProps, nextTick, onMounted, inject } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import hlsplayer from './hlsplayer.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import vue3player from '../common/vue3player.vue'
import { Pagination, A11y, Autoplay, Mousewheel, Scrollbar } from 'swiper'
import { getLatestSysCompPartState, getLatestEnvironmentState, getTaskInfoOfOneElevDesc } from '@/api/module/dataPlatform'
import 'swiper/css';
import 'swiper/scss/scrollbar'
import { menulist } from '@/router/menu'
import syscontroller from '@/api/module/syscontroller'
import pie from '../project/pie.vue'
import monthline from '../project/monthline.vue'
import elevator3d from './elevator3d.vue'
import moment from 'moment'
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
let currentState = ref('')

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
    thirtyAvgRunningTimes: "",
    fiveFaultsRunningTimes: '',
    faultDistribution: []
})
let elevatorName = ref('')
let temperature = ref('')
let humidity = ref('')
const showToast = (e) => {
    console.log({ e })
    currentState.value = e.state_desc
    elevatorName.value = e.elevatorName
    temperature.value = e.temperature
    humidity.value = e.humidity
    if (e.value && e.value != '0') {

    } else {

    }
    dialogVisible.value = true
    setTimeout(() => {
        window.$swiper.autoplay.pause()
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
    })
    getTaskInfoOfOneElevDesc({ db_elevId: e.elevatorId, token: props.token }).then(res => {
        if (res.data.data) {
            $data.serviceList = res.data.data.objectList || [];

        }
    })
    selectByIdApi({ id: e.elevatorId }).then(res => {
        if (res.data.data) {
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
            const { faultDistribution, fiveFaultsRunningTimes, thirtyAvgRunningTimes, faultReasonAnalysis, runningTimes, runningDuration, runningMileage, openDoors } = _data
            // console.log(faultReasonAnalysis, '故障原因分析')
            // console.log(faultReason, '导致故障原因')

            // console.log(runningTimes, '运行次数走势')
            console.log(runningDuration, '运行时长走势')
            // console.log(runningMileage, '运行里程走势')
            // console.log(openDoors, '开门次数走势')
            // console.log(faultDistribution, '回招分布')
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
    return (3 - groupList.fixedRow.length) * 215 + 'px'
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
const Slice3D = 10//3d分组常量

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
    console.log({ elevatorType })
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
    console.log({ checkState, list })
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
const $bus = inject('$bus')
onMounted(() => {
    // console.log('拿到：', data.controlledSwiper)
    window.$swiper = data.controlledSwiper
    $bus.on('showToast', showToast)
    $bus.on('resetState', () => {
        console.log('触发resetState')
        checkState.priority = '06'
        checkState.elevatorType = ''
    })
})



//css变量

const eleSize = 3, eleHeight = 225, eleSpeed = '2.5s', eleDelay = '10s'

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
            height: 235px;
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

                .vtitle {
                    // text-align: center;
                    text-indent: 7px;
                    color: #C0DFFF;
                    font-size: 12px;
                    margin-top: 10px;
                    position: relative;
                }

                .vtitle::after {
                    content: '';
                    position: absolute;
                    bottom: -5px;
                    left: 2.5%;
                    width: 95%;
                    height: 1px;
                    background-color: rgba(22, 99, 180, .5);
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
    height: 210px;

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
            margin-left: 35px;

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
        height: calc(100% - 50px);
        box-sizing: border-box;
        margin: 0 auto;

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
            height: 225px;
            box-sizing: border-box;
            background: url('../../../public/images/dataplatform/customer/sitebg.png') no-repeat bottom/100%;
            display: flex;
            // animation: rowMove calc( $ele-speed ) infinite;

            .elevatorItem {
                width: 18%;
                height: 100%;
                margin-left: 20px;
                position: relative;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                transform: translateY(-24px);

                .item {
                    width: 180px;
                    height: 180px;
                    background: url('../../../public/images/dataplatform/customer/withbg.png') no-repeat bottom left;
                    display: flex;
                    justify-content: space-between;
                    transform: translateY(6px);

                    .elevator {
                        width: 130px;
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
                            width: calc(100% - 6px);
                            // margin-top: 15px;
                            transform: translateX(3px);
                            display: flex;
                            justify-content: center;

                            .elevatortype {
                                width: 70px;
                                min-width: 70px;
                                position: relative;
                                height: 70px;
                                display: flex;
                                justify-content: center;
                                align-items: center;


                                .withperson {
                                    width: 40px;
                                    height: 56px;
                                    background: #fff;
                                    border-radius: 50%;
                                    overflow: hidden;
                                    z-index: -1;
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
                                    width: 40px;
                                    height: 55px;
                                    animation: personBg 1s infinite ease-in-out;
                                }

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
                            }

                            // withbugperson  offline warning  withbug  normal  stoprun 
                            .stoprun {
                                //停运
                                background: url('../../../public/images/dataplatform/customer/stoprun.png') no-repeat;
                            }

                            .normal {
                                //电梯在线
                                background: url('../../../public/images/dataplatform/customer/useronline.png') no-repeat;
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
                        width: 30px;
                        height: 120px;
                        margin-top: 45px;

                        //上下箭头
                        .updown {
                            width: 100%;
                            display: flex;
                            justify-content: space-between;

                            .up {
                                position: relative;
                                height: 16px;
                                overflow: hidden;

                                .up-icon {
                                    display: inline-block;
                                    width: 14px;
                                    height: 16px;
                                    background: url('../../../public/images/dataplatform/customer/up1.png') no-repeat;

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

                                .down-icon {
                                    display: inline-block;
                                    width: 14px;
                                    height: 16px;
                                    background: url('../../../public/images/dataplatform/customer/down1.png') no-repeat;

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
                    background: url('../../../public/images/dataplatform/customer/bugbg.png') no-repeat bottom left;
                }

                .item.offlinebg {
                    background: url('../../../public/images/dataplatform/customer/offlinebg.png') no-repeat bottom left;
                }

                .item.warningbg {
                    background: url('../../../public/images/dataplatform/customer/warningbg.png') no-repeat bottom left;
                }

                .item.withbugbg {

                    background: url('../../../public/images/dataplatform/customer/stopservicebg.png') no-repeat bottom left;
                }

                .item.normalbg {
                    background: url('../../../public/images/dataplatform/customer/withbg.png') no-repeat bottom left;
                }

                .item.stoprunbg {
                    background: url('../../../public/images/dataplatform/customer/stoprunbg.png') no-repeat bottom left;
                }
            }



            .elevatorItem:first-child {
                margin-left: 60px;
            }

            .elevatorItem .item:hover .detail {
                opacity: 1 !important;
                left: 95px !important;
                z-index: 999 !important;
            }

            .elevatorItem:nth-child(5n) .elevator .elevatorstate .elevatortype .detail {
                left: 0px;
            }

            .elevatorItem:nth-child(5n) :hover .detail {
                opacity: 1 !important;
                left: -88px !important;
                z-index: 999 !important;
            }
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