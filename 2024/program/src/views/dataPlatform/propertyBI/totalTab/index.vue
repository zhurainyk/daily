<template>
    <div class="total-tab">
        <div class="tab-left">
            <div class="message-card">
                <message-card :data="$data.messageCardData" :companyId="companyId"></message-card>
            </div>
            <div class="today-card">
                <today-card :data="$data.TodayCardData" :companyId="companyId"></today-card>
            </div>
            <div class="realtime-card">
                <realtime-card :data="$data.RealtimeCardData" :companyId="companyId"></realtime-card>
            </div>
        </div>
        <div class="tab-center">
            <div class="map-card">
                <!-- <map-card :data="companyId" :companyType="'03'"></map-card> -->
                <div class="map2" :class="{ fullscreen: fullscreen }">
                    <map-card :data="companyId" :companyType="'03'"></map-card>
                </div>
            </div>
            <div class="temp">
                <div class="event-card">
                    <event-card :data="$data.EventCardData" :companyId="companyId"></event-card>
                </div>
                <div class="alarm-card">
                    <alarm-card :companyId="companyId" :data="$data.AlarmCardData"></alarm-card>
                </div>
            </div>
        </div>
        <div class="tab-right">
            <div class="yestoday-card">
                <yestoday-card :data="$data.YestodayCardData"></yestoday-card>
            </div>
            <div class="iot-card">
                <iot-card :data="$data.IotCardData"></iot-card>
            </div>
            <div class="insure-card">
                <insure-card :data="$data.InsureCardData"></insure-card>
            </div>
        </div>
    </div>
    <!-- <div class="map2">
        <map-card :data="companyId" :companyType="'03'"></map-card>
    </div> -->
</template>
<script setup>
import MessageCard from './messageCard.vue'
import TodayCard from './todayCard.vue'
import AlarmCard from './alarmCard.vue'
import EventCard from './eventCard.vue'
import InsureCard from './insureCard.vue'
import IotCard from './iotCard.vue'
// import MapCard from './mapCard.vue'
import RealtimeCard from './realtimeCard.vue'
import YestodayCard from './yestodayCard.vue'
import { ref, reactive, watch, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { getStaticApi, getLatestMessage, getRealTimePushEvent, getPropDynamicToday, getPropEventEarlyWarning, getInfoOverviewPartA } from '@/api/module/dataPlatform'
const props = defineProps({
    projectId: {
        type: String
    }
})
const $data = reactive({
    messageCardData: {},
    TodayCardData: {},
    AlarmCardData: [],
    EventCardData: {},
    InsureCardData: {},
    IotCardData: {},
    MapCardData: {},
    RealtimeCardData: [],
    YestodayCardData: {},
})
const store = useStore()
const companyId = computed(() => props.projectId)
const initData = (v) => {
    const params = [
        // { "count": "1", "dateTime": '', "freq": "", "funcType": "A141", "iscurrentDate": "1", "companyId": v, "companyType": "03" },
        { "count": "1", "dateTime": '', "freq": "04", "funcType": "A142", "iscurrentDate": "1", "companyId": v, "companyType": "03" },
        // { "count": "1", "dateTime": '', "freq": "", "funcType": "A144", "iscurrentDate": "1", "companyId": v, "companyType": "03" },
        // { "count": "1", "dateTime": '', "freq": "", "funcType": "A145", "iscurrentDate": "1", "companyId": v, "companyType": "03" },
        { "count": "1", "dateTime": '', "freq": "", "funcType": "A146", "iscurrentDate": "1", "companyId": v, "companyType": "03" },
        { "count": "1", "dateTime": '', "freq": "", "funcType": "A147", "iscurrentDate": "1", "companyId": v, "companyType": "03" },
        { "count": "1", "dateTime": '', "freq": "", "funcType": "A148", "iscurrentDate": "1", "companyId": v, "companyType": "03" },
        { "count": "1", "dateTime": '', "freq": "", "funcType": "A149", "iscurrentDate": "1", "companyId": v, "companyType": "03" },
        { "count": "1", "dateTime": '', "freq": "04", "funcType": "A150", "iscurrentDate": "1", "companyId": v, "companyType": "03" },
    ]
    getStaticApi(params).then(x => {
        const data = x.data.data
        if (data) {
            const { A142, A146, A147, A148, A149, A150 } = data

            $data.messageCardData = { ...$data.messageCardData, ...A142.data.data }

            // $data.EventCardData = { ...A144.data.data, ...A145.data.data }
            $data.YestodayCardData = { ...A146.data.data, ...A147.data.data }
            $data.IotCardData = A148.data.data
            $data.InsureCardData = { ...A149.data.data, ...A150.data.data }
        }
    })
    getInfoOverviewPartA({ companyId: v, companyType: '03' }).then(x => {
        if (x.data.data) {
            $data.messageCardData = { ...$data.messageCardData, ...x.data.data }
        }
    })
    getPropDynamicToday({ "companyId": v }).then(x => {
        console.log({ x })
        $data.TodayCardData = x.data.data
    })
    getPropEventEarlyWarning({ "companyId": v }).then(x => {
        console.log('信息：', x)
        if (x?.data?.data) {
            $data.EventCardData = x.data.data
        }

    })
}
onMounted(() => {
    getLatestMessage({ companyType: '03' }).then(x => {
        if (x.data.data.length) {
            $data.RealtimeCardData = x.data.data
        } else {
            $data.RealtimeCardData = []
        }
    })
    getRealTimePushEvent({ companyType: '03' }).then(x => {
        if (x.data.data.length) {
            $data.AlarmCardData = x.data.data
        } else {
            $data.AlarmCardData = []
        }
    })
})
const fullscreen = computed(() => store.state.menu.fullsreen)
watch(companyId, v => {
    console.log({ v })
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
    // overflow-y: auto;
    display: flex;
    box-sizing: border-box;
    padding: 0 20px;

    .tab-left {
        $width1: auto;
        $maxwidth1: 630px;
        flex-shrink: 20;
        z-index: 1;

        .message-card {
            width: $width1;
            max-width: $maxwidth1;
            height: 371px;
            margin-top: 12px;
        }

        .today-card {
            width: $width1;
            max-width: $maxwidth1;
            height: 150px;
            margin-top: 22px;
        }

        .realtime-card {
            width: $width1;
            max-width: $maxwidth1;
            height: 420px;
            margin-top: 19px;
        }
    }

    .tab-center {
        flex-shrink: 1;
        flex-grow: 1;
        margin: 0 15px;
        max-width: 855px;
        width: auto;

        .map-card {
            width: auto;
            min-width: 710px;
            max-width: 850px;
            height: 630px;

            .map2 {
                position: absolute;
                width: calc(100vw - 300px);
                height: 980px;
                top: 0;
                left: 0;
            }

            .map2.fullscreen {
                width: 100vw;
            }
        }


        .temp {
            display: flex;
            margin-top: 14px;

            .event-card {
                width: auto;
                max-width: 280px;
                height: 350px;
                margin-right: 15px;
                flex-grow: 1;
            }

            .alarm-card {
                width: auto;
                max-width: 560px;
                height: 350px;
                flex-grow: 1;
            }
        }
    }

    .tab-right {
        $width3: auto;
        $maxwidth3: 360px;
        flex-shrink: 20;

        .yestoday-card {
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

// .map2{
//     width:100%;
//     height:100%;
//     position: absolute;
//     top:0;
//     left:0;  
// }
</style>