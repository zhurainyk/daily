<template>
  <div class="login-bg">
    <!-- <div class="logo"></div> -->
    <div class="body-right">
      <div class="login">
        <div>
          <div>
            <div class="head">
              <div class="login-head">BI平台</div>
              <div>
                <div class="user-input username">
                  <img src="../public/images/login/bi-user.png" />
                  <el-input
                    v-model="user.mobilePhone"
                    size="large"
                    class="auto-mobilePhone"
                  >
                  </el-input>
                </div>
              </div>
              <div>
                <div class="user-input">
                  <img src="../public/images/login/bi-psd.png" />
                  <el-input
                    v-model="user.password"
                    type="password"
                    size="large"
                    @keyup.enter.stop="LoginFc"
                    class="auto-password"
                  >
                  </el-input>
                </div>
              </div>
            </div>
            <div>
              <el-button class="login-btn" type="primary" @click="LoginFc"
                >登录</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content login--canvas"></div>
  </div>
</template>

<script lang="ts">
import {
  reactive,
  computed,
  ref,
  onMounted,
  onUnmounted,
  defineComponent
} from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getLoginApi } from '@/api/module/login'
import { USER, MENU } from '@/store/mutation-types'
import { Login } from '../module.ts/login'
import { setToken } from '../utils/auth'
import configIndex from '../../config/index'
import typeLists from '../public/baseconfig/login.json'
import menuHelper from '../utils/menuHelper'
import { setup, resize } from '../utils/login/loginbi'

export default defineComponent({
  setup(props, contxt) {
    const user = reactive(new Login())

    const store = useStore()
    const $router = useRouter()
    let loading = ref(false)
    user.type = typeLists.sys08.type
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
          sysType: '2'
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
    onMounted(() => {
      setup()
      window.addEventListener('resize', resize)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', resize)
    })
    return {
      user,
      LoginFc,
      loading
    }
  }
})
</script>

<style scoped lang="scss">
.login-bg {
  height: 100%;
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: cover;
  .logo {
    background-image: url(../public/images/login/bi-logo.png);
    height: 42px;
    position: absolute;
    background-size: contain;
    width: 207px;
    top: 48px;
    left: 57px;
    z-index: 8;
  }
  .body-right {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    z-index: 8;
    width: 846px;
    height: 470px;
    background-image: url(../public/images/login/bi.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    .login {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      border-radius: 10px;
      > div {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        > div {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          > div {
            width: 100%;
            text-align: center;
            display: flex;
            justify-content: center;
            .login-head {
              font-size: 26px;
              text-align: center;
              color: #333333;
              height: 26px;
              font-family: MicrosoftYaHei-Bold;
              margin-bottom: 50px;
              font-weight: bold;
              color: white;
              width: 100%;
            }
          }
        }
      }
      .user-input {
        display: flex;
        height: 50px;
        align-items: center;
        width: 360px;
        margin-right: 60px;
        &.username {
          margin-bottom: 30px;
        }
        > img {
          height: 40px;
          margin-right: 25px;
        }
        :deep().el-input {
          background-color: rgba(7, 49, 167, 0.3);
          border-radius: 10px;
          .el-input__wrapper {
            background-color: rgba(7, 49, 167, 0.3);
            box-shadow: none;
          }
          input {
            border: 0;
            border-radius: 10px;
            height: 50px;
            color: white;
          }
        }
      }
      .login-btn {
        width: 240px;
        margin-top: 40px;
        border: 0;
        box-shadow: 0px 5px 19px 1px rgba(3, 0, 55, 0.3);
        background: linear-gradient(-30deg, #6427de, #6158ff);
        border-radius: 10px;
        height: 50px;
        :deep().el-button__text--expand {
          font-size: 18px;
          font-weight: bold;
        }
      }
      .head {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 20px;
        > div {
          display: flex;
          width: 100%;
          justify-content: center;
        }
      }
      :deep().el-button {
        > span {
          font-size: 16px;
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
  }
  .login--canvas {
    position: absolute;
  }
}
</style>
