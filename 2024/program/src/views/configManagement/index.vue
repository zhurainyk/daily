<template>
  <div class="mian">
    <ConfigItem></ConfigItem>
    <ConfigItem></ConfigItem>
    <ConfigItem></ConfigItem>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ConfigItem from './components/ConfigItem'

export default defineComponent({
  components: { ConfigItem },
  setup() {}
})
</script>

<style lang="scss" scoped>
.mian {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  > div {
    margin: 20px 0 0 20px;
  }
}
</style>
