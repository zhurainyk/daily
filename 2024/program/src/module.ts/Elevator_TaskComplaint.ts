import { Elevator_TaskInfo } from './Elevator_TaskInfo'

export class Elevator_TaskComplaint implements IElevator_TaskComplaint {
  db_id = ''

  db_taskId = ''

  db_complaintUser = ''

  db_complaintObject = ''

  db_complaintType = ''

  db_complaintDesc = ''

  db_complaintLevel = ''

  db_dealUserId = ''

  db_dealState = ''

  db_dealContent = ''

  ui_dealUserName = ''

  taskInfo = new Elevator_TaskInfo()
}
