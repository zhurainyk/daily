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
            <div class="map-card">
                <!-- <map-card :data="companyId" :companyType="'02'"></map-card> -->
                <div class="map2" :class="{ fullscreen: fullscreen }">
                    <map-card :data="companyId" :companyType="'02'"></map-card>
                </div>
            </div>
            <div class="temp">
                <div class="_temp">
                    <div class="event-card">
                        <event-card :data="$data.EventCardData"></event-card>
                    </div>
                    <div class="iot-card">
                        <iot-card :data="$data.IotCardData"></iot-card>
                    </div>
                </div>
                <div class="alarm-card">
                    <alarm-card :companyId="companyId" :data="$data.AlarmCardData"></alarm-card>
                </div>
            </div>
        </div>
        <div class="tab-right">
            <div class="insure-card">
                <insure-card :data="$data.InsureCardData"></insure-card>
            </div>
            <div class="range-card">
                <range-card :data="$data.RangeCardData"></range-card>
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
import RealtimeCard from './realtimeCard.vue'
import YestodayCard from './yestodayCard.vue'
import RangeCard from './rangeCard.vue'
import { ref, reactive, watch, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { getStaticApi, getLatestMessage, getRealTimePushEvent, getInsureDynamicToday, getInsuEventEarlyWarning, getInfoOverviewPartA } from '@/api/module/dataPlatform'
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
    // YestodayCardData: {},
    RangeCardData: { '01': {}, '02': {} }
})
const store = useStore()
const fullscreen = computed(() => store.state.menu.fullsreen)
const companyId = computed(() => props.projectId)
const initData = (v) => {
    const params = [
        // { "count": "1", "dateTime": '', "freq": "", "funcType": "A141", "iscurrentDate": "1", "companyId": v, "companyType": "02" },
        { "count": "1", "dateTime": '', "freq": "04", "funcType": "A142", "iscurrentDate": "1", "companyId": v, "companyType": "02" },
        // { "count": "1", "dateTime": '', "freq": "", "funcType": "A144", "iscurrentDate": "1", "companyId": v, "companyType": "02" },
        // { "count": "1", "dateTime": '', "freq": "", "funcType": "A145", "iscurrentDate": "1", "companyId": v, "companyType": "02" },
        // { "count": "1", "dateTime": '', "freq": "", "funcType": "A146", "iscurrentDate": "1", "companyId": v, "companyType": "02" },
        // { "count": "1", "dateTime": '', "freq": "", "funcType": "A147", "iscurrentDate": "1", "companyId": v, "companyType": "02" },
        { "count": "1", "dateTime": '', "freq": "", "funcType": "A148", "iscurrentDate": "1", "companyId": v, "companyType": "02" },
        { "count": "1", "dateTime": '', "freq": "", "funcType": "A149", "iscurrentDate": "1", "companyId": v, "companyType": "02" },
        { "count": "1", "dateTime": '', "freq": "04", "funcType": "A150", "iscurrentDate": "1", "companyId": v, "companyType": "02" },
        { "count": "", "dateTime": '', "freq": "04", "funcType": "A152", "iscurrentDate": "1", "companyId": v, "companyType": "02" },
        { "count": "", "dateTime": '', "freq": "04", "funcType": "A153", "iscurrentDate": "1", "companyId": v, "companyType": "02" },
    ]
    getStaticApi(params).then(x => {
        const data = x.data.data
        if (data) {
            const { A142, A148, A149, A150, A152, A153 } = data

            $data.messageCardData = { ...$data.messageCardData, ...A142.data.data }

            // $data.EventCardData = A144.data.data

            // $data.YestodayCardData = { ...A146.data.data, ...A147.data.data }
            $data.IotCardData = A148.data.data
            $data.InsureCardData = { ...A149.data.data, ...A150.data.data }
            $data.RangeCardData['01'] = A152.data.data
            $data.RangeCardData['02'] = A153.data.data
        }
    })
    getInfoOverviewPartA({ companyId: v, companyType: '02' }).then(x => {
        if (x.data.data) {
            $data.messageCardData = { ...$data.messageCardData, ...x.data.data }
        }
    })
    getInsuEventEarlyWarning({ "companyId": v }).then(x => {
        if (x?.data?.data) {
            $data.EventCardData = x.data.data
        }

    })
    getInsureDynamicToday({ "companyId": v }).then(x => {
        console.log({ x })
        $data.TodayCardData = x.data.data
    })
}
onMounted(() => {
    getLatestMessage({ companyType: '02' }).then(x => {
        if (x.data.data.length) {
            $data.RealtimeCardData = x.data.data
        } else {
            $data.RealtimeCardData = []
        }
    })
    getRealTimePushEvent({ companyType: '02' }).then(x => {
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

        // .map-card {
        //     width: auto;
        //     max-width: 700px;
        //     height: 630px;
        // }
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

            ._temp {

                flex-shrink: 1;
                margin-right: 15px;

                .event-card {
                    width: auto;
                    max-width: 280px;
                    height: 120px;


                }

                .iot-card {
                    width: auto;
                    max-width: 280px;
                    height: 214px;
                    margin-top: 15px;
                }
            }


            .alarm-card {
                width: auto;
                max-width: 560px;
                height: 350px;
                flex-grow: 1;
                flex-shrink: 1;
            }
        }
    }

    .tab-right {

        $maxwidth3: 360px;
        flex-shrink: 20;
        flex-grow: 1;
        width: auto;
        max-width: $maxwidth3;



        .insure-card {
            width: 100%;
            height: 220px;
            margin-top: 12px;
        }

        .range-card {
            width: 100%;
            margin-top: 15px;
            height: 745px;
        }
    }
}
</style>