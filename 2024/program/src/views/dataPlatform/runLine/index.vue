<template>
  <div id="data-runline">
    <div class="project">
      <div class="item">
        <div class="runline">
          <monthline :lineId="'runlineflool1-1'" :data="$data.floor1_1.data" :areaColor="$data.floor1_1.areaColor"
            :lineColor="$data.floor1_1.lineColor" :xKey="'day'" :tooltip="'日'" :interval='5' :title="byProject + '运行次数'"
            style="width: 280px; height: 280px; margin-left: 15px"></monthline>
        </div>
      </div>
      <div class="item">
        <div class="runline">
          <monthline :lineId="'runlineflool1-2'" :title="byProject + '运行时长'" :data="$data.floor1_2.data"
            :areaColor="$data.floor1_2.areaColor" :xKey="'day'" :tooltip="'日'" :interval='5'
            :lineColor="$data.floor1_2.lineColor" style="width: 280px; height: 280px; margin-left: 15px"></monthline>
        </div>
      </div>
      <div class="item">
        <div class="runline">
          <monthline :lineId="'runlineflool1-3'" :title="byProject + '开门次数'" :data="$data.floor1_3.data"
            :areaColor="$data.floor1_3.areaColor" :xKey="'day'" :tooltip="'日'" :interval='5'
            :lineColor="$data.floor1_3.lineColor" style="width: 280px; height: 280px; margin-left: 15px"></monthline>
        </div>
      </div>
      <div class="item">
        <div class="runline">
          <monthline :lineId="'runlineflool1-4'" :title="byProject + '运行里程'" :data="$data.floor1_4.data"
            :areaColor="$data.floor1_4.areaColor" :xKey="'day'" :tooltip="'日'" :interval='5'
            :lineColor="$data.floor1_4.lineColor" style="width: 280px; height: 280px; margin-left: 15px"></monthline>
        </div>
      </div>
    </div>
    <div class="select">
      <el-select filterable v-model="currentProjectId" class="m-2 selectcontent" placeholder="请选择项目" size="small" style="
          background: transparent;
          line-height: 40px;
          color: #fff;
          font-size: 16px;
        " @change="changeProject">
        <el-option v-for="(item, index) in options" :key="index" :label="item.name" :value="item.id" />
      </el-select>
    </div>
    <div class="noproject">
      <div class="item">
        <div class="runline">
          <monthline :lineId="'runlinefloor2_1'" :title="total + '运行次数'" :data="$data.floor2_1.data"
            :areaColor="$data.floor2_1.areaColor" :xKey="'day'" :tooltip="'日'" :interval='5'
            :lineColor="$data.floor2_1.lineColor" style="width: 280px; height: 280px; margin-left: 15px"></monthline>
        </div>
      </div>
      <div class="item">
        <div class="runline">
          <monthline :title="total + '运行时长'" :lineId="'runlinefloor2_2'" :data="$data.floor2_2.data"
            :areaColor="$data.floor2_2.areaColor" :xKey="'day'" :tooltip="'日'" :interval='5'
            :lineColor="$data.floor2_2.lineColor" style="width: 280px; height: 280px; margin-left: 15px"></monthline>
        </div>
      </div>
      <div class="item">
        <div class="runline">
          <monthline :title="total + '开门次数'" :lineId="'runlinefloor2_3'" :data="$data.floor2_3.data"
            :areaColor="$data.floor2_3.areaColor" :xKey="'day'" :tooltip="'日'" :interval='5'
            :lineColor="$data.floor2_3.lineColor" style="width: 280px; height: 280px; margin-left: 15px"></monthline>
        </div>
      </div>
      <div class="item">
        <div class="runline">
          <monthline :title="total + '运行里程'" :lineId="'runlinefloor2_4'" :data="$data.floor2_4.data"
            :areaColor="$data.floor2_4.areaColor" :xKey="'day'" :tooltip="'日'" :interval='5'
            :lineColor="$data.floor2_4.lineColor" style="width: 280px; height: 280px; margin-left: 15px"></monthline>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed, ref, watch } from "vue";
import monthline from '../project/monthline.vue'
import * as echarts from 'echarts'
import { ElMessage } from 'element-plus'
import { getDataApi } from '@/api/module/dataPlatform'
import { getProjectList } from '@/api/module/customerBI'
const $data = reactive({
  floor1_1: {
    data: [{ month: 5, data: 6, }, { month: 6, data: 33, }, { month: 7, data: 16, }, { month: 8, data: 26, }, { month: 9, data: 10, }],
    lineColor: 'rgba(25,163,223,1)',
    areaColor: ["#016bb9", "#01234c"],
  },
  floor1_2: {
    data: [{ month: 5, data: 6, }, { month: 6, data: 33, }, { month: 7, data: 16, }, { month: 8, data: 26, }, { month: 9, data: 10, }],
    lineColor: 'rgba(25,163,223,1)',
    areaColor: ["#016bb9", "#01234c"],
  },
  floor1_3: {
    data: [{ month: 5, data: 6, }, { month: 6, data: 33, }, { month: 7, data: 16, }, { month: 8, data: 26, }, { month: 9, data: 10, }],
    lineColor: 'rgba(25,163,223,1)',
    areaColor: ["#016bb9", "#01234c"],
  },
  floor1_4: {
    data: [{ month: 5, data: 6, }, { month: 6, data: 33, }, { month: 7, data: 16, }, { month: 8, data: 26, }, { month: 9, data: 10, }],
    lineColor: 'rgba(25,163,223,1)',
    areaColor: ["#016bb9", "#01234c"],
  },
  floor2_1: {
    data: [{ month: 5, data: 6, }, { month: 6, data: 33, }, { month: 7, data: 16, }, { month: 8, data: 26, }, { month: 9, data: 10, }],
    lineColor: 'rgba(25,163,223,1)',
    areaColor: ["#016bb9", "#01234c"],
  },
  floor2_2: {
    data: [{ month: 5, data: 6, }, { month: 6, data: 33, }, { month: 7, data: 16, }, { month: 8, data: 26, }, { month: 9, data: 10, }],
    lineColor: 'rgba(25,163,223,1)',
    areaColor: ["#016bb9", "#01234c"],
  },
  floor2_3: {
    data: [{ month: 5, data: 6, }, { month: 6, data: 33, }, { month: 7, data: 16, }, { month: 8, data: 26, }, { month: 9, data: 10, }],
    lineColor: 'rgba(25,163,223,1)',
    areaColor: ["#016bb9", "#01234c"],
  },
  floor2_4: {
    data: [{ month: 5, data: 6, }, { month: 6, data: 33, }, { month: 7, data: 16, }, { month: 8, data: 26, }, { month: 9, data: 10, }],
    lineColor: 'rgba(25,163,223,1)',
    areaColor: ["#016bb9", "#01234c"],
  },
})
const total = ref('')
const byProject = ref('汇总')

onMounted(() => {
  getProjectAPI()
  getStatisticAPI()

})
const getStatisticAPI = (projectid = '') => { // 右侧列表
  getDataApi([
    { freq: '01', dateTime: '', projectid: projectid, funcType: 'A037', count: '30', regionCode: '', iscurrentDate: '0' },
    { freq: '01', dateTime: '', projectid: projectid, funcType: 'A038', count: '30', regionCode: '', iscurrentDate: '0' },
    { freq: '01', dateTime: '', projectid: projectid, funcType: 'A039', count: '30', regionCode: '', iscurrentDate: '0' },
    { freq: '01', dateTime: '', projectid: projectid, funcType: 'A040', count: '30', regionCode: '', iscurrentDate: '0' },
  ]).then(res => {
    console.log('返回数据2：', res.data.data)
    // if(res.data.data.)
    if (res?.data?.data) {
      const data = res.data.data;
      if (projectid) {
        $data.floor2_1.data = []
        $data.floor2_1.data.push(...data.A037.data)
        $data.floor2_2.data = []
        $data.floor2_2.data.push(...data.A038.data)
        $data.floor2_3.data = []
        $data.floor2_3.data.push(...data.A040.data)
        $data.floor2_4.data = []
        $data.floor2_4.data.push(...data.A039.data)
      } else {
        $data.floor1_1.data = []
        $data.floor1_1.data.push(...data.A037.data)
        $data.floor1_2.data = []
        $data.floor1_2.data.push(...data.A038.data)
        $data.floor1_3.data = []
        $data.floor1_4.data = []
        $data.floor1_3.data.push(...data.A040.data)
        $data.floor1_4.data.push(...data.A039.data)
      }
    }
  })

}
const currentProjectId = ref('')
const changeProject = (e, x, y) => {

  currentProjectId.value = e
  total.value = '' //options.find(x => x.id == e).name
}
watch(currentProjectId, newVal => {
  getStatisticAPI(newVal)
})
const options = reactive([])
const initEcharts = (graphList) => {


}
const getProjectAPI = (noloading = {}) => { // 获取项目
  // loading = $loading('#customer-bi')
  getProjectList(noloading).then(res => {
    console.log(res.data.data.length === 0, 'xxxx')
    if (res.data?.token) {
      // token = res.data.token
      // console.log({ token })
      // elevatorData.token = token

    }
    if (res.data.data?.length) {
      options.push(...res.data.data)
      currentProjectId.value = res.data.data[0].id
      total.value = res.data.data[0].name

    }
    else {
      if (res.data.data?.length === 0) {
        // loading.close()
      } else {
        ElMessage.error('项目列表获取失败')
        // if (loading?.close) {
        //     loading.close()
        // }
      }

    }
  }).catch(e => {
    console.log({ e })
    // ElMessage.error('服务器错误')
  })
}
</script>

<style lang="scss" scoped>
#data-runline {
  width: 100%;
  height: calc(100% - 70px);

  box-sizing: border-box;

  .project,
  .noproject {
    display: flex;

    .item {
      margin-right: 20px;
    }

    align-content: center;
  }

  .select {
    width: 301px;
    height: 34px;
    margin: 30px 0;
    position: relative;
    top: 14px;
    left: 547px;
    overflow: hidden;
    border: 1px solid rgba(0, 154, 252, 0.5);
    box-shadow: 0 0 3px 1px rgb(37, 169, 245);
    transform: skew(-25deg, 0deg);

    .selectcontent {
      margin-left: 20px;
      width: 200px;
      height: 40px;
      transform: skew(25deg, 0deg);
      border: none;
      outline: none;
      background-color: transparent;

      :deep() .el-input__wrapper {
        background: transparent;
        border: none;
        font-weight: bold;
        box-shadow: none !important;
      }

      :deep().el-select__icon {
        color: #29b6ff;
      }

      :deep() .el-input__inner {
        color: #29b6ff;
        font-size: 16px;
        font-weight: bold;
      }

      :deep() .el-select.el-input.is-focus.el-input__wrapper {
        box-shadow: none !important;
      }

      :deep() .el-input--small {
        --el-input-height: '';
      }
    }
  }
}
</style>