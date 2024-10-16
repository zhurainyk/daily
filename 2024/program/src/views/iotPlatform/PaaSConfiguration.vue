<template>
  <div class="mian">
    <PaasItem></PaasItem>
    <PaasItem></PaasItem>
    <PaasItem></PaasItem>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PaasItem from './components/PaasItem'

export default defineComponent({
  components: { PaasItem },
  setup() {}
})
</script>

<style lang="scss" scoped>
.mian {
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  > div {
    margin-left: 20px;
    margin-top: 20px;
  }
}
</style>
