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
          <label>详情</label>
        </div>
        <span class="cancel-img" @click="closeDialog"></span>
      </div>
      <div class="dialog-body">
        <div class="item-auth">
          <div class="list-item">
            <label>项目</label>
            <el-divider></el-divider>
            <div class="list-item-body">
              <div v-for="y in projectlistdata" :key="y.id" class="item">
                <label>{{ y.name }}</label>
              </div>
            </div>
          </div>

          <div class="list-item">
            <label>物业单位</label>
            <el-divider></el-divider>
            <div class="list-item-body">
              <div v-for="y in prolistdata" :key="y.id" class="item">
                <label>{{ y.name }}</label>
              </div>
            </div>
          </div>

          <div class="list-item">
            <label>维保单位</label>
            <el-divider></el-divider>
            <div class="list-item-body">
              <div v-for="y in maintlistdata" :key="y.id" class="item">
                <label>{{ y.name }}</label>
              </div>
            </div>
          </div>

          <div class="list-item">
            <label>保险单位</label>
            <el-divider></el-divider>
            <div class="list-item-body">
              <div v-for="y in insurelistdata" :key="y.id" class="item">
                <label>{{ y.name }}</label>
              </div>
            </div>
          </div>

          <div class="list-item">
            <label>菜单权限</label>
            <el-divider></el-divider>
            <el-tree
              :data="treelistdata"
              node-key="code"
              :props="{
                label: 'name',
                children: 'subNavigationList'
              }"
            />
          </div>
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
import { getProjectByUserIdApi } from '@/api/module/projectManage'
import { getCompanyByUserIdApi } from '@/api/module/propcompany'
import { getCompanyByUserIdApi as getMaintCompanyByUserIdApi } from '@/api/module/maincompany'
import { getCompanyByUserIdApi as getInsureCompanyByUserIdApi } from '@/api/module/insucompany'
import { getPermissionTreeApi } from '@/api/module/login'
import typeLists from '@/public/baseconfig/login.json'

export default defineComponent({
  props: {
    userid: {
      type: String,
      default: ''
    },
    dialogVisiable: {
      type: Boolean,
      default: false
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
    const projectlistdata: any = ref([])
    const prolistdata: any = ref([])
    const maintlistdata: any = ref([])
    const insurelistdata: any = ref([])
    const treelistdata: any = ref([])
    watch(
      () => props.dialogVisiable,
      new_data => {
        dialog.dialogVisiable = new_data
      },
      { immediate: true }
    )
    onMounted(() => {
      getProjectByUserIdApi({ userId: props.userid }).then((x: any) => {
        if (x.data.success) {
          //  listRef.value.searchInit()
          projectlistdata.value = x.data.data.map((x: any) => {
            return {
              id: x.db_id,
              name: x.db_id_proName
            }
          })
        }
      })

      getCompanyByUserIdApi({ userId: props.userid }).then((x: any) => {
        if (x.data.success) {
          //  listRef.value.searchInit()
          prolistdata.value = x.data.data.map((x: any) => {
            return {
              id: x.db_id,
              name: x.db_id_companyName
            }
          })
        }
      })

      getMaintCompanyByUserIdApi({ userId: props.userid }).then((x: any) => {
        if (x.data.success) {
          //  listRef.value.searchInit()
          maintlistdata.value = x.data.data.map((x: any) => {
            return {
              id: x.db_id,
              name: x.db_id_companyName
            }
          })
        }
      })

      getInsureCompanyByUserIdApi({ userId: props.userid }).then((x: any) => {
        if (x.data.success) {
          //  listRef.value.searchInit()
          insurelistdata.value = x.data.data.map((x: any) => {
            return {
              id: x.db_id,
              name: x.db_id_companyName
            }
          })
        }
      })

      getPermissionTreeApi({ db_id: props.userid }).then(auths => {
        if (auths.data.data) {
          Object.entries<MenuDao>(auths.data.data).forEach(([key, v]) => {
            const tempNode = {
              code: key,
              name: typeLists[key]?.desciption,
              level: 1,
              subNavigationList: v
            }
            treelistdata.value.push(tempNode)
          })
          treelistdata.value = treelistdata.value.filter(
            x => x.subNavigationList && x.subNavigationList.length > 0
          )
        }
      })
    })

    return {
      closeDialog,
      dialog,
      projectlistdata,
      prolistdata,
      maintlistdata,
      insurelistdata,
      treelistdata
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
