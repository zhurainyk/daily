<template>
  <div class="page-list">
    <div class="page-head">
      <el-tabs v-model="selectTabs" @tab-change="handleClick">
        <el-tab-pane label="服务报表" name="A1"></el-tab-pane>
        <!-- <el-tab-pane label="巡检报表" name="A2"></el-tab-pane> -->
        <el-tab-pane label="年检报表" name="A3"></el-tab-pane>
        <!-- <el-tab-pane label="风险报表" name="A4"></el-tab-pane> -->
        <el-tab-pane label="换件报表" name="A5"></el-tab-pane>
      </el-tabs>
    </div>
    <TaskReport v-if="selectTabs == 'A1'"></TaskReport>
    <PatrolReport v-if="selectTabs == 'A2'"></PatrolReport>
    <AnnualInspectReport v-if="selectTabs == 'A3'"></AnnualInspectReport>
    <RiskReport v-if="selectTabs == 'A4'"></RiskReport>
    <PartInstReplaceReport v-if="selectTabs == 'A5'"></PartInstReplaceReport>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import TaskReport from './components/TaskReport'
import PatrolReport from './components/PatrolReport'
import RiskReport from './components/RiskReport'
import PartInstReplaceReport from './components/PartInstReplaceReport'
import AnnualInspectReport from './components/AnnualInspectReport'

export default defineComponent({
  components: {
    TaskReport,
    PatrolReport,
    RiskReport,
    AnnualInspectReport,
    PartInstReplaceReport
  },
  setup(props, contxt) {
    const selectTabs = ref('A1')
    const handleClick = (tab, event: Event) => {
      console.log(tab, event)
    }
    return {
      selectTabs,
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.page-list {
  background-color: white;
  .page-body {
    /* height: calc(100% - 220px); */
  }
}
</style>
