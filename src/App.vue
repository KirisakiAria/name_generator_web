<template>
  <div id="app">
    <HeaderBar :transparent="transparent" />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <FooterBar />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        transparent: true,
      }
    },
    watch: {
      $route(val) {
        if (val.path.includes('home')) {
          this.transparent = true
        } else {
          this.transparent = false
        }
      },
    },
  }
</script>
