<template>
  <div class="img-list">
    <img v-for="x in imgs" :src="x" :key="x" @click="onpenImg(x)" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    imgs: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup() {
    const onpenImg = url => {
      if (!url) return
      const image = new Image()
      image.src = url
      const imwindow = window.open(url)
      imwindow?.document.write(image.outerHTML)
    }
    return {
      onpenImg
    }
  }
})
</script>

<style lang="scss">
.img-list {
  height: 600px;
  border-radius: 10px;
  padding: 10px;
  img {
    height: 100px;
    width: 100px;
    margin-right: 12px;
  }
}
</style>
