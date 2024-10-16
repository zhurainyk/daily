<template>
  <div class="detail">
    <div class="item">
      <label>任务名称:</label>
      <span>{{ currentData.db_id_taskName }}</span>
    </div>
    <div class="item">
      <label>任务类型:</label>
      <span>{{ currentData.ui_taskType }}</span>
    </div>
    <div class="item">
      <label>关联计划:</label>
      <span>{{ currentData.ui_scheduleName }}</span>
    </div>
    <div class="item">
      <label>所属项目:</label>
      <span>{{ currentData.ui_projectName }}</span>
    </div>
    <div class="item">
      <label>创建人:</label>
      <span>{{ currentData.ui_createUserName }}</span>
    </div>
    <div class="item">
      <label>项目内编号:</label>
      <span>{{ currentData.db_projectNum }}</span>
    </div>
    <div class="item">
      <label>执行人:</label>
      <span>{{ userExcuter }}</span>
    </div>
    <div class="item">
      <label>创建时间:</label>
      <span>{{ currentData.ui_createtime }}</span>
    </div>
    <div class="item">
      <label>预计开始时间:</label>
      <span>{{ currentData.ui_preEndtime }}</span>
    </div>
    <div class="item">
      <label>超时时间:</label>
      <span>{{ currentData.ui_timeout }}</span>
    </div>
    <div class="item">
      <label>开始作业时间:</label>
      <span>{{ currentData.ui_dealStarttime }}</span>
    </div>
    <div class="item">
      <label>完成作业时间:</label>
      <span>{{ currentData.ui_dealEndtime }}</span>
    </div>
    <div class="item">
      <label>优先级:</label>
      <span>{{ currentData.ui_taskPriority }}</span>
    </div>
    <div class="item">
      <label>电梯注册代码:</label>
      <span>{{ currentData.db_registCode }}</span>
    </div>
    <slot> </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { uniq } from 'lodash'

export default defineComponent({
  props: {
    showList: {
      type: Array,
      default: () => []
    },
    dbkey: {
      type: String,
      required: true,
      default: 'db_id'
    },
    currentData: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const detailModel = ref({})
    const userExcuter = computed(() => {
      let temp = []
      if (props.currentData.ui_executeUserName)
        temp = temp.concat(props.currentData.ui_executeUserName.split(','))
      if (props.currentData.ui_followUserName)
        temp = temp.concat(props.currentData.ui_followUserName.split(','))

      temp = temp.filter(x => x)
      temp = uniq(temp)
      return temp.join(',')
    })
    return {
      detailModel,
      userExcuter
    }
  }
})
</script>

<style lang="scss" scoped>
.detail {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  .item {
    width: 300px;
    min-height: 30px;
    margin-top: 20px;
    margin-left: 10px;
    display: flex;
    align-items: flex-start;
    border-radius: 10px;
    > label {
      font-weight: bold;
      width: 120px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-right: 5px;
    }
    img {
      width: 100px;
    }
  }
}
</style>
