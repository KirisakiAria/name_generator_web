<template>
  <section class="home">
    <header class="header">
      <div class="logo">
        <img src="../assets/img/logo.png" alt="" />
        <span>彼岸自在</span>
      </div>
      <nav class="nav">
        <button @click="toggleMenu">
          <i class="iconfont icon-menu"></i>
        </button>
        <ul class="menu" v-if="menu">
          <li v-for="(item, index) in link" :key="index">
            <router-link :to="item.path">
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </nav>
    </header>
    <section class="main">
      <h1>彼岸自在</h1>
      <p>最懂你的ID生成器</p>
      <div class="download">
        <a href="/download/bianzizai_latest.7z">
          <img src="../assets/img/android.png" alt="" />
        </a>
      </div>
    </section>
    <footer>
      © 2020 济南槐荫大老师软件开发中心 京ICP备17037456号-2
    </footer>
  </section>
</template>
<script>
  import mixin from '../mixin/mixin'

  export default {
    name: 'Home',
    mixins: [mixin],
    data() {
      return {
        menu: false,
        link: [
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
        ],
      }
    },
    methods: {
      toggleMenu() {
        this.menu = !this.menu
      },
    },
  }
</script>

<style lang="less" scoped>
  @import url('../assets/css/style.less');
  .home {
    padding: 0;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      padding: 0.3rem;

      .logo {
        img {
          width: 0.65rem;
          margin-right: 0.1rem;
        }
        span {
          font-size: 0.36rem;
          color: rgb(95, 39, 205);
        }
      }

      .nav {
        i {
          font-size: 0.46rem;
          color: #999;
        }
        .menu {
          width: 100%;
          position: absolute;
          left: 0;
          top: 1.2rem;
          background: #fff;
          border-bottom: 1px solid #f1f1f1;
          li {
            border-top: 1px solid #f1f1f1;
            a {
              display: block;
              padding: 0.3rem 0.2rem;
            }
          }
        }
      }
    }

    .main {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      text-align: center;
      h1 {
        margin-top: 0.5rem;
        font-weight: bold;
        font-size: 0.6rem;
      }
      p {
        margin-top: 0.2rem;
        font-size: 0.36rem;
        text-align: center;
      }
      .download {
        margin-top: 0.2rem;
        img {
          width: 2.6rem;
        }
      }
    }
  }
</style>
