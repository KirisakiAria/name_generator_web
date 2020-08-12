import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_API

//返回码非1000统一处理
axios.interceptors.response.use(
  res => {
    if (res.data.code != '1000') {
      Vue.toasted
        .show('请求出错，请稍后再试', {
          position: 'bottom-center',
        })
        .goAway(2500)
    }
    return res
  },
  error => {
    Vue.toasted
      .show('请求出错，请稍后再试', {
        position: 'bottom-center',
      })
      .goAway(2500)
    return Promise.reject(error)
  },
)

Vue.prototype.$get = axios.get
Vue.prototype.$post = axios.post
