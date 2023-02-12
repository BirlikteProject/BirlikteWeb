<template>
  <div class="sidebar-wrapper">
    <nuxt-link to="/" class="link-item"> Anasayfa </nuxt-link>
    <nuxt-link to="/talepler" class="link-item"> Talepler </nuxt-link>
    <nuxt-link to="/mesajlar" class="link-item"> Mesajlar </nuxt-link>
    <nuxt-link to="/profil" class="link-item"> Profil </nuxt-link>
    <nuxt-link to="/arama" class="link-item"> Arama </nuxt-link>

    <nuxt-link to="/olustur" class="link-item">
      <i class="afet-icons afet-plus"></i>

      <span class="link-name">Oluştur</span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {}
  },
}
</script>

<style lang="scss">
.sidebar-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
  height: 100%;
  .link-item {
    text-decoration: none;
    color: $primary-text-color;
    font-weight: 500;
    font-size: 1.25rem;
    display: flex;
    width: auto !important;
    align-items: center;
    padding: 0 1rem;
    height: 3rem;
    &:last-child {
        background-color: $primary-color;
        color: white;
        border-radius: 10px;
        font-weight: 400;
        margin-top: 2rem;
    }
    .link-name {
      display: flex;
      align-items: center;
      margin-left: 0.5rem;
      padding-top: 3px;
    }
  }
}
</style>