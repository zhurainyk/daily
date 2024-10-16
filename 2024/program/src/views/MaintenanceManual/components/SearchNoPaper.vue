<template>
  <div class="no-paper-search dialog-mian">
    <div class="head dialog-head">
      <div>
        <label>选择无纸化条件</label>
        <el-select
          v-model="searchModel.name"
          placeholder=""
          clearable
          filterable
        >
          <el-option label="有效" value="1" />
          <el-option label="无效" value="0" />
        </el-select>
      </div>
      <span class="cancel-img" @click="closeDialog"></span>
    </div>
    <div class="result-table">
      <el-table
        ref="multipleTableRef"
        :data="[]"
        style="width: 100%"
        height="100%"
      >
        <el-table-column property="workManName" label="名字" />
        <el-table-column property="workStat" label="状态" />
        <el-table-column property="workManPhone" label="电话" />
        <el-table-column property="workStartDate" label="劳务合同生效日期" />
        <el-table-column property="workEndDate" label="劳务合同截止日期" />
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  emits: ['close'],
  setup(props, { emit }) {
    const searchModel = reactive({
      name: ''
    })
    const closeDialog = () => {
      emit('close')
    }
    return {
      closeDialog,
      searchModel
    }
  }
})
</script>

<style lang="scss" scoped>
.no-paper-search {
  min-height: 650px;
  .dialog-head {
    label {
      margin-right: 10px;
    }
  }
  .result-table {
    height: 590px;
  }
}
</style>
