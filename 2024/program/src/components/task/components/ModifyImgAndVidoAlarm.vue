<template>
  <div class="dialog-mian max-dialog max-dialog-height reply-dialog">
    <div class="dialog-head">
      <div>
        <label>更改视频和图片</label>
      </div>
      <span class="cancel-img" @click="closeDialogFn"></span>
    </div>
    <div class="dialog-body">
      <div class="commemt">
        <div class="base-info">
          <div>
            <label>项目名称:</label>
            <span>{{ curentAlarm.ui_projectName }}</span>
          </div>
          <div>
            <label>电梯编号:</label>
            <span>{{ curentAlarm.db_projectNum }}</span>
          </div>
          <div>
            <label>接警来源:</label>
            <span>{{ curentAlarm.ui_alarmSrcCode }}</span>
          </div>
          <div>
            <label>接警时间:</label>
            <span>{{ curentAlarm.ui_alarmTime }}</span>
          </div>
        </div>
        <div>
          <label> 拉取时间:</label>
          <!-- <el-time-picker
            v-model="multipledata"
            is-range
            range-separator="~"
            start-placeholder="开始"
            end-placeholder="结束"
            value-format="YYYY-MM-DD HH:mm:ss"
            @change="changeTimeFn"
          /> -->
          <div class="time-select">
            <el-date-picker
              v-model="multipledata"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              range-separator="~"
              clearable
              @change="changeTimeFn"
            />

            <el-button type="primary" v-if="!isPending" @click="pullVideo"
              >拉取</el-button
            >
          </div>
        </div>
        <div class="get-list">
          <div v-if="videoslist" class="video-wss">
            <flvplayer
              ref="vidoeObj"
              :url="videoslist.url"
              :is-loading="false"
            ></flvplayer>
            <div>
              <span class="selected-tab" @click="addVideoImg">保存视频</span>
              <span class="delete-tab" @click="detetevideo">删除</span>
            </div>
          </div>
          <div v-else></div>
          <div class="history-video" v-if="db_videoRecords.length > 0">
            <label>拉取历史信息</label>
            <ul>
              <li v-for="x in db_videoRecords" :key="x">
                <span>{{
                  `在${x.beginTime}到${x.endTime}拉取视频${x.result}`
                }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="with-100">
          <label>视频:</label>
          <div class="upload-btn">
            <el-upload
              v-model:file-list="addfileslist"
              class="avatar-uploader emergency-file"
              :show-file-list="false"
              :http-request="(...argument) => beforeAvatarsUpload(...argument)"
              multiple
              :before-upload="beforeFilesLimitUpload"
              :disabled="isPending"
            >
              <el-button size="small" type="primary" v-if="!isPending">
                上传本地视频
                <el-icon class="el-icon--right"><Upload /></el-icon>
              </el-button>
            </el-upload>
            <!-- <el-button size="small" type="primary">
              拉取云端视频
              <el-icon class="el-icon--right"><Upload /></el-icon>
            </el-button> -->
          </div>
          <div class="upload-body">
            <div v-for="(x, index) in addfileslist" :key="x.url">
              <template v-if="(x.url || '').indexOf('pending') > -1">
                <div class="pengding">
                  <label>视频正在拉取中...</label>
                </div>
              </template>
              <template v-else>
                <video :src="x.url" controls></video>
                <span v-if="!isPending" @click="deleteCurrent(index)"
                  >删除</span
                >
              </template>
            </div>
          </div>
        </div>
        <div class="imgs-insure-body">
          <label>图片:</label>
          <el-upload
            v-model:file-list="addimgslist"
            class="avatar-uploader imgs-insure"
            list-type="picture-card"
            :show-file-list="true"
            multiple
            :http-request="
              (...argument) => beforeAvatarsImgsUpload(...argument)
            "
            :on-preview="handlePictureCardPreview"
            :before-remove="beforeremove"
            :before-upload="beforeupload"
            :disabled="isPending"
          >
            <el-icon class="avatar-uploader-icon2">+</el-icon>
          </el-upload>
        </div>
      </div>
    </div>
    <div>
      <div class="dialog-footer">
        <el-button plain @click="closeDialogFn">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" />
  </el-dialog>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  nextTick,
  computed
} from 'vue'
import { Upload } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { uploadIOFilesApi } from '@/api/module/commont'
import {
  playbackApi,
  addVideoAlarmByIdApi as addVideoByIdApi,
  addImgVideoAlarmApi as addImgVideoApi,
  deleteImgVideosAlarmApi as deleteImgVideosApi,
  selectAlarmByIdApi
} from '@/api/module/taskInfo'
import flvplayer from '@/views/dataPlatform/customerBi/flvplayer'

export default defineComponent({
  components: { Upload, flvplayer },
  props: {
    baseInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['close-dialog', 'save-data'],
  setup(props, { emit }) {
    const closeDialogFn = () => {
      emit('close-dialog')
    }
    const addComment = reactive({
      db_description: '',
      db_imagesUrls: '',
      db_filesUrls: '',
      db_fileNames: ''
    })
    const videoslist: any = ref(null)
    const searchTime = {
      elevatorId: '',
      endTimeStr: '',
      startTimeStr: ''
    }
    const multipledata = ref([])
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const currentStore = useStore()
    const $route = useRoute()
    const addimgslist: any = ref([])
    const addfileslist: any = ref([])
    const vidoeObj: any = ref(null)
    const db_videoRecords = ref([])
    const curentAlarm = ref({})
    const addVideoImg = () => {
      if (videoslist.value && videoslist.value.url) {
        addVideoByIdApi({
          id: props.baseInfo.db_id,
          urlAddress: videoslist.value.url,
          ...searchTime
        }).then(x => {
          if (x.data.success) {
            detetevideo()
            ElMessage.success('成功')

            addfileslist.value.push({
              url: `${Math.random()}_pending`,
              name: ''
            })
          } else {
            ElMessage.error('失败')
          }
        })
      }
    }
    const beforeupload = val => {
      if (!iscanAction()) return false
      return true
    }
    const beforeremove = async val => {
      if (!iscanAction()) return false
      const temp = await ElMessageBox.confirm('是否确认删除?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(x =>
          deleteImgVideosApi({
            imgurl: val.url,
            id: props.baseInfo.db_id
          }).then(x => {
            if (x.data.success) {
              ElMessage.success('删除成功')
              return true
            }
            ElMessage.error('删除失败')

            return false
          })
        )
        .catch(() => {
          return false
        })
      return temp
    }

    const beforeFilesLimitUpload = file => {
      if (
        file.name.toLocaleLowerCase().indexOf('.mp4') > -1 ||
        file.name.indexOf('.ogg') > -1 ||
        file.name.indexOf('.webm') > -1
      ) {
        return true
      }
      return false
    }
    const beforeAvatarsUpload = (args: any, model: any) => {
      if (
        args.file.name.toLocaleLowerCase().indexOf('.mp4') > -1 ||
        args.file.name.indexOf('.ogg') > -1 ||
        args.file.name.indexOf('.webm') > -1
      ) {
        const uid = args.file.uid
        uploadIOFilesApi({
          serverName: currentStore.state.user.type,
          tableName: $route.name,
          urlName: `insure_file`,
          multipartFiles: args.file
        }).then(x => {
          if (x.data.success) {
            const temp = addfileslist.value.find(x => x.uid == uid)
            temp.url = x.data.data
            temp.name = temp.name.replace(',', '')
          }
        })
        return true
      }
      return false
    }
    const beforeAvatarsImgsUpload = (args: any) => {
      if (
        args.file.name.indexOf('.jpg') > -1 ||
        args.file.name.indexOf('.png') > -1 ||
        args.file.name.indexOf('.jpeg') > -1
      ) {
        const uid = args.file.uid
        uploadIOFilesApi({
          serverName: currentStore.state.user.type,
          tableName: $route.name,
          urlName: `insure_imgs`,
          multipartFiles: args.file
        }).then(x => {
          if (x.data.success) {
            const temp = addimgslist.value.find(x => x.uid == uid)
            temp.url = x.data.data
          }
        })

        return true
      }
      return false
    }
    const handlePictureCardPreview = (uploadFile: any) => {
      dialogImageUrl.value = uploadFile.url!
      dialogVisible.value = true
    }
    const save = () => {
      if (!iscanAction()) return
      addComment.db_imagesUrls = addimgslist.value.map(x => x.url).join(',')
      addComment.db_filesUrls = addfileslist.value.map(x => x.url).join(',')
      // emit('save-data', addComment)
      addImgVideoApi({
        db_imgUrl: addimgslist.value.map(x => x.url).join(','),
        db_videoUrl: addComment.db_filesUrls,
        db_id: props.baseInfo.db_id
      }).then(x => {
        if (x.data.success) {
          ElMessage.success('成功')
          closeDialogFn()
        } else {
          ElMessage.error(x.data.message || '失败')
        }
      })
    }
    const detetevideo = () => {
      videoslist.value = null
    }
    const deleteCurrent = index => {
      if (!iscanAction()) return false
      ElMessageBox.confirm('是否确认删除?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(x => {
          deleteImgVideosApi({
            videourl: addfileslist.value[index].url,
            id: props.baseInfo.db_id
          }).then(x => {
            if (x.data.success) {
              addfileslist.value.splice(index, 1)
              ElMessage.success('删除成功')
            } else {
              ElMessage.error('删除失败')
            }
          })
        })
        .catch(() => {})
    }
    const changeTimeFn = args => {
      searchTime.startTimeStr = ''
      searchTime.endTimeStr = ''
      if (args) {
        searchTime.startTimeStr = args[0]
        searchTime.endTimeStr = args[1]
      }
    }
    const pullVideo = () => {
      detetevideo()
      if (searchTime.startTimeStr) {
        playbackApi(searchTime).then(x => {
          if (x.data.success) {
            if (x.data.data.http_flv) {
              videoslist.value = {
                url: x.data.data.http_flv
              }
              // videoslist.value = {
              //   url: 'wss://fsacam.tlzn-cq.com:10001/api/v1/stream/realtime?serial=05070002003ad1fab7c8&ch=1&stream=2'
              // }
              nextTick(() => {
                vidoeObj.value?.playFn()
              })
              ElMessage.success('成功')
            }
          } else {
            ElMessage.error(x.data.message || '获取失败')
          }
        })
      } else {
        ElMessage.warning('请选择时间段')
      }
    }
    const isPending = computed(() => {
      if (addfileslist.value.findIndex(x => x.url.indexOf('pending') > -1) > -1)
        return true
      return false
    })
    const iscanAction = () => {
      if (isPending.value) {
        ElMessage.warning('视频拉取中不能操作')
        return false
      }
      return true
    }
    onMounted(() => {
      if (props.baseInfo.db_id) {
        selectAlarmByIdApi({ id: props.baseInfo.db_id }).then(x => {
          if (x.data.success && x.data.data) {
            curentAlarm.value = x.data.data
            if (x.data.data.db_imgUrl) {
              addimgslist.value = x.data.data.db_imgUrl
                .split(',')
                .filter(x => x.indexOf('pending') < 0)
                .map(x => {
                  return {
                    url: x,
                    name: ''
                  }
                })
            }
            if (x.data.data.db_videoUrl) {
              addfileslist.value = x.data.data.db_videoUrl
                .split(',')
                .map((x, index) => {
                  const arr = x.split('/')
                  return {
                    url: x,
                    name: arr[arr.length - 1]
                  }
                })
            }
            if (x.data.data.db_videoRecords) {
              db_videoRecords.value = JSON.parse(x.data.data.db_videoRecords)
            }
            searchTime.elevatorId = x.data.data.db_elevId
          }
        })

        // searchTime.elevatorId = '1651469936570273792'
      }
    })
    return {
      closeDialogFn,
      addimgslist,
      beforeAvatarsUpload,
      beforeAvatarsImgsUpload,
      addComment,
      addfileslist,
      dialogVisible,
      dialogImageUrl,
      handlePictureCardPreview,
      save,
      multipledata,
      videoslist,
      detetevideo,
      changeTimeFn,
      vidoeObj,
      addVideoImg,
      deleteCurrent,
      pullVideo,
      beforeFilesLimitUpload,
      beforeremove,
      isPending,
      beforeupload,
      db_videoRecords,
      curentAlarm
    }
  }
})
</script>

<style lang="scss" scoped>
.reply-dialog {
  .commemt {
    width: 100%;
    padding: 0 50px;
    label {
      font-weight: bold;
    }
    .base-info {
      width: 100%;
      > div {
        width: 440px;
        display: flex;
        align-items: flex-start;
        > label {
          font-weight: bold;
          white-space: nowrap;
          margin-right: 20px;
          width: 60px;
          text-align: left;
          line-height: 40px;
        }
        > span {
          width: 300px;
          background: #f1f1f1;
          border-radius: 10px;
          height: 40px;
          display: flex;
          padding-left: 10px;
          align-items: center;
        }
      }
    }
    .time-select {
      display: flex;
      .el-button {
        margin-left: 10px;
      }
    }
    > div {
      padding: 10px 0 0 0;
      display: flex;
      flex-wrap: wrap;
      width: 500px;
      label {
        margin-bottom: 10px;
        width: 100%;
      }
      &.with-100 {
        width: 100%;
      }
    }
    .el-date-editor {
      width: 300px;
    }
    .upload-btn {
      display: flex;
      > button {
        margin-left: 10px;
      }
    }
    .upload-body {
      width: 100%;
      margin-bottom: 10px;
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      video {
        width: 300px;
      }
      > div {
        width: 300px;
        height: 200px;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        margin-right: 10px;
      }
      .pengding {
        width: 300px;
        height: 150px;
        background-color: #606266;
        display: flex;
        justify-content: center;
        align-items: center;
        > label {
          color: white;
          text-align: center;
        }
      }
      span {
        width: 100%;
        color: $p-color-error;
        cursor: pointer;
        margin-top: 10px;
      }
    }
    .imgs-insure-body {
      width: 100%;
    }
    .get-list {
      display: flex;
      width: 100%;
      margin-bottom: 15px;
      justify-content: space-between;
      > div {
        width: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        .selected-tab {
          color: $p-color-primary;
          cursor: pointer;
          margin-right: 10px;
        }
        .delete-tab {
          color: $p-color-error;
          cursor: pointer;
        }
        &.video-wss {
          width: 300px;
          height: 200px;
          position: relative;
        }
      }
      video {
        width: 300px;
        height: 200px;
      }
      .history-video {
        ul {
          list-style: decimal-leading-zero;
          margin-left: 25px;
        }
      }
    }
  }
  :deep().el-upload-list--picture-card {
    --el-upload-list-picture-card-size: 100px;
    .el-upload--picture-card {
      --el-upload-picture-card-size: 100px;
    }
  }
  :deep().emergency-file {
    ul {
      height: 50px;
      overflow: auto;
      display: flex;
      flex-wrap: wrap;
      > li {
        width: 300px;
        display: inline-flex;
      }
    }
  }

  .imgs-insure {
    overflow: auto;
    height: 220px;
  }
}
img {
  width: 100%;
}
</style>
