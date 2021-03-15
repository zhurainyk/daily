import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
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
  }
];

const router = new VueRouter({
  routes,
  mode:'history',
  base:'/vue'
});

export default router;
