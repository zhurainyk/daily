<template>
  <div class="day-right">
    <div class="day-device">
      <div class="head">
        <div>
          <label>物联网设备总数:25</label>
        </div>
        <div>
          <label>更多</label>
        </div>
      </div>
      <div class="body">
        <div id="id1"></div>
        <div id="id2"></div>
        <div id="id3"></div>
      </div>
    </div>

    <div class="day-device-status">
      <div class="head">
        <div>
          <label>电梯健康状态</label>
        </div>
        <div>
          <label>更多</label>
        </div>
      </div>
      <div class="body">
        <div id="id4"></div>
        <div id="id5"></div>
        <div id="id6"></div>
        <div id="id7"></div>
        <div id="id8"></div>
      </div>
    </div>

    <div class="day-map">
      <div class="head">
        <div>
          <label>梯年龄分布</label>
        </div>
        <div>
          <label></label>
        </div>
      </div>
      <div class="body line">
        <div id="id9"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import * as echarts from 'echarts'

type EChartsOption = echarts.EChartsOption
export default defineComponent({
  name: 'DayRitht',
  setup() {
    let option: EChartsOption
    let option1: EChartsOption
    option = {
      tooltip: {
        trigger: 'item'
      },

      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' }
          ]
        }
      ]
    }
    option1 = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    }
    onMounted(() => {
      const chartDom = document.getElementById('id1')!
      const myChart = echarts.init(chartDom)
      myChart.setOption(option)

      const chartDom1 = document.getElementById('id2')!
      const myChart1 = echarts.init(chartDom1)
      myChart1.setOption(option)

      const chartDom2 = document.getElementById('id3')!
      const myChart2 = echarts.init(chartDom2)
      myChart2.setOption(option)

      const chartDom3 = document.getElementById('id4')!
      const myChart3 = echarts.init(chartDom3)
      myChart3.setOption(option)

      const chartDom4 = document.getElementById('id5')!
      const myChart4 = echarts.init(chartDom4)
      myChart4.setOption(option)

      const chartDom5 = document.getElementById('id6')!
      const myChart5 = echarts.init(chartDom5)
      myChart5.setOption(option)

      const chartDom6 = document.getElementById('id7')!
      const myChart6 = echarts.init(chartDom6)
      myChart6.setOption(option)

      const chartDom7 = document.getElementById('id8')!
      const myChart7 = echarts.init(chartDom7)
      myChart7.setOption(option)

      const chartDom8 = document.getElementById('id9')!
      const myChart8 = echarts.init(chartDom8, undefined, {
        renderer: 'svg',
        width: undefined,
        height: undefined
      })
      myChart8.setOption(option1)
    })
  }
})
</script>

<style lang="scss" scoped>
.day-right {
  height: 100%;
  width: 300px;
  background-color: $p-color-primary-deep;
  .day-device {
    height: 200px;
    width: 100%;
  }
  .day-device-status {
    width: 100%;
    height: calc(100% - 400px);
  }
  .day-map {
    width: 100%;
    height: 200px;
  }
  .head {
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    label {
      color: white;
    }
  }
  .body {
    height: calc(100% - 20px);
    display: flex;
    flex-wrap: wrap;
    &.line {
      > div {
        width: 100%;
        height: 100%;
      }
    }
    > div {
      height: 100px;
      width: 100px;
    }
  }
}
</style>
