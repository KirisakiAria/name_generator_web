<template>
  <footer class="footer" :class="{ white }">
    <div class="item">© 2020 All Rights Reserved. 彼岸自在 版权所有</div>
    <div class="item">
      <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">
        鲁ICP备2020036898号-1
      </a>
    </div>
    <div class="item">
      <a
        target="_blank"
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=37010502001272"
      >
        <img src="../assets/img/public_security_record.png" />
        <span>鲁公网安备 37010502001272号</span>
      </a>
    </div>
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
    margin-top: 60px;
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

    .item {
      line-height: 1.5;
      margin: 8px 0;

      img {
        margin-right: 8px;
      }

      @media screen and (max-width: 750px) {
        margin: 0.1rem 0;
      }
    }

    @media screen and (max-width: 750px) {
      margin-top: 1rem;
      font-size: 0.3rem;
      padding: 0.5rem 0.25rem;
      font-size: 0.28rem;
    }
  }
</style>
