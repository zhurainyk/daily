import { uniq } from 'lodash'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { getProjectMapLoginApi, getUserMapLoginApi } from '@/api/module/login'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'
import { selectByConditionApi as selectElevatorByConditionApi } from '@/api/module/elevator'
import { selectByConditionApi as selectScheduleByConditionApi } from '@/api/module/schedule'
import { getwebEnginUserByProjectIdApi } from '@/api/module/projectManage'
import { selectByConditionApi as selectByConditionDynamicWorkItApi } from '@/api/module/dynamicWorkIt'
import { Elevator_DynamicWorkItem } from '@/module.ts/Elevator_DynamicWorkItem'
import {
  selectByConditionApi as selectWorkTemplateByConditionApi,
  selectByConditionFromJsonApi
} from '@/api/module/workTemplate'
import { getIsBindHelmetApi } from '@/api/module/helmet'

const demandMaint: Array<any> = []
const roytineMaint: Array<any> = []
let worktemplate: Array<any> = []

const changeProject = (args, addModel, item, dialogModel) => {
  dialogModel.db_elevId = ''
  dialogModel.taskInfo.db_followUserId = ''
  dialogModel.db_upkeepType = ''
  dialogModel.db_workTemplateId = ''
  const tempElevatorList = addModel.find((x: any) => x.dbkey == 'db_elevId')
  if (tempElevatorList) {
    tempElevatorList.multipledata = []
    tempElevatorList.list = []
  }
  const tempdb_followUserId = addModel.find(
    (x: any) => x.dbkey == 'db_followUserId'
  )
  if (tempdb_followUserId) {
    tempdb_followUserId.list = []
  }

  const tempdb_workTemplateId = addModel.find(
    (x: any) => x.dbkey == 'db_workTemplateId'
  )
  if (tempdb_workTemplateId) {
    tempdb_workTemplateId.list = []
  }

  const tempWork = addModel.find((x: any) => x.dbkey == 'db_workTemplateId')
  let disableElevtors = false
  if (tempWork && tempWork.fnArgs.db_templateTypeCode == 'RegularUpkeep') {
    disableElevtors = true
  }
  const tempVido = addModel.find((x: any) => x.dbkey == 'db_isVideo')
  if (tempVido) {
    dialogModel.taskInfo.db_isVideo = '00'
    tempVido.isNotshowKey = true
  }
  const tempdynamicWorkItem = addModel.find(
    (x: any) => x.dbkey == 'db_dynamicWorkItem'
  )
  if (tempdynamicWorkItem) {
    tempdynamicWorkItem.isNotshowKey = true
    tempdynamicWorkItem.multipledata = []
    dialogModel.taskInfo.db_dynamicWorkItem = ''
    tempdynamicWorkItem.list = []
  }
  if (args) {
    dialogMount(args, addModel, (list: Array<any>) => {
      list.forEach(element => {
        // 只有在常规保养的时候才会有逻辑
        element.disabled = disableElevtors
          ? dialogModel.db_maintModelCode
            ? !(dialogModel.db_maintModelCode == element.db_maintModelCode)
            : true
          : false
      })
    })
  }
}
const changeSclue = (args, addModel, item, dialogModel) => {
  dialogModel.taskInfo.db_projectId = ''
  const tempSclue = item.list.find(x => x.db_id == args)
  if (tempSclue) {
    dialogModel.taskInfo.db_projectId = tempSclue.db_projectId
    changeProject(tempSclue.db_projectId, addModel, item, dialogModel)
  } else {
    changeProject('', addModel, item, dialogModel)
  }
}

const changeInstallIotType = (args, addModel, item, dialogModel) => {
  const tempItem_db_iotPlanId = addModel.find(
    (x: any) => x.dbkey == 'db_iotPlanId'
  )

  if (
    dialogModel.db_installIotTypeCode == '02' ||
    dialogModel.db_installIotTypeCode == '04'
  ) {
    if (dialogModel.db_elevId) {
      const db_elevIds = dialogModel.db_elevId.split(',')
      const tempElevatorList = addModel.find((x: any) => x.dbkey == 'db_elevId')
      const tempElevator = tempElevatorList.list.filter(
        x => db_elevIds.findIndex(y => y == x.value) > -1
      )
      if (dialogModel.db_iotPlanTypeCode) {
        if (dialogModel.db_iotPlanTypeCode == 'IotEmergency') {
          const temppandids = tempElevator
            .map(x => x.db_emergencyPlanId)
            .filter(x => x)
          const tempid = uniq(temppandids)
          if (
            temppandids.length == tempElevator.length &&
            tempid.length == 1 &&
            tempElevator.length > 0
          ) {
            dialogModel.db_iotPlanId = tempElevator[0].db_emergencyPlanId
          } else {
            dialogModel.db_iotPlanId = ''
          }
        } else if (dialogModel.db_iotPlanTypeCode == 'IotRunMonitor') {
          const temppandids = tempElevator
            .map(x => x.db_runMonitorPlanId)
            .filter(x => x)
          const tempid = uniq(temppandids)
          if (
            temppandids.length == tempElevator.length &&
            tempid.length == 1 &&
            tempElevator.length > 0
          ) {
            dialogModel.db_iotPlanId = tempElevator[0].db_runMonitorPlanId
          } else {
            dialogModel.db_iotPlanId = ''
          }
        } else if (dialogModel.db_iotPlanTypeCode == 'IotVideoMonitor') {
          const temppandids = tempElevator
            .map(x => x.db_videoMonitorPlanId)
            .filter(x => x)
          const tempid = uniq(temppandids)
          if (
            temppandids.length == tempElevator.length &&
            tempid.length == 1 &&
            tempElevator.length > 0
          ) {
            dialogModel.db_iotPlanId = tempElevator[0].db_videoMonitorPlanId
          } else {
            dialogModel.db_iotPlanId = ''
          }
        }
      }
    }
    tempItem_db_iotPlanId.disabled = true
  } else {
    tempItem_db_iotPlanId.disabled = false
  }
}
const changeElevartor = (args, addModel, item, dialogModel, errMode) => {
  if (!args) {
    if (dialogModel.db_iotPlanTypeCode) dialogModel.db_iotPlanId = ''
    return
  }
  dialogModel.db_elevId = args.join(',')
  const tempElevator = item.list.filter(
    x => args.findIndex(y => y == x.value) > -1
  )
  if (dialogModel.db_iotPlanTypeCode) {
    if (dialogModel.db_iotPlanTypeCode == 'IotEmergency') {
      const temppandids = tempElevator
        .map(x => x.db_emergencyPlanId)
        .filter(x => x)
      const tempid = uniq(temppandids)
      if (
        temppandids.length == tempElevator.length &&
        tempid.length == 1 &&
        tempElevator.length > 0
      ) {
        dialogModel.db_iotPlanId = tempElevator[0].db_emergencyPlanId
      } else {
        dialogModel.db_iotPlanId = ''
      }
    } else if (dialogModel.db_iotPlanTypeCode == 'IotRunMonitor') {
      const temppandids = tempElevator
        .map(x => x.db_runMonitorPlanId)
        .filter(x => x)
      const tempid = uniq(temppandids)
      if (
        temppandids.length == tempElevator.length &&
        tempid.length == 1 &&
        tempElevator.length > 0
      ) {
        dialogModel.db_iotPlanId = tempElevator[0].db_runMonitorPlanId
      } else {
        dialogModel.db_iotPlanId = ''
      }
    } else if (dialogModel.db_iotPlanTypeCode == 'IotVideoMonitor') {
      const temppandids = tempElevator
        .map(x => x.db_videoMonitorPlanId)
        .filter(x => x)
      const tempid = uniq(temppandids)
      if (
        temppandids.length == tempElevator.length &&
        tempid.length == 1 &&
        tempElevator.length > 0
      ) {
        dialogModel.db_iotPlanId = tempElevator[0].db_videoMonitorPlanId
      } else {
        dialogModel.db_iotPlanId = ''
      }
    }
  }
  const tempWork = addModel.find((x: any) => x.dbkey == 'db_workTemplateId')
  if (tempWork && tempWork.fnArgs.db_templateTypeCode == 'RegularUpkeep') {
    const tempEleType = tempElevator.map(x => x.db_elevType)
    tempWork.list = []
    dialogModel.db_workTemplateId = ''
    if (uniq(tempEleType).length > 1) {
      errMode.db_elevId = {
        error: '电梯类型不一致'
      }
    } else {
      if (tempElevator.length >= 1) {
        const tempArr = worktemplate.filter(
          k =>
            k.db_elevType == tempElevator[0].db_elevType &&
            k.db_maintModelCode == tempElevator[0].db_maintModelCode
        )
        tempWork.list = tempArr
      }
    }
  }
  const tempdynamicWorkItem = addModel.find(
    (x: any) => x.dbkey == 'db_dynamicWorkItem'
  )
  if (tempdynamicWorkItem) {
    tempdynamicWorkItem.list = []
    tempdynamicWorkItem.isNotshowKey = true
    dialogModel.taskInfo.db_dynamicWorkItem = ''
    tempdynamicWorkItem.multipledata = []
    if (args.length == 1) {
      const tempmodelData = new Elevator_DynamicWorkItem()
      tempmodelData.db_elevId = args[0]
      tempmodelData.db_dealLabelCode = '00'
      selectByConditionDynamicWorkItApi({
        ...tempmodelData,
        ui_type: 'A0',
        ui_pageSize: 0,
        ui_currentPage: 0
      }).then(x => {
        const { objectList, condition } = x.data.data
        objectList.forEach(y => {
          tempdynamicWorkItem.list.push({
            value: y.db_id,
            label: y.db_content,
            ...y
          })
        })
        if (objectList.length > 0) {
          tempdynamicWorkItem.isNotshowKey = false
        }
      })
    }
  }
}
const changeIotPlan = (args, addModel, item, dialogModel) => {
  const tempItem = addModel.find((x: any) => x.dbkey == 'db_iotPlanId')
  dialogModel.db_iotPlanId = ''
  const tempElevatorList = addModel.find((x: any) => x.dbkey == 'db_elevId')
  const tempElevator = tempElevatorList.list.filter(
    x => dialogModel.db_elevId.split(',').findIndex(y => y == x.value) > -1
  )
  if (tempItem) {
    tempItem.list = []
    if (args) {
      if (tempElevator) {
        // IotEmergency: "应急处置"
        // IotRunMonitor: "运行监测"
        // IotVideoMonitor: "监控监测"
        if (args == 'IotEmergency') {
          const temppandids = tempElevator
            .map(x => x.db_emergencyPlanId)
            .filter(x => x)
          const tempid = uniq(temppandids)
          if (
            temppandids.length == tempElevator.length &&
            tempid.length == 1 &&
            tempElevator.length > 0
          ) {
            dialogModel.db_iotPlanId = tempElevator[0].db_emergencyPlanId
          } else {
            dialogModel.db_iotPlanId = ''
          }
        } else if (args == 'IotRunMonitor') {
          const temppandids = tempElevator
            .map(x => x.db_runMonitorPlanId)
            .filter(x => x)
          const tempid = uniq(temppandids)
          if (
            temppandids.length == tempElevator.length &&
            tempid.length == 1 &&
            tempElevator.length > 0
          ) {
            dialogModel.db_iotPlanId = tempElevator[0].db_runMonitorPlanId
          } else {
            dialogModel.db_iotPlanId = ''
          }
        } else if (args == 'IotVideoMonitor') {
          const temppandids = tempElevator
            .map(x => x.db_videoMonitorPlanId)
            .filter(x => x)
          const tempid = uniq(temppandids)
          if (
            temppandids.length == tempElevator.length &&
            tempid.length == 1 &&
            tempElevator.length > 0
          ) {
            dialogModel.db_iotPlanId = tempElevator[0].db_videoMonitorPlanId
          } else {
            dialogModel.db_iotPlanId = ''
          }
        }
      }
      selectByAllApi({ tableName: `Elevator_${args}Plan` }).then(x => {
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          tempItem.list.push({
            value: key,
            label: v
          })
        })
      })
    }
  }
}
const changefollowUserId = (args, addModel, item, dialogModel) => {
  const tempVido = addModel.find((x: any) => x.dbkey == 'db_isVideo')
  if (tempVido) {
    dialogModel.taskInfo.db_isVideo = '00'
    tempVido.isNotshowKey = true
  }
  if (args) {
    if (tempVido) {
      getIsBindHelmetApi({ db_userId: args }).then(x => {
        if (x.data.success) {
          if (x.data.data) {
            tempVido.isNotshowKey = false
            dialogModel.taskInfo.db_isVideo = '01'
          }
        }
      })
    }
  }
}

const changedynamicWorkItem = (args, addModel, item, dialogModel) => {
  dialogModel.taskInfo.db_dynamicWorkItem = ''
  if (args && args.length > 0) {
    const tempWorkItems = item.list.filter(
      (x: any) => args.findIndex(y => y == x.value) > -1
    )
    if (tempWorkItems.length > 0) {
      dialogModel.taskInfo.db_dynamicWorkItem = JSON.stringify(
        tempWorkItems.map((x: any) => {
          return {
            db_id: x.db_id,
            db_content: x.db_content,
            db_dealLabelCode: x.db_dealLabelCode
          }
        })
      )
    }
  }
}
const dialogMount = (args, addModel, fn?) => {
  const elevator = new Elevator_Elevator()
  elevator.db_projectId = args
  const tempItem = addModel.find((x: any) => x.dbkey == 'db_elevId')

  if (tempItem) {
    tempItem.list = []
    tempItem.multipledata = []
    selectElevatorByConditionApi({
      ...elevator,
      ui_type: 'A0',
      ui_pageSize: 0,
      ui_currentPage: 0
    }).then(x => {
      const { objectList, condition } = x.data.data
      objectList.forEach(y => {
        tempItem.list.push({
          value: y.db_id,
          label: y.db_id_projectNum,
          db_maintModelCode: y.db_maintModelCode,
          ...y
        })
      })

      if (fn) {
        fn(tempItem.list)
      }
    })
  }
  const tempfollowUser = addModel.find((x: any) => x.dbkey == 'db_followUserId')
  if (tempfollowUser) {
    tempfollowUser.list = []
    getwebEnginUserByProjectIdApi({ db_id: args }).then(x => {
      if (x.data.success) {
        x.data.data.forEach(y => {
          tempfollowUser.list.push({
            value: y.db_id,
            label: y.db_id_username
          })
        })
      }
    })
  }
}
const initEditTaskMount = (args, addModel, dialogModel) => {
  dialogMount(args, addModel, (list: any) => {
    if (dialogModel.db_elevId) {
      const tempElevator = list.find(x => x.value == dialogModel.db_elevId)
      if (tempElevator) {
        const tempWork = addModel.find(
          (x: any) => x.dbkey == 'db_workTemplateId'
        )
        if (
          tempWork &&
          tempWork.fnArgs.db_templateTypeCode == 'RegularUpkeep'
        ) {
          tempWork.list = []
          const tempArr = worktemplate.filter(
            k =>
              k.db_elevType == tempElevator.db_elevType &&
              k.db_maintModelCode == tempElevator.db_maintModelCode
          )
          tempWork.list = tempArr

          list.forEach(element => {
            // 只有在常规保养的时候才会有逻辑
            element.disabled = dialogModel.db_maintModelCode
              ? !(dialogModel.db_maintModelCode == element.db_maintModelCode)
              : true
          })

          if (dialogModel.db_upkeepType) {
            const temp = tempArr.find(
              l => l.db_upkeepType == dialogModel.db_upkeepType
            )
            if (temp) {
              dialogModel.db_workTemplateId = temp.db_id
            }
          }
        }
        const tempEle = addModel.find((x: any) => x.dbkey == 'db_elevId')
        if (tempEle) {
          tempEle.multipledata = dialogModel.db_elevId.split(',')
        }
      }

      const tempdynamicWorkItem = addModel.find(
        (x: any) => x.dbkey == 'db_dynamicWorkItem'
      )
      if (tempdynamicWorkItem) {
        tempdynamicWorkItem.list = []
        tempdynamicWorkItem.isNotshowKey = true
        if (dialogModel.db_elevId) {
          const tempmodelData = new Elevator_DynamicWorkItem()
          tempmodelData.db_elevId = dialogModel.db_elevId.split(',')[0]
          tempmodelData.db_dealLabelCode = '00'
          selectByConditionDynamicWorkItApi({
            ...tempmodelData,
            ui_type: 'A0',
            ui_pageSize: 0,
            ui_currentPage: 0
          }).then(x => {
            const { objectList, condition } = x.data.data
            objectList.forEach(y => {
              tempdynamicWorkItem.list.push({
                value: y.db_id,
                label: y.db_content,
                ...y
              })
            })
            if (objectList.length > 0) {
              tempdynamicWorkItem.isNotshowKey = false
            }
          })
        }
      }
    }
  })
}
const changedmaintModelCode = (args, addModel, item, dialogModel) => {
  const tempElevatorList = addModel.find((x: any) => x.dbkey == 'db_elevId')
  if (tempElevatorList) {
    if (args) {
      tempElevatorList.list.forEach(e => {
        e.disabled = !(args == e.db_maintModelCode)
      })
    } else {
      tempElevatorList.list.forEach(e => {
        e.disabled = true
      })
    }
    tempElevatorList.multipledata = []
    dialogModel.db_elevId = ''
  }
}
const useTaskMapApiModel = () => {
  // selectByAllTypeApi({ constType: 'demandMaint_type' }).then(x => {
  //   Object.entries<string>(x.data.data).forEach(([key, v]) => {
  //     demandMaint.push({
  //       value: key,
  //       label: v
  //     })
  //   })
  // })
  // selectByAllTypeApi({ constType: 'routineMaint_type' }).then(x => {
  //   Object.entries<string>(x.data.data).forEach(([key, v]) => {
  //     roytineMaint.push({
  //       value: key,
  //       label: v
  //     })
  //   })
  // })
  selectByConditionFromJsonApi({}).then(x => {
    if (x.data) {
      worktemplate = x.data.map((y: any) => {
        return {
          value: y.db_id,
          label: y.db_id_templateName,
          ...y
        }
      })
    }
  })
  const addModelProp = [
    // {
    //   name: '关联计划',
    //   dbkey: 'db_scheduleId',
    //   isreuqired: false,
    //   isObj: 'taskInfo',
    //   isSelect: true,
    //   multiple: false,
    //   multipledata: [],
    //   list: [],
    //   fn: selectScheduleByConditionApi,
    //   key: 'db_id',
    //   value: 'db_id_scheName',
    //   fnArgs: { ui_type: 'A0', ui_pageSize: 0, ui_currentPage: 0 },
    //   changefn: changeSclue
    // },
    {
      name: '所属项目',
      dbkey: 'db_projectId',
      isreuqired: true,
      isSelect: true,
      multiple: false,
      multipledata: [],
      isObj: 'taskInfo',
      list: [],
      fn: getProjectMapLoginApi,
      fnArgs: {},
      changefn: changeProject
    },
    {
      name: '内部编号',
      dbkey: 'db_elevId',
      isreuqired: true,
      isSelect: true,
      multiple: true,
      multipledata: [],
      list: [],
      changefn: changeElevartor
    },
    {
      name: '执行人',
      dbkey: 'db_followUserId',
      isObj: 'taskInfo',
      isreuqired: true,
      isSelect: true,
      multiple: false,
      multipledata: [],
      list: [],
      changefn: changefollowUserId
    },
    {
      name: '计划开始日期',
      dbkey: 'db_preEndtime',
      isreuqired: true,
      isSelect: true,
      multiple: false,
      multipledata: [],
      type: 'datetime',
      isObj: 'taskInfo',
      list: []
    }
  ]
  const getModel = (name: string) => {
    const temp: any = require(`@/module.ts/Elevator_Task${name}`)
    const tempObj = new temp[`Elevator_Task${name}`]()
    tempObj.taskInfo.db_isVideo = '00'
    return tempObj
  }
  const getAddModel = {
    Elevator_TaskCleanUpkeep: [
      ...addModelProp,
      {
        name: '保养模板',
        dbkey: 'db_workTemplateId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectWorkTemplateByConditionApi,
        fnArgs: { db_templateTypeCode: 'CleanUpkeep', ui_type: 'A0' },
        key: 'db_id',
        value: 'db_id_templateName'
      },
      {
        name: '动态工作项',
        dbkey: 'db_dynamicWorkItem',
        isreuqired: false,
        isNotshowKey: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        isObj: 'taskInfo',
        list: [],
        changefn: changedynamicWorkItem
      },
      {
        name: '是否录制视频',
        dbkey: 'db_isVideo',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        isNotshowKey: true,
        multipledata: [],
        isObj: 'taskInfo',
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'public_whether' }
      }
    ],
    Elevator_TaskComplaint: [
      // {
      //   name: '投诉人',
      //   dbkey: 'db_complaintUser',
      //   isreuqired: true,
      //   isSelect: false,
      //   multiple: false,
      //   multipledata: [],
      //   list: []
      // },
      // {
      //   name: '投诉对象',
      //   dbkey: 'db_complaintObject',
      //   isreuqired: true,
      //   isSelect: false,
      //   multiple: false,
      //   multipledata: [],
      //   list: []
      // },
      // {
      //   name: '投诉类型',
      //   dbkey: 'db_complaintType',
      //   isreuqired: true,
      //   isSelect: false,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   fn: selectByAllTypeApi,
      //   fnArgs: { constType: 'complaint_type' }
      // },
      // {
      //   name: '投诉描述',
      //   dbkey: 'db_complaintDesc',
      //   isreuqired: true,
      //   isSelect: false,
      //   multiple: false,
      //   multipledata: [],
      //   list: []
      // },
      // {
      //   name: '投诉等级',
      //   dbkey: 'db_complaintLevel',
      //   isreuqired: true,
      //   isSelect: false,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   fn: selectByAllTypeApi,
      //   fnArgs: { constType: 'complaint_level' }
      // },
      // // {
      // //   name: '关联计划',
      // //   dbkey: 'db_scheduleId',
      // //   isreuqired: true,
      // //   isObj: 'taskInfo',
      // //   isSelect: true,
      // //   multiple: false,
      // //   multipledata: [],
      // //   list: [],
      // //   fn: selectByAllApi,
      // //   fnArgs: { tableName: 'Elevator_Schedule' }
      // // },
      // {
      //   name: '所属项目',
      //   dbkey: 'db_projectId',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   isObj: 'taskInfo',
      //   list: [],
      //   fn: getProjectMapLoginApi,
      //   fnArgs: {},
      //   changefn: changeProject
      // },
      // {
      //   name: '跟进人',
      //   dbkey: 'db_followUserId',
      //   isObj: 'taskInfo',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   fn: getUserMapLoginApi,
      //   fnArgs: {}
      // },
      // {
      //   name: '优先级',
      //   dbkey: 'db_taskPriorityCode',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   isObj: 'taskInfo',
      //   list: [],
      //   fn: selectByAllTypeApi,
      //   fnArgs: { constType: 'task_priority' }
      // },
      // {
      //   name: '任务详情',
      //   dbkey: 'db_taskDetail',
      //   isreuqired: true,
      //   isSelect: false,
      //   multiple: false,
      //   multipledata: [],
      //   isObj: 'taskInfo',
      //   list: []
      // }
    ],
    Elevator_TaskInstallIot: [
      // {
      //   name: '关联计划',
      //   dbkey: 'db_scheduleId',
      //   isreuqired: false,
      //   isObj: 'taskInfo',
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   fn: selectScheduleByConditionApi,
      //   key: 'db_id',
      //   value: 'db_id_scheName',
      //   fnArgs: { ui_type: 'A0', ui_pageSize: 0, ui_currentPage: 0 },
      //   changefn: changeSclue
      // },
      {
        name: '所属项目',
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isObj: 'taskInfo',
        list: [],
        fn: getProjectMapLoginApi,
        fnArgs: {},
        changefn: changeProject
      },
      {
        name: '内部编号',
        dbkey: 'db_elevId',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        list: [],
        changefn: changeElevartor
      },
      {
        name: '运维类型',
        dbkey: 'db_installIotTypeCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'installIot_type' },
        changefn: changeInstallIotType
      },
      {
        name: '执行人',
        dbkey: 'db_followUserId',
        isObj: 'taskInfo',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        changefn: changefollowUserId
      },
      {
        name: '计划开始日期',
        dbkey: 'db_preEndtime',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        type: 'datetime',
        isObj: 'taskInfo',
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
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'iotInstall_type' },
        changefn: changeIotPlan
      },
      {
        name: '方案',
        dbkey: 'db_iotPlanId',
        isreuqired: true,
        disabled: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '动态工作项',
        dbkey: 'db_dynamicWorkItem',
        isreuqired: false,
        isNotshowKey: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        isObj: 'taskInfo',
        list: [],
        changefn: changedynamicWorkItem
      },
      {
        name: '是否录制视频',
        dbkey: 'db_isVideo',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        isNotshowKey: true,
        multipledata: [],
        isObj: 'taskInfo',
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'public_whether' }
      }
    ],
    Elevator_TaskMedical: [
      ...addModelProp,
      {
        name: '体检模板',
        dbkey: 'db_workTemplateId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectWorkTemplateByConditionApi,
        fnArgs: { db_templateTypeCode: 'Medical', ui_type: 'A0' },
        key: 'db_id',
        value: 'db_id_templateName'
      },
      {
        name: '动态工作项',
        dbkey: 'db_dynamicWorkItem',
        isreuqired: false,
        isSelect: true,
        multiple: true,
        isNotshowKey: true,
        multipledata: [],
        isObj: 'taskInfo',
        list: [],
        changefn: changedynamicWorkItem
      },
      {
        name: '是否录制视频',
        dbkey: 'db_isVideo',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        isNotshowKey: true,
        multipledata: [],
        isObj: 'taskInfo',
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'public_whether' }
      }
    ],
    Elevator_TaskOnSite: [
      // {
      //   name: '关联计划',
      //   dbkey: 'db_scheduleId',
      //   isreuqired: false,
      //   isObj: 'taskInfo',
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   fn: selectByAllApi,
      //   fnArgs: { tableName: 'Elevator_Schedule' }
      // },
      // {
      //   name: '所属项目',
      //   dbkey: 'db_projectId',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: true,
      //   multipledata: [],
      //   isObj: 'taskInfo',
      //   list: [],
      //   fn: getProjectMapLoginApi,
      //   fnArgs: {},
      //   changefn: changeProject
      // },
      // {
      //   name: '驻场原因',
      //   dbkey: 'db_trappedReason',
      //   isreuqired: true,
      //   isSelect: false,
      //   multiple: false,
      //   multipledata: [],
      //   list: []
      // },
      // {
      //   name: '跟进人',
      //   dbkey: 'db_followUserId',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   isObj: 'taskInfo',
      //   list: [],
      //   fn: getUserMapLoginApi,
      //   fnArgs: {}
      // },
      // {
      //   name: '优先级',
      //   dbkey: 'db_taskPriorityCode',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   isObj: 'taskInfo',
      //   list: [],
      //   fn: selectByAllTypeApi,
      //   fnArgs: { constType: 'task_priority' }
      // },
      // {
      //   name: '任务详情',
      //   dbkey: 'db_taskDetail',
      //   isreuqired: true,
      //   isSelect: false,
      //   multiple: false,
      //   multipledata: [],
      //   isObj: 'taskInfo',
      //   list: []
      // }
    ],
    Elevator_TaskPatrol: [
      // ...addModelProp,
      // {
      //   name: '保养模板',
      //   dbkey: 'db_workTemplateId',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   fn: selectWorkTemplateByConditionApi,
      //   fnArgs: { db_templateTypeCode: 'Patrol', ui_type: 'A0' },
      //   key: 'db_id',
      //   value: 'db_id_templateName'
      // }
    ],
    Elevator_TaskRegularUpkeep: [
      // {
      //   name: '关联计划',
      //   dbkey: 'db_scheduleId',
      //   isreuqired: false,
      //   isObj: 'taskInfo',
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   fn: selectScheduleByConditionApi,
      //   key: 'db_id',
      //   value: 'db_id_scheName',
      //   fnArgs: { ui_type: 'A0', ui_pageSize: 0, ui_currentPage: 0 },
      //   changefn: changeSclue
      // },
      {
        name: '所属项目',
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isObj: 'taskInfo',
        list: [],
        fn: getProjectMapLoginApi,
        fnArgs: {},
        changefn: changeProject
      },
      {
        name: '维保模式',
        dbkey: 'db_maintModelCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'maint_model' },
        changefn: changedmaintModelCode
      },
      {
        name: '内部编号',
        dbkey: 'db_elevId',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        list: [],
        changefn: changeElevartor
      },
      {
        name: '执行人',
        dbkey: 'db_followUserId',
        isObj: 'taskInfo',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        changefn: changefollowUserId
      },
      {
        name: '计划开始日期',
        dbkey: 'db_preEndtime',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        type: 'datetime',
        isObj: 'taskInfo',
        list: []
      },

      {
        name: '保养模板',
        dbkey: 'db_workTemplateId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fnArgs: { db_templateTypeCode: 'RegularUpkeep', ui_type: 'A0' },
        changefn: (args, addModel, item, dialogModel) => {
          dialogModel.db_upkeepType = ''
          if (args) {
            const temp = item.list.find(x => x.db_id == args)
            if (temp) {
              dialogModel.db_upkeepType = temp.db_upkeepType
            }
          }
        }
      },
      {
        name: '动态工作项',
        dbkey: 'db_dynamicWorkItem',
        isreuqired: false,
        isSelect: true,
        isNotshowKey: true,
        multiple: true,
        multipledata: [],
        isObj: 'taskInfo',
        list: [],
        changefn: changedynamicWorkItem
      },
      {
        name: '是否录制视频',
        dbkey: 'db_isVideo',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        isNotshowKey: true,
        multipledata: [],
        isObj: 'taskInfo',
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'public_whether' }
      }
    ],
    Elevator_TaskRepairUpkeep: [
      ...addModelProp,
      {
        name: '动态工作项',
        dbkey: 'db_dynamicWorkItem',
        isreuqired: false,
        isSelect: true,
        multiple: true,
        isNotshowKey: true,
        multipledata: [],
        isObj: 'taskInfo',
        list: [],
        changefn: changedynamicWorkItem
      },
      {
        name: '是否录制视频',
        dbkey: 'db_isVideo',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        isNotshowKey: true,
        multipledata: [],
        isObj: 'taskInfo',
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'public_whether' }
      }
      // {
      //   name: '换修工作项',
      //   dbkey: 'db_upkeepType',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: []
      // },
      // {
      //   name: '保养模板',
      //   dbkey: 'db_workTemplateId',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   fn: selectWorkTemplateByConditionApi,
      //   fnArgs: { db_templateTypeCode: 'RepairUpkeep', ui_type: 'A0' },
      //   key: 'db_id',
      //   value: 'db_id_templateName'
      // }
    ],
    Elevator_TaskCallRepair: [
      {
        name: '所属项目',
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isObj: 'taskInfo',
        list: [],
        fn: getProjectMapLoginApi,
        fnArgs: {},
        changefn: changeProject
      },
      {
        name: '内部编号',
        dbkey: 'db_elevId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '故障描述',
        dbkey: 'db_faultReasonDesc',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '图片',
        dbkey: 'db_faultAppearanceUrl',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        type: 'imgs',
        filekey: 'faultAppearance',
        list: [],
        isfull: true
      }
    ]
  }
  const getAddModelFn = (name: string) => {
    return getAddModel[`Elevator_Task${name}`]
  }
  return {
    getModel,
    getAddModelFn,
    dialogMount,
    initEditTaskMount
  }
}

export default useTaskMapApiModel
