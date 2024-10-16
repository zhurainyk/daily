<template>
  <div class="layout-left-right">
    <div class="left-mian">
      <div class="left-mian-body">
        <div class="header"><label>部门列表</label></div>
        <el-tree
          :data="dataSource"
          node-key="db_id"
          :default-expand-all="true"
          :props="treeProps"
        >
          <template #default="{ data, node }">
            <div class="custom-tree-node">
              <div>
                <span>
                  {{ data.db_id_depName }}
                </span>
              </div>
              <div class="display-bth">
                <i
                  v-if="data.db_id"
                  class="iconfont icon-bianji edit-btn"
                  @click.stop="dialog.visiableDialog = true"
                  @click="() => editFn(data, node)"
                ></i>
                <i
                  class="iconfont icon-add add-btn"
                  @click.stop="() => newFn(data, node)"
                ></i>
                <i
                  v-if="data.db_id"
                  @click.stop="() => deleteOg(data, node)"
                  class="iconfont icon-shanchu delete"
                ></i>
              </div>
            </div>
          </template>
        </el-tree>
      </div>
    </div>

    <div></div>

    <el-dialog
      v-if="dialog.visiableDialog"
      v-model="dialog.visiableDialog"
      width="550px"
      :show-close="false"
    >
      <AddEditOrg
        :current-data="currentData"
        :save-api="saveApi"
        :select-by-id-api="selectByIdApi"
        :update-by-id-api="updateByIdApi"
        dbkey="db_id"
        :add-model="addModelProp"
        @close="dialog.visiableDialog = false"
        @success="saveSuccess"
      >
        <template v-for="x in addModelProp" :key="x.dbkey" #[x.dbkey]="scope">
          <slot :name="x.dbkey" :scope="scope"> </slot>
        </template>
      </AddEditOrg>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
import AddEditOrg from '@/components/singlelist/components/addEdit'
import {
  getDepartmentTreeLoginApi,
  saveApi,
  updateByIdApi,
  selectByIdApi,
  deleteByIdApi
} from '@/api/module/department'
import { Department } from '@/module.ts/department'

export default defineComponent({
  components: { AddEditOrg },
  setup() {
    const dialog = reactive({
      visiableDialog: false
    })
    const treeProps = {
      children: 'subDepartmentList',
      label: 'db_id_depName'
    }
    const dataSource: any = ref([])
    const currentData = ref<IDepartment>(new Department())
    let curentParentNode = new Department()
    onMounted(async () => {
      const x = await getDepartmentTreeLoginApi({})
      if (x.data.data) {
        dataSource.value = [
          {
            db_id: '',
            db_id_depName: '全部',
            subDepartmentList: x.data.data
          }
        ]
      }
    })
    const newFn = args => {
      currentData.value = new Department()
      curentParentNode = args
      currentData.value.db_parentId = args.db_id
      dialog.visiableDialog = true
    }
    const deleteOg = (args, node) => {
      ElMessageBox.confirm('是否删除', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      })
        .then(() => {
          deleteByIdApi({ id: args.db_id }).then(x => {
            if (x.data.success) {
              const parent = node.parent
              const children = parent.data.subDepartmentList
              const index = children.findIndex(d => d.db_id === args.db_id)
              children.splice(index, 1)
              dataSource.value = [...dataSource.value]
            }
          })
        })
        .catch(() => {})
    }
    const editFn = (args, node) => {
      currentData.value = args
      curentParentNode = node.parent.data
      dialog.visiableDialog = true
    }
    const addModelProp = [
      {
        name: '部门名称',
        dbkey: 'db_id_depName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      }
    ]
    const saveSuccess = args => {
      const tempDepart = JSON.parse(args.data)
      if (!currentData.value.db_id) {
        curentParentNode.subDepartmentList.push(tempDepart)
      } else {
        const index = curentParentNode.subDepartmentList.findIndex(
          x => x.db_id == tempDepart.db_id
        )
        curentParentNode.subDepartmentList[index].db_id_depName =
          tempDepart.db_id_depName
      }
      dataSource.value = [...dataSource.value]
    }
    return {
      dataSource,
      dialog,
      treeProps,
      currentData,
      addModelProp,
      saveApi,
      updateByIdApi,
      selectByIdApi,
      newFn,
      editFn,
      saveSuccess,
      deleteOg
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-left-right {
  height: calc(100% - 52px);
  display: flex;
  padding: 26px;
  background-color: #f6f6ff;
  .left-mian {
    width: 700px;
    height: 100%;
    box-shadow: 0px 5px 19px 1px rgba(3, 0, 55, 0.1);
    border-radius: 10px;
    margin-right: 20px;
    background-color: white;
    overflow: auto;
    .left-mian-body {
      padding-left: 30px;
      padding-top: 30px;
      .header {
        margin-bottom: 23px;
        > label {
          font-weight: bold;
          font-size: 16px;
        }
      }
      .el-tree {
        .custom-tree-node {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          .display-bth {
            display: none;
            > i {
              font-size: 20px;
              margin-right: 8px;
              display: inline-block;
              color: white;
            }
            .add-btn {
              // background-image: url("../../../public/images/common/add");
            }
            .edit-btn {
              // background-image: url("../../../public/images/common/edit");
            }

            .delete {
              color: $p-color-error;
            }
          }
          &:hover {
            .display-bth {
              display: flex;
              margin-right: 27px;
            }
            span {
              color: white;
            }
          }
        }
      }
    }
  }
  .right-mian {
    flex: 1;
    height: 100%;
    box-shadow: 0px 5px 19px 1px rgba(3, 0, 55, 0.1);
    border-radius: 10px;
  }
}
</style>
