<template>
  <div id="data-total" v-if="show">
    <div class="flex total-top">
      <marketing :data="T.marketData"></marketing>
      <centerInfo :data="T.centerData"></centerInfo>
      <project :data="T.projectData"></project>
    </div>
    <div class="flex total-bottom">
      <employ :data="T.emplyData"></employ>
      <internet :data="T.internetData"></internet>
      <supplyChain :data="T.supplyData"></supplyChain>
    </div>
  </div>
</template>

<script  setup >

import marketing from "./marketing.vue";
import employ from "./employ.vue";
import centerInfo from "./centerInfo.vue";
import internet from "./internet.vue";
import project from "./project.vue";
import supplyChain from "./supplyChain.vue";
import { onMounted, defineComponent, reactive, ref, watch } from "vue";
import { getBIData, getDataApi } from '@/api/module/dataPlatform'

let T = reactive({})
// getDataApi([{ freq: '', dateTime: '', projectid: '', funcType: 'A001', count: '', regionCode: '', iscurrentDate: '1' },]).then(res => {

// })
const props = defineProps({
  priorityCode: String
})
const getData = (req = props.priorityCode) => {
  show.value = true
  const arr = [
    { freq: '', dateTime: '', projectid: '', funcType: 'A001', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A002', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A003', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A004', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A005', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A006', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A007', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A008', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A009', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A010', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A011', count: '', regionCode: '', iscurrentDate: '1' },

    { freq: '03', dateTime: '', projectid: '', funcType: 'A012', count: '12', regionCode: '', iscurrentDate: '0' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A013', count: '', regionCode: '', iscurrentDate: '0' },
    { freq: '03', dateTime: '', projectid: '', funcType: 'A014', count: '', regionCode: '', iscurrentDate: '0' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A015', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A016', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '03', dateTime: '', projectid: '', funcType: 'A017', count: '', regionCode: '', iscurrentDate: '0' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A018', count: '', regionCode: '', iscurrentDate: '1' },

    // { freq: '', dateTime: '', projectid: '', funcType: 'A045', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A121', count: '', regionCode: '', iscurrentDate: '1' },//  回召类型分布统计
    { freq: '', dateTime: '', projectid: '', funcType: 'A020', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A021', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A022', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A023', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A024', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A025', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A029', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A031', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A032', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A033', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A034', count: '', regionCode: '', iscurrentDate: '1' },
  ]
  arr.forEach(x => {
    if (x.funcType !== 'A032' && x.funcType !== 'A033' && x.funcType !== 'A034') {
      x.priorityCode = req
    } else {
      x.priorityCode = ''
    }

  })
  getDataApi(arr).then(res => {
    console.log('返回数据：', res.data.data)
    // if(res.data.data.)

    if (res?.data?.data) {
      const data = res.data.data;
      T.marketData = {
        '01': data.A001.data,//对象 {data:[],id:'',name:'电梯品牌分布'}
        '02': data.A002.data,
        '03': data.A003.data
      }


      T.centerData = {
        '01': data.A004.data,
        '02': data.A005.data,
        '03': data.A006.data,
        '04': data.A007.data,
        '05': data.A008.data,
        '06': data.A009.data,
        '07': data.A010.data,
        '08': data.A011.data,
      }

      T.projectData = {
        '0101': data.A013.data,
        '0102': data.A014.data,
        '0103': data.A015.data,
        '0104': data.A016.data,
        '0105': data.A018.data,
        '0106': data.A017.data,
        '02': data.A012.data,
        '03': data.A121.data,
        '04': data.A020.data,
      }

      T.emplyData = {
        '01': data.A021.data,
        '02': data.A023.data,
        '03': data.A022.data,
        '04': data.A024.data,
      }

      T.supplyData = {
        '01': data.A032.data,
        '02': data.A033.data,
        '03': data.A034.data,
      }

      T.internetData = {
        '01': {
          name: '已安装各类型设备数',
          data: [...(data.A025.data?.data || []), ...(data.A029.data?.data || [])]
        },
        '03': data.A031.data
      }
      console.log({ T })

    }
  })

}
watch(() => props.priorityCode, newVal => {
  setTimeout(() => {
    getData(newVal)
  })
})


let show = ref(false)
onMounted(() => {
  console.log('组件挂载')
  show.value = false
  getData()

})
</script>

<style scoped lang='scss'>
#data-total {
  width: 100%;
  height: calc(100% - 70px);
  box-sizing: border-box;
  padding: 0 15px 17px 13px;

  .flex {
    display: flex;


  }

  .modulemarketing {}

  .total-top {
    margin-bottom: 15px;
  }
}
</style>