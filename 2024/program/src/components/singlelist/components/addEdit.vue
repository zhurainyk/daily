<template>
  <div
    v-loading="loading"
    class="dialog-mian"
    :class="[heigthDialog, { 'max-dialog': maxwidth }]"
  >
    <div v-if="isHaveHead" class="dialog-head">
      <div>
        <slot name="headtitle">
          <label>{{ `${dialogModel[dbkey] ? '编辑' : '新增'}` }}</label>
        </slot>
      </div>
      <slot></slot>
      <span class="cancel-img" @click="closeDialog"></span>
    </div>
    <div class="dialog-body">
      <el-form ref="ruleFormRef" :model="dialogModel">
        <div>
          <template v-for="x in addModel" :key="x.dbkey">
            <span class="partition" v-if="x.ispartion">{{
              x.partionname
            }}</span>
            <div
              v-if="!x.isNotshowKey"
              :class="[
                x.dbkey,
                { 'file-img': x.type == 'img' },
                { 'full-new-row': x.fullrow }
              ]"
            >
              <label :class="{ 'required-before': x.isreuqired }">{{
                x.name
              }}</label>
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
                      <template
                        v-if="
                          x.type == 'daterange' || x.type == 'datetimerange'
                        "
                      >
                        <el-date-picker
                          v-model="x.multipledata"
                          :placeholder="x.name"
                          :type="x.type"
                          range-separator="To"
                          :popper-class="`auto-${x.dbkey}-dialog-popper`"
                          clearable
                          :disabled-date="x.disableddate || null"
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
                          :popper-class="`auto-${x.dbkey}-dialog-popper`"
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
                          :popper-class="`auto-${x.dbkey}-dialog-popper`"
                          @change="
                            (...argument) =>
                              x.changefn
                                ? x.changefn(
                                    ...argument,
                                    addModel,
                                    x,
                                    dialogModel
                                  )
                                : mutilFn(...argument, x)
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
                    <template v-else-if="x.type == 'treeselect'">
                      <el-tree-select
                        v-if="x.loading"
                        v-model="dialogModel[x.dbkey]"
                        :placeholder="x.name"
                        :data="x.list"
                        :props="x.props"
                        :node-key="x.key"
                        :check-strictly="!x.checkstrictly"
                        filterable
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
                      <template v-if="x.type == 'date' || x.type == 'datetime'">
                        <el-date-picker
                          v-model="dialogModel[x.dbkey]"
                          :type="x.type"
                          :placeholder="x.name"
                          :disabled="x.isDisable"
                          :popper-class="`auto-${x.dbkey}-dialog-popper`"
                          :disabled-date="x.disableddate || null"
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
                          v-model="dialogModel[x.dbkey]"
                          :placeholder="x.name"
                          clearable
                          filterable
                          :disabled="x.isDisable"
                          :popper-class="`auto-${x.dbkey}-dialog-popper`"
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
                      :on-remove="handleRemove"
                    >
                      <el-icon class="avatar-uploader-icon2">+</el-icon>
                    </el-upload>
                  </template>
                  <template v-else-if="x.type == 'multiplefile'">
                    <el-upload
                      v-model:file-list="x.list"
                      class="avatar-uploader multiplefile"
                      :show-file-list="true"
                      multiple
                      :http-request="
                        (...argument) =>
                          beforeAvatarsMultipleFileUpload(...argument, x)
                      "
                      :data="scope"
                    >
                      <el-button>上传</el-button>
                    </el-upload>
                  </template>
                  <template v-else-if="x.type == 'files'">
                    <el-upload
                      :show-file-list="false"
                      :auto-upload="true"
                      :http-request="
                        (...argument) => beforeAvatarUploadFile(...argument, x)
                      "
                    >
                      <el-button>上传</el-button>
                      <template #tip>
                        <span class="file-item" @click="openUploadFile(x)">
                          {{ dialogModel[`db_${x.filekey}Name`] }}
                        </span>
                      </template>
                    </el-upload>
                  </template>
                  <template v-else-if="x.type == 'map'">
                    <el-input
                      v-model="dialogModel[x.dbkey]"
                      :placeholder="x.name"
                      @click="openMapDialog"
                    />
                  </template>
                  <template v-else>
                    <template v-if="x.type == 'number'">
                      <el-input-number
                        v-model="dialogModel[x.dbkey]"
                        :placeholder="x.name"
                        min="0"
                        clearable
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
                      />
                    </template>
                    <template v-else>
                      <el-input
                        v-model="dialogModel[x.dbkey]"
                        :placeholder="x.name"
                        :disabled="x.disabled"
                        clearable
                        :maxlength="x.maxlength || 10000"
                        min="0"
                        :type="x.type ? x.type : ''"
                        :autosize="x.autosize"
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
          </template>
        </div>
      </el-form>
    </div>
    <div class="dialog-footer">
      <el-button plain class="cancel-btn" @click="closeDialog">取消</el-button>
      <el-button
        v-if="addBtn || updateBtn || fullAuthor"
        type="primary"
        @click="submitForm"
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
      :address="address"
      @close="dialog.visiableDialog = false"
      @success="getMapAdress"
    >
    </MapComponent>
  </el-dialog>
  <el-dialog v-model="imgPreview">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
  <slot name="right" :add-model="addModel" :dialog-model="dialogModel"></slot>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ElForm, ElMessage } from 'element-plus'
import useValidateRespone from '@/utils/hooks/formValidate'
import MapComponent from '@/components/MapComponent'
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
    dialogSelectMount: {
      type: Function
    },
    isHaveHead: {
      type: Boolean,
      default: true
    },
    authortity: {
      type: String,
      default: ''
    },
    isCopy: {
      type: Boolean,
      default: false
    },
    submitBeforeFn: {
      type: Function,
      required: false
    },
    fullauthortity: {
      type: String,
      default: ''
    }
  },
  emits: ['close', 'success', 'map-success', 'success-dialog'],
  setup(props, { emit }) {
    const closeDialog = () => {
      emit('close')
    }
    const dialogModel = ref<any>(JSON.parse(JSON.stringify(props.currentData)))
    const dialog = reactive({
      visiableDialog: false
    })
    const $route = useRoute()
    const store = useStore()
    const files = reactive({})
    const loading = ref(false)
    const ruleFormRef = ref<InstanceType<typeof ElForm>>()
    const address = reactive({
      address: '',
      lng: '',
      lat: ''
    })
    const openMapDialog = event => {
      address.address = dialogModel.value.db_mapAddr
      address.lng = dialogModel.value.db_mapLongi
      address.lat = dialogModel.value.db_mapLati
      dialog.visiableDialog = true
    }
    const { errMode, showError, resetError, initErrorModel } =
      useValidateRespone(ruleFormRef?.value as any, dialogModel.value)
    const submitForm = async () => {
      console.log('开始')
      resetError()
      await ruleFormRef.value?.validate((valid, fields) => {
        if (valid) {
          if (props.submitBeforeFn) {
            props.submitBeforeFn(dialogModel.value)
          }
          loading.value = true
          const temp = props.addModel?.filter((x: any) => {
            return x.type == 'imgs'
          })
          if (temp?.length) {
            temp.forEach((x: any) => {
              dialogModel.value[x.dbkey] = x.list
                .reduce((pre, cur) => {
                  return [...pre, cur.url]
                }, [])
                .join(',')
            })
          }
          const multiplefileData = props.addModel?.filter((x: any) => {
            return x.type == 'multiplefile'
          })
          if (multiplefileData?.length) {
            multiplefileData.forEach((mf: any) => {
              dialogModel.value[mf.dbkey] = mf.list.map(x => x.url).join(',')
              if (mf.filekey) {
                dialogModel.value[`db_${mf.filekey}Name`] = mf.list
                  .map(x => x.name)
                  .join(',')
              }
            })
          }
          if (dialogModel.value[props.dbkey]) {
            props.updateByIdApi(dialogModel.value).then(x => {
              if (x.data.success) {
                if (showError(x.data.data)) {
                  closeDialog()
                  emit('success', x.data.data, dialogModel.value)
                  emit('success-dialog', x.data.data, dialogModel.value)
                }
              }
            })
          } else {
            props.saveApi(dialogModel.value).then(x => {
              if (x.data.success) {
                if (showError(x.data.data)) {
                  closeDialog()
                  emit('success', x.data.data, dialogModel.value)
                  emit('success-dialog', x.data.data, dialogModel.value)
                }
              }
            })
          }
        }
        loading.value = false
      })
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
    const openUploadFile = (args: any) => {
      if (
        dialogModel.value[args.dbkey].indexOf('.jpg') > -1 ||
        dialogModel.value[args.dbkey].indexOf('.png') > -1 ||
        dialogModel.value[args.dbkey].indexOf('.jpeg') > -1
      ) {
        handlePictureCardPreview({ url: dialogModel.value[args.dbkey] })
      } else {
        window.open(dialogModel.value[args.dbkey], '_blank')
      }
    }
    const beforeAvatarsMultipleFileUpload = (args: any, model: any) => {
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
          temp.name = temp.name.replace(',', '')
        }
      })
    }
    const handleRemove = (files, uploadFiles) => {
      console.log({ files, uploadFiles })
    }
    const imgPreview = ref(false)
    const dialogImageUrl = ref('')
    const handlePictureCardPreview = uploadFile => {
      dialogImageUrl.value = uploadFile.url!
      imgPreview.value = true
    }

    const beforeAvatarUpload = (args: any, model: any) => {
      console.log({ args, model })
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
      uploadIOFileApi({
        serverName: store.state.user.type,
        tableName: $route.name,
        urlName: `db_${model.filekey}Url`,
        multipartFile: args.file
      }).then(x => {
        if (x.data.success) {
          dialogModel.value[model.dbkey] = x.data.data
          dialogModel.value[`db_${model.filekey}Name`] = args.file.name
        }
      })
    }
    const getMapAdress = args => {
      dialogModel.value.db_mapAddr = args.address
      dialogModel.value.db_mapLongi = args.lng
      dialogModel.value.db_mapLati = args.lat
      emit('map-success', args, dialogModel)
    }
    const mutilFn = (args, item) => {
      dialogModel.value[item.dbkey] = args.join(',')
    }
    const initFn = args => {
      args.forEach((x: any, index: number) => {
        if (x.fn) {
          x.list = []
          x.fn(x.fnArgs).then(result => {
            if (result.data.data) {
              if (x.key) {
                let objectList1 = []
                if (x.dealData) {
                  objectList1 = x.dealData(result.data.data)
                } else {
                  const { objectList, condition } = result.data.data
                  objectList1 = objectList
                }

                objectList1.forEach((y: any) => {
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
                x.multipledata = []
                if (dialogModel.value[x.dbkey]) {
                  let temp = dialogModel.value[x.dbkey].split(',')
                  temp = temp.filter(
                    h => x.list.findIndex(j => j.value == h) > -1
                  )
                  dialogModel.value[x.dbkey] = temp.join(',')
                  x.multipledata = temp
                }
              } else if (dialogModel.value[x.dbkey]) {
                if (x.type == 'treeselect') {
                  x.loading = true
                  return
                }
                if (
                  x.list.findIndex(
                    j => j.value == dialogModel.value[x.dbkey]
                  ) <= -1
                ) {
                  dialogModel.value[x.dbkey] = ''
                }
              } else if (x.type == 'treeselect') {
                x.loading = true
              }
            }
          })
        }
      })
    }
    const initDialogModel = data => {
      dialogModel.value = JSON.parse(JSON.stringify(data))
    }

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
    const fullAuthor = computed(() => {
      if (props.fullauthortity) {
        return (
          store.state.menu.menuAuth.findIndex((x: any) =>
            new RegExp(`${props.fullauthortity}`).test(x)
          ) > -1
        )
      }
      return false
    })
    onMounted(async () => {
      if (props.addModel) {
        props.addModel
          .filter((x: any) => x.type == 'multiplefile' || x.type == 'imgs')
          .forEach((e: any) => {
            e.list = []
          })
      }
      if (props.currentData[props.dbkey]) {
        const tempPosi = await props.selectByIdApi({
          id: props.currentData[props.dbkey]
        })
        if (tempPosi.data.success) {
          dialogModel.value = tempPosi.data.data
          if (props.isCopy) {
            dialogModel.value[props.dbkey] = ''
          }
          if (props.dialogSelectMount) {
            props.dialogSelectMount(dialogModel.value, props.addModel)
          }
          if (props.addModel) {
            props.addModel
              .filter((x: any) => x.type == 'multiplefile' || x.type == 'imgs')
              .forEach((e: any) => {
                if (dialogModel.value[e.dbkey]) {
                  const tempFiles = dialogModel.value[e.dbkey].split(',')
                  let tempNames = []
                  if (dialogModel.value[`db_${e.filekey}Name`]) {
                    tempNames =
                      dialogModel.value[`db_${e.filekey}Name`].split(',')
                  }
                  e.list = tempFiles.map((h, index) => {
                    return {
                      url: h,
                      name: tempNames[index] || ''
                    }
                  })
                } else {
                  e.list = []
                }
              })
            props.addModel
              .filter((x: any) => !x.type && x.isSelect && x.multiple)
              .forEach((e: any) => {
                if (dialogModel.value[e.dbkey]) {
                  e.multipledata = dialogModel.value[e.dbkey].split(',')
                }
              })
          }
        }
      }
      if (props.dialogMount) {
        props.dialogMount(dialogModel.value, props.addModel)
      }
      initFn(props.addModel)
    })

    return {
      closeDialog,
      submitForm,
      beforeAvatarUpload,
      beforeAvatarsUpload,
      beforeAvatarsMultipleFileUpload,
      handleRemove,
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
      address,
      openMapDialog,
      handlePictureCardPreview,
      dialogImageUrl,
      imgPreview,
      openUploadFile,
      fullAuthor
    }
  }
})
</script>

<style lang="scss" scoped>
.dialog-mian {
  .avatar-uploader {
    &.multiplefile {
      width: 100%;
    }
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

    // :deep() .el-upload-list__item-actions .el-upload-list__item-preview {
    //   display: none;
    // }

    img {
      width: 178px;
      height: 178px;
    }
  }
  .file-item {
    cursor: pointer;
    color: $p-color-primary;
  }
  .avatar-uploader.imgs {
    .avatar-uploader-icon {
      width: 60px;
      height: 80px;
    }

    img {
      width: 60px;
      height: 80px;
    }

    :deep() .el-upload-list--picture-card .el-upload-list__item {
      width: 60px;
      height: 80px;
    }

    :deep() .el-upload-list--picture-card .el-upload--picture-card {
      width: 60px;
      height: 80px;
    }

    :deep().el-upload-list__item.is-success {
      width: 60px;
      height: 80px;
    }
  }

  .file-img {
    width: 320px !important;
    &.full-new-row {
      width: 100% !important;
    }
  }

  //el-upload-list__item is-success
}
</style>
