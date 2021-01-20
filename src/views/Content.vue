<template>
  <section class="container">
    <header-bar />
    <section class="content" v-html="content"></section>
    <footer-bar />
  </section>
</template>
<script>
  import mixin from '../mixin/mixin'

  export default {
    name: 'Content',
    mixins: [mixin],
    data() {
      return { content: '' }
    },
    methods: {
      async getData() {
        let url = ''
        const path = this.$route.path
        if (path.includes('privacypolicy')) {
          url = this.API.privacyPolicy
        } else if (path.includes('terms')) {
          url = this.API.terms
        } else if (path.includes('usage')) {
          url = this.API.usage
        } else if (path.includes('update')) {
          url = this.API.update
        } else if (path.includes('vip')) {
          url = this.API.vip
        } else if (path.includes('key')) {
          url = this.API.key
        }
        const res = await this.$get(url)
        if (res.data.code == '1000') {
          this.content = res.data.data
        }
      },
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getData()
      })
    },
  }
</script>
<style lang="less" scoped>
  .container {
    padding-top: 1.6rem;
  }
</style>
