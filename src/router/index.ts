import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'

const routes: Array<RouteRecordRaw> = [

  //懒加载方式
  //component：resolve=>(require(['需要加载的路由的地址'])，resolve)
  //const HelloWorld = （）=>import('需要加载的模块地址') //不加 { } ，表示直接return  component: ()=>import(/*webpackChunkName:"HelloWorld"*/"@/components/HelloWorld")
  //component: r => require.ensure([],() =>  r(require('@/components/HelloWorld')), 'home')
  // {
  //   path: '/axios',
  //   name: 'Axios',
  //   component: () => import('@/views/axios.vue') // 懒加载组件
  // }
  {
    path:'/',
    name:'index',
    component:() => import(/*webpackChunkName:'index'*/'../view/index/index.vue')
  },
  {
    path:'/playlist/:id',
    name:'playlist',
    component:() => import(/*webpackChunkName:'playlist'*/'../view/playlist/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
