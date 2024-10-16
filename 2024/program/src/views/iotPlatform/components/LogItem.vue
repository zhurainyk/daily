<template>
  <ListComponet
    :select-by-condition-api="selectByLogConditionApi"
    :select-count-by-condition-api="selectCountLogByConditionApi"
    :model-data="modelData"
    :table-map="tableMap"
    :add-model-prop="addModelProp"
    :search-where-model-prop="searchWhereModelProp"
    :show-new-porp="false"
    :show-action-porp="false"
    :is-have-export-btn="true"
    :pagesizes="[500]"
    :defaultPageSize="500"
  >
    <template #headpriority="{ scope }">
      <span>{{ event_priority[scope.row['priority']] }}</span>
    </template>

    <template #headopenDoor="{ scope }">
      <span>{{ door_status[scope.row['openDoor']] }}</span>
    </template>

    <template #headsomebody_in="{ scope }">
      <span>{{ somebody_in[scope.row['somebody_in']] }}</span>
    </template>

    <template #headrunning_direction="{ scope }">
      <span>{{ running_direction[scope.row['running_direction']] }}</span>
    </template>
  </ListComponet>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  selectByLogConditionApi,
  selectCountLogByConditionApi
} from '@/api/module/elevatorConfig'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import list from '@/utils/hooks/list'

export default defineComponent({
  components: { ListComponet },
  props: {
    typeProps: {
      type: String,
      defalut: '01'
    }
  },
  setup(props) {
    const modelData = {
      elevatorId: '',
      eventState: '', // 01:物联网事件 02：控制系统事件 03：工单事件
      createTime: '',
      state_desc: '',
      elevatorName: '',
      location: '',
      elevatorType: '',
      type: props.typeProps,
      floor: '',
      online: '',
      openDoor: '',
      running_direction: '',
      somebody_in: '',
      priority: '',
      passengers: ''
    }
    const $route = useRoute()
    modelData.elevatorId = $route.params.id.toString()
    const running_direction = ref({})
    const somebody_in = ref({})
    const door_status = ref({})
    const event_priority = ref({})
    const tableMap = [
      {
        dbkey: 'elevatorName',
        name: '电梯名'
      },
      {
        dbkey: 'priority',
        name: '优先级',
        list: [],
        fn(args) {
          const t = this
          const temp: any =
            this.list.find((x: any) => x.value == args[t.dbkey]) || {}
          return temp.label
        }
      },
      {
        dbkey: 'state_desc',
        name: '事件名称'
      },
      {
        dbkey: 'location',
        name: '电梯位置'
      },
      {
        dbkey: 'openDoor',
        name: '开关门',
        list: [],
        fn(args) {
          const t = this
          const temp: any =
            this.list.find((x: any) => x.value == args[t.dbkey]) || {}
          return temp.label
        }
      },

      {
        dbkey: 'floor',
        name: '楼层'
      },
      {
        dbkey: 'running_direction',
        name: '方向',
        list: [],
        fn(args) {
          const t = this
          const temp: any =
            this.list.find((x: any) => x.value == args[t.dbkey]) || {}
          return temp.label
        }
      },
      {
        dbkey: 'somebody_in',
        name: '是否有人',
        list: [],
        fn(args) {
          const t = this
          const temp: any =
            this.list.find((x: any) => x.value == args[t.dbkey]) || {}
          return temp.label
        }
      },
      {
        dbkey: 'passengers',
        name: '乘梯人数'
      },
      {
        dbkey: 'eventState',
        name: '事件状态'
      },
      {
        dbkey: 'createTime',
        name: '创建时间'
      }
    ]
    const addModelProp = []
    const searchWhereModelProp = [
      {
        name: '优先级',
        dbkey: 'priority',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      }
    ]
    onBeforeMount(async () => {
      selectByAllTypeApi({ constType: 'event_priority' }).then(x => {
        event_priority.value = x.data.data || {}
        const temp: any = searchWhereModelProp.find(x => x.dbkey == 'priority')
        const temp1: any = tableMap.find(x => x.dbkey == 'priority')
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
          temp1.list.push({
            value: key,
            label: v
          })
        })
      })
      selectByAllTypeApi({ constType: 'running_direction' }).then(x => {
        running_direction.value = x.data.data || {}
        const temp: any = tableMap.find(x => x.dbkey == 'running_direction')
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })
      selectByAllTypeApi({ constType: 'door_status' }).then(x => {
        door_status.value = x.data.data || {}
        const temp: any = tableMap.find(x => x.dbkey == 'openDoor')
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })
      selectByAllTypeApi({ constType: 'somebody_in' }).then(x => {
        somebody_in.value = x.data.data || {}
        const temp: any = tableMap.find(x => x.dbkey == 'somebody_in')
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })
    })
    onMounted(() => {})
    return {
      modelData,
      selectCountLogByConditionApi,
      selectByLogConditionApi,
      tableMap,
      addModelProp,
      searchWhereModelProp,
      event_priority,
      door_status,
      running_direction,
      somebody_in
    }
  }
})
</script>

<style lang="scss" scoped>
.page-list {
  background-color: white;

  .page-body {
    /* height: calc(100% - 220px); */
    .page-body-head {
      .search-where {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
