import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/tableau-bord'
  },
  {
    path: '/tableau-bord',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/nouvelle-source',
    name: 'NewSource',
    component: () => import('../views/NewSource.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
