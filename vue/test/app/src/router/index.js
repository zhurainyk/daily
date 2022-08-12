import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [

  {
    path:'/index',
    name:'index',
    component:()=>import('../views/scroll/index.vue')
  },
  {
    path:'/formdata',
    name:'formdata',
    component:()=>import('@/views/form')
  },
  {
   path:'/elementui',
    name:'elementui',
    component:()=>import('../views/elementui.vue')
  },
  {
    path:'/myscroll',
    name:'myscroll',
    component:()=>import('../views/myScroll/index.vue')
  },
    {
    path:'/vscroll',
    name:'vscroll',
    component:()=>import('../views/virturlScroll/index.vue')
  },
  {
    path:'/drawer',
    name:'drawer',
    component:()=>import('../views/drawer/index.vue')
  },
    {
    path:'/decorator',
    name:'decorator',
    component:()=>import('../views/decorator/index.vue')
  },
    {
    path:'/test',
    name:'test',
    component:()=>import('../views/test/index.vue')
  },
  {
    path: "/",
    name: "Home",
    component: () => import("../views/maps/map1.vue"),
    // redirect:'/map2',
    // children: [
    //   {
    //     path: "/map1",
    //     name: "map1",
    //     component: () => import("../views/maps/map1.vue"),
    //   },
    //   {
    //     path: "/map2",
    //     name: "map2",
    //     component: () => import("../views/maps/map2.vue"),
    //   },
    // ],
  },
  {
    path:'/flowchart',
    name:'flowchart',
    component:()=>import('../views/vue-flowchart-editor/index.vue')
  },
  {
   path:'/video',
   name:'video',
   component:()=>import('../views/videoplayer/index2.vue') 
  },
  {
   path:'/swiper',
   name:'swiper',
   component:()=>import('../views/swiper/index.vue') 
  },
  {
   path:'/vjiexi',
   name:'vjiexi',
   component:()=>import('../views/video/index.vue') 
  },
  {
    path:'/threejs/demo',
    name:'threejsdemo',
    component:()=>import('../views/threejs/demo.vue') 
   },
];

const router = new VueRouter({
  routes,
  mode:'history',
  base:'/vue'
});

export default router;
