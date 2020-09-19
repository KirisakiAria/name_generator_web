<template>
  <section class="container usage">
    <header-bar />
    <section class="content" v-html="content"></section>
    <footer-bar />
  </section>
</template>
<script>
  import mixin from '../mixin/mixin'

  export default {
    name: 'Usage',
    mixins: [mixin],
    data() {
      return { content: '' }
    },
    methods: {
      async getData() {
        const res = await this.$get(this.API.usage)
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
<style lang="less" scoped>
  .usage {
    padding-top: 1.8rem;
  }
</style>
