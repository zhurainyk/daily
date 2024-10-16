<template>
  <div class="detail-mian">
    <div class="detail-head">
      <div>
        <label>型号</label><span>{{ modelData.db_id_modelName }}</span>
      </div>
      <div>
        <label>品牌</label><span>{{ modelData.ui_brandName }}</span>
      </div>
      <div>
        <label>型号版本</label><span>{{ `${modelData.db_modelVersion}` }}</span>
      </div>
      <div>
        <label>制造商</label><span>{{ modelData.ui_manuName }}</span>
      </div>
      <div>
        <label>电梯型号</label><span>{{ modelData.ui_elevCategory }}</span>
      </div>
      <div>
        <label>相关文件</label><span>{{ modelData.db_fileName }}</span>
      </div>
    </div>
    <div class="body">
      <div class="action">
        <el-button v-if="updateBtn" type="primary" @click="addFn"
          >添加</el-button
        >
      </div>
      <div class="body-table">
        <el-table
          ref="multipleTableRef"
          :data="listPart"
          style="width: 100%"
          height="100%"
        >
          <el-table-column property="db_id_partInstanceName" label="配件实例" />
          <el-table-column property="db_partInstanceNum" label="配件编号" />
          <el-table-column property="ui_componentName" label="部件名称" />
          <el-table-column property="ui_partName" label="配件名称" />
          <el-table-column property="db_partBrandId" label="配件品牌名称" />
          <el-table-column property="db_model" label="规格型号" />
          <el-table-column label="操作">
            <template #default="scope">
              <span class="edit" @click="editFn(scope.row)">编辑</span>
              <span class="delete" @click="deleteFn(scope.row)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      v-if="dialog.visiableDialog"
      v-model="dialog.visiableDialog"
      :close-on-click-modal="false"
      :width="'550px'"
      :show-close="false"
    >
      <DetailModelAdd
        :elevator-model="modelData"
        :part-ins="currentPart"
        @close="dialog.visiableDialog = false"
        @success="saveFn"
      >
      </DetailModelAdd>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, computed, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from 'vuex'
import { ElevatorModel } from '@/module.ts/elevatormodel'
import { Elevator_PartInstance } from '@/module.ts/Elevator_PartInstance'
import {
  selectByIdApi,
  updatePartInstIdsByIdApi
} from '@/api/module/elevatormodel'
import { getPartInstsByIdsApi } from '@/api/module/partInstance'
import DetailModelAdd from './DetailModelAdd'

export default defineComponent({
  components: { DetailModelAdd },
  setup() {
    const $route = useRoute()
    const modelData = ref(new ElevatorModel())
    modelData.value.db_id = $route.params.id.toString()
    const currentPart = ref(new Elevator_PartInstance())
    const dialog = reactive({
      visiableDialog: false
    })
    const listPart = ref([])
    const multipleTableRef: any = ref(null)
    const handleSelectionChange = (args: Array<IElevator_PartInstance>) => {
      modelData.value.db_partInstIds = args.map(x => x.db_id).join(',')
    }
    const getPartsIntance = (ids: string) => {
      getPartInstsByIdsApi({
        partInstIds: modelData.value.db_partInstIds
      }).then(x => {
        console.log(x)
        if (x.data.success) {
          listPart.value = x.data.data
        }
      })
    }
    onBeforeMount(async () => {
      const tempPosi = await selectByIdApi({ id: modelData.value.db_id })
      if (tempPosi.data.success) {
        modelData.value = tempPosi.data.data
      }
      if (modelData.value.db_partInstIds) {
        getPartsIntance(modelData.value.db_partInstIds)
      }
    })
    const saveFn = selecteds => {
      if (selecteds.db_id) {
        const tempArr = listPart.value
          .filter(
            (x: IElevator_PartInstance) => x.db_id != currentPart.value.db_id
          )
          .map((x: IElevator_PartInstance) => x.db_id)
        if (tempArr.findIndex(x => x == selecteds.db_id) <= -1) {
          tempArr.push(selecteds.db_id)
          modelData.value.db_partInstIds = tempArr.join(',')
          updatePartInstIdsByIdApi({
            db_id: modelData.value.db_id,
            partInstIds: modelData.value.db_partInstIds
          }).then(x => {
            if (x.data.success) {
              if (modelData.value.db_partInstIds) {
                getPartsIntance(modelData.value.db_partInstIds)
              }
              ElMessage.success('保存成功')
              dialog.visiableDialog = false
            } else {
              ElMessage.error('保存失败')
            }
          })
        } else {
          ElMessage.warning('已经添加过了')
        }
      }
    }
    const addFn = () => {
      currentPart.value = new Elevator_PartInstance()
      dialog.visiableDialog = true
    }
    const editFn = args => {
      currentPart.value = args
      dialog.visiableDialog = true
    }
    const deleteFn = args => {
      ElMessageBox.confirm('是否删除', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      })
        .then(() => {
          const tempArr = listPart.value
            .filter((x: IElevator_PartInstance) => x.db_id != args.db_id)
            .map((x: IElevator_PartInstance) => x.db_id)
          modelData.value.db_partInstIds = tempArr.join(',')
          updatePartInstIdsByIdApi({
            db_id: modelData.value.db_id,
            partInstIds: modelData.value.db_partInstIds
          }).then(x => {
            if (x.data.success) {
              if (modelData.value.db_partInstIds) {
                getPartsIntance(modelData.value.db_partInstIds)
              }
              ElMessage.success('保存成功')
            } else {
              ElMessage.error('保存失败')
            }
          })
        })
        .catch(() => {})
    }
    const store = useStore()
    const updateBtn = computed(
      () =>
        store.state.menu.menuAuth.findIndex((x: any) =>
          new RegExp(`${$route.meta.edit}$`).test(x)
        ) > -1
    )
    const $router = useRouter()
    const backRouter = () => {
      $router.back()
    }
    return {
      modelData,
      listPart,
      multipleTableRef,
      handleSelectionChange,
      saveFn,
      updateBtn,
      backRouter,
      editFn,
      deleteFn,
      addFn,
      dialog,
      currentPart
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
  .edit {
    color: $p-color-primary;
    cursor: pointer;
    margin-left: 10px;
  }
  .delete {
    color: $p-color-error;
    cursor: pointer;
    margin-left: 10px;
  }
  .detail-head {
    box-shadow: 0px 5px 19px 1px rgba(3, 0, 55, 0.1);
    background-color: white;
    margin: 10px;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    height: 125px;
    > div {
      width: 350px;
      margin-left: 50px;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      > label {
        font-weight: bold;
      }
    }
  }
  .body {
    height: calc(100% - 220px);
    margin: 0 10px;
    border-radius: 10px;
    padding: 10px;
    background: white;
    .action {
      background-color: white;
      padding: 20px 0 20px 10px;
    }
    .body-table {
      height: calc(100% - 80px);
    }
  }
}
</style>
