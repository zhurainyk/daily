<template>
  <div
    v-loading="loading"
    class="dialog-mian"
    :class="[heigthDialog, { 'max-dialog': maxwidth }]"
  >
    <div v-if="isHaveHead" class="dialog-head">
      <div>
        <label>新增</label>
      </div>
      <slot></slot>
      <span class="cancel-img" @click="closeDialog"></span>
    </div>
    <div class="dialog-body">
      <el-form ref="ruleFormRef" :model="dialogModel">
        <div>
          <template v-for="x in addModel" :key="x.dbkey">
            <div
              v-if="!x.isNotshowKey"
              :class="[
                x.dbkey,
                { 'file-img': x.type == 'img' },
                { 'full-with': x.isfull }
              ]"
              class="task-dialog"
            >
              <div>
                <label
                  :class="{ 'required-before': x.isreuqired }"
                  class="label-task"
                  >{{ x.name }}</label
                >
                <el-form-item
                  :rules="[]"
                  :prop="x.dbkey"
                  :error="errMode[x.dbkey]?.error"
                >
                  <slot
                    :name="x.dbkey"
                    :dialog-model="dialogModel"
                    :item="x"
                    :files="files"
                  >
                    <template v-if="x.isSelect">
                      <template v-if="x.multiple">
                        <template v-if="x.type == 'daterange'">
                          <el-date-picker
                            v-model="x.multipledata"
                            :placeholder="x.name"
                            type="daterange"
                            range-separator="To"
                            clearable
                            @change="
                              (...argument) => {
                                x.changefn
                                  ? x.changefn(
                                      ...argument,
                                      addModel,
                                      x,
                                      dialogModel
                                    )
                                  : () => {}
                              }
                            "
                          />
                        </template>
                        <template v-else-if="x.type == 'cascader'">
                          <el-cascader
                            v-model="x.multipledata"
                            :placeholder="x.name"
                            :options="x.list"
                            clearable
                            :props="{ expandTrigger: 'hover' }"
                            @change="
                              (...argument) => {
                                x.changefn
                                  ? x.changefn(
                                      ...argument,
                                      addModel,
                                      x,
                                      dialogModel
                                    )
                                  : () => {}
                              }
                            "
                          />
                        </template>
                        <template v-else>
                          <el-select
                            v-model="x.multipledata"
                            :placeholder="x.name"
                            :multiple="true"
                            clearable
                            filterable
                            :disabled="x.disabled"
                            @change="
                              (...argument) =>
                                x.changefn
                                  ? x.changefn(
                                      ...argument,
                                      addModel,
                                      x,
                                      dialogModel,
                                      errMode
                                    )
                                  : mutilFn(...argument, x)
                            "
                          >
                            <el-option
                              v-for="item in x.list"
                              :disabled="item.disabled"
                              :key="item.label"
                              :label="item.label"
                              :value="item.value"
                            />
                          </el-select>
                        </template>
                      </template>
                      <template v-else>
                        <template v-if="x.type == 'date'">
                          <template v-if="x.isObj">
                            <el-date-picker
                              v-model="dialogModel[x.isObj][x.dbkey]"
                              type="date"
                              :placeholder="x.name"
                              @change="
                                (...argument) => {
                                  x.changefn
                                    ? x.changefn(
                                        ...argument,
                                        addModel,
                                        x,
                                        dialogModel
                                      )
                                    : () => {}
                                }
                              "
                            />
                          </template>
                          <template v-else>
                            <el-date-picker
                              v-model="dialogModel[x.dbkey]"
                              type="date"
                              :placeholder="x.name"
                              @change="
                                (...argument) => {
                                  x.changefn
                                    ? x.changefn(
                                        ...argument,
                                        addModel,
                                        x,
                                        dialogModel
                                      )
                                    : () => {}
                                }
                              "
                            />
                          </template>
                        </template>
                        <template v-if="x.type == 'datetime'">
                          <template v-if="x.isObj">
                            <el-date-picker
                              v-model="dialogModel[x.isObj][x.dbkey]"
                              type="datetime"
                              :placeholder="x.name"
                              :editable="false"
                              @change="
                                (...argument) => {
                                  x.changefn
                                    ? x.changefn(
                                        ...argument,
                                        addModel,
                                        x,
                                        dialogModel
                                      )
                                    : () => {}
                                }
                              "
                            />
                          </template>
                          <template v-else>
                            <el-date-picker
                              v-model="dialogModel[x.dbkey]"
                              type="datetime"
                              :editable="false"
                              :placeholder="x.name"
                              @change="
                                (...argument) => {
                                  x.changefn
                                    ? x.changefn(
                                        ...argument,
                                        addModel,
                                        x,
                                        dialogModel
                                      )
                                    : () => {}
                                }
                              "
                            />
                          </template>
                        </template>
                        <template v-else>
                          <template v-if="x.isObj">
                            <el-select
                              v-model="dialogModel[x.isObj][x.dbkey]"
                              :placeholder="x.name"
                              clearable
                              filterable
                              :disabled="x.disabled"
                              @change="
                                (...argument) => {
                                  x.changefn
                                    ? x.changefn(
                                        ...argument,
                                        addModel,
                                        x,
                                        dialogModel
                                      )
                                    : () => {}
                                }
                              "
                            >
                              <el-option
                                v-for="item in x.list"
                                :key="item.label"
                                :label="item.label"
                                :value="item.value"
                              />
                            </el-select>
                          </template>
                          <template v-else>
                            <el-select
                              v-model="dialogModel[x.dbkey]"
                              :placeholder="x.name"
                              clearable
                              filterable
                              :disabled="x.disabled"
                              @change="
                                (...argument) => {
                                  x.changefn
                                    ? x.changefn(
                                        ...argument,
                                        addModel,
                                        x,
                                        dialogModel
                                      )
                                    : () => {}
                                }
                              "
                            >
                              <el-option
                                v-for="item in x.list"
                                :key="item.label"
                                :label="item.label"
                                :value="item.value"
                              />
                            </el-select>
                          </template>
                        </template>
                      </template>
                    </template>
                    <template v-else-if="x.type == 'img'">
                      <el-upload
                        class="avatar-uploader"
                        :show-file-list="false"
                        :http-request="
                          (...argument) => beforeAvatarUpload(...argument, x)
                        "
                        :data="scope"
                        :auto-upload="true"
                      >
                        <img
                          v-if="dialogModel[x.dbkey]"
                          :src="dialogModel[x.dbkey]"
                          class="avatar"
                        />
                        <el-icon v-else class="avatar-uploader-icon">+</el-icon>
                      </el-upload>
                    </template>
                    <template v-else-if="x.type == 'imgs'">
                      <el-upload
                        v-model:file-list="x.list"
                        class="avatar-uploader imgs"
                        list-type="picture-card"
                        :show-file-list="true"
                        multiple
                        :http-request="
                          (...argument) => beforeAvatarsUpload(...argument, x)
                        "
                        :on-preview="handlePictureCardPreview"
                        :data="scope"
                      >
                        <el-icon class="avatar-uploader-icon2">+</el-icon>
                      </el-upload>
                    </template>
                    <template v-else-if="x.type == 'files'">
                      <el-upload
                        :show-file-list="false"
                        :auto-upload="true"
                        :http-request="
                          (...argument) =>
                            beforeAvatarUploadFile(...argument, x)
                        "
                      >
                        <el-button>上传</el-button>
                        <template #tip>
                          <span class="file-item">
                            {{ dialogModel[`db_${x.filekey}Name`] }}
                          </span>
                        </template>
                      </el-upload>
                    </template>
                    <template v-else-if="x.type == 'map'">
                      <el-input
                        v-model="dialogModel[x.dbkey]"
                        :placeholder="x.name"
                        @focus="dialog.visiableDialog = true"
                      />
                    </template>
                    <template v-else>
                      <template v-if="x.isObj">
                        <el-input
                          v-model="dialogModel[x.isObj][x.dbkey]"
                          :placeholder="x.name"
                          :type="x.type ? x.type : ''"
                          clearable
                          @change="
                            (...argument) => {
                              x.changefn
                                ? x.changefn(
                                    ...argument,
                                    addModel,
                                    x,
                                    dialogModel
                                  )
                                : () => {}
                            }
                          "
                        />
                      </template>
                      <template v-else>
                        <el-input
                          v-model="dialogModel[x.dbkey]"
                          :placeholder="x.name"
                          :type="x.type ? x.type : ''"
                          clearable
                          @change="
                            (...argument) => {
                              x.changefn
                                ? x.changefn(
                                    ...argument,
                                    addModel,
                                    x,
                                    dialogModel
                                  )
                                : () => {}
                            }
                          "
                        />
                      </template>
                    </template>
                  </slot>
                </el-form-item>
              </div>
            </div>
          </template>
        </div>
      </el-form>
    </div>
    <div class="dialog-footer">
      <el-button plain class="cancel-btn" @click="closeDialog">取消</el-button>
      <el-button v-if="addBtn || updateBtn" type="primary" @click="submitForm"
        >确认</el-button
      >
    </div>
  </div>
  <el-dialog
    v-if="dialog.visiableDialog"
    v-model="dialog.visiableDialog"
    :append-to-body="true"
    :width="'1155px'"
    :show-close="false"
  >
    <MapComponent
      @close="dialog.visiableDialog = false"
      @success="getMapAdress"
    >
    </MapComponent>
  </el-dialog>
  <el-dialog v-model="imgPreview">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ElForm, ElMessage } from 'element-plus'
import MapComponent from '@/components/MapComponent'
import useValidateRespone from '@/utils/hooks/formValidate'
import { uploadIOFileApi, uploadIOFilesApi } from '@/api/module/commont'

export default defineComponent({
  components: {
    MapComponent
  },
  props: {
    currentData: {
      type: Object,
      required: true
    },
    maxwidth: {
      type: Boolean,
      defualt: false
    },
    updateByIdApi: {
      type: Function,
      required: true
    },
    saveApi: {
      type: Function,
      required: true
    },
    dbkey: {
      type: String,
      required: true,
      default: 'db_id'
    },
    selectByIdApi: {
      type: Function,
      required: true
    },
    addModel: {
      type: Array
    },
    isFileUpload: {
      type: Boolean,
      default: false
    },
    dialogMount: {
      type: Function
    },
    isHaveHead: {
      type: Boolean,
      default: true
    },
    authortity: {
      type: String,
      default: ''
    }
  },
  emits: ['close', 'success'],
  setup(props, { emit }) {
    const closeDialog = () => {
      emit('close')
    }
    const dialogModel = ref<any>(JSON.parse(JSON.stringify(props.currentData)))
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
          loading.value = true
          if (dialogModel.value[props.dbkey]) {
            props.updateByIdApi(dialogModel.value).then(x => {
              if (x.data.success) {
                if (showError(x.data.data)) {
                  closeDialog()
                  emit('success', x.data.data)
                }
              }
            })
          } else {
            props.saveApi(dialogModel.value).then(x => {
              if (x.data.success) {
                if (showError(x.data.data)) {
                  closeDialog()
                  emit('success', x.data.data)
                }
              }
            })
          }
        }
        loading.value = false
      })
    }
    const beforeAvatarsUpload = (args: any, model: any) => {
      console.log({ args, model }, new Date().getTime())
      if (
        args.file.name.indexOf('.jpg') > -1 ||
        args.file.name.indexOf('.png') > -1 ||
        args.file.name.indexOf('.jpeg') > -1
      ) {
        const uid = args.file.uid
        uploadIOFilesApi({
          serverName: store.state.user.type,
          tableName: $route.name,
          urlName: `db_${model.filekey}Url`,
          multipartFiles: args.file
        }).then(x => {
          if (x.data.success) {
            const temp = model.list.find(x => x.uid == uid)
            temp.url = x.data.data
          }
        })

        // dialogModel.value[`db_${model.filekey}Name`] = args.file.name

        return true
      }
      return false
    }
    const imgPreview = ref(false)
    const dialogImageUrl = ref('')
    const handlePictureCardPreview = uploadFile => {
      dialogImageUrl.value = uploadFile.url!
      imgPreview.value = true
    }

    const heigthDialog = computed(() => {
      if (props.addModel) {
        if (props.addModel.length > 0 && props.addModel.length < 2) {
          return 'min-dialog-height'
        }
        return 'max-dialog-height'
      }
      return 'min-dialog-height'
    })
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
            dialogModel.value[model.dbkey] = x.data.data
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
          dialogModel.value[model.dbkey] = x.data.data
        }
      })
    }
    const getMapAdress = args => {
      dialogModel.value.db_mapAddr = args.address
      dialogModel.value.db_mapLongi = args.lng
      dialogModel.value.db_mapLati = args.lat
    }
    const mutilFn = (args, item) => {
      if (item.isObj) {
        dialogModel.value[item.isObj][item.dbkey] = args.join(',')
      } else {
        dialogModel.value[item.dbkey] = args.join(',')
      }
    }
    const initFn = args => {
      args.forEach((x: any, index: number) => {
        if (x.fn) {
          x.list = []
          x.fn(x.fnArgs).then(result => {
            if (result.data.data) {
              if (x.key) {
                const { objectList, condition } = result.data.data
                objectList.forEach((y: any) => {
                  x.list.push({
                    value: y[x.key],
                    label: y[x.value],
                    ...y
                  })
                })
              } else {
                Object.entries<string>(result.data.data).forEach(([key, v]) => {
                  x.list.push({
                    value: key,
                    label: v
                  })
                })
              }

              if (x.multiple) {
                if (dialogModel.value[x.dbkey]) {
                  let temp = dialogModel.value[x.dbkey].split(',')
                  temp = temp.filter(
                    h => x.list.findIndex(j => j.value == h) > -1
                  )
                  dialogModel.value[x.dbkey] = temp.join(',')
                  x.multipledata = temp
                }
              } else if (dialogModel.value[x.dbkey]) {
                if (
                  x.list.findIndex(
                    j => j.value == dialogModel.value[x.dbkey]
                  ) <= -1
                ) {
                  dialogModel.value[x.dbkey] = ''
                }
              }
            }
          })
        }
      })
    }
    const initDialogModel = data => {
      dialogModel.value = JSON.parse(JSON.stringify(data))
    }

    const $route = useRoute()
    const store = useStore()
    const addBtn = computed(
      () =>
        store.state.menu.menuAuth.findIndex((x: any) =>
          new RegExp(`${$route.meta.add}$`).test(x)
        ) > -1 ||
        (props.authortity &&
          store.state.menu.menuAuth.findIndex(
            (x: any) => x.indexOf(`${props.authortity}/save`) > -1
          ) > -1)
    )
    const updateBtn = computed(
      () =>
        store.state.menu.menuAuth.findIndex((x: any) =>
          new RegExp(`${$route.meta.edit}$`).test(x)
        ) > -1 ||
        (props.authortity &&
          store.state.menu.menuAuth.findIndex(
            (x: any) => x.indexOf(`${props.authortity}/updateById`) > -1
          ) > -1)
    )

    onMounted(async () => {
      loading.value = true
      if (props.currentData[props.dbkey]) {
        const tempPosi = await props.selectByIdApi({
          id: props.currentData[props.dbkey]
        })
        if (tempPosi.data.success) {
          dialogModel.value = tempPosi.data.data
        }
      }
      if (props.dialogMount) {
        props.dialogMount(dialogModel.value, props.addModel)
      }
      initFn(props.addModel)
      loading.value = false
    })
    return {
      closeDialog,
      submitForm,
      beforeAvatarUpload,
      beforeAvatarUploadFile,
      heigthDialog,
      files,
      ruleFormRef,
      loading,
      errMode,
      dialogModel,
      dialog,
      getMapAdress,
      mutilFn,
      initErrorModel,
      initFn,
      initDialogModel,
      addBtn,
      updateBtn,
      beforeAvatarsUpload,
      handlePictureCardPreview,
      imgPreview,
      dialogImageUrl
    }
  }
})
</script>

<style lang="scss" scoped>
.dialog-mian {
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
  .file-img,
  .full-with {
    width: 100% !important;
  }
}
</style>
