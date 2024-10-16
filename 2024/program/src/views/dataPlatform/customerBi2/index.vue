<template>
    <div class="customerbi2 " id="customerbi2">
        <div class="header" :class="{ fullscreen: isFullscreen }">
            <div class="page-title">
                {{ getCompanyName }}
            </div>
            <div class="tabselect">
                <template v-for="tab in customerTab" :key="tab.value">
                    <template v-if="tab.show == 1">
                        <div class="tab" @click="tabChangeFn(tab)" :class="{ activetab: tab.value == activeTab.id }">
                            <div class="tab-name">{{ tab.label }}</div>
                            <div class="border-bottom"></div>
                        </div>
                    </template>
                </template>

            </div>
            <div class="select-border">
                <el-select filterable v-model="currentProjectId" class="m-2 selectcontent" placeholder="请选择项目" size="small"
                    style=" background: transparent; line-height: 40px;                                                                                                                                                                                             "
                    @change="changeProjectFn">
                    <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id" />
                </el-select>
            </div>
        </div>
        <div class="main trans-common" v-if="componentShow" :class="{ fullscreen: isFullscreen }">
            <component :is="activeTab.component" :projectId="currentProjectId" :token="token"></component>
        </div>
        <eleinfodialog ref="eleinfo_ref" :token="token"></eleinfodialog>
    </div>
</template>
<script   setup>
import { ref, computed, watch, onMounted, reactive, inject } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore, mapState } from 'vuex'
import realtime from './realTime'
import projecttotal from './projectTotal'
import technicalanalysis from './technicalAnalysis'
import servicereport from './serviceReport'
import eleinfodialog from './eleInfoDialog.vue'
import { getProjectList, getCustomerBoardTab, getElevatorRunningData } from '@/api/module/customerBI'
const store = useStore()
const customerTab = ref([
    { value: '01', label: '实时监控', show: '0', component: realtime },
    { value: '02', label: '项目汇总', show: '0', component: projecttotal },
    { value: '03', label: '技术分析', show: '0', component: technicalanalysis },
    { value: '04', label: '服务报告', show: '0', component: servicereport }
])
const isKunren = ref(false)
const dialogVisible = ref(false)
const componentShow = ref(true)
const getCompanyName = computed(() => {
    const s = store.state.user.userInfo.ui_extra
    return s ? (JSON.parse(s)?.system_name || '电梯智慧服务平台') : '电梯智慧服务平台'
})
const historyProjectId = computed(() => store.state.menu.currentProjectId)
const isFullscreen = computed(() => store.state.menu.fullsreen)
const currentProjectId = ref('')
const projectList = ref([])
const tempProjectId = ['', ''] //存储逻辑   [当前项目id,上一个项目id]   最新的id永远在前 

const changeProjectFn = (e) => {
    currentProjectId.value = e;
    store.commit('CHANGEPRO', e)//更新上一次打开页面的项目id
    const _tempProjectId = addTempProjectIdFn(e)
    console.log('缓存项目：', _tempProjectId)
    getElevatorRunningData({ currentProjectid: _tempProjectId[0], lastProjectid: _tempProjectId[1] }).then(x => {
        console.log('触发数据，没有其他用处')
    })
    getTabs()
}
let token = ref('')
const eleinfo_ref = ref()
const $bus = inject('$bus')
let toastVisible = false //公共弹窗状态
onMounted(() => {

    console.log('组件激活------------', historyProjectId.value)
    store.commit('ACTIVEDTAB', '01')
    $bus.off('showToast', showToast)
    $bus.on('showToast', showToast)
    $bus.on('toastState', visible => {
        toastVisible = visible
        console.log('弹窗状态1----------------', toastVisible)
    })
    $bus.on('autoRun', (data) => {//困人自动跳转 
        console.log('弹窗状态2----------------', toastVisible)
        if (!toastVisible && data.projectId != currentProjectId.value) {//首先弹窗关闭的情况下  然后是不同项目需要跳转
            currentProjectId.value = data.projectId;
            getTabs(showToast, data)
        } else {
            if (toastVisible) return //如果已经打开 就不用再次打开
            showToast(data)
        }
    })
})

const showToast = (e) => {
    toastVisible = true
    eleinfo_ref.value.showToast(e)
}
const getTabs = (cb, param) => {
    getCustomerBoardTab({ projectId: currentProjectId.value }).then(x => {
        componentShow.value = Object.values(x.data.data).filter(x => x == 1).length >= 1
        Object.entries(x.data.data).forEach(([k, v]) => {
            customerTab.value.forEach(tab => {
                if (tab.value == k) {
                    tab.show = v
                }
            })
        })
        const o = customerTab.value.find(x => x.show == 1)
        activeTab.id = o.value;
        activeTab.component = o.component
        if (cb) {
            cb(param)
        }
    })
}

const addTempProjectIdFn = (id) => {
    tempProjectId.unshift(id)
    if (tempProjectId.length > 2) {
        tempProjectId.pop()
    }
    return tempProjectId
}

const getProjectAPI = (noloading = {}) => { // 获取项目

    getProjectList(noloading).then(res => {
        if (res.data?.token) {
            token.value = res.data.token
        }
        if (res.data.data?.length) {
            projectList.value.push(...res.data.data)
            if (historyProjectId.value && res.data.data.find(x => x.id == historyProjectId.value)) { //回到上一次打开页面的项目界面
                currentProjectId.value = historyProjectId.value
                addTempProjectIdFn(currentProjectId.value)
            } else {
                currentProjectId.value = res.data.data[0].id
                addTempProjectIdFn(res.data.data[0].id)
            }

            getTabs()
        }
        else {
            if (res.data.data?.length === 0) {
                loading.close()
            } else {
                ElMessage.error('项目列表获取失败')
                if (loading?.close) {
                    loading.close()
                }
            }

        }
    }).catch(e => {
        console.log({ e })
        // ElMessage.error('服务器错误')
    })
}
const screenConfig = {
    '1920_1080': '1,0.81',
    '1680_1050': '1,0.9',
    '1600_900': '1,0.77',
    '1440_900': '1,0.87',
    '1400_1050': '1,1.1',
    '1366_768': '1,0.74',
    '1360_768': '1,0.74',
    '1280_1024': '1,1.18',
    '1280_960': '1,1.08',
    '1280_800': '1,0.84',
    '1280_768': '1,0.8',
    '1280_768': '1,0.72',
    '1280_720': '1,0.725'


}
function setScale(scale = '0', isFull = false) {
    let { width, height } = window.screen

    if (scale == 0) {
        const key = width + '_' + height
        console.log(key)
        scale = screenConfig[key] || '1,0.81'
        console.log(scale)
    }
    const selectorAll = document.querySelectorAll('.trans-common')
    for (let i = 0; i < selectorAll.length; i++) {
        selectorAll[i].style = `transform: scale(${scale}) ;transform-origin: top left `
    }
}
watch(
    () => isFullscreen,
    (newVal) => {
        // console.log(newVal.value)
        if (newVal.value) {
            // console.log('开启全屏')
            setTimeout(() => {
                setScale('1', true)
            })
        } else {
            // console.log('关闭全屏')
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



const activeTab = reactive({
    id: '',//01
    component: ''//realTime
})

const tabChangeFn = (tab) => {
    console.log('标签id：', tab.value)
    activeTab.id = tab.value
    activeTab.component = tab.component
    currentProjectId.value = currentProjectId.value
    store.commit('ACTIVEDTAB', tab.value)
    console.log({ store })
}
</script>
<style lang="scss" scoped>
@font-face {
    font-family: 'SourceHanSansCN-Regular';
    src: url('../../../public/fontFamily/SourceHanSansCN-Regular.ttf');
}

.customerbi2 {
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
            box-sizing: border-box;
            width: 442px;
            letter-spacing: 1px;
            font-family: 'SourceHanSansCN-Regular';
            font-size: 24px;
            color: #f3fcff;
            font-weight: bold;
            padding: 13px 69px 13px 48px;
            white-space: nowrap;
            text-align: center;
            text-shadow: 0 0 1px #f3fcff, 0 0 3px #f0f4f5;
        }

        .tabselect {
            position: relative;
            display: flex;
            margin-left: 85px;
            width: 760px;

            .baojing {
                cursor: pointer;
                position: absolute;
                top: 20px;
                right: 30px;

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
            }

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
    }

    .main.fullscreen {
        margin-top: 0;
    }
}
</style>