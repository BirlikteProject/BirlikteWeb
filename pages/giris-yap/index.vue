<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="login-page-container">
    <div class="image-side-section">
      <image-side />
    </div>
    <div class="login-form-seciton">
      <div class="login-form">
        <span class="form-name">Giriş Yap</span>
        <div class="login-types">
          <div
            class="login-type"
            :class="loginType == types.DEMANDER ? 'selected' : ''"
            @click="loginType = types.DEMANDER"
          >
            Afetzede Girişi
          </div>
          <div
            class="login-type"
            :class="loginType == types.SUPPORTER ? 'selected' : ''"
            @click="loginType = types.SUPPORTER"
          >
            Destekçi Girişi
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
          <button class="primary-button" @click="login">Giriş Yap</button>
          <div class="or-sign-with-google">
            <span class="google-text">veya Google ile devam et</span>
          </div>
          <button class="primary-button google-button" @click="signWithGoogle()">
            <i class="afet-icons afet-google"></i>
            <span>Google ile devam et</span>
          </button>
          <div class="no-account">
            <span>Hesabın yok mu?</span>
            <span class="register-link" @click="$router.push('/kayit-ol')"
              >Kayıt Ol</span
            >
            <span class="register-link" @click="$router.push({ path: '/kayit-tamamla', query: { id: 'asd' } })"
              >Kayıt Tamamla</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageSide from '~/components/Auth/ImageSide.vue'
import types from '~/data/types.json'
export default {
  name: 'LoginPage',
  components: { ImageSide },
  layout: 'empty',
  data() {
    return {
      types,
      loginType: types.DEMANDER,
      email: '',
      password: '',
    }
  },
  methods: {
    signWithGoogle () {
      this.$store.dispatch('user/signWithGoogle', { type: this.loginType })
    },
    login () {
      this.$store.dispatch('user/login', { email: this.email, password: this.password })
    }
  }
}
</script>

<style lang="scss">
.login-page-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  .image-side-section {
    width: 50%;
    height: 100vh;
    @include media(xs, sm) {
      display: none;
    }
  }
  .login-form-seciton {
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
}
</style>
