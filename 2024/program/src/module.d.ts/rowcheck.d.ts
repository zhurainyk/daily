declare class IRowCheck {
  check: boolean

  rowMessageList: Array<any>

  rowCheckListMap: Map<string, Array<IRowCheck>>

  columnMessageMap: Map<string, string>

  isNext: string
}
