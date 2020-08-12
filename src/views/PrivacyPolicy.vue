<template>
  <section class="container">
    <h1>隐私协议</h1>
    <section v-html="content"></section>
  </section>
</template>
<script>
  import mixin from '../mixin/mixin'

  export default {
    name: 'PrivacyPolicy',
    mixins: [mixin],
    data() {
      return { content: '' }
    },
    methods: {
      async getData() {
        const res = await this.$get(this.API.privacyPolicy)
        if (res.data.code == '1000') {
          this.content = res.data.data
        }
      },
    },
    created() {
      this.getData()
    },
  }
</script>
