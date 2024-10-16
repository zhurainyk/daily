<template>
  <div class="teamuser">
    <div v-loading="loading" class="dialog-mian max-dialog-height max-dialog">
      <div class="dialog-body">
        <el-form ref="ruleFormRef" :model="dialogModel">
          <div>
            <div class="body">
              <div class="top-head">
                <span class="partition">基本信息</span>
                <div>
                  <label class="required-before">姓名</label>
                  <el-form-item
                    :rules="[]"
                    prop="ui_username"
                    :error="errMode['ui_username']?.error"
                  >
                    <el-input v-model="dialogModel.ui_username" clearable />
                  </el-form-item>
                </div>

                <!-- <div>
                  <label class="required-before">部门</label>
                  <el-form-item
                    :rules="[]"
                    prop="ui_depId"
                    :error="errMode['ui_depId']?.error"
                  >
                    <el-select
                      v-model="dialogModel.ui_depId"
                      placeholder=""
                      clearable
                      filterable
                    >
                      <el-option
                        v-for="item in departmentList"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </div> -->

                <div>
                  <label>身份证</label>
                  <el-form-item
                    :rules="[]"
                    prop="db_idCard"
                    :error="errMode['db_idCard']?.error"
                  >
                    <el-input v-model="dialogModel.db_idCard" clearable />
                  </el-form-item>
                </div>

                <div>
                  <label class="required-before">手机号</label>
                  <el-form-item
                    :rules="[]"
                    prop="ui_mobilePhone"
                    :error="errMode['ui_mobilePhone']?.error"
                  >
                    <el-input v-model="dialogModel.ui_mobilePhone" clearable />
                  </el-form-item>
                </div>

                <div v-if="!isOrialAccount">
                  <label>上级</label>
                  <el-form-item
                    :rules="[]"
                    prop="ui_superiorId"
                    :error="errMode['ui_superiorId']?.error"
                  >
                    <el-tree-select
                      v-if="superiorListLoading"
                      v-model="dialogModel.ui_superiorId"
                      placeholder=""
                      clearable
                      filterable
                      :data="superiorList"
                      :props="{
                        label: 'db_id_username',
                        children: 'subAccountList'
                      }"
                      node-key="db_id"
                      check-strictly
                    >
                    </el-tree-select>
                  </el-form-item>
                </div>

                <!-- <div>
                  <label class="required-before">职位</label>
                  <el-form-item
                    :rules="[]"
                    prop="ui_posiId"
                    :error="errMode['ui_posiId']?.error"
                  >
                    <el-select
                      v-model="dialogModel.ui_posiId"
                      placeholder=""
                      clearable
                      filterable
                      :disabled="disablePostition"
                    >
                      <el-option
                        v-for="item in posiList"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </div> -->

                <div>
                  <label>公司</label>
                  <el-form-item
                    :rules="[]"
                    prop="db_companyId"
                    :error="errMode['db_companyId']?.error"
                  >
                    <el-select
                      v-model="dialogModel.db_companyId"
                      placeholder=""
                      clearable
                      filterable
                    >
                      <el-option
                        v-for="item in companyList"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </div>

                <div>
                  <label>技能等级</label>
                  <el-form-item
                    :rules="[]"
                    prop="db_skillLevel"
                    :error="errMode['db_skillLevel']?.error"
                  >
                    <el-select
                      v-model="dialogModel.db_skillLevel"
                      placeholder=""
                      clearable
                      filterable
                    >
                      <el-option
                        v-for="item in skillList"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </div>

                <!-- <div>
                  <label>工程师证</label>
                  <el-form-item :rules="[]">
                    <el-select
                      v-model="engiCertBeginTime.ishave"
                      placeholder=""
                      clearable
                      filterable
                    >
                      <el-option
                        v-for="item in [
                          { label: '有', value: '1' },
                          { label: '无', value: '0' }
                        ]"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </div>

                <div>
                  <label>电梯作业人员证</label>
                  <el-form-item :rules="[]">
                    <el-select
                      v-model="eleOpCertBeginTime.ishave"
                      placeholder=""
                      clearable
                      filterable
                    >
                      <el-option
                        v-for="item in [
                          { label: '有', value: '1' },
                          { label: '无', value: '0' }
                        ]"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </div>

                <div>
                  <label>职业技能等级证</label>
                  <el-form-item :rules="[]">
                    <el-select
                      v-model="skillCertBeginTime.ishave"
                      placeholder=""
                      clearable
                      filterable
                    >
                      <el-option
                        v-for="item in [
                          { label: '有', value: '1' },
                          { label: '无', value: '0' }
                        ]"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </div>

                <div>
                  <label>电梯检验员（DT-1）证</label>
                  <el-form-item :rules="[]">
                    <el-select
                      v-model="eleInsCertBeginTime.ishave"
                      placeholder=""
                      clearable
                      filterable
                    >
                      <el-option
                        v-for="item in [
                          { label: '有', value: '1' },
                          { label: '无', value: '0' }
                        ]"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </div> -->

                <div class="file-img">
                  <label>头像</label>
                  <el-form-item
                    :rules="[]"
                    prop="db_imgUrl"
                    :error="errMode['db_imgUrl']?.error"
                  >
                    <el-upload
                      class="avatar-uploader"
                      :show-file-list="false"
                      :http-request="
                        (...argument) =>
                          beforeAvatarUpload(...argument, {
                            dbkey: 'db_imgUrl',
                            filekey: 'img'
                          })
                      "
                      :data="scope"
                      :auto-upload="true"
                    >
                      <img
                        v-if="dialogModel.db_imgUrl"
                        :src="dialogModel.db_imgUrl"
                        class="avatar"
                      />
                      <el-icon v-else class="avatar-uploader-icon">+</el-icon>
                    </el-upload>
                  </el-form-item>
                </div>
              </div>
            </div>

            <!-- <div v-if="engiCertBeginTime.ishave == '1'" class="area-self">
              <div>
                <label>工程师证书名称</label>
                <el-form-item
                  :rules="[]"
                  prop="db_engiCertName"
                  :error="errMode['db_engiCertName']?.error"
                >
                  <el-input v-model="dialogModel.db_engiCertName" clearable />
                </el-form-item>
              </div>

              <div>
                <label class="required-before">工程师证书编号</label>
                <el-form-item
                  :rules="[]"
                  prop="db_engiCertCode"
                  :error="errMode['db_engiCertCode']?.error"
                >
                  <el-input v-model="dialogModel.db_engiCertCode" clearable />
                </el-form-item>
              </div>

              <div>
                <label>工程师证书获取时间</label>
                <el-form-item
                  :rules="[]"
                  prop="db_engiCertGetTime"
                  :error="errMode['db_engiCertGetTime']?.error"
                >
                  <el-date-picker
                    v-model="dialogModel.db_engiCertGetTime"
                    type="date"
                  />
                </el-form-item>
              </div>

              <div>
                <label>工程师证书等级</label>
                <el-form-item
                  :rules="[]"
                  prop="db_engiCertLevel"
                  :error="errMode['db_engiCertLevel']?.error"
                >
                  <el-select
                    v-model="dialogModel.db_engiCertLevel"
                    placeholder=""
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="item in engiCertLevel"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>

              <div>
                <label>工程师证书文件</label>
                <el-form-item
                  :rules="[]"
                  prop="db_engiCertFileUrl"
                  :error="errMode['db_engiCertFileUrl']?.error"
                >
                  <el-upload
                    :show-file-list="false"
                    :auto-upload="true"
                    :http-request="
                      (...argument) =>
                        beforeAvatarUploadFile(...argument, {
                          filekey: 'engiCertFile'
                        })
                    "
                  >
                    <el-button>上传</el-button>
                    <template #tip>
                      <span
                        class="file-item"
                        @click="openUploadFile('engiCertFile')"
                      >
                        {{ dialogModel.db_engiCertFileName }}
                      </span>
                    </template>
                  </el-upload>
                </el-form-item>
              </div>
            </div> -->
            <span class="partition">个人证书</span>
            <div class="area-self">
              <div>
                <label>电梯作业证书名称</label>
                <el-form-item
                  :rules="[]"
                  prop="db_eleOpCertName"
                  :error="errMode['db_eleOpCertName']?.error"
                >
                  <el-input v-model="dialogModel.db_eleOpCertName" clearable />
                </el-form-item>
              </div>

              <div>
                <label>电梯作业证书编号</label>
                <el-form-item
                  :rules="[]"
                  prop="db_eleOpCertCode"
                  :error="errMode['db_eleOpCertCode']?.error"
                >
                  <el-input v-model="dialogModel.db_eleOpCertCode" clearable />
                </el-form-item>
              </div>

              <div>
                <label class="required-before">电梯作业证书获取时间</label>
                <el-form-item
                  :rules="[]"
                  prop="db_eleOpCertGetTime"
                  :error="errMode['db_eleOpCertGetTime']?.error"
                >
                  <el-date-picker
                    v-model="dialogModel.db_eleOpCertGetTime"
                    type="date"
                  />
                </el-form-item>
              </div>

              <div>
                <label>电梯作业证书有效时间</label>
                <el-form-item
                  :rules="[]"
                  prop="db_eleOpCertBeginTime"
                  :error="errMode['db_eleOpCertBeginTime']?.error"
                >
                  <el-date-picker
                    v-model="eleOpCertBeginTime.multipledata"
                    type="daterange"
                    range-separator="To"
                    clearable
                    @change="eleOpCertBeginTime.changefn"
                  />
                </el-form-item>
              </div>

              <div>
                <label>电梯作业证书文件</label>
                <el-form-item
                  :rules="[]"
                  prop="db_eleOpCertFileUrl"
                  :error="errMode['db_eleOpCertFileUrl']?.error"
                >
                  <el-upload
                    :show-file-list="false"
                    :auto-upload="true"
                    :http-request="
                      (...argument) =>
                        beforeAvatarUploadFile(...argument, {
                          filekey: 'eleOpCertFile'
                        })
                    "
                  >
                    <el-button>上传</el-button>
                    <template #tip>
                      <span
                        class="file-item"
                        @click="openUploadFile('eleOpCertFile')"
                      >
                        {{ dialogModel.db_eleOpCertFileName }}
                      </span>
                    </template>
                  </el-upload>
                </el-form-item>
              </div>
            </div>

            <!-- <div v-if="skillCertBeginTime.ishave == '1'" class="area-self">
              <div>
                <label>职业技能证书名称</label>
                <el-form-item
                  :rules="[]"
                  prop="db_skillCertName"
                  :error="errMode['db_skillCertName']?.error"
                >
                  <el-input v-model="dialogModel.db_skillCertName" clearable />
                </el-form-item>
              </div>

              <div>
                <label>职业技能证书编号</label>
                <el-form-item
                  :rules="[]"
                  prop="db_skillCertCode"
                  :error="errMode['db_skillCertCode']?.error"
                >
                  <el-input v-model="dialogModel.db_skillCertCode" clearable />
                </el-form-item>
              </div>

              <div>
                <label>职业技能证书获取时间</label>
                <el-form-item
                  :rules="[]"
                  prop="db_skillCertGetTime"
                  :error="errMode['db_skillCertGetTime']?.error"
                >
                  <el-date-picker
                    v-model="dialogModel.db_skillCertGetTime"
                    type="date"
                  />
                </el-form-item>
              </div>

              <div>
                <label>职业技能证书等级</label>
                <el-form-item
                  :rules="[]"
                  prop="db_skillCertLevel"
                  :error="errMode['db_skillCertLevel']?.error"
                >
                  <el-select
                    v-model="dialogModel.db_skillCertLevel"
                    placeholder=""
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="item in skillCertLevel"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>

              <div>
                <label>职业技能证书文件</label>
                <el-form-item
                  :rules="[]"
                  prop="db_skillCertFileUrl"
                  :error="errMode['db_skillCertFileUrl']?.error"
                >
                  <el-upload
                    :show-file-list="false"
                    :auto-upload="true"
                    :http-request="
                      (...argument) =>
                        beforeAvatarUploadFile(...argument, {
                          filekey: 'skillCertFile'
                        })
                    "
                  >
                    <el-button>上传</el-button>
                    <template #tip>
                      <span
                        class="file-item"
                        @click="openUploadFile('skillCertFile')"
                      >
                        {{ dialogModel.db_skillCertFileName }}
                      </span>
                    </template>
                  </el-upload>
                </el-form-item>
              </div>
            </div>

            <div v-if="eleInsCertBeginTime.ishave == '1'" class="area-self">
              <div>
                <label>电梯检验员证书名称</label>
                <el-form-item
                  :rules="[]"
                  prop="db_eleInsCertName"
                  :error="errMode['db_eleInsCertName']?.error"
                >
                  <el-input v-model="dialogModel.db_eleInsCertName" clearable />
                </el-form-item>
              </div>

              <div>
                <label>电梯检验员证书编号</label>
                <el-form-item
                  :rules="[]"
                  prop="db_eleInsCertCode"
                  :error="errMode['db_eleInsCertCode']?.error"
                >
                  <el-input v-model="dialogModel.db_eleInsCertCode" clearable />
                </el-form-item>
              </div>

              <div>
                <label>电梯检验员证书获取时间</label>
                <el-form-item
                  :rules="[]"
                  prop="db_eleInsCertGetTime"
                  :error="errMode['db_eleInsCertGetTime']?.error"
                >
                  <el-date-picker
                    v-model="dialogModel.db_eleInsCertGetTime"
                    type="date"
                  />
                </el-form-item>
              </div>

              <div>
                <label>电梯检验员证书有效时间</label>
                <el-form-item
                  :rules="[]"
                  prop="db_skillCertBeginTime"
                  :error="errMode['db_skillCertBeginTime']?.error"
                >
                  <el-date-picker
                    v-model="eleInsCertBeginTime.multipledata"
                    type="daterange"
                    range-separator="To"
                    clearable
                    @change="eleInsCertBeginTime.changefn"
                  />
                </el-form-item>
              </div>

              <div>
                <label>电梯检验员证书文件</label>
                <el-form-item
                  :rules="[]"
                  prop="db_eleInsCertFileUrl"
                  :error="errMode['db_eleInsCertFileUrl']?.error"
                >
                  <el-upload
                    :show-file-list="false"
                    :auto-upload="true"
                    :http-request="
                      (...argument) =>
                        beforeAvatarUploadFile(...argument, {
                          filekey: 'eleInsCertFile'
                        })
                    "
                  >
                    <el-button>上传</el-button>
                    <template #tip>
                      <span
                        class="file-item"
                        @click="openUploadFile('eleInsCertFile')"
                      >
                        {{ dialogModel.db_eleInsCertFileName }}
                      </span>
                    </template>
                  </el-upload>
                </el-form-item>
              </div>
            </div> -->
          </div>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button plain @click="backPage">取消</el-button>
        <el-button v-if="addBtn || updateBtn" type="primary" @click="submitForm"
          >确认</el-button
        >
      </div>
    </div>
  </div>
  <el-dialog v-model="imgPreview">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  ref,
  onBeforeMount,
  computed
} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElForm, ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { saveApi, updateByIdApi, selectByIdApi } from '@/api/module/engineUser'
import {
  selectByAllApi,
  selectByAllTypeApi,
  uploadIOFileApi
} from '@/api/module/commont'
import {
  getDepartmentMapLoginApi,
  getUserTreeMapLoginApi,
  getMaintCompanyMapLoginApi
} from '@/api/module/login'
import { Usercenter_EnginUser } from '@/module.ts/Usercenter_EnginUser'
import { getPositionListByPosiTypeApi } from '@/api/module/position'
import useValidateRespone from '@/utils/hooks/formValidate'

export default defineComponent({
  setup() {
    const $route = useRoute()
    const dialogModel = ref<any>(new Usercenter_EnginUser())
    const files = reactive({})
    dialogModel.value.db_id = $route.params.id.toString()
    dialogModel.value.ui_depId = $route.query.depid
    dialogModel.value.ui_posiId = $route.query.posiId
    const store = useStore()
    const departmentList: any = ref([])
    const superiorList: any = ref([])
    const posiList: any = ref([])
    const companyList: any = ref([])
    const skillList: any = ref([])
    const engiCertLevel: any = ref([])
    const skillCertLevel: any = ref([])
    const superiorListLoading: any = ref(false)
    const disablePostition = ref(false)
    const engiCertBeginTime: IAddModel = reactive({
      name: '工程师证书有效时间',
      dbkey: 'db_engiCertBeginTime',
      isRules: true,
      isreuqired: true,
      isSelect: true,
      type: 'daterange',
      multiple: true,
      multipledata: [],
      ishave: '0',
      list: [],
      changefn: (args: any) => {
        if (args) {
          dialogModel.value.db_engiCertBeginTime = args[0]
          dialogModel.value.db_engiCertDeadTime = args[1]
        } else {
          dialogModel.value.db_engiCertBeginTime = ''
          dialogModel.value.db_engiCertDeadTime = ''
        }
      }
    })

    const eleOpCertBeginTime: IAddModel = reactive({
      name: '电梯作业证书有效时间',
      isreuqired: true,
      isRules: true,
      dbkey: 'db_eleOpCertBeginTime',
      isSelect: true,
      type: 'daterange',
      multiple: true,
      ishave: '0',
      multipledata: [],
      list: [],
      changefn: (args: any) => {
        if (args) {
          dialogModel.value.db_eleOpCertBeginTime = args[0]
          dialogModel.value.db_eleOpCertDeadTime = args[1]
        } else {
          dialogModel.value.db_eleOpCertBeginTime = ''
          dialogModel.value.db_eleOpCertDeadTime = ''
        }
      }
    })

    const skillCertBeginTime: IAddModel = reactive({
      name: '职业技能证书有效时间',
      dbkey: 'db_skillCertBeginTime',
      type: 'daterange',
      isreuqired: true,
      isRules: true,
      isSelect: true,
      multiple: true,
      ishave: '0',
      multipledata: [],
      list: [],
      changefn: (args: any) => {
        if (args) {
          dialogModel.value.db_skillCertBeginTime = args[0]
          dialogModel.value.db_skillCertBeginTime = args[1]
        } else {
          dialogModel.value.db_skillCertBeginTime = ''
          dialogModel.value.db_skillCertBeginTime = ''
        }
      }
    })
    const eleInsCertBeginTime: IAddModel = reactive({
      name: '电梯检验员证书有效时间',
      isreuqired: true,
      dbkey: 'db_eleInsCertBeginTime',
      isRules: true,
      isSelect: true,
      multiple: true,
      type: 'daterange',
      ishave: '0',
      multipledata: [],
      list: [],
      changefn: (args: any) => {
        if (args) {
          dialogModel.value.db_eleInsCertBeginTime = args[0]
          dialogModel.value.db_eleInsCertDeadTime = args[1]
        } else {
          dialogModel.value.db_eleInsCertBeginTime = ''
          dialogModel.value.db_eleInsCertDeadTime = ''
        }
      }
    })

    const $router = useRouter()
    const backPage = () => {
      $router.back()
    }
    const loading = ref(false)
    const ruleFormRef = ref<InstanceType<typeof ElForm>>()
    const { errMode, showError, resetError, initErrorModel } =
      useValidateRespone(ruleFormRef?.value as any, dialogModel.value)
    const submitForm = async () => {
      resetError()
      await ruleFormRef.value?.validate((valid, fields) => {
        if (valid) {
          loading.value = true
          if (dialogModel.value.db_id) {
            updateByIdApi(dialogModel.value, files).then(x => {
              if (x.data.success) {
                if (showError(x.data.data)) {
                  backPage()
                }
              }
            })
          } else {
            saveApi(dialogModel.value, files).then(x => {
              if (x.data.success) {
                if (showError(x.data.data)) {
                  backPage()
                }
              }
            })
          }
        }
        loading.value = false
      })
    }
    const beforeAvatarUpload = (args: any, model: any) => {
      if (
        args.file.name.indexOf('.jpg') > -1 ||
        args.file.name.indexOf('.png') > -1 ||
        args.file.name.indexOf('.jpeg') > -1
      ) {
        dialogModel.value[`db_${model.filekey}Name`] = args.file.name
        uploadIOFileApi({
          serverName: store.state.user.type,
          tableName: $route.name,
          urlName: `db_${model.filekey}Url`,
          multipartFile: args.file
        }).then(x => {
          if (x.data.success) {
            dialogModel.value[`db_${model.filekey}Url`] = x.data.data
          }
        })
        return true
      }
      ElMessage.warning('上传正确的图片格式')
      return false
    }
    const imgPreview = ref(false)
    const dialogImageUrl = ref('')
    const handlePictureCardPreview = uploadFile => {
      dialogImageUrl.value = uploadFile.url!
      imgPreview.value = true
    }
    const openUploadFile = (dbkey: any) => {
      if (
        dialogModel.value[`db_${dbkey}Url`].indexOf('.jpg') > -1 ||
        dialogModel.value[`db_${dbkey}Url`].indexOf('.png') > -1 ||
        dialogModel.value[`db_${dbkey}Url`].indexOf('.jpeg') > -1
      ) {
        handlePictureCardPreview({ url: dialogModel.value[`db_${dbkey}Url`] })
      } else {
        window.open(dialogModel.value[`db_${dbkey}Url`], '_blank')
      }
    }
    const beforeAvatarUploadFile = (args: any, model: any) => {
      uploadIOFileApi({
        serverName: store.state.user.type,
        tableName: $route.name,
        urlName: `db_${model.filekey}Url`,
        multipartFile: args.file
      }).then(x => {
        if (x.data.success) {
          dialogModel.value[`db_${model.filekey}Url`] = x.data.data
          dialogModel.value[`db_${model.filekey}Name`] = args.file.name
        }
      })
    }
    if (store.state.user.userInfo?.db_isSrc == '01') {
      disablePostition.value = true
      dialogModel.value.ui_posiId = '1516732642610339849'
    }
    if (
      store.state.user.userInfo?.db_isSrc != '01' &&
      store.state.user.userInfo?.db_isSrc
    ) {
      dialogModel.value.ui_superiorId = store.state.user.userInfo?.db_id
    }
    const isOrialAccount = computed(() => {
      if (store.state.user.userInfo?.db_isSrc == '01') {
        return true
      }
      if (
        store.state.user.userInfo?.db_isSrc != '01' &&
        store.state.user.userInfo?.db_isSrc
      ) {
        return true
      }
      return false
    })
    onBeforeMount(() => {
      getDepartmentMapLoginApi({}).then(result => {
        Object.entries<string>(result.data.data).forEach(([key, v]) => {
          departmentList.value.push({
            value: key,
            label: v
          })
        })
      })

      getPositionListByPosiTypeApi({ posiType: 'EnginUser' }).then(result => {
        Object.entries<string>(result.data.data).forEach(([key, v]) => {
          posiList.value.push({
            value: key,
            label: v
          })
        })
      })
      getMaintCompanyMapLoginApi({}).then(result => {
        Object.entries<string>(result.data.data).forEach(([key, v]) => {
          companyList.value.push({
            value: key,
            label: v
          })
        })
      })
      selectByAllTypeApi({ constType: 'skill_level' }).then(result => {
        Object.entries<string>(result.data.data).forEach(([key, v]) => {
          skillList.value.push({
            value: key,
            label: v
          })
        })
      })
      selectByAllTypeApi({ constType: 'cert_level' }).then(result => {
        Object.entries<string>(result.data.data).forEach(([key, v]) => {
          engiCertLevel.value.push({
            value: key,
            label: v
          })
          skillCertLevel.value.push({
            value: key,
            label: v
          })
        })
      })
    })
    onMounted(async () => {
      loading.value = true
      if (dialogModel.value.db_id) {
        const tempPosi = await selectByIdApi({ id: dialogModel.value.db_id })
        if (tempPosi.data.success) {
          dialogModel.value = tempPosi.data.data
          if (dialogModel.value.db_eleOpCertName) {
            eleOpCertBeginTime.ishave = '1'
            if (dialogModel.value.db_eleOpCertBeginTime) {
              eleOpCertBeginTime.multipledata = [
                dialogModel.value.db_eleOpCertBeginTime,
                dialogModel.value.db_eleOpCertDeadTime
              ]
            }
          }

          if (dialogModel.value.db_engiCertName) {
            engiCertBeginTime.ishave = '1'
          }

          if (dialogModel.value.db_skillCertName) {
            skillCertBeginTime.ishave = '1'
          }

          if (dialogModel.value.db_eleInsCertName) {
            eleInsCertBeginTime.ishave = '1'
            if (dialogModel.value.db_eleInsCertBeginTime) {
              eleInsCertBeginTime.multipledata = [
                dialogModel.value.db_eleInsCertBeginTime,
                dialogModel.value.db_eleInsCertDeadTime
              ]
            }
          }
        }
      }
      getUserTreeMapLoginApi({}).then(result => {
        superiorList.value = result.data.data
        superiorListLoading.value = true
      })
      loading.value = false
    })
    const addBtn = computed(
      () =>
        store.state.menu.menuAuth.findIndex((x: any) =>
          new RegExp(`${$route.meta.add}$`).test(x)
        ) > -1
    )
    const updateBtn = computed(
      () =>
        store.state.menu.menuAuth.findIndex((x: any) =>
          new RegExp(`${$route.meta.edit}$`).test(x)
        ) > -1
    )
    return {
      saveApi,
      backPage,
      updateByIdApi,
      selectByIdApi,
      beforeAvatarUpload,
      beforeAvatarUploadFile,
      engiCertBeginTime,
      skillCertBeginTime,
      eleInsCertBeginTime,
      eleOpCertBeginTime,
      errMode,
      submitForm,
      dialogModel,
      addBtn,
      updateBtn,
      ruleFormRef,
      departmentList,
      superiorList,
      posiList,
      companyList,
      skillList,
      engiCertLevel,
      skillCertLevel,
      superiorListLoading,
      imgPreview,
      dialogImageUrl,
      openUploadFile,
      isOrialAccount,
      disablePostition
    }
  }
})
</script>

<style lang="scss" scoped>
.teamuser {
  background-color: white;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px 0;
  .file-item {
    cursor: pointer;
    color: $p-color-primary;
  }
  .dialog-mian {
    height: 100%;
    padding: 0;
    .dialog-body {
      overflow-x: hidden;
      overflow-y: auto;
      .body {
        width: 100%;
        align-items: flex-start;
      }
      .top-head {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        > div {
          width: 320px;
          padding: 0;
          padding-right: 45px;
          > label {
            min-width: 100px;
            margin-bottom: 10px;
            position: relative;
            display: inline-block;
          }
        }
      }
    }
    .el-form {
      display: flex;
      > div {
        align-content: baseline;
      }
    }
    .avatar-uploader {
      .avatar-uploader-icon {
        font-size: 30px;
        border: 1px dashed #8c939d;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 178px;
        height: 178px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      img {
        width: 178px;
        height: 178px;
      }
    }
    .file-img {
      width: 100% !important;
    }
    .area-self {
      display: flex;
      width: 100% !important;
      > div {
        width: 320px;
        padding: 0;
        padding-right: 45px;
        > label {
          min-width: 100px;
          margin-bottom: 10px;
          margin-top: 10px;
          position: relative;
          display: inline-block;
        }
      }
    }
  }
}
</style>
