import { mapState } from 'vuex'
export default {
  beforeRouteEnter(to, from, next) {
    next(() => {
      window.scrollTo(0, 0)
    })
  },
  computed: mapState({
    swiperOptions: state => state.swiperOptions,
  }),
}
