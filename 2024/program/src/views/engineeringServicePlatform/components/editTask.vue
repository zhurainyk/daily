<template>
  <div class="task-edit">
    <div class="dialog-head">
      <div>
        <label>{{ $t('common.add') }}</label>
      </div>
      <span class="cancel-img" @click="closeDialog"></span>
    </div>
    <div class="select-type">
      <label class="required">{{ $t('business.selectTaskType') }}</label>
      <el-select v-if="!currentData.db_taskTypeCode" v-model="selectTaskType">
        <el-option
          v-for="item in taskTypeList"
          :key="item.label"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <div v-else>
        {{ taskTypeListData[currentData.db_taskTypeCode] }}
      </div>
    </div>
    <EditTask
      v-if="!!selectTaskType"
      ref="taskref"
      :current-data="modelData"
      :save-api="saveFnApi"
      :select-by-id-api="selectByIdFnApi"
      :update-by-id-api="updateByIdFnApi"
      :add-model="addModelProp"
      :is-have-head="false"
      :maxwidth="true"
      :is-file-upload="true"
      :dialog-mount="dialogMountFn"
      :dbkey="'db_id'"
      v-bind="$attrs"
    >
    </EditTask>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref, watch } from 'vue'
import EditTask from '@/components/singlelist/components/addTaskEdit'
import { saveApi, updateByIdApi, selectByIdApi } from '@/api/module/taskedit'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import useTaskMapApiModel from '@/utils/hooks/taskHooks'

export default defineComponent({
  components: {
    EditTask
  },
  emits: ['close-task'],
  props: {
    currentData: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { emit }) {
    const modelData: any = ref({})
    const { getModel, getAddModelFn, initEditTaskMount } = useTaskMapApiModel()
    const taskref: any = ref(null)
    //  modelData.db_id = $route.params.id.toString()
    const addModelProp = ref([])
    const backPage = () => {}
    const saveFnApi: any = ref(null)
    const updateByIdFnApi: any = ref(null)
    const selectByIdFnApi: any = ref(null)
    const taskTypeList: any = ref([])
    const taskTypeListData: any = ref({})
    const selectTaskType = ref('')
    watch(selectTaskType, newval => {
      if (newval) {
        saveFnApi.value = saveApi(newval)
        updateByIdFnApi.value = updateByIdApi(newval)
        selectByIdFnApi.value = selectByIdApi(newval)
        modelData.value = getModel(newval)
        if (
          props.currentData.ui_typeTask &&
          props.currentData.ui_typeTask.length > 0
        ) {
          modelData.value = {
            ...modelData.value,
            ...props.currentData.ui_typeTask[0]
          }
        }
        if (props.currentData.db_projectId) {
          modelData.value.taskInfo.db_projectId = props.currentData.db_projectId
        }
        addModelProp.value = getAddModelFn(newval)
        if (taskref.value) {
          taskref.value.initErrorModel(modelData.value)
          taskref.value.initDialogModel(modelData.value)
          addModelProp.value.forEach((x: any) => {
            x.list = []
            x.multipledata = []
          })
          taskref.value.initFn(addModelProp.value)
        }
      }
    })
    const dialogMountFn = (dialogModel, addModel) => {
      if (dialogModel.taskInfo.db_projectId) {
        initEditTaskMount(
          dialogModel.taskInfo.db_projectId,
          addModel,
          dialogModel
        )
      }
    }
    const closeDialog = () => {
      emit('close-task')
    }
    onMounted(async () => {
      const result = await selectByAllTypeApi({ constType: 'taskOrder_type' })
      if (result.data.data) {
        taskTypeListData.value = result.data.data
        Object.entries<string>(result.data.data).forEach(([key, v]) => {
          if (key != 'Emergency') {
            taskTypeList.value.push({
              value: key,
              label: v
            })
          }
        })
        if (props.currentData.db_taskTypeCode) {
          selectTaskType.value = props.currentData.db_taskTypeCode
        }
      }
    })
    return {
      modelData,
      saveFnApi,
      backPage,
      updateByIdFnApi,
      selectByIdFnApi,
      addModelProp,
      taskTypeList,
      taskTypeListData,
      selectTaskType,
      taskref,
      dialogMountFn,
      closeDialog
    }
  }
})
</script>

<style lang="scss" scoped>
.task-edit {
  background-color: white;
  height: 650px;
  width: 100%;
  padding: 20px 0;
  min-height: 650px;
  .dialog-head {
    display: flex;
    align-items: center;
    height: 30px;
    justify-content: space-between;
    padding-bottom: 20px;
    margin-right: 15px;

    .cancel-img {
      background-image: url('../../../public/images/common/cancel@2x');
      display: inline-block;
      width: 16px;
      height: 16px;
      background-size: contain;
      background-repeat: no-repeat;
      cursor: pointer;
    }
    > div {
      flex: 1;
      text-align: center;

      > label {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
  .select-type {
    padding-left: 50px;
    margin-bottom: 20px;
    border-bottom: 1px solid #d1d1d1;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 10px;
    > label {
      margin-right: 40px;
      width: 100%;
      margin-bottom: 10px;
    }
    > div {
      margin-bottom: 10px;
    }
  }
  :deep().dialog-mian {
    height: 500px;
    min-height: 500px;
    padding: 0;
    .dialog-body {
      height: calc(100% - 70px);
      overflow-y: auto;
      overflow-x: hidden;
      min-height: 450px;
    }
  }
}
</style>
