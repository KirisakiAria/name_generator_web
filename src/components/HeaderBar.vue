<template>
  <header class="header">
    <div class="logo">
      <a href="https://www.bianzizai.com">
        <img src="../assets/img/logo.png" alt="彼岸自在 最懂你的网名生成器" />
        <span>彼岸自在</span>
      </a>
    </div>
    <nav class="nav" v-if="window.innerWidth <= 750">
      <button @click="toggleMenu">
        <i class="iconfont icon-menu"></i>
      </button>
      <transition name="fade">
        <div v-if="menu" class="menu">
          <div class="menu-header">
            <div class="logo">
              <a href="https://www.bianzizai.com">
                <img
                  src="../assets/img/logo.png"
                  alt="彼岸自在 最懂你的网名生成器"
                />
                <span>彼岸自在</span>
              </a>
            </div>
            <button @click="menu = false" class="close-btn">
              <i class="iconfont icon-close"></i>
            </button>
          </div>
          <ul>
            <li @click="toggleMenu" v-for="(item, index) in link" :key="index">
              <router-link :to="item.path">
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </transition>
    </nav>
    <nav class="nav" v-else>
      <ul class="menu-pc">
        <li v-for="(item, index) in link" :key="index">
          <router-link :to="item.path">
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'HeaderBar',
    data() {
      return {
        window: window,
        menu: false,
        link: [
          {
            name: '主页',
            path: '/',
          },
          {
            name: '隐私政策',
            path: 'privacypolicy',
          },
          {
            name: '服务条款',
            path: 'terms',
          },
          {
            name: '使用方法',
            path: 'usage',
          },
          {
            name: '更新日志',
            path: 'update',
          },
          {
            name: 'VIP会员政策',
            path: 'vip',
          },
          {
            name: '激活码',
            path: 'key',
          },
        ],
      }
    },
    props: {
      white: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      toggleMenu() {
        this.menu = !this.menu
      },
    },
  }
</script>
<style lang="less" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    padding: 0.3rem;
    background: rgba(0, 0, 0, 0.65);
    z-index: 1000;

    .logo {
      img {
        width: 0.65rem;
        margin-right: 0.1rem;
      }
      span {
        font-size: 0.36rem;
        color: #fff;
      }
    }

    .nav {
      i {
        font-size: 0.46rem;
        color: #fff;
      }
      .menu {
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: #000;
        border-bottom: 1px solid #333;

        .menu-header {
          display: flex;
          justify-content: space-between;
          padding: 0.3rem;
        }
        li {
          border-top: 1px solid #333;
          a {
            display: block;
            padding: 0.4rem 0.2rem;
            color: #fff;
          }
        }
      }
      .menu-pc {
        display: flex;
        li {
          margin-left: 40px;
          a {
            display: block;
            font-size: 24px;
            color: #fff;
            &:hover {
              color: #5f27cd;
            }
          }
        }
      }
    }
  }
</style>
