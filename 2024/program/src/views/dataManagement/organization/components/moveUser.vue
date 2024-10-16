<template>
  <div v-loading="loading" class="dialog-mian">
    <div class="dialog-head">
      <div>
        <label>移动部门</label>
      </div>
      <span class="cancel-img" @click="closeDialog"></span>
    </div>
    <div class="dialog-body">
      <el-form ref="ruleFormRef">
        <div>
          <div>
            <el-input v-model="filterText" />
            <el-form-item>
              <el-tree
                ref="treeRef"
                :data="dataSource"
                default-expand-all
                node-key="db_id"
                :props="treeProps"
                :filter-node-method="filterNode"
                @node-click="clickNode"
              />
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <div class="dialog-footer">
      <el-button plain @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="submitForm">确认</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { ElForm, ElTree } from 'element-plus'
import useValidateRespone from '@/utils/hooks/formValidate'
import { getDepartmentTreeLoginApi } from '@/api/module/department'
import { moveDepartmentApi } from '@/api/module/user'

export default defineComponent({
  props: {
    currentData: {
      type: Object,
      required: true
    },
    updateByIdApi: {
      type: Function,
      required: true
    },
    dbkey: {
      type: String,
      required: true,
      default: 'db_id'
    },
    selectedLists: {
      type: Array,
      default: () => []
    }
  },
  emits: ['close', 'success'],
  setup(props, { emit }) {
    const closeDialog = () => {
      emit('close')
    }
    const treeProps = {
      children: 'subDepartmentList',
      label: 'db_id_depName'
    }
    let currentData: any = null
    const treeRef = ref<InstanceType<typeof ElTree>>()
    const dialogModel = ref<any>(JSON.parse(JSON.stringify(props.currentData)))
    const dataSource: any = ref([])
    const filterText = ref('')
    const loading = ref(false)
    const ruleFormRef = ref<InstanceType<typeof ElForm>>()
    const { errMode, showError, resetError } = useValidateRespone(
      ruleFormRef?.value as any,
      dialogModel.value
    )
    const submitForm = async () => {
      loading.value = true
      moveDepartmentApi({
        db_id: props.selectedLists.map((x: any) => x[props.dbkey]).join(','),
        newDepId: currentData?.db_id
      }).then(x => {
        if (x.data.success) {
          if (showError(x.data.data)) {
            closeDialog()
            emit('success', x.data.data)
          }
        }
        loading.value = false
      })
    }
    const filterNode = (value: string, data: any) => {
      if (!value) return true
      return data.db_id_depName.includes(value)
    }
    watch(filterText, val => {
      treeRef.value!.filter(val)
    })
    const clickNode = data => {
      if (data.db_id) {
        currentData = data
      }
    }
    onMounted(async () => {
      loading.value = true
      const x = await getDepartmentTreeLoginApi({})
      if (x.data.data) {
        dataSource.value = x.data.data
      }
      loading.value = false
    })
    return {
      closeDialog,
      submitForm,
      ruleFormRef,
      loading,
      errMode,
      dialogModel,
      filterText,
      treeRef,
      treeProps,
      dataSource,
      filterNode,
      clickNode
    }
  }
})
</script>

<style lang="scss" scoped>
.dialog-mian {
  .dialog-body {
    .el-tree {
      margin-top: 20px;
    }
  }
}
</style>
