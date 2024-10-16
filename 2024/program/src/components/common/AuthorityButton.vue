<template>
  <el-button v-if="isHaveAuthority" v-bind="$attrs">
    <slot></slot>
  </el-button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'AuthorityButton',
  props: {
    apiUrl: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const store = useStore()
    const isHaveAuthority = computed(
      () =>
        store.state.menu.menuAuth.findIndex((x: any) => x == props.apiUrl) > -1
    )
    return {
      isHaveAuthority
    }
  }
})
</script>
