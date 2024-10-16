<template>
  <div class="file-img-component">
    <div class="file-images">
      <el-image
        v-for="(x, index) in images"
        :key="x.url"
        :src="x.url"
        :zoom-rate="1.2"
        :preview-src-list="imagesUrl"
        :initial-index="index"
        fit="cover"
      />
    </div>
    <div class="files">
      <ul>
        <li
          v-for="x in filelist"
          :key="x.url"
          :title="x.name"
          @click="dowmfile(x.url)"
        >
          {{ x.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    files: {
      type: Array,
      default: () => []
    }
  },
  setup(prop) {
    const images: any = computed(() =>
      prop.files.filter(
        (x: any) =>
          x.name.toLocaleLowerCase().endsWith('.jpg') ||
          x.name.toLocaleLowerCase().endsWith('.png') ||
          x.name.toLocaleLowerCase().endsWith('.jpeg')
      )
    )
    const imagesUrl = computed(() => images.value.map((x: any) => x.url))
    const filelist = computed(() =>
      prop.files.filter(
        (x: any) =>
          !(
            x.name.toLocaleLowerCase().endsWith('.jpg') ||
            x.name.toLocaleLowerCase().endsWith('.png') ||
            x.name.toLocaleLowerCase().endsWith('.jpeg')
          )
      )
    )
    const dowmfile = x => {
      window.open(x, '_blank')
    }
    return {
      images,
      filelist,
      imagesUrl,
      dowmfile
    }
  }
})
</script>

<style lang="scss" scoped>
.file-img-component {
  display: flex;
  .file-images {
    display: flex;
    flex-wrap: wrap;
    .el-image {
      width: 60px;
      height: 60px;
      margin-right: 10px;
    }
  }
  .files {
    ul {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      li {
        color: $p-color-primary;
        cursor: pointer;
        margin-bottom: 5px;
        max-width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 10px;
      }
    }
  }
}
</style>
