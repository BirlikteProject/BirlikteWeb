<template>
  <div class="sidebar-wrapper">
    <div
      v-for="(link, i) in links"
      :key="i"
      class="links"
      @click="changeSelected(i)"
    >
      <nuxt-link
        :to="link.to"
        class="link-item"
        :class="{ 'selected-link': selected === i }"
      >
        <i class="afet-icons" :class="`afet-${link.icon}`"></i>
        <span class="link-title">{{ link.title }}</span>
      </nuxt-link>
    </div>
    <div class="links" @click="changeSelected(-1)">
      <nuxt-link to="/olustur" class="link-item create-link">
        <i class="afet-icons afet-plus"></i>
        <span class="link-name">Oluştur</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {
      selected: 0,
      links: [
        {
          to: '/',
          title: 'Anasayfa',
          icon: 'home',
        },
        {
          to: '/talepler',
          title: 'Talepler',
          icon: 'request',
        },
        {
          to: '/mesajlar',
          title: 'Mesajlar',
          icon: 'message',
        },
        {
          to: '/profil',
          title: 'Profil',
          icon: 'profile',
        },
        {
          to: '/arama',
          title: 'Arama',
          icon: 'search',
        },
      ],
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.user.isAuthenticated
    },
  },
  methods: {
    changeSelected(i) {
      this.selected = i
    },
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
  @include media(md, lg, xl) {
    position: fixed;
    padding-top: 6rem;
    top: 0;
    
  }

  @include media(xs, sm) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .link-title {
      display: none;
    }
  }

  .selected-icon {
    color: blue !important;
  }

  .afet-icons {
    margin-right: 10px;
    font-weight: 500;
    font-size: 1.5rem;

    @include media(xs, sm) {
      margin-right: 0;
      font-size: 1.5rem;
    }
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
    display: none;
    margin-top: 2rem;

    @include media(xs, sm) {
      display: none !important;
    }
  }

  .links {
    &:nth-child(4) {
      font-size: 1.25rem;
    }

    @include media(xs, sm) {
      &:nth-child(1) {
        order: 1;
      }

      &:nth-child(2) {
        order: 3;
      }

      &:nth-child(3) {
        order: 4;
      }

      &:nth-child(4) {
        order: 5;
      }

      &:nth-child(5) {
        order: 2;
      }
      &:nth-child(6) {
        order: 6;
        display: none !important;
      }
    }
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
    @include media(xs, sm) {
      padding: 0;
      height: 2rem;
      width: auto;
      justify-content: center;
    }

    .link-name {
      display: flex;
      align-items: center;
      margin-left: 0.5rem;
      padding-top: 5px;
    }
    .link-title {
      margin-left: 0.5rem;
      padding-top: 5px;
    }
  }
}
</style>
