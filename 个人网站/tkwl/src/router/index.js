import { createRouter as _createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

// const pages = import.meta.glob('../src/pages/**/*.vue')
// const routes = Object.keys(pages).map((path)=>{
//   let name = path.match(/\/pages(.*)\.vue$/)[1].toLowerCase();
//   if(name.substring(name.length - 5) == 'index'){
//     name = name.slice(0, -5);//去掉最后的index
//   }
//   return {
//     path: name === '/home' ? '/': name,
//     component: pages[path]
//   }
// })

const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('@/components/layout.vue'),
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/view/HomePage.vue'),
        meta: {
          title: '首页'
        },
        id: '1',
        parentId: '-1',
      },
      {
        path: '/production',
        name: 'Production',
        meta: {
          title: '产品'
        },
        id: '2',
        redirect: '/production/software',
        parentId: '-1',
        children: [
          {
            path: '/production/software',
            name: 'SoftWare',
            component: () => import('@/view/SoftWare.vue'),
            meta: {
              title: '软件产品'
            },
            id: '2-1',
            parentId: '2',
          },
          {
            path: '/production/hardware',
            name: 'HardWare',
            component: () => import('@/view/HardWare.vue'),
            meta: {
              title: '硬件产品'
            },
            id: '2-2',
            parentId: '2',
            children: [
              
            ]
          },
          {
            path: '/production/hardware/hardwaredetail',
            name: 'HardWareDetail',
            component: () => import('@/view/HardWareDetail.vue'),
            meta: {
              title: '产品详情'
            },
            id: '2-2-1',
            parentId: '2-2',
          }
        ]
      },
      {
        path: '/solution',
        name: 'Solution',
        component: () => import('@/view/Solution.vue'),
        meta: {
          title: '解决方案'
        },
        id: '3',
        parentId: '-1',
      },
      {
        path: '/newsinformation',
        name: 'NewsInformation',
        component: () => import('@/view/NewsInformation.vue'),
        meta: {
          title: '最新资讯'
        },
        id: '4',
        parentId: '-1',
      },
      {
        path: '/aboutus',
        name: 'AboutUs',
        component: () => import('@/view/AboutUs.vue'),
        meta: {
          title: '关于我们'
        },
        id: '5',
        parentId: '-1',
      }
    ]
  }
]

export function createRouter() {
  return _createRouter({
    history: createWebHistory(),
    routes
  })
}

