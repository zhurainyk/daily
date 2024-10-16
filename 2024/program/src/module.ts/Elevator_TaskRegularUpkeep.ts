import { Elevator_TaskInfo } from './Elevator_TaskInfo'

export class Elevator_TaskRegularUpkeep implements IElevator_TaskRegularUpkeep {
  db_workTemplateId = ''

  ui_workTemplateName = ''

  db_id = ''

  db_taskId = ''

  db_registCode = ''

  db_elevId = ''

  db_upkeepType = ''

  db_workItemList = ''

  db_lastMaintRunTimes = ''

  db_lastMaintRunDuration = ''

  db_lastMaintDuration = ''

  db_lastMaintDoorTimes = ''

  db_lastMaintRunMileage = ''

  db_baseInfo = ''

  db_environmentState = ''

  db_sysCompPartState = ''

  db_elevState = ''

  db_stopDuration = ''

  db_timeoutRule = ''

  taskInfo = new Elevator_TaskInfo()
}
