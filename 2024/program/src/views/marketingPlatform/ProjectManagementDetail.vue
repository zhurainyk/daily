<template>
  <div class="detail-mian">
    <div class="detail-head">
      <div>
        <label>项目名称:</label><span>{{ modelData.db_id_proName }}</span>
      </div>
      <div>
        <label>使用单位:</label><span>{{ modelData.ui_useCompanyName }}</span>
      </div>
      <div>
        <label>省市地区:</label
        ><span>{{ `${modelData.db_province_city}` }}</span>
      </div>
      <div>
        <label>街道:</label><span>{{ modelData.db_street }}</span>
      </div>
      <div>
        <label>社区居委会:</label><span>{{ modelData.db_community }}</span>
      </div>
      <div>
        <label>项目地址:</label><span>{{ modelData.db_addr }}</span>
      </div>
    </div>
    <div class="detail-tag">
      <el-tabs v-model="selectTabs" @tab-change="handleClick">
        <el-tab-pane label="电梯档案" name="first"></el-tab-pane>
        <el-tab-pane label="使用单位" name="second"></el-tab-pane>
        <el-tab-pane label="业主账号" name="third"></el-tab-pane>
        <el-tab-pane label="联系人" name="four"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="body">
      <ElevatorList
        v-if="selectTabs == 'first'"
        :model-data-props="modelData"
      ></ElevatorList>
      <RelationProCompany
        v-if="selectTabs == 'second'"
        :model-data="modelData"
      ></RelationProCompany>
      <AddProUser
        v-if="selectTabs == 'third'"
        :model-data-props="modelData"
      ></AddProUser>
      <RelationPerson
        v-if="selectTabs == 'four'"
        :model-data="modelData"
      ></RelationPerson>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ElevatorList from './components/elevatorList'
import { Elevator_Project } from '@/module.ts/Elevator_Project'
import { selectByIdApi } from '@/api/module/projectManage'
import RelationProCompany from './components/relationProCompany'
import AddProUser from './components/addProUser'
import RelationPerson from './components/relationPerson'

export default defineComponent({
  components: { ElevatorList, RelationProCompany, AddProUser, RelationPerson },
  setup() {
    const selectTabs = ref('first')
    const $route = useRoute()
    const modelData = ref(new Elevator_Project())
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
      width: 350px;
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
