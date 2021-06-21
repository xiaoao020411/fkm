import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'

import Muke from '../views/Muke.vue'
import Information from '../views/Information.vue'
import Teachers from '../views/Teachers.vue'
import Picture from '../views/Picture.vue'
import Commodity from '../views/Commodity.vue'

import Admin from '../views/Admin.vue'

import InformationAdd from '../views/InformationAdd.vue'
import CommodityAdd from '../views/CommodityAdd.vue'

import layou from '../views/layou.vue'
import PictureAdd from '../views/PictureAdd.vue'
import AdminAdd from '../views/AdminAdd.vue'
import TeachersAdd from '../views/TeachersAdd.vue'

import Mechanism from '../views/Mechanism.vue'
import Liaison from '../views/Liaison.vue'
import Role from '../views/Role.vue'
import Role_add from '../views/Role_add.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Muke',
    component: Muke,
  },
  {
    path: '/layou',
    name: 'layou',
    component: layou,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },

  {
    path: '/muke',
    name: 'Muke',
    component: Muke,
    children: [
      //角色添加
      {
        path: '/adminRoleAdd',
        name: 'Role_add',
        component: Role_add,
      },
      //角色展示
      {
        path: '/adminRole',
        name: 'Role',
        component: Role,
      },
      //联络信息
      {
        path: '/contact',
        name: 'Liaison',
        component: Liaison,
      },
      //机构信息
      {
        path: '/records',
        name: 'Mechanism',
        component: Mechanism,
      },
      //图片添加
      {
        path: '/pictureAdd',
        name: 'PictureAdd',
        component: PictureAdd,
      },
      // 大事记管理列表
      {
        path: '/records/:typeid',
        name: 'Memorabilia',
        // component: WorksAdd,
        component: () => import('../views/Memorabilia.vue'),
      },
      {
        path: '/muke/memorabiliaAdd/:typeid',
        name: 'MemorabiliaAdd',
        // component: WorksAdd,
        component: () => import('../views/MemorabiliaAdd.vue'),
      },
      {
        path: '/muke/memorabiliaEdit/:typeid',
        name: 'MemorabiliaEdit',
        // component: WorksAdd,
        component: () => import('../views/MemorabiliaAdd.vue'),
      },
      //管理员展示
      {
        path: '/administrators',
        name: 'Admin',
        component: Admin,
      },
      {
        path: '/administratorAdd',
        name: 'AdminAdd',
        component: AdminAdd,
      },
      //课程展示
      {
        path: '/courses',
        name: 'Information',
        component: Information,
      },
      //师资展示
      {
        path: '/teachers',
        name: 'Teachers',
        component: Teachers,
      },
      //师资添加
      {
        path: '/teacherAdd',
        name: 'TeachersAdd',
        component: TeachersAdd,
      },
      //图片展示
      {
        path: '/pictures',
        name: 'Picture',
        component: Picture,
      },
      //商品展示
      {
        path: '/products',
        name: 'Commodity',
        component: Commodity,
      },
      //课程添加
      {
        path: '/coursesadd',
        name: 'InformationAdd',
        component: InformationAdd,
      },
      //商品添加
      {
        path: '/productAdd',
        name: 'CommodityAdd',
        component: CommodityAdd,
      },
    ],
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
})

export default router
