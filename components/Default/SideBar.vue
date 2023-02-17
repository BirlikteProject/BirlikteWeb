<template>
  <div class="sidebar-wrapper">
    <div v-for="(link, i) in links" :key="i" class="links" @click="changeSelected(i)">
      <nuxt-link :to="link.to" class="link-item" :class="{ 'selected-link': selected === i }">
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
    <div class="hamburger-mobile links">
      <div class="hamburger-menu link-item">
        <i class="afet-icons afet-bars"></i>
        <div class="more-dropdown">
          <span class="more-dropdown-item" @click="$router.push('/hakkimizda')">Hakkında</span>
          <span class="more-dropdown-item" @click="$router.push('/hakkimizda')">İletişim</span>
          <span class="more-dropdown-item" @click="setKvkkModal">KVKK</span>
          <span class="more-dropdown-item" @click="setPrivacyPolicy">Gizlilik Sözleşmesi</span>
        </div>
      </div>
    </div>
    <div class="hamburger-menu-wrapper">
      <div class="hamburger-menu">
        <i class="afet-icons afet-bars"></i>
        <span class="more-setting">Daha Fazla</span>
        <div class="more-dropdown">
          <span class="more-dropdown-item" @click="$router.push('/hakkimizda')">Hakkında</span>
          <span class="more-dropdown-item" @click="$router.push('/hakkimizda')">İletişim</span>
          <span class="more-dropdown-item" @click="setKvkkModal">KVKK</span>
          <span class="more-dropdown-item" @click="setPrivacyPolicy">Gizlilik Sözleşmesi</span>
        </div>
      </div>
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
    setKvkkModal() {
      this.$store.dispatch('modal/setKvkkModal', true)
    },
    setPrivacyPolicy() {
      this.$store.dispatch('modal/setPrivacyPolicy', true)
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
  position: relative;

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

  .hamburger-mobile {
    height: 100%;
    @include media(md, lg, xl) {
      display: none !important;
    }
    @include media(xs, sm) {
      display: block!important;
      position: static!important;
    }
    .hamburger-menu {
      vertical-align: middle!important;
      margin: auto;
    }
    &:hover {
      color: #fff;

      .more-dropdown {
        display: flex;
      }

      .more-setting {
        font-weight: 600;
        color: $primary-color;
      }
    }
    .more-dropdown {
      background-color: white;
      margin-left: 2rem;
    }
  }

  .hamburger-menu-wrapper {
    position: absolute;
    bottom: 2rem;
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    @include media(xs, sm) {
      display: none;
    }

    &:hover {
      color: #fff;

      .more-dropdown {
        display: flex;
      }

      .more-setting {
        font-weight: 600;
        color: $primary-color;
      }
    }
  }

  .hamburger-menu {
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    width: 100%;

    i {
      color: #4a4a4a;
      margin: 0 !important;
      font-size: 1.5rem;
      font-weight: 500;
    }

    .more-setting {
      margin-left: 1rem;
      font-size: 1.25rem;
      font-weight: 500;
      padding-top: 3px;
      color: #4a4a4a;
    }

    .more-dropdown {
      position: absolute;
      bottom: calc(100% + 1rem);
      display: none;
      flex-direction: column;
      box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      overflow: hidden;
      padding: 0.5rem 0;

      .more-dropdown-item {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        font-weight: 500;
        color: #4a4a4a;

        &:hover {
          background-color: $primary-color;
          color: #fff;
        }
      }
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
    color: $primary-color !important;

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

      &:hover {
        font-weight: 600;
        color: $primary-color;
      }
    }
  }
}
</style>
