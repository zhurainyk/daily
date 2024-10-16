<template>
    <div class="technicalAnalysis">
        <div class="left">
            <div class="elevator-list">
                <module-name class="modulename" :moduleName="data.elevatorTotal"></module-name>
                <div class="list">
                    <el-scrollbar height="100%">
                        <div class="item" @click="methods.handleChange(item)" v-for="(item, index) in data.elevatorList"
                            :class="{ actived: item.db_id == data.currentElevatorId }" :key="item.db_id">
                            <span>{{ item.db_id_projectNum }}</span>
                            <svg v-show="item.ui_biCommentAreaList.filter(x => x.db_sureLabelCode == '00').length"
                                t="1675736681188" class="icon" viewBox="0 0 1058 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="2716" width="24" height="24">
                                <path
                                    d="M330.744242 885.372121l194.779798-129.861818 16.665859-11.106263h383.844848c36.486465 0 66.19798-29.659798 66.19798-66.146262v-529.19596c0-36.434747-29.711515-66.107475-66.19798-66.107475H132.305455c-36.486465 0-66.146263 29.659798-66.146263 66.107475v529.19596c0 36.486465 29.659798 66.146263 66.146263 66.146262h198.438787v140.968081m-66.146262 123.578182V810.550303H132.305455c-73.024646 0-132.305455-59.216162-132.305455-132.292525v-529.19596C0 76.024242 59.267879 16.808081 132.305455 16.808081h793.742222c73.076364 0 132.357172 59.216162 132.357171 132.240808v529.195959c0 73.076364-59.267879 132.292525-132.357171 132.292526h-363.830303L264.59798 1008.950303z m0 0"
                                    p-id="2717" fill="#23fffc"></path>
                            </svg>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
        </div>
        <div class="center">
            <border class="latest-list">
                <div class="head">
                    <module-name class="modulename" :moduleName="data.latestTitle"></module-name>
                    <div @click="methods.addNewComment" v-if="data.elevatorList.length" class="addnew">新建</div>
                </div>
                <div class="main">
                    <div class="item" v-for="(x, i) in data.allComentsList" @click="methods.changeSubject(x)">
                        <div class="subtitle">{{ i + 1 }}.{{ x.db_content }}</div>
                        <div class="subdate">{{ x.ui_createTime }}
                            <span @click.stop="methods.deleteSubjiect(x)" class="delete-icon"></span>
                        </div>
                    </div>
                </div>
            </border>
            <border class="detail-list">
                <div>
                    <module-name class="modulename" :moduleName="data.currentSubject.db_projectNum || '-'"></module-name>
                    <div class="main" v-if="data.currentSubject.db_content">
                        <div class="theme-card">
                            <div class="subtitle">
                                主题：{{ data.currentSubject.db_content }}
                            </div>
                            <div class="create">
                                <span>创建人：{{ data.currentSubject.ui_createUserName }}</span>
                                <span>创建时间：{{ data.currentSubject.ui_createTime }}</span>
                            </div>
                            <!-- <div class="note">描述：这是一段描述</div> -->
                        </div>
                        <div v-if="data.currentSubject.db_content" @click="methods.addReback" class="reback">回复
                        </div>
                        <div class="comment-list">
                            <div class="item" v-for="(x, i) in data.commentsList">
                                <div class="range">评论{{ data.commentsList.length - i }}</div>
                                <div class="comment-card">
                                    <div class="userinfo">
                                        <div class="avator"></div>
                                        <div class="name">{{ x.name }}</div>
                                        <div class="date">{{ x.time }}</div>
                                    </div>
                                    <div class="note">
                                        {{ x.content }}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </border>
        </div>
        <div class="right">
            <border class="graph-list">
                <databoard :data="elevatorData.rightData" @change="changeDataboard"></databoard>
            </border>
        </div>
    </div>
    <el-dialog v-model="data.commentVisible" :show-close="false" class='comment-dialog' width="800px" :modal="false"
        :close-on-click-modal="false">
        <template #header="{ close, titleId, titleClass }">
            <div class="comment-head">
                新增主题
            </div>
        </template>
        <div class="toast-form">
            <div class="tab">
                <div class="label">{{ data.currentElevatorName }}</div>
                <div class="value">
                    <textarea v-model="data.newComment" class="textarea"></textarea>
                </div>
            </div>
            <div class="submit">
                <!-- <el-button @click="methods.closeComment">取消</el-button> -->
                <div class="button" @click="methods.closeComment">取消</div>
                <div class="button primary" @click="methods.submitComment">确定</div>
                <!-- <el-button @click="methods.submitComment" type="primary">确定</el-button> -->
            </div>
        </div>
    </el-dialog>
    <el-dialog v-model="data.rebackDialog" :show-close="false" class='comment-dialog' width="800px" :modal="false"
        :close-on-click-modal="false">
        <template #header="{ close, titleId, titleClass }">
            <div class="comment-head">
                评论
            </div>
        </template>
        <div class="toast-form">
            <div class="tab">
                <div class="label">内容：</div>
                <div class="value">
                    <textarea v-model="data.newReback" class="textarea"></textarea>
                </div>
            </div>
            <div class="submit">
                <div class="button" @click="methods.closeReback">取消</div>
                <div class="button primary" @click="methods.submitReback">确定</div>
                <!-- <el-button @click="methods.closeReback">取消</el-button>
                <el-button @click="methods.submitReback" type="primary">确定</el-button> -->
            </div>
        </div>
    </el-dialog>
</template>
<script setup>
import { getProjectList, getElevatorByProjectId, getEleList, getCommentDetail, saveReback } from '@/api/module/customerBI'
import { reactive, ref, onMounted, computed, watch } from 'vue'
import { getDataApi } from '@/api/module/dataPlatform'
import databoard from '../../customerBi/databoard.vue'
import { saveApi } from '@/api/module/BICommentArea'
import { ElMessageBox, ElMessage } from 'element-plus'
import { selectByConditionApi as getCommentsApi } from '@/api/module/BICommentArea'
import { useStore } from 'vuex'
import moment from 'moment'
import { deleteByIdApi } from '@/api/module/issueList'
const store = useStore()
const subjectComment = reactive({
    "db_projectId": "",
    "db_elevId": "",
    "db_content": "",
})
const data = reactive({
    ui_biCommentAreaList: [],
    allComentsList: [],
    _allComentsList: [],
    currentElevatorId: '',
    elevatorTotal: 0,
    latestTitle: '最新',
    currentElevatorName: '',
    current_db_registCode: '',
    commentVisible: false,
    newComment: '',
    commentsList: [],
    rebackDialog: false,
    newReback: '',
    elevatorList: [],
    currentSubject: {

    }

})
const elevatorData = reactive({
    rightData: {}
})
const props = defineProps({
    projectId: '',
    token: '',
    elevatorList: [],
    currentElevatorId: ''
})
const projectId = computed(() => props.projectId)
onMounted(() => {
    console.log(props.projectId, props.token)
    methods.getElevatorListAPI(props.projectId, 'noupdate')
    getStatisticAPI(props.projectId)
    console.log({ store })
})
const item = reactive({

})
let parmas = [
    { freq: '03', dateTime: '', projectid: projectId, funcType: 'A122', count: '12', regionCode: '', iscurrentDate: '0' },// 回召每月走势统计
    { freq: '', dateTime: '', projectid: projectId, funcType: 'A121', count: '', regionCode: '', iscurrentDate: '' },//  回召类型分布统计
    { freq: '03', dateTime: '', projectid: projectId, funcType: 'A124', count: '12', regionCode: '', iscurrentDate: '0' },//  停梯时长
    { freq: '', dateTime: '', projectid: projectId, funcType: 'A125', count: '', regionCode: '', iscurrentDate: '0' },//   停梯时长类型分布
    { freq: '', dateTime: '', projectid: projectId, funcType: 'A126', count: '', regionCode: '', iscurrentDate: '1' },//    近30日项目内电梯日均运行次数
    { freq: '', dateTime: '', projectid: projectId, funcType: 'A130', count: '', regionCode: '', iscurrentDate: '1' },//  近30电梯故障排行统计
    { freq: '', dateTime: '', projectid: projectId, funcType: 'A131', count: '', regionCode: '', iscurrentDate: '1' },// 电梯5次故障运行次数排行
    { freq: '', dateTime: '', projectid: projectId, funcType: 'A020', count: '', regionCode: '', iscurrentDate: '' },// 故障原因
]
const changeDataboard = (originKey, value) => {
    const projectid = props.projectId
    parmas.forEach(x => {
        x.projectid = projectid
    })
    let temp = null
    if (typeof value === 'string') {
        console.log('字符串', originKey, value)
        temp = parmas.find(x => (x.funcType == 'A128' || x.funcType == 'A127' || x.funcType == 'A129' || x.funcType == 'A130'))
        temp.funcType = value

    } else if (typeof value === 'object') {
        console.log('对象', originKey, value)
        temp = parmas.find(x => x.funcType == originKey)
        temp.freq = value.freq
        temp.iscurrentDate = value.iscurrentDate
    }
    console.log({ parmas })
    getDataApi([temp], null, false).then(res => {
        if (res?.data?.data) {
            const data = res.data.data;
            if (typeof value === 'string') {
                elevatorData.rightData.A127 = data[temp.funcType].data.data
            } else if (typeof value === 'object') {
                elevatorData.rightData[originKey] = data[originKey].data.data
                console.log('拿到的数据：', elevatorData.rightData[originKey])
            }

        }
    })

}
const getStatisticAPI = (projectid) => { // 右侧列表

    parmas.forEach(x => {
        x.projectid = projectid
    })
    console.log({ parmas })
    getDataApi(parmas, null, false).then(res => {
        if (res?.data?.data) {
            const data = res.data.data;
            elevatorData.rightData = {
                'A125': data.A125.data.data,
                'A121': data.A121.data.data,
                'A020': data.A020.data.data,
                'A126': data.A126.data.data,
                'A131': data.A131.data.data,
                'A122': data.A122.data,
                'A124': data.A124.data,
                'A127': data?.A130?.data?.data || data?.A127?.data?.data || data?.A128?.data?.data || data?.A129?.data?.data,
            }
            return;

        }
    })

}
watch(projectId, newVal => {
    methods.getElevatorListAPI(newVal, 'noupdate')
    getStatisticAPI(newVal)
})
const methods = {
    getElevatorListAPI(e, needupdate = '') {
        getEleList({ db_projectId: e, ui_type: 'A0', token: props.token }).then(res => {
            console.log(res)

            if (res.data.data.objectList.length) {
                data.elevatorList = res.data.data.objectList
                data.elevatorTotal = `电梯列表（${res.data.data.objectList.length}）`
                data.allComentsList = []
                res.data.data.objectList.forEach(x => {
                    const temp = x.ui_biCommentAreaList.filter(x => x.db_sureLabelCode == '00') || []
                    data.allComentsList.push(...temp)
                })
                data.allComentsList = data.allComentsList.sort((a, b) => b.db_createTime - a.db_createTime)
                data._allComentsList = JSON.parse(JSON.stringify(data.allComentsList)) //存一份原始数据
                setTimeout(() => {
                    if (!needupdate) {
                        methods.handleChange(data.elevatorList[0])
                    } else {
                        data.currentElevatorId = ''
                        data.current_db_registCode = ''
                        if (data.allComentsList.length) {
                            methods.changeSubject(data.allComentsList[0])

                        } else {
                            data.currentSubject = {}
                        }
                    }

                })
            } else {
                data._allComentsList = []
                data.allComentsList = []
                data.commentsList = []
                data.currentSubject = {}
            }
        })
    },
    handleChange(elevatorItem) {
        if (data.currentElevatorId == elevatorItem.db_id) {//二次点击取消
            data.currentElevatorId = ''
            data.current_db_registCode = ''
            data.allComentsList = JSON.parse(JSON.stringify(data._allComentsList))
            if (data.allComentsList.length) {
                methods.changeSubject(data.allComentsList[0])
            }
            return
        }
        data.currentElevatorId = elevatorItem.db_id
        data.currentElevatorName = elevatorItem.db_id_projectNum
        data.allComentsList = []
        data.allComentsList = elevatorItem.ui_biCommentAreaList.filter(x => x.db_sureLabelCode == '00').sort((a, b) => b.db_createTime - a.db_createTime)//过滤 倒序 （防止主题切换）
        data.current_db_registCode = elevatorItem.db_registCode
        if (data.allComentsList.length) {
            methods.changeSubject(data.allComentsList[0])
        } else {
            data.commentsList = []
            data.currentSubject = {}
        }
    },
    changeSubject(x) {
        data.currentSubject = x
        getCommentDetail({ id: x.db_id }).then(res => {
            data.currentSubject = res.data.data
            if (data.currentSubject.db_comments) {
                let temp
                temp = JSON.parse(res.data.data.db_comments)
                if (Array.isArray(temp)) {
                    data.commentsList = temp
                } else {
                    data.commentsList = []
                }
            } else {
                data.commentsList = []
            }
        })
    },
    deleteSubjiect(x) {

        ElMessageBox.confirm('是否删除', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
        })
            .then(() => {
                // deleteByIdApi({ id: x.db_id }).then(x => {
                //     if (x.data.success) {
                //         methods.commentsList()
                //     }
                // })
                x.db_sureLabelCode = '01'
                saveReback(x).then(x => {
                    console.log(x)
                    if (x.data.success) {
                        ElMessage({
                            showClose: false,
                            message: '成功',
                            type: 'success',
                        })
                        methods.commentsList()
                    }
                })
            })
            .catch(() => { })
    },
    addNewComment() {
        if (!data.currentElevatorId) return ElMessage.warning('请选中电梯后再新建')
        data.commentVisible = true
    },
    closeComment() {
        data.commentVisible = false
        data.newComment = ''
    },
    submitComment() {
        if (data.newComment === '') {
            return ElMessage({
                showClose: false,
                message: '内容不能为空',
                type: 'warning',
            })
        }
        const params = {
            db_projectId: props.projectId,
            db_elevId: data.currentElevatorId,
            db_content: data.newComment
        }
        const p = { "db_id": "", "db_projectId": props.projectId, "db_registCode": data.current_db_registCode, "db_elevId": data.currentElevatorId, "db_projectNum": data.currentElevatorName, "db_sureLabelCode": "00", "db_createTime": "", "db_createUserId": "", "db_sureTime": "", "db_sureUserId": "", "db_content": data.newComment, "db_comments": "", "ui_projectName": "", "ui_sureLabel": "", "ui_createTime": "", "ui_createUserName": "", "ui_sureTime": "", "ui_sureUserName": "", "ui_start_createTime": "", "ui_end_createTime": "", "ui_start_sureTime": "", "ui_end_sureTime": "", "db_relateId": "" }
        saveApi(p).then(x => {
            if (x.data.data.check) {
                ElMessage({
                    showClose: false,
                    message: '成功',
                    type: 'success',
                })
                methods.commentsList()
            } else {
                ElMessage({
                    showClose: false,
                    message: x.data.data.rowMessageList.toString(),
                    type: 'error',
                })
            }
            data.commentVisible = false
            data.newComment = ''
        })
    },

    commentsList() {
        getCommentsApi({ 'db_elevId': data.currentElevatorId, 'ui_type': "A0" }).then(x => {
            console.log(x)
            data.ui_biCommentAreaList = x.data.data.objectList.filter(x => x.db_sureLabelCode == '00').reverse()
            if (data.ui_biCommentAreaList.length) {
                methods.changeSubject(data.ui_biCommentAreaList[0])
            } else {//不存在主题 清空评论主题
                data.commentsList = []//疑问代码 是否保留
                data.currentSubject = {}
            }
        })
        methods.getElevatorListAPI(projectId.value, 'noupdate')
    },
    addReback() {
        data.rebackDialog = true

    },
    closeReback() {
        data.rebackDialog = false
        data.newReback = ''
    },
    submitReback() {
        if (data.newReback === '') {
            return ElMessage({
                showClose: false,
                message: '内容不能为空',
                type: 'warning',
            })
        }
        data.rebackDialog = false
        const reback = {
            name: store.state.user.userInfo.db_id_username,
            time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            content: data.newReback,
            userId: store.state.user.userInfo.db_id
        }
        data.commentsList.unshift(reback)
        data.currentSubject.db_comments = JSON.stringify(data.commentsList)
        saveReback(data.currentSubject).then(x => {
            console.log(x)
            if (x.data.data.check) {
                ElMessage({
                    showClose: false,
                    message: '成功',
                    type: 'success',
                })
                data.newReback = ''
            }
        })

    },
}
</script>
<style lang="scss" scoped>
.technicalAnalysis {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;

    .left {
        .elevator-list {
            .modulename {
                margin-top: 5px;
                transform: translateX(20px);
            }

            .list {
                padding-top: 20px;
                height: 944px;
                width: 330px;
                margin-left: 0px;


                .item {
                    width: 302px;
                    background-color: rgb(13, 56, 121);
                    box-sizing: border-box;
                    padding: 0 20px;
                    line-height: 65px;
                    color: #fff;
                    font-size: 14px;
                    margin-bottom: 10px;
                    transition-duration: .3s;
                    overflow: hidden;
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .item.actived {
                    background-color: rgb(25, 105, 207);
                }

                .item:hover {
                    background-color: rgb(25, 105, 207);

                }
            }
        }
    }

    .center {
        margin-top: 5px;
        margin-right: 20px;
        width: 904px;
        flex-shrink: 1;
        box-sizing: border-box;

        .latest-list {
            width: 100%;
            height: 214px;

            .head {
                display: flex;
                justify-content: space-between;

                .addnew {
                    width: 80px;
                    height: 36px;
                    margin-right: 15px;
                    margin-top: 12px;
                    background: rgba(35, 154, 255, 0.1);
                    border: 1px solid rgb(25, 105, 207);
                    text-align: center;
                    line-height: 36px;
                    font-size: 16px;
                    color: rgb(25, 105, 207);
                    cursor: pointer;
                }

                .addnew:hover {
                    background: rgb(25, 105, 207);
                    color: #fff;
                }
            }

            .main {
                margin-top: 10px;
                box-sizing: border-box;
                padding: 13px 20px 13px 40px;
                overflow-y: scroll;
                height: calc(100% - 80px);

                &::-webkit-scrollbar {
                    display: none;
                }

                .item {

                    padding: 10px 0;
                    display: flex;
                    justify-content: space-between;
                    font-size: 16px;
                    box-sizing: border-box;
                    width: 100%;

                    .subtitle {
                        color: #fff;
                        cursor: pointer;
                        width: calc(100% - 200px);
                    }

                    .subdate {
                        // width: 200px;
                        color: #999999;

                        .delete-icon {
                            margin-left: 20px;
                            background-image: url(../../../../public/images/common/delete.png);
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            transform: translateY(1px);
                            background-repeat: no-repeat;
                            background-size: cover;
                            cursor: pointer;
                        }
                    }
                }
            }
        }

        .detail-list {
            margin-top: 20px;

            height: 750px;

            .main {

                box-sizing: border-box;
                padding: 0 42px;

                .theme-card {
                    margin-top: 26px;
                    box-sizing: border-box;
                    background-color: rgb(24, 124, 206);
                    color: #fff;
                    font-size: 16px;
                    padding: 27px 34px;

                    .create {
                        display: flex;
                        margin: 16px 0 20px;

                        span {
                            margin-right: 100px;
                            white-space: nowrap;
                        }

                        span:last-child {
                            margin-right: 0
                        }
                    }
                }

                .reback {
                    color: rgb(24, 124, 206);

                    text-align: right;
                    line-height: 25px;
                    font-size: 14px;
                    margin-right: 10px;
                    cursor: pointer;
                }

                .reback:hover {
                    color: #fff;
                }

                .comment-list {
                    color: #fff;
                    font-size: 16px;
                    box-sizing: border-box;
                    height: 500px;
                    overflow-y: scroll;
                    margin-top: 5px;

                    &::-webkit-scrollbar {
                        display: none;
                    }

                    .item {
                        margin-top: 5px;

                        .range {
                            padding: 15px 0;

                        }

                        .comment-card {
                            box-sizing: border-box;
                            background-color: rgb(15, 79, 148);
                            padding: 27px 34px;

                            .userinfo {
                                display: flex;
                                align-items: center;

                                .avator {
                                    width: 30px;
                                    height: 30px;
                                    margin: 5px 0;
                                    background: url('../../../../public/images/dataplatform/customer2/usericon.png') no-repeat center/cover;
                                }

                                .name {
                                    padding: 0 18px 0 12px;
                                }

                                .date {
                                    color: rgba(153, 153, 153, 1);
                                }
                            }

                            .note {
                                // width: 707px;
                                height: 84px;
                                margin-left: 40px;
                                background: rgb(18, 100, 179);
                                box-sizing: border-box;
                                padding: 15px 20px;

                            }
                        }
                    }

                    .item:nth-child(1) {
                        margin-top: -15px;
                    }


                }
            }



        }
    }

    .right {
        flex-shrink: 0;
        margin-top: 5px;
        width: 618px;
        height: 986px;

        .graph-list {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
<style lang="scss">
.comment-dialog {
    background-color: #000;

    .comment-head {
        font-size: 20px;
        text-align: center;
        color: #fff;
        padding-top: 15px
    }

    .toast-form {

        width: 100%;
        box-sizing: border-box;
        padding: 30px 25px 20px 25px;
        color: #fff;

        .tab {


            .label {
                width: 100px;
                font-size: 18px;
                margin-bottom: 5px;
                white-space: nowrap;
            }


            .value {
                textarea {
                    width: 100%;
                    font-size: 18px;
                    height: 200px;
                    line-height: 30px;
                    background-color: rgb(28, 40, 58);
                    color: #fff;
                    border: none;
                }
            }
        }

        .submit {
            margin: 20px auto;
            display: flex;
            justify-content: center;
            align-items: center;

            .button {
                width: 100px;
                height: 30px;
                border: 1px solid #009AFC;
                color: rgba(0, 154, 252, 1);
                line-height: 30px;
                text-align: center;
                font-size: 14px;
                box-sizing: border-box;
                cursor: pointer;

            }

            .button.primary {

                color: #FFFFFF;
                background: #009AFC;
                margin-left: 38px;
            }

        }

    }
}
</style>