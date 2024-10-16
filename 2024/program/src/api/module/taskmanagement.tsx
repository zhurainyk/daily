import api from '../create-api'
import apiConfig from '../apiConfig'

/**
 *
 * @param {partNumber} arg
 * @returns
 */

export const planList = async (
  arg = { ui_type: 'A0', ui_pageSize: 0, ui_currentPage: 0 }
) => {
  return api(
    apiConfig.url,
    '/elevator_order/ischedule/selectByCondition',
    'post',
    arg
  )
}
export const updateByIdApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskInfoCurd/updateById',
    'post',
    arg,
    null,
    true,
    file
  )
}

export const saveApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskInfoCurd/save',
    'post',
    arg,
    null,
    true,
    file
  )
}

export const deleteByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskInfoCurd/deleteById',
    'post',
    arg,
    null,
    false
  )
}

export const selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskInfoCurd/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const selectByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskInfoCurd/selectByCondition',
    'post',
    arg
  )
}

export const selectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskInfoCurd/selectCountByCondition',
    'post',
    arg
  )
}

//体检
const medical = '/elevator_order/itaskMedicalCurd'
export const medicalupdateByIdApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    medical + '/updateById',
    'post',
    arg,
    null,
    true,
    file
  )
}
export const medicalsaveApi = async (arg, file?: any) => {
  return api(apiConfig.url, medical + '/save', 'post', arg, null, true, file)
}

export const medicaldeleteByIdApi = async arg => {
  return api(apiConfig.url, medical + '/deleteById', 'post', arg, null, false)
}

export const medicalselectByIdApi = async arg => {
  return api(apiConfig.url, medical + '/selectById', 'post', arg, null, false)
}

export const medicalselectByConditionApi = async arg => {
  return api(apiConfig.url, medical + '/selectByCondition', 'post', arg)
}

export const medicalselectCountByConditionApi = async arg => {
  return api(apiConfig.url, medical + '/selectCountByCondition', 'post', arg)
}
//清洁大保养任务数据
const clearup = '/elevator_order/itaskCleanUpkeepCurd'
export const clearupupdateByIdApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    clearup + '/updateById',
    'post',
    arg,
    null,
    true,
    file
  )
}
export const clearupsaveApi = async (arg, file?: any) => {
  return api(apiConfig.url, clearup + '/save', 'post', arg, null, true, file)
}

export const clearupdeleteByIdApi = async arg => {
  return api(apiConfig.url, clearup + '/deleteById', 'post', arg, null, false)
}
export const clearupselectByIdApi = async arg => {
  return api(apiConfig.url, clearup + '/selectById', 'post', arg, null, false)
}

export const clearupselectByConditionApi = async arg => {
  return api(apiConfig.url, clearup + '/selectByCondition', 'post', arg)
}

export const clearupselectCountByConditionApi = async arg => {
  return api(apiConfig.url, clearup + '/selectCountByCondition', 'post', arg)
}
///elevator_order/iorderRepairUpkeepCurd 换修大保养工单
const RepairUpkeep = '/elevator_order/itaskRepairUpkeepCurd'
export const RepairUpkeepupdateByIdApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    RepairUpkeep + '/updateById',
    'post',
    arg,
    null,
    true,
    file
  )
}
export const RepairUpkeepupsaveApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    RepairUpkeep + '/save',
    'post',
    arg,
    null,
    true,
    file
  )
}

export const RepairUpkeepupdeleteByIdApi = async arg => {
  return api(
    apiConfig.url,
    RepairUpkeep + '/deleteById',
    'post',
    arg,
    null,
    false
  )
}
export const RepairUpkeepselectByIdApi = async arg => {
  return api(
    apiConfig.url,
    RepairUpkeep + '/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const RepairUpkeepselectByConditionApi = async arg => {
  return api(apiConfig.url, RepairUpkeep + '/selectByCondition', 'post', arg)
}

export const RepairUpkeepselectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    RepairUpkeep + '/selectCountByCondition',
    'post',
    arg
  )
}
////elevator_order/itaskRegularUpkeepCurd 常规保养
const RegularUpkeep = '/elevator_order/itaskRegularUpkeepCurd'
export const RegularUpkeepupdateByIdApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    RegularUpkeep + '/updateById',
    'post',
    arg,
    null,
    true,
    file
  )
}
export const RegularUpkeepsaveApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    RegularUpkeep + '/save',
    'post',
    arg,
    null,
    true,
    file
  )
}

export const RegularUpkeepdeleteByIdApi = async arg => {
  return api(
    apiConfig.url,
    RegularUpkeep + '/deleteById',
    'post',
    arg,
    null,
    false
  )
}
export const RegularUpkeepselectByIdApi = async arg => {
  return api(
    apiConfig.url,
    RegularUpkeep + '/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const RegularUpkeepselectByConditionApi = async arg => {
  return api(apiConfig.url, RegularUpkeep + '/selectByCondition', 'post', arg)
}

export const RegularUpkeepselectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    RegularUpkeep + '/selectCountByCondition',
    'post',
    arg
  )
}

///elevator_order/itaskInstallIotCurd 安装物联网任务
const InstallIot = '/elevator_order/itaskInstallIotCurd'
export const InstallIotupdateByIdApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    InstallIot + '/updateById',
    'post',
    arg,
    null,
    true,
    file
  )
}
export const InstallIotsaveApi = async (arg, file?: any) => {
  return api(apiConfig.url, InstallIot + '/save', 'post', arg, null, true, file)
}

export const InstallIotdeleteByIdApi = async arg => {
  return api(
    apiConfig.url,
    InstallIot + '/deleteById',
    'post',
    arg,
    null,
    false
  )
}
export const InstallIotselectByIdApi = async arg => {
  return api(
    apiConfig.url,
    InstallIot + '/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const InstallIotselectByConditionApi = async arg => {
  return api(apiConfig.url, InstallIot + '/selectByCondition', 'post', arg)
}

export const InstallIotselectCountByConditionApi = async arg => {
  return api(apiConfig.url, InstallIot + '/selectCountByCondition', 'post', arg)
}
///elevator_order/itaskCallRepairCurd 召修任务
const CallRepair = '/elevator_order/itaskCallRepairCurd'
export const CallRepairupdateByIdApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    CallRepair + '/updateById',
    'post',
    arg,
    null,
    true,
    file
  )
}
export const CallRepairsaveApi = async (arg, file?: any) => {
  return api(apiConfig.url, CallRepair + '/save', 'post', arg, null, true, file)
}

export const CallRepairdeleteByIdApi = async arg => {
  return api(
    apiConfig.url,
    CallRepair + '/deleteById',
    'post',
    arg,
    null,
    false
  )
}

export const CallRepairselectByIdApi = async arg => {
  return api(
    apiConfig.url,
    CallRepair + '/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const CallRepairselectByConditionApi = async arg => {
  return api(apiConfig.url, CallRepair + '/selectByCondition', 'post', arg)
}

export const CallRepairselectCountByConditionApi = async arg => {
  return api(apiConfig.url, CallRepair + '/selectCountByCondition', 'post', arg)
}

///elevator_order/itaskEmergencyCurd 应急处置任务
const Emergency = '/elevator_order/itaskEmergencyCurd'
export const EmergencyupdateByIdApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    Emergency + '/updateById',
    'post',
    arg,
    null,
    true,
    file
  )
}
export const EmergencysaveApi = async (arg, file?: any) => {
  return api(apiConfig.url, Emergency + '/save', 'post', arg, null, true, file)
}

export const EmergencydeleteByIdApi = async arg => {
  return api(apiConfig.url, Emergency + '/deleteById', 'post', arg, null, false)
}
export const EmergencyselectByIdApi = async arg => {
  return api(apiConfig.url, Emergency + '/selectById', 'post', arg, null, false)
}

export const EmergencyselectByConditionApi = async arg => {
  return api(apiConfig.url, Emergency + '/selectByCondition', 'post', arg)
}

export const EmergencyselectCountByConditionApi = async arg => {
  return api(apiConfig.url, Emergency + '/selectCountByCondition', 'post', arg)
}

//停梯时长
export const updateStopDurationById = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskInfoCurd/updateStopDurationById',
    'post',
    arg
  )
}
//工单的状态
export const updateOrderStateById = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskInfoCurd/updateOrderStateById',
    'post',
    arg
  )
}
//召修分类
export const updateCallRepairClassifyCode = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskInfoCurd/updateCallRepairClassifyCode',
    'post',
    arg
  )
}
export const getByTaskId = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskCallRepairCurd/selectByCondition',
    'post',
    arg
  )
}
export const callrepairsaveTaskAndOrder = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskCallRepairCurd/saveTaskAndOrder',
    'post',
    arg
  )
}
export const regularsaveTaskAndOrder = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskRegularUpkeepCurd/saveTaskAndOrder',
    'post',
    arg
  )
}
export const updateTimeById = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskInfoCurd/updateTimeById',
    'post',
    arg
  )
}
export const updatePeopleById = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskInfoCurd/updatePeopleById',
    'post',
    arg
  )
}

//体检任务
export const medicalsaveTaskAndOrder = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskMedicalCurd/saveTaskAndOrder',
    'post',
    arg
  )
}
//一级大保养
export const cleanupkeepsaveTaskAndOrder = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskCleanUpkeepCurd/saveTaskAndOrder',
    'post',
    arg
  )
} 
//二级大保养   
export const repairupkeepsaveTaskAndOrder = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskRepairUpkeepCurd/saveTaskAndOrder',
    'post',
    arg
  )
}
//安装物联网
export const installiotsaveTaskAndOrder = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskInstallIotCurd/saveTaskAndOrder',
    'post',
    arg
  )
}

//模板导入
export const importModelApi = async (arg,type='RegularUpkeep') => {
  return api(
    apiConfig.url,
    `/elevator_order/itask${type}Curd/saveList`,
    'post',
    arg,
    null,
    false
  )
}