<template>
  <el-container>
    <el-aside
      :class="[{ iscollapse: isCollapse }, { fullsreen: isFullscreen }]"
    >
      <div class="logo">
        <img :src="currenLogo || LogoImgs" @click="firstMenu" />
        <span>{{ currenPlatfrom?.desciption }}</span>
      </div>
      <el-menu
        :collapse="isCollapse"
        class="el-menu-vertical"
        :collapse-transition="false"
        :default-active="currentMenu.name"
      >
        <MenuTree
          v-for="m in menuall"
          :key="m.id"
          :menu="m"
          :index="m.name"
        ></MenuTree>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header v-if="haveHead" :class="{ fullsreen: isFullscreen }">
        <div class="header">
          <div>
            <img
              src="../../public/images/menu/index@2x.png"
              @click="firstMenu"
            />
            <i class="line"></i>
            <el-breadcrumb separator=" > ">
              <template v-for="x in currentParenRouters" :key="x.id">
                <el-breadcrumb-item
                  v-if="x.parentId == '-1' && x.childs && x.childs.length > 0"
                  >{{ x.description }}</el-breadcrumb-item
                >
                <el-breadcrumb-item v-else :to="{ path: x.path }">{{
                  x.description
                }}</el-breadcrumb-item>
              </template>

              <el-breadcrumb-item>{{
                currentRouter.description
              }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div>
            <!-- <el-badge is-dot class="item">
              <img src="../../public/images/menu/message@2x.png" />
            </el-badge>
            <i class="line"></i> -->
            <!-- <el-badge is-dot class="item">
              <img src="../../public/images/menu/task@2x.png" />
            </el-badge> -->
            <!-- <i class="line"></i> -->
            <img
              src="../../public/images/menu/fullscreen@2x.png"
              @click="fullsrceenFn"
            />
            <!-- <i class="line"></i> -->
            <!-- <el-popover :width="100" trigger="hover" content="">
              <template #reference>
                <i class="iconfont icon-language-mian language"></i>
              </template>
              <div class="language-body">
                <ul>
                  <li
                    v-for="x in languagelist"
                    :key="x.key"
                    @click="changeLang(x.key)"
                  >
                    {{ x.value }}
                  </li>
                </ul>
              </div>
            </el-popover> -->
            <i class="line"></i>
            <!-- <img src="../../public/images/menu/more@2x.png" />
            <i class="line"></i> -->
            <el-popover placement="bottom" :width="100" trigger="click">
              <template #reference>
                <div class="user-info">
                  <span class="user-img">
                    <img
                      :src="currentUser?.userInfo?.ui_imgUrl || userImge"
                      :class="
                        currentUser?.userInfo?.ui_imgUrl ? 'user-have' : ''
                      "
                    />
                  </span>
                  <span>{{ currentUser.userInfo.db_id_username }}</span>
                </div>
              </template>
              <div class="user-info-body">
                <ul>
                  <li @click="dialog.visiblePerson = true">
                    <i></i>
                    <span>个人信息</span>
                  </li>
                  <li @click="dialog.visiableModify = true">
                    <i></i>
                    <span>修改信息</span>
                  </li>
                  <li @click="dialog.visiblePassword = true">
                    <i></i>
                    <span>修改密码</span>
                  </li>
                  <li @click="dialog.visibleApp = true">
                    <i></i>
                    <span>App 下载</span>
                  </li>
                  <li @click="loginOut">
                    <i></i>
                    <span>退出登录</span>
                  </li>
                </ul>
              </div>
            </el-popover>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view v-slot="{ Component, route }">
          <keep-alive>
            <component
              :is="Component"
              v-if="!$route.meta || !$route.meta.isNotkeepAlive"
              :key="route.fullPath"
            />
          </keep-alive>
          <component
            :is="Component"
            v-if="$route.meta && $route.meta.isNotkeepAlive"
            :key="route.fullPath"
          />
        </router-view>
      </el-main>
    </el-container>
    <el-dialog
      v-if="dialog.visiblePassword"
      v-model="dialog.visiblePassword"
      width="550px"
      :show-close="false"
    >
      <UpdatePassword
        @close="dialog.visiblePassword = false"
        @success="loginOut"
      ></UpdatePassword>
    </el-dialog>
    <el-dialog
      v-if="dialog.visiblePerson"
      v-model="dialog.visiblePerson"
      width="1155px"
      :show-close="false"
    >
      <Person @close="dialog.visiblePerson = false"></Person>
    </el-dialog>
    <el-dialog
      v-if="dialog.visibleApp"
      v-model="dialog.visibleApp"
      width="550px"
      :show-close="false"
    >
      <QrcodeApp @close="dialog.visibleApp = false"></QrcodeApp>
    </el-dialog>

    <ModifyUserInfo
      :modifyUserVisable="dialog.visiableModify"
      @close="dialog.visiableModify = false"
      v-if="dialog.visiableModify"
    ></ModifyUserInfo>
  </el-container>
</template>

<script lang="ts" setup>
import { onMounted, computed, reactive, ref, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import screenfull from 'screenfull'
import { useStore } from 'vuex'
import MenuTree from './components/MenuTree.vue'
import { FULLSREEN, CLEARMENU } from '@/store/mutation-types'
import typeLists from '../../public/baseconfig/login.json'
import { logoutByTokenApi } from '@/api/module/login'
import { menuRoute, menuPrarent, menulist } from '@/router/menu'
import UpdatePassword from '@/components/personalInformation/ModifyPassword'
import Person from '@/components/personalInformation/index'
import ModifyUserInfo from '@/components/personalInformation/ModifyUserInfo'
import QrcodeApp from '@/components/personalInformation/QrcodeApp'
import LogoImgs from '../../public/images/menu/logo@2x.png'
import userImge from '../../public/images/menu/my@2x.png'
import { Languagestype } from '@/constant/index'

const { locale } = useI18n()

let responseMenall: any = []

let responseMen: any = []
Object.entries<MenuDao>(menulist).forEach(([key, v]) => {
  responseMenall.push(JSON.parse(JSON.stringify(v)))
})
Object.entries<MenuDao>(menuPrarent).forEach(([key, v]) => {
  responseMenall.push(JSON.parse(JSON.stringify(v)))
})
let languagelist = []
Object.entries(Languagestype).forEach(([key, v]) => {
  languagelist.push({
    key: key,
    value: v
  })
})
onMounted(async () => {})
const dialog = reactive({
  visiblePassword: false,
  visiblePerson: false,
  visibleApp: false,
  visiableModify: false
})
const currentStore = useStore()
screenfull.onchange(async () => {
  isFullscreen.value = !isFullscreen.value
  await currentStore.dispatch(FULLSREEN, isFullscreen.value)
})
const tempRoute = useRoute()
const isCollapse = ref(false)
const haveHead = computed(() => !tempRoute.meta.haveNoHead)
const isFullscreen = ref(false)
const $router = useRouter()
const fullsrceenFn = () => {
  screenfull.toggle()
}

const currentUser = computed(() => currentStore.state.user)
const currenPlatfrom = computed(() => typeLists[currentStore.state.user.type])
const menuall = computed(() => currentStore.state.menu.menu)

const currentRouter = computed(() => {
  if (menuall.value && menuall.value.length > 0) {
    let temp = getCurrentRoute(menuall.value, tempRoute)
    if (temp) {
      return temp
    }
    temp = menuRoute.routes.find(x => x.name == tempRoute.name)
    if (temp) {
      return temp
    }
  }
  return {
    desciption: '',
    parentId: '-1'
  }
})
const currentParenRouters = computed(() => {
  if (currentRouter.value.parentId != '-1') {
    let tempParents: any = []
    getCurrentParentRoute(currentRouter.value, tempParents, menuall.value)
    return tempParents.reverse()
  }
  return []
})

const currenLogo = computed(() => {
  if (currentUser.value.userInfo?.ui_extra) {
    try {
      const extraJosn = JSON.parse(currentUser.value.userInfo?.ui_extra)
      return extraJosn.logo_url
    } catch (error) {
      return ''
    }
  }
  return ''
})

const getCurrentParentRoute = (menu: any, parentmens: any, menus: any) => {
  let tempparentM = responseMenall.find(
    x =>
      x.id == menu.parentId ||
      (Array.isArray(x.id) &&
        Array.isArray(menu.parentId) &&
        x.id.findIndex(x => menu.parentId.findIndex(y => y == x) > -1) > -1) ||
      (Array.isArray(x.id) && x.id.findIndex(y => y == menu.parentId) > -1) ||
      (Array.isArray(menu.parentId) &&
        menu.parentId.findIndex(y => y == x.id) > -1)
  )
  let temp = getCurrentRoute(menus, tempparentM)
  if (!temp) {
    // 先找权限菜单，在查询全量菜单
    temp = tempparentM
  }
  if (temp) {
    parentmens.push(temp)
    if (temp.parentId != '-1') {
      getCurrentParentRoute(temp, parentmens, menus)
    }
  }
}

const getCurrentRoute = (menu: Array<any>, curent_router: any) => {
  let temp = menu.find(x => x.name == curent_router?.name)
  if (temp) {
    return temp
  }
  menu.forEach(route => {
    if (temp) return
    temp = getCurrentRoute(route.childs, curent_router)
  })
  return temp
}

const loginOut = async () => {
  // logoutByTokenApi({})
  if (currentUser.value.userInfo.sysType == '1') {
    $router.push({ name: 'login', query: { type: currentUser.value.type } })
  } else if (currentUser.value.userInfo.sysType == '2') {
    $router.push({ name: 'loginBi' })
  } else if (currentUser.value.userInfo.sysType == '3') {
    $router.push({ name: 'LoginEngineering' })
  } else if (currentUser.value.userInfo.sysType == '4') {
    $router.push({ name: 'LoginInsure' })
  } else if (currentUser.value.userInfo.sysType == '5') {
    $router.push({ name: 'LoginProperty' })
  }

  // currentStore.dispatch(CLEARMENU)
}
const firstMenu = () => {
  if (menuall.value && menuall.value.length > 0) {
    if (menuall.value[0].parentId == '-1') {
      $router.push({ name: menuall.value[0].name })
    } else {
      $router.push({ name: menuall.value[0].childs[0].name })
    }
  }
}
const changeLang = val => {
  if (val != localStorage.getItem('lang')) {
    localStorage.setItem('lang', val)
    locale.value = val
    window.location.reload()
  }
}
const currentMenu = computed(
  () =>
    menuRoute.routes.find(
      x =>
        !x.isNotMenu &&
        (x.id == currentRouter.value.id ||
          x.id == currentRouter.value.parentId ||
          (Array.isArray(x.id) &&
            Array.isArray(currentRouter.value.id) &&
            x.id.findIndex(
              x => currentRouter.value.id.findIndex(y => y == x) > -1
            ) > -1) ||
          (Array.isArray(x.id) &&
            x.id.findIndex(x => x == currentRouter.value.id) > -1) ||
          (Array.isArray(currentRouter.value.id) &&
            currentRouter.value.id.findIndex(y => y == x.id) > -1) ||
          (Array.isArray(x.id) &&
            Array.isArray(currentRouter.value.parentId) &&
            x.id.findIndex(
              x => currentRouter.value.parentId.findIndex(y => y == x) > -1
            ) > -1) ||
          (Array.isArray(x.id) &&
            x.id.findIndex(y => y == currentRouter.value.parentId) > -1) ||
          (Array.isArray(currentRouter.value.parentId) &&
            currentRouter.value.parentId.findIndex(y => y == x.id) > -1))
    ) || {}
)
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  width: 100%;

  .el-main {
    --el-main-padding: 0;
    overflow: hidden;
  }

  .el-aside {
    height: 100%;
    --el-aside-padding: 0;
    --el-aside-width: 300px;
    background: linear-gradient(-30deg, #cfe1f7, #ebeefc);
    transition: width 0.3s linear;

    &.fullsreen {
      display: none;
    }

    .logo {
      display: flex;
      align-items: center;
      padding-left: 34px;
      padding-top: 55px;
      padding-bottom: 60px;
      flex-wrap: wrap;

      > img {
        font-size: 40px;
        width: 175px;
        height: 40px;
        object-fit: contain;
      }

      > span {
        color: #333333;
        font-size: 24px;
        line-height: 24px;
        margin-top: 12px;
        width: 100%;
        font-weight: bold;
        margin-left: 40px;
      }
    }

    &.iscollapse {
      --el-aside-width: 64px;

      .logo {
        justify-content: center;

        > span {
          display: none;
        }
      }
    }

    .el-menu-vertical {
      height: calc(100% - 60px);
    }

    .el-menu-vertical:not(.el-menu--collapse) {
      width: 100%;
    }

    :deep().el-menu {
      border: 0;
      background: inherit;
      height: calc(100% - 192px);
      transition: none;

      .el-menu-item {
        transition: none;
        height: 44px;
        margin-bottom: 20px;

        &.is-active {
          --el-menu-active-color: white;
          background-color: #6158ff;
          border-radius: 10px;
        }

        > span {
          font-weight: bold;
          font-size: 16px;
        }
      }

      .el-sub-menu {
        margin: 0 11px;
        margin-bottom: 20px;

        .el-sub-menu__title {
          height: 100%;
          > span {
            font-weight: bold;
            font-size: 16px;
          }
        }

        .el-menu-item {
          height: 40px;
          justify-content: flex-start;
          padding-left: 0;
        }

        .el-menu {
          background: inherit;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;

          .el-menu-item {
            margin-bottom: 4px;

            > span {
              font-weight: normal;
              margin-left: 16px;
              font-size: 14px;
            }
          }
        }
      }
    }
  }

  .el-header {
    --el-header-padding: 0;

    &.fullsreen {
      display: none;
    }

    & + .el-main {
      height: calc(100% - 73px);
    }

    .header {
      background-color: #f6f6ff;
      height: calc(100% - 1px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e1e1e1;
      padding: 0 30px;
      .language {
        margin-left: 0;
        font-size: 25px;
        color: $p-color-primary;
        cursor: pointer;
      }

      .user-info {
        display: flex;
        align-items: center;

        .user-img {
          width: 40px;
          height: 40px;
          background: #ffffff;
          box-shadow: 0px 5px 14px 1px rgba(8, 3, 95, 0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 20px;
          .user-have {
            width: 100%;
            height: 100%;
            background-size: cover;
            border-radius: 50%;
          }
        }
      }

      > div {
        display: flex;
        align-items: center;
        height: 100%;

        > i {
          margin-left: 20px;
          font-size: 24px;
        }

        img {
          width: 24px;
          height: 24px;
          background-size: contain;
        }

        .line {
          display: inline-block;
          width: 1px;
          height: 18px;
          background: #d1d1d1;
          margin: 0 30px;
        }
      }
    }
  }
}

.user-info-body {
  width: 80px;
  display: flex;
  justify-content: center;
  margin-top: 10px;

  ul {
    list-style: none;
  }

  li {
    margin-bottom: 16px;
    text-align: center;
    cursor: pointer;

    > span {
      font-size: 14px;
    }
  }
}
.language-body {
  li {
    cursor: pointer;
    margin-bottom: 10px;
  }
}
</style>
