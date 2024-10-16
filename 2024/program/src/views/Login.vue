<template>
  <div class="login-bg">
    <div class="body-right">
      <div class="login-type">
        <div>
          <div class="login-head">
            <img src="../public/images/login/login-head@2x.png" />
          </div>
          <div class="login-type-list">
            <div
              v-for="x in typeList"
              :key="x.desciption"
              :class="user.type == x.type ? 'selected' : ''"
              @click="selectTypeFn(x)"
            >
              <div>
                <div>
                  <img :src="x.img" />
                </div>
                <span>{{ x.desciption }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
import bi from '../public/images/login/BI@2x'
import customerservice from '../public/images/login/customer-service@2x'
import devops from '../public/images/login/devops@2x'
import engineering from '../public/images/login/engineering@2x'
import iot from '../public/images/login/IOT@2x'
import marketing from '../public/images/login/marketing@2x'
import oa from '../public/images/login/OA@2x'
import personnel from '../public/images/login/personnel@2x'
import expert from '../public/images/login/expert@2x'
import scm from '../public/images/login/scm'
import typeLists from '../public/baseconfig/login.json'
import menuHelper from '../utils/menuHelper'

export default defineComponent({
  setup(props, contxt) {
    const user = reactive(new Login())

    const store = useStore()
    const $router = useRouter()
    const typeList = reactive([
      {
        img: marketing,
        ...typeLists.sys01
      },
      {
        img: engineering,
        ...typeLists.sys06
      },
      {
        img: customerservice,
        ...typeLists.sys02
      },
      {
        img: personnel,
        ...typeLists.sys09
      },
      {
        img: oa,
        ...typeLists.sys10
      },
      {
        img: bi,
        ...typeLists.sys08
      },
      {
        img: expert,
        ...typeLists.sys11
      },
      {
        img: iot,
        ...typeLists.sys05
      },
      {
        img: scm,
        ...typeLists.sys03
      },
      {
        img: devops,
        ...typeLists.sys04
      }
    ])
    let loading = ref(false)
    const showLoginName = ref(typeList[0].desciption)
    user.type = typeList[0].type
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
          sysType: '1'
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
    const selectTypeFn = typeItem => {
      user.type = typeItem.type
      showLoginName.value = typeItem.desciption
    }
    onMounted(() => {
      const $route = useRoute()
      if ($route.query.type) {
        const currentRoute = typeList.find(x => x.type == $route.query.type)
        if (currentRoute) {
          selectTypeFn(currentRoute)
        }
      }
    })
    return {
      user,
      showLoginName,
      LoginFc,
      userComputed,
      typeList,
      selectTypeFn,
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
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: cover;
  .body-right {
    height: 649px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    .login {
      width: 517px;
      height: 94%;
      background-color: #f1f1f1;
      display: flex;
      justify-content: center;
      border-radius: 0 10px 10px 0;
      > div {
        width: 80%;
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

            &.login-head {
              font-size: 26px;
              text-align: center;
              color: #333333;
              height: 26px;
              font-family: MicrosoftYaHei-Bold;
              margin-bottom: 110px;
              font-weight: bold;
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
        margin-top: 59px;
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
      width: 816px;
      height: 100%;
      display: flex;
      justify-content: center;
      background-image: url('../public/images/login/login.png');
      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 10px;
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
      .login-type-list {
        display: flex;
        flex-wrap: wrap;
        margin-left: 40px;
        > div {
          width: 142px;
          height: 160px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          margin-left: 10px;
          margin-top: 20px;
          align-items: center;
          > div {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            > div {
              height: 80px;
              width: 80px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: white;
              box-shadow: 0px 5px 14px 1px rgba(8, 3, 95, 0.15);
              border: 1px solid #f1f1f1;
              border-radius: 10px;
              > img {
                width: 60px;
              }
            }
            > span {
              width: 100%;
              text-align: center;
              font-weight: bold;
              font-size: 18px;
              margin-top: 20px;
            }
          }
        }
        .selected {
          background: rgba(97, 88, 255, 0.1);
          box-shadow: 0px 5px 10px 0px rgb(51 51 51 / 20%);
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
