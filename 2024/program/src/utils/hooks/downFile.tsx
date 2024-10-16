import { saveAs } from 'file-saver'
import moment from 'moment'
import { Workbook } from 'exceljs'

const useDownFileHooks = () => {
  const downFileByArrays = async (
    args: Array<any>,
    list: Array<any>,
    fileName = ''
  ) => {
    const workbook = new Workbook()
    const sheet = workbook.addWorksheet(fileName)
    const head: any = []
    args.forEach(h => {
      head.push(h.name)
    })
    sheet.addRow(head)
    list.forEach((r: any) => {
      const temp: any = []
      args.forEach((h: any) => {
        if (h.fn) {
          temp.push(h.fn(r))
        } else {
          temp.push(r[h.dbkey])
        }
      })
      sheet.addRow(temp)
    })
    const buffers = await workbook.xlsx.writeBuffer()
    saveAs(
      new Blob([buffers]),
      `${fileName} ${moment().format('YYYY-MM-DD')}.xlsx`
    )
  }

  return {
    downFileByArrays
  }
}

export default useDownFileHooks
