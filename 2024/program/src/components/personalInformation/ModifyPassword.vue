<template>
  <div class="dialog-mian" v-loading="loading">
    <div class="dialog-head">
      <div>
        <label>修改密码</label>
      </div>
      <span class="cancel-img" @click="closeDialog"></span>
    </div>
    <div class="dialog-body">
      <el-form ref="ruleFormRef" :model="information">
        <div>
          <div>
            <label class="required-before">原密码</label>
            <el-form-item prop="oldPassWord" :error="errMode.oldPassWord.error">
              <el-input
                v-model="information.oldPassWord"
                type="password"
                placeholder=""
                show-password
              />
            </el-form-item>
          </div>
          <div>
            <label class="required-before">密码</label>
            <el-form-item prop="password" :error="errMode.password.error">
              <el-input
                v-model="information.password"
                type="password"
                placeholder=""
                show-password
              />
            </el-form-item>
          </div>
          <div>
            <label class="required-before">确认密码</label>
            <el-form-item
              prop="confirmPass"
              :error="errMode.confirmPass.error"
              :rules="twoPass"
            >
              <el-input
                v-model="information.confirmPass"
                type="password"
                placeholder=""
                show-password
              />
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <div class="dialog-footer">
      <el-button plain @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="updatePsd">确认</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import { ElForm } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { CLEARMENU } from '@/store/mutation-types'
import { updatePasswordApi } from '@/api/module/user'
import { logoutByTokenApi } from '@/api/module/login'
import useValidateRespone from '@/utils/hooks/formValidate'

export default defineComponent({
  emits: ['close', 'success'],
  setup(props, { emit }) {
    const information = reactive({
      oldPassWord: '',
      password: '',
      confirmPass: ''
    })
    const closeDialog = () => {
      emit('close')
    }
    const loading = ref(false)
    const ruleFormRef = ref<InstanceType<typeof ElForm>>()
    const { errMode, showError, resetError } = useValidateRespone(
      ruleFormRef?.value as any,
      information
    )
    const $router = useRouter()
    const currentStore = useStore()
    const currentUser = computed(() => currentStore.state.user)
    const loginOut = async () => {
      logoutByTokenApi({})
      emit('success')
      // $router.push({ name: 'login', query: { type: currentUser.value.type } })
      await currentStore.dispatch(CLEARMENU)
    }
    const updatePsd = async () => {
      resetError()
      await ruleFormRef.value?.validate(valid => {
        if (valid) {
          loading.value = true
          updatePasswordApi(information).then(x => {
            if (x.data.success) {
              if (showError(x.data.data)) {
                closeDialog()
                loginOut()
              }
            }
            loading.value = false
          })
        }
      })
    }

    const validatePass = (rule: any, value: any, callback: any) => {
      if (value !== information.password) {
        callback(new Error('两次密码不正确'))
      } else {
        callback()
      }
    }
    const twoPass = [{ validator: validatePass, trigger: 'blur' }]
    return {
      information,
      closeDialog,
      errMode,
      updatePsd,
      ruleFormRef,
      twoPass
    }
  }
})
</script>

<style lang="scss" scoped>
// .dialog-mian{
//     .dialog-body{
//         display: flex;
//         >div{
//              margin: 20px;
//         }
//     }
// }
</style>
