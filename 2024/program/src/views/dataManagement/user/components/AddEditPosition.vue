<template>
  <div v-loading="loading" class="dialog-mian">
    <div class="dialog-head">
      <div>
        <label>新增</label>
      </div>
      <span class="cancel-img" @click="closeDialog"></span>
    </div>
    <div class="dialog-body">
      <el-form ref="ruleFormRef" :model="positionModel">
        <div>
          <el-form-item>
            <div>
              <label class="required-before">职位名称</label>
              <el-form-item
                prop="db_id_posiName"
                :rules="[]"
                :error="errMode['db_id_posiName'].error"
              >
                <el-input v-model="positionModel.db_id_posiName" clearable />
              </el-form-item>
            </div>
          </el-form-item>
          <div>
            <label class="required-before">职位类型</label>
            <el-form-item
              prop="db_posiType"
              :rules="[]"
              :error="errMode['db_posiType'].error"
            >
              <el-select
                v-model="positionModel.db_posiType"
                placeholder=""
                clearable
              >
                <el-option
                  v-for="item in typesList"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value + ''"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>

          <div>
            <label class="required-before">关联角色</label>
            <el-form-item
              prop="db_roleIds"
              :rules="[]"
              :error="errMode['db_roleIds'].error"
            >
              <el-select v-model="roleids" placeholder="" multiple clearable>
                <el-option
                  v-for="item in roles"
                  :key="item.db_id"
                  :label="item.db_id_roleName"
                  :value="item.db_id"
                />
              </el-select>
            </el-form-item>
          </div>
          <div>
            <label>备注</label>
            <el-form-item
              prop="db_note"
              :rules="[]"
              :error="errMode['db_note'].error"
            >
              <el-input
                v-model="positionModel.db_note"
                autosize
                type="textarea"
                clearable
              />
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <div class="dialog-footer">
      <el-button plain @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="submitForm">确认</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, watch } from 'vue'
import { ElForm } from 'element-plus'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { Role } from '@/module.ts/role'
import { Position } from '@/module.ts/position'
import { saveApi, updateByIdApi, selectByIdApi } from '@/api/module/position'
import useValidateRespone from '@/utils/hooks/formValidate'

export default defineComponent({
  props: {
    positionProp: {
      type: Position,
      required: true
    }
  },
  emits: ['close', 'success'],
  setup(props, { emit }) {
    const closeDialog = () => {
      emit('close')
    }
    const roles: Array<RoleDao> = reactive([])
    const typesList: any = reactive([])
    const positionModel = ref<PositionDao>(new Position())
    const loading = ref(false)
    const roleids = ref([])
    const ruleFormRef = ref<InstanceType<typeof ElForm>>()
    const { errMode, showError, resetError } = useValidateRespone(
      ruleFormRef?.value as any,
      positionModel.value
    )
    const submitForm = async () => {
      resetError()
      await ruleFormRef.value?.validate((valid, fields) => {
        if (valid) {
          loading.value = true
          if (positionModel.value.db_id) {
            updateByIdApi(positionModel.value).then(x => {
              if (x.data.success) {
                if (showError(x.data.data)) {
                  closeDialog()
                  emit('success')
                }
              }
            })
          } else {
            saveApi(positionModel.value).then(x => {
              if (x.data.success) {
                if (showError(x.data.data)) {
                  closeDialog()
                  emit('success')
                }
              }
            })
          }
        }
        loading.value = false
      })
    }
    watch(roleids, (newValue, oldValue) => {
      positionModel.value.db_roleIds = newValue.join(',')
    })
    onMounted(async () => {
      loading.value = true
      if (props.positionProp.db_id) {
        const tempPosi = await selectByIdApi({ id: props.positionProp.db_id })
        if (tempPosi.data.success) {
          positionModel.value = tempPosi.data.data
          if (positionModel.value.db_roleIds) {
            roleids.value = positionModel.value.db_roleIds.split(',') as any
          }
        }
      }
      const roleresult = await selectByAllApi({ tableName: 'Usercenter_Role' })
      const types = await selectByAllTypeApi({ constType: 'position_type' })
      if (roleresult.data.success) {
        Object.entries<string>(roleresult.data.data).forEach(([key, v]) => {
          const tempRole = new Role()
          tempRole.db_id = key
          tempRole.db_id_roleName = v
          roles.push(tempRole)
        })
        if (positionModel.value.db_roleIds) {
          let temp: any = positionModel.value.db_roleIds.split(',')
          temp = temp.filter(h => roles.findIndex(j => j.db_id == h) > -1)
          positionModel.value.db_roleIds = temp.join(',')
          roleids.value = temp
        }
      }
      if (types.data.success) {
        Object.entries<string>(types.data.data).forEach(([key, v]) => {
          typesList.push({
            value: key,
            label: v
          })
        })
        if (positionModel.value.db_posiType) {
          if (
            typesList.findIndex(
              j => j.value == positionModel.value.db_posiType
            ) <= -1
          ) {
            positionModel.value.db_posiType = ''
          }
        }
      }
      loading.value = false
    })
    return {
      closeDialog,
      submitForm,
      ruleFormRef,
      roleids,
      loading,
      errMode,
      roles,
      positionModel,
      typesList
    }
  }
})
</script>

<style lang="scss" scoped>
.dialog-mian {
  height: 650px;
  .dialog-body {
    .el-form {
      .el-form-item {
        margin-bottom: 10px;
        .el-form-item__content {
          > div {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
