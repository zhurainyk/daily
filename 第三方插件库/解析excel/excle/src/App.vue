<template>
  <div id="app">
    <el-upload action accept=".xlsx, .xls" :auto-upload="false" :show-file-list="false" :on-change="handle">
      <el-button type="primary">上传EXCEL</el-button>
    </el-upload>
    <download-excel class="export-excel-wrapper" :data="json_data" :fields="json_fields" type="xls"
      worksheet="My Worksheet" name="相同商品">
      <el-button>导出EXCEL</el-button>
    </download-excel>
  </div>
</template>
 
<script>
import * as XLSX from 'xlsx/xlsx.mjs'
export default {
  name: 'App',
  data() {
    return {
      // json_fields: {
      //   年龄: "age", //常规字段
      //   姓名: "info.name", //支持嵌套属性
      //   密码: {
      //     field: "info.phone",
      //     //自定义回调函数
      //     callback: value => {
      //       return `+86 ${value}`;
      //     }
      //   }
      // },
      json_fields: {
        '相同商品编号': 'id'
      },
      json_data: []
      // json_data: [
      //   {
      //     age: 22,
      //     info: {
      //       name: "张三",
      //       phone: 12222222222
      //     },
      //     sex: "男"
      //   },
      //   {
      //     age: 23,
      //     info: {
      //       name: "李四",
      //       phone: 13333333333
      //     },
      //     sex: "女"
      //   }
      // ]

    }
  },
  methods: {
    readFile(file) {//文件读取
      return new Promise(resolve => {
        let reader = new FileReader();
        reader.readAsBinaryString(file);//以二进制的方式读取
        reader.onload = ev => {
          resolve(ev.target.result);
        }
      })
    },
    async handle(ev) {
      let file = ev.raw;
      if (!file) {
        alert('文件打开失败')
        return;
      } else {
        this.$message.info('开始解析文件')
        let mark = true 
        try {
          let data = await this.readFile(file);
          let workbook = XLSX.read(data, { type: "binary" });
          let worksheet = workbook.Sheets[workbook.SheetNames[0]];
          let result = XLSX.utils.sheet_to_json(worksheet);
          const titles = Object.keys(result[0])
          let allData = {}
          titles.forEach(key => {
            allData[key] = []
          })
          result.forEach(item => {
            titles.forEach(key => {
              if (item[key]) {
                allData[key].push(item[key])
              }
            })
          })
          console.log(allData)
          const lengsO = {}
          let minkey = null
          let minValue = null
          titles.forEach(key => {
            const len = allData[key].length
            lengsO[key] = len
            if (minValue === null) {
              minValue = len
              minkey = key
            }
            if (minValue > len) {
              minValue = len
              minkey = key
            }
          })
          const filterData = allData[minkey].reduce((pre, cur) => {

            const _title = titles.filter(x => x != minkey) //过滤掉拿出来对比的那一项
            let isIn = true  //默认存在 如果有一项不存在 就不是共同的 
            _title.forEach((key) => {
              const arr = allData[key]
              if (!arr.includes(cur)) {
                isIn = false
              }
            })
            if (isIn) {
              pre.push(cur)
            }
            return pre;
          }, [])
          console.log(filterData);
          this.json_data = []
          if (filterData.length) {
            filterData.forEach(item => {
              let o = { id: item }
              this.json_data.push(o)
            })
          }
        } catch (e) {
          mark = false 
          this.$message.success('解析失败')
        }finally{
          if(mark){
            setTimeout(()=>{
              this.$message.success('文件解析完成')
            },1000)
          }
          
        }

      }
    }
  }
}
</script>
 
<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
}

.export-excel-wrapper {
  margin: 0 20px;
}
</style>