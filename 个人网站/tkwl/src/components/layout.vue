<template>
  <div id="container">
    <router-view v-slot="{ Component }">
      <transition  name="slide">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup name="layout"></script>

<style scoped>
#container{
  min-height: 100vh;
}
/* 路由切换动画 */
/* fade-transform */
/* .fade-leave-active,
.fade-enter-active {
  transition: all 0.4s;
}
 
.fade-enter-from {
  opacity: 0;
  transform: translateY(-100vh);
}

.fade-enter-to {
  opacity: 1;
  transform: translateY(0px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(100vh);
} */
/* 动画第二组 */

/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}


.fade-enter-from,
.fade-leave-to {
  opacity: 0;
} */

/* 动画第三组 slide */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.75s ease-out;
}


.slide-enter-to {
  position: absolute;
  right: 0;
}


.slide-enter-from {
  position: absolute;
  right: -100%;
}


.slide-leave-to {
  position: absolute;
  left: -100%;
}


.slide-leave-from {
  position: absolute;
  left: 0;
}

/* 动画第四组 name="scale" mode="out-in" */
/* .scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}


.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
} */
/* 动画第五组  name="scale-slide" */
/* .scale-slide-enter-active,
.scale-slide-leave-active {
  position: absolute;
  transition: all 0.85s ease;
}


.scale-slide-enter-from {
  left: -100%;
}


.scale-slide-enter-to {
  left: 0%;
}


.scale-slide-leave-from {
  transform: scale(1);
}


.scale-slide-leave-to {
  transform: scale(0.8);
} */
</style>
