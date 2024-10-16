<template>
  <div class="dialog-mian min-dialog min-dialog-height qr-dialog">
    <div class="dialog-head">
      <div>
        <label>二维下载</label>
      </div>
      <span class="cancel-img" @click="closeDialogFn"></span>
    </div>
    <div class="dialog-body">
      <div class="commemt">
        <div>
          <label>规格</label>
          <el-select v-model="selectoptions" clearable @change="changeOptions">
            <el-option
              v-for="x in options"
              :key="x.value"
              :value="x.value"
              :label="x.label"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <label>页面数</label>
          <el-input-number
            v-model="pagemodal.pagecount"
            type="number"
            min="0"
            max="100"
          ></el-input-number>
        </div>
      </div>
    </div>
    <div>
      <div class="dialog-footer">
        <el-button @click="closeDialogFn">取消 </el-button>
        <el-button type="primary" @click="save">确定 </el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { saveAs } from 'file-saver'
import { ElMessage } from 'element-plus'
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  ImageRun,
  Table,
  TableRow,
  TableCell
} from 'docx'
import QRCode from 'qrcode'
import { saveListApi, getApiUrlApi } from '@/api/module/qrcode'

export default defineComponent({
  emits: ['close-dialog', 'save-data', 'cancel-data'],
  setup(props, { emit }) {
    const closeDialogFn = () => {
      emit('close-dialog')
    }
    const pagemodal = reactive({
      with: 5,
      height: 7,
      pagecount: 1,
      docwith: 100
    })
    const selectoptions = ref('00')
    let baseurl = ''
    const changeOptions = val => {
      pagemodal.height = 0
      pagemodal.with = 0
      pagemodal.docwith = 0
      if (val) {
        const temp = options.find(x => x.value == val)
        pagemodal.height = temp?.height || 0
        pagemodal.with = temp?.with || 0
        pagemodal.docwith = temp?.docwith || 0
      }
    }
    const options = reactive([
      {
        value: '05',
        label: '1*1',
        pagesize: 1,
        with: 1,
        height: 1,
        docwith: 550
      },
      {
        value: '04',
        label: '1*2',
        pagesize: 2,
        with: 1,
        height: 2,
        docwith: 400
      },
      {
        value: '03',
        label: '2*3',
        pagesize: 6,
        with: 2,
        height: 3,
        docwith: 300
      },
      {
        value: '02',
        label: '3*4',
        pagesize: 12,
        with: 3,
        height: 4,
        docwith: 200
      },
      {
        value: '00',
        label: '5*7',
        pagesize: 35,
        with: 5,
        height: 7,
        docwith: 100
      },
      {
        value: '01',
        label: '10*13',
        pagesize: 130,
        with: 10,
        height: 13,
        docwith: 50
      }
    ])

    const save = () => {
      emit('save-data')
      generate()
      closeDialogFn()
    }
    const generate = async () => {
      if (!selectoptions.value) return
      const opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1
      }
      if (!baseurl) {
        let tempurl = await getApiUrlApi({})
        baseurl = tempurl.data.apiurl
      }

      const x = await saveListApi({
        num: pagemodal.pagecount * pagemodal.with * pagemodal.height
      })
      let arr = []
      if (x.data.success) {
        arr = x.data.data
      } else {
        return
      }

      let row1: any = []
      for (let index1 = 0; index1 < pagemodal.pagecount; index1++) {
        for (let index = 1; index <= pagemodal.height; index++) {
          const tempp = new TableRow({ children: [] })
          row1.push(tempp)
          for (let index2 = 1; index2 <= pagemodal.with; index2++) {
            const url = await QRCode.toDataURL(
              `${baseurl}/static/wechat?bind_id=${
                arr[
                  index1 * pagemodal.height * pagemodal.with +
                    pagemodal.with * (index - 1) +
                    index2 -
                    1
                ]
              }`,
              opts
            )
            tempp.addChildElement(
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new ImageRun({
                        data: url,
                        transformation: {
                          width: pagemodal.docwith,
                          height: pagemodal.docwith
                        }
                      })
                    ]
                  })
                ]
              })
            )
          }
        }
      }
      let row = new Table({ rows: row1, margins: { left: 10 } })
      const doc = new Document({
        sections: [
          {
            children: [row]
          }
        ]
      })
      Packer.toBlob(doc).then(blob => {
        saveAs(blob, '二维码.docx')
        ElMessage.success('成功')
      })
    }
    return {
      closeDialogFn,
      save,
      options,
      selectoptions,
      changeOptions,
      pagemodal
    }
  }
})
</script>

<style lang="scss" scoped>
.qr-dialog {
  .commemt {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
    > div {
      padding: 0 0 20px 0;
      display: flex;
      flex-wrap: wrap;
      width: 400px;
      label {
        margin-bottom: 10px;
        width: 100%;
      }
      > div {
        width: 100%;
      }
    }
  }
}
</style>
