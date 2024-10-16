<template>
  <div class="day-left">
    <div class="head">
      <div>
        <div>
          <label>使用单位:</label>
          <span>15</span>
        </div>
        <div>
          <label>电梯数量:</label>
          <span>15</span>
        </div>
      </div>

      <div>
        <div>
          <label>网关:</label>
          <span>15</span>
        </div>
        <div>
          <label>传感器:</label>
          <span>15</span>
        </div>
      </div>

      <div>
        <div>
          <label>摄像头:</label>
          <span>15</span>
        </div>
        <div>
          <label>员工:</label>
          <span>15</span>
        </div>
      </div>
    </div>
    <div id="main" class="body"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import * as echarts from 'echarts'

type EChartsOption = echarts.EChartsOption
export default defineComponent({
  name: 'DayLeft',
  setup() {
    let option: EChartsOption
    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
      },
      series: [
        {
          name: '2011',
          type: 'bar',
          data: [18203, 23489, 29034, 104970, 131744, 630230]
        },
        {
          name: '2012',
          type: 'bar',
          data: [19325, 23438, 31000, 121594, 134141, 681807]
        }
      ]
    }
    onMounted(() => {
      const chartDom = document.getElementById('main')!
      const myChart = echarts.init(chartDom)
      myChart.setOption(option)
    })
  }
})
</script>

<style lang="scss" scoped>
.day-left {
  height: 100%;
  width: 400px;
  background-color: $p-color-primary-deep;
  .head {
    height: 200px;

    > div {
      width: 100%;
      display: flex;
      > div {
        flex: 1;
      }
    }
    label {
      color: white;
      font-size: 24px;
    }
    span {
      color: white;
      font-size: 24px;
    }
  }
  .body {
    height: calc(100% - 200px);
  }
}
</style>
