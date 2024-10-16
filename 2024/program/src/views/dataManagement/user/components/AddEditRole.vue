<template>
  <div v-loading="loading" class="dialog-mian">
    <div class="dialog-head">
      <div>
        <label>新增</label>
      </div>
      <span class="cancel-img" @click="closeDialog"></span>
    </div>
    <div class="dialog-body">
      <el-form ref="ruleFormRef" :model="roleModel" :rules="rules">
        <div>
          <div>
            <label class="required-before">角色名称</label>
            <el-form-item
              prop="db_id_roleName"
              :error="errMode['db_id_roleName'].error"
            >
              <el-input v-model="roleModel.db_id_roleName" clearable />
            </el-form-item>
          </div>
          <div>
            <label>权限绑定</label>
            <div class="auth-tree">
              <el-tree
                :data="data"
                show-checkbox
                node-key="id"
                :default-expanded-keys="defaultNodes"
                :default-checked-keys="defaultNodes"
                :props="defaultProps"
                @check="cheksNode"
              />
            </div>
          </div>
          <div>
            <label>备注</label>
            <el-form-item prop="db_note" :error="errMode['db_note'].error">
              <el-input v-model="roleModel.db_note" clearable />
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <div class="dialog-footer">
      <el-button plain @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted, toRefs } from 'vue'
import { ElForm } from 'element-plus'
import useValidateRespone from '@/utils/hooks/formValidate'
import { Role } from '../../../../module.ts/role'
import {
  saveApi,
  updateByIdApi,
  selectByIdApi,
  getRoleAuthApi
} from '@/api/module/role'
import typeLists from '@/public/baseconfig/login.json'

export default defineComponent({
  props: {
    role: {
      type: Role
    }
  },
  emits: ['close', 'success'],
  setup(props, { emit }) {
    const closeDialog = () => {
      emit('close')
    }
    const rules = reactive({
      db_id_roleName: [
        {
          required: true,
          message: '必填项',
          trigger: ['blur', 'change']
        }
      ]
    })

    const roleModel: RoleDao = reactive(JSON.parse(JSON.stringify(props.role)))
    const loading = ref(false)
    const data: any = ref([])
    const defaultNodes: any = ref([])
    const ruleFormRef = ref<InstanceType<typeof ElForm>>()
    const { errMode, showError, resetError } = useValidateRespone(
      ruleFormRef?.value as any,
      roleModel
    )
    const submit = async () => {
      resetError()
      await ruleFormRef.value?.validate(valid => {
        if (valid) {
          loading.value = true
          if (roleModel.db_id) {
            updateByIdApi(roleModel).then(x => {
              loading.value = false
              if (x.data.success) {
                if (showError(x.data.data)) {
                  closeDialog()
                  emit('success')
                }
              }
            })
          } else {
            saveApi(roleModel).then(x => {
              loading.value = false
              if (x.data.success) {
                if (showError(x.data.data)) {
                  closeDialog()
                  emit('success')
                }
              }
            })
          }
        }
      })
    }
    const getNodeTree = (ParentNode, node) => {
      const tempsubNode = {
        id: node.code,
        label: node.name,
        level: 2,
        children: []
      }
      ParentNode.children.push(tempsubNode)
      node.functionList.forEach(element => {
        getNodeTree(tempsubNode, element)
      })
    }
    const cheksNode = (a, b) => {
      const tempParentNodes: any = b.checkedNodes
        .filter((node: any) => node.level != 1 && node.children.length <= 0)
        .map((node: any) => node.id)
      roleModel.db_funCodes = tempParentNodes.join(',')
    }
    onMounted(async () => {
      loading.value = true
      const auths = await getRoleAuthApi({})
      if (auths.data.data) {
        Object.entries<MenuDao>(auths.data.data).forEach(([key, v]) => {
          const tempNode = {
            id: key,
            label: typeLists[key]?.desciption,
            level: 1,
            children: []
          }
          if (v && v.length > 0) {
            v.forEach(element => {
              getNodeTree(tempNode, element)
            })
          }
          data.value.push(tempNode)
        })
      }
      if (props.role?.db_id) {
        const x = await selectByIdApi({ id: props.role?.db_id })
        if (x.data.success) {
          roleModel.db_id_roleName = x.data.data.db_id_roleName
          roleModel.db_roleState = x.data.data.db_roleState
          roleModel.db_note = x.data.data.db_note
          roleModel.db_funCodes = x.data.data.db_funCodes
          if (x.data.data.db_funCodes) {
            defaultNodes.value = x.data.data.db_funCodes.split(',')
          }
        }
      }

      loading.value = false
    })
    return {
      closeDialog,
      submit,
      cheksNode,
      rules,
      defaultNodes,
      data,
      ruleFormRef,
      roleModel,
      loading,
      errMode
    }
  }
})
</script>

<style lang="scss" scoped>
.dialog-mian {
  .dialog-body {
    .el-form {
      .auth-tree {
        width: 450px;
        height: 400px;
        border: 1px solid #d1d1d1;
        border-radius: 10px;
        overflow: auto;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
