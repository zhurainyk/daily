<template>
  <div class="home">
    <button @click="returnCountry">返回全国</button>
    <div class="mapp">
      <aMap :reContry="reContry"></aMap>
    </div>
  </div>
</template>

<script>
import aMap from './components/amap.vue'

export default {
  name: "home",
  components: { aMap }, // 引入注册
  data() {
    return {
      reContry: true
    }
  },
  methods: {
    //点击全国按钮
    returnCountry() {
      this.reContry = true;
      setTimeout(() => {
        this.reContry = false;
      }, 500);
    },
  }
} 
</script>

<style scoped  >
.mapp {
  width: 48vw;
  height: 69vh;
  z-index: 2;
}
</style>
