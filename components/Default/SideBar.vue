<template>
  <div class="sidebar-wrapper">
    <div v-for="link, i in links" :key="i" @click="changeSelected(i)">
      <nuxt-link :to="link.to" class="link-item" :class="{ 'selected-link': selected === i }">
          <i class="afet-icons" :class="`afet-${link.icon}`"></i>
        {{ link.title }}
      </nuxt-link>
    </div>

    <nuxt-link to="/olustur" class="link-item create-link">
      <i class="afet-icons afet-plus"></i>
      <span class="link-name">Oluştur</span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {
      selected: 0,
      links: [{
        to: '/',
        title: 'Anasayfa',
        icon: 'home'
      },
      {
        to: '/talepler',
        title: 'Talepler',
        icon: 'request'
      },
      {
        to: '/mesajlar',
        title: 'Mesajlar',
        icon: 'message'
      },
      {
        to: '/profil',
        title: 'Profil',
        icon: 'profile'
      },
      {
        to: '/arama',
        title: 'Arama',
        icon: 'search-small'
      },
      ]
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.user.isAuthenticated
    }
  },
  methods: {
    changeSelected(i) {
      this.selected = i
    }
  }
}
</script>

<style lang="scss">
.afet-icons {
  margin-right: 10px;
}

.sidebar-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
  height: 100%;

  .selected-icon {
    color: blue!important;
  }

  .selected-link {
    background-color: inherit;
    color: #4a4a4a !important;
    border-radius: 10px;
    font-weight: 400;
    margin-top: 0;
    .afet-icons {
      color: $primary-color;
    }
  }

  .create-link {
    background-color: $primary-color;
    color: white !important;
    border-radius: 10px;
    font-weight: 400;
    margin-top: 2rem;
  }

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

    .link-name {
      display: flex;
      align-items: center;
      margin-left: 0.5rem;
      padding-top: 3px;
    }
  }
}
</style>
