<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="login-page-container">
    <a href="/" class="back-button">
      <i class="afet-icons afet-caret"></i>
      <span>Geri</span>
    </a>
    <div class="image-side-section">
      <image-side />
    </div>
    <div class="login-form-section">
      <form class="login-form" @submit.prevent="login()">
        <div class="logo-section">
          <img src="~/assets/img/logo-2.png" @click="$router.push('/')" />
        </div>
        <span class="form-name">Giriş Yap</span>
        <div class="login-types">
          <div
            class="login-type" :class="loginType == types.DEMANDER ? 'selected' : ''"
            @click="loginType = types.DEMANDER">
            Afetzede
          </div>
          <div
            class="login-type" :class="loginType == types.SUPPORTER ? 'selected' : ''"
            @click="loginType = types.SUPPORTER">
            Destekçi
          </div>
        </div>
        <div class="form-inputs">
          <div class="input-wrapper">
            <input v-model="email" type="email" placeholder="E-Posta" />
          </div>
          <div class="input-wrapper">
            <input v-model="password" type="password" placeholder="Şifre" />
          </div>
          <div class="forgot-password">Şifreni mi unuttun?</div>
          <input type="submit" value="Giriş Yap" class="primary-button" />
          <div v-if="submitted && error && !isLoading" class="error-messages">
            <span class="error-message">{{ error }}</span>
          </div>
          <spinner v-if="isLoading" class="spinner" />
          <div class="or-sign-with-google">
            <span class="google-text">veya Google ile devam et</span>
          </div>
          <button class="primary-button google-button" @click="signWithGoogle()">
            <i class="afet-icons afet-google"></i>
            <span>Google ile devam et</span>
          </button>
          <div class="no-account">
            <span>Hesabın yok mu?</span>
            <span class="register-link" @click="$router.push({ path: '/kayit-ol', query: { type: loginType } })">Kayıt
              Ol</span>
          </div>
        </div>
      </form>
    </div>
</div>
</template>

<script>
import ImageSide from '~/components/Auth/ImageSide.vue'
import Spinner from '~/components/Shared/Spinner.vue'
import types from '~/data/types.json'
export default {
  name: 'LoginPage',
  components: { ImageSide, Spinner },
  layout: 'empty',
  middleware: ['guest'],
  data() {
    return {
      types,
      loginType: this.$route.query.type ? this.$route.query.type : types.DEMANDER,
      email: '',
      password: '',
      submitted: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user
    },
    fieldsFilled() {
      return this.email && this.password
    },
    error() {
      if (!this.fieldsFilled) return 'Lütfen tüm alanları doldurunuz!'
      return this.$store.state.user.error
    },
    isLoading() {
      return this.$store.state.user.loading
    }
  },
  methods: {
    signWithGoogle() {
      this.submitted = false
      this.$store.dispatch('user/signWithGoogle', { type: this.loginType })
    },
    login() {
      this.submitted = true
      if (this.fieldsFilled)
        this.$store.dispatch('user/login', { email: this.email, password: this.password })
    }
  }
}
</script>

<style lang="scss">
.logo-section {
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  img {
    width: 200px;
  }
}

.login-page-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  overflow-x: hidden;
  .back-button {
    position: absolute;
    top: 2.5rem;
    left: 2.5rem;
    display: flex;
    font-size: 1.5rem;
    align-items: center;
    font-weight: 600;
    span {
      padding-top: 4px;
    }
    i {
      font-size: 2rem;
      transform: rotate(180deg);
    }
    color: #fff;
    @include media (xs, sm) {
      color: $primary-color;
      top: 1.5rem;
      left: 1.5rem;
      font-size: 1rem;
      i {
        font-size: 1.5rem;
      }
    }
    cursor: pointer;
  }

  .image-side-section {
    width: 50%;
    height: 100vh;

    @include media(xs, sm) {
      display: none;
    }
  }

  .login-form-section {
    width: 50%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @include media(xs, sm) {
      width: 100%;
    }

    .login-form {
      width: 416px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      @include media(xs, sm) {
        padding: 1rem;
        width: 100%;
      }
    }

    .form-name {
      padding: 1rem;
      font-size: 1.5rem;
      font-weight: 600;
      color: #828282;
    }

    .login-types {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;
      width: 100%;

      .login-type {
        width: 200px;
        height: 75px;
        border: 1px solid #dedede;
        border-radius: 10px;
        color: #828282;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;

        @include media(xs, sm) {
          width: 50%;
        }

        &.selected {
          background-color: $primary-color;
          color: #fff;
        }

        &:first-child {
          margin-right: 1rem;
        }
      }
    }

    .form-inputs {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;

      .input-wrapper {
        width: 100%;
        margin-bottom: 1rem;

        input {
          color: #828282;
          border: 1px solid #dedede;
          border-radius: 10px;
          outline: none;
          width: 100%;
          padding: 0.5rem;
          height: 2.5rem;
          font-size: 1rem;
          font-weight: 500;
        }
      }

      .forgot-password {
        margin-bottom: 1rem;
        color: #828282;
        font-size: 0.8rem;
        font-weight: 500;
        cursor: pointer;
        width: 100%;
        text-align: right;
      }

      .primary-button {
        background-color: $primary-color !important;
        width: 100%;
      }

      .or-sign-with-google {
        margin: 2rem 0;
        border-bottom: 1px solid #dedede;
        width: 100%;
        text-align: center;
        position: relative;

        .google-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 0 0.25rem;
          width: auto;
          color: #828282;
          font-size: 0.8rem;
          font-weight: 500;
          background-color: white;
        }
      }

      .google-button {
        background-color: white !important;
        width: 100%;
        color: #4a4a4a;
        border: 1px solid #dedede;
        border-radius: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        i {
          margin-right: 0.5rem;
        }
      }

      .no-account {
        margin-top: 1rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        .register-link {
          margin-left: 0.5rem;
          color: $primary-color;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
        }
      }
    }
  }

  .error-messages {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin: 0.5rem 0;

    .error-message {
      color: #ff0000;
      font-size: 1.1rem;
      font-weight: 500;
      text-align: center;
    }
  }

}
</style>
