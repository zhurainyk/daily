<template>
  <div class="dialog-mian max-dialog max-dialog-height reply-dialog">
    <div class="dialog-head">
      <div>
        <label v-if="currentStatus == '04'">维修方案</label>
        <label v-if="currentStatus == '06'">报价信息</label>
        <label v-if="currentStatus == '03'">勘验信息</label>
      </div>
      <span class="cancel-img" @click="closeDialogFn"></span>
    </div>
    <div class="dialog-body">
      <div class="commemt">
        <el-form ref="ruleFormRef">
          <slot
            :adddata="addComment"
            name="other"
            :addparts="addparts"
            :deletepart="deletepart"
            :partlists="partlists"
            :change-part-money="changePartMoney"
            :validation-data="validationData"
            :change-money="changeMoney"
            :changedealwith="changedealwith"
          >
            <el-form-item
              v-if="currentStatus == '04'"
              :error="validationModal.db_preDuration"
            >
              <div class="item-dialog">
                <label class="required-before">预计天数(天)</label>
                <el-input-number
                  v-model="addComment.db_preDuration"
                  type="number"
                  max="999"
                  :controls="false"
                  min="0"
                ></el-input-number>
              </div>
            </el-form-item>

            <template v-if="currentStatus == '06'">
              <div class="upload-quotation">
                <el-form-item :error="validationModal.db_scrapValueDeal">
                  <div class="item-quotation">
                    <label class="required-before">残值处理方式</label>
                    <el-select
                      v-model="addComment.db_scrapValueDeal"
                      clearable
                      filterable
                      @change="
                        (...argument) => changedealwith(...argument, addComment)
                      "
                    >
                      <el-option
                        v-for="item in scrapValueDeals"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </div>
                </el-form-item>

                <el-form-item :error="validationModal.db_scrapValue">
                  <div class="item-quotation">
                    <label>残值(元)</label>
                    <el-input
                      v-model="addComment.db_scrapValue"
                      type="number"
                      :disabled="addComment.db_scrapValueDeal != '01'"
                      @input="changeMoney(addComment)"
                    ></el-input>
                  </div>
                </el-form-item>
                <el-form-item :error="validationModal.db_manhourCost">
                  <div class="item-quotation">
                    <label class="required-before">工时费(元)</label>
                    <el-input
                      v-model="addComment.db_manhourCost"
                      type="number"
                      @input="changeMoney(addComment)"
                    ></el-input>
                  </div>
                </el-form-item>

                <el-form-item>
                  <div class="item-quotation">
                    <label>配件费(元)</label>
                    <el-input
                      v-model="addComment.db_partCost"
                      disabled
                      type="number"
                    ></el-input>
                  </div>
                </el-form-item>

                <el-form-item :error="validationModal.db_totalCost">
                  <div class="item-quotation">
                    <label>合计费用(元)</label>
                    <el-input
                      v-model="addComment.db_totalCost"
                      disabled
                      type="number"
                    ></el-input>
                  </div>
                </el-form-item>
              </div>
              <div class="add-part">
                <label>配件更换登记</label>
                <el-icon @click="addparts">
                  <CirclePlus />
                </el-icon>
              </div>
              <div class="upload-quotation-part">
                <div
                  v-for="(x, index) in partlists"
                  :key="index"
                  :indexnum="index + 1"
                >
                  <el-form-item
                    class="frist-part-name"
                    :error="x['errordb_partInstanceName']"
                  >
                    <div class="item-quotation">
                      <label class="required-before">配件信息:</label>
                      <el-input v-model="x.db_partInstanceName"></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item :error="x['errordb_unitPrice']">
                    <div class="item-quotation">
                      <label class="required-before">单价(元):</label>
                      <el-input-number
                        v-model="x.db_unitPrice"
                        min="0"
                        :controls="false"
                        precision="2"
                        @change="changePartMoney(index)"
                      ></el-input-number>
                    </div>
                  </el-form-item>

                  <el-form-item :error="x['errordb_replaceCount']">
                    <div class="item-quotation">
                      <label class="required-before">更换数量:</label>
                      <el-input-number
                        min="0"
                        precision="0"
                        :controls="false"
                        v-model="x.db_replaceCount"
                        @change="changePartMoney(index)"
                      ></el-input-number>
                    </div>
                  </el-form-item>
                  <el-form-item :error="x['errordb_unit']" class="unit">
                    <div class="item-quotation">
                      <label class="required-before">单位:</label>
                      <el-select
                        v-model="x.db_unit"
                        clearable
                        filterable
                        @change="(...argument) => changeUint(...argument, x)"
                      >
                        <el-option
                          v-for="item in unitlist"
                          :key="item.label"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </div>
                  </el-form-item>

                  <el-form-item>
                    <div class="item-quotation">
                      <label>总价(元):</label>
                      <el-input v-model="x.db_totalPrice" disabled></el-input>
                    </div>
                  </el-form-item>
                  <el-icon class="delete-item" @click="deletepart(index)">
                    <Delete />
                  </el-icon>
                </div>
              </div>
            </template>
          </slot>
          <el-form-item
            class="imgs-insure-body"
            :error="validationModal.db_description"
          >
            <div class="item-form">
              <label class="required-before">
                <template v-if="currentStatus == '03'"> 故障原因分析 </template>
                <template v-else-if="currentStatus == '04'">
                  范围及路径
                </template>
                <template v-else-if="currentStatus == '06'">
                  报价描述
                </template>
              </label>
              <el-input
                v-model="addComment.db_description"
                :autosize="{ minRows: 3, maxRows: 14 }"
                type="textarea"
              ></el-input>
            </div>
          </el-form-item>

          <el-form-item class="imgs-insure-body">
            <div class="item-form imgs-insure-body">
              <label>文件</label>
              <el-upload
                v-model:file-list="addfileslist"
                class="avatar-uploader insure-file"
                :show-file-list="true"
                :http-request="
                  (...argument) => beforeAvatarsUpload(...argument)
                "
                multiple
              >
                <el-button size="small" type="primary">
                  上传
                  <el-icon class="el-icon--right">
                    <Upload />
                  </el-icon>
                </el-button>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item
            class="imgs-insure-body"
            :error="validationModal.db_imagesUrls"
          >
            <div class="item-form imgs-insure-body">
              <label>图片</label>
              <el-upload
                v-model:file-list="addimgslist"
                class="avatar-uploader imgs-insure"
                list-type="picture-card"
                :show-file-list="true"
                multiple
                :http-request="
                  (...argument) => beforeAvatarsImgsUpload(...argument)
                "
                :on-preview="handlePictureCardPreview"
              >
                <el-icon class="avatar-uploader-icon2">+</el-icon>
              </el-upload>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div>
      <div class="dialog-footer">
        <!-- <el-button plain @click="closeDialogFn">取消</el-button> -->
        <slot name="btn" :savefn="save" :validation-data="validationData">
          <!-- <el-button type="primary" @click="save">确认</el-button> -->
        </slot>
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" />
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted, computed } from 'vue'
import { Upload, CirclePlus, Delete } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { uploadIOFilesApi, selectByAllTypeApi } from '@/api/module/commont'

export default defineComponent({
  components: { Upload, CirclePlus, Delete },
  props: {
    data: {
      type: String,
      default: ''
    },
    baseInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isrelationstate: {
      type: Boolean,
      default: true
    },
    currentstateprop: {
      type: String,
      default: ''
    }
  },
  emits: ['close-dialog', 'save-data'],
  setup(props, { emit }) {
    const closeDialogFn = () => {
      emit('close-dialog')
    }
    const addComment: any = reactive({
      db_description: '',
      db_imagesUrls: '',
      db_filesUrls: '',
      db_fileNames: ''
    })
    const validationModal = ref({
      db_imagesUrls: '',
      db_description: '',
      db_scrapValueDeal: '',
      db_manhourCost: '',
      db_preDuration: '',
      db_scrapValue: '',
      db_totalCost: ''
    })
    const partlists: any = ref([])
    const dialogImageUrl = ref('')
    const scrapValueDeals: any = ref([])
    const unitlist: any = ref([])
    const dialogVisible = ref(false)
    const currentStore = useStore()
    const $route = useRoute()
    const addimgslist: any = ref([])
    const addfileslist: any = ref([])
    const currentStatus = computed(() => {
      if (props.isrelationstate) {
        return props.baseInfo.db_state
      }
      return props.currentstateprop
    })

    const beforeAvatarsUpload = (args: any, model: any) => {
      const uid = args.file.uid
      uploadIOFilesApi({
        serverName: currentStore.state.user.type,
        tableName: $route.name,
        urlName: `insure_file`,
        multipartFiles: args.file
      }).then(x => {
        if (x.data.success) {
          const temp = addfileslist.value.find(x => x.uid == uid)
          temp.url = x.data.data
          temp.name = temp.name.replace(',', '')
        }
      })
      return true
    }
    const changeUint = (val, item) => {
      item.ui_unit = ''
      if (val) {
        const tempUnit = unitlist.value.find(x => x.value == val)
        item.ui_unit = tempUnit?.label
      }
    }
    const beforeAvatarsImgsUpload = (args: any) => {
      if (
        args.file.name.indexOf('.jpg') > -1 ||
        args.file.name.indexOf('.png') > -1 ||
        args.file.name.indexOf('.jpeg') > -1
      ) {
        const uid = args.file.uid
        uploadIOFilesApi({
          serverName: currentStore.state.user.type,
          tableName: $route.name,
          urlName: `insure_imgs`,
          multipartFiles: args.file
        }).then(x => {
          if (x.data.success) {
            const temp = addimgslist.value.find(x => x.uid == uid)
            temp.url = x.data.data
          }
        })

        return true
      }
      return false
    }
    const handlePictureCardPreview = (uploadFile: any) => {
      dialogImageUrl.value = uploadFile.url!
      dialogVisible.value = true
    }
    const addparts = () => {
      partlists.value.push({
        db_partInstanceName: '',
        db_replaceCount: '',
        db_totalPrice: '',
        db_unit: '',
        db_unitPrice: '',
        ui_unit: '',
        errordb_partInstanceName: '',
        errordb_replaceCount: '',
        errordb_totalPrice: '',
        errordb_unitPrice: '',
        errordb_unit: ''
      })
    }
    const deletepart = index => {
      partlists.value.splice(index, 1)
    }
    const changePartMoney = index => {
      partlists.value[index].db_totalPrice =
        parseFloat(partlists.value[index].db_unitPrice || 0) *
        parseFloat(partlists.value[index].db_replaceCount || 0)
      partlists.value[index].db_totalPrice =
        partlists.value[index].db_totalPrice.toFixed(2)
      sumtotalpart()
    }
    const changeMoney = val => {
      val.db_totalCost =
        parseFloat(val.db_partCost || 0) +
        parseFloat(val.db_manhourCost || 0) -
        parseFloat(val.db_scrapValue || 0)
      val.db_totalCost = val.db_totalCost.toFixed(2)
    }
    const changedealwith = (val, modal) => {
      modal.db_scrapValue = ''
      sumtotalpart()
    }
    const sumtotalpart = () => {
      addComment.db_partCost = 0.0
      partlists.value.forEach(e => {
        addComment.db_partCost =
          parseFloat(addComment.db_partCost || 0) +
          parseFloat(e.db_totalPrice || 0)
      })
      addComment.db_partCost = addComment.db_partCost.toFixed(2)
      changeMoney(addComment)
    }
    const save = () => {
      addComment.db_imagesUrls = addimgslist.value.map(x => x.url).join(',')
      addComment.db_filesUrls = addfileslist.value.map(x => x.url).join(',')
      addComment.db_fileNames = addfileslist.value.map(x => x.name).join(',')
      addComment.db_partList = JSON.stringify(
        partlists.value.map(x => {
          return {
            db_partInstanceName: x.db_partInstanceName,
            db_replaceCount: x.db_replaceCount,
            db_totalPrice: x.db_totalPrice,
            db_unit: x.db_unit,
            db_unitPrice: x.db_unitPrice,
            ui_unit: x.ui_unit
          }
        })
      )
      // emit('save-data', addComment)
      return addComment
    }
    const validationData = () => {
      let isvalid = true
      validationModal.value = {
        db_imagesUrls: '',
        db_description: '',
        db_scrapValueDeal: '',
        db_manhourCost: '',
        db_preDuration: '',
        db_scrapValue: '',
        db_totalCost: ''
      }
      if (currentStatus.value == '03') {
        if (!addComment.db_description) {
          isvalid = false
          validationModal.value.db_description = '故障原因分析不能为空'
        }
        // if (addimgslist.value.length <= 0) {
        //   isvalid = false
        //   validationModal.value.db_imagesUrls = '图片不能为空'
        // }
      } else if (currentStatus.value == '04') {
        if (!addComment.db_description) {
          isvalid = false
          validationModal.value.db_description = '范围及路径不能为空'
        }
        if (!addComment.db_preDuration) {
          isvalid = false
          validationModal.value.db_preDuration = '预计天数不能为空'
        } else {
          if (addComment.db_preDuration.toString().length > 3) {
            isvalid = false
            validationModal.value.db_preDuration = '预计天数不能超过999'
          }
        }
      } else if (currentStatus.value == '06') {
        if (!addComment.db_description) {
          isvalid = false
          validationModal.value.db_description = '报价描述不能为空'
        }
        if (addComment.db_totalCost < 0) {
          isvalid = false
          validationModal.value.db_totalCost = '合计费用不能为负'
        }

        if (!addComment.db_scrapValueDeal) {
          isvalid = false
          validationModal.value.db_scrapValueDeal = '残值处理方式不能为空'
        } else {
          if (
            addComment.db_scrapValueDeal == '01' &&
            !addComment.db_scrapValue
          ) {
            isvalid = false
            validationModal.value.db_scrapValue = '残值不能为空'
          }
          if (addComment.db_scrapValue < 0) {
            isvalid = false
            validationModal.value.db_scrapValue = '残值不能为负'
          }
        }

        if (!addComment.db_manhourCost) {
          isvalid = false
          validationModal.value.db_manhourCost = '工时费不能为空'
        }
        if (addComment.db_manhourCost < 0) {
          isvalid = false
          validationModal.value.db_manhourCost = '工时费不能为负'
        }
      }
      partlists.value.forEach((element: any) => {
        if (!element.db_partInstanceName) {
          isvalid = false
          element.errordb_partInstanceName = '配件信息不能为空'
        } else {
          element.errordb_partInstanceName = ''
        }
        if (!element.db_replaceCount) {
          isvalid = false
          element.errordb_replaceCount = '更换数量不能为空'
        } else {
          element.errordb_replaceCount = ''
        }
        if (!element.db_unit) {
          isvalid = false
          element.errordb_unit = '单位不能为空'
        } else {
          element.errordb_unit = ''
        }
        if (!element.db_unitPrice) {
          isvalid = false
          element.errordb_unitPrice = '单价不能为空'
        } else {
          element.errordb_unitPrice = ''
        }
      })
      return isvalid
    }
    onMounted(() => {
      selectByAllTypeApi({ constType: 'scrapValueDeal' }).then(x => {
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          scrapValueDeals.value.push({
            value: key,
            label: v
          })
        })
      })
      selectByAllTypeApi({ constType: 'measure_unit' }).then(x => {
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          unitlist.value.push({
            value: key,
            label: v
          })
        })
      })
      if (props.data) {
        const temp = JSON.parse(props.data)
        addComment.db_description = temp.db_description
        if (temp.db_imagesUrls) {
          addimgslist.value = temp.db_imagesUrls.split(',').map(x => {
            return {
              url: x,
              name: ''
            }
          })
        }
        if (temp.db_filesUrls) {
          const filenames = temp.db_fileNames.split(',')
          addfileslist.value = temp.db_filesUrls.split(',').map((x, index) => {
            return {
              url: x,
              name: filenames[index]
            }
          })
        }
      }
      addComment.db_partCost = props.baseInfo.db_partCost
      addComment.db_manhourCost = props.baseInfo.db_manhourCost
      addComment.db_scrapValue = props.baseInfo.db_scrapValue
      addComment.db_totalCost = props.baseInfo.db_totalCost
      addComment.db_scrapValueDeal = props.baseInfo.db_scrapValueDeal
      addComment.db_preDuration = props.baseInfo.db_preDuration
      if (props.baseInfo.db_partList) {
        partlists.value = JSON.parse(props.baseInfo.db_partList)
        partlists.value.forEach(e => {
          e.errordb_partInstanceName = ''
          e.errordb_replaceCount = ''
          e.errordb_totalPrice = ''
          e.errordb_unitPrice = ''
          e.errordb_unit = ''
        })
      } else {
        addComment.db_partList = ''
      }
    })
    return {
      closeDialogFn,
      addimgslist,
      beforeAvatarsUpload,
      beforeAvatarsImgsUpload,
      addComment,
      addfileslist,
      dialogVisible,
      dialogImageUrl,
      handlePictureCardPreview,
      save,
      addparts,
      deletepart,
      partlists,
      changePartMoney,
      validationData,
      changedealwith,
      changeMoney,
      scrapValueDeals,
      unitlist,
      changeUint,
      currentStatus,
      validationModal
    }
  }
})
</script>

<style lang="scss" scoped>
.reply-dialog {
  .commemt {
    width: 100%;
    padding: 0 50px 0 70px;

    display: flex;

    .el-form {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      > div {
        padding: 0;
        width: 100% !important;
      }
    }

    .item-form {
      display: flex;
      flex-wrap: wrap;
      width: 668px;

      label {
        width: 100%;
      }
    }

    .imgs-insure-body {
      width: 100% !important;
    }
  }

  .dialog-footer {
    position: absolute;
    bottom: 10px;
  }

  :deep().el-upload-list--picture-card {
    --el-upload-list-picture-card-size: 100px;

    .el-upload--picture-card {
      --el-upload-picture-card-size: 100px;
    }
  }

  :deep().insure-file {
    ul {
      overflow: auto;
      display: flex;
      flex-wrap: wrap;

      > li {
        max-width: 300px;
        display: inline-flex;
      }
    }
  }

  .imgs-insure {
    overflow: auto;
    max-height: 220px;
  }

  .upload-quotation {
    display: flex;
    flex-wrap: wrap;

    > div {
      margin-bottom: 10px !important;
      padding: 0 !important;
      padding-right: 25px !important;
    }

    .item-quotation {
      width: 320px;
      margin-right: 10px;

      > div {
        width: 320px !important;
      }
    }

    label {
      width: 100%;
      display: flex;
    }
  }

  .el-form {
    .upload-quotation-part {
      background-color: #f7f8fa;
      display: flex;
      border-radius: 10px;
      margin-top: 10px;
      max-height: 170px;
      overflow: auto;

      &.have-data {
        padding-top: 10px;
      }

      > div {
        width: 100% !important;
        position: relative;
        justify-content: center;
        padding: 0 !important;

        &:first-child {
          margin-top: 10px;
        }

        &::before {
          content: '' attr(indexnum) '.';
          display: inline-flex;
          align-self: flex-start;
          margin-top: 6px;
        }

        .delete-item {
          color: $p-color-error;
          align-self: flex-start;
          margin-top: 7px;
          cursor: pointer;
        }

        .el-form-item {
          width: 180px !important;
          margin-left: 10px;

          &.frist-part-name {
            width: 240px !important;

            .item-quotation {
              display: flex;
              width: 240px;

              > div {
                width: 160px !important;
              }
            }
          }

          &.unit {
            width: 150px !important;

            .item-quotation {
              display: flex;
              width: 150px;

              > div {
                width: 100px !important;
              }
            }
          }
        }

        .item-quotation {
          display: flex;
          width: 180px;

          > div {
            width: 100px !important;
          }
        }
      }

      label {
        display: flex;
        max-width: 80px;
        margin-right: 10px;
      }
    }

    .item-dialog {
      width: 500px !important;

      label {
        display: flex;
      }
    }
  }

  .add-part {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;

    > i {
      font-size: 20px;
      color: $p-color-primary;
      cursor: pointer;
      margin-left: 10px;
    }
  }
}
</style>
