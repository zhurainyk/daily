<template>
  <div class="relation-person">
    <div class="head">
      <el-button type="primary" @click="dialog.visiableDialog = true"
        >编辑联系人</el-button
      >
    </div>
    <div class="body">
      <div>
        <div>
          <label>物业经理:</label><span>{{ modelData.ui_propMUserName }}</span>
        </div>
        <div>
          <label>项目经理:</label
          ><span>{{ modelData.ui_projectMUserName }}</span>
        </div>
        <div>
          <label>工程经理:</label><span>{{ modelData.ui_enginMUserName }}</span>
        </div>
      </div>
      <div>
        <div>
          <label>采购经理:</label><span>{{ modelData.ui_enginMUserName }}</span>
        </div>
        <div>
          <label>保险客户经理:</label
          ><span>{{ modelData.ui_insuMUserName }}</span>
        </div>
        <div>
          <label>现场联系人1:</label
          ><span>{{ modelData.ui_sceneUserName1 }}</span>
        </div>
      </div>

      <div>
        <div>
          <label>现场联系人2:</label
          ><span>{{ modelData.ui_sceneUserName2 }}</span>
        </div>
        <div>
          <label>现场联系人3:</label
          ><span>{{ modelData.ui_sceneUserName3 }}</span>
        </div>
        <div>
          <label>现场联系人4:</label
          ><span>{{ modelData.ui_sceneUserName4 }}</span>
        </div>
      </div>
    </div>
    <el-dialog
      v-if="dialog.visiableDialog"
      v-model="dialog.visiableDialog"
      :width="'1155px'"
      :show-close="false"
    >
      <AddEdit
        :current-data="modelData"
        :save-api="saveApi"
        :select-by-id-api="selectByIdApi"
        :update-by-id-api="updateByIdApi"
        :add-model="addModelProp"
        :maxwidth="true"
        @close="dialog.visiableDialog = false"
      >
      </AddEdit>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import {
  saveApi,
  updateByIdApi,
  selectByIdApi
} from '@/api/module/projectManage'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { selectAccountByposiTypeApi } from '@/api/module/user'
import AddEdit from '@/components/singlelist/components/addEdit'

export default defineComponent({
  components: { AddEdit },
  props: {
    modelData: Object
  },
  setup() {
    const dialog = reactive({
      visiableDialog: false
    })
    const dealData = list => {
      let temp: any = []
      Object.entries<any>(list).forEach(([key, v]) => {
        temp.push({
          db_id: v.db_id,
          db_id_username: v.db_id_username,
          db_mobilePhone: v.db_mobilePhone
        })
      })
      return temp
    }
    const changeUser = (agrs, addModel, item, dialogModel) => {
      const key = `${item.dbkey.replace('Id', '')}Phone`
      if (agrs) {
        const tempUser = item.list.find((x: any) => x.value == agrs)
        if (tempUser) {
          dialogModel[key] = tempUser.db_mobilePhone
        }
      } else {
        dialogModel[key] = ''
      }
    }
    const addModelProp = reactive([
      {
        name: '物业经理',
        dbkey: 'db_propMUserId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectAccountByposiTypeApi,
        key: 'db_id',
        value: 'db_id_username',
        fnArgs: { posiType: 'PropUser' },
        changefn: changeUser,
        dealData
      },
      {
        name: '物业验收人',
        dbkey: 'db_propPassUserId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectAccountByposiTypeApi,
        key: 'db_id',
        value: 'db_id_username',
        fnArgs: { posiType: 'PropUser' },
        changefn: changeUser,
        dealData
      },
      {
        name: '项目经理',
        dbkey: 'db_projectMUserId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectAccountByposiTypeApi,
        key: 'db_id',
        value: 'db_id_username',
        fnArgs: { posiType: 'MarkUser' },
        dealData
      },
      {
        name: '工程经理',
        dbkey: 'db_enginMUserId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectAccountByposiTypeApi,
        key: 'db_id',
        value: 'db_id_username',
        fnArgs: { posiType: 'EnginUser' },
        changefn: changeUser,
        dealData
      },
      {
        name: '保险客户经理',
        dbkey: 'db_insuMUserId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectAccountByposiTypeApi,
        fnArgs: { posiType: 'EnginUser' },
        key: 'db_id',
        value: 'db_id_username',
        changefn: changeUser,
        dealData
      },
      {
        name: '现场联系人1',
        dbkey: 'db_sceneUserId1',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectAccountByposiTypeApi,
        fnArgs: { posiType: 'EnginUser' },
        key: 'db_id',
        value: 'db_id_username',
        changefn: changeUser,
        dealData
      },
      {
        name: '现场联系人2',
        dbkey: 'db_sceneUserId2',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectAccountByposiTypeApi,
        fnArgs: { posiType: 'EnginUser' },
        key: 'db_id',
        value: 'db_id_username',
        changefn: changeUser,
        dealData
      },
      {
        name: '现场联系人3',
        dbkey: 'db_sceneUserId3',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectAccountByposiTypeApi,
        fnArgs: { posiType: 'EnginUser' },
        key: 'db_id',
        value: 'db_id_username',
        changefn: changeUser,
        dealData
      },
      {
        name: '现场联系人4',
        dbkey: 'db_sceneUserId4',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectAccountByposiTypeApi,
        fnArgs: { posiType: 'EnginUser' },
        key: 'db_id',
        value: 'db_id_username',
        changefn: changeUser,
        dealData
      }
    ])
    return {
      updateByIdApi,
      saveApi,
      selectByIdApi,
      addModelProp,
      dialog
    }
  }
})
</script>

<style lang="scss" scoped>
.relation-person {
  margin: 20px 30px;
  box-shadow: 0px 5px 19px 1px rgba(3, 0, 55, 0.1);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  height: 600px;
  .head {
    margin-bottom: 20px;
    padding-top: 10px;
  }
  .body {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-left: 60px;
    > div {
      width: 100%;
      justify-content: space-between;
      display: flex;
      > div {
        display: flex;
        width: 500px;
        margin-top: 20px;
        > label {
          font-weight: bold;
          width: 100px;
          text-align: right;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
