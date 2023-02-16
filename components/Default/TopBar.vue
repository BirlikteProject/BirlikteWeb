<template>
  <div class="top-bar-wrapper">
    <div class="content top-bar-content">
      <div class="top-bar-logo-section">
        <img
          :src="require('~/assets/img/logo-white.png')"
          alt=""
          class="desktop"
        />
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
        <button v-if="isAuthenticated" class="register-button exit-button" @click="logout">
          Çıkış Yap
        </button>
        <nuxt-link v-if="isAuthenticated" to="/olustur" class="create-button">
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
    return {}
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
    padding:  1rem;
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
        display:none;
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
