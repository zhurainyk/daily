<template>
  <div class="mbase-info">
    <div class="body">
      <div>
        <label>项目名:</label>
        <span>{{ baseInfo.ui_projectName }}</span>
      </div>
      <div>
        <label>电梯名:</label>
        <span>{{ baseInfo.db_projectNum }}</span>
      </div>
      <div>
        <label>注册代码:</label>
        <span>{{ baseInfo.db_registCode }}</span>
      </div>
      <div>
        <label>使用单位:</label>
        <span>{{ baseInfo.ui_useCompanyName }}</span>
      </div>
      <div>
        <label>维保单位:</label>
        <span>{{ baseInfo.ui_maintCompanyName }}</span>
      </div>
      <div>
        <label>承保单位:</label>
        <span>{{ baseInfo.ui_insuCompanyName }}</span>
      </div>
      <!-- <div>
        <label>创建人:</label>
        <span>{{ baseInfo.ui_createUserName }}</span>
      </div> -->
      <div>
        <label>故障发生时间:</label>
        <span>{{ baseInfo.ui_faultOccurTime }}</span>
      </div>
      <div v-if="baseInfo.db_finishTLComfirmUserId">
        <label>完成耗时(小时):</label>
        <span>{{
          parseFloat((baseInfo.db_dealEndDuration || 0) / 3600).toFixed(2) || ''
        }}</span>
      </div>

      <!-- <div>
        <label>创建时间:</label>
        <span>{{ baseInfo.ui_createtime }}</span>
      </div> -->
      <!-- <div>
        <label>召修分类:</label>
        <span>{{ baseInfo.ui_callRepairClassifyDesc }}</span>
      </div>
      <div>
        <label>故障原因分析:</label>
        <span>{{ baseInfo.ui_faultReasonAnalysisDesc }}</span>
      </div> -->

      <div class="description">
        <label>故障描述:</label>
        <span class="note">{{ baseInfo.db_faultDesc }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import moment from 'moment'

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
    const timeFromat = time => {
      if (!time) return ''
      return moment(parseInt(time)).format('YYYY-MM')
    }
    onMounted(() => {})
    return { timeFromat }
  }
})
</script>

<style lang="scss" scoped>
.mbase-info {
  background-color: white;
  padding-left: 30px;
  .head {
    margin-bottom: 20px;
    padding-top: 10px;
  }
  .body {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    > div {
      width: 500px;
      margin-left: 20px;
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
        width: 350px;
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
      img {
        height: 160px;
        width: 130px;
        cursor: pointer;
      }
      &.description {
        width: 1060px;
        align-items: flex-start;
        > label {
          margin-top: 5px;
        }
        .note {
          width: 350px;
          height: 80px;
          background: #f7f8fa;
          border-radius: 10px;
          padding: 5px;
          word-break: break-all;
          padding-left: 12px;
          padding-right: 7px;
          align-items: flex-start;
        }
      }
    }
  }
}
</style>
