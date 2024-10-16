import { Elevator_TaskInfo } from './Elevator_TaskInfo'

export class Elevator_TaskCleanUpkeep implements IElevator_TaskCleanUpkeep {
  db_workTemplateId = ''

  ui_workTemplateName = ''

  db_id = ''

  db_taskId = ''

  db_registCode = ''

  db_elevId = ''

  db_workItemList = ''

  db_baseInfo = ''

  db_environmentState = ''

  db_sysCompPartState = ''

  db_elevState = ''

  db_stopDuration = ''

  db_timeoutRule = ''

  taskInfo = new Elevator_TaskInfo()
}
