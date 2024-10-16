<template>
  <el-dialog
    v-if="dialog.dialogVisiable"
    v-model="dialog.dialogVisiable"
    :show-close="false"
    :before-close="closeDialog"
  >
    <div class="dialog-mian max-dialog auth-body">
      <div class="dialog-head">
        <div>
          <label>{{ title }}</label>
        </div>
        <span class="cancel-img" @click="closeDialog"></span>
      </div>
      <div class="dialog-body">
        <div class="item-auth">
          <template v-if="isAuthorPerson">
            <div v-for="x in listdata" :key="x.type" class="list-item">
              <label>{{ x.showname || '其他' }}</label>
              <el-divider></el-divider>
              <div class="list-item-body">
                <div v-for="y in x.list" :key="y.id" class="item">
                  <label>{{ y.name }}</label>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div v-for="y in list" :key="y.id" class="item">
              <label>{{ y.name }}</label>
            </div>
          </template>
        </div>
      </div>
      <div class="dialog-footer">
        <!-- <el-button plain @click="closeDialog">取消</el-button> -->
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive, watch } from 'vue'
import { groupBy } from 'lodash'
import Enumerable from 'linq'

export default defineComponent({
  props: {
    list: {
      type: Array,
      default: () => []
    },
    dialogVisiable: {
      type: Boolean,
      default: false
    },
    isAuthorPerson: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '详情'
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const closeDialog = () => {
      emit('close')
    }
    const dialog = reactive({
      dialogVisiable: false
    })
    const listdata: any = ref([])
    watch(
      () => props.dialogVisiable,
      new_data => {
        dialog.dialogVisiable = new_data
        if (dialog.dialogVisiable) {
          if (props.isAuthorPerson) {
            const arr_list = Enumerable.from(props.list)
              .groupBy('$.type')
              .select(ele => {
                const arr: any = ele.toArray()
                return {
                  list: arr,
                  type: arr[0].type,
                  showname: arr[0].showname
                }
              })
              .toArray()
            listdata.value = arr_list
          }
        }
      },
      { immediate: true }
    )

    return {
      closeDialog,
      dialog,
      listdata
    }
  }
})
</script>

<style lang="scss" scoped>
.auth-body {
  height: 650px;
  overflow: auto;

  .dialog-body {
    .item-auth {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      padding: 0 30px;

      .item {
        > label {
          display: inline-block;
          min-width: 92px;
          height: 30px;
          color: $p-color-primary;
          border-radius: 10px;
          border: 1px solid $p-color-primary;
          text-align: center;
          line-height: 30px;
          margin-right: 20px;
          margin-bottom: 10px;
          padding: 0 10px;
        }
      }

      .list-item {
        width: 100%;

        > label {
          font-weight: bold;
        }

        .el-divider {
          margin: 10px 0;
        }
      }

      .list-item-body {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 10px;
      }
    }
  }
}

.dialog-mian {
  //   height: 650px;
  //   .dialog-body {
  //     display: flex;
  //     .el-form {
  //       > div {
  //         > div {
  //           margin-top: 30px;
  //           flex-wrap: nowrap;
  //           align-items: flex-start;
  //           > label {
  //             text-align: right;
  //             margin: 0 10px;
  //             font-weight: bold;
  //           }
  //         }
  //       }
  //       img {
  //         width: 100px;
  //       }
  //     }
  //   }
}
</style>
