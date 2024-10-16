<template>
  <div class="page-list">
    <div class="page-head">
      <el-tabs v-model="selectTabs" @tab-change="handleClick">
        <el-tab-pane label="待验收" name="first"></el-tab-pane>
        <el-tab-pane label="待评价" name="third"></el-tab-pane>
      </el-tabs>
    </div>
    <TaskProPass v-if="selectTabs == 'first'"></TaskProPass>
    <TaskEvaluate
      v-else-if="selectTabs == 'third'"
      typepage="01"
    ></TaskEvaluate>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import TaskEvaluate from './components/TaskEvaluate'
import TaskProPass from './components/TaskProPass'

export default defineComponent({
  components: { TaskEvaluate, TaskProPass },
  setup(props, contxt) {
    const selectTabs = ref('first')
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
