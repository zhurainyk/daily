export class AddModel implements IAddModel {
  fnArgs?: any

  multiple = false

  multipledata: any[] = []

  multiplefn?: any

  name = ''

  dbkey = ''

  isSelect = false

  isreuqired = false

  isRules = false

  fn?: any

  changefn?: any

  list: Array<any> = []

  type?: string | undefined

  filekey?: string | undefined

  isNotshowKey?: boolean | undefined

  isDisable?: boolean | undefined;

  [x: string]: any
}
