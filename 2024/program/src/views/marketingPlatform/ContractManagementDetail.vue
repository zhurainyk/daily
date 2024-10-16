<template>
  <div class="detail-mian">
    <div class="detail-head">
      <div>
        <label>合同编号:</label><span>{{ modelData.db_id_contNum }}</span>
      </div>
      <div>
        <label>创建时间:</label><span>{{ modelData.ui_createtime }}</span>
      </div>
      <div>
        <label>有效期:</label
        ><span>{{
          `${modelData.ui_starttime} 至 ${modelData.ui_endtime}`
        }}</span>
      </div>
      <div>
        <label>项目:</label><span>{{ modelData.ui_projectName }}</span>
      </div>
      <div>
        <label>使用单位:</label><span>{{ modelData.ui_usedCompanyName }}</span>
      </div>
      <!-- <div>
        <label>维保单位:</label><span>{{ modelData.ui_maintCompanyName }}</span>
      </div>
      <div>
        <label>承保单位:</label><span>{{ modelData.ui_insuCompanyName }}</span>
      </div> -->
      <div>
        <label>合同扫描件:</label><span>{{ modelData.db_contFileName }}</span>
      </div>
      <div>
        <label>是否主要合同:</label><span>{{ modelData.ui_contState }}</span>
      </div>
    </div>
    <div class="detail-tag">
      <el-tabs v-model="selectTabs" @tab-change="handleClick">
        <el-tab-pane label="电梯档案" name="first"></el-tab-pane>
        <!-- <el-tab-pane label="联系人" name="third"></el-tab-pane> -->
      </el-tabs>
    </div>
    <div class="body">
      <ElevatorList
        v-if="selectTabs == 'first'"
        :model-data-props="modelData"
        :show-new-porp="false"
      ></ElevatorList>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ElevatorList from './components/elevatorContractList'
import { Elevator_Contract } from '@/module.ts/Elevator_Contract'

import { selectByIdApi } from '@/api/module/contract'

export default defineComponent({
  components: { ElevatorList },
  setup() {
    const selectTabs = ref('first')
    const $route = useRoute()
    const modelData = ref(new Elevator_Contract())
    modelData.value.db_id = $route.params.id.toString()
    const handleClick = (tab, event: Event) => {
      console.log(tab, event)
    }
    onBeforeMount(async () => {
      const tempPosi = await selectByIdApi({ id: modelData.value.db_id })
      if (tempPosi.data.success) {
        modelData.value = tempPosi.data.data
      }
    })
    return {
      selectTabs,
      handleClick,
      modelData
    }
  }
})
</script>

<style lang="scss" scoped>
.detail-mian {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 100%;
  }
  .detail-head {
    box-shadow: 0px 5px 19px 1px rgba(3, 0, 55, 0.1);
    background-color: white;
    margin: 20px 30px 10px 30px;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    height: 100px;
    > div {
      width: 450px;
      margin-left: 50px;
      margin-top: 10px;
      display: flex;
      > label {
        font-weight: bold;
        white-space: nowrap;
        margin-right: 20px;
        width: 100px;
        text-align: right;
      }
    }
  }
  .detail-tag {
    margin: 10px 30px;
    height: 30px;
    :deep().el-tabs {
      .el-tabs__nav-wrap {
        &::after {
          width: 0;
        }
      }
      .el-tabs__header {
        margin: 0;
      }
      .el-tabs__active-bar {
        height: 4px;
        border-radius: 3px;
      }
      .is-active {
        font-weight: bold;
      }
    }
  }
  .body {
    height: calc(100% - 220px);
  }
}
</style>
