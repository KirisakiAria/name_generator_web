<template>
  <footer class="footer" :class="{ white }">
    © 2020 All Rights Reserved. 彼岸自在 版权所有
    <br />
    <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">
      鲁ICP备2020036898号-1
    </a>
  </footer>
</template>

<script>
  export default {
    name: 'FooterBar',
    props: {
      white: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>
<style lang="less" scoped>
  .footer {
    position: relative;
    padding: 25px 0;
    text-align: center;
    color: #666;
    z-index: 10;
    font-size: 16px;
    letter-spacing: 2px;
    line-height: 1.6;

    &.white {
      color: #fff;
    }
  }
</style>
