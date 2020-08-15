import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/rem'
//引入插件
import Toasted from 'vue-toasted'
//axios配置
import './request/requestConfig'
//引入样式
import './assets/css/base.less'
import './assets/fonts/iconfont.css'

Vue.config.productionTip = false
Vue.use(Toasted)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
