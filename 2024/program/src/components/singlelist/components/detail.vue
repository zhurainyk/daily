<template>
  <div
    v-loading="loading"
    class="dialog-mian max-dialog"
    :class="[heigthDialog, { 'max-dialog': maxwidth }]"
  >
    <div class="dialog-head">
      <div>
        <slot name="title"> <label>详情</label></slot>
      </div>
      <span class="cancel-img" @click="closeDialog"></span>
    </div>
    <div class="dialog-body">
      <el-form class="detail-body-dialog">
        <div>
          <div v-for="x in showListTab" :key="x.dbkey">
            <label>{{ x.name }}:</label>
            <template v-if="x.type == 'img'">
              <el-image
                v-for="(y, index) in detailModel[x.dbkey]"
                :src="y"
                :key="y"
                :preview-src-list="detailModel[x.dbkey]"
                :initial-index="index"
                fit="cover"
                lazy
              />
            </template>
            <span v-else>{{ detailModel[x.dbkey] }}</span>
          </div>
        </div>
        <slot name="detailmain" :detailModel="detailModel"></slot>
      </el-form>
    </div>
    <div class="dialog-footer">
      <!-- <el-button plain @click="closeDialog">取消</el-button> -->
      <slot
        name="detailfooter"
        :closefn="closeDialog"
        :detailModel="detailModel"
      ></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'

export default defineComponent({
  props: {
    selectByidApi: {
      type: Function,
      default: undefined
    },
    showList: {
      type: Array,
      default: () => []
    },
    dbkey: {
      type: String,
      required: true,
      default: 'db_id'
    },
    currentData: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const detailModel = ref({})
    const loading = ref(false)
    const showListTab: any = ref([])
    const closeDialog = () => {
      emit('close')
    }
    const dealObj = model => {
      let temp = {}
      Object.entries(model).forEach(([k, v]) => {
        if (v != null && typeof v == 'object') {
          temp = { ...temp, ...dealObj(v) }
        } else {
          temp[k] = v
        }
      })
      return temp
    }
    const getShowItem = data => {
      const tempData = dealObj(data)
      showListTab.value = []
      props.showList.forEach((x: any) => {
        if (tempData[x.dbkey] !== undefined) {
          if (x.type == 'img') {
            if (tempData[x.dbkey])
              tempData[x.dbkey] = tempData[x.dbkey].split(',')
          }
          showListTab.value.push(x)
        }
      })
      return tempData
    }
    const heigthDialog = computed(() => {
      if (props.showList) {
        if (props.showList.length > 0 && props.showList.length < 2) {
          return 'min-dialog-height'
        }
        return 'max-dialog-height'
      }
      return 'min-dialog-height'
    })
    onMounted(() => {
      if (props.currentData[props.dbkey]) {
        if (props.selectByidApi) {
          loading.value = true
          props
            .selectByidApi({ id: props.currentData[props.dbkey] })
            .then(x => {
              if (x.data.success) {
                detailModel.value = getShowItem(x.data.data)
              }
              loading.value = false
            })
        } else {
          detailModel.value = getShowItem(props.currentData)
        }
      }
    })
    return {
      detailModel,
      loading,
      closeDialog,
      showListTab,
      heigthDialog
    }
  }
})
</script>

<style lang="scss" scoped>
.dialog-mian {
  height: 650px;
  .dialog-body {
    display: flex;
    .el-form {
      > div {
        > div {
          margin-top: 30px;
          flex-wrap: nowrap;
          align-items: flex-start;
          > label {
            text-align: right;
            margin: 0 10px;
            font-weight: bold;
          }
        }
      }
      .el-image {
        width: 100px;
        margin-right: 10px;
      }
    }
  }
}
</style>
