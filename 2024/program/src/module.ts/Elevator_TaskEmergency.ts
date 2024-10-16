import { Elevator_TaskInfo } from './Elevator_TaskInfo'

export class Elevator_TaskEmergency implements IElevator_TaskEmergency {
  db_id = ''

  db_taskId = ''

  db_registCode = ''

  db_elevId = ''

  db_lastMaintRunTimes = ''

  db_lastMaintRunDuration = ''

  db_lastMaintDuration = ''

  db_lastMaintDoorTimes = ''

  db_lastMaintRunMileage = ''

  db_hisMaintRecords = ''

  db_lastEmergencyRunTimes = ''

  db_lastEmergencyRunDuration = ''

  db_lastEmergencyDuration = ''

  db_lastEmergencyDoorTimes = ''

  db_lastEmergencyRunMileage = ''

  db_hisEmergencyRecords = ''

  db_lastRepairRunTimes = ''

  db_lastRepairRunDuration = ''

  db_lastRepairDuration = ''

  db_lastRepairDoorTimes = ''

  db_lastRepairRunMileage = ''

  db_hisRepairRecords = ''

  db_trappedTime = ''

  db_alarmTime = ''

  db_trappedUser = ''

  db_rescueLevel = ''

  db_policeTime = ''

  db_arriveTime = ''

  db_rescueTime = ''

  db_alarmNumber = ''

  db_trappedReason = ''

  db_timeoutRule = ''

  ui_trappedTime = ''

  ui_alarmTime = ''

  ui_policeTime = ''

  ui_arriveTime = ''

  ui_rescueTime = ''

  taskInfo = new Elevator_TaskInfo()
}
