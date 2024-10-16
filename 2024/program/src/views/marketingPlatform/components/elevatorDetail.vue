<template>
  <div class="elevator-detail-mian">
    <ElevatorDetail></ElevatorDetail>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ElevatorDetail from '@/components/elevator/ElevatorDetail'

export default defineComponent({
  components: { ElevatorDetail },
  setup() {}
})
</script>

<style lang="scss" scoped>
.elevator-detail-mian {
  width: 100%;
}
</style>
