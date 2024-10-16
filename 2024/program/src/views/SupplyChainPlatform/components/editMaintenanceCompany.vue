<template>
  <div class="company">
    <div v-loading="loading" class="dialog-mian max-dialog-height max-dialog">
      <div class="dialog-body">
        <el-form ref="ruleFormRef" :model="dialogModel">
          <div>
            <span class="partition">基本信息</span>
            <div>
              <label class="required-before">公司名称</label>
              <el-form-item
                :rules="[]"
                prop="db_id_companyName"
                :error="errMode['db_id_companyName']?.error"
              >
                <el-input v-model="dialogModel.db_id_companyName" clearable />
              </el-form-item>
            </div>
            <div>
              <label>纳税识别号</label>
              <el-form-item
                :rules="[]"
                prop="db_companyCode"
                :error="errMode['db_companyCode']?.error"
              >
                <el-input v-model="dialogModel.db_companyCode" clearable />
              </el-form-item>
            </div>

            <div>
              <label>公司地址</label>
              <el-form-item
                :rules="[]"
                prop="db_companyAddr"
                :error="errMode['db_companyAddr']?.error"
              >
                <el-input v-model="dialogModel.db_companyAddr" clearable />
              </el-form-item>
            </div>
            <div>
              <label>联系人姓名</label>
              <el-form-item
                :rules="[]"
                prop="db_contactName"
                :error="errMode['db_contactName']?.error"
              >
                <el-input v-model="dialogModel.db_contactName" clearable />
              </el-form-item>
            </div>
            <div>
              <label>联系人电话</label>
              <el-form-item
                :rules="[]"
                prop="db_contactPhone"
                :error="errMode['db_contactPhone']?.error"
              >
                <el-input v-model="dialogModel.db_contactPhone" clearable />
              </el-form-item>
            </div>
            <div>
              <label>公司电话</label>
              <el-form-item
                :rules="[]"
                prop="db_companyPhone"
                :error="errMode['db_companyPhone']?.error"
              >
                <el-input v-model="dialogModel.db_companyPhone" clearable />
              </el-form-item>
            </div>

            <div>
              <label>银行账号</label>
              <el-form-item
                :rules="[]"
                prop="db_bankAccount"
                :error="errMode['db_bankAccount']?.error"
              >
                <el-input v-model="dialogModel.db_bankAccount" clearable />
              </el-form-item>
            </div>

            <div>
              <label>开户行名称</label>
              <el-form-item
                :rules="[]"
                prop="db_bankName"
                :error="errMode['db_bankName']?.error"
              >
                <el-input v-model="dialogModel.db_bankName" clearable />
              </el-form-item>
            </div>

            <div>
              <label>独立办公面积</label>
              <el-form-item
                :rules="[]"
                prop="db_officeSpace"
                :error="errMode['db_officeSpace']?.error"
              >
                <el-input v-model="dialogModel.db_officeSpace" clearable />
              </el-form-item>
            </div>

            <div>
              <label>本地区维保台数</label>
              <el-form-item
                :rules="[]"
                prop="db_localmaintCount"
                :error="errMode['db_localmaintCount']?.error"
              >
                <el-input v-model="dialogModel.db_localmaintCount" clearable />
              </el-form-item>
            </div>
            <div>
              <label>源id</label>
              <el-form-item
                :rules="[]"
                prop="db_srcId"
                :error="errMode['db_srcId']?.error"
              >
                <el-select
                  v-model="dialogModel.db_srcId"
                  placeholder=""
                  clearable
                  filterable
                >
                  <el-option
                    v-for="item in srcids"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div>
              <label>是否启用Logo</label>
              <el-form-item :rules="[]" prop="db_extraOnOff">
                <el-select
                  v-model="dialogModel.db_extraOnOff"
                  placeholder=""
                  clearable
                  filterable
                >
                  <el-option
                    v-for="item in public_whether"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>

            <div>
              <label>展示的公司名称</label>
              <el-form-item :rules="[]">
                <el-input v-model="dialogModel.company_name" clearable />
              </el-form-item>
            </div>
            <div class="file-img-witdh">
              <label>系统展示名称</label>
              <el-form-item :rules="[]">
                <el-input v-model="dialogModel.system_name" clearable />
              </el-form-item>
            </div>
            <div class="file-img">
              <label>web端logo</label>
              <el-form-item :rules="[]">
                <el-upload
                  class="avatar-uploader"
                  :show-file-list="false"
                  :http-request="
                    (...argument) =>
                      beforeAvatarLogoUploadFile(...argument, {
                        dbkey: 'logo_url',
                        filekey: 'logo_url'
                      })
                  "
                  :data="scope"
                  :auto-upload="true"
                >
                  <img
                    v-if="dialogModel.logo_url"
                    :src="dialogModel.logo_url"
                    class="avatar"
                  />
                  <el-icon v-else class="avatar-uploader-icon">+</el-icon>
                </el-upload>
              </el-form-item>
            </div>
            <div class="file-img">
              <label>APP端logo</label>
              <el-form-item :rules="[]">
                <el-upload
                  class="avatar-uploader"
                  :show-file-list="false"
                  :http-request="
                    (...argument) =>
                      beforeAvatarLogoUploadFile(...argument, {
                        dbkey: 'appLogo_url',
                        filekey: 'appLogo_url'
                      })
                  "
                  :data="scope"
                  :auto-upload="true"
                >
                  <img
                    v-if="dialogModel.appLogo_url"
                    :src="dialogModel.appLogo_url"
                    class="avatar"
                  />
                  <el-icon v-else class="avatar-uploader-icon">+</el-icon>
                </el-upload>
              </el-form-item>
            </div>
            <div class="file-img">
              <label>小程序logo</label>
              <el-form-item :rules="[]">
                <el-upload
                  class="avatar-uploader"
                  :show-file-list="false"
                  :http-request="
                    (...argument) =>
                      beforeAvatarLogoUploadFile(...argument, {
                        dbkey: 'wxLogo_url',
                        filekey: 'wxLogo_url'
                      })
                  "
                  :data="scope"
                  :auto-upload="true"
                >
                  <img
                    v-if="dialogModel.wxLogo_url"
                    :src="dialogModel.wxLogo_url"
                    class="avatar"
                  />
                  <el-icon v-else class="avatar-uploader-icon">+</el-icon>
                </el-upload>
              </el-form-item>
            </div>

            <div class="file-img">
              <label>营业执照</label>
              <el-form-item
                :rules="[]"
                prop="db_licenseUrl"
                :error="errMode['db_licenseUrl']?.error"
              >
                <el-upload
                  class="avatar-uploader"
                  :show-file-list="false"
                  :http-request="
                    (...argument) =>
                      beforeAvatarUpload(...argument, {
                        dbkey: 'db_licenseUrl',
                        filekey: 'license'
                      })
                  "
                  :data="scope"
                  :auto-upload="true"
                >
                  <img
                    v-if="dialogModel.db_licenseUrl"
                    :src="dialogModel.db_licenseUrl"
                    class="avatar"
                  />
                  <el-icon v-else class="avatar-uploader-icon">+</el-icon>
                </el-upload>
              </el-form-item>
            </div>

            <span class="partition">无纸化</span>

            <div>
              <label>平台名称</label>
              <el-form-item
                :rules="[]"
                prop="db_platformName"
                :error="errMode['db_platformName']?.error"
              >
                <el-input v-model="dialogModel.db_platformName" clearable />
              </el-form-item>
            </div>

            <div>
              <label>平台key</label>
              <el-form-item
                :rules="[]"
                prop="db_platformKey"
                :error="errMode['db_platformKey']?.error"
              >
                <el-input v-model="dialogModel.db_platformKey" clearable />
              </el-form-item>
            </div>

            <div>
              <label>平台编码</label>
              <el-form-item
                :rules="[]"
                prop="db_platformCode"
                :error="errMode['db_platformCode']?.error"
              >
                <el-input v-model="dialogModel.db_platformCode" clearable />
              </el-form-item>
            </div>
            <div>
              <label>平台secret</label>
              <el-form-item
                :rules="[]"
                prop="db_platformSecret"
                :error="errMode['db_platformSecret']?.error"
              >
                <el-input v-model="dialogModel.db_platformSecret" clearable />
              </el-form-item>
            </div>

            <span class="partition">企业资质</span>

            <div>
              <label>维保企业隶属性质</label>
              <el-form-item
                :rules="[]"
                prop="db_maintNature"
                :error="errMode['db_maintNature']?.error"
              >
                <el-select
                  v-model="dialogModel.db_maintNature"
                  placeholder=""
                  clearable
                  filterable
                >
                  <el-option
                    v-for="item in maintNatureList"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>

            <div class="area-self">
              <div>
                <label>特种设备许可证等级</label>
                <el-form-item
                  :rules="[]"
                  prop="db_specEquipLcLevel"
                  :error="errMode['db_specEquipLcLevel']?.error"
                >
                  <el-select
                    v-model="dialogModel.db_specEquipLcLevel"
                    placeholder=""
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="item in specEquipLcLevelList"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>

              <div>
                <label>特种设备许可证</label>
                <el-form-item
                  :rules="[]"
                  prop="db_specEquipLcFileUrl"
                  :error="errMode['db_specEquipLcFileUrl']?.error"
                >
                  <el-upload
                    :show-file-list="false"
                    :auto-upload="true"
                    :http-request="
                      (...argument) =>
                        beforeAvatarUploadFile(...argument, {
                          filekey: 'specEquipLcFile'
                        })
                    "
                  >
                    <el-button>上传</el-button>
                    <template #tip>
                      <span class="file-item">
                        {{ dialogModel.db_specEquipLcFileName }}
                      </span>
                    </template>
                  </el-upload>
                </el-form-item>
              </div>

              <div>
                <label>法律纠纷</label>
                <el-form-item
                  :rules="[]"
                  prop="db_legalDispute"
                  :error="errMode['db_legalDispute']?.error"
                >
                  <el-select
                    v-model="dialogModel.db_legalDispute"
                    placeholder=""
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="item in legalDispute"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>

              <div
                v-show="
                  dialogModel.db_legalDispute &&
                  dialogModel.db_legalDispute != '01'
                "
              >
                <label>法律纠纷凭证文件</label>
                <el-form-item
                  :rules="[]"
                  prop="db_legalDisputeFileUrl"
                  :error="errMode['db_legalDisputeFileUrl']?.error"
                >
                  <el-upload
                    :show-file-list="false"
                    :auto-upload="true"
                    :http-request="
                      (...argument) =>
                        beforeAvatarUploadFile(...argument, {
                          filekey: 'legalDisputeFile'
                        })
                    "
                  >
                    <el-button>上传</el-button>
                    <template #tip>
                      <span class="file-item">
                        {{ dialogModel.db_legalDisputeFileName }}
                      </span>
                    </template>
                  </el-upload>
                </el-form-item>
              </div>
            </div>

            <div class="area-self">
              <div>
                <label>历史安全事故</label>
                <el-form-item
                  :rules="[]"
                  prop="db_hisAccident"
                  :error="errMode['db_hisAccident']?.error"
                >
                  <el-select
                    v-model="dialogModel.db_hisAccident"
                    placeholder=""
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="item in hisAccident"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>

              <div
                v-show="
                  dialogModel.db_hisAccident &&
                  dialogModel.db_hisAccident != '01'
                "
              >
                <label>历史安全事故凭证文件</label>
                <el-form-item
                  :rules="[]"
                  prop="db_hisAccidentFileUrl"
                  :error="errMode['db_hisAccidentFileUrl']?.error"
                >
                  <el-upload
                    :show-file-list="false"
                    :auto-upload="true"
                    :http-request="
                      (...argument) =>
                        beforeAvatarUploadFile(...argument, {
                          filekey: 'hisAccidentFile'
                        })
                    "
                  >
                    <el-button>上传</el-button>
                    <template #tip>
                      <span class="file-item">
                        {{ dialogModel.db_hisAccidentFileName }}
                      </span>
                    </template>
                  </el-upload>
                </el-form-item>
              </div>

              <div>
                <label>负面新闻报道</label>
                <el-form-item
                  :rules="[]"
                  prop="db_negativeNew"
                  :error="errMode['db_negativeNew']?.error"
                >
                  <el-select
                    v-model="dialogModel.db_negativeNew"
                    placeholder=""
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="item in negativeNew"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>

              <div
                v-show="
                  dialogModel.db_negativeNew &&
                  dialogModel.db_negativeNew != '01'
                "
              >
                <label>负面新闻报道凭证文件</label>
                <el-form-item
                  :rules="[]"
                  prop="db_negativeNewFileUrl"
                  :error="errMode['db_negativeNewFileUrl']?.error"
                >
                  <el-upload
                    :show-file-list="false"
                    :auto-upload="true"
                    :http-request="
                      (...argument) =>
                        beforeAvatarUploadFile(...argument, {
                          filekey: 'negativeNewFile'
                        })
                    "
                  >
                    <el-button>上传</el-button>
                    <template #tip>
                      <span class="file-item">
                        {{ dialogModel.db_negativeNewFileName }}
                      </span>
                    </template>
                  </el-upload>
                </el-form-item>
              </div>
            </div>

            <div class="area-self">
              <div>
                <label>处罚记录</label>
                <el-form-item
                  :rules="[]"
                  prop="db_punishment"
                  :error="errMode['db_punishment']?.error"
                >
                  <el-select
                    v-model="dialogModel.db_punishment"
                    placeholder=""
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="item in punishment"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>

              <div
                v-show="
                  dialogModel.db_punishment && dialogModel.db_punishment != '01'
                "
              >
                <label>处罚记录凭证文件</label>
                <el-form-item
                  :rules="[]"
                  prop="db_punishmentFileUrl"
                  :error="errMode['db_punishmentFileUrl']?.error"
                >
                  <el-upload
                    :show-file-list="false"
                    :auto-upload="true"
                    :http-request="
                      (...argument) =>
                        beforeAvatarUploadFile(...argument, {
                          filekey: 'punishmentFile'
                        })
                    "
                  >
                    <el-button>上传</el-button>
                    <template #tip>
                      <span class="file-item">
                        {{ dialogModel.db_punishmentFileName }}
                      </span>
                    </template>
                  </el-upload>
                </el-form-item>
              </div>

              <div>
                <label>企业荣誉</label>
                <el-form-item
                  :rules="[]"
                  prop="db_honor"
                  :error="errMode['db_honor']?.error"
                >
                  <el-select
                    v-model="dialogModel.db_honor"
                    placeholder=""
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="item in honor"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>

              <div
                v-show="dialogModel.db_honor && dialogModel.db_honor != '01'"
              >
                <label>企业荣誉凭证文件</label>
                <el-form-item
                  :rules="[]"
                  prop="db_honorFileUrl"
                  :error="errMode['db_honorFileUrl']?.error"
                >
                  <el-upload
                    :show-file-list="false"
                    :auto-upload="true"
                    :http-request="
                      (...argument) =>
                        beforeAvatarUploadFile(...argument, {
                          filekey: 'honorFile'
                        })
                    "
                  >
                    <el-button>上传</el-button>
                    <template #tip>
                      <span class="file-item">
                        {{ dialogModel.db_honorFileName }}
                      </span>
                    </template>
                  </el-upload>
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button plain @click="closeDialog">取消</el-button>
        <el-button v-if="addBtn || updateBtn" type="primary" @click="submitForm"
          >确认</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  ref,
  computed,
  shallowReactive
} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ElForm, ElMessage } from 'element-plus'
import { saveApi, updateByIdApi, selectByIdApi } from '@/api/module/maincompany'
import {
  selectByAllApi,
  selectByAllTypeApi,
  uploadIOFileApi
} from '@/api/module/commont'
import useValidateRespone from '@/utils/hooks/formValidate'
import { Usercenter_MaintCompany } from '@/module.ts/Usercenter_MaintCompany'
import { selectByConditionApi as selectUserByConditionApi } from '@/api/module/user'

export default defineComponent({
  setup(props, { emit }) {
    const $route = useRoute()
    const dialogModel = ref<any>(new Usercenter_MaintCompany())
    dialogModel.value.db_id = $route.params.id.toString()
    const specEquipLcLevelList: any = shallowReactive([])
    const maintNatureList: any = shallowReactive([])
    const hisAccident: any = shallowReactive([])
    const negativeNew: any = shallowReactive([])
    const legalDispute: any = shallowReactive([])
    const punishment: any = shallowReactive([])
    const honor: any = shallowReactive([])
    const public_whether: any = shallowReactive([])
    const srcids: any = ref([])
    const getList = () => {
      selectByAllTypeApi({ constType: 'specEquip_lcLevel' }).then(result => {
        Object.entries<string>(result.data.data).forEach(([key, v]) => {
          specEquipLcLevelList.push({
            value: key,
            label: v
          })
        })
      })
      selectUserByConditionApi({
        ui_type: 'A1',
        ui_currentPage: 1,
        ui_pageSize: 0,
        db_isSrc: '01'
      }).then(x => {
        if (x.data.success) {
          let { objectList } = x.data.data
          srcids.value = objectList.map(x => {
            return {
              value: x.db_id,
              label: x.db_id_username
            }
          })
        }
      })
      selectByAllTypeApi({ constType: 'maintCompany_nature' }).then(result => {
        Object.entries<string>(result.data.data).forEach(([key, v]) => {
          maintNatureList.push({
            value: key,
            label: v
          })
        })
      })
      selectByAllTypeApi({ constType: 'his_accident' }).then(result => {
        Object.entries<string>(result.data.data).forEach(([key, v]) => {
          hisAccident.push({
            value: key,
            label: v
          })
        })
      })
      selectByAllTypeApi({ constType: 'negative_new' }).then(result => {
        Object.entries<string>(result.data.data).forEach(([key, v]) => {
          negativeNew.push({
            value: key,
            label: v
          })
        })
      })

      selectByAllTypeApi({ constType: 'legal_dispute' }).then(result => {
        Object.entries<string>(result.data.data).forEach(([key, v]) => {
          legalDispute.push({
            value: key,
            label: v
          })
        })
      })

      selectByAllTypeApi({ constType: 'punishment' }).then(result => {
        Object.entries<string>(result.data.data).forEach(([key, v]) => {
          punishment.push({
            value: key,
            label: v
          })
        })
      })
      selectByAllTypeApi({ constType: 'honor' }).then(result => {
        Object.entries<string>(result.data.data).forEach(([key, v]) => {
          honor.push({
            value: key,
            label: v
          })
        })
      })

      selectByAllTypeApi({ constType: 'public_whether' }).then(result => {
        Object.entries<string>(result.data.data).forEach(([key, v]) => {
          public_whether.push({
            value: key,
            label: v
          })
        })
      })
    }

    const $router = useRouter()
    const backPage = () => {
      $router.back()
    }
    const closeDialog = () => {
      backPage()
    }

    const dialog = reactive({
      visiableDialog: false
    })

    const files = reactive({})
    const loading = ref(false)
    const ruleFormRef = ref<InstanceType<typeof ElForm>>()
    const { errMode, showError, resetError, initErrorModel } =
      useValidateRespone(ruleFormRef?.value as any, dialogModel.value)
    const submitForm = async () => {
      resetError()
      await ruleFormRef.value?.validate((valid, fields) => {
        if (valid) {
          submitBeforeFn(dialogModel.value)
          loading.value = true
          if (dialogModel.value.db_id) {
            updateByIdApi(dialogModel.value, files).then(x => {
              if (x.data.success) {
                if (showError(x.data.data)) {
                  closeDialog()
                }
              }
            })
          } else {
            saveApi(dialogModel.value, files).then(x => {
              if (x.data.success) {
                if (showError(x.data.data)) {
                  closeDialog()
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
    const beforeAvatarUploadFile = (args: any, model: any) => {
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
    }

    const beforeAvatarLogoUploadFile = (args: any, model: any) => {
      if (
        args.file.name.indexOf('.jpg') > -1 ||
        args.file.name.indexOf('.png') > -1 ||
        args.file.name.indexOf('.jpeg') > -1
      ) {
        uploadIOFileApi({
          serverName: store.state.user.type,
          tableName: $route.name,
          urlName: `db_${model.filekey}Url`,
          multipartFile: args.file
        }).then(x => {
          if (x.data.success) {
            dialogModel.value[model.filekey] = x.data.data
          }
        })
        return true
      }
      ElMessage.warning('上传正确的图片格式')
      return false
    }

    const dialogSelectMount = dialogModel => {
      let tempJosn: any = {}
      if (dialogModel.db_extra) {
        try {
          tempJosn = JSON.parse(dialogModel.db_extra)
        } catch (error) {
          console.log('数据不合格')
        }
      }
      dialogModel.company_name = tempJosn.company_name

      dialogModel.system_name = tempJosn.system_name

      dialogModel.logo_url = tempJosn.logo_url

      dialogModel.appLogo_url = tempJosn.appLogo_url

      dialogModel.wxLogo_url = tempJosn.wxLogo_url
    }
    const submitBeforeFn = (dialogModel: any) => {
      const tempJosn = {
        company_name: dialogModel.company_name,
        system_name: dialogModel.system_name,
        logo_url: dialogModel.logo_url,
        appLogo_url: dialogModel.appLogo_url,
        wxLogo_url: dialogModel.wxLogo_url
      }
      dialogModel.db_extra = JSON.stringify(tempJosn)
    }

    const store = useStore()
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

    onMounted(async () => {
      loading.value = true
      if (dialogModel.value.db_id) {
        const tempPosi = await selectByIdApi({ id: dialogModel.value.db_id })
        if (tempPosi.data.success) {
          dialogModel.value = tempPosi.data.data
          dialogSelectMount(dialogModel.value)
        }
      }
      getList()
      loading.value = false
    })
    return {
      saveApi,
      backPage,
      updateByIdApi,
      selectByIdApi,
      closeDialog,
      submitForm,
      beforeAvatarUpload,
      beforeAvatarUploadFile,
      beforeAvatarLogoUploadFile,
      files,
      ruleFormRef,
      loading,
      errMode,
      dialogModel,
      dialog,
      initErrorModel,
      addBtn,
      updateBtn,
      specEquipLcLevelList,
      maintNatureList,
      hisAccident,
      negativeNew,
      legalDispute,
      punishment,
      honor,
      public_whether,
      srcids
    }
  }
})
</script>

<style lang="scss" scoped>
.company {
  background-color: white;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px 0;
  .dialog-mian {
    height: 100%;
    padding: 0;
    .dialog-body {
      overflow-x: hidden;
      overflow-y: auto;
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
    .file-img-witdh {
      margin-right: 1000px;
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
          position: relative;
          display: inline-block;
        }
      }
    }
  }
}
</style>
