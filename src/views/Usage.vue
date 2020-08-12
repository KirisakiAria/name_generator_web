<template>
  <section class="container">
    <h1>使用方法</h1>
    <section v-html="content"></section>
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
