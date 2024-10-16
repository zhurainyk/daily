<template>
  <div class="page-list">
    <div class="page-head">
      <el-tabs v-model="selectTabs" @tab-change="handleClick">
        <el-tab-pane label="直梯" name="first"></el-tab-pane>
        <el-tab-pane label="自动扶梯与自动人行道" name="third"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="page-body">
      <div>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import Item from './components/Item'

export default defineComponent({
  components: { Item },
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
    > div {
      display: flex;
      > div {
        margin-right: 20px;
      }
    }
  }
}
</style>
