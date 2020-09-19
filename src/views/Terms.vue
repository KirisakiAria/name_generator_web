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
    name: 'Terms',
    mixins: [mixin],
    data() {
      return { content: '' }
    },
    methods: {
      async getData() {
        const res = await this.$get(this.API.terms)
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
