<template>
  <el-tree
    :data="dataSource"
    node-key="db_id"
    default-expand-all
    :expand-on-click-node="false"
    :props="treeProps"
    @node-click="clickNode"
  >
    <template #default="{ data }">
      <div class="custom-tree-node">
        <div>
          <span>
            {{ `${data.db_id_depName}` }}
          </span>
        </div>
      </div>
    </template>
  </el-tree>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { getDepartmentTreeLoginApi } from '@/api/module/department'

export default defineComponent({
  emits: ['selectednode'],
  setup(props, { emit }) {
    const dataSource: any = ref([])
    const treeProps = {
      children: 'subDepartmentList',
      label: 'db_id_depName'
    }
    const clickNode = data => {
      if (data.db_id) {
        emit('selectednode', data)
      }
    }
    onMounted(async () => {
      const x = await getDepartmentTreeLoginApi({})
      if (x.data.data) {
        dataSource.value = x.data.data
      }
    })
    return {
      treeProps,
      dataSource,
      clickNode
    }
  }
})
</script>
