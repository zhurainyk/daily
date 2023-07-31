<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import GoTop from '@/components/GoTop.vue'
import { onMounted } from 'vue';
// onMounted(() => {
//   let t = window.devicePixelRatio
//   if (!!window.ActiveXObject || "ActiveXObject" in window) {
//     if (t != 1) {
//       alert('您的设备对显示进行放大导致页面显示不完全,请调整后打开/或用其他浏览器')
//     }
//   } else {
//     if (t != 1) {
//       let c = document.querySelector('body')
//       c.style.zoom = -0.62 * t + 1.55;
//     }
//   }
// })
</script>

<template>
 
    <Header></Header>
    <div class="routerview">
      <router-view></router-view>
    </div>
    <Footer></Footer>
    <GoTop></GoTop>
 
</template>

<style scoped>
.routerview{
  width:100%;
  margin:0 auto;
}
</style>

