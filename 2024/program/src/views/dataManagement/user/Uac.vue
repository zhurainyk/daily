<template>
  <div class="page-list">
    <div class="page-head">
      <el-tabs v-model="selectTabs" @tab-change="handleClick">
        <el-tab-pane label="账号管理" name="first"></el-tab-pane>
        <el-tab-pane label="职位管理" name="second"></el-tab-pane>
        <el-tab-pane label="角色管理" name="third"></el-tab-pane>
      </el-tabs>
    </div>
    <UserComponent v-if="selectTabs == 'first'"></UserComponent>
    <PositionManagement v-else-if="selectTabs == 'second'"></PositionManagement>
    <Roles v-else-if="selectTabs == 'third'"></Roles>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import UserComponent from './components/User'
import PositionManagement from './components/PositionManagement'
import Roles from './components/Roles'

export default defineComponent({
  components: { UserComponent, PositionManagement, Roles },
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
