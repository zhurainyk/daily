<template>
  <div class="page-list">
    <div class="page-head">
      <el-tabs v-model="selectTabs" @tab-change="handleClick">
        <el-tab-pane label="正常日志" name="first"></el-tab-pane>
        <el-tab-pane label="事件日志" name="third"></el-tab-pane>
      </el-tabs>
    </div>
    <LogItem v-if="selectTabs == 'first'" :type-props="'01'"></LogItem>
    <LogItem v-else-if="selectTabs == 'third'" :type-props="'02'"></LogItem>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import LogItem from './components/LogItem'

export default defineComponent({
  components: { LogItem },
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
