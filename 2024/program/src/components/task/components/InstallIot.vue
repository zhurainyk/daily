<template>
  <div class="mbase-info">
    <div class="body">
      <div>
        <label>物联网方案:</label>
        <span>{{ baseInfo.ui_iotPlanName }}</span>
      </div>
      <div>
        <label>设备id:</label>
        <span>{{ baseInfo.db_deviceId }}</span>
      </div>
      <div>
        <label>在线状态:</label>
        <span>{{ online_state[baseInfo.db_onlineState] }}</span>
      </div>
      <div>
        <label>首次在线时间:</label>
        <span>{{ baseInfo.ui_firstOnlineTime }}</span>
      </div>
      <div class="dealStart">
        <label>打卡图片:</label>
        <div>
          <el-image
            v-if="orderInfo.db_dealStartImgUrl"
            :preview-src-list="[orderInfo.db_dealStartImgUrl]"
            :initial-index="0"
            :src="orderInfo.db_dealStartImgUrl"
            fit="cover"
            lazy
          />
        </div>
      </div>
      <div class="dealStart">
        <label>物联网安装图片:</label>
        <template v-if="baseInfo.db_endImgUrl">
          <div>
            <el-image
              v-for="(y, index) in baseInfo.db_endImgUrl.split(',')"
              :key="y"
              :src="y"
              :preview-src-list="baseInfo.db_endImgUrl.split(',')"
              :initial-index="index"
              fit="cover"
              lazy
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import moment from 'moment'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'

export default defineComponent({
  props: {
    orderInfo: {
      type: Object,
      default: () => {
        return {
          db_endImgUrl: ''
        }
      }
    },
    baseInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    const online_state = ref({})
    // if (props.baseInfo.db_endImgUrl) {
    //   props.baseInfo.db_endImgUrl = props.baseInfo.db_endImgUrl.split(',')
    // } else {
    //   props.baseInfo.db_endImgUrl = []
    // }
    const onpenImg = url => {
      if (!url) return
      const image = new Image()
      image.src = url
      const imwindow = window.open(url)
      imwindow?.document.write(image.outerHTML)
    }
    const timeFromat = time => {
      if (!time) return ''
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
    onMounted(() => {
      selectByAllTypeApi({ constType: 'online_state' }).then(x => {
        if (x.data.data) {
          online_state.value = x.data.data
        }
      })
    })
    return { onpenImg, timeFromat, online_state }
  }
})
</script>

<style lang="scss" scoped>
.mbase-info {
  margin: 20px 30px;
  background-color: white;
  min-height: 600px;
  .head {
    margin-bottom: 20px;
    padding-top: 10px;
  }
  .body {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-left: 60px;
    > div {
      width: 540px;
      margin-left: 50px;
      margin-top: 23px;
      display: flex;
      align-items: center;
      > label {
        font-weight: bold;
        white-space: nowrap;
        margin-right: 20px;
        width: 100px;
        text-align: right;
      }
      > span {
        width: 400px;
        background: #f1f1f1;
        border-radius: 10px;
        height: 40px;
        display: flex;
        padding-left: 10px;
        align-items: center;
      }
      > div {
        width: 420px;
      }
      &.dealStart {
        align-items: flex-start;
        .el-image {
          width: 130px;
          height: 160px;
          margin-right: 10px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
