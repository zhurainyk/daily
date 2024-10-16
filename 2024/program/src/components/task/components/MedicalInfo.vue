<template>
  <div class="mbase-info">
    <div class="body">
      <div>
        <label>平均层高:</label>
        <span>{{ baseInfo.db_averageHeight }}</span>
      </div>
      <div>
        <label>门:</label>
        <span>{{ baseInfo.db_doors }}</span>
      </div>
      <div>
        <label>楼层:</label>
        <span>{{ baseInfo.db_floors }}</span>
      </div>
      <div>
        <label>初装合格时间:</label>
        <span>{{ timeFromat(baseInfo.db_installPassedDate) }}</span>
      </div>
      <div>
        <label>是否有机房:</label>
        <span>{{ baseInfo.db_machineRoom == '01' ? '有' : '无' }}</span>
      </div>
      <div>
        <label>注册码:</label>
        <span>{{ baseInfo.db_registCode }}</span>
      </div>
      <div>
        <label>停站数:</label>
        <span>{{ baseInfo.db_stops }}</span>
      </div>
      <div>
        <label>96333:</label>
        <span>{{ baseInfo.db_rescueCode }}</span>
      </div>
      <div>
        <label>额定载重量:</label>
        <span>{{ baseInfo.db_ratedLoad }}</span>
      </div>
      <div>
        <label>传动方式:</label>
        <span>{{ drive_way[baseInfo.db_driveWay] }}</span>
      </div>
      <div>
        <label>额定速度:</label>
        <span>{{ baseInfo.db_ratedSpeed }}</span>
      </div>
      <div>
        <label>曳引比:</label>
        <span>{{ traction_ratio[baseInfo.db_tractionRatio] }}</span>
      </div>
      <div>
        <label>使用性质:</label>
        <span>{{ usePlaceCode[baseInfo.db_usePlaceCode] }}</span>
      </div>
      <div v-if="currentData.db_faultAppearanceId">
        <label>问题描述:</label>
        <span>{{ currentData.db_faultAppearanceId }}</span>
      </div>
      <div class="dealStart">
        <label>打卡图片:</label>
        <img
          v-if="orderInfo.db_dealStartImgUrl"
          :src="orderInfo.db_dealStartImgUrl"
          @click="onpenImg(orderInfo.db_dealStartImgUrl)"
        />
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
    },
    currentData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    let usePlaceCode = ref({})
    let traction_ratio = ref({})
    let drive_way = ref({})
    const onpenImg = url => {
      if (!url) return
      const image = new Image()
      image.src = url
      const imwindow = window.open(url)
      imwindow?.document.write(image.outerHTML)
    }
    const timeFromat = time => {
      if (!time) return ''
      return moment(parseInt(time)).format('YYYY-MM')
    }
    onMounted(() => {
      selectByAllTypeApi({ constType: 'used_place' }).then(x => {
        if (x.data.data) {
          usePlaceCode.value = x.data.data
        }
      })
      selectByAllTypeApi({ constType: 'drive_way' }).then(x => {
        if (x.data.data) {
          drive_way.value = x.data.data
        }
      })
      selectByAllTypeApi({ constType: 'traction_ratio' }).then(x => {
        if (x.data.data) {
          traction_ratio.value = x.data.data
        }
      })
    })
    return { onpenImg, timeFromat, usePlaceCode, traction_ratio, drive_way }
  }
})
</script>

<style lang="scss" scoped>
.mbase-info {
  margin: 20px 30px;
  background-color: white;
  min-height: 550px;
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
      &.dealStart {
        align-items: flex-start;
        width: 100%;
      }
      img {
        height: 160px;
        width: 130px;
        cursor: pointer;
      }
    }
  }
}
</style>
