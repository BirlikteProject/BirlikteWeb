<template>
  <div class="footer-wrapper">
    <div class="content footer-content">
      <div class="logo-section">
        <img :src="require('~/assets/img/logo-white.png')" alt="" class="desktop" />
        <img :src="require('~/assets/img/logo-main.png')" alt="" class="mobile" />
      </div>
      <div class="link-list">
        <div v-for="(link, i) in links" :key="i" class="links">
          <nuxt-link :to="link.to" class="link-text">
            <span>{{ link.title }}</span>
          </nuxt-link>
        </div>
      </div>
    </div>
    <p class="copyright-text">©Copyright by birlikteorgtr</p>
</div>
</template>

<script>
export default {
  name: 'Ffooter',
  data() {
    return {
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
        {
          to: '/olustur',
          title: 'Oluştur',
          icon: 'create',
        },
        {
          to: '/hakkimizda',
          title: 'Hakkımızda',
          icon: 'about',
        },
        {
          to: '/iletisim',
          title: 'İletişim',
          icon: 'contact',
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
    setDisplay(modal, value) {
      this.$store.dispatch(`modal/set${modal}Modal`, value)
    },
    async logout() {
      await this.$store.dispatch('user/logout')
    },
  },
}
</script>

<style lang="scss">
.footer-wrapper {
  width: 100%;
  background-color: $primary-color;
  display: flex;
  flex-direction: column;
  z-index: 100;
  padding: .5rem;

  @include media(xs, sm) {
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    padding: 1rem;
    height: auto;
  }

  .footer-content {
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    font-size: 1.25rem;

    .logo-section {
      @include media(xs, sm) {
        .desktop {
          display: none;
        }

        .mobile {
          display: block;
          width: 75px;

        }
      }
      text-align: center;
      vertical-align: middle;
      img {
        position: relative;
        top: .6rem;
        left: 0;
        width: 100px;
      }
    }
  }

  .link-text {
    font-size: 1rem;
    color: white;
    margin: .5rem 0;
  }

  .link-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: flex-start;
    padding-bottom: 1rem;
  }
  .copyright-text {
    text-align: center;
    color: #f0f0f0;
  }
}
</style>
