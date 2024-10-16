<template>
  <div class="page-list">
    <div class="page-head">
      <el-tabs v-model="selectTabs" @tab-change="handleClick">
        <el-tab-pane label="待转派" name="first"></el-tab-pane>
        <el-tab-pane label="待验收" name="third"></el-tab-pane>
      </el-tabs>
    </div>
    <OrderTranformList v-if="selectTabs == 'first'"></OrderTranformList>
    <OrderTranformList
      v-else-if="selectTabs == 'third'"
      typepage="01"
    ></OrderTranformList>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import OrderTranformList from './components/OrderTranformList'

export default defineComponent({
  components: { OrderTranformList },
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
