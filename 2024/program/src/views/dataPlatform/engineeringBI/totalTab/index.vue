<template>
    <div class="total-tab">
        <div class="tab-left">
            <div class="message-card">
                <message-card :data="$data.messageCardData" :companyId="companyId"></message-card>
            </div>
            <div class="today-card">
                <today-card :data="$data.TodayCardData"></today-card>
            </div>
            <div class="realtime-card">
                <realtime-card :data="$data.RealtimeCardData" :companyId="companyId"></realtime-card>
            </div>
        </div>
        <div class="tab-center">

            <div class="graph-card">
                <graph-card :data="$data.GraphCardData"></graph-card>
            </div>
            <div class="temp">
                <div class="alarm-card">
                    <alarm-card :data="$data.AlarmCardData"></alarm-card>
                </div>
                <div class="event-card">
                    <event-card :data="$data.EventCardData"></event-card>
                </div>
            </div>
        </div>
        <div class="tab-right">
            <!-- <div class="yestoday-card">
                <yestoday-card></yestoday-card>
            </div> -->
            <div class="range-card">
                <range-card :data="$data.RangeCardData"></range-card>
            </div>
            <div class="iot-card">
                <iot-card :data="$data.IotCardData"></iot-card>
            </div>
            <div class="insure-card">
                <insure-card :data="$data.InsureCardData"></insure-card>
            </div>
        </div>
    </div>
</template>
<script setup>
import MessageCard from './messageCard.vue'
import TodayCard from './todayCard.vue'
import AlarmCard from './alarmCard.vue'
import EventCard from './eventCard.vue'
import InsureCard from './insureCard.vue'
import IotCard from './iotCard.vue'
// import MapCard from './mapCard.vue'
import GraphCard from './graphCard.vue'
import RealtimeCard from './realtimeCard.vue'
// import YestodayCard from './yestodayCard.vue'
import RangeCard from './rangeCard.vue'
import { ref, reactive, watch, computed, onMounted } from 'vue'
import { getStaticApi, getLatestMessage, getRealTimePushEvent, getWorkScheduleToday, getInfoOverviewPartA } from '@/api/module/dataPlatform'
const companyType = '01'
const props = defineProps({
    projectId: {
        type: String
    }
})
const $data = reactive({
    messageCardData: {},
    TodayCardData: {},
    AlarmCardData: [],
    EventCardData: [],
    InsureCardData: {},
    IotCardData: {},
    // MapCardData: {},
    RealtimeCardData: [],
    // YestodayCardData: {},
    RangeCardData: [],
    GraphCardData: {
        A020: [],
        A124: [],
        A121: [],
        A122: [],
        A125: [],
        A151: [],
    }
})
const companyId = computed(() => props.projectId)
const initData = (v) => {
    const params = [
        { "count": "", "dateTime": '', "freq": "", "funcType": "A020", "iscurrentDate": "1", "companyId": v, "companyType": companyType },//电梯故障类型分布统计(取召修工单（任务)里的故障原因分析
        { "count": "12", "dateTime": '', "freq": "03", "funcType": "A124", "iscurrentDate": "0", "companyId": v, "companyType": companyType },//停梯时长走势
        { "count": "", "dateTime": '', "freq": "04", "funcType": "A154", "iscurrentDate": "1", "companyId": v, "companyType": companyType },//年度停梯时长项目前20
        { "count": "", "dateTime": '', "freq": "04", "funcType": "A107", "iscurrentDate": "1", "companyId": v, "companyType": companyType },//总报障次数排行前20
        { "count": "", "dateTime": '', "freq": "", "funcType": "A121", "iscurrentDate": "1", "companyId": v, "companyType": companyType },//回召类型分布统计
        { "count": "12", "dateTime": '', "freq": "03", "funcType": "A122", "iscurrentDate": "0", "companyId": v, "companyType": companyType },//回召每月走势统计
        { "count": "", "dateTime": '', "freq": "", "funcType": "A125", "iscurrentDate": "1", "companyId": v, "companyType": companyType },//停梯时长类型分布 
        // { "count": "1", "dateTime": '', "freq": "", "funcType": "A141", "iscurrentDate": "1", "companyId": v, "companyType": companyType },
        { "count": "1", "dateTime": '', "freq": "04", "funcType": "A142", "iscurrentDate": "1", "companyId": v, "companyType": companyType },
        // { "count": "1", "dateTime": '', "freq": "", "funcType": "A144", "iscurrentDate": "1", "companyId": v, "companyType": companyType },
        // { "count": "1", "dateTime": '', "freq": "", "funcType": "A145", "iscurrentDate": "1", "companyId": v, "companyType": companyType },
        // { "count": "1", "dateTime": '', "freq": "", "funcType": "A146", "iscurrentDate": "1", "companyId": v, "companyType": companyType },
        // { "count": "1", "dateTime": '', "freq": "", "funcType": "A147", "iscurrentDate": "1", "companyId": v, "companyType": companyType },
        { "count": "1", "dateTime": '', "freq": "", "funcType": "A148", "iscurrentDate": "1", "companyId": v, "companyType": companyType },
        { "count": "1", "dateTime": '', "freq": "", "funcType": "A149", "iscurrentDate": "1", "companyId": v, "companyType": companyType },
        { "count": "1", "dateTime": '', "freq": "04", "funcType": "A150", "iscurrentDate": "1", "companyId": v, "companyType": companyType },
        { "count": "12", "dateTime": '', "freq": "03", "funcType": "A151", "iscurrentDate": "0", "companyId": v, "companyType": companyType }, //维保次数走势
        // { "count": "", "dateTime": '', "freq": "04", "funcType": "A153", "iscurrentDate": "1", "companyId": v, "companyType": companyType },

    ]

    getStaticApi(params).then(x => {
        const data = x.data.data
        if (data) {
            const { A020, A124, A154, A107, A121, A122, A125, A142, A148, A149, A150, A151 } = data

            $data.messageCardData = { ...$data.messageCardData, ...A142.data.data }

            $data.EventCardData = A107.data?.data || []
            // $data.YestodayCardData = { ...A146.data.data, ...A147.data.data }
            $data.IotCardData = A148.data.data
            $data.InsureCardData = { ...A149.data.data, ...A150.data.data }
            $data.RangeCardData = A154.data.data
            $data.GraphCardData.A020 = A020.data.data

            $data.GraphCardData.A121 = A121.data.data

            $data.GraphCardData.A125 = A125.data.data
            $data.GraphCardData.A151 = A151.data.map(x => {
                x = {
                    ...x,
                    ...x.data
                }
                x.desc = '次'
                return x
            })
            $data.GraphCardData.A122 = A122.data.map(x => {
                x = {
                    ...x,
                    ...x.data
                }
                return x
            })
            $data.GraphCardData.A124 = A124.data.map(x => {
                x = {
                    ...x,
                    ...x.data
                }
                return x
            })
            // $data.RangeCardData['02'] =A107.data.data   
        }
    })
    getInfoOverviewPartA({ companyId: v, companyType: '01' }).then(x => {
        if (x.data.data) {
            $data.messageCardData = { ...$data.messageCardData, ...x.data.data }
        }
    })
    getWorkScheduleToday({ "companyId": v }).then(x => {
        console.log({ x })
        $data.TodayCardData = x.data.data
    })
}
onMounted(() => {
    getLatestMessage({ companyType: companyType }).then(x => {
        if (x.data.data.length) {
            $data.RealtimeCardData = x.data.data
        } else {
            $data.RealtimeCardData = []
        }
    })
    getRealTimePushEvent({ companyType: companyType }).then(x => {
        if (x.data.data.length) {
            $data.AlarmCardData = x.data.data
        } else {
            $data.AlarmCardData = []
        }
    })
})
watch(companyId, v => {
    if (v) {
        initData(v)
    }
},
    {
        immediate: true,
        deep: true
    }
)
</script>
<style lang="scss" scoped>
.total-tab {
    width: 100%;
    height: 100%;
    display: flex;
    box-sizing: border-box;
    padding: 0 20px;

    .tab-left {
        $width1: auto;
        $maxwidth1: 630px;
        flex-shrink: 20;

        .message-card {
            width: $width1;
            max-width: $maxwidth1;
            height: 371px;
            margin-top: 12px;
        }

        .today-card {
            width: $width1;
            max-width: $maxwidth1;
            height: 216px;
            margin-top: 22px;
        }

        .realtime-card {
            width: $width1;
            max-width: $maxwidth1;
            height: 350px;
            margin-top: 19px;
        }
    }

    .tab-center {
        flex-shrink: 1;
        flex-grow: 1;
        margin: 0 15px;
        max-width: 855px;
        width: auto;


        .graph-card {
            width: auto;
            max-width: 847px;
            height: 630px;
        }

        .temp {
            display: flex;
            margin-top: 14px;

            .alarm-card {
                width: auto;
                max-width: 526px;
                height: 350px;
                flex-grow: 1;
                margin-right: 15px;
            }

            .event-card {
                width: auto;
                max-width: 308px;
                height: 350px;
                flex-grow: 1;
            }
        }
    }

    .tab-right {
        $width3: auto;
        $maxwidth3: 360px;
        flex-shrink: 20;

        .range-card {
            width: $maxwidth3;
            max-width: $maxwidth3;
            height: 371px;
            margin-top: 12px;
        }

        .iot-card {
            width: $width3;
            max-width: $maxwidth3;
            height: 320px;
            margin-top: 22px;
        }

        .insure-card {
            width: $width3;
            max-width: $maxwidth3;
            height: 247px;
            margin-top: 22px;
        }
    }
}
</style>