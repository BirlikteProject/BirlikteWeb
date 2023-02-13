<template>
  <div class="top-bar-wrapper">
    <div class="content top-bar-content">
      <div class="logo-section">
        <img :src="require('~/assets/img/logo-white.png')" alt="">
      </div>
      <div class="auth-section">
        <nuxt-link v-if="!isAuthenticated" to="/giris-yap" class="login-button">
          Giriş Yap
        </nuxt-link>
        <nuxt-link v-if="!isAuthenticated" class="register-button" to="/kayit-ol">
          Kayıt Ol
        </nuxt-link>
        <nuxt-link v-if="isAuthenticated" class="register-button" @click="logout" to="/giris-yap">
          Çıkış Yap
        </nuxt-link>
      </div>
      <!-- <div class="contact-section">
        <i class="afet-icons afet-facebook tooltip">
          <tool-tip text="Facebook" />
        </i>
        <i class="afet-icons afet-twitter tooltip">
          <tool-tip text="Twitter" />
        </i>
        <i class="afet-icons afet-instagram tooltip">
          <tool-tip text="Instagram" />
        </i>
        <i class="afet-icons afet-youtube tooltip">
          <tool-tip text="Youtube" />
        </i>

      </div> -->
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
    }
  },
  methods: {
    setDisplay(modal, value) {
      this.$store.dispatch(`modal/set${modal}Modal`, value)
    },
    async logout() {
      await this.$store.dispatch('user/logout')
    }
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
  .top-bar-content {
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.825rem;
    .logo-section {
      img {
        width: 100px;
      }
    }
    .auth-section {
      font-weight: 600;
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
      }
      .register-button {
        background-color: #fff;
        color: $primary-color;
        padding: 0.5rem;
        border-radius: 5px;
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
