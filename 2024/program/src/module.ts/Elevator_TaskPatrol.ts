import { Elevator_TaskInfo } from './Elevator_TaskInfo'

export class Elevator_TaskPatrol implements IElevator_TaskPatrol {
  db_id = ''

  db_taskId = ''

  db_registCode = ''

  db_elevId = ''

  db_problemList = ''

  db_stopDuration = ''

  db_timeoutRule = ''

  taskInfo = new Elevator_TaskInfo()
}
