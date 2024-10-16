<template>
  <div class="tag-mian">
    <TagItem v-for="x in tags" :key="x.type" :item="x"></TagItem>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import TagItem from './components/TagItem'
import { getTagsApi } from '@/api/module/tags'

export default defineComponent({
  components: { TagItem },
  setup() {
    const tags = ref([])
    onMounted(() => {
      getTagsApi({}).then(x => {
        console.log(x)
        if (x.data.success) {
          tags.value = x.data.data
        }
      })
    })
    return {
      tags
    }
  }
})
</script>

<style lang="scss" scoped>
.tag-mian {
  display: flex;
  flex-wrap: wrap;
  margin-right: 30px;
  height: 100%;
  overflow: auto;
  > div {
    width: calc(50% - 20px);
    margin: 20px 0 0 20px;
  }
}
</style>
