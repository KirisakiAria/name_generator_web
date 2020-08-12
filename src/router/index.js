import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/privacypolicy',
    name: 'PrivacyPolicy',
    component: () => import('@/views/PrivacyPolicy'),
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('@/views/Terms'),
  },
  {
    path: '/usage',
    name: 'Usage',
    component: () => import('@/views/Usage'),
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: () => import('@/views/Feedback'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
