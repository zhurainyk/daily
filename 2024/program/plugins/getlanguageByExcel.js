const ExcelJS = require('exceljs')
const fs = require('fs')
const path = require('path')

const pathurl = path.join(__dirname, '多语言文档.xlsx')
const workbook = new ExcelJS.Workbook()
workbook.xlsx.readFile(pathurl).then(data => {
    data.eachSheet((worksheet, sheetId) => {

    })
})
