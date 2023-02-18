<template>
  <div class="top-bar-wrapper">
    <div class="content top-bar-content">
      <div class="top-bar-logo-section">
        <a href="/">
          <img
          :src="require('~/assets/img/logo-white.png')"
          alt=""
          class="desktop"
        />
        </a>
        <img
          :src="require('~/assets/img/logo-main.png')"
          alt=""
          class="mobile"
        />
      </div>
      <div class="auth-section">
        <nuxt-link v-if="!isAuthenticated" to="/giris-yap" class="login-button">
          Giriş Yap
        </nuxt-link>
        <nuxt-link
          v-if="!isAuthenticated"
          class="register-button"
          to="/kayit-ol"
        >
          Kayıt Ol
        </nuxt-link>
        <button
          v-if="isAuthenticated"
          class="register-button exit-button"
          @click="logout()"
        >
          Çıkış Yap
        </button>
        <div v-if="isAuthenticated && $route.path == '/profil'" class="top-bar-hamburger-menu-wrapper">
          <div class="top-bar-hamburger-menu" @click="openDropdown = !openDropdown">
            <i class="afet-icons afet-bars" ></i>
            <div class="top-bar-more-dropdown" :class="openDropdown ? 'displayed' :'hide'">
              <span class="top-bar-more-dropdown-item"> Oluştur </span>
              <span
                class="top-bar-more-dropdown-item"
                @click="$router.push('/hakkimizda')"
                >Hakkında</span
              >
              <span
                class="top-bar-more-dropdown-item"
                @click="$router.push('/hakkimizda')"
                >İletişim</span
              >
              <span class="top-bar-more-dropdown-item" @click="setKvkkModal()">KVKK</span>
              <span class="top-bar-more-dropdown-item" @click="setPrivacyPolicy()"
                >Gizlilik Sözleşmesi</span
              >
              <span class="top-bar-more-dropdown-item" @click="logout()">Çıkış Yap</span>
            </div>
          </div>
        </div>
        <nuxt-link v-if="isAuthenticated && $route.path !== '/profil'" to="/olustur" class="create-button">
          <i class="afet-icons afet-plus"></i>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  data() {
    return {
      openDropdown: false,
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['user/isAuthenticated']
    },
  },
  methods: {
    setDisplay(modal, value) {
      this.$store.dispatch(`modal/set${modal}Modal`, value)
    },
    setKvkkModal() {
      this.$store.dispatch('modal/setKvkkModal', true)
    },
    setPrivacyPolicy() {
      this.$store.dispatch('modal/setPrivacyPolicy', true)
    },
    async logout() {
      await this.$store.dispatch('user/logout')
    },
  },
}
</script>

<style lang="scss">
.top-bar-wrapper {
  width: 100%;
  background-color: $primary-color;
  height: 5rem;
  display: flex;
  justify-content: center;
  z-index: 100;
  position: fixed;
  top: 0;
  @include media(xs, sm) {
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    padding: 1rem;
    height: auto;
  }
  .top-bar-content {
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.825rem;
    .top-bar-logo-section {
      width: 50%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .mobile {
        display: none;
      }
      @include media(xs, sm) {
        .desktop {
          display: none;
        }
        .mobile {
          display: block;
          width: 75px;
        }
      }
      img {
        width: 100px;
      }
    }
    .auth-section {
      font-weight: 600;
      width: 50%;
      display: flex;
      justify-content: flex-end;
      button {
        border: none;
        cursor: pointer;
        outline: none;
      }
      .top-bar-hamburger-menu-wrapper {
        width: 100%;
        display: none;
        justify-content: center;
        align-items: flex-end;
        position: relative;
        @include media(xs,sm) {
          display: flex;
        }

      }
      .top-bar-hamburger-menu {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          border-radius: 5px;
          cursor: pointer;
          position: relative;
          width: 100%;

          i {
            color: $primary-color;
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
          .top-bar-more-dropdown {
            position: absolute;
            top: calc(100% + 1rem);
            right: 0;
            flex-direction: column;
            box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            overflow: hidden;
            padding: 0.5rem 0;
            background-color: #fff;
            &.displayed {
              display: flex;
            }
            &.hide {
              display: none;
            }
            .top-bar-more-dropdown-item {
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
      .login-button {
        background-color: transparent;
        color: #fff;
        padding: 0.5rem;
        border-radius: 5px;
        @include media(xs, sm) {
          color: $primary-color;
        }
      }
      .create-button {
        color: $primary-color;
        font-size: 1.25rem;
        display: none;
        @include media(xs, sm) {
          display: block;
        }
      }
      .register-button {
        background-color: #fff;
        color: $primary-color;
        padding: 0.5rem;
        border-radius: 5px;
        &.exit-button {
          @include media(xs, sm) {
            display: none;
          }
        }
        @include media(xs, sm) {
          background-color: $primary-color;
          color: #fff;
        }
      }
    }
    .contact-section {
      display: flex;
      align-items: center;
      .contact-item {
        display: flex;
        align-items: center;
        margin-right: 1rem;
        i {
          margin-right: 0.5rem;
        }
        .contact-text {
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .afet-icons {
        cursor: pointer;
        &:not(:last-child) {
          margin-right: 1rem;
        }
      }
    }
  }
}
</style>
