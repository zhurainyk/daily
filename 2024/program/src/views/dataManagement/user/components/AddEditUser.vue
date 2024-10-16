<template>
  <div class="dialog-mian">
    <div class="dialog-head">
      <div>
        <label>新增</label>
      </div>
      <span class="cancel-img" @click="closeDialog"></span>
    </div>
    <div class="dialog-body">
      <el-form ref="ruleFormRef" :model="userModel">
        <div>
          <div>
            <label class="required-before">用户姓名</label>
            <el-form-item
              prop="db_id_username"
              :rules="[
                {
                  required: true,
                  message: 'Please input ',
                  trigger: 'blur'
                }
              ]"
            >
              <el-input v-model="userModel.db_id_username" clearable />
            </el-form-item>
          </div>
          <div>
            <label class="required-before">用户手机</label>
            <el-form-item
              prop="db_mobilePhone"
              :rules="[
                {
                  required: true,
                  message: 'Please input ',
                  trigger: 'blur'
                }
              ]"
            >
              <el-input v-model="userModel.db_mobilePhone" clearable />
            </el-form-item>
          </div>
          <div>
            <label class="required-before">用户职位</label>
            <el-form-item
              prop="db_posiId"
              :rules="[
                {
                  required: true,
                  message: 'Please input ',
                  trigger: 'blur'
                }
              ]"
            >
              <el-select v-model="userModel.db_posiId" placeholder="" clearable>
                <el-option
                  v-for="item in positions"
                  :key="item.db_id"
                  :label="item.db_id_posiName"
                  :value="item.db_id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <label class="required-before">用户状态</label>
            <el-form-item
              prop="db_accState"
              :rules="[
                {
                  required: true,
                  message: 'Please input ',
                  trigger: 'blur'
                }
              ]"
            >
              <el-select
                v-model="userModel.db_accState"
                placeholder=""
                clearable
              >
                <el-option label="启用" value="1"></el-option>
                <el-option label="停用" value="0"></el-option>
              </el-select>
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
import { defineComponent, reactive, ref, watch, onMounted } from 'vue'
import { ElForm } from 'element-plus'
import { selectByAllApi } from '@/api/module/commont'
import { saveApi, updateByIdApi, selectByIdApi } from '@/api/module/user'
import { Position } from '@/module.ts/position'
import { User } from '@/module.ts/user'
import useValidateRespone from '@/utils/hooks/formValidate'

export default defineComponent({
  props: {
    modelData: {
      type: User,
      required: true
    }
  },
  emits: ['close', 'success'],
  setup(props, { emit }) {
    const closeDialog = () => {
      emit('close')
    }
    const positions: Array<PositionDao> = reactive([])
    const typesList: any = reactive([])
    const userModel = ref<UserDao>(new User())
    const loading = ref(false)
    const roleids = ref([])
    const ruleFormRef = ref<InstanceType<typeof ElForm>>()
    const { errMode, showError, resetError } = useValidateRespone(
      ruleFormRef?.value as any,
      userModel.value
    )
    const submitForm = async () => {
      resetError()
      await ruleFormRef.value?.validate((valid, fields) => {
        if (valid) {
          loading.value = true
          if (userModel.value.db_id) {
            updateByIdApi(userModel.value).then(x => {
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
    onMounted(async () => {
      loading.value = true
      if (props.modelData.db_id) {
        const tempPosi = await selectByIdApi({ id: props.modelData.db_id })
        if (tempPosi.data.success) {
          userModel.value = tempPosi.data.data
        }
      }
      const roleresult = await selectByAllApi({
        tableName: 'Usercenter_Position'
      })
      if (roleresult.data.success) {
        Object.entries<string>(roleresult.data.data).forEach(([key, v]) => {
          const tempRole: PositionDao = new Position()
          tempRole.db_id = key
          tempRole.db_id_posiName = v
          positions.push(tempRole)
        })
      }
      loading.value = false
    })
    return {
      closeDialog,
      submitForm,
      ruleFormRef,
      errMode,
      roleids,
      loading,
      positions,
      userModel,
      typesList
    }
  }
})
</script>

<style lang="scss" scoped></style>
