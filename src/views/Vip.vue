<template>
  <section class="container update">
    <header-bar />
    <section class="content" v-html="content"></section>
    <footer-bar />
  </section>
</template>
<script>
  import mixin from '../mixin/mixin'

  export default {
    name: 'Vuo',
    mixins: [mixin],
    data() {
      return { content: '' }
    },
    methods: {
      async getData() {
        const res = await this.$get(this.API.vip)
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
  .update {
    padding-top: 1.8rem;
  }
</style>
