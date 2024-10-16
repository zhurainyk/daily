<template>
  <div class="page-list">
    <ListComponet
      :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi"
      :select-by-id-api="selectByIdApi"
      :save-api="saveApi"
      :model-data="modelData"
      :table-map="tableMap"
      :add-model-prop="addModelProp"
      :search-where-model-prop="searchWhereModelProp"
      :show-new-porp="false"
      :delete-by-id-api="deleteByIdApi"
      :pagesizes="[100, 200, 300, 400]"
      :update-by-id-api="updateByIdApi"
      :default-page-size="100"
      :show-action-detail-porp="false"
      :show-action-edit-porp="false"
      :show-action-delete-porp="true"
      :show-h-check-box-porp="true"
      :dialogMount="dialogMount"
      :isClearCheckBox="true"
      :fullscreen="true"
      :maxwidth="true"
      :showResetSearch="true"
      :showActionPorp="true"
      exportExcelName=""
      dbkey="db_id"
      @selectFn="selectFn"
      :showTaskOrderBtns="true"
      ref="listcomponent"
    >
      <template #customize>
        <div>
          <el-button
            :disabled="item.disabled"
            v-for="(item, index) in btnList"
            @click="updateDialog(item)"
            :type="item.btnType || 'primary'"
          >
            {{ item.label }}</el-button
          >
        </div>
      </template>
      <template #actionOhther="{ scope }">
        <span class="edit" @click="editDetailFn(scope.row)"> 详情</span>
      </template>
      <template #searchHead="{ selectedList, exportExcel }">
        <div>
          <el-button type="primary" @click="exportExcel">导出</el-button>
        </div>
      </template>
    </ListComponet>
  </div>
  <el-dialog
    v-if="visiableDialog"
    v-model="visiableDialog"
    :width="'550px'"
    :fullscreen="fullscreen"
    :show-close="false"
  >
    <div class="dialog-mian max-dialog-height">
      <div class="dialog-head">
        <div>
          <label>修改</label>
        </div>
        <slot></slot>
        <span class="cancel-img" @click="closeDialog"></span>
      </div>
      <div
        class="dialog-body"
        :class="{ autoheight: fullscreen ? true : false }"
      >
        <el-form
          ref="formref"
          :model="currentModelData.dialogObj"
          :rules="setRules(currentModelData.modelData)"
          status-icon
          label-width="130px"
        >
          <div :class="{ flex: fullscreen ? true : false }">
            <div
              v-for="x in currentModelData.modelData"
              :key="x.dbkey"
              :class="[x.dbkey, { 'file-img': x.type == 'img' }]"
              class="task-dialog"
            >
              <div>
                <!-- <label class="label-task">{{x.name}}</label> -->
                <el-form-item :prop="x.dbkey" :label="x.name">
                  <template v-if="x.isSelect">
                    <template v-if="x.multiple">
                      <template v-if="x.type == 'daterange'">
                        <el-date-picker
                          v-model="x.multipledata"
                          :placeholder="x.name"
                          type="daterange"
                          :valueFormat="x.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
                          range-separator="To"
                          :popper-class="`auto-${x.dbkey}-dialog-popper`"
                          clearable
                          @change="
                            (...argument) => {
                              x.changefn
                                ? x.changefn(
                                    ...argument,
                                    currentModelData.modelData,
                                    x,
                                    currentModelData.dialogObj
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

                                    currentModelData.modelData,
                                    x,
                                    currentModelData.dialogObj
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
                                    currentModelData.modelData,
                                    x,
                                    currentModelData.dialogObj
                                  )
                                : mutilFn(
                                    ...argument,
                                    currentModelData.modelData,
                                    x,
                                    currentModelData.dialogObj
                                  )
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
                        v-model="currentModelData.dialogObj[x.dbkey]"
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
                                  currentModelData.modelData,
                                  x,
                                  currentModelData.dialogObj
                                )
                              : () => {}
                          }
                        "
                      />
                    </template>
                    <template v-else>
                      <template v-if="x.type == 'date' || x.type == 'datetime'">
                        <el-date-picker
                          v-model="currentModelData.dialogObj[x.dbkey]"
                          :type="x.type"
                          :valueFormat="x.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
                          :placeholder="x.name"
                          :popper-class="`auto-${x.dbkey}-dialog-popper`"
                          @change="
                            (...argument) => {
                              x.changefn
                                ? x.changefn(
                                    ...argument,
                                    currentModelData.modelData,
                                    x,
                                    currentModelData.dialogObj
                                  )
                                : () => {}
                            }
                          "
                        />
                      </template>
                      <template v-else>
                        <el-select
                          v-model="currentModelData.dialogObj[x.dbkey]"
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
                                    currentModelData.modelData,
                                    x,
                                    currentModelData.dialogObj
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
                  <template v-else-if="x.type == 'imgs'">
                    <el-upload
                      class="avatar-uploader imgs"
                      v-model:file-list="x.list"
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
                        <span class="file-item">
                          {{
                            currentModelData.dialogObj[`db_${x.filekey}Name`]
                          }}
                        </span>
                      </template>
                    </el-upload>
                  </template>
                  <template v-else-if="x.type == 'button'">
                    <el-button
                      :type="x.elType || 'primary'"
                      @click="
                        (...argument) => {
                          x.changefn
                            ? x.changefn(
                                ...argument,
                                currentModelData.modelData,
                                x,
                                currentModelData.dialogObj
                              )
                            : () => {}
                        }
                      "
                      >{{ x.name }}</el-button
                    >
                  </template>
                  <template v-else>
                    <template v-if="x.type == 'number'">
                      <el-input-number
                        v-model="currentModelData.dialogObj[x.dbkey]"
                        placeholder="请输入"
                        @change="
                          (...argument) => {
                            x.changefn
                              ? x.changefn(
                                  argument[0],
                                  currentModelData.modelData,
                                  x,
                                  currentModelData.dialogObj
                                )
                              : () => {}
                          }
                        "
                      />
                    </template>
                    <template v-else>
                      <el-input
                        v-model="currentModelData.dialogObj[x.dbkey]"
                        :maxlength="x.maxlength || 256"
                        placeholder="请输入"
                        clearable
                        :disabled="x.disabled"
                      />
                    </template>
                  </template>
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button plain class="cancel-btn" @click="closeDialog"
          >取消</el-button
        >
        <el-button type="primary" @click="submitForm">确认</el-button>
      </div>
    </div>
  </el-dialog>
  <el-dialog v-model="commonDialog" :width="'550px'" :show-close="false">
    <div class="dialog-mian">
      <div class="dialog-head">
        <div>
          <label>提示</label>
        </div>
        <slot></slot>
        <span class="cancel-img" @click="closeDialog"></span>
      </div>
      <div class="dialog-body del">时间修改</div>
      <div class="dialog-footer">
        <el-button plain class="cancel-btn" @click="closeDialog"
          >取消</el-button
        >
        <el-button type="primary">确认</el-button>
      </div>
    </div>
  </el-dialog>
  <el-dialog v-model="imgPreview" :width="'990px'">
    <img
      :src="dialogImageUrl"
      style="width: 100%; height: 100%"
      alt="Preview Image"
    />
  </el-dialog>
</template>

<script setup>
import { defineComponent, reactive, onMounted, ref, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import {
  selectByConditionFromJsonApi,
  selectByConditionApi as getWorkPlanByCondition
} from '@/api/module/workTemplate'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  selectByConditionApi,
  callrepairsaveTaskAndOrder,
  medicalsaveTaskAndOrder,
  cleanupkeepsaveTaskAndOrder,
  repairupkeepsaveTaskAndOrder,
  installiotsaveTaskAndOrder,
  regularsaveTaskAndOrder,
  selectCountByConditionApi,
  updateByIdApi,
  selectByIdApi,
  saveApi,
  deleteByIdApi,
  getByTaskId,
  planList,
  updateStopDurationById,
  updateOrderStateById,
  updateCallRepairClassifyCode,
  updateTimeById,
  updatePeopleById,
  importModelApi
} from '@/api/module/taskmanagement'
import { selectByIdApi as getMaintModelApi } from '@/api/module/elevator'
import ListComponet from '@/components/singlelist'
import { menulist } from '@/router/menu'
import {
  selectByAllApi,
  selectByAllTypeApi,
  uploadIOFilesApi,
  uploadIOFileApi
} from '@/api/module/commont'
import { getProjectList } from '@/api/module/customerBI'
import { getElevatorByProjectId } from '@/api/module/customerBI'
const store = useStore()
const $route = useRoute()
const taskInfo = {
  db_id: '',
  db_id_taskName: '',
  db_taskTypeCode: '',
  db_scheduleId: '',
  db_taskDetail: '',
  db_projectId: '',
  db_registCode: '',
  db_elevId: '',
  db_projectNum: '',
  db_createUserId: '',
  db_followUserId: '',
  db_executeUserId: '',
  db_createtime: '',
  db_preEndtime: '',
  db_turnToTime: '',
  db_dealStarttime: '',
  db_dealEndtime: '',
  db_superiorPassTime: '',
  db_propPassTime: '',
  db_dealEndDuration: '',
  db_hangDuration: '',
  db_taskPriorityCode: '',
  db_taskState: '',
  db_stopDuration: '',
  db_evaluation: '',
  db_evaluateTime: '',
  db_note: '',
  ui_taskType: '',
  ui_projectName: '',
  ui_scheduleName: '',
  ui_createUserName: '',
  ui_followUserName: '',
  ui_executeUserName: '',
  ui_createtime: '',
  ui_preEndtime: '',
  ui_turnToTime: '',
  ui_dealStarttime: '',
  ui_dealEndtime: '',
  ui_superiorPassTime: '',
  ui_propPassTime: '',
  ui_taskPriority: '',
  ui_taskStateDesc: '',
  ui_typeTask: '',
  ui_evaluateTime: '',
  ui_start_createtime: '',
  ui_end_createtime: '',
  ui_start_preEndtime: '',
  ui_end_preEndtime: '',
  ui_start_dealEndtime: '',
  ui_end_dealEndtime: '',
  ui_type: '',
  ui_currentPage: 0,
  ui_maxPage: 0,
  ui_pageSize: 0,
  ui_dataSize: 0,
  ui_showSave: false
}
const listcomponent = ref(null)
const modelData = reactive({
  ui_start_createtime: '',
  ui_end_createtime: '',
  ui_start_preEndtime: '',
  ui_end_preEndtime: '',
  ui_start_dealEndtime: '',
  ui_end_dealEndtime: ''
})
const fullscreen = ref(false)
const visiableDialog = ref(false)
const commonDialog = ref(false)
let currentModelData = reactive({
  modelData: [],
  dialogObj: {},
  api: null,
  type: '', //对应btnlist中的type
  params: {}
})
const imgPreview = ref(false)
const dialogImageUrl = ref('')
const handlePictureCardPreview = uploadFile => {
  dialogImageUrl.value = uploadFile.url
  imgPreview.value = true
}
const handleRemove = (files, uploadFiles) => {
  console.log({ files, uploadFiles })
}
const editDetailFn = args => {
  let url = $router.resolve({
    name: menulist.taskDetail.name,
    params: {
      id: args.db_id
    }
  }).href
  window.open(url, '_blank')
}
//installIot_type 物联网类型
const setRules = modelData => {
  const rules = {}
  modelData.forEach(x => {
    const rule = [
      {
        required: x.isreuqired,
        message: x.isSelect ? `请选择${x.name}` : `请输入${x.name}`,
        trigger: x.isSelect ? 'change' : 'blur'
      }
    ]
    rules[x.dbkey] = rule
  })
  return reactive(rules)
}
const closeDialog = () => {
  visiableDialog.value = false
  commonDialog.value = false
}
const formref = ref(null)
const submitForm = async () => {
  console.log(currentModelData.dialogObj, currentModelData.modelData)
  await formref.value.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!')
      const temp = currentModelData.modelData?.filter(x => {
        return x.type == 'imgs'
      })
      console.log({ temp })
      if (temp?.length) {
        temp.forEach(x => {
          currentModelData.dialogObj[x.dbkey] = x.list
            .reduce((pre, cur) => {
              return [...pre, cur.url]
            }, [])
            .join(',')
        })
      }

      if (currentModelData.type.startsWith('addNew')) {
        const taskInfo_ = JSON.parse(JSON.stringify(taskInfo))
        Object.keys(taskInfo_).forEach(k => {
          taskInfo_[k] = currentModelData.dialogObj[k]
        })

        let params = {}
        Object.keys(currentModelData.params).forEach(k => {
          params[k] = currentModelData.dialogObj[k]
        })
        params.taskInfo = taskInfo_
        const s = JSON.parse(JSON.stringify(params))
        // console.log({ params: JSON.parse(JSON.stringify(params)) })
        const result = await currentModelData.api(s)
        if (!result?.data?.data?.check && (result?.data?.data?.rowMessageList?.length ||  result?.data?.data?.columnMessageMap?.length)  ) {

          const tips = result.data.data.rowMessageList?.length? result.data.data.rowMessageList:result?.data?.data?.columnMessageMap
          Object.values(tips).forEach(x => {
            ElMessage.error(x)
          })
          return
        } else {
          listcomponent.value.searchInit()
        }
      } else if (currentModelData.type == 'changeTime') {
        if (
          currentModelData.dialogObj.db_createtime >
          currentModelData.dialogObj.db_dealStarttime
        ) {
          return ElMessage.warning('创建时间不能晚于开始时间')
        }
        if (
          currentModelData.dialogObj.db_createtime >
          currentModelData.dialogObj.db_dealStarttime
        ) {
          return ElMessage.warning('创建时间不能晚于开始时间')
        }
        if (
          currentModelData.dialogObj.db_dealStarttime >
          currentModelData.dialogObj.db_dealEndtime
        ) {
          currentModelData.dialogObj.db_dealEndtime >
            currentModelData.dialogObj.db_superiorPassTime
          return ElMessage.warning('完成时间不能晚于上级验收时间')
        }
        if (
          currentModelData.dialogObj.db_superiorPassTime >
          currentModelData.dialogObj.db_propPassTime
        ) {
          return ElMessage.warning('上级验收时间不能晚于物业验收时间')
        }
        if (
          currentModelData.dialogObj.db_createtime >
          currentModelData.dialogObj.db_preEndtime
        ) {
          return ElMessage.warning('创建时间不能晚于预计开始时间')
        }
        if (
          currentModelData.dialogObj.db_taskState == '10' ||
          currentModelData.dialogObj.db_taskState == '11'
        ) {
          delete currentModelData.dialogObj.db_taskState
          currentModelData.api(currentModelData.dialogObj).then(x => {
            console.log(x)
            if (!x?.data?.data?.check && x?.data?.data?.columnMessageMap) {
              const tips = x.data.data.columnMessageMap
              Object.values(tips).forEach(x => {
                ElMessage.error(x)
              })
              return
            } else {
              listcomponent.value.searchInit()
            }
          })
        } else {
          return ElMessage.warning('只能修改已完成或者已评价的任务工单')
        }
      } else if (currentModelData.type == 'import') {
        if (!filesTemp.size) {
          return ElMessage.error('文件不能为空')
        }
        currentModelData
          .api(
            { multipartFile: filesTemp },
            currentModelData.dialogObj.importModel
          )
          .then(x => {
            if (x?.data?.data?.check) {
              ElMessage.success('模板导入成功')
              visiableDialog.value = false
            } else {
              ElMessage.error(
                x?.data?.data?.rowMessageList?.toString() || '网络错误'
              )
            }
          })
        return
      } else {
        currentModelData.api(currentModelData.dialogObj).then(x => {
          console.log(x)
          if (!x?.data?.data?.check && x?.data?.data?.rowMessageList) {
            const tips = x.data.data.rowMessageList
            Object.values(tips).forEach(x => {
              ElMessage.error(x)
            })
            return
          } else {
            listcomponent.value.searchInit()
          }
        })
      }
      visiableDialog.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}
const updateDialog = async item => {
  console.log({ item })
  currentModelData.dialogObj = {}
  currentModelData.params = item.params

  currentModelData.type = item.type
  if (item.type == 'CallRepair') {
    const res = await getByTaskId({
      db_taskId: item.value.db_id,
      ui_type: 'A1'
    })
    currentModelData.dialogObj.db_taskId = item.value.db_id
    item.modelData.forEach(x => {
      currentModelData.dialogObj[x.dbkey] = res.data.data.objectList[0][x.dbkey]
      if (x.type == 'imgs') {
        //清空历史图片
        x.list = []
        if (currentModelData.dialogObj[x.dbkey]) {
          x.list = currentModelData.dialogObj[x.dbkey].split(',').map(y => {
            return {
              url: y,
              name: ''
            }
          })
        }
      }
    })
  } else if (item.type.startsWith('addNew')) {
    item.modelData.forEach(x => {
      currentModelData.dialogObj[x.dbkey] = ''
      if (x.type == 'imgs') {
        //清空历史图片
        x.list = []
      }
    })
  } else if (item.type == 'changeTime') {
    // commonDialog.value = true
    visiableDialog.value = true
    currentModelData.api = item.api
    //类型判断 需要显示的修改项
    const noChangeList = [
      'RegularUpkeep',
      'CleanUpkeep',
      'RepairUpkeep',
      'Medical',
      'InstallIot'
    ] //常规，一级，二级，体检，安装物联网时间修改
    let temp

    if (noChangeList.includes(item.value.db_taskTypeCode)) {
      temp = item.modelData
    } else {
      temp = item.modelData.filter(x => x.dbkey != 'ui_start_preEndtime')
    }
    temp.forEach(x => {
      currentModelData.dialogObj[x.dbkey] = item.value[x.dbkey]
    })
    currentModelData.dialogObj.db_id = item.value.db_id
    currentModelData.dialogObj.db_taskState = item.value.db_taskState

    currentModelData.modelData = temp
    fullscreen.value = item?.fullscreen ? item.fullscreen : false
    console.log({
      currentModelData,
      type: noChangeList.includes(item.value.db_taskTypeCode)
    })
    return
  } else if (item.type == 'changePerson') {
    // commonDialog.value = true
    visiableDialog.value = true
    currentModelData.api = item.api

    item.modelData.forEach(x => {
      if (x.multiple) {
        currentModelData.dialogObj[x.dbkey] = []
      } else {
        currentModelData.dialogObj[x.dbkey] = ''
      }
    })
    currentModelData.dialogObj.db_id = item.params.db_id

    currentModelData.modelData = item.modelData
    fullscreen.value = item?.fullscreen ? item.fullscreen : false
    console.log({
      currentModelData
    })
    return
  } else if (item.type == 'import') {
    item.modelData.forEach(x => {
      currentModelData.dialogObj[x.dbkey] = ''
    })
    console.log(item)
  } else {
    currentModelData.dialogObj.db_id = item.value.db_id
    item.modelData.forEach(x => {
      currentModelData.dialogObj[x.dbkey] = item.value[x.dbkey]
    })
  }

  currentModelData.modelData = item.modelData
  currentModelData.api = item.api
  fullscreen.value = item?.fullscreen ? item.fullscreen : false
  visiableDialog.value = true
}
const mutilFn = (args, modelData, x, dialog) => {
  // dialogModel.value[item.dbkey] = args.join(',')
  console.log({ args, modelData, x, dialog })
  dialog[x.dbkey] = args.join(',')
}
let filesTemp = ''
const beforeAvatarUploadFile = (args, model) => {
  console.log({ args, model })
  filesTemp = args.file
  currentModelData.dialogObj[`db_${model.filekey}Name`] = args.file.name
  // importModelApi({ multipartFile: args.file }).then(x => {
  //   console.log({ x })
  //   if(x.data.data.check){
  //     ElMessage.success('上传成功')
  //   }else{
  //     ElMessage.error( x.data.data.rowMessageList.toString())
  //   }
  // })
  // return
  // uploadIOFileApi({
  //   serverName: store.state.user.type,
  //   tableName: $route.name,
  //   urlName: `db_${model.filekey}Url`,
  //   multipartFile: args.file
  // }).then(x => {
  //   if (x.data.success) {
  //     currentModelData.dialogObj[model.dbkey] = x.data.data
  //     currentModelData.dialogObj[`db_${model.filekey}Name`] = args.file.name
  //   }
  // })
}
const beforeAvatarsUpload = (args, model) => {
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
const changeProject = (args, addModel, item, dialogModel) => {
  console.log({ args, addModel, item, dialogModel })
  getElevatorByProjectId({ projectid: args }).then(res => {
    if (res?.data?.data?.data?.length) {
      const temp = addModel.find(x => x.dbkey == 'db_elevId')
      temp.list = []
      res.data.data.data.forEach(x => {
        temp.list.push({ label: x.elevatorName, value: x.elevatorId })
      })
      const id = temp.list.find(x => x.value == dialogModel.db_elevId)
      if (!id) {
        dialogModel.db_elevId = ''
      }
    }
  })
}
const planChangeFn = (args, addModel, item, dialogModel) => {
  console.log({ args, addModel, item, dialogModel }) //Elevator_IotRunMonitorPlan  Elevator_IotVideoMonitorPlan Elevator_IotEmergencyPlan
  let tableName
  switch (args) {
    case 'IotRunMonitor': {
      tableName = 'Elevator_IotRunMonitorPlan'
      break
    }
    case 'IotVideoMonitor': {
      tableName = 'Elevator_IotVideoMonitorPlan'
      break
    }
    case 'IotEmergency': {
      tableName = 'Elevator_IotEmergencyPlan'
      break
    }
  }

  selectByAllApi({ tableName }).then(x => {
    const temp = addModel.find(x => x.dbkey == 'db_iotPlanId')
    temp.list = []
    Object.entries(x.data.data).forEach(([key, v]) => {
      temp.list.push({
        value: key,
        label: v
      })
    })
    const temp1 = addModel.find(x => x.dbkey == 'db_iotPlanId')
    const id = temp1.list.find(x => x.value == dialogModel.db_iotPlanId)
    if (!Object.entries(x.data.data).length || !id) {
      dialogModel.db_iotPlanId = ''
    }
  })
}
const changeImportType = (args, addModel, item, dialogModel) => {
  if (!args) {
    dialogModel.downloadmoban = ''
  } else {
    dialogModel.downloadmoban = item.list.find(x => x.value == args).url
  }
}
const changeUploadFile = (args, addModel, item, dialogModel) => {
  console.log({ args, addModel, item, dialogModel })
}
const downLoadFile = (args, addModel, item, dialogModel) => {
  if (!dialogModel.downloadmoban) return ElMessage.error('请选择导入模块')
  console.log({ args, addModel, item, dialogModel })
  const name = dialogModel.downloadmoban.slice(
    dialogModel.downloadmoban.lastIndexOf('/') + 1
  )
  const link = document.createElement('a')
  link.href = dialogModel.downloadmoban
  link.download = window.decodeURI(name)
  link.click()
  link.remove()
}
const changeMoney = val => {
  val.db_totalCost =
    parseFloat(val.db_partCost || 0) + parseFloat(val.db_manhourCost || 0)
  if (val.db_scrapValueDeal == '01') {
    val.db_totalCost -= parseFloat(val.db_scrapValue || 0)
  } else {
    val.db_scrapValue = ''
  }
  val.db_totalCost = val.db_totalCost.toFixed(2)
}
const changeInput = (args, addModel, item, dialogModel) => {
  console.log(args, addModel, item, dialogModel)
  changeMoney(dialogModel)
}
const btnList = reactive([
  {
    label: '停梯时长修改',
    disabled: true,
    type: 'db_stopDuration',
    api: updateStopDurationById,
    value: {},
    modelData: [
      {
        name: '停梯时长(秒)',
        dbkey: 'db_stopDuration',
        isSelect: false,
        isreuqired: false
      }
    ]
  },
  {
    label: '状态修改',
    disabled: true,
    type: 'db_taskState',
    api: updateOrderStateById,
    value: {},
    modelData: [
      {
        name: '任务状态',
        dbkey: 'db_taskState',
        isSelect: true,
        list: [],
        isreuqired: false
      }
    ]
  },
  {
    label: '时间修改',
    disabled: true,
    type: 'changeTime',
    api: updateTimeById,
    btnType: '',
    value: {},
    params: {
      db_createtime: '',
      db_preEndtime: '',
      db_dealStarttime: '',
      db_dealEndtime: '',
      db_superiorPassTime: '',
      db_propPassTime: '',
      db_dealEndDuration: '',
      db_stopDuration: '',
      db_id: ''
    },
    modelData: [
      {
        name: '创建时间',
        dbkey: 'db_createtime',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        type: 'datetime',
        valueFormat: 'x',
        multipledata: [],
        list: []
      },
      {
        name: '预计开始时间',
        dbkey: 'db_preEndtime',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        type: 'datetime',
        valueFormat: 'x',
        multipledata: [],
        list: []
      },
      {
        name: '开始时间',
        dbkey: 'db_dealStarttime',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        type: 'datetime',
        valueFormat: 'x',
        multipledata: [],
        list: []
      },
      {
        name: '完成时间',
        dbkey: 'db_dealEndtime',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        type: 'datetime',
        valueFormat: 'x',
        multipledata: [],
        list: []
      },
      {
        name: '上级验收时间',
        dbkey: 'db_superiorPassTime',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        type: 'datetime',
        valueFormat: 'x',
        multipledata: [],
        list: []
      },
      {
        name: '物业验收时间',
        dbkey: 'db_propPassTime',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        type: 'datetime',
        valueFormat: 'x',
        multipledata: [],
        list: []
      },
      {
        name: '完成耗时（秒）',
        dbkey: 'db_dealEndDuration',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '停梯时长（秒）',
        dbkey: 'db_stopDuration',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      }
    ]
  },
  {
    label: '人员修改',
    disabled: true,
    type: 'changePerson',
    api: updatePeopleById,
    btnType: '',
    value: {},
    params: {
      db_createUserId: '',
      db_followUserId: '',
      db_executeUserId: '',
      db_superiorPassUserId: '',
      db_propPassUserId: '',
      db_id: ''
    },
    modelData: [
      {
        name: '创建人',
        dbkey: 'db_createUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '执行人',
        dbkey: 'db_followUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '协助执行人',
        dbkey: 'db_executeUserId',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        list: []
      },
      {
        name: '上级验收人',
        dbkey: 'db_superiorPassUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '物业验收人',
        dbkey: 'db_propPassUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      }
    ]
  },
  {
    label: '回召数据修改',
    disabled: true,
    type: 'CallRepair',
    api: updateCallRepairClassifyCode,
    value: {},
    fullscreen: true,
    modelData: [
      {
        name: '是否困人',
        dbkey: 'db_isTiring',
        isSelect: true,
        list: [
          {
            label: '否',
            value: '00'
          },
          {
            label: '困人',
            value: '01'
          }
        ],
        isreuqired: true
      },
      {
        name: '故障现象',
        dbkey: 'db_faultAppearanceId',
        isSelect: false,
        list: [],
        isreuqired: false
      },
      {
        name: '召修类型',
        dbkey: 'db_callRepairTypeCode',
        isSelect: true,
        list: [],
        isreuqired: false
      },
      {
        name: '召修分类',
        dbkey: 'db_callRepairClassifyCode',
        isSelect: true,
        list: [],
        isreuqired: true
      },
      {
        name: '故障原因分析',
        dbkey: 'db_faultReasonAnalysis',
        isSelect: true,
        list: [],
        isreuqired: true
      },
      {
        name: '导致故障原因',
        dbkey: 'db_faultReason',
        isSelect: true,
        list: [],
        isreuqired: false
      },

      {
        name: '残值处理方式',
        dbkey: 'db_scrapValueDeal',
        isSelect: true,
        list: [],
        isreuqired: true,
        changefn: changeInput
      },
      {
        name: '残值(元)',
        dbkey: 'db_scrapValue',
        isSelect: false,
        list: [],
        isreuqired: false,
        type: 'number',
        changefn: changeInput
      },
      {
        name: '工时费(元)',
        dbkey: 'db_manhourCost',
        isSelect: false,
        list: [],
        isreuqired: false,
        type: 'number',
        changefn: changeInput
      },
      {
        name: '配件费(元)',
        dbkey: 'db_partCost',
        isSelect: false,
        list: [],
        isreuqired: false,
        type: 'number',
        changefn: changeInput
      },
      {
        name: '合计费用(元)',
        dbkey: 'db_totalCost',
        isSelect: false,
        list: [],
        isreuqired: false,
        disabled: true
      },
      {
        name: '报价描述',
        dbkey: 'db_costDesc',
        isSelect: false,
        list: [],
        isreuqired: false
      },
      {
        name: '维修后图片',
        dbkey: 'db_partImgUrls',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'imgs'
      }
    ]
  },
  {
    label: '常规保养',
    disabled: false,
    type: 'addNew-common',
    api: regularsaveTaskAndOrder,
    value: {},
    fullscreen: true,
    params: {
      db_projectId: '',
      db_registCode: '',
      db_elevId: '',
      db_upkeepType: '',
      db_workItemList: '',
      db_lastMaintRunTimes: '',
      db_lastMaintRunDuration: '',
      db_lastMaintDuration: '',
      db_lastMaintDoorTimes: '',
      db_lastMaintRunMileage: '',
      db_baseInfo: '',
      db_environmentState: '',
      db_sysCompPartState: '',
      db_elevState: '',
      db_issueList: '',
      db_workTemplateId: '',
      ui_projectName: '',
      ui_workTemplateName: '',
      ui_upkeepTypeDesc: '',
      db_upkeepType: '',
      db_superiorPassTime: '', //上级验收时间
      db_propPassTime: '' //物业验收时间
    },
    modelData: [
      {
        name: '任务名称',
        dbkey: 'db_id_taskName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '关联计划',
        dbkey: 'db_scheduleId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '任务详情',
        dbkey: 'db_taskDetail',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '所属项目',
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        changefn: changeProject
      },

      {
        name: '电梯',
        dbkey: 'db_elevId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        changefn: (args, addModel, item, dialogModel) => {
          console.log({ args, addModel, item, dialogModel })
          getMaintModelApi({ id: args }).then(x => {
            const t = addModel.find(x => x.name == '维保类型')
            t.db_elevType = x.data.data.db_elevType
            if (x.data.data.db_maintModelCode == '01') {
              t.list = t['01'].list
            } else {
              t.list = t['02'].list
            }
          })
        }
      },
      {
        name: '维保类型',
        dbkey: 'db_upkeepType', //routineMaint_type = 02   demandMaint_type = 01
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        db_elevType: '', //直梯0，扶梯1
        '01': {
          dbkey: 'db_upkeepType',
          list: [
            { value: '01', label: '常规保养' },
            { value: '02', label: '周期保养' },
            { value: '03', label: '阶段重点保养' },
            { value: '04', label: '全面重点保养' }
          ]
        },
        '02': {
          dbkey: 'db_upkeepType',
          list: [
            { value: '05', label: '半月保养' },
            { value: '06', label: '季度保养' },
            { value: '07', label: '半年保养' },
            { value: '08', label: '年度保养' }
          ]
        },
        changefn: (args, addModel, item, dialogModel) => {
          console.log({ args, addModel, item, dialogModel })
          const t = addModel.find(x => x.dbkey == 'db_workTemplateId')
          dialogModel.db_workTemplateId = ''
          selectByConditionFromJsonApi({}).then(x => {
            if (x.data) {
              t.list = x.data
                .map(y => {
                  return {
                    value: y.db_id,
                    label: y.db_id_templateName,
                    ...y
                  }
                })
                .filter(
                  x =>
                    x.db_upkeepType == args && x.db_elevType == item.db_elevType
                )
            }
          })
        }
      },
      {
        name: '创建人',
        dbkey: 'db_createUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '执行人',
        dbkey: 'db_followUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '协助执行人',
        dbkey: 'db_executeUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '创建时间',
        dbkey: 'db_createtime',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multipledata: [],
        list: []
      },
      {
        name: '预计开始时间',
        dbkey: 'db_preEndtime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '开始作业时间',
        dbkey: 'db_dealStarttime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '完成作业时间',
        dbkey: 'db_dealEndtime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '完成任务耗时(秒)',
        dbkey: 'db_dealEndDuration',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '上级验收时间',
        dbkey: 'db_superiorPassTime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '物业验收时间 ',
        dbkey: 'db_propPassTime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '挂起耗时(秒)',
        dbkey: 'db_hangDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '优先级',
        dbkey: 'db_taskPriorityCode',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '任务状态',
        dbkey: 'db_taskState',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '停梯时长(秒)',
        dbkey: 'db_stopDuration',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '评价json',
        maxlength: 10000,
        dbkey: 'db_evaluation',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '备注',
        dbkey: 'db_note',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '工作项清单',
        dbkey: 'db_workItemList',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '电梯基本信息',
        dbkey: 'db_baseInfo',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '环境信息',
        dbkey: 'db_environmentState',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '零部件信息',
        dbkey: 'db_sysCompPartState',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '使用状态',
        dbkey: 'db_elevState',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '问题清单',
        dbkey: 'db_issueList',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '工作模板',
        dbkey: 'db_workTemplateId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      }
    ]
  },
  {
    label: '回召',
    disabled: false,
    type: 'addNew-callrepair',
    api: callrepairsaveTaskAndOrder,
    value: {},
    fullscreen: true,
    params: {
      db_id: '',
      db_taskId: '', //公共任务id
      db_projectId: '', //所属项目id
      db_registCode: '', //电梯注册代码
      db_elevId: '', //电梯档案db_id
      db_lastMaintRunTimes: '', //距上次维保运行次数
      db_lastMaintRunDuration: '', //距上次维保运行时长
      db_lastMaintDuration: '', //距上次维保自然时长
      db_lastMaintDoorTimes: '', //距上次维保开关门次数
      db_lastMaintRunMileage: '', //距上次维保运行里程
      db_lastMaintTaskId: '', //上次维保(常规保养)任务id
      db_lastRepairRunTimes: '', //距上次召修运行次数
      db_lastRepairRunDuration: '', //距上次召修运行时长
      db_lastRepairDuration: '', //距上次召修自然时长
      db_lastRepairDoorTimes: '', //距上次召修开关门次数
      db_lastRepairRunMileage: '', //距上次召修运行里程
      db_lastRepairTaskId: '', //上次召修任务id
      db_cllaRepairsUserId: '', //报修人id
      db_faultAppearanceId: '', //故障现象id组，逗号拼接
      db_faultAppearanceUrl: '', //故障现象图片视频地址
      db_faultAppearanceName: '', //故障现象图片视频名称
      db_isTiring: '', //是否困人 00否，01困人
      db_callRepairTypeCode: '', //召修类型code
      db_callRepairType: '', //召修类型名称(原因)
      db_callRepairClassifyCode: '', //召修分类code
      db_faultCodeId: '', //故障码id
      db_faultCode: '', //故障码
      db_faultReasonAnalysis: '', //故障原因分析
      db_faultReason: '', //导致故障原因
      db_solution: '', //解决方案
      db_partList: '', //换件清单json
      db_baseInfo: '', //电梯基本信息json
      db_environmentState: '', //环境信息json
      db_sysCompPartState: '', //零部件信息json
      db_elevState: '', //使用状态等json
      db_issueList: '', //问题清单json
      db_superiorPassTime: '', //上级验收时间
      db_propPassTime: '' //物业验收时间
    },
    modelData: [
      {
        name: '任务名称',
        dbkey: 'db_id_taskName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '关联计划',
        dbkey: 'db_scheduleId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '任务详情',
        dbkey: 'db_taskDetail',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '所属项目',
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        changefn: changeProject
      },

      {
        name: '电梯',
        dbkey: 'db_elevId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '创建人',
        dbkey: 'db_createUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '执行人',
        dbkey: 'db_followUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '协助执行人',
        dbkey: 'db_executeUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '创建时间',
        dbkey: 'db_createtime',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multipledata: [],
        list: []
      },
      {
        name: '预计开始时间',
        dbkey: 'db_preEndtime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '开始作业时间',
        dbkey: 'db_dealStarttime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '完成作业时间',
        dbkey: 'db_dealEndtime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '完成任务耗时(秒)',
        dbkey: 'db_dealEndDuration',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '上级验收时间',
        dbkey: 'db_superiorPassTime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '物业验收时间 ',
        dbkey: 'db_propPassTime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '挂起耗时(秒)',
        dbkey: 'db_hangDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '优先级',
        dbkey: 'db_taskPriorityCode',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '任务状态',
        dbkey: 'db_taskState',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '停梯时长(秒)',
        dbkey: 'db_stopDuration',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '评价json',
        dbkey: 'db_evaluation',
        maxlength: 10000,
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '备注',
        dbkey: 'db_note',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距上次维保运行次数',
        dbkey: 'db_lastMaintRunTimes',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距上次维保运行时长(秒)',
        dbkey: 'db_lastMaintRunDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距上次维保自然时长(秒)',
        dbkey: 'db_lastMaintDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距上次维保开关门次数',
        dbkey: 'db_lastMaintDoorTimes',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距上次维保运行里程（米）',
        dbkey: 'db_lastMaintRunMileage',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '上次维保(常规保养)任务',
        dbkey: 'db_lastMaintTaskId',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
        // fn:CallRepairselectByConditionApi,
        // fnArgs: { tableName: 'Usercenter_Account' }
      },
      {
        name: '距上次召修运行次数',
        dbkey: 'db_lastRepairRunTimes',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距上次召修运行时长(秒)',
        dbkey: 'db_lastRepairRunDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距上次召修自然时长(秒)',
        dbkey: 'db_lastRepairDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距上次召修开关门次数',
        dbkey: 'db_lastRepairDoorTimes',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距上次召修运行里程（米）',
        dbkey: 'db_lastRepairRunMileage',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '上次召修任务id',
        dbkey: 'db_lastRepairTaskId',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '报修人',
        dbkey: 'db_cllaRepairsUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '是否困人',
        dbkey: 'db_isTiring',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [
          {
            label: '否',
            value: '00'
          },
          {
            label: '困人',
            value: '01'
          }
        ]
      },
      {
        name: '故障现象', //故障现象id组，逗号拼接
        dbkey: 'db_faultAppearanceId',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
        // fn: selectByAllTypeApi,
        // fnArgs: { constType: 'fault_appearance' },
      },

      {
        name: '召修类型',
        dbkey: 'db_callRepairTypeCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'callrepair_type' }
      },

      {
        name: '召修分类',
        dbkey: 'db_callRepairClassifyCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'callrepair_classify' }
      },
      {
        name: '故障码id',
        dbkey: 'db_faultCodeId',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '故障码',
        dbkey: 'db_faultCode',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '故障原因分析',
        dbkey: 'db_faultReasonAnalysis',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'fault_reasonAnalysis' }
      },
      {
        name: '导致故障原因',
        dbkey: 'db_faultReason',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'fault_reason' }
      },
      {
        name: '解决方案',
        dbkey: 'db_solution',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '换件清单json',
        maxlength: 10000,
        dbkey: 'db_partList',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '电梯基本信息json',
        maxlength: 10000,
        dbkey: 'db_baseInfo',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '环境信息json',
        maxlength: 10000,
        dbkey: 'db_environmentState',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '零部件信息json',
        maxlength: 10000,
        dbkey: 'db_sysCompPartState',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '使用状态json',
        maxlength: 10000,
        dbkey: 'db_elevState',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '问题清单json',
        maxlength: 10000,
        dbkey: 'db_issueList',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '故障现象图片地址',
        dbkey: 'db_faultAppearanceUrl',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'imgs'
      }
    ]
  },
  {
    label: '体检',
    disabled: false,
    type: 'addNew-medical',
    api: medicalsaveTaskAndOrder,
    value: {},
    fullscreen: true,
    params: {
      db_id_taskName: '',
      db_scheduleId: '',
      db_taskDetail: '',
      db_projectId: '',
      db_elevId: '',
      db_createUserId: '',
      db_followUserId: '',
      db_executeUserId: '',
      db_createtime: '',
      db_preEndtime: '',
      db_dealStarttime: '',
      db_dealEndtime: '',
      db_dealEndDuration: '',
      db_superiorPassTime: '',
      db_propPassTime: '',
      db_hangDuration: '',
      db_taskPriorityCode: '',
      db_taskState: '',
      db_stopDuration: '',
      db_evaluation: '',
      db_note: '',
      db_workItemList: '',
      db_baseInfo: '',
      db_environmentState: '',
      db_sysCompPartState: '',
      db_elevState: '',
      db_issueList: '',
      db_workTemplateId: ''
    },
    modelData: [
      {
        name: '任务名称',
        dbkey: 'db_id_taskName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '关联计划',
        dbkey: 'db_scheduleId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '任务详情',
        dbkey: 'db_taskDetail',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '所属项目',
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        changefn: changeProject
      },
      {
        name: '电梯',
        dbkey: 'db_elevId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '创建人',
        dbkey: 'db_createUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '执行人',
        dbkey: 'db_followUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '协助执行人',
        dbkey: 'db_executeUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '创建时间',
        dbkey: 'db_createtime',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multipledata: [],
        list: []
      },
      {
        name: '预计开始时间',
        dbkey: 'db_preEndtime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '开始作业时间',
        dbkey: 'db_dealStarttime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '完成作业时间',
        dbkey: 'db_dealEndtime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '完成任务耗时(秒)',
        dbkey: 'db_dealEndDuration',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '上级验收时间',
        dbkey: 'db_superiorPassTime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '物业验收时间 ',
        dbkey: 'db_propPassTime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '挂起耗时(秒)',
        dbkey: 'db_hangDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '优先级',
        dbkey: 'db_taskPriorityCode',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '任务状态',
        dbkey: 'db_taskState',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '停梯时长(秒)',
        dbkey: 'db_stopDuration',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '评价json',
        maxlength: 10000,
        dbkey: 'db_evaluation',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '备注',
        dbkey: 'db_note',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '工作项清单',
        dbkey: 'db_workItemList',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '电梯基本信息',
        dbkey: 'db_baseInfo',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '环境信息',
        dbkey: 'db_environmentState',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '零部件信息',
        dbkey: 'db_sysCompPartState',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '使用状态',
        dbkey: 'db_elevState',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '问题清单',
        dbkey: 'db_issueList',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '工作模板',
        dbkey: 'db_workTemplateId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      }
    ]
  },
  {
    label: '一级大保养',
    disabled: false,
    type: 'addNew-cleanupkeep',
    api: cleanupkeepsaveTaskAndOrder,
    value: {},
    fullscreen: true,
    params: {
      db_id_taskName: '',
      db_scheduleId: '',
      db_taskDetail: '',
      db_projectId: '',
      db_elevId: '',
      db_createUserId: '',
      db_followUserId: '',
      db_executeUserId: '',
      db_createtime: '',
      db_preEndtime: '',
      db_dealStarttime: '',
      db_dealEndtime: '',
      db_dealEndDuration: '',
      db_superiorPassTime: '',
      db_propPassTime: '',
      db_hangDuration: '',
      db_taskPriorityCode: '',
      db_taskState: '',
      db_stopDuration: '',
      db_evaluation: '',
      db_note: '',
      db_workItemList: '',
      db_baseInfo: '',
      db_environmentState: '',
      db_sysCompPartState: '',
      db_elevState: '',
      db_issueList: '',
      db_workTemplateId: ''
    },
    modelData: [
      {
        name: '任务名称',
        dbkey: 'db_id_taskName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '关联计划',
        dbkey: 'db_scheduleId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '任务详情',
        dbkey: 'db_taskDetail',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '所属项目',
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        changefn: changeProject
      },
      {
        name: '电梯',
        dbkey: 'db_elevId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '创建人',
        dbkey: 'db_createUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '执行人',
        dbkey: 'db_followUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '协助执行人',
        dbkey: 'db_executeUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '创建时间',
        dbkey: 'db_createtime',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multipledata: [],
        list: []
      },
      {
        name: '预计开始时间',
        dbkey: 'db_preEndtime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '开始作业时间',
        dbkey: 'db_dealStarttime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '完成作业时间',
        dbkey: 'db_dealEndtime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '完成任务耗时(秒)',
        dbkey: 'db_dealEndDuration',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '上级验收时间',
        dbkey: 'db_superiorPassTime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '物业验收时间 ',
        dbkey: 'db_propPassTime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '挂起耗时(秒)',
        dbkey: 'db_hangDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '优先级',
        dbkey: 'db_taskPriorityCode',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '任务状态',
        dbkey: 'db_taskState',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '停梯时长(秒)',
        dbkey: 'db_stopDuration',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '评价json',
        dbkey: 'db_evaluation',
        maxlength: 10000,
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '备注',
        dbkey: 'db_note',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '工作项清单',
        dbkey: 'db_workItemList',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '电梯基本信息',
        dbkey: 'db_baseInfo',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '环境信息',
        dbkey: 'db_environmentState',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '零部件信息',
        dbkey: 'db_sysCompPartState',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '使用状态',
        dbkey: 'db_elevState',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '问题清单',
        dbkey: 'db_issueList',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '工作模板',
        dbkey: 'db_workTemplateId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      }
    ]
  },
  {
    label: '二级大保养',
    disabled: false,
    type: 'addNew-repairupkeep',
    api: repairupkeepsaveTaskAndOrder,
    value: {},
    fullscreen: true,
    params: {
      db_id_taskName: '',
      db_scheduleId: '',
      db_taskDetail: '',
      db_projectId: '',
      db_elevId: '',
      db_createUserId: '',
      db_followUserId: '',
      db_executeUserId: '',
      db_createtime: '',
      db_preEndtime: '',
      db_dealStarttime: '',
      db_dealEndtime: '',
      db_dealEndDuration: '',
      db_superiorPassTime: '',
      db_propPassTime: '',
      db_hangDuration: '',
      db_taskPriorityCode: '',
      db_taskState: '',
      db_stopDuration: '',
      db_evaluation: '',
      db_note: '',
      db_workItemList: '',
      db_baseInfo: '',
      db_environmentState: '',
      db_sysCompPartState: '',
      db_elevState: '',
      db_issueList: ''
    },
    modelData: [
      {
        name: '任务名称',
        dbkey: 'db_id_taskName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '关联计划',
        dbkey: 'db_scheduleId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '任务详情',
        dbkey: 'db_taskDetail',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '所属项目',
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        changefn: changeProject
      },
      {
        name: '电梯',
        dbkey: 'db_elevId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '创建人',
        dbkey: 'db_createUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '执行人',
        dbkey: 'db_followUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '协助执行人',
        dbkey: 'db_executeUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '创建时间',
        dbkey: 'db_createtime',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multipledata: [],
        list: []
      },
      {
        name: '预计开始时间',
        dbkey: 'db_preEndtime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '开始作业时间',
        dbkey: 'db_dealStarttime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '完成作业时间',
        dbkey: 'db_dealEndtime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '完成任务耗时(秒)',
        dbkey: 'db_dealEndDuration',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '上级验收时间',
        dbkey: 'db_superiorPassTime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '物业验收时间 ',
        dbkey: 'db_propPassTime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '挂起耗时(秒)',
        dbkey: 'db_hangDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '优先级',
        dbkey: 'db_taskPriorityCode',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '任务状态',
        dbkey: 'db_taskState',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '停梯时长(秒)',
        dbkey: 'db_stopDuration',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '评价json',
        maxlength: 10000,
        dbkey: 'db_evaluation',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '备注',
        dbkey: 'db_note',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '工作项清单',
        dbkey: 'db_workItemList',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '电梯基本信息',
        dbkey: 'db_baseInfo',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '环境信息',
        dbkey: 'db_environmentState',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '零部件信息',
        dbkey: 'db_sysCompPartState',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '使用状态',
        dbkey: 'db_elevState',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '问题清单',
        dbkey: 'db_issueList',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      }
    ]
  },
  {
    label: '物联网运维',
    disabled: false,
    type: 'addNew-installiot',
    api: installiotsaveTaskAndOrder,
    value: {},
    fullscreen: true,
    params: {
      db_id_taskName: '',
      db_scheduleId: '',
      db_taskDetail: '',
      db_projectId: '',
      db_elevId: '',
      db_createUserId: '',
      db_followUserId: '',
      db_executeUserId: '',
      db_createtime: '',
      db_preEndtime: '',
      db_dealStarttime: '',
      db_dealEndtime: '',
      db_dealEndDuration: '',
      db_superiorPassTime: '',
      db_propPassTime: '',
      db_hangDuration: '',
      db_taskPriorityCode: '',
      db_taskState: '',
      db_stopDuration: '',
      db_evaluation: '',
      db_note: '',
      db_iotPlanTypeCode: '',
      db_installIotTypeCode: '',
      db_iotPlanId: '',
      db_deviceId: '',
      db_onlineState: '',
      db_firstOnlineTime: '',
      db_endImgUrl: ''
    },
    modelData: [
      {
        name: '任务名称',
        dbkey: 'db_id_taskName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '关联计划',
        dbkey: 'db_scheduleId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '任务详情',
        dbkey: 'db_taskDetail',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '所属项目',
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        changefn: changeProject
      },
      {
        name: '电梯',
        dbkey: 'db_elevId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '创建人',
        dbkey: 'db_createUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '执行人',
        dbkey: 'db_followUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '协助执行人',
        dbkey: 'db_executeUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '创建时间',
        dbkey: 'db_createtime',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multipledata: [],
        list: []
      },
      {
        name: '预计开始时间',
        dbkey: 'db_preEndtime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '开始作业时间',
        dbkey: 'db_dealStarttime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '完成作业时间',
        dbkey: 'db_dealEndtime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '完成任务耗时(秒)',
        dbkey: 'db_dealEndDuration',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '上级验收时间',
        dbkey: 'db_superiorPassTime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '物业验收时间 ',
        dbkey: 'db_propPassTime',
        isreuqired: true,
        isSelect: true,
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '挂起耗时(秒)',
        dbkey: 'db_hangDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '优先级',
        dbkey: 'db_taskPriorityCode',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '任务状态',
        dbkey: 'db_taskState',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '停梯时长(秒)',
        dbkey: 'db_stopDuration',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '备注',
        dbkey: 'db_note',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '评价json',
        maxlength: 10000,
        dbkey: 'db_evaluation',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '物联网运维类型',
        dbkey: 'db_installIotTypeCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '方案类型',
        dbkey: 'db_iotPlanTypeCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        changefn: planChangeFn
      },
      {
        name: '方案',
        dbkey: 'db_iotPlanId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '设备id',
        dbkey: 'db_deviceId',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '在线状态',
        dbkey: 'db_onlineState',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '首次在线时间',
        dbkey: 'db_firstOnlineTime',
        isreuqired: false,
        isSelect: true,
        type: 'datetime',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '完成图片地址',
        dbkey: 'db_endImgUrl',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        filekey: 'endImgUrl',
        type: 'imgs'
      }
    ]
  },
  {
    label: '导入',
    disabled: false,
    type: 'import',
    api: importModelApi,
    value: {},
    fullscreen: false,
    params: {},
    modelData: [
      {
        name: '导入模块',
        dbkey: 'importModel',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [
          {
            value: 'RegularUpkeep',
            label: '常规保养',
            url: 'https://tkwl-resource-pro.oss-cn-chengdu.aliyuncs.com/ElevatorFormwork/%E5%B8%B8%E8%A7%84%E4%BF%9D%E5%85%BB%E9%A1%B9%E7%9B%AE%E8%A1%A5%E5%BD%95%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx'
          },
          {
            value: 'CallRepair',
            label: '回召',
            url: 'https://tkwl-resource-pro.oss-cn-chengdu.aliyuncs.com/ElevatorFormwork/%E5%9B%9E%E5%8F%AC%E5%B7%A5%E5%8D%95%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx'
          }
        ],
        changefn: changeImportType
      },
      {
        name: '上传模板',
        dbkey: 'moban',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        type: 'files',
        filekey: 'moban', //文件key
        multipledata: [],
        list: [],
        changefn: changeUploadFile
      },
      {
        name: '下载模板',
        dbkey: 'downloadmoban',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        type: 'button',
        multipledata: [],
        list: [],
        changefn: downLoadFile
      }
    ]
  }
])

const selectFn = arg => {
  console.log(arg.value)
  console.log('变化')
  if (arg.value.length == 1) {
    const temp = arg.value[0]
    btnList.forEach(x => {
      if (x.type.startsWith('addNew')) return
      if (x.type == 'import') return
      x.disabled = false
      x.value = temp
      if (x.type == 'CallRepair') {
        x.disabled = true
        if (temp.db_taskTypeCode == 'CallRepair') {
          x.disabled = false
        }
      } else if (x.type == 'changeTime') {
        x.disabled = false
      } else if (x.type == 'changePerson') {
        x.disabled = false
        x.params.db_id = temp.db_id
      }
    })
  } else {
    btnList.forEach(x => {
      if (x.type.startsWith('addNew')) return
      if (x.type == 'import') return
      x.disabled = true
    })
    if (!arg.value.length) {
      btnList.forEach(x => {
        if (x.type == 'changeTime') {
          x.disabled = true
        }
      })
    }
    if (arg.value.length) {
      btnList.forEach(x => {
        if (x.type == 'changePerson') {
          //多选 id逗号隔开
          x.disabled = false
          x.params.db_id = arg.value
            .reduce((pre, cur) => [...pre, cur.db_id], [])
            .toString()
        }
      })
    }
  }
}

const event_priority = ref({})
const tableMap = [
  {
    dbkey: 'db_id',
    name: '任务id'
  },
  {
    dbkey: 'db_id_taskName',
    name: '任务名称'
  },
  {
    dbkey: 'ui_projectName',
    name: '项目名称'
  },
  {
    dbkey: 'ui_taskType',
    name: '任务类型'
  },
  // {
  //   dbkey: 'ui_scheduleName',
  //   name: '关联计划'
  // },
  {
    dbkey: 'ui_taskStateDesc',
    name: '任务状态'
  },

  {
    dbkey: 'ui_createUserName',
    name: '创建人'
  },
  {
    dbkey: 'ui_createtime',
    name: '创建时间'
  },
  {
    dbkey: 'ui_followUserName',
    name: '执行人'
  },
  {
    dbkey: 'ui_executeUserName',
    name: '协助执行人'
  },

  {
    dbkey: 'ui_dealStarttime',
    name: '开始作业时间'
  },

  {
    dbkey: 'ui_dealEndtime',
    name: '完成作业时间'
  },
  {
    dbkey: 'ui_propPassTime',
    name: '物业验收时间'
  }
]

const changeProject2 = (args, addModel, item, dialogModel) => {
  getElevatorByProjectId({ projectid: args }).then(res => {
    if (res?.data?.data?.data?.length) {
      const temp = searchWhereModelProp.find(x => x.dbkey == 'db_elevId')
      temp.list = []
      res.data.data.data.forEach(x => {
        temp.list.push({ label: x.elevatorName, value: x.elevatorId })
      })
      const id = temp.list.find(x => x.value == dialogModel.db_elevId)
      if (!id) {
        dialogModel.db_elevId = ''
      }
    }
  })
}
const addModelProp = reactive([
  {
    name: 'id',
    dbkey: 'db_id',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    disabled: true,
    multipledata: [],
    list: []
  },
  // {
  //     name: '型号',
  //     dbkey: 'db_modelId',
  //     isreuqired: true,
  //     isSelect: true,
  //     multiple: false,
  //     multipledata: [],
  //     list: [],
  //     fn: selectByAllApi,
  //     fnArgs: { tableName: 'Elevator_Model' }
  // },
  {
    name: '任务名称',
    dbkey: 'db_id_taskName',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '任务类型',
    dbkey: 'db_taskTypeCode',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '关联计划',
    dbkey: 'db_scheduleId',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '任务详情',
    dbkey: 'db_taskDetail',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '所属项目',
    dbkey: 'db_projectId',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: [],
    changefn: changeProject
  },

  {
    name: '电梯',
    dbkey: 'db_elevId',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '创建人',
    dbkey: 'db_createUserId',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '执行人',
    dbkey: 'db_followUserId',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '协助执行人',
    dbkey: 'db_executeUserId',
    isreuqired: false,
    isSelect: true,
    multiple: true,
    multipledata: [],
    list: []
  },
  {
    name: '创建时间',
    dbkey: 'db_createtime',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    type: 'datetime',
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    multipledata: [],
    list: []
  },
  {
    name: '预计开始时间',
    dbkey: 'db_preEndtime',
    isreuqired: true,
    isSelect: true,
    type: 'datetime',
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    multiple: false,
    multipledata: [],
    list: []
  },

  {
    name: '开始作业时间',
    dbkey: 'db_dealStarttime',
    isreuqired: false,
    isSelect: true,
    type: 'datetime',
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '完成作业时间',
    dbkey: 'db_dealEndtime',
    isreuqired: false,
    isSelect: true,
    type: 'datetime',
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '完成任务耗时(秒)',
    dbkey: 'db_dealEndDuration',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '挂起耗时(秒)',
    dbkey: 'db_hangDuration',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '优先级',
    dbkey: 'db_taskPriorityCode',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '任务状态',
    dbkey: 'db_taskState',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: []
  },

  {
    name: '停梯时长(秒)',
    dbkey: 'db_stopDuration',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '评价json',
    maxlength: 10000,
    dbkey: 'db_evaluation',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '备注',
    dbkey: 'db_note',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  }
])
const searchWhereModelProp = reactive([
  {
    name: '任务id',
    dbkey: 'db_id',
    isreuqired: true,
    isSelect: false,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },
  {
    name: '任务名称',
    dbkey: 'db_id_taskName',
    isreuqired: true,
    isSelect: false,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },
  {
    name: '任务类型',
    dbkey: 'db_taskTypeCode',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },

  {
    name: '任务状态',
    dbkey: 'db_taskState',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },
  {
    name: '关联计划',
    dbkey: 'db_scheduleId',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },
  {
    name: '项目名称',
    dbkey: 'db_projectId',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: [],
    changefn: changeProject2
  },

  {
    name: '电梯',
    dbkey: 'db_elevId',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },
  {
    name: '电梯注册码',
    dbkey: 'db_registCode',
    isreuqired: true,
    isSelect: false,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },
  {
    name: '创建人',
    dbkey: 'db_createUserId',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },
  {
    name: '执行人',
    dbkey: 'db_followUserId',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },

  {
    name: '创建时间',
    dbkey: 'ui_start_createtime',
    isreuqired: true,
    isSelect: true,
    multiple: true,
    type: 'datetimerange',
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    format: 'YYYY-MM-DD HH:mm:ss',
    multipledata: [modelData.ui_start_createtime, modelData.ui_end_createtime],
    isRules: true,
    list: [],
    changefn: (args, addModel, item, dialogModel) => {
      if (args?.length && args?.length == 2) {
        dialogModel.ui_start_createtime = args[0]
        dialogModel.ui_end_createtime = args[1]
      } else {
        dialogModel.ui_start_createtime = ''
        dialogModel.ui_end_createtime = ''
      }
    }
  },

  {
    name: '预计开始时间',
    dbkey: 'ui_start_preEndtime',
    isreuqired: true,
    isSelect: true,
    multiple: true,
    type: 'datetimerange',
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    multipledata: [modelData.ui_start_preEndtime, modelData.ui_end_preEndtime],
    isRules: true,
    list: [],
    changefn: (args, addModel, item, dialogModel) => {
      if (args?.length && args?.length == 2) {
        dialogModel.ui_start_preEndtime = args[0]
        dialogModel.ui_end_preEndtime = args[1]
      } else {
        dialogModel.ui_start_preEndtime = ''
        dialogModel.ui_end_preEndtime = ''
      }
    }
  },
  {
    name: '完成时间',
    dbkey: 'ui_start_dealEndtime',
    isreuqired: true,
    isSelect: true,
    multiple: true,
    type: 'datetimerange',
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    multipledata: [
      modelData.ui_start_dealEndtime,
      modelData.ui_end_dealEndtime
    ],
    isRules: true,
    list: [],
    changefn: (args, addModel, item, dialogModel) => {
      if (args?.length && args?.length == 2) {
        dialogModel.ui_start_dealEndtime = args[0]
        dialogModel.ui_end_dealEndtime = args[1]
      } else {
        dialogModel.ui_start_dealEndtime = ''
        dialogModel.ui_end_dealEndtime = ''
      }
    }
  },
  {
    name: '物业验收时间',
    dbkey: 'ui_propPassTime',
    isreuqired: true,
    isSelect: true,
    multiple: true,
    type: 'datetimerange',
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    multipledata: [
      modelData.ui_start_propPassTime,
      modelData.ui_end_propPassTime
    ],
    isRules: true,
    list: [],
    changefn: (args, addModel, item, dialogModel) => {
      if (args?.length && args?.length == 2) {
        dialogModel.ui_start_propPassTime = args[0]
        dialogModel.ui_end_propPassTime = args[1]
      } else {
        dialogModel.ui_start_propPassTime = ''
        dialogModel.ui_end_propPassTime = ''
      }
    }
  }
  //
])
const $router = useRouter()
const detailLog = data => {
  $router.push({
    name: menulist.LogManagement.name,
    params: {
      id: data.elevatorId
    }
  })
}
onMounted(() => {
  const addnewCommon = btnList.find(x => x.type == 'addNew-common')
  const addnewCallrepair = btnList.find(x => x.type == 'addNew-callrepair')
  const addNewMedical = btnList.find(x => x.type == 'addNew-medical')
  const addNewCleanupkeep = btnList.find(x => x.type == 'addNew-cleanupkeep')
  const addNewRepairupkeep = btnList.find(x => x.type == 'addNew-repairupkeep')
  const addNewInstalliot = btnList.find(x => x.type == 'addNew-installiot')
  selectByAllApi({ tableName: 'Elevator_Project' }).then(x => {
    const temp = searchWhereModelProp.find(x => x.dbkey == 'db_projectId')
    const temp1 = addModelProp.find(x => x.dbkey == 'db_projectId')
    Object.entries(x.data.data).forEach(([key, v]) => {
      temp.list.push({
        value: key,
        label: v
      })
      temp1.list.push({
        value: key,
        label: v
      })
    })
    addnewCommon.modelData.find(x => x.dbkey == 'db_projectId').list =
      temp1.list
    addnewCallrepair.modelData.find(x => x.dbkey == 'db_projectId').list =
      temp1.list
    addNewMedical.modelData.find(x => x.dbkey == 'db_projectId').list =
      temp1.list
    addNewCleanupkeep.modelData.find(x => x.dbkey == 'db_projectId').list =
      temp1.list
    addNewRepairupkeep.modelData.find(x => x.dbkey == 'db_projectId').list =
      temp1.list
    addNewInstalliot.modelData.find(x => x.dbkey == 'db_projectId').list =
      temp1.list
  })
  selectByAllTypeApi({ constType: 'online_state' }).then(res => {
    console.log(res.data.data)
    const temp = addNewInstalliot.modelData.find(
      x => x.dbkey == 'db_onlineState'
    )
    Object.entries(res.data.data).forEach(([key, v]) => {
      temp.list.push({
        value: key,
        label: v
      })
    })
  })
  selectByAllTypeApi({ constType: 'iotInstall_type' }).then(x => {
    const temp = []
    Object.entries(x.data.data).forEach(([key, v]) => {
      temp.push({
        value: key,
        label: v
      })
    })
    addNewInstalliot.modelData.find(x => x.dbkey == 'db_iotPlanTypeCode').list =
      temp
  })
  selectByAllTypeApi({ constType: 'installIot_type' }).then(x => {
    const temp = []
    Object.entries(x.data.data).forEach(([key, v]) => {
      temp.push({
        value: key,
        label: v
      })
    })
    addNewInstalliot.modelData.find(
      x => x.dbkey == 'db_installIotTypeCode'
    ).list = temp
  })
  getWorkPlanByCondition({
    db_templateTypeCode: 'Medical',
    ui_type: 'A0'
  }).then(x => {
    const temp = []
    console.log(x)
    x.data.data.objectList.forEach(x => {
      temp.push({
        value: x.db_id,
        label: x.db_id_templateName
      })
    })
    addNewMedical.modelData.find(x => x.dbkey == 'db_workTemplateId').list =
      temp
  })
  getWorkPlanByCondition({
    db_templateTypeCode: 'CleanUpkeep',
    ui_type: 'A0'
  }).then(x => {
    const temp = []
    console.log(x)
    x.data.data.objectList.forEach(x => {
      temp.push({
        value: x.db_id,
        label: x.db_id_templateName
      })
    })
    addNewCleanupkeep.modelData.find(x => x.dbkey == 'db_workTemplateId').list =
      temp
  })

  planList().then(x => {
    const temp1 = searchWhereModelProp.find(x => x.dbkey == 'db_scheduleId')
    temp1.list = []
    x.data.data.objectList.forEach(y => {
      temp1.list.push({
        label: y.db_id_scheName,
        value: y.db_id
      })
    })
    addnewCommon.modelData.find(x => x.dbkey == 'db_scheduleId').list =
      temp1.list
    addnewCallrepair.modelData.find(x => x.dbkey == 'db_scheduleId').list =
      temp1.list
    addNewMedical.modelData.find(x => x.dbkey == 'db_scheduleId').list =
      temp1.list
    addNewCleanupkeep.modelData.find(x => x.dbkey == 'db_scheduleId').list =
      temp1.list
    addNewRepairupkeep.modelData.find(x => x.dbkey == 'db_scheduleId').list =
      temp1.list
    addNewInstalliot.modelData.find(x => x.dbkey == 'db_scheduleId').list =
      temp1.list
  })
  selectByAllTypeApi({ constType: 'taskOrder_type' }).then(x => {
    const temp = addModelProp.find(x => x.dbkey == 'db_taskTypeCode')
    const temp1 = searchWhereModelProp.find(x => x.dbkey == 'db_taskTypeCode')
    Object.entries(x.data.data).forEach(([key, v]) => {
      temp.list.push({
        value: key,
        label: v
      })
      temp1.list.push({
        value: key,
        label: v
      })
    })
    if (addnewCommon.modelData.find(x => x.dbkey == 'db_taskTypeCode')?.list) {
      addnewCommon.modelData.find(x => x.dbkey == 'db_taskTypeCode').list =
        temp1.list
    }
    if (
      addnewCallrepair.modelData.find(x => x.dbkey == 'db_taskTypeCode')?.list
    ) {
      addnewCallrepair.modelData.find(x => x.dbkey == 'db_taskTypeCode').list =
        temp1.list
    }
  })
  selectByAllTypeApi({ constType: 'task_priority' }).then(x => {
    const temp = addModelProp.find(x => x.dbkey == 'db_taskPriorityCode')
    Object.entries(x.data.data).forEach(([key, v]) => {
      temp.list.push({
        value: key,
        label: v
      })
    })
    addnewCommon.modelData.find(x => x.dbkey == 'db_taskPriorityCode').list =
      temp.list
    addnewCallrepair.modelData.find(
      x => x.dbkey == 'db_taskPriorityCode'
    ).list = temp.list
    addNewMedical.modelData.find(x => x.dbkey == 'db_taskPriorityCode').list =
      temp.list
    addNewCleanupkeep.modelData.find(
      x => x.dbkey == 'db_taskPriorityCode'
    ).list = temp.list
    addNewRepairupkeep.modelData.find(
      x => x.dbkey == 'db_taskPriorityCode'
    ).list = temp.list
    addNewInstalliot.modelData.find(
      x => x.dbkey == 'db_taskPriorityCode'
    ).list = temp.list
  })
  selectByAllTypeApi({ constType: 'taskOrder_state' }).then(x => {
    const temp = addModelProp.find(x => x.dbkey == 'db_taskState')
    const temp1 = searchWhereModelProp.find(x => x.dbkey == 'db_taskState')
    Object.entries(x.data.data).forEach(([key, v]) => {
      temp.list.push({
        value: key,
        label: v
      })
      temp1.list.push({
        value: key,
        label: v
      })
    })
    const x1 = btnList.find(x => x.type == 'db_taskState')

    x1.modelData.find(x => x.dbkey == 'db_taskState').list = temp1.list.filter(
      x => x.value != '05' && x.value != '08'
    )
    addnewCommon.modelData.find(x => x.dbkey == 'db_taskState').list =
      temp1.list
    addnewCallrepair.modelData.find(x => x.dbkey == 'db_taskState').list =
      temp1.list
    addNewMedical.modelData.find(x => x.dbkey == 'db_taskState').list =
      temp1.list
    addNewCleanupkeep.modelData.find(x => x.dbkey == 'db_taskState').list =
      temp1.list
    addNewRepairupkeep.modelData.find(x => x.dbkey == 'db_taskState').list =
      temp1.list
    addNewInstalliot.modelData.find(x => x.dbkey == 'db_taskState').list =
      temp1.list
  })
  selectByAllTypeApi({ constType: 'callrepair_type' }).then(x => {
    const temp2 = btnList.find(x => x.type == 'CallRepair')
    const temp = temp2.modelData.find(x => x.dbkey == 'db_callRepairTypeCode')
    Object.entries(x.data.data).forEach(([key, v]) => {
      temp.list.push({
        value: key,
        label: v
      })
    })
    addnewCallrepair.modelData.find(
      x => x.dbkey == 'db_callRepairTypeCode'
    ).list = temp.list
  })
  selectByAllTypeApi({ constType: 'callrepair_classify' }).then(x => {
    const temp2 = btnList.find(x => x.type == 'CallRepair')
    const temp = temp2.modelData.find(
      x => x.dbkey == 'db_callRepairClassifyCode'
    )
    Object.entries(x.data.data).forEach(([key, v]) => {
      temp.list.push({
        value: key,
        label: v
      })
    })
    addnewCallrepair.modelData.find(
      x => x.dbkey == 'db_callRepairClassifyCode'
    ).list = temp.list
  })
  selectByAllTypeApi({ constType: 'fault_reasonAnalysis' }).then(x => {
    const temp2 = btnList.find(x => x.type == 'CallRepair')
    const temp = temp2.modelData.find(x => x.dbkey == 'db_faultReasonAnalysis')
    Object.entries(x.data.data).forEach(([key, v]) => {
      temp.list.push({
        value: key,
        label: v
      })
    })
    addnewCallrepair.modelData.find(
      x => x.dbkey == 'db_faultReasonAnalysis'
    ).list = temp.list
  })
  selectByAllTypeApi({ constType: 'fault_reason' }).then(x => {
    const temp2 = btnList.find(x => x.type == 'CallRepair')
    const temp = temp2.modelData.find(x => x.dbkey == 'db_faultReason')
    Object.entries(x.data.data).forEach(([key, v]) => {
      temp.list.push({
        value: key,
        label: v
      })
    })
    addnewCallrepair.modelData.find(x => x.dbkey == 'db_faultReason').list =
      temp.list
  })

  selectByAllTypeApi({ constType: 'scrapValueDeal' }).then(x => {
    const temp2 = btnList.find(x => x.type == 'CallRepair')
    const temp = temp2.modelData.find(x => x.dbkey == 'db_scrapValueDeal')
    Object.entries(x.data.data).forEach(([key, v]) => {
      temp.list.push({
        value: key,
        label: v
      })
    })
  })

  selectByAllApi({ tableName: 'Usercenter_Account' }).then(x => {
    {
      const temp = addModelProp.find(x => x.dbkey == 'db_executeUserId')
      Object.entries(x.data.data).forEach(([key, v]) => {
        temp.list.push({
          value: key,
          label: v
        })
      })
      addnewCommon.modelData.find(x => x.dbkey == 'db_createUserId').list =
        temp.list
      addnewCommon.modelData.find(x => x.dbkey == 'db_followUserId').list =
        temp.list
      addnewCommon.modelData.find(x => x.dbkey == 'db_executeUserId').list =
        temp.list

      addNewMedical.modelData.find(x => x.dbkey == 'db_createUserId').list =
        temp.list
      addNewMedical.modelData.find(x => x.dbkey == 'db_followUserId').list =
        temp.list
      addNewMedical.modelData.find(x => x.dbkey == 'db_executeUserId').list =
        temp.list

      addNewCleanupkeep.modelData.find(x => x.dbkey == 'db_createUserId').list =
        temp.list
      addNewCleanupkeep.modelData.find(x => x.dbkey == 'db_followUserId').list =
        temp.list
      addNewCleanupkeep.modelData.find(
        x => x.dbkey == 'db_executeUserId'
      ).list = temp.list

      addNewRepairupkeep.modelData.find(
        x => x.dbkey == 'db_createUserId'
      ).list = temp.list
      addNewRepairupkeep.modelData.find(
        x => x.dbkey == 'db_followUserId'
      ).list = temp.list
      addNewRepairupkeep.modelData.find(
        x => x.dbkey == 'db_executeUserId'
      ).list = temp.list

      addNewInstalliot.modelData.find(x => x.dbkey == 'db_createUserId').list =
        temp.list
      addNewInstalliot.modelData.find(x => x.dbkey == 'db_followUserId').list =
        temp.list
      addNewInstalliot.modelData.find(x => x.dbkey == 'db_executeUserId').list =
        temp.list

      addnewCallrepair.modelData.find(x => x.dbkey == 'db_createUserId').list =
        temp.list
      addnewCallrepair.modelData.find(x => x.dbkey == 'db_followUserId').list =
        temp.list
      addnewCallrepair.modelData.find(x => x.dbkey == 'db_executeUserId').list =
        temp.list
      addnewCallrepair.modelData.find(
        x => x.dbkey == 'db_cllaRepairsUserId'
      ).list = temp.list
      btnList
        .find(x => x.type == 'changePerson')
        .modelData.forEach(x => {
          x.list = temp.list
        })
    }
    {
      const temp = addModelProp.find(x => x.dbkey == 'db_followUserId')
      Object.entries(x.data.data).forEach(([key, v]) => {
        temp.list.push({
          value: key,
          label: v
        })
      })
    }
    {
      const temp = addModelProp.find(x => x.dbkey == 'db_createUserId')
      Object.entries(x.data.data).forEach(([key, v]) => {
        temp.list.push({
          value: key,
          label: v
        })
      })
      const temp1 = searchWhereModelProp.find(x => x.dbkey == 'db_createUserId')
      Object.entries(x.data.data).forEach(([key, v]) => {
        temp1.list.push({
          value: key,
          label: v
        })
      })
      const temp2 = searchWhereModelProp.find(x => x.dbkey == 'db_followUserId')
      Object.entries(x.data.data).forEach(([key, v]) => {
        temp2.list.push({
          value: key,
          label: v
        })
      })
    }
  })
})

const sendEvent = args => {
  if (args.length <= 0) return
  ElMessageBox.prompt('输入事件码', '', {
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  }).then(({ value }) => {
    if (value) {
      resetByIdsApi({
        eventType: '05',
        eventData: args.map(x => {
          return {
            elevId: x.elevatorId,
            eventCode: value
          }
        })
      }).then(x => {
        if (x.data.success) {
          ElMessage.success('成功')
        } else {
          ElMessage.error('失败')
        }
      })
    }
  })
}

const dialogMount = (args, item) => {
  const temp = item.find(x => x.dbkey == 'db_executeUserId')
  temp.multipledata = args.db_executeUserId
    ? args.db_executeUserId.split(',')
    : []
  getElevatorByProjectId({ projectid: args.db_projectId }).then(res => {
    if (res?.data?.data?.data?.length) {
      const temp = item.find(x => x.dbkey == 'db_elevId')
      temp.list = []
      res.data.data.data.forEach(x => {
        temp.list.push({ label: x.elevatorName, value: x.elevatorId })
      })
    }
  })
  const temp1 = item.find(x => x.dbkey == 'db_scheduleId')
  temp1.list = []
  planList().then(x => {
    x.data.data.objectList.forEach(y => {
      temp1.list.push({
        label: y.db_id_scheName,
        value: y.db_id
      })
    })
  })
  //
}
</script>

<style lang="scss" scoped>
.page-list {
  background-color: white;

  :deep() .page-search {
    min-height: 190px;
  }

  :deep() .page-body {
    height: calc(100% - 300px);
  }
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

.dialog-body {
  label {
    white-space: nowrap;
  }

  :deep() .el-form-item__label {
    white-space: nowrap;
  }

  .flex {
    display: flex;
    flex-wrap: wrap;

    .task-dialog {
      width: 25%;
      box-sizing: border-box;
    }
  }
}

.dialog-body.del {
  display: inline-block;
  font-size: 18px;
  text-align: center;
  line-height: 60px;
}

.autoheight {
  height: auto;
}
</style>
