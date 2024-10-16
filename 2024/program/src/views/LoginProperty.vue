<template>
  <div class="login-bg">
    <div class="login-head-title">
      <label>电梯智慧服务平台</label>
      <span>ELEVATOR INTELLIGENT SUPERVISION PLATFORM</span>
    </div>
    <div class="body-right">
      <div class="login-type"></div>
      <div class="login">
        <div>
          <div>
            <div class="login-head">{{ showLoginName }}</div>
            <div class="user-input username">
              <img src="../public/images/login/username@2x.png" />
              <el-input
                v-model="user.mobilePhone"
                size="large"
                class="auto-mobilePhone"
              >
              </el-input>
            </div>
            <div class="user-input">
              <img src="../public/images/login/psd@2x.png" />
              <el-input
                v-model="user.password"
                type="password"
                size="large"
                @keyup.enter.stop="LoginFc"
                class="auto-password"
              >
              </el-input>
            </div>
            <div class="forget-psd">忘记密码?</div>
            <el-button class="login-btn" type="primary" @click="LoginFc"
              >登录</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, computed, ref, onMounted, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getLoginApi } from '@/api/module/login'
import { USER, MENU } from '@/store/mutation-types'
import { Login } from '../module.ts/login'
import { setToken } from '../utils/auth'
import configIndex from '../../config/index'
import menuHelper from '../utils/menuHelper'

export default defineComponent({
  setup(props, contxt) {
    const user = reactive(new Login())

    const store = useStore()
    const $router = useRouter()

    let loading = ref(false)
    const showLoginName = '电梯智慧服务平台'
    user.type = 'sys22'
    const LoginFc = async () => {
      if (loading.value) return
      if (!user.mobilePhone || !user.password) {
        ElMessage({
          message: '账号或者密码错误!',
          type: 'warning'
        })
        return
      }
      if (user.mobilePhone && user.mobilePhone.length > 11) {
        ElMessage({
          message: '手机号位数过长!',
          type: 'warning'
        })
        return
      }
      loading.value = true
      const result = await getLoginApi(user)
      if (result.data.success) {
        setToken(configIndex.build.token, result.data.token)
        await store.dispatch(USER, {
          ...result.data.data[0],
          type: user.type,
          sysType: '5'
        })
        const tempMen = await menuHelper()
        await store.dispatch(MENU, tempMen)
        if (tempMen.menu.length > 0) {
          if (tempMen.menu[0].childs && tempMen.menu[0].childs?.length > 0) {
            $router.push({ name: tempMen.menu[0].childs[0].name })
          } else {
            $router.push({ name: tempMen.menu[0].name })
          }
        } else {
          ElMessage({
            message: '没有权限',
            type: 'warning'
          })
        }
      } else {
        ElMessage({
          message: result.data.message || '服务繁忙,请重试',
          type: 'warning'
        })
      }
      loading.value = false
    }
    const userComputed = computed(() => store.state.user)

    onMounted(() => {})
    return {
      user,
      showLoginName,
      LoginFc,
      userComputed,
      loading
    }
  }
})
</script>

<style scoped lang="scss">
.login-bg {
  background: url('../public/images/login/line@2x.png') no-repeat,
    linear-gradient(120deg, #ebeefc, #d6e4f8, #cfe1f7);
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  .login-head-title {
    width: 100%;
    display: flex;
    padding-top: 88px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    > label {
      font-weight: bold;
      color: #333333;
      font-size: 48px;
      margin-bottom: 26px;
      width: 100%;
      text-align: center;
    }
    > span {
      color: #999999;
      width: 100%;
      height: 12px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 300;
      text-align: center;
    }
  }
  .body-right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 70px 270px 0 120px;
    border-radius: 10px;
    .login {
      width: 350px;
      height: 100%;
      display: flex;
      justify-content: center;
      > div {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: baseline;
        justify-content: center;
        flex-wrap: wrap;
        > div {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          align-items: baseline;
          > div {
            width: 100%;

            &.login-head {
              font-size: 26px;
              text-align: center;
              color: #333333;
              height: 26px;
              font-family: MicrosoftYaHei-Bold;
              margin-bottom: 70px;
              font-weight: bold;
              padding-left: 75px;
            }
          }
        }
      }
      .user-input {
        display: flex;
        height: 50px;
        align-items: center;
        width: 300px;
        &.username {
          margin-bottom: 44px;
        }
        > img {
          height: 40px;
          margin-right: 25px;
        }
        :deep().el-input {
          input {
            border: 0;
            border-radius: 10px;
            height: 50px;
          }
          .el-input__wrapper {
            box-shadow: none;
          }
        }
      }
      .login-btn {
        width: 240px;
        margin-left: 55px;
        margin-top: 40px;
        box-shadow: 0px 5px 19px 1px rgba(3, 0, 55, 0.3);
        background: linear-gradient(-30deg, #6158ff, #6427de);
        border-radius: 10px;
        height: 50px;
        :deep().el-button__text--expand {
          font-size: 18px;
          font-weight: bold;
        }
      }
      .forget-psd {
        width: 300px;
        display: flex;
        justify-content: flex-end;
        margin-top: 23px;
      }
    }
    .login-type {
      width: 960px;
      height: 540px;
      display: flex;
      justify-content: center;
      background-image: url('../public/images/login/property-login.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: top;
      margin-right: 150px;
      .login-head {
        text-align: center;
        margin-bottom: 6px;
        > img {
          height: 36x;
          width: 175px;
        }
      }
      > div {
        margin-top: 80px;
      }
    }
  }
}
</style>
