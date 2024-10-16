import api from '../create-api'
import apiConfig from '../apiConfig'

/**
 *
 * @param {partNumber} arg
 * @returns
 */
const base = '/elevator_order/iorderInfoCurd'
export const updateByIdApi = async (arg, file?: any) => {
  return api(apiConfig.url, base + '/updateById', 'post', arg, null, true, file)
}

export const selectByIdApi = async arg => {
  return api(apiConfig.url, base + '/selectById', 'post', arg, null, false)
}
export const saveApi = async (arg, file?: any) => {
  return api(apiConfig.url, base + '/save', 'post', arg, null, true, file)
}

export const deleteByIdApi = async arg => {
  return api(apiConfig.url, base + '/deleteById', 'post', arg, null, false)
}
export const selectByConditionApi = async arg => {
  return api(apiConfig.url, base + '/selectByCondition', 'post', arg)
}

export const selectCountByConditionApi = async arg => {
  return api(apiConfig.url, base + '/selectCountByCondition', 'post', arg)
}

const Medical = '/elevator_order/iorderMedicalCurd' // 体检工单
export const Medical_updateByIdApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    Medical + '/updateById',
    'post',
    arg,
    null,
    true,
    file
  )
}
export const Medical_saveApi = async (arg, file?: any) => {
  return api(apiConfig.url, Medical + '/save', 'post', arg, null, true, file)
}

export const Medical_deleteByIdApi = async arg => {
  return api(apiConfig.url, Medical + '/deleteById', 'post', arg, null, false)
}
export const Medical_selectByIdApi = async arg => {
  return api(apiConfig.url, Medical + '/selectById', 'post', arg, null, false)
}

export const Medical_selectByConditionApi = async arg => {
  return api(apiConfig.url, Medical + '/selectByCondition', 'post', arg)
}

export const Medical_selectCountByConditionApi = async arg => {
  return api(apiConfig.url, Medical + '/selectCountByCondition', 'post', arg)
}

const CleanUpkeep = '/elevator_order/iorderCleanUpkeepCurd' // 清洁大保养工单
export const CleanUpkeep_updateByIdApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    CleanUpkeep + '/updateById',
    'post',
    arg,
    null,
    true,
    file
  )
}
export const CleanUpkeep_saveApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    CleanUpkeep + '/save',
    'post',
    arg,
    null,
    true,
    file
  )
}

export const CleanUpkeep_deleteByIdApi = async arg => {
  return api(
    apiConfig.url,
    CleanUpkeep + '/deleteById',
    'post',
    arg,
    null,
    false
  )
}
export const CleanUpkeep_selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    CleanUpkeep + '/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const CleanUpkeep_selectByConditionApi = async arg => {
  return api(apiConfig.url, CleanUpkeep + '/selectByCondition', 'post', arg)
}

export const CleanUpkeep_selectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    CleanUpkeep + '/selectCountByCondition',
    'post',
    arg
  )
}
const RepairUpkeep = '/elevator_order/iorderRepairUpkeepCurd' //   换修大保养工单
export const RepairUpkeep_updateByIdApi = async (arg, file?: any) => {
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
export const RepairUpkeep_saveApi = async (arg, file?: any) => {
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

export const RepairUpkeep_deleteByIdApi = async arg => {
  return api(
    apiConfig.url,
    RepairUpkeep + '/deleteById',
    'post',
    arg,
    null,
    false
  )
}
export const RepairUpkeep_selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    RepairUpkeep + '/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const RepairUpkeep_selectByConditionApi = async arg => {
  return api(apiConfig.url, RepairUpkeep + '/selectByCondition', 'post', arg)
}

export const RepairUpkeep_selectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    RepairUpkeep + '/selectCountByCondition',
    'post',
    arg
  )
}
const InstallIot = '/elevator_order/iorderInstallIotCurd' //    安装物联网工单
export const InstallIot_updateByIdApi = async (arg, file?: any) => {
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
export const InstallIot_saveApi = async (arg, file?: any) => {
  return api(apiConfig.url, InstallIot + '/save', 'post', arg, null, true, file)
}

export const InstallIot_deleteByIdApi = async arg => {
  return api(
    apiConfig.url,
    InstallIot + '/deleteById',
    'post',
    arg,
    null,
    false
  )
}
export const InstallIot_selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    InstallIot + '/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const InstallIot_selectByConditionApi = async arg => {
  return api(apiConfig.url, InstallIot + '/selectByCondition', 'post', arg)
}

export const InstallIot_selectCountByConditionApi = async arg => {
  return api(apiConfig.url, InstallIot + '/selectCountByCondition', 'post', arg)
}

const RegularUpkeep = '/elevator_order/iorderRegularUpkeepCurd' //  常规保养工单
export const RegularUpkeep_updateByIdApi = async (arg, file?: any) => {
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
export const RegularUpkeep_saveApi = async (arg, file?: any) => {
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

export const RegularUpkeep_deleteByIdApi = async arg => {
  return api(
    apiConfig.url,
    RegularUpkeep + '/deleteById',
    'post',
    arg,
    null,
    false
  )
}
export const RegularUpkeep_selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    RegularUpkeep + '/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const RegularUpkeep_selectByConditionApi = async arg => {
  return api(apiConfig.url, RegularUpkeep + '/selectByCondition', 'post', arg)
}

export const RegularUpkeep_selectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    RegularUpkeep + '/selectCountByCondition',
    'post',
    arg
  )
}
const CallRepair = '/elevator_order/iorderCallRepairCurd' //  常规保养工单
export const CallRepair_updateByIdApi = async (arg, file?: any) => {
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
export const CallRepair_saveApi = async (arg, file?: any) => {
  return api(apiConfig.url, CallRepair + '/save', 'post', arg, null, true, file)
}

export const CallRepair_deleteByIdApi = async arg => {
  return api(
    apiConfig.url,
    CallRepair + '/deleteById',
    'post',
    arg,
    null,
    false
  )
}
export const CallRepair_selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    CallRepair + '/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const CallRepair_selectByConditionApi = async arg => {
  return api(apiConfig.url, CallRepair + '/selectByCondition', 'post', arg)
}

export const CallRepair_selectCountByConditionApi = async arg => {
  return api(apiConfig.url, CallRepair + '/selectCountByCondition', 'post', arg)
}

const Emergency = '/elevator_order/iorderEmergencyCurd' //  /elevator_order/iorderEmergencyCurd 应急处置工单
export const Emergency_updateByIdApi = async (arg, file?: any) => {
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
export const Emergency_saveApi = async (arg, file?: any) => {
  return api(apiConfig.url, Emergency + '/save', 'post', arg, null, true, file)
}

export const Emergency_deleteByIdApi = async arg => {
  return api(apiConfig.url, Emergency + '/deleteById', 'post', arg, null, false)
}
export const Emergency_selectByIdApi = async arg => {
  return api(apiConfig.url, Emergency + '/selectById', 'post', arg, null, false)
}

export const Emergency_selectByConditionApi = async arg => {
  return api(apiConfig.url, Emergency + '/selectByCondition', 'post', arg)
}

export const Emergency_selectCountByConditionApi = async arg => {
  return api(apiConfig.url, Emergency + '/selectCountByCondition', 'post', arg)
}

export const Emergency_BaseInfo_updateByIdApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator_order/iorderEmergency/updateByConditon',
    'post',
    arg,
    null,
    true,
    file
  )
}
