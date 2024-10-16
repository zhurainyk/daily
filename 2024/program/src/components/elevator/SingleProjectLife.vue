<template>
  <div class="single-life">
    <el-timeline>
      <el-timeline-item
        placement="top"
        hollow
        hide-timestamp
        v-for="x in list"
        :key="x.db_id"
      >
        <div class="life-itme">
          <h4>
            <label>{{ x.db_id_content }}</label> <span>{{ x.ui_intime }}</span>
          </h4>
          <p>{{ x.db_note }}</p>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { selectByConditionApi } from '@/api/module/projectlife'

export default defineComponent({
  props: {
    projectId: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const list = ref([])
    watch(
      () => props.projectId,
      val => {
        list.value = []
        if (val) {
          selectByConditionApi({
            ui_type: 'A0',
            ui_currentPage: 0,
            ui_pageSize: 0,
            db_projectId: props.projectId
          }).then(x => {
            if (x.data.success) {
              const { objectList } = x.data.data
              list.value = objectList || []
            }
          })
        }
      },
      {
        immediate: true
      }
    )
    return {
      list
    }
  }
})
</script>

<style lang="scss" scoped>
.single-life {
  background-color: inherit;
  height: 100%;
  overflow: auto;
  padding: 10px;
  :deep().el-timeline {
    --el-timeline-node-color: rgba(35, 255, 252, 1);
    .el-timeline-item__node {
      &.is-hollow {
        background: rgba(22, 99, 180, 1);
        box-shadow: 0 0 10px 2px rgba(35, 255, 252, 1);
      }
    }
  }
  .life-itme {
    color: white;
    h4 {
      color: white;
      margin-bottom: 16px;
      > label {
        margin-right: 20px;
        font-size: 16px;
      }
      > span {
        font-size: 16px;
      }
    }
    > p {
      color: white;
      font-size: 14px;
      word-break: break-all;
    }
  }
}
</style>
