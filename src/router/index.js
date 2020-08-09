import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/privacypolicy',
    name: 'PrivacyPolicy',
    component: () => import('@/views/PrivacyPolicy'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
