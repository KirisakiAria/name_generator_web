import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navActivatedIndex: 0,
    swiperOptions: {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    },
  },
  mutations: {
    changeNavActivatedIndex(state, value) {
      state.navActivatedIndex = value
    },
  },
})
