<template>
  <div v-loading="loading" class="add-part">
    <div>
      <label>部件名称</label>
      <el-select v-model="currentData.db_componentId" @change="changeComponent">
        <el-option
          v-for="item in componentList"
          :key="item.label"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div>
      <label>配件名称</label>
      <el-select v-model="currentData.db_partId" @change="changePartInstance">
        <el-option
          v-for="item in partsList"
          :key="item.label"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div>
      <label>配件实例</label>
      <el-select v-model="currentData.db_id">
        <el-option
          v-for="item in partInstances"
          :key="item.label"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>

    <div class="footer">
      <el-button plain @click="cancelDialog">取消</el-button>
      <el-button type="primary" @click="save">确认</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue'
import { selectByConditionApi } from '@/api/module/partInstance'
import { selectByConditionApi as selectByConditionPartApi } from '@/api/module/part'
import { selectByAllApi } from '@/api/module/commont'

export default defineComponent({
  props: {
    elevatorModel: {
      type: Object,
      default: () => {}
    },
    partIns: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['close', 'success'],
  setup(props, { emit }) {
    const componentList: any = ref([])
    const partsList: any = ref([])
    const partInstances: any = ref([])
    const loading = ref(false)
    const currentData = reactive({
      db_componentId: '',
      db_partId: '',
      db_id: ''
    })
    const cancelDialog = () => {
      emit('close')
    }
    const save = () => {
      if (!currentData.db_id) return
      emit('success', currentData)
    }
    const changeComponent = async args => {
      partsList.value = []
      if (!args) return
      const x = await selectByConditionPartApi({
        ui_type: 'A0',
        db_componentId: args
      })
      const { objectList, condition } = x.data.data
      objectList.forEach(y => {
        partsList.value.push({
          value: y.db_id,
          label: y.db_id_partName
        })
      })
    }
    const changePartInstance = args => {
      partInstances.value = []
      if (!args) return
      selectByConditionApi({ ui_type: 'A0' }).then(x => {
        const { objectList, condition } = x.data.data
        objectList.forEach(y => {
          partInstances.value.push({
            value: y.db_id,
            label: y.db_id_partInstanceName
          })
        })
      })
    }
    onMounted(async () => {
      selectByAllApi({ tableName: 'Elevator_Component' }).then(x => {
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          componentList.value.push({
            value: key,
            label: v
          })
        })
      })
      if (props.partIns.db_id) {
        loading.value = true
        currentData.db_id = props.partIns.db_id
        currentData.db_componentId = props.partIns.db_componentId
        currentData.db_partId = props.partIns.db_partId
        await changeComponent(props.partIns.db_componentId)
        changePartInstance(props.partIns.db_partId)
        loading.value = false
      }
    })
    return {
      cancelDialog,
      save,
      componentList,
      partsList,
      partInstances,
      changeComponent,
      changePartInstance,
      currentData
    }
  }
})
</script>

<style lang="scss" scoped>
.add-part {
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px;
    margin-bottom: 20px;
    margin-top: 20px;
    > label {
      margin-bottom: 10px;
    }
    > div {
      width: 100%;
    }
  }
  .footer {
    justify-content: center;
  }
}
</style>
