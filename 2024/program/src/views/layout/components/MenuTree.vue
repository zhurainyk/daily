<template>
  <template v-if="menu.childs && menu.childs.length > 0">
    <el-sub-menu :index="menu.name">
      <template #title>
        <i v-show="menu.icon" :class="menu.icon"></i>
        <span>{{ menu.description }}</span>
      </template>
      <menu-list v-for="m in menu.childs" :key="m.id" :menu="m" :index="m.name">
      </menu-list>
    </el-sub-menu>
  </template>
  <template v-else>
    <el-menu-item :index="`${menu.name}`" @click="directMen(menu)">
      <i v-show="menu.icon" :class="menu.icon"></i>
      <span>{{ menu.description }}</span>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MenuList',
  props: {
    menu: {
      type: Object,
      require: true
    },
    index: Number
  },
  setup(props, contxt) {
    const $router = useRouter()
    const directMen = (m: MenuDao) => {
      $router.push({ name: m.name })
    }
    return {
      directMen
    }
  }
})
</script>

<style lang="scss" scoped>
.el-menu-item,
.el-sub-menu {
  translate: none !important;
  margin: 0 11px;
  i {
    width: 26px;
    height: 26px;
    display: inline-block;
    background-size: contain;
    margin-right: 10px;
    background-repeat: no-repeat;
  }
  .iconfont {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    color: $p-color-primary;
  }
  > span {
    font-weight: bold;
  }
  &.is-active {
    // padding-left: 10px !important;
    &:not(.is-opened) {
      background: linear-gradient(-30deg, #6158ff, #6427de);
      height: 46px;
      margin: 0 10px;
      .iconfont {
        color: white;
      }
    }
    .uac-img {
      background-image: url('../../../public/images/menu/UAC-active@2x.png');
    }
    .scule-img {
      background-image: url('../../../public/images/menu/scule-active@2x.png');
    }

    .kown-img {
      background-image: url('../../../public/images/menu/kown@2x.png');
    }
    .user-manage-img {
      background-image: url('../../../public/images/menu/usemanagement@2x.png');
    }
    .config-img {
      background-image: url('../../../public/images/menu/config-active@2x.png');
    }
    .framework-img {
      background-image: url('../../../public/images/menu/framework-active@2x.png');
    }
  }
  .uac-img {
    background-image: url('../../../public/images/menu/UAC@2x.png');
  }
  .scule-img {
    background-image: url('../../../public/images/menu/scule@2x.png');
  }
  > ul {
    display: flex;
    > li {
      width: 170px;
      min-width: 170px;
    }
  }
  .kown-img {
    background-image: url('../../../public/images/menu/kown@2x.png');
  }
  .user-manage-img {
    background-image: url('../../../public/images/menu/usemanagement@2x.png');
  }
  .config-img {
    background-image: url('../../../public/images/menu/config@2x.png');
  }
  .framework-img {
    background-image: url('../../../public/images/menu/framework@2x.png');
  }
}
</style>
