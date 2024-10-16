<template>
  <div class="page-list">
    <div class="page-head">
      <el-tabs v-model="selectTabs" @tab-change="handleClick">
        <el-tab-pane label="电梯品牌" name="first"></el-tab-pane>
        <el-tab-pane label="制造商" name="second"></el-tab-pane>
        <el-tab-pane label="电梯型号" name="third"></el-tab-pane>
      </el-tabs>
    </div>
    <Lift v-if="selectTabs == 'first'"></Lift>
    <Manufacturer v-else-if="selectTabs == 'second'"></Manufacturer>
    <ElevatorModel v-else-if="selectTabs == 'third'"></ElevatorModel>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import Lift from './components/Lift'
import Manufacturer from './components/Manufacturer'
import ElevatorModel from './components/ElevatorModel'

export default defineComponent({
  components: { Lift, Manufacturer, ElevatorModel },
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
