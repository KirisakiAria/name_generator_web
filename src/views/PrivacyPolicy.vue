<template>
  <section class="privacy-policy container">
    <h1>隐私协议</h1>
    <p></p>
  </section>
</template>
<script>
  import mixin from '../mixin/mixin'

  export default {
    name: 'PrivacyPolicy',
    mixins: [mixin],
    data() {
      return {}
    },
    methods: {
      async getdata() {
        const res = this.$get(this.API.usage)
        if (res.data.code == '1000') {
          this.form = res.data.data
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  @import url('../assets/css/style.less');
</style>
