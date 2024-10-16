<template>
  <div class="scule-mian">
    <SculeItem></SculeItem>
    <SculeItem></SculeItem>
    <SculeItem></SculeItem>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SculeItem from './components/SculeItem'

export default defineComponent({
  components: { SculeItem },
  setup() {}
})
</script>

<style lang="scss" scoped>
.scule-mian {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  > div {
    margin: 20px 0 0 20px;
  }
}
</style>
