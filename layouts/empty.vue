<template>
  <div class="empty-layout">
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'EmptyLayout',
  // middleware: ['guest'],
  async mounted() {
    await this.$store.dispatch('user/fetchUser')
    if(this.$store.state.user.isAuthenticated) {
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
