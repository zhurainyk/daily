

<template>

  <div id="routerview">
    <router-view></router-view>
  </div>
 
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router'
 
</script>
<style   lang="scss">
 #routerview{
  width:100%;
  padding:0 20px;
  box-sizing: border-box;
 }
</style>
