<template>
  <div class="page-list">
    <ListComponet :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi" :model-data="modelData" :table-map="tableMap"
      :search-where-model-prop="searchWhereModelProp" :show-head-search-porp="false" :show-action-edit-porp="false"
      :show-action-delete-porp="false" :show-action-porp="false">
      <template #searchHead="{ searchBtnList, searchWhere }">
        <div class="down-templete">
          <el-upload v-if="showNewPorp" :show-file-list="false" :auto-upload="true" :http-request="
            (...argument) =>
              beforeAvatarUploadFile(...argument, x, searchBtnList)
          ">
            <el-button type="primary">导入</el-button>
          </el-upload>
          <el-button type="primary" @click="elevatorDownTemlepteApi">模板下载</el-button>
        </div>
        <div class="search-where">
          <el-input v-model="searchWhere['db_registCode']" clearable placeholder="电梯注册码" />
          <el-button type="primary" @click="searchBtnList">查询</el-button>
        </div>
      </template>
      <template #headdb_elevType="{ scope }">
        <span v-if="scope.row.db_elevType == '1'">扶梯</span>
        <span v-else>直梯</span>
      </template>
      <template #headdb_mapAddr="{ scope }">
        <span>{{
        `${scope.row.ui_projectName} ${scope.row.db_id_projectNum}`
        }}</span>
      </template>
    </ListComponet>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElMessage } from 'element-plus'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  saveListApi,
  elevatorDownTemlepteApi
} from '@/api/module/elevator'
import ListComponet from '@/components/singlelist'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'
import useNormalValidateRespone from '@/utils/hooks/NormalValidate'

export default defineComponent({
  components: { ListComponet },
  props: {
    modelDataProps: {
      type: Object,
      default: () => { }
    },
    showNewPorp: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const modelData = new Elevator_Elevator()
    modelData.db_projectId = props.modelDataProps.db_id
    const { showError } = useNormalValidateRespone()
    const tableMap = [
      {
        dbkey: 'db_mapAddr',
        name: '电梯位置'
      },
      {
        dbkey: 'db_registCode',
        name: '注册代码'
      },
      {
        dbkey: 'db_brandElseName',
        name: '品牌名称'
      },
      {
        dbkey: 'db_elevType',
        name: '电梯类型'
      },
      {
        dbkey: 'ui_modelName',
        name: '型号'
      }
    ]
    const searchWhereModelProp = [
      {
        name: '注册代码',
        dbkey: 'db_registCode',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      }
    ]
    const beforeAvatarUploadFile = (args: any, model: any, fn) => {
      saveListApi(
        { projectId: modelData.db_projectId },
        { multipartFile: args.file }
      ).then(x => {
        if (x.data.success) {
          if (showError(x.data.data)) {
            ElMessage.success('上传成功')
            fn()
          }
        } else {
          ElMessage.error('上传失败')
        }
      })
    }
    return {
      searchWhereModelProp,
      tableMap,
      selectByConditionApi,
      selectCountByConditionApi,
      modelData,
      beforeAvatarUploadFile,
      elevatorDownTemlepteApi
    }
  }
})
</script>

<style lang="scss" scoped>
.down-templete {
  display: flex;

  >div {
    margin-right: 10px;
  }
}
</style>
