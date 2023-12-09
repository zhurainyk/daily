<script setup>
import {reactive} from 'vue'
import CapsuleChart from './capsuleChart.vue'; //胶囊柱图

const config1 = reactive({
  lineWidth: 24,
  digitalFlopStyle: {
    fill: 'pink',
  },
  data: [
    {
      name: '杭州',
      value: 98,
    },
    {
      name: '金华',
      value: 150,
    },
    {
      name: '宁波',
      value: 62,
    },
    {
      name: '太原',
      value: 54,
    },
  ],
})

</script>

<template>
    <div class="module-box">
        <!-- 一行二等分 -->
        <div style="flex: 0 1 25%">
            <dv-border-box11 
            style="width:100%;height:300px;" title="资源分析"  :title-width="200" :animate="true" >
            <dv-active-ring-chart :config="config1" style="width:100%;height:300px" />
        </dv-border-box11>

            <dv-border-box12 title="dv-border-box-11" 
            style="width:100%;height:300px;" >
                <dv-button :bg="false" >智慧城市</dv-button>
                <CapsuleChart height="260px" padding="20px"/>
            </dv-border-box12>
        </div>

        <div style="flex: 0 1 50%">
            <dv-border-box12 title="dv-border-box-11" 
            style="width:100%;height:600px;" ></dv-border-box12>
        </div>

        <div style="flex: 0 1 25%">
            <dv-border-box12 title="dv-border-box-11" 
            style="width:100%;height:200px;">
                <dv-button :bg="false" >智慧城市</dv-button>
                <CapsuleChart height="160px" padding="20px"/>
            </dv-border-box12>

            <dv-border-box11 title="dv-border-box-11" 
            style="width:100%;height:400px;" 
            :title-width="200" :animate="true"></dv-border-box11>
        </div>

    </div>
</template>
<style>
</style>