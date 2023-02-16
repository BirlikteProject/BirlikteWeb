<template>
  <div class="empty-layout">
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'EmptyLayout',
  data() {
    return {
      isFrom: false
    }
  },
  watch: {
    $route(to, from) {
      this.isFrom = true
      if (to.path === '/kayit-tamamla' && from.path !== '/kayit-ol') {
        // return this.$router.push('/')
      }
    },
  },
  mounted() {
      // if(this.$route.path === '/kayit-tamamla' && !this.isFrom) this.$router.push('/')
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
