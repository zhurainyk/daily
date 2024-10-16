<template>
  <div>
    <el-dialog
      v-if="dialog.visiableModify"
      v-model="dialog.visiableModify"
      class="max-dialog"
      :show-close="false"
      top="1vw"
    >
      <AddEdit
        :current-data="modelDataModify"
        dbkey="kkk"
        :save-api="updateLoginUserInfoApi"
        :add-model="addModePropUpdate"
        @close="closeFn"
        @success="successFn"
        :maxwidth="true"
        fullauthortity="/"
        :dialogMount="dialogMount"
      >
        <template #headtitle>
          <label>修改个人信息</label>
        </template>
      </AddEdit>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, watch, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { UPDATEIMG } from '@/store/mutation-types'
import {
  updateLoginUserInfoApi,
  getLoginUserAllInfoApi
} from '@/api/module/login'
import AddEdit from '../singlelist/components/addEdit'
import { selectByAllTypeApi } from '@/api/module/commont'

export default defineComponent({
  components: { AddEdit },
  emits: ['close'],
  props: {
    modifyUserVisable: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const successFn = (res, data) => {
      store.dispatch(UPDATEIMG, data)
    }
    let modelDataModify = ref({})
    const addModePropUpdate = ref([])
    const dialog = reactive({
      visiableModify: false
    })
    const closeFn = () => {
      emit('close')
    }
    const addUser = [
      {
        name: '姓名',
        dbkey: 'ui_username',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      // {
      //   name: '手机号',
      //   dbkey: 'ui_mobilePhone',
      //   isreuqired: true,
      //   isSelect: false,
      //   multiple: false,
      //   multipledata: [],
      //   isRules: true,
      //   list: []
      // },
      {
        name: '头像',
        dbkey: 'db_imgUrl',
        filekey: 'img',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        type: 'img',
        list: []
      }
    ]
    const addUserPro = [
      {
        name: '姓名',
        dbkey: 'ui_username',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      // {
      //   name: '手机号',
      //   dbkey: 'ui_mobilePhone',
      //   isreuqired: true,
      //   isSelect: false,
      //   multiple: false,
      //   multipledata: [],
      //   isRules: true,
      //   list: []
      // },
      {
        name: '身份证',
        dbkey: 'db_idCard',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '安全管理证名称',
        dbkey: 'db_safetyManaCertName',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '安全管理证编号',
        dbkey: 'db_safetyManaCertCode',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '安全管理证首次获取时间',
        dbkey: 'db_safetyManaCertGetTime',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        type: 'datetime',
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '安全管理证有效时间',
        dbkey: 'db_safetyManaCertBeginTime',
        isreuqired: false,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.db_safetyManaCertBeginTime = args[0]
            dialogModel.db_safetyManaCertDeadTime = args[1]
          } else {
            dialogModel.db_safetyManaCertBeginTime = ''
            dialogModel.db_safetyManaCertDeadTime = ''
          }
        }
      },
      {
        name: '安全管理证文件',
        dbkey: 'db_safetyManaCertFileUrl',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'files',
        filekey: 'safetyManaCertFile'
      },
      {
        name: '头像',
        dbkey: 'db_imgUrl',
        filekey: 'img',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        type: 'img',
        list: []
      }
    ]
    const addUserEngineer = [
      {
        name: '姓名',
        dbkey: 'ui_username',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '身份证',
        dbkey: 'db_idCard',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      // {
      //   name: '手机号',
      //   dbkey: 'ui_mobilePhone',
      //   isreuqired: true,
      //   isSelect: false,
      //   multiple: false,
      //   multipledata: [],
      //   isRules: true,
      //   list: []
      // },
      {
        name: '电梯作业证书名称',
        dbkey: 'db_eleOpCertName',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },

      {
        name: '电梯作业证书编号',
        dbkey: 'db_eleOpCertCode',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },

      {
        name: '电梯作业证书获取时间',
        dbkey: 'db_eleOpCertGetTime',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        type: 'date',
        list: []
      },
      {
        name: '电梯作业证书有效时间',
        dbkey: 'db_eleOpCertBeginTime',
        isreuqired: false,
        isSelect: true,
        multiple: true,
        multipledata: [],
        isRules: true,
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.db_eleOpCertBeginTime = args[0]
            dialogModel.db_eleOpCertDeadTime = args[1]
          } else {
            dialogModel.db_eleOpCertBeginTime = ''
            dialogModel.db_eleOpCertDeadTime = ''
          }
        }
      },

      {
        name: '电梯作业证书文件(无纸化维保必须为PDF格式)',
        dbkey: 'db_eleOpCertFileUrl',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'files',
        filekey: 'eleOpCertFile'
      },
      // {
      //   name: '工程师证书名称',
      //   dbkey: 'db_engiCertName',
      //   isreuqired: false,
      //   isSelect: false,
      //   multiple: false,
      //   multipledata: [],
      //   isRules: true,
      //   list: []
      // },

      // {
      //   name: '工程师证书编号',
      //   dbkey: 'db_engiCertCode',
      //   isreuqired: false,
      //   isSelect: false,
      //   multiple: false,
      //   multipledata: [],
      //   isRules: true,
      //   list: []
      // },

      // {
      //   name: '工程师证书获取时间',
      //   dbkey: 'db_engiCertGetTime',
      //   isreuqired: false,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   isRules: true,
      //   type: 'date',
      //   list: []
      // },
      // {
      //   name: '工程师证书等级',
      //   dbkey: 'db_engiCertLevel',
      //   isreuqired: false,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   fn: selectByAllTypeApi,
      //   fnArgs: { constType: 'cert_level' }
      // },

      // {
      //   name: '工程师证书文件',
      //   dbkey: 'db_engiCertFileUrl',
      //   isreuqired: false,
      //   isSelect: false,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   type: 'files',
      //   filekey: 'engiCertFile'
      // },

      // {
      //   name: '职业技能证书名称',
      //   dbkey: 'db_skillCertName',
      //   isreuqired: false,
      //   isSelect: false,
      //   multiple: false,
      //   multipledata: [],
      //   list: []
      // },

      // {
      //   name: '职业技能证书编号',
      //   dbkey: 'db_skillCertCode',
      //   isreuqired: false,
      //   isSelect: false,
      //   multiple: false,
      //   multipledata: [],
      //   isRules: true,
      //   list: []
      // },

      // {
      //   name: '职业技能证书获取时间',
      //   dbkey: 'db_skillCertGetTime',
      //   isreuqired: false,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   isRules: true,
      //   type: 'date',
      //   list: []
      // },
      // {
      //   name: '职业技能证书等级',
      //   dbkey: 'db_skillCertLevel',
      //   isreuqired: false,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   fn: selectByAllTypeApi,
      //   fnArgs: { constType: 'cert_level' }
      // },
      // {
      //   name: '职业技能证书文件',
      //   dbkey: 'db_skillCertFileUrl',
      //   isreuqired: false,
      //   isSelect: false,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   type: 'files',
      //   filekey: 'skillCertFile'
      // },

      // {
      //   name: '电梯检验员证书名称',
      //   dbkey: 'db_eleInsCertName',
      //   isreuqired: false,
      //   isSelect: false,
      //   multiple: false,
      //   multipledata: [],
      //   isRules: true,
      //   list: []
      // },

      // {
      //   name: '电梯检验员证书编号',
      //   dbkey: 'db_eleInsCertCode',
      //   isreuqired: false,
      //   isSelect: false,
      //   multiple: false,
      //   multipledata: [],
      //   isRules: true,
      //   list: []
      // },

      // {
      //   name: '电梯检验员证书获取时间',
      //   dbkey: 'db_eleInsCertGetTime',
      //   isreuqired: false,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   isRules: true,
      //   type: 'date',
      //   list: []
      // },
      // {
      //   name: '电梯检验员证书有效时间',
      //   dbkey: 'db_eleInsCertBeginTime',
      //   isreuqired: false,
      //   isSelect: true,
      //   multiple: true,
      //   multipledata: [],
      //   isRules: true,
      //   type: 'daterange',
      //   list: [],
      //   changefn: (args: any, addModel, x, dialogModel) => {
      //     if (args) {
      //       dialogModel.db_eleInsCertBeginTime = args[0]
      //       dialogModel.db_eleInsCertDeadTime = args[1]
      //     } else {
      //       dialogModel.db_eleInsCertBeginTime = ''
      //       dialogModel.db_eleInsCertDeadTime = ''
      //     }
      //   }
      // },

      // {
      //   name: '电梯检验员证书文件',
      //   dbkey: 'db_eleInsCertFileUrl',
      //   isreuqired: false,
      //   isSelect: false,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   type: 'files',
      //   filekey: 'eleInsCertFile'
      // },
      {
        name: '头像',
        dbkey: 'db_imgUrl',
        filekey: 'img',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        type: 'img',
        list: []
      }
    ]
    const currentStore = useStore()
    const currentUser = computed(() => currentStore.state.user.userInfo)
    const dialogMount = (dialogModel, addModel) => {
      let tempdata = addModel.find(x => x.dbkey == 'db_safetyManaCertBeginTime')
      if (tempdata) {
        tempdata.multipledata = []
        if (dialogModel.db_safetyManaCertBeginTime) {
          tempdata.multipledata = [
            dialogModel.db_safetyManaCertBeginTime,
            dialogModel.db_safetyManaCertDeadTime
          ]
        }
      }

      let tempdata1 = addModel.find(x => x.dbkey == 'db_eleOpCertBeginTime')
      if (tempdata1) {
        tempdata1.multipledata = []
        if (dialogModel.db_eleOpCertBeginTime) {
          tempdata1.multipledata = [
            dialogModel.db_eleOpCertBeginTime,
            dialogModel.db_eleOpCertDeadTime
          ]
        }
      }

      let tempdata2 = addModel.find(x => x.dbkey == 'db_eleInsCertBeginTime')
      if (tempdata2) {
        tempdata2.multipledata = []
        if (dialogModel.db_eleInsCertBeginTime) {
          tempdata2.multipledata = [
            dialogModel.db_eleInsCertBeginTime,
            dialogModel.db_eleInsCertDeadTime
          ]
        }
      }
    }
    watch(
      () => props.modifyUserVisable,
      val => {
        if (val) {
          getLoginUserAllInfoApi({}).then(x => {
            if (currentUser.value.db_posiType == 'EnginUser') {
              addModePropUpdate.value = addUserEngineer
            } else if (currentUser.value.db_posiType == 'PropUser') {
              addModePropUpdate.value = addUserPro
            } else {
              addModePropUpdate.value = JSON.parse(JSON.stringify(addUser))
            }
            modelDataModify.value = {}
            if (x.data.data) {
              modelDataModify.value = x.data.data
              // addModePropUpdate.value.forEach(element => {
              //   modelDataModify.value[element.dbkey] =
              //     x.data.data[element.dbkey]
              // })
              dialog.visiableModify = true
            }
          })
        }
      },
      {
        immediate: true
      }
    )

    return {
      successFn,
      dialog,
      modelDataModify,
      addModePropUpdate,
      updateLoginUserInfoApi,
      closeFn,
      dialogMount
    }
  }
})
</script>
