import { Elevator_TaskInfo } from './Elevator_TaskInfo'

export class Elevator_TaskOnSite implements IElevator_TaskOnSite {
  db_id = ''

  db_taskId = ''

  db_projectId = ''

  db_projectName = ''

  db_trappedReason = ''

  db_startDate = ''

  db_endDate = ''

  db_duration = ''

  db_onSiteImgUrls = ''

  db_onSiteImgNames = ''

  ui_startDate = ''

  ui_endDate = ''

  taskInfo = new Elevator_TaskInfo()
}
