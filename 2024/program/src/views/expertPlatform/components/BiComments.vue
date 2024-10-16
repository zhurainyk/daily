<template>
  <div v-loading="loading" class="dialog-mian middle-dialog comments">
    <div class="dialog-head">
      <div>
        <label>详情</label>
      </div>
      <span class="cancel-img" @click="closeDialog"></span>
    </div>
    <div class="comments-body">
      <div class="item-main">
        <div class="head">
          <div>
            <label>描述:</label><span>{{ modal.db_content }}</span>
          </div>
          <div>
            <div>
              <label>创建人:</label><span>{{ modal.ui_createUserName }}</span>
            </div>
            <div>
              <label>创建时间:</label><span>{{ modal.ui_createTime }}</span>
            </div>
          </div>
        </div>
        <div class="replay">
          <label @click="openRelpy">回复</label>
        </div>
        <div class="itme-body">
          <div class="item" v-for="(x, index) in arrComments" :key="x.userId">
            <div class="range">评论{{ index + 1 }}</div>
            <div class="comment-card">
              <div class="userinfo">
                <div class="avator"></div>
                <div class="name">{{ x.name }}</div>
                <div class="date">{{ x.time }}</div>
              </div>
              <div class="note">{{ x.content }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-dialog
    v-if="dialog.visiableDialog"
    v-model="dialog.visiableDialog"
    class="min-dialog"
    :show-close="false"
  >
    <div class="dialog-mian min-dialog min-dialog-height reply-dialog">
      <div class="dialog-head">
        <div>
          <label>回复</label>
        </div>
        <span class="cancel-img" @click="dialog.visiableDialog = false"></span>
      </div>
      <div class="dialog-body">
        <div class="commemt">
          <div>
            <label>评论</label>
            <el-input
              v-model="addComment.content"
              :autosize="{ minRows: 10, maxRows: 14 }"
              type="textarea"
            ></el-input>
          </div>
          <div>
            <label>评论人</label>
            <el-select-v2
              v-model="addComment.userId"
              :options="users"
              filterable
              @change="changeSelectUser"
            >
            </el-select-v2>
          </div>
        </div>
      </div>
      <div>
        <div class="dialog-footer">
          <el-button plain @click="dialog.visiableDialog = false"
            >取消</el-button
          >
          <el-button type="primary" @click="saveFn">确认</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { useStore } from 'vuex'
import moment from 'moment'
import { ElMessage } from 'element-plus'
import useNormalValidateRespone from '@/utils/hooks/NormalValidate'
export default defineComponent({
  props: {
    selectByidApi: {
      type: Function,
      default: undefined
    },
    showList: {
      type: Array,
      default: () => []
    },
    currentData: {
      type: Object,
      default: () => {}
    },
    updateByIdApi: {
      type: Function,
      default: undefined
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const detailModel = ref({})
    const loading = ref(false)
    const showListTab: any = ref([])
    const closeDialog = () => {
      emit('close')
    }
    const users: any = ref([])
    const dialog = reactive({
      visiableDialog: false
    })
    const arrComments = ref([])
    let modal = ref({})
    class Comments {
      userId = ''

      name = ''

      time = ''

      content = ''
    }
    const addComment = ref(new Comments())
    const currentStore = useStore()
    const openRelpy = () => {
      addComment.value.time = moment().format('YYYY-MM-DD HH:mm:ss')
      addComment.value.content = ''
      addComment.value.name = currentStore.state.user.userInfo.db_id_username
      addComment.value.userId = currentStore.state.user.userInfo.db_id
      if (users.value.length <= 0) {
        selectByAllApi({ tableName: 'Usercenter_Account' }).then(x => {
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            users.value.push({
              value: key,
              label: v
            })
          })
        })
        dialog.visiableDialog = true
      }

      dialog.visiableDialog = true
    }

    const { showError } = useNormalValidateRespone()
    const saveFn = (args: any, model: any, fn) => {
      if (!addComment.value.userId) {
        ElMessage.warning('评论人必填')
        return
      }
      if (!addComment.value.content) {
        ElMessage.warning('评论必填')
        return
      }

      let tempArrComment = JSON.parse(JSON.stringify(arrComments.value))
      tempArrComment.unshift(addComment.value)
      detailModel.value.db_comments = JSON.stringify(tempArrComment)
      props.updateByIdApi(detailModel.value).then(x => {
        if (x.data.success) {
          if (showError(x.data.data)) {
            ElMessage.success('成功')
            arrComments.value.unshift(
              JSON.parse(JSON.stringify(addComment.value))
            )
            dialog.visiableDialog = false
          } else {
            ElMessage.error('失败')
          }
        } else {
          ElMessage.error('失败')
        }
      })
    }
    const changeSelectUser = val => {
      const tempuser = users.value.find(x => x.value == val)
      addComment.value.name = tempuser?.label
      addComment.value.userId = val
    }
    onMounted(() => {
      if (props.currentData['db_id']) {
        if (props.selectByidApi) {
          loading.value = true
          props.selectByidApi({ id: props.currentData['db_id'] }).then(x => {
            if (x.data.success) {
              detailModel.value = x.data.data
              modal.value = x.data.data
              if (x.data.data?.db_comments) {
                arrComments.value = JSON.parse(x.data.data?.db_comments)
              } else {
                arrComments.value = []
              }
            }
            loading.value = false
          })
        }
      }
    })
    return {
      loading,
      closeDialog,
      modal,
      arrComments,
      dialog,
      users,
      openRelpy,
      addComment,
      saveFn,
      changeSelectUser
    }
  }
})
</script>

<style lang="scss" scoped>
.reply-dialog {
  height: 600px;
  .commemt {
    width: 100%;
    padding: 0 50px;
    > div {
      padding: 0 0 20px 0;
      display: flex;
      flex-wrap: wrap;
      label {
        margin-bottom: 10px;
      }
      .el-select-v2 {
        width: 100%;
      }
    }
  }
}
.comments {
  height: 700px;
  .comments-body {
    width: 100%;
    display: flex;
    height: calc(100% - 50px);
  }
  .item-main {
    width: 100%;
    padding: 0 76px;
    height: 100%;
    .head {
      height: 90px;
      background: linear-gradient(-30deg, #cfe1f7, #ebeefc);
      border-radius: 10px;
      padding: 0 40px;
      > div {
        padding-top: 15px;
        display: flex;
        label {
          width: 70px;
        }
        span {
          word-break: break-all;
        }
        > div {
          display: flex;
          width: 50%;
        }
      }
    }
    .replay {
      text-align: right;
      margin-top: 13px;
      label {
        color: rgba(97, 88, 255, 1);
        height: 17px;
        cursor: pointer;
      }
    }
    .itme-body {
      height: calc(100% - 120px);
      overflow: auto;
    }
    .item {
      width: 100%;
      margin-top: 5px;

      .range {
        padding: 15px 0;
      }

      .comment-card {
        box-sizing: border-box;
        background: #f6f6ff;
        padding: 10px 10px;
        border-radius: 10px;

        .userinfo {
          display: flex;
          align-items: center;

          .avator {
            width: 30px;
            height: 30px;
            background: url('../../../public/images/dataplatform/customer2/usericon.png')
              no-repeat center/cover;
          }

          .name {
            padding: 0 10px 0 10px;
          }

          .date {
            color: rgba(153, 153, 153, 1);
          }
        }

        .note {
          // width: 707px;
          height: 60px;
          margin-left: 40px;
          background: #e5e5fd;
          box-sizing: border-box;
          padding: 10px;
          border-radius: 10px;
          word-break: break-all;
        }
      }
    }
  }
}
</style>
