<template>
  <div class="mbase-info">
    <div class="body">
      <div v-if="baseInfo.db_taskId">
        <label>维修工单:</label>
        <span class="task-info" @click="getDetailtpage">{{
          baseInfo.ui_taskName
        }}</span>
      </div>

      <div class="imgs" v-if="baseInfo.db_maintAfterImgUrls">
        <label>维修后图片:</label>
        <div>
          <el-image
            v-for="(x, index) in imgs"
            :key="x"
            :src="x"
            :preview-src-list="imgs"
            :initial-index="index"
            fit="cover"
            lazy
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment'
import { menulist } from '@/router/menu'

export default defineComponent({
  props: {
    baseInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    const $router = useRouter()
    const imgs = computed(() => {
      if (props.baseInfo.db_maintAfterImgUrls) {
        const tempImgs = props.baseInfo.db_maintAfterImgUrls.split(',')

        return tempImgs
      }
      return []
    })
    const getDetailtpage = () => {
      if (props.baseInfo.db_taskId) {
        let url = $router.resolve({
          name: menulist.taskDetail.name,
          params: {
            id: props.baseInfo.db_taskId
          }
        }).href
        window.open(url, '_blank')
      }
    }
    return { getDetailtpage, imgs }
  }
})
</script>

<style lang="scss" scoped>
.mbase-info {
  background-color: white;
  width: 100%;
  .head {
    margin-bottom: 20px;
    padding-top: 10px;
  }
  .task-info {
    color: $p-color-primary;
    cursor: pointer;
  }
  .body {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    > div {
      width: 500px;
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
        width: 360px;
        background: #f7f8fa;
        border-radius: 10px;
        height: 40px;
        display: flex;
        padding-left: 20px;
        align-items: center;
      }
      &.dealStart {
        align-items: flex-start;
        width: 100%;
      }
      &.description {
        width: 1060px;
        align-items: flex-start;
        > label {
          margin-top: 5px;
        }
        .note {
          width: 360px;
          height: 80px;
          background: #f7f8fa;
          border-radius: 10px;
          padding: 5px;
          word-break: break-all;
          padding-left: 12px;
          align-items: flex-start;
        }
      }
      img {
        height: 160px;
        width: 130px;
        cursor: pointer;
      }
    }
    .imgs {
      width: 100%;
      align-items: flex-start;
      .el-image {
        width: 100px;
        height: 100px;
        margin-right: 10px;
      }
    }
  }
}
</style>
