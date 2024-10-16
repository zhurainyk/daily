<template>
  <div class="page-list">
    <div class="page-head">
      <el-tabs v-model="selectTabs" @tab-change="handleClick">
        <el-tab-pane label="常量" name="first"></el-tab-pane>
        <el-tab-pane label="常量详细" name="third"></el-tab-pane>
      </el-tabs>
    </div>
    <ConstypeItem v-if="selectTabs == 'first'"></ConstypeItem>
    <ConstypeDetailItem
      v-else-if="selectTabs == 'third'"
      elev-type="1"
    ></ConstypeDetailItem>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import ConstypeItem from './components/ConstypeItem'
import ConstypeDetailItem from './components/ConstypeDetailItem'

export default defineComponent({
  components: { ConstypeItem, ConstypeDetailItem },
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
