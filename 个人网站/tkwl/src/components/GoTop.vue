<template>
  <div id="GoTop" @click="GoTop()"  v-if="isShow">
    <span class="glyphicon glyphicon-chevron-up"></span>
  </div>
</template>

<script setup name="GoTop">
import { ref ,onMounted, computed,onBeforeUnmount } from 'vue'
const flag = ref(false)
function GoTop() {
  ;(function smoothscroll() {
    var currentScroll =
      document.documentElement.scrollTop || document.body.scrollTop
    console.log(currentScroll)
    if (currentScroll > 0) {
      window.requestAnimationFrame(smoothscroll)
      window.scrollTo(0, currentScroll - currentScroll / 10)
    }
  })()
}
const isShow = computed(()=>{
  return scrolltop.value > 100 
})
const scrolltop = ref(0)
const scrollToTop = ()=>{
   scrolltop.value =   document.documentElement.scrollTop || document.body.scrollTop
  console.log(scrolltop)
}
onMounted(()=>{
  scrollToTop()
  window.addEventListener('scroll',  scrollToTop) 
  
})
onBeforeUnmount(()=>{
  window.removeEventListener('scroll',  scrollToTop)
})
</script>

<style scoped>
#GoTop {
  width: 50px;
  height: 50px;
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 99999999;
  cursor: pointer; 
   
} 


#GoTop > span {
  display: block;
  width: 100%;
  height: 100%;
  color: #6C2AE6;
  font-size: 30px;
}
</style>
