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
    return { onpenImg, timeFromat, rescueLevel, trappedReason }
  }
})
</script>

<style lang="scss" scoped>
.mbase-info {
  margin: 20px 30px;
  box-shadow: 0px 5px 19px 1px rgba(3, 0, 55, 0.1);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  height: 600px;
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
      width: 400px;
      margin-left: 50px;
      margin-top: 10px;
      display: flex;
      > label {
        font-weight: bold;
        white-space: nowrap;
        margin-right: 20px;
        width: 100px;
        text-align: right;
      }
      img {
        height: 250px;
        cursor: pointer;
      }
    }
  }
}
</style>
