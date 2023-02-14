<template>
  <div class="empty-layout">
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'EmptyLayout',
  // middleware: ['guest'],
  data() {
    return {
      isFrom: false
    }
  },
  watch: {
    $route(to, from) {
      this.isFrom = true
      if (to.path === '/kayit-tamamla' && from.path !== '/kayit-yap') {
        return this.$router.push('/')
      }
    },
  },
  mounted() {
    if(this.$route.path === '/kayit-tamamla' && !this.isFrom) {
      this.$router.push('/')
    }
  },
  created() {
    if (this.$store.state.user.isAuthenticated) {
      this.$router.push('/')
    }
  },
}
</script>
<style lang="scss">
.empty-layout {
  min-height: 100vh;
  width: 100%;
  background-color: white;
}
</style>
