<template>
  <div class="cam">
    <hlsplayer v-if="isHls" ref="newplayer" :URL="$data.url" style="width:391px;height:210px; ">
    </hlsplayer>
    <flvplayer v-if="isFlv" ref="newplayer" :url="$data.url" style="width:391px;height:210px; ">
    </flvplayer>
  </div>
</template>
<script setup>
import hlsplayer from './components/hlsplayer.vue'
import flvplayer from './components/flvplayer.vue'
import { onMounted, computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const props = defineProps({
  url: {
    type: String,
    default: ''
  }
})

const isHls = ref(false)
const isFlv = ref(false)
let route = useRoute()
let router = useRouter()
const $data = reactive({
  url: ''
})
onMounted(() => {
  console.log('H5显示')
  setTimeout(() => {
    console.log(route.query)
    const query = route.query.x

    if (query) {
      console.log({ query })
      const o = JSON.parse(query)
      isHls.value = o.isHls
      isFlv.value = o.isFlv
      setTimeout(() => {

        $data.url = o.url;
      })
      console.log('参数：', o)
    }

  })
})




</script>
<style scoped> .cam {
   width: 391px;
   height: 210px;
   background-color: rgb(28, 40, 59);
 }
</style>