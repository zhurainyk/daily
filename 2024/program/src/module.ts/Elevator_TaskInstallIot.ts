import { Elevator_TaskInfo } from './Elevator_TaskInfo'

export class Elevator_TaskInstallIot implements IElevator_TaskInstallIot {
  db_installIotTypeCode = ''

  db_id = ''

  db_taskId = ''

  db_registCode = ''

  db_elevId = ''

  db_iotPlanTypeCode = ''

  db_iotPlanId = ''

  db_endImgUrl = ''

  db_endImgName = ''

  db_onlineState = ''

  db_firstOnlineTime = ''

  db_stopDuration = ''

  db_timeoutRule = ''

  ui_iotPlanName = ''

  ui_firstOnlineTime = ''

  taskInfo = new Elevator_TaskInfo()
}
