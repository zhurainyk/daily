<template>
  <div class="mbase-info">
    <div class="body">
      <div>
        <label>被困时间:</label>
        <span>{{ baseInfo.ui_trappedTime }}</span>
      </div>
      <div>
        <label>接警时间:</label>
        <span>{{ baseInfo.ui_alarmTime }}</span>
      </div>
      <div>
        <label>救援等级:</label>
        <span>{{ rescueLevel[baseInfo.db_rescueLevel] }}</span>
      </div>
      <div>
        <label>出警时间:</label>
        <span>{{ baseInfo.ui_policeTime }}</span>
      </div>
      <div>
        <label>到达时间:</label>
        <span>{{ baseInfo.ui_arriveTime }}</span>
      </div>
      <div>
        <label>解救时间:</label>
        <span>{{ baseInfo.ui_rescueTime }}</span>
      </div>
      <div>
        <label>解救人数:</label>
        <span>{{ baseInfo.db_alarmNumber }}</span>
      </div>
      <div>
        <label>被困人员信息:</label>
        <span>{{ baseInfo.db_trappedUser }}</span>
      </div>
      <div>
        <label>困人原因:</label>
        <span>{{ trappedReason[baseInfo.db_trappedReason] }}</span>
      </div>

      <div class="emergency-item-image-body">
        <label>图片:</label>
        <ul class="emergency-item-image">
          <li v-for="(y, index) in imgaes" :key="y" :attr-num="index + 1">
            <el-image
              :src="y"
              :preview-src-list="imgaes"
              :initial-index="index"
              fit="cover"
              lazy
            />
            <!-- <img :src="y" @click="onpenImg(y)" /> -->
          </li>
        </ul>
      </div>
      <div class="emergency-item-video">
        <label>视频:</label>
        <div>
          <template v-for="y in videos">
            <template v-if="(y || '').indexOf('pending') > -1">
              <div :key="y" class="pengding">
                <label>视频正在拉取中...</label>
              </div>
            </template>
            <template v-else>
              <video :key="y" :src="y" :autoplay="false" controls></video>
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import moment from 'moment'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'

export default defineComponent({
  props: {
    orderInfo: {
      type: Object,
      default: () => {
        return {}
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
    const rescueLevel = ref({})
    const trappedReason = ref({})
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
    const imgaes = computed(() =>
      props.baseInfo.db_imgUrl
        ? props.baseInfo.db_imgUrl
            .split(',')
            .filter(x => x.indexOf('pending') < 0)
        : []
    )
    const videos = computed(() =>
      props.baseInfo.db_videoUrl ? props.baseInfo.db_videoUrl.split(',') : []
    )
    onMounted(() => {
      selectByAllTypeApi({ constType: 'rescue_level' }).then(x => {
        if (x.data.data) {
          rescueLevel.value = x.data.data
        }
      })
      selectByAllTypeApi({ constType: 'fault_reasonAnalysis' }).then(x => {
        if (x.data.data) {
          trappedReason.value = x.data.data
        }
      })
    })
    return { onpenImg, timeFromat, rescueLevel, trappedReason, imgaes, videos }
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
      align-items: flex-start;
      > label {
        font-weight: bold;
        white-space: nowrap;
        margin-right: 20px;
        width: 100px;
        text-align: right;
        line-height: 40px;
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
      &.emergency-item-image-body {
        width: 100%;
      }
      .emergency-item-image {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        > li {
          list-style: none;
          margin-left: 5px;
          width: 150px;
          &::after {
            content: ' ' attr(attr-num) '';
            display: flex;
            width: 100%;
            text-align: center;
            justify-content: center;
          }
        }
      }
      &.emergency-item-video {
        width: 100%;
        > div {
          width: calc(100% - 200px);
          display: flex;
          flex-wrap: wrap;
          > div {
            margin-left: 10px;
            margin-bottom: 10px;
          }
        }
        .pengding {
          width: 250px;
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
      }
      img {
        height: 250px;
        cursor: pointer;
      }
      video {
        width: 250px;
        height: 150px;
        margin-right: 10px;
      }
    }
  }
}
</style>
