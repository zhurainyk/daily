<template>
  <div class="add-part">
    <div>
      <label>电梯型号</label>
      <el-select v-model="elevatorMode">
        <el-option
          v-for="item in list"
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
import { defineComponent, ref, onMounted } from 'vue'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'

export default defineComponent({
  emits: ['close', 'success'],
  setup(props, { emit }) {
    const elevatorMode = ref('')
    const list: any = ref([])
    const cancelDialog = () => {
      emit('close')
    }

    const save = () => {
      emit('success')
    }
    onMounted(() => {
      selectByAllApi({ tableName: 'Elevator_Model' }).then(x => {
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          list.value.push({
            value: key,
            label: v
          })
        })
      })
    })
    return {
      cancelDialog,
      save,
      elevatorMode,
      list
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
