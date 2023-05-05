<template>
  <div class="container">
    <!-- <vr-demo></vr-demo> -->
    <!-- <beach-demo /> -->
    <!-- <islandDemo></islandDemo> -->
    <!-- <bear></bear> -->
    <!-- <car></car> -->
    <!-- <city></city> -->
    <!-- <d3card></d3card> -->
    <robot></robot>
  </div>
</template>

<script setup>
 import vrDemo from './components/vr-demo.vue' //vr 看板
 import beachDemo from './components/beach-demo.vue' //海滩球体映射
 import islandDemo from './components/island-demo.vue' //人工小岛
 import bear from './components/bear.vue' //水晶熊
 import car from './components/car.vue' //宝马汽车展示
 import city from './components/city.vue' //乡村城市
 import d3card from './components/d3Card.vue' //3d贺卡
 import robot from './components/robot.vue' //镜面光阵机器人
 
</script>

<style>
 *{
  margin: 0;
  padding: 0;
 }
 .container{
  width:100vw;
  height:100vh;
 }
</style>
