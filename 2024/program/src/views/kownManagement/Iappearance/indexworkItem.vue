<template>
  <div class="page-list">
    <div class="page-head">
      <el-tabs v-model="selectTabs" @tab-change="handleClick">
        <el-tab-pane label="直梯" name="first"></el-tab-pane>
        <el-tab-pane label="自动扶梯与自动人行道" name="third"></el-tab-pane>
      </el-tabs>
    </div>
    <WorkItem v-if="selectTabs == 'first'"></WorkItem>
    <WorkItem v-else-if="selectTabs == 'third'" elev-type="1"></WorkItem>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import WorkItem from './components/workItem'

export default defineComponent({
  components: { WorkItem },
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
