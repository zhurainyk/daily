import printJS from 'print-js'

export const batchprint = id => {
  const style = '@page {margin-top:5mm;margin-bottom:0mm};' // 打印时去掉眉页眉尾
  printJS({
    printable: id, // 标签元素id
    type: 'html',
    header: '',
    style,
    targetStyles: ['*']
  })
}
