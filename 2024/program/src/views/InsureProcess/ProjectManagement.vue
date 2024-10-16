<template>
  <div class="page-list">
    <ListComponet
      :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi"
      :model-data="modelData"
      :save-api="saveApi"
      :update-by-id-api="updateByIdApi"
      :delete-by-id-api="deleteByIdApi"
      :select-by-id-api="selectByIdApi"
      :table-map="tableMap"
      :add-model-prop="addModelProp"
      :search-where-model-prop="searchWhereModelProp"
      :maxwidth="true"
      fullscreen
      :dialog-mount="dialogMount"
      @map-success="mapSuccess"
      @success-dialog="updatePropPassUser"
    >
      <template #searchHead="{ newFn, searchBtnList, addBtn }">
        <div class="search-where">
          <el-button v-if="addBtn" type="primary" @click="newFn"
            >新增</el-button
          >
          <authority-button
            type="primary"
            api-url="/elevator/iproject/saveList"
            @click="projectTemlepteApi"
            >项目模板下载</authority-button
          >

          <el-upload
            :show-file-list="false"
            :auto-upload="true"
            :http-request="
              (...argument) =>
                beforeAvatarUploadFile(...argument, x, searchBtnList)
            "
          >
            <authority-button
              type="primary"
              api-url="/elevator/iproject/saveList"
              >项目导入</authority-button
            >
          </el-upload>

          <authority-button
            type="primary"
            api-url="/elevator/ielevator/saveList"
            @click="elevatorTemlepteApi"
            >电梯模板下载</authority-button
          >
          <el-upload
            :show-file-list="false"
            :auto-upload="true"
            :http-request="
              (...argument) =>
                beforeAvatarEleUploadFile(...argument, x, searchBtnList)
            "
          >
            <authority-button
              type="primary"
              api-url="/elevator/ielevator/saveList"
              >电梯导入</authority-button
            >
          </el-upload>
        </div>
      </template>
    </ListComponet>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref, onBeforeMount } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  selectByIdApi,
  saveListApi,
  updatePropPassUserIdApi
} from '@/api/module/projectManage'
import { saveListApi as saveEleListApi } from '@/api/module/elevator'
import {
  projectTemlepteApi,
  elevatorTemlepteApi
} from '@/api/module/importExcel'
import {
  getPropCompanyMapLoginApi,
  getMaintCompanyMapLoginApi,
  getInsuCompanyMapLoginApi,
  getPropUserByCompanyAuthApi,
  getEnginUserMByCompanyAuthApi,
  getEnginUserByCompanyAuthApi,
  getInsuUserByCompanyAuthApi,
  getSecuUserByCompanyAuthApi
} from '@/api/module/login'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { Elevator_Project } from '@/module.ts/Elevator_Project'
import { menulist } from '@/router/menu'
import useGetCityList from '@/utils/hooks/provincecity'
import {
  selectAccountByposiTypeApi,
  selectByConditionApi as selectUserByConditionApi
} from '@/api/module/user'
import useNormalValidateRespone from '@/utils/hooks/NormalValidate'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new Elevator_Project()
    const $route = useRoute()
    if ($route.query) {
      Object.entries<string>($route.query).forEach(([key, v]) => {
        modelData[key] = v
      })
    }
    const { showError } = useNormalValidateRespone()
    const tableMap = [
      {
        dbkey: 'db_id_proName',
        name: '项目名称'
      },
      {
        dbkey: 'db_addr',
        name: '公司地址'
      },
      {
        dbkey: 'ui_useCompanyName',
        name: '使用单位'
      },
      {
        dbkey: 'ui_maintCompanyName',
        name: '维保单位'
      },
      {
        dbkey: 'ui_insuCompanyName',
        name: '承保单位'
      },
      {
        dbkey: 'ui_createtime',
        name: '时间'
      }
    ]
    const dealData = list => {
      const temp: any = []
      Object.entries<any>(list).forEach(([key, v]) => {
        temp.push({
          db_id: v.db_id,
          db_id_username: v.db_id_username,
          db_mobilePhone: v.db_mobilePhone
        })
      })
      return temp
    }
    const updatePropPassUser = (result, data) => {
      updatePropPassUserIdApi(data)
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
    const changeUserPro = (agrs, addModel, item, dialogModel) => {
      const key = `${item.dbkey.replace('Id', '')}Phone`
      if (agrs) {
        const tempUser = item.list.find((x: any) => x.value == agrs)
        if (tempUser) {
          dialogModel[key] = tempUser.db_mobilePhone
          dialogModel.db_propMUserId = agrs
          dialogModel.db_propMUserPhone = tempUser.db_mobilePhone
        }
      } else {
        dialogModel[key] = ''
        dialogModel.db_propMUserId = ''
        dialogModel.db_propMUserPhone = ''
      }
    }

    let tempArr: any = []
    const store = useStore()

    if (store.state.user.userInfo?.db_isSrc == '01') {
    } else if (
      store.state.user.userInfo?.db_isSrc != '01' &&
      store.state.user.userInfo?.db_srcId
    ) {
    } else {
      tempArr = [
        {
          name: '源id',
          dbkey: 'db_srcId',
          isreuqired: false,
          isSelect: true,
          multiple: false,
          multipledata: [],
          isRules: false,
          list: [],
          fn: selectUserByConditionApi,
          fnArgs: {
            ui_type: 'A1',
            ui_currentPage: 1,
            ui_pageSize: 0,
            db_isSrc: '01'
          },
          key: 'db_id',
          value: 'db_id_username'
        }
      ]
    }
    const addModelProp = reactive([
      {
        name: '项目名称',
        dbkey: 'db_id_proName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        ispartion: true,
        partionname: '基本信息'
      },

      {
        name: '地区',
        dbkey: 'db_province_city',
        isreuqired: true,
        isSelect: true,
        type: 'cascader',
        multiple: true,
        multipledata: [],
        isRules: true,
        list: [],
        changefn: (args, addModel, item, dialogModel) => {
          if (args.length >= 3) {
            dialogModel.db_province = args[0]
            dialogModel.db_city = args[1]
            dialogModel.db_region = args[2]
            const tempOne = item.list.find((x: any) => x.value == args[0])
            if (tempOne) {
              const tempTwo = tempOne.children.find(
                (x: any) => x.value == args[1]
              )
              if (tempTwo) {
                const tempthree = tempTwo.children.find(
                  (x: any) => x.value == args[2]
                )
                dialogModel.db_province_city = `${tempOne.label}/${tempTwo.label}/${tempthree.label}`
              }
            }
          } else if (args.length >= 2) {
            dialogModel.db_province = args[0]
            dialogModel.db_city = args[1]
            dialogModel.db_region = ''
            const tempOne = item.list.find((x: any) => x.value == args[0])
            if (tempOne) {
              const tempTwo = tempOne.children.find(
                (x: any) => x.value == args[1]
              )
              dialogModel.db_province_city = `${tempOne.label}/${tempTwo.label}`
            }
          } else {
            dialogModel.db_province = args[0]
            dialogModel.db_city = ''
            dialogModel.db_region = ''
            const tempOne = item.list.find((x: any) => x.value == args[0])
            dialogModel.db_province_city = `${tempOne.label}`
          }
        }
      },
      {
        name: '地图地址',
        dbkey: 'db_mapAddr',
        isreuqired: false,
        type: 'map',
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '详细地址',
        dbkey: 'db_addr',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '使用单位',
        dbkey: 'db_useCompanyId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: getPropCompanyMapLoginApi,
        fnArgs: {}
      },
      {
        name: '维保单位',
        dbkey: 'db_maintCompanyId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: getMaintCompanyMapLoginApi,
        fnArgs: {}
      },
      {
        name: '承保单位',
        dbkey: 'db_insuCompanyId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: getInsuCompanyMapLoginApi,
        fnArgs: {}
      },
      ...tempArr,
      {
        name: '无纸化平台',
        dbkey: 'db_platformTypeCode',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'platform_type' },
        ispartion: true,
        partionname: '无纸化'
      },
      {
        name: '有效日期',
        dbkey: 'db_startDate',
        isreuqired: false,
        isSelect: true,
        multiple: true,
        type: 'daterange',
        multipledata: [],
        isRules: true,
        list: [],
        changefn: (args, addModel, item, dialogModel) => {
          if (args) {
            dialogModel.db_startDate = args[0]
            dialogModel.db_endDate = args[1]
          } else {
            dialogModel.db_startDate = ''
            dialogModel.db_endDate = ''
          }
        }
      },
      {
        name: '安全管理员',
        dbkey: 'db_secureUserId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: getSecuUserByCompanyAuthApi,
        key: 'db_id',
        value: 'db_id_username',
        fnArgs: {},
        changefn: changeUser,
        dealData
      },
      {
        name: '安全管理员电话',
        dbkey: 'db_secureUserPhone',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        disabled: true,
        multipledata: [],
        list: []
      },
      {
        name: '物业经理',
        dbkey: 'db_propMUserId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: getPropUserByCompanyAuthApi,
        key: 'db_id',
        value: 'db_id_username',
        fnArgs: {},
        changefn: changeUser,
        dealData
      },
      {
        name: '物业经理手机号',
        dbkey: 'db_propMUserPhone',
        isreuqired: false,
        isSelect: false,
        disabled: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '物业验收人',
        dbkey: 'db_propPassUserId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: getPropUserByCompanyAuthApi,
        key: 'db_id',
        value: 'db_id_username',
        fnArgs: {},
        changefn: changeUserPro,
        dealData,
        ispartion: true,
        partionname: '工单信息'
      },
      {
        name: '物业验收人手机号',
        dbkey: 'db_propPassUserPhone',
        isreuqired: false,
        isSelect: false,
        disabled: true,
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '工程经理',
        dbkey: 'db_enginMUserId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: getEnginUserMByCompanyAuthApi,
        key: 'db_id',
        value: 'db_id_username',
        fnArgs: {},
        changefn: changeUser,
        dealData
      },
      {
        name: '工程经理手机号',
        dbkey: 'db_enginMUserPhone',
        isreuqired: false,
        isSelect: false,
        disabled: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '保险客户经理',
        dbkey: 'db_insuMUserId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: getInsuUserByCompanyAuthApi,
        fnArgs: {},
        key: 'db_id',
        value: 'db_id_username',
        changefn: changeUser,
        dealData
      },
      {
        name: '保险客户经理手机号',
        dbkey: 'db_insuMUserPhone',
        isreuqired: false,
        isSelect: false,
        disabled: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '现场联系人1',
        dbkey: 'db_sceneUserId1',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: getEnginUserByCompanyAuthApi,
        fnArgs: {},
        key: 'db_id',
        value: 'db_id_username',
        changefn: changeUser,
        dealData
      },
      {
        name: '现场联系人1手机号',
        dbkey: 'db_sceneUser1Phone',
        isreuqired: false,
        isSelect: false,
        disabled: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '现场联系人2',
        dbkey: 'db_sceneUserId2',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: getEnginUserByCompanyAuthApi,
        fnArgs: {},
        key: 'db_id',
        value: 'db_id_username',
        changefn: changeUser,
        dealData
      },
      {
        name: '现场联系人2手机号',
        dbkey: 'db_sceneUser2Phone',
        isreuqired: false,
        isSelect: false,
        disabled: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '现场联系人3',
        dbkey: 'db_sceneUserId3',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: getEnginUserByCompanyAuthApi,
        fnArgs: {},
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
        fn: getEnginUserByCompanyAuthApi,
        fnArgs: {},
        key: 'db_id',
        value: 'db_id_username',
        changefn: changeUser,
        dealData
      },
      {
        name: '短信接收号码',
        dbkey: 'db_smsToPhones',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      }
    ])
    const searchWhereModelProp = reactive([
      {
        name: '项目名称',
        dbkey: 'db_id_proName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '使用单位',
        dbkey: 'db_useCompanyId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '维保单位',
        dbkey: 'db_maintCompanyId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '承保单位',
        dbkey: 'db_insuCompanyId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '时间',
        dbkey: 'ui_start_createtime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_createtime = args[0]
            dialogModel.ui_end_createtime = args[1]
          } else {
            dialogModel.ui_start_createtime = ''
            dialogModel.ui_end_createtime = ''
          }
        }
      },
      {
        name: '关联单位',
        dbkey: 'ui_isByCompany',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [
          {
            value: '01',
            label: '物业单位相关'
          },
          {
            value: '02',
            label: '维保单位相关'
          },
          {
            value: '03',
            label: '保险单位相关'
          }
        ]
      }
      // {
      //   name: '为空查询',
      //   dbkey: 'ui_queryNullField',
      //   isreuqired: false,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [
      //     {
      //       value: 'db_id_proName',
      //       label: '项目名称'
      //     },
      //     {
      //       value: 'db_useCompanyId',
      //       label: '使用单位'
      //     },
      //     {
      //       value: 'db_maintCompanyId',
      //       label: '维保单位'
      //     },
      //     {
      //       value: 'db_propMUserId',
      //       label: '物业经理'
      //     },
      //     {
      //       value: 'db_propMUserPhone',
      //       label: '物业经理手机号'
      //     },
      //     {
      //       value: 'db_propPassUserId',
      //       label: '物业验收人'
      //     },
      //     {
      //       value: 'db_propPassUserPhone',
      //       label: '物业验收人手机号'
      //     },
      //     {
      //       value: 'db_enginMUserId',
      //       label: '工程经理'
      //     },
      //     {
      //       value: 'db_enginMUserPhone',
      //       label: '工程经理手机号'
      //     },
      //     {
      //       value: 'db_sceneUserId1',
      //       label: '现场联系人1'
      //     },
      //     {
      //       value: 'db_sceneUser1Phone',
      //       label: '现场联系人1手机号'
      //     },
      //     {
      //       value: 'db_sceneUserId2',
      //       label: '现场联系人2'
      //     },
      //     {
      //       value: 'db_sceneUser2Phone',
      //       label: '现场联系人2手机号'
      //     }
      //   ]
      // }
    ])
    const detailProject = data => {
      $router.push({
        name: menulist.ProjectManagementDetail.name,
        params: {
          id: data.db_id
        }
      })
    }
    const beforeAvatarUploadFile = (args: any, model: any, fn) => {
      saveListApi({}, { multipartFile: args.file }).then(x => {
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
    const beforeAvatarEleUploadFile = (args: any, model: any, fn) => {
      saveEleListApi({}, { multipartFile: args.file }).then(x => {
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
    const dialogMount = (dialogModel, addModel) => {
      if (!dialogModel.db_id) {
        dialogModel.db_proPriorityCode = '03'
        dialogModel.db_chargeUser = '--'
      }
      const tempP = addModel.find((x: any) => x.dbkey == 'db_province_city')
      const tempTime = addModel.find((x: any) => x.dbkey == 'db_startDate')
      tempTime.multipledata = []
      if (dialogModel.db_startDate) {
        const tempItem = addModel.find((x: any) => x.dbkey == 'db_startDate')
        tempItem.multipledata = [
          dialogModel.db_startDate,
          dialogModel.db_endDate
        ]
      }
      if (tempP && dialogModel.db_province_city) {
        tempP.multipledata = [dialogModel.db_province]
        if (dialogModel.db_city) {
          tempP.multipledata.push(dialogModel.db_city)
        }
        if (dialogModel.db_region) {
          tempP.multipledata.push(dialogModel.db_region)
        }
      } else {
        tempP.multipledata = []
      }
    }
    const mapSuccess = (args, model) => {
      model.value.db_addr = args.address
    }
    onBeforeMount(async () => {
      getMaintCompanyMapLoginApi({}).then(x => {
        if (x.data.success) {
          const tempSearch: any = searchWhereModelProp.find(
            (x: any) => x.dbkey == 'db_maintCompanyId'
          )
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            tempSearch.list.push({
              value: key,
              label: v
            })
          })
        }
      })

      getPropCompanyMapLoginApi({}).then(x => {
        if (x.data.success) {
          const tempSearch: any = searchWhereModelProp.find(
            (x: any) => x.dbkey == 'db_useCompanyId'
          )
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            tempSearch.list.push({
              value: key,
              label: v
            })
          })
        }
      })

      getInsuCompanyMapLoginApi({}).then(x => {
        if (x.data.success) {
          const tempSearch: any = searchWhereModelProp.find(
            (x: any) => x.dbkey == 'db_insuCompanyId'
          )
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            tempSearch.list.push({
              value: key,
              label: v
            })
          })
        }
      })
      const { listOne } = await useGetCityList()
      const temp: any = addModelProp.find(x => x.dbkey == 'db_province_city')
      if (temp) {
        temp.list = listOne
      }
    })
    onMounted(() => {})
    return {
      modelData,
      selectByConditionApi,
      selectCountByConditionApi,
      saveApi,
      updateByIdApi,
      deleteByIdApi,
      selectByIdApi,
      tableMap,
      addModelProp,
      searchWhereModelProp,
      detailProject,
      dialogMount,
      mapSuccess,
      projectTemlepteApi,
      beforeAvatarUploadFile,
      beforeAvatarEleUploadFile,
      elevatorTemlepteApi,
      updatePropPassUser
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
