<template>
    <div class="servicereport" v-if="isLoading">
        <div class="temp-old">
            <div class="temp-left" :class="{ 'fullscreen': isFullscreen ? true : false }">
                <div class="change">
                    <div class="changetype" @click="methods.changeType">
                        {{ $data.dictionary.reportTypes[$data.dictionary.currentType] }}</div>
                    <el-popover placement="right-start" effect="dark" trigger="hover" :width="180"
                        v-model="$data.popVisible">
                        <template #reference>
                            <div class="changetime" @click="popShow">时间<svg style="margin:0 10px;transform:translateY(6px)"
                                    t="1675845076420" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2746" width="26" height="26">
                                    <path
                                        d="M554.666667 537.6l115.2 115.2-29.866667 29.866667-128-128V341.333333h42.666667v196.266667z m-21.333334 358.4C332.8 896 170.666667 733.866667 170.666667 533.333333S332.8 170.666667 533.333333 170.666667 896 332.8 896 533.333333 733.866667 896 533.333333 896z m0-42.666667c174.933333 0 320-145.066667 320-320S708.266667 213.333333 533.333333 213.333333 213.333333 358.4 213.333333 533.333333 358.4 853.333333 533.333333 853.333333z"
                                        fill="#0785d5" p-id="2747"></path>
                                </svg>{{ $data.computedDate }}</div>
                        </template>
                        <div class="reporttable">
                            <div class="head">
                            </div>
                            <div class="main">
                                <div class="main-tab" v-for="(x, y) in $data.reportTimeList" :key="y"
                                    @click="methods.rowClick(x)">
                                    <div class="tab-item">{{ methods.formateDate(x.db_time) }}</div>
                                </div>
                            </div>
                        </div>
                    </el-popover>
                </div>
                <div class="head">
                    <div class="dateinfo">
                        <div class="title">{{ $data.headerTab.reportName }}</div>
                        <div class="date">{{ $data.headerTab.time }}</div>
                        <div class="type">
                            <div>{{ $data.dictionary.reportTypesEn[$data.dictionary.currentType] }}</div>
                            <div>REPORT</div>
                        </div>
                    </div>
                    <div class="companys">
                        <div class="com">
                            维保单位：{{ $data.headerTab.projectRepair }}
                        </div>
                        <div class="com">
                            技术支持：{{ $data.headerTab.support }}
                        </div>
                        <div class="com" v-if="$data.headerTab.save">
                            承保单位：{{ $data.headerTab.save }}
                        </div>
                    </div>
                    <div class="comments">
                        <div class="comment" style="margin-top:-15px">专家建议</div>
                        <div class="comment" v-for="(x, i) in $data.headerTab.suggestion" :key="x.db_id">
                            {{ i + 1 }}.{{ x.db_content }}
                        </div>
                    </div>
                </div>
                <div class="totaltemp">
                    <div class="floor1">
                        <border class="kunrencard">
                            <div class="temp">
                                <module-name :moduleName="'困人'"></module-name>
                                <div class="numcards">
                                    <div class="numcard">
                                        <div class="num red">{{ reportData.L1_C2.times || 0 }}</div>
                                        <div class="numlabel">困人总数</div>
                                        <div class="numlabel">(次)</div>
                                    </div>
                                </div>
                            </div>
                        </border>
                        <border class="huanjian">
                            <div class="temp">
                                <module-name :moduleName="'换件'"></module-name>
                                <div class="numcards">
                                    <div class="numcard">
                                        <div class="num">{{ reportData.L1_C4.nums }}</div>
                                        <div class="numlabel">换件数量</div>
                                        <div class="numlabel">(条)</div>
                                    </div>
                                </div>
                            </div>
                        </border>
                        <border class="weibaocard">
                            <div class="temp">
                                <module-name :moduleName="'维保服务'"></module-name>
                                <div class="numcards ">
                                    <div class="numcard">
                                        <div class="num blue">{{ reportData.L1_C3.totalCount || 0 }}</div>
                                        <div class="numlabel">维保总数</div>
                                        <div class="numlabel">(次)</div>
                                    </div>
                                    <div class="numcard">
                                        <div class="num blue">{{ reportData.L1_C3.avgDuration || 0 }}</div>
                                        <div class="numlabel">平均维保时长</div>
                                        <div class="numlabel">(小时)</div>
                                    </div>
                                </div>
                            </div>
                        </border>
                    </div>
                    <div class="floor2">
                        <div class="floor2-l">
                            <border class="huizhaocard">
                                <div class="temp">
                                    <module-name :moduleName="'回召'"></module-name>
                                    <div class="_temp flex">
                                        <div class="numcards">
                                            <div class="numcard">
                                                <div class="num">{{ reportData.L2_C2_F1.totalCallback }}</div>
                                                <div class="numlabel">回召总数</div>
                                                <div class="numlabel">(次)</div>
                                            </div>
                                        </div>
                                        <div class="form">
                                            <div class="left">
                                                <div class="tab">
                                                    <div class="label">困人</div>
                                                    <div class="value">{{ reportData.L2_C2_F1.form[0]?.data || 0 }}</div>
                                                </div>
                                                <div class="tab">
                                                    <div class="label">故障停梯</div>
                                                    <div class="value">{{ reportData.L2_C2_F1.form[1]?.data || 0 }}</div>
                                                </div>
                                                <div class="tab">
                                                    <div class="label">运行效果异常</div>
                                                    <div class="value">{{ reportData.L2_C2_F1.form[2]?.data || 0 }}</div>
                                                </div>
                                            </div>
                                            <div class="right">
                                                <div class="tab">
                                                    <div class="label">特殊服务</div>
                                                    <div class="value">{{ reportData.L2_C2_F1.form[3]?.data || 0 }}</div>
                                                </div>
                                                <div class="tab">
                                                    <div class="label">非维保原因导致的停梯/损坏</div>
                                                    <div class="value">{{ reportData.L2_C2_F1.form[4]?.data || 0 }}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bottom start">
                                        <span class="title">环比上{{ textType }}回召总数{{
                                            getClassName(reportData.L2_C2_F1.ringRatio).text
                                        }}</span>
                                        <span class="arrow">
                                            <arrow :dirc="getClassName(reportData.L2_C2_F1.ringRatio).name"></arrow>
                                        </span>
                                        <span class="arrow" :class="[getClassName(reportData.L2_C2_F1.ringRatio).name]">{{
                                            Math.abs(reportData.L2_C2_F1.ringRatio) || 0
                                        }}次</span>
                                    </div>
                                    <div class="_temp flex">
                                        <div class="numcards">
                                            <div class="numcard">
                                                <div class="num red">{{ reportData.L2_C2_F2.faultTotal || 0 }}</div>
                                                <div class="numlabel">故障总数</div>
                                                <div class="numlabel">(次)</div>
                                            </div>
                                        </div>
                                        <div class="form">
                                            <div class="left">
                                                <div class="tab">
                                                    <div class="label">控制系统故障</div>
                                                    <div class="value">{{ reportData.L2_C2_F2.form[0].data }}</div>
                                                </div>
                                                <div class="tab">
                                                    <div class="label">人为外部原因</div>
                                                    <div class="value">{{ reportData.L2_C2_F2.form[5].data }}</div>
                                                </div>
                                                <div class="tab">
                                                    <div class="label">曳引系统故障</div>
                                                    <div class="value">{{ reportData.L2_C2_F2.form[4].data }}</div>
                                                </div>
                                            </div>
                                            <div class="right">
                                                <div class="tab">
                                                    <div class="label">电气系统故障</div>
                                                    <div class="value">{{ reportData.L2_C2_F2.form[2].data }}</div>
                                                </div>
                                                <div class="tab">
                                                    <div class="label">门系统故障</div>
                                                    <div class="value">{{ reportData.L2_C2_F2.form[3].data }}</div>
                                                </div>
                                                <div class="tab">
                                                    <div class="label">安全保护装置动作</div>
                                                    <div class="value">{{ reportData.L2_C2_F2.form[1].data }}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bottom start">
                                        <span class="title">环比上{{ textType }}故障总数{{
                                            getClassName(reportData.L2_C2_F2.ringRatio).text
                                        }}</span>
                                        <span class="arrow">
                                            <arrow :dirc="getClassName(reportData.L2_C2_F2.ringRatio).name"></arrow>
                                        </span>
                                        <span class="arrow" :class="[getClassName(reportData.L2_C2_F2.ringRatio).name]">{{
                                            Math.abs(reportData.L2_C2_F2.ringRatio) || 0
                                        }}次</span>
                                    </div>
                                </div>
                            </border>
                        </div>
                        <div class="floor2-r">
                            <border class="stopcard">
                                <div class="temp">
                                    <module-name :moduleName="'停梯时长'"></module-name>

                                    <div class="flex">
                                        <div class="numcards">
                                            <div class="numcard">
                                                <div class="num">{{ reportData.L1_C1.totalDuraton || 0 }}</div>
                                                <div class="numlabel">停梯总数</div>
                                                <div class="numlabel">(小时)</div>
                                            </div>
                                        </div>
                                        <div class="form">
                                            <div class="left">
                                                <div class="tab">
                                                    <div class="label">困人</div>
                                                    <div class="value">{{ reportData.L1_C1.form[0]?.data || 0 }}</div>
                                                </div>
                                                <div class="tab">
                                                    <div class="label">维保</div>
                                                    <div class="value">{{ reportData.L1_C1.form[6]?.data || 0 }}</div>
                                                </div>
                                                <div class="tab">
                                                    <div class="label">故障停梯</div>
                                                    <div class="value">{{ reportData.L1_C1.form[1]?.data || 0 }}</div>
                                                </div>
                                                <div class="tab">
                                                    <div class="label">特殊服务</div>
                                                    <div class="value">{{ reportData.L1_C1.form[3]?.data || 0 }}</div>
                                                </div>
                                            </div>
                                            <div class="right">
                                                <div class="tab">
                                                    <div class="label">自然停梯</div>
                                                    <div class="value">{{ reportData.L1_C1.form[7]?.data || 0 }}</div>
                                                </div>
                                                <div class="tab">
                                                    <div class="label">物联网运维</div>
                                                    <div class="value">{{ reportData.L1_C1.form[5]?.data || 0 }}</div>
                                                </div>
                                                <div class="tab">
                                                    <div class="label">运行效果异常</div>
                                                    <div class="value">{{ reportData.L1_C1.form[2]?.data || 0 }}</div>
                                                </div>
                                                <div class="tab">
                                                    <div class="label">非维保原因导致的停梯/损坏</div>
                                                    <div class="value">{{ reportData.L1_C1.form[4]?.data || 0 }}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="bottom">
                                        <span class="title">环比上{{ textType }}停梯总数{{
                                            getClassName(reportData.L1_C1.ringRatio).text
                                        }}</span>
                                        <span class="arrow">
                                            <arrow :dirc="getClassName(reportData.L1_C1.ringRatio).name"></arrow>
                                        </span>
                                        <span class="arrow" :class="[getClassName(reportData.L1_C1.ringRatio).name]">{{
                                            Math.abs(reportData.L1_C1.ringRatio) || 0
                                        }}小时</span>
                                    </div>
                                </div>
                            </border>
                            <border class="xianchangecard">
                                <div class="temp">
                                    <module-name :moduleName="'现场服务人员'"></module-name>
                                    <div class="_temp flex">
                                        <div class="numcards">
                                            <div class="numcard">
                                                <div class="num blue">{{ reportData.L2_C1.count || 0 }}</div>
                                                <div class="numlabel">服务人员总数</div>
                                                <div class="numlabel">(人)</div>
                                            </div>
                                        </div>
                                        <div class="personcard">
                                            <span v-for="x in reportData.L2_C1.list">{{ x }}</span>
                                        </div>
                                    </div>
                                </div>
                            </border>
                        </div>
                    </div>

                </div>
            </div>
            <div class="temp-right">
                <border class="yunxingcard">
                    <div class="temp">
                        <module-name :moduleName="'运行汇总'"></module-name>
                        <div class="tabs">
                            <div class="left-tab">
                                <div class="tab">
                                    <div class="numcards">
                                        <div class="numcard">
                                            <div class="num blue">{{ reportData.R1_C1.totalRunningTimes || 0 }}</div>
                                            <div class="numlabel">总运行次数</div>
                                            <div class="numlabel">(次)</div>
                                            <div class="arrow">
                                                <span>
                                                    环比上{{ textType }}{{
                                                        getClassName(reportData.R1_C1.ringRatioRunningTimes).text
                                                    }}
                                                </span>
                                                <span class="arrow">
                                                    <arrow :size="20"
                                                        :dirc="getClassName(reportData.R1_C1.ringRatioRunningTimes).name">
                                                    </arrow>
                                                </span>
                                                <span class="arrow"
                                                    :class="[getClassName(reportData.R1_C1.ringRatioRunningTimes).name]">{{
                                                        Math.abs(reportData.R1_C1.ringRatioRunningTimes) || 0
                                                    }}
                                                    (次)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab">
                                    <div class="numcards">
                                        <div class="numcard">
                                            <div class="num blue">{{ reportData.R1_C1.totalRunningMileage || 0 }}</div>
                                            <div class="numlabel">总运行里程</div>
                                            <div class="numlabel">(公里)</div>
                                            <div class="arrow">
                                                <span>
                                                    环比上{{ textType }}{{
                                                        getClassName(reportData.R1_C1.ringRatioRunningMileage).text
                                                    }}
                                                </span>
                                                <span class="arrow">
                                                    <arrow :size="20"
                                                        :dirc="getClassName(reportData.R1_C1.ringRatioRunningMileage).name">
                                                    </arrow>
                                                </span>
                                                <span class="arrow"
                                                    :class="[getClassName(reportData.R1_C1.ringRatioRunningMileage).name]">{{
                                                        Math.abs(reportData.R1_C1.ringRatioRunningMileage) || 0
                                                    }}(公里)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="right-tab">
                                <div class="tab">
                                    <div class="numcards">
                                        <div class="numcard">
                                            <div class="num blue">{{ reportData.R1_C1.totalDoorTimes || 0 }}</div>
                                            <div class="numlabel">总开关门次数</div>
                                            <div class="numlabel">(次)</div>
                                            <div class="arrow">
                                                <span>
                                                    环比上{{ textType }}{{
                                                        getClassName(reportData.R1_C1.ringRatioDoorTimes).text
                                                    }}
                                                </span>
                                                <span class="arrow">
                                                    <arrow :size="20"
                                                        :dirc="getClassName(reportData.R1_C1.ringRatioDoorTimes).name">
                                                    </arrow>
                                                </span>
                                                <span class="arrow"
                                                    :class="[getClassName(reportData.R1_C1.ringRatioDoorTimes).name]">{{
                                                        Math.abs(reportData.R1_C1.ringRatioDoorTimes) || 0
                                                    }}(次)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab">
                                    <div class="numcards">
                                        <div class="numcard">
                                            <div class="num blue">{{ reportData.R1_C1.totalRunningDuration || 0 }}</div>
                                            <div class="numlabel">总运行时长</div>
                                            <div class="numlabel">(小时)</div>
                                            <div class="arrow">
                                                <span>
                                                    环比上{{ textType }}{{
                                                        getClassName(reportData.R1_C1.ringRatioRunningDuration).text
                                                    }}
                                                </span>
                                                <span class="arrow">
                                                    <arrow :size="20"
                                                        :dirc="getClassName(reportData.R1_C1.ringRatioRunningDuration).name">
                                                    </arrow>
                                                </span>
                                                <span class="arrow"
                                                    :class="[getClassName(reportData.R1_C1.ringRatioRunningDuration).name]">{{
                                                        Math.abs(reportData.R1_C1.ringRatioRunningDuration) || 0
                                                    }}(小时)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="graphtabs">
                            <div class="graphtab">
                                <div class="subText">
                                    日均运行次数排行(前10)
                                </div>
                                <baseline></baseline>
                                <graph class="common-graphtab" :class="{ 'fullscreen': isFullscreen ? true : false }"
                                    :fullscreen="isFullscreen" :graphId="'service_graph_1'" :data="reportData.R1_C1_G1">
                                </graph>
                            </div>
                            <!-- <div class="graphtab">
                                <div class="subText">
                                    日均运行次数排行(倒数前10)
                                </div>
                                <baseline></baseline>
                                <graph class="common-graphtab" :class="{ 'fullscreen': isFullscreen ? true : false }"
                                    :fullscreen="isFullscreen" :graphId="'service_graph_2'" :data="reportData.R1_C1_G2">
                                </graph>
                            </div> -->
                            <div class="graphtab">
                                <div class="subText">
                                    非正常停梯次数(近6万次运行内)
                                </div>
                                <baseline></baseline>
                                <graph class="common-graphtab" :class="{ 'fullscreen': isFullscreen ? true : false }"
                                    :fullscreen="isFullscreen" :graphId="'service_graph_3'" :data="reportData.R1_C1_G3">
                                </graph>
                            </div>
                        </div>
                        <div class="tabs">
                            <div class="left-tab">
                                <div class="tab">
                                    <div class="numcards">
                                        <div class="numcard">
                                            <div class="num blue">{{ reportData.R1_C1.avgRunningTimes || 0 }}</div>
                                            <div class="numlabel">单梯平均运行次数</div>
                                            <div class="numlabel">(次)</div>
                                            <div class="arrow">
                                                <span>
                                                    环比上{{ textType }}{{
                                                        getClassName(reportData.R1_C1.ringRatioAvgRunningTimes).text
                                                    }}
                                                </span>
                                                <span class="arrow">
                                                    <arrow :size="20"
                                                        :dirc="getClassName(reportData.R1_C1.ringRatioAvgRunningTimes).name">
                                                    </arrow>
                                                </span>
                                                <span class="arrow"
                                                    :class="[getClassName(reportData.R1_C1.ringRatioAvgRunningTimes).name]">{{
                                                        Math.abs(reportData.R1_C1.ringRatioAvgRunningTimes) || 0
                                                    }}(次)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab">
                                    <div class="numcards">
                                        <div class="numcard">
                                            <div class="num blue">{{ reportData.R1_C1.avgRunningMileage || 0 }}</div>
                                            <div class="numlabel">单梯平均运行里程</div>
                                            <div class="numlabel">(公里)</div>
                                            <div class="arrow">
                                                <span>
                                                    环比上{{ textType }}{{
                                                        getClassName(reportData.R1_C1.ringRatioAvgRunningMileage).text
                                                    }}
                                                </span>
                                                <span class="arrow">
                                                    <arrow :size="20"
                                                        :dirc="getClassName(reportData.R1_C1.ringRatioAvgRunningMileage).name">
                                                    </arrow>
                                                </span>
                                                <span class="arrow  "
                                                    :class="[getClassName(reportData.R1_C1.ringRatioAvgRunningMileage).name]">{{
                                                        Math.abs(reportData.R1_C1.ringRatioAvgRunningMileage) || 0
                                                    }}(公里)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="right-tab">
                                <div class="tab">
                                    <div class="numcards">
                                        <div class="numcard">
                                            <div class="num blue">{{ reportData.R1_C1.avgDoorTimes || 0 }}</div>
                                            <div class="numlabel">单梯平均开关门次数</div>
                                            <div class="numlabel">(次)</div>
                                            <div class="arrow">
                                                <span>
                                                    环比上{{ textType }}{{
                                                        getClassName(reportData.R1_C1.ringRatioAvgDoorTimes).text
                                                    }}
                                                </span>
                                                <span class="arrow  ">
                                                    <arrow :size="20"
                                                        :dirc="getClassName(reportData.R1_C1.ringRatioAvgDoorTimes).name">
                                                    </arrow>
                                                </span>
                                                <span class="arrow  "
                                                    :class="[getClassName(reportData.R1_C1.ringRatioAvgDoorTimes).name]">{{
                                                        Math.abs(reportData.R1_C1.ringRatioAvgDoorTimes) || 0
                                                    }}(次)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab">
                                    <div class="numcards">
                                        <div class="numcard">
                                            <div class="num blue">{{ reportData.R1_C1.avgRunningDuration || 0 }}</div>
                                            <div class="numlabel">单梯平均运行时长</div>
                                            <div class="numlabel">(小时)</div>
                                            <div class="arrow">
                                                <span>
                                                    环比上{{ textType }}{{
                                                        getClassName(reportData.R1_C1.ringRatioRunningDuration).text
                                                    }}
                                                </span>
                                                <span class="arrow  ">
                                                    <arrow :size="20"
                                                        :dirc="getClassName(reportData.R1_C1.ringRatioRunningDuration).name">
                                                    </arrow>
                                                </span>
                                                <span class="arrow  "
                                                    :class="[getClassName(reportData.R1_C1.ringRatioRunningDuration).name]">{{
                                                        Math.abs(reportData.R1_C1.ringRatioRunningDuration) || 0
                                                    }}(小时)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </border>
                <border class="listcard">
                    <div class="temp">
                        <module-name :moduleName="'列表汇总'"></module-name>
                        <div class="listcontent" :class="{ 'fullscreen': isFullscreen ? true : false }">
                            <div class="list">
                                <div class="sub-head">
                                    <div class="title">
                                        困人列表
                                    </div>
                                    <div class="more"> </div>
                                </div>
                                <div class="list-main">
                                    <div class="list-head">
                                        <div class="head-item">序号</div>
                                        <div class="head-item">电梯编号</div>
                                        <div class="head-item">解救人数</div>
                                        <div class="head-item">困人时间</div>
                                        <div class="head-item">救援到达</div>
                                        <div class="head-item">救援用时</div>

                                    </div>
                                    <div class="temp-scroll">
                                        <div class="list-cell" v-for="(x, index) in reportData.R2_C2.list1" :key="index">
                                            <div class="cell-item">
                                                {{ index + 1 }}
                                            </div>
                                            <div class="cell-item">
                                                {{ x.elevatorName }}
                                            </div>
                                            <div class="cell-item">
                                                {{ x.alarmNumber }}
                                            </div>
                                            <div class="cell-item">
                                                {{ x.trappedTime }}
                                            </div>
                                            <div class="cell-item">
                                                {{ x.arriveTime }}
                                            </div>
                                            <div class="cell-item">
                                                {{ x.rescueTime || 0 }}{{ x.rescueTimeDesc }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="list">
                                <div class="sub-head">
                                    <div class="title">
                                        维保服务列表
                                    </div>
                                    <div class="more"> </div>
                                </div>
                                <div class="list-main">
                                    <div class="list-head">
                                        <div class="head-item">序号</div>
                                        <div class="head-item">维保日期</div>
                                        <div class="head-item">电梯编号</div>
                                        <div class="head-item">距上次保养</div>
                                        <div class="head-item">维保时长</div>
                                        <div class="head-item">回召结果</div>

                                    </div>
                                    <div class="temp-scroll">
                                        <div class="list-cell" v-for="(x, index) in reportData.R2_C2.list2" :key="index">
                                            <div class="cell-item">
                                                {{ index + 1 }}
                                            </div>
                                            <div class="cell-item">
                                                {{ x.date }}
                                            </div>
                                            <div class="cell-item">
                                                {{ x.elevatorName }}
                                            </div>
                                            <div class="cell-item">
                                                {{ x.lastMaintDuration }} {{ x.lastMaintDurationDesc }}
                                            </div>
                                            <div class="cell-item">
                                                {{ x.stopDuration }}{{ x.stopDurationDesc }}
                                            </div>
                                            <div class="cell-item">
                                                {{ x.state }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="list">
                                <div class="sub-head">
                                    <div class="title">
                                        回召列表
                                    </div>
                                    <div class="more"> </div>
                                </div>
                                <div class="list-main">
                                    <div class="list-head">
                                        <div class="head-item">序号</div>
                                        <div class="head-item">回召日期</div>
                                        <div class="head-item">电梯编号</div>
                                        <div class="head-item">回召原因</div>
                                        <div class="head-item">故障原因</div>
                                        <div class="head-item">停梯时长</div>

                                    </div>
                                    <div class="temp-scroll">
                                        <div class="list-cell" v-for="(x, index) in reportData.R2_C2.list3" :key="index">
                                            <div class="cell-item">
                                                {{ index + 1 }}
                                            </div>
                                            <div class="cell-item">
                                                {{ x.date }}
                                            </div>
                                            <div class="cell-item">
                                                {{ x.elevatorName }}
                                            </div>
                                            <div class="cell-item">
                                                {{ x.callRepairClassify }}
                                            </div>
                                            <div class="cell-item">
                                                {{ x.faultReason }}
                                            </div>
                                            <div class="cell-item">
                                                {{ x.stopDuration }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="list">
                                <div class="sub-head">
                                    <div class="title">
                                        运行列表
                                    </div>
                                    <div class="more"> </div>
                                </div>
                                <div class="list-main">
                                    <div class="list-head count5">
                                        <div class="head-item">序号</div>
                                        <div class="head-item">运行日期</div>
                                        <div class="head-item">运行次数</div>
                                        <div class="head-item">运行时长</div>
                                        <div class="head-item">开门次数</div>
                                    </div>
                                    <div class="temp-scroll">
                                        <div class="list-cell count5" v-for="(x, index) in reportData.R2_C2.list4"
                                            :key="index">
                                            <div class="cell-item">
                                                {{ index + 1 }}
                                            </div>
                                            <div class="cell-item">
                                                {{ x.day }}日
                                            </div>
                                            <div class="cell-item">
                                                {{ x.totalRunningTimes }}次
                                            </div>
                                            <div class="cell-item">
                                                {{ x.totalRunningDuration }}小时
                                            </div>
                                            <div class="cell-item">
                                                {{ x.totalDoorTimes }}次
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </border>
            </div>
        </div>
        <div class="temp-new">
            <border class="listcard w1">
                <div class="temp">
                    <module-name :moduleName="'换件'"></module-name>
                    <div class="listcontent" :class="{ 'fullscreen': isFullscreen ? true : false }">
                        <div class="list">
                            <div class="sub-head">
                                <div class="title">
                                    换件列表
                                </div>
                                <div class="more"> </div>
                            </div>
                            <div class="list-main">
                                <div class="list-head">
                                    <div class="head-item">序号</div>
                                    <div class="head-item">电梯编号</div>
                                    <div class="head-item">换件内容</div>
                                    <div class="head-item">换件数量</div>
                                    <div class="head-item">换件时间</div>
                                </div>
                                <div class="temp-scroll">
                                    <div class="list-cell" v-for="(x, index) in reportData.changeList" :key="index">
                                        <div class="cell-item">
                                            {{ index + 1 }}
                                        </div>
                                        <div class="cell-item">
                                            {{ x.ui_projectNum }}
                                        </div>
                                        <div class="cell-item">
                                            {{ x.db_note }}
                                        </div>
                                        <div class="cell-item">
                                            {{ x.db_replaceCount }}
                                        </div>
                                        <div class="cell-item">
                                            {{ x.ui_replaceTime }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </border>
            <border class="listcard w2" v-if="$data.dictionary.db_freqCode == '03'">
                <div class="temp">
                    <module-name :moduleName="'年检'"></module-name>
                    <div class="listcontent" :class="{ 'fullscreen': isFullscreen ? true : false }">
                        <div class="temp1">
                            <div class="numcards">
                                <div class="numcard">
                                    <div class="num">{{ reportData.finishedCount }}</div>
                                    <div class="numlabel">本月已检</div>
                                    <div class="numlabel">(次)</div>
                                </div>
                            </div>
                            <div class="numcards">
                                <div class="numcard">
                                    <div class="num">{{ reportData.nextCount }}</div>
                                    <div class="numlabel">下月应检</div>
                                    <div class="numlabel">(次)</div>
                                </div>
                            </div>
                        </div>
                        <div class="temp2">
                            <div class="list">
                                <div class="sub-head">
                                    <div class="title">
                                        本月已检
                                    </div>
                                    <div class="more"> </div>
                                </div>
                                <div class="list-main">
                                    <div class="list-head">
                                        <div class="head-item">序号</div>
                                        <div class="head-item">电梯编号</div>
                                        <div class="head-item">检验类型</div>
                                        <div class="head-item">检验时间</div>
                                        <div class="head-item">处理状态</div>
                                    </div>
                                    <div class="temp-scroll">
                                        <div class="list-cell" v-for="(x, index) in reportData.yearCheckList" :key="index">
                                            <div class="cell-item">
                                                {{ index + 1 }}
                                            </div>
                                            <div class="cell-item">
                                                {{ x.elevatorName }}
                                            </div>
                                            <div class="cell-item">
                                                {{ x.inspectTypeName }}
                                            </div>
                                            <div class="cell-item">
                                                {{ x.lastInspectTime }}
                                            </div>
                                            <div class="cell-item">
                                                {{ x.status }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="list">
                                <div class="sub-head">
                                    <div class="title">
                                        下月应检
                                    </div>
                                    <div class="more"> </div>
                                </div>
                                <div class="list-main">
                                    <div class="list-head">
                                        <div class="head-item">序号</div>
                                        <div class="head-item">电梯编号</div>
                                        <div class="head-item">检验类型</div>
                                        <div class="head-item">检验时间</div>
                                        <div class="head-item">处理状态</div>
                                    </div>
                                    <div class="temp-scroll">
                                        <div class="list-cell" v-for="(x, index) in reportData.nextYearCheckList"
                                            :key="index">
                                            <div class="cell-item">
                                                {{ index + 1 }}
                                            </div>
                                            <div class="cell-item">
                                                {{ x.elevatorName }}
                                            </div>
                                            <div class="cell-item">
                                                {{ x.inspectTypeName }}
                                            </div>
                                            <div class="cell-item">
                                                {{ x.lastInspectTime }}
                                            </div>
                                            <div class="cell-item">
                                                {{ x.status }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </border>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import arrow from './arrow.vue'
import graph from '../../customerBi/components/graph.vue'
import baseline from '../../customerBi/components/baseline.vue'
import { getDataApi, getBasicReport } from '@/api/module/dataPlatform'
import { getServiceReports } from '@/api/module/customerBI'
import { selectByConditionApi } from '@/api/module/serviceReport'
import { selectByConditionApi as getChangeListApi } from '@/api/module/partInstReplace'
import moment from 'moment'
const reportListParams = { "ui_currentPage": 1, "ui_pageSize": 200, "ui_type": "A0", "db_projectId": "", "db_freqCode": "02" }
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

const $data = reactive({
    graphData: {
        A126: [],
        A1: [],
        A2: []
    },
    computedDate: '时间',
    popVisible: false,
    dictionary: {
        currentType: 1,
        reportTypes: ['周报', '月报'],
        reportTypesEn: ['WEEKLY', 'MONTH'],
        reportTimes: [],
        db_freqCode: '03',
        textTypes: ['周', '月']
    },
    headerTab: {
        time: '',
        reportName: '',
        reportTime: '',
        projectName: '',
        projectRepair: '',
        support: '',
        save: '',
        suggestion: []
    },
    reportTimeList: [],
})
const textType = computed(() => {
    return $data.dictionary.textTypes[$data.dictionary.currentType]
})
const isLoading = ref(false)
const reportData = reactive({ // 命名规则 L1_C1_F1 L1左边/R1右边第一个 C1第一个卡片 F1卡片内第一层  
    L1_C1: {
        totalDuraton: 0,
        form: [],
        ringRatio: 0

    },
    L1_C2: {
        times: 0
    },
    L1_C3: {
        avgDuration: 0,
        totalCount: 0
    },
    L1_C4: {
        nums: 0
    },
    L2_C1: {
        count: 0,
        list: []
    },
    L2_C2_F1: {
        ringRatio: 0,
        totalCallback: 0,
        form: []
    },
    L2_C2_F2: {
        faultTotal: 0,
        test: 5,
        form: [],
        ringRatio: 0
    },
    R1_C1: {

    },
    R1_C1_G1: [],
    R1_C1_G2: [],
    R1_C1_G3: [],
    R2_C2: {
        list1: [],
        list2: [],
        list3: [],
        list4: []
    },
    changeList: [],
    yearCheckList: [],
    nextYearCheckList: [],
    nextCount: 0,
    finishedCount: 0
})
const getClassName = (v) => {
    let text
    let name
    if (v == '' || !v) {
        text = '减少'
        name = 'down'
    } else if (parseFloat(v) > 0) {
        text = '增加'
        name = 'up'
    } else if (parseFloat(v) < 0) {
        text = '减少'
        name = 'down'
    } else {
        text = '减少'
        name = 'down'
    }
    return {
        text,
        name
    }
}

const methods = {
    formateDate(x) {

        return moment(new Date(x)).format('YYYY-MM-DD')
    },
    changeType() {
        $data.dictionary.currentType = 1 - $data.dictionary.currentType
        if ($data.dictionary.currentType) {
            $data.dictionary.db_freqCode = '03'
        } else {
            $data.dictionary.db_freqCode = '02'
        }
        methods.getReportList({ db_projectId: props.projectId, db_freqCode: $data.dictionary.db_freqCode })
    },
    getReportList(params) {//{ db_projectId, db_freqCode }
        const p = Object.assign(reportListParams, params);
        console.log({ p })
        getServiceReports(p).then(x => {
            console.log(x)
            if (x.data.data.objectList.length) {
                $data.reportTimeList = x.data.data.objectList
                $data.computedDate = methods.formateDate($data.reportTimeList[0].db_time)
                methods.getBasicInfo($data.reportTimeList[0].db_time)
                methods.getReportData($data.reportTimeList[0].db_freqCode, $data.reportTimeList[0].db_projectId, $data.reportTimeList[0].db_time)
            } else {
                $data.reportTimeList = []
            }
        })
    },
    getBasicInfo(time) {
        getBasicReport({ db_freqCode: $data.dictionary.db_freqCode, db_projectId: props.projectId, db_time: time, token: props.token }, props.token).then(res => {
            console.log(res)
            if (res.data.data?.projectName) {
                $data.headerTab.time = res.data.data.reportTime;
                $data.headerTab.projectName = res.data.data.projectName;
                $data.headerTab.projectRepair = res.data.data.maintCompany;
                $data.headerTab.support = res.data.data.techSupport;
                $data.headerTab.save = res.data.data.insuCompany;
                $data.headerTab.reportName = res.data.data.reportName;
                methods.getSuggestion()//获取专家建议 年检信息
            }
        })
    },
    getSuggestion() {
        const dates = $data.headerTab.time.split('-')
        let startDate = dates[0]
        let endDate = dates[1]
        startDate = startDate.replaceAll('.', '-')
        endDate = endDate.replaceAll('.', '-')
        let code
        if ($data.dictionary.db_freqCode == '02') {
            code = '01,03'
        } else if ($data.dictionary.db_freqCode == '03') {
            code = '02,03'
        }
        const params = { "ui_currentPage": 1, "ui_pageSize": 50, "ui_type": "A0", db_reportTypeCode: code, "db_projectId": props.projectId, "ui_start_dataTime": startDate + " 00:00:00", "ui_end_dataTime": endDate + " 23:59:59" }
        selectByConditionApi(params).then(x => {
            if (x.data.data.objectList.length) {
                $data.headerTab.suggestion = x.data.data.objectList
            } else {
                $data.headerTab.suggestion = []
            }
        })
        const params2 = { "ui_currentPage": 1, "ui_pageSize": 100, "ui_type": "A0", "db_projectId": props.projectId, "ui_start_replaceTime": startDate + " 00:00:00", "ui_end_replaceTime": endDate + " 23:59:59" }
        getChangeListApi(params2).then(x => {
            if (x.data.data.objectList.length) {
                reportData.changeList = x.data.data.objectList
            } else {
                reportData.changeList = []
            }
        })

    },
    getReportData(freq, projectid, dateTime) {
        const date = new Date(dateTime)
        const year = date.getFullYear()
        const month = date.getMonth()
        const days = new Date(year, month, 0).getDate()
        const freqObj = {
            '02': [{ "count": "", "dateTime": "1673193600000", "freq": "02", "funcType": "A041", "iscurrentDate": "0", "projectid": "1598169443207352320", "regionCode": "" },
            { "count": "", "dateTime": "1673193600000", "freq": "02", "funcType": "A069", "iscurrentDate": "0", "projectid": "1598169443207352320", "regionCode": "" },
            { "count": "", "dateTime": "1673193600000", "freq": "02", "funcType": "A132", "iscurrentDate": "0", "projectid": "1598169443207352320", "regionCode": "" },
            { "count": "", "dateTime": "1673193600000", "freq": "02", "funcType": "A133", "iscurrentDate": "0", "projectid": "1598169443207352320", "regionCode": "" },
            { "count": "", "dateTime": "1673193600000", "freq": "02", "funcType": "A071", "iscurrentDate": "0", "projectid": "1598169443207352320", "regionCode": "" },
            { "count": "", "dateTime": "1673193600000", "freq": "02", "funcType": "A134", "iscurrentDate": "0", "projectid": "1598169443207352320", "regionCode": "" },
            { "count": "", "dateTime": "1673193600000", "freq": "02", "funcType": "A135", "iscurrentDate": "0", "projectid": "1598169443207352320", "regionCode": "" },
            { "count": "", "dateTime": "1673193600000", "freq": "02", "funcType": "A011", "iscurrentDate": "0", "projectid": "1598169443207352320", "regionCode": "" },
            { "count": "", "dateTime": "1673193600000", "freq": "02", "funcType": "A070", "iscurrentDate": "0", "projectid": "1598169443207352320", "regionCode": "" },
            { "count": "", "dateTime": "1673193600000", "freq": "02", "funcType": "A136", "iscurrentDate": "0", "projectid": "1598169443207352320", "regionCode": "" },
            { "count": "7", "dateTime": "1673193600000", "freq": "01", "funcType": "A137", "iscurrentDate": "0", "projectid": "1598169443207352320", "regionCode": "" },
            { "count": "", "dateTime": "1673193600000", "freq": "02", "funcType": "A139", "iscurrentDate": "0", "projectid": "1598169443207352320", "regionCode": "" },
            { "count": "", "dateTime": "", "freq": "", "funcType": "A131", "iscurrentDate": "1", "projectid": "1598169443207352320", "regionCode": "" },
            { "count": "", "dateTime": "", "freq": "02", "funcType": "A126", "iscurrentDate": "0", "projectid": "1598169443207352320", "regionCode": "" },
            { "count": "", "dateTime": "1673193600000", "freq": "02", "funcType": "A140", "iscurrentDate": "0", "projectid": "1598169443207352320", "regionCode": "" }],
            '03': [{ "count": "", "dateTime": "1669824000000", "freq": "03", "funcType": "A041", "iscurrentDate": "0", "projectid": "1524688836977201085", "regionCode": "" },
            { "count": "", "dateTime": "1669824000000", "freq": "03", "funcType": "A069", "iscurrentDate": "0", "projectid": "1524688836977201085", "regionCode": "" },
            { "count": "", "dateTime": "1669824000000", "freq": "03", "funcType": "A132", "iscurrentDate": "0", "projectid": "1524688836977201085", "regionCode": "" },
            { "count": "", "dateTime": "1669824000000", "freq": "03", "funcType": "A133", "iscurrentDate": "0", "projectid": "1524688836977201085", "regionCode": "" },
            { "count": "", "dateTime": "1669824000000", "freq": "03", "funcType": "A071", "iscurrentDate": "0", "projectid": "1524688836977201085", "regionCode": "" },
            { "count": "", "dateTime": "1669824000000", "freq": "03", "funcType": "A134", "iscurrentDate": "0", "projectid": "1524688836977201085", "regionCode": "" },
            { "count": "", "dateTime": "1669824000000", "freq": "03", "funcType": "A135", "iscurrentDate": "0", "projectid": "1524688836977201085", "regionCode": "" },
            { "count": "", "dateTime": "1673193600000", "freq": "02", "funcType": "A011", "iscurrentDate": "0", "projectid": "1598169443207352320", "regionCode": "" },
            { "count": "", "dateTime": "1669824000000", "freq": "03", "funcType": "A070", "iscurrentDate": "0", "projectid": "1524688836977201085", "regionCode": "" },
            { "count": "", "dateTime": "1669824000000", "freq": "03", "funcType": "A136", "iscurrentDate": "0", "projectid": "1524688836977201085", "regionCode": "" },
            { "count": days, "dateTime": "1669824000000", "freq": "01", "funcType": "A137", "iscurrentDate": "0", "projectid": "1524688836977201085", "regionCode": "" },
            { "count": "", "dateTime": "1669824000000", "freq": "03", "funcType": "A139", "iscurrentDate": "0", "projectid": "1524688836977201085", "regionCode": "" },
            { "count": "", "dateTime": "1669824000000", "freq": "03", "funcType": "A138", "iscurrentDate": "0", "projectid": "1524688836977201085", "regionCode": "" },
            { "count": "", "dateTime": "", "freq": "", "funcType": "A131", "iscurrentDate": "1", "projectid": "1524688836977201085", "regionCode": "" },
            { "count": "", "dateTime": "", "freq": "03", "funcType": "A126", "iscurrentDate": "0", "projectid": "1524688836977201085", "regionCode": "" },
            { "count": "", "dateTime": "1669824000000", "freq": "03", "funcType": "A140", "iscurrentDate": "0", "projectid": "1524688836977" }]
        }
        const params = freqObj[freq]
        params.forEach(x => {
            x.dateTime = dateTime;
            x.projectid = projectid
        })
        getDataApi(params, null, false).then(res => {

            if (res?.data?.data) {
                const data = res.data.data;
                console.log({ 报告: data })
                reportData.L1_C4.nums = data.A011?.data?.data || 0
                reportData.L1_C1.form = data.A132?.data?.data || []
                reportData.L1_C1.totalDuraton = data.A132?.data?.totalDuraton || 0
                reportData.L1_C1.ringRatio = data.A132?.data?.ringRatio || 0
                reportData.L1_C2.times = data.A041?.data?.data || 0
                reportData.L1_C3.avgDuration = data.A133?.data?.data?.avgDuration || 0
                reportData.L1_C3.totalCount = data.A133?.data?.data?.totalCount || 0
                reportData.L2_C1.count = data.A139?.data?.data?.length || 0
                reportData.L2_C1.list = data.A139?.data?.data || []
                reportData.L2_C2_F1.form = data.A134?.data?.data || []
                reportData.L2_C2_F1.ringRatio = data.A134?.data?.ringRatio || 0
                reportData.L2_C2_F1.totalCallback = data.A134?.data?.totalCallback || 0
                reportData.L2_C2_F2.form = data.A135?.data?.data || []
                reportData.L2_C2_F2.ringRatio = data.A135?.data?.ringRatio || 0
                reportData.L2_C2_F2.faultTotal = data.A135?.data?.faultTotal || 0
                reportData.R1_C1 = data.A136?.data?.data || {}
                reportData.R1_C1_G3 = data.A131?.data?.data || []
                reportData.yearCheckList = data.A138?.data?.data?.finishedMoreList || []
                reportData.nextYearCheckList = data.A138?.data?.data?.nextMoreList || []
                reportData.nextCount = data.A138?.data?.data?.nextCount || 0
                reportData.finishedCount = data.A138?.data?.data?.finishedCount || 0
                if (data.A126?.data?.data?.length > 10) {
                    reportData.R1_C1_G1 = data.A126.data.data.slice(0, 10)
                    reportData.R1_C1_G2 = data.A126.data.data.slice(-10).reverse()
                } else {
                    reportData.R1_C1_G1 = data.A126?.data?.data || []
                    reportData.R1_C1_G2 = data.A126?.data?.data?.reverse() || []
                }
                reportData.R2_C2.list1 = data.A069?.data?.moreData || []
                reportData.R2_C2.list2 = data.A071?.data?.moreData || []
                reportData.R2_C2.list3 = data.A070?.data?.moreData || []
                if (data.A137?.data.length) {
                    reportData.R2_C2.list4 = data.A137.data.map(e => {
                        const keys = Object.keys(e.data)
                        keys.forEach(k => {
                            e[k] = e.data[k]
                        })
                        return e
                    })
                } else {
                    reportData.R2_C2.list4 = []
                }


                if (!isLoading.value) {
                    isLoading.value = true
                }
            } else {
                reportData.L1_C4.nums = 0
                reportData.L1_C1.form = []
                reportData.L1_C1.totalDuraton = 0
                reportData.L1_C1.ringRatio = 0
                reportData.L1_C2.times = 0
                reportData.L1_C3.avgDuration = 0
                reportData.L1_C3.totalCount = 0
                reportData.L2_C1.count = 0
                reportData.L2_C1.list = []
                reportData.L2_C2_F1.form = [{}, {}, {}, {}, {}]
                reportData.L2_C2_F1.ringRatio = 0
                reportData.L2_C2_F1.totalCallback = 0
                reportData.L2_C2_F2.form = [{}, {}, {}, {}, {}, {}]
                reportData.L2_C2_F2.ringRatio = 0
                reportData.L2_C2_F2.faultTotal = 0
                reportData.R1_C1 = {}
                reportData.R1_C1_G3 = []
                reportData.yearCheckList = []
                reportData.nextYearCheckList = []
                reportData.nextCount = 0
                reportData.finishedCount = 0
                reportData.R1_C1_G1 = []
                reportData.R1_C1_G2 = []
                reportData.R2_C2.list1 = []
                reportData.R2_C2.list2 = []
                reportData.R2_C2.list3 = []
                reportData.R2_C2.list4 = []
                if (!isLoading.value) {
                    isLoading.value = true
                }
            }
        })
    },
    rowClick(row) {
        $data.computedDate = methods.formateDate(row.db_time)
        methods.getBasicInfo(row.db_time)
        methods.getReportData(row.db_freqCode, row.db_projectId, row.db_time)
    },
    popShow() {
        $data.popVisible = true
    }
}

onMounted(() => {
    methods.getReportList({ db_projectId: props.projectId, db_freqCode: $data.dictionary.db_freqCode })
})

const store = useStore()
const isFullscreen = computed(() => store.state.menu.fullsreen)
const parmas = [
    { freq: '', dateTime: '', projectid: '', funcType: 'A126', count: '', regionCode: '', iscurrentDate: '1' }//    近30日项目内电梯日均运行次数
]

watch(() => props.projectId, newVal => {
    if (props.projectId) {
        // methods.getReportList({ db_projectId: props.projectId, db_freqCode: $data.dictionary.db_freqCode })
    }
}, {
    immediate: true,
    deep: true
})

</script>
<style lang="scss" scoped>
@import './current.scss'
</style>