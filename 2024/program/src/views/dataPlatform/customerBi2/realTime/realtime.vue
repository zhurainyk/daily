<template>
    <div id="realtime">
        <moduleName :moduleName="modulename"></moduleName>
        <div class="tablelist">
            <el-scrollbar height="100%">
                <div class="item" v-for="(item, index) in tablelist" @click="editDetailFn(item)" :key="item.orderId">
                    <div class="left">
                        <div class="label"
                            :style="{ color: item.color, borderColor: item.color, backgroundColor: item.bgc||'rgba(35,154,255,.2)' }">
                            {{ item.orderTypeDesc }}</div>
                        <div class="content" :title="item.orderContent"> {{ item.orderContent }}</div>
                    </div>
                    <div class="right">
                        <div class="date">{{ item.date }} </div>
                        <div class="time">{{ item.time }}</div>
                    </div>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { menulist } from '@/router/menu'
import { useRouter } from 'vue-router'
import { getTaskIdByOrder } from '@/api/module/customerBI'
const props = defineProps({
    data: {
        type: Array,
        default: null
    }
})

const tablelist = computed(() => {
    return props.data   //||     tablelist2
})
const modulename = ref('实时信息推送')
let tablelist2 = reactive([
    { id: '1', orderTypeDesc: '工单进度', color: '#23FFFC', bgc: 'rgba(35, 255, 252, 0.2)', orderContent: '更新推更新推送更新推送更新推送更新推送送更新推更新推送更新推送更新推送更新推送送更新推更新推送更新推送更新推送更新推送送', date: '2022-5-12', time: '10:50:50' },
    { id: '2', orderTypeDesc: '审批进度', color: '#239AFF', bgc: 'rgba(35, 154, 255, 0.2)', orderContent: '更新推更新推送更新推送更新推送更新推送送', date: '2022-5-12', time: '10:50:50' },
    { id: '3', orderTypeDesc: '电梯物联网', color: '#FED52F', bgc: 'rgba(254, 213, 47, 0.2)', orderContent: '更更新推更新推送更新推送更新推送更新推送送新推送', date: '2022-5-12', time: '10:50:50' },
    { id: '4', orderTypeDesc: '工单进度', color: '#23FFFC', bgc: 'rgba(35, 255, 252, 0.2)', orderContent: '更新推送', date: '2022-5-12', time: '10:50:50' },
    { id: '5', orderTypeDesc: '审批进度', color: '#239AFF', bgc: 'rgba(35, 154, 255, 0.2)', orderContent: '更新推送', date: '2022-5-12', time: '10:50:50' },
    { id: '6', orderTypeDesc: '电梯物联网', color: '#FED52F', bgc: 'rgba(254, 213, 47, 0.2)', orderContent: '更新推送', date: '2022-5-12', time: '10:50:50' },

])
const $router = useRouter()
const editDetailFn = async (args) => {
    const res = await getTaskIdByOrder({ orderId: args.orderId })
    console.log(res)
    if (res?.data?.data) {
        let url = $router.resolve({
            name: menulist.taskDetail.name,
            params: {
                id: res?.data?.data
            }
        }).href
        window.open(url, '_blank')
    }
    //先通过orderId 获取db_id 然后再把这个闯过去
    return

}
</script>

<style lang="scss" scoped>
#realtime {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding-top: 1px;

    .tablelist {
        height: calc(100% - 55px);

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

            .content {
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