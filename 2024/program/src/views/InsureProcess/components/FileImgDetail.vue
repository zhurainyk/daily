<template>
  <div class="file-insure-img">
    <div>
      <div class="info">
        <slot name="other"> </slot>

        <div class="item description">
          <label><slot name="description">描述:</slot></label>
          <div class="note">
            {{ addComment.db_description }}
          </div>
        </div>
        <div v-if="files.length > 0" class="item description-file">
          <label><slot name="file">附件:</slot></label>
          <div>
            <ul>
              <li v-for="x in files" :key="x.url" @click="dowmfile(x.url)">
                {{ x.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="imgs.length > 0" class="file-img">
        <div class="item imgs">
          <label><slot name="img">图片:</slot></label>
          <div>
            <el-image
              v-for="(x, index) in imgs"
              :key="x"
              :src="x"
              :preview-src-list="imgs"
              :initial-index="index"
              fit="cover"
              lazy
            />
          </div>
        </div>
      </div>

      <slot> </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, reactive, watch } from 'vue'

export default defineComponent({
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    dbshowkey: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const imgs: any = ref([])
    const files: any = ref([])
    const addComment = reactive({
      db_description: ''
    })
    const dowmfile = x => {
      window.open(x, '_blank')
    }
    watch(
      () => props?.data[props.dbshowkey],
      data => {
        addComment.db_description = ''
        files.value = []
        imgs.value = []
        if (data) {
          const temp = JSON.parse(data)
          addComment.db_description = temp.db_description
          if (temp.db_imagesUrls) {
            imgs.value = temp.db_imagesUrls.split(',')
          }
          if (temp.db_filesUrls) {
            const filenames = temp.db_fileNames.split(',')
            files.value = temp.db_filesUrls.split(',').map((x, index) => {
              return {
                url: x,
                name: filenames[index]
              }
            })
          }
        }
      },
      {
        immediate: true
      }
    )
    onMounted(() => {})
    return {
      dowmfile,
      files,
      imgs,
      addComment
    }
  }
})
</script>

<style lang="scss" scoped>
.file-insure-img {
  background-color: white;
  // margin: 20px 30px;
  // padding: 0 20px;
  // padding-top: 20px;
  padding-bottom: 20px;
  overflow: auto;
  .file-img {
    padding: 0 50px;
  }
  .info {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 0 50px;
  }
  > div {
    .item {
      display: flex;
      align-items: flex-start;
      width: 530px;
      margin-bottom: 20px;
      label {
        width: 100px;
        margin-right: 20px;
        text-align: right;
        font-weight: bold;
      }
      span {
        width: 360px;
        background: #f7f8fa;
        border-radius: 10px;
        height: 40px;
        display: flex;
        padding-left: 20px;
        align-items: center;
      }
      .note {
        width: 350px;
        height: 80px;
        background: #f7f8fa;
        border-radius: 10px;
        padding: 5px;
        padding-right: 7px;
        word-break: break-all;
        padding-left: 12px;
        overflow: auto;
      }
    }
    .description {
      width: 1060px;
      > label {
        margin-top: 5px;
      }
    }
    .description-file {
      width: 1060px;
    }
    .imgs {
      width: 1060px;
      > div {
        flex: 1;
      }
      .el-image {
        width: 100px;
        height: 100px;
        margin-right: 10px;
      }
    }
    .file {
      width: 1060px;
    }
  }
  .line {
    height: 1px;
    background: rgba(153, 153, 153, 0.5);
    width: 100%;
    margin: 20px 0;
  }
  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    > li {
      cursor: pointer;
      margin-right: 10px;
      color: $p-color-primary;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>
