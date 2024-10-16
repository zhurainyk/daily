<template>
    <div class="insureBi">
        <div class="header" :class="{ fullscreen: isFullscreen }">
            <div class="page-title">
                {{ getCompanyName }}
            </div>
            <div class="tabselect">
                <template v-for="tab in customerTab" :key="tab.value">
                    <template v-if="tab.show == 1">
                        <div class="tab" :class="{ activetab: tab.value == activeTab.id }">
                            <div class="tab-name">{{ tab.label }}</div>
                            <div class="border-bottom"></div>
                        </div>
                    </template>
                </template>
                <audio :src="require('../../../public/music/bibi.mp3')" muted ref="audio" id="audio" preload="auto" controls
                    hidden loop></audio>
                <div class="control">
                    <el-tooltip placement="right">
                        <template #content>
                            <div style="color: #1ac9ff">
                                警报声：{{ audioState ? '开' : '关' }}
                            </div>
                        </template>
                        <div class="baojing" @click="checkBaojing">
                            <svg v-show="!audioState" t="1656066830393" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="4470" width="28" height="28">
                                <path
                                    d="M837.818182 954.181818H186.181818V488.727273c0-179.2 146.618182-325.818182 325.818182-325.818182s325.818182 146.618182 325.818182 325.818182v465.454545z m-605.090909-46.545454h558.545454V488.727273c0-153.6-125.672727-279.272727-279.272727-279.272728s-279.272727 125.672727-279.272727 279.272728v418.909091z"
                                    fill="#999999" p-id="4471"></path>
                                <path
                                    d="M81.454545 907.636364h837.818182v46.545454h-837.818182zM521.309091 798.254545l-39.563636-20.945454 86.10909-172.218182h-186.181818l121.018182-239.709091 39.563636 20.945455-86.10909 172.218182h186.181818zM477.090909 0h46.545455v116.363636h-46.545455zM28.392727 378.414545l13.032728-44.683636 111.70909 32.581818-13.032727 44.683637zM849.92 366.289455l111.709091-32.628364 13.032727 44.683636-111.709091 32.628364zM716.846545 184.273455l73.774546-89.972364L826.647273 123.810909l-73.774546 89.972364zM174.126545 123.880727L210.571636 94.952727l72.401455 91.112728-36.445091 28.951272z"
                                    fill="#999999" p-id="4472"></path>
                            </svg>
                            <svg v-show="audioState" t="1656066830393" class="icon" viewBox="0 0 1024 1024" version="1.1"
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
                            <div style="color: #1ac9ff;cursor: pointer;" @click="autoRun" v-if="isKunren">电梯困人：{{ tipMsg }}
                            </div>
                        </template>
                        <div class="alarmIcon" @click="autoRun" v-if="isKunren"
                            :class="{ kunrening: isKunren ? true : false }">
                        </div>
                    </el-tooltip>
                </div>
            </div>
            <div class="select-border">
                <el-select filterable v-model="currentProjectId" class="m-2 selectcontent" placeholder="请选择" size="small"
                    style=" background: transparent; line-height: 40px;                                                                                                                                                                                             "
                    @change="changeProjectFn">
                    <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id" />
                </el-select>

            </div>
        </div>
        <div class="main trans-common" v-if="componentShow" :class="{ fullscreen: isFullscreen }">
            <component :is="activeTab.component" :projectId="currentProjectId" :token="token"></component>
        </div>

    </div>
</template>
<script   setup>
import { ref, computed, watch, reactive } from 'vue'
import { onMounted, inject } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
// import { getElevatorRunningData } from '@/api/module/customerBI'
import { getCompanyList } from '@/api/module/dataPlatform'
import totaltab from './totalTab/index.vue'
const customerTab = ref([
    { value: '01', label: '总览', show: '1', component: totaltab }
])
const activeTab = reactive({
    id: '01',
    component: totaltab
})
const $store = useStore()
const dialogVisible = ref(false)
const componentShow = ref(true)
const getCompanyName = computed(() => {
    const s = $store.state.user.userInfo.ui_extra
    return s ? (JSON.parse(s)?.system_name || '电梯智慧服务平台') : '电梯智慧服务平台'
 
})
const isFullscreen = computed(() => $store.state.menu.fullsreen)
const currentProjectId = ref('')
const projectList = ref([])
const tempProjectId = ['', ''] //存储逻辑   [当前项目id,上一个项目id]   最新的id永远在前 

const changeProjectFn = (e) => {
    currentProjectId.value = e;
    const _tempProjectId = addTempProjectIdFn(e)
    console.log('缓存项目：', _tempProjectId)
    $store.commit('CHANGEBIPRO',{key:companyKey,value:currentProjectId.value})
    // getElevatorRunningData({ currentProjectid: _tempProjectId[0], lastProjectid: _tempProjectId[1] }).then(x => {
    //     console.log('触发数据，没有其他用处')
    // })
}
let token = ref('')

const addTempProjectIdFn = (id) => {
    // tempProjectId.unshift(id)
    // if (tempProjectId.length > 2) {
    //     tempProjectId.pop()
    // }
    return id // tempProjectId
}
const companyKey ='property'
const historyCompanyId = computed(() => $store.state.menu.currentCompanyId[companyKey])
const getProjectAPI = (noloading = {}) => { // 获取项目
    getCompanyList({ companyType: '03' }).then(res => { 
        if (res.data?.token) {
            token.value = res.data.token
        }
        if (res.data?.data?.length) {
            projectList.value.push(...res.data.data)
            if (historyCompanyId.value && res.data.data.find(x => x.id == historyCompanyId.value)) { //回到上一次打开页面的项目界面
                currentProjectId.value = historyCompanyId.value 
            } else {
                currentProjectId.value = res.data.data[0].id 
            } 
            $store.commit('CHANGEBIPRO',{key:companyKey,value:currentProjectId.value})
            window.$propertyCompany = res.data.data
            addTempProjectIdFn(res.data.data[0].id)
        }
        else {
            if (res.data?.data?.length === 0) {
                loading.close()
            } else {
                ElMessage.error('项目列表获取失败')
                if (loading?.close) {
                    loading.close()
                }
            }
        }
    }).catch(e => {
        // ElMessage.error('服务器错误')
    })
}
function setScale(scale = '1,0.81', isFull = false) {
    const selectorAll = document.querySelectorAll('.trans-common')
    for (let i = 0; i < selectorAll.length; i++) {
        selectorAll[i].style = `transform: scale(${scale}) ;transform-origin: top left `
    }
}
watch(
    () => isFullscreen,
    (newVal) => {
        if (newVal.value) {
            setTimeout(() => {
                setScale('1', true)
            })
        } else {
            setTimeout(() => {
                setScale()
            })
        }
    },
    {
        deep: true,
        immediate: true
    }
)

~function () {
    getProjectAPI()
    setScale()
}()



/**
 * 首页控制声音的开关
 * 首页展示 是否困人的信息
 * 首页接受困人信息 报警一分钟（如果声音是关闭 ，就不播放  ） 闪人一分钟 然后 声音关闭 闪人关闭
 * 只以最后一次接收到困人信息为准  执行动作（声音（判断是否打开），闪人）一分钟后关闭  
 */
const $bus = inject('$bus')
const audio = ref(null)
const isKunren = ref(false)
const audioState = ref(false)
const tipMsg = ref('')
onMounted(() => {
    audio.value.muted = true //静音
    $bus.on('alarm_property', getAlarm)
})
let alarmTimer
let alarmData = {}
const getAlarm = (data = { projectId: '', eventName: '' }) => {
    alarmData = data
    tipMsg.value = data.elevatorName
    isKunren.value = true //闪人开始
    audio.value.play()
    if (alarmTimer) {
        clearTimeout(alarmTimer)
    }
    alarmTimer = setTimeout(() => {
        isKunren.value = false
        audio.value.pause()
        tipMsg.value = ''
    }, 60 * 1000)
}
const checkBaojing = () => { //priority 其他项目困人
    setTimeout(() => {
        audio.value.muted = !audio.value.muted
        audioState.value = !audio.value.muted
        if (isKunren.value) {
            audio.value.play()
        }

    })
}
const autoRun = () => {
    $bus.emit('alarm_property_toast', alarmData)
}


</script>
<style lang="scss" scoped>
@font-face {
    font-family: 'SourceHanSansCN-Regular';
    src: url('../../../public/fontFamily/SourceHanSansCN-Regular.ttf');
}

.insureBi {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: url('../../../public/images/dataplatform/customer/customer-bg.png') no-repeat center/cover;

    .header {
        width: 1920px;
        box-sizing: border-box;
        height: 71px;
        padding-right: 20px;
        background: url('../../../public/images/dataplatform/bg/top_bg.png') no-repeat center/cover;
        display: flex;

        .page-title {

            letter-spacing: 1px;
            font-family: 'SourceHanSansCN-Regular';
            font-size: 24px;
            color: #f3fcff;
            font-weight: bold;
            padding: 13px 69px 13px 48px;
            white-space: nowrap;
            text-align: center;
            box-sizing: border-box;
            width: 437px;
            text-shadow: 0 0 1px #f3fcff, 0 0 3px #f0f4f5;
        }

        .tabselect {
            position: relative;
            display: flex;
            margin-left: 85px;
            width: 760px;

            .tab {
                padding: 11px 34px;
                cursor: pointer;

                .tab-name {
                    font-size: 16px;
                    font-weight: normal;
                    color: #FFF;
                    line-height: 40px;
                    white-space: nowrap;
                    font-family: Microsoft YaHei;
                }

            }

            .activetab.tab {
                .tab-name {
                    width: 100%;
                    height: 100%;
                    color: transparent;
                    background-image: linear-gradient(to right, rgb(123, 218, 255) 15%, rgb(123, 218, 255) 15%, #2EACFC 18%, #2EACFC);
                    background-clip: text;
                    font-weight: bold;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;


                }

                .border-bottom {
                    width: 70%;
                    margin: 0 auto;
                    height: 2px;
                    background: #009AFC;
                    box-shadow: rgb(148 221 237) 0px 0px 18px 3px;
                    margin-top: -2px;
                }


            }


        }

        .select-border {
            position: relative;
            width: 301px;
            height: 34px;
            margin-top: 16px;
            overflow: hidden;
            border: 1px solid rgba(0, 154, 252, 0.5);
            box-shadow: 0 0 3px 1px rgb(37, 169, 245);
            transform: skew(-25deg, 0deg);

            .selectcontent {
                margin-left: 20px;
                width: 90%;
                height: 40px;
                transform: skew(25deg, 0deg);
                border: none;
                outline: none;
                background-color: transparent;
                user-select: none;

                :deep() .el-input__wrapper {
                    background: transparent;
                    border: none;
                    font-weight: bold;
                    box-shadow: none !important;
                }

                :deep().el-select__icon {
                    color: #29b6ff;
                }

                :deep() .el-input__inner {
                    color: #29b6ff;
                    font-size: 16px;
                    font-weight: bold;
                }

                :deep() .el-select.el-input.is-focus.el-input__wrapper {
                    box-shadow: none !important;
                }

                :deep() .el-input--small {
                    --el-input-height: '';
                }
            }


        }
    }

    .header.fullscreen {
        .tabselect {

            width: 1080px;
        }
    }



    .main {
        margin-top: -8px;
        // overflow-y: auto;
        // max-height: 1100px;
    }

    .main.fullscreen {
        margin-top: 0;
    }
}

.control {
    position: absolute;
    right: 45px;
    bottom: 18px;
    margin-right: 20px;
    width: 60px;
    height: 30px;
    display: flex;
    justify-content: space-between;
}

.baojing {
    cursor: pointer;
    width: 28px;
    height: 28px;
    margin-top: 3px;
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

.alarmIcon {
    cursor: pointer;
    width: 13px;
    height: 30px;
    background: url('../../../public/images/dataplatform/customer2/kunren.png') no-repeat center/cover;
}
</style>