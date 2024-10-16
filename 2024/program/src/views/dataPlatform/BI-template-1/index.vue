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

    </div>
</template>
<script   setup>
import { ref, computed, watch, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { getProjectList, getElevatorRunningData } from '@/api/module/customerBI'
import totaltab from './totalTab/index.vue'
const customerTab = ref([
    { value: '01', label: '总览', show: '1', component: totaltab }
])
const activeTab = reactive({
    id: '01',
    component: totaltab
})
const store = useStore()
const isKunren = ref(false)
const dialogVisible = ref(false)
const componentShow = ref(true)
const getCompanyName = computed(() => {
    // const s = store.state.user.userInfo.ui_extra
    // return s ? (JSON.parse(s)?.system_name || '梯控物联全国电梯大数据中心') : '梯控物联全国电梯大数据中心'
    return '电梯智慧服务平台'
})
const isFullscreen = computed(() => store.state.menu.fullsreen)
const currentProjectId = ref('')
const projectList = ref([])
const tempProjectId = ['', ''] //存储逻辑   [当前项目id,上一个项目id]   最新的id永远在前 

const changeProjectFn = (e) => {
    currentProjectId.value = e;
    const _tempProjectId = addTempProjectIdFn(e)
    console.log('缓存项目：', _tempProjectId)
    getElevatorRunningData({ currentProjectid: _tempProjectId[0], lastProjectid: _tempProjectId[1] }).then(x => {
        console.log('触发数据，没有其他用处')
    })
}
let token = ref('')

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
            currentProjectId.value = res.data.data[0].id
            addTempProjectIdFn(res.data.data[0].id)
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
    }

    .main.fullscreen {
        margin-top: 0;
    }
}
</style>