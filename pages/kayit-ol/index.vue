<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="register-page-container">
    <a href="/" class="back-button">
      <i class="afet-icons afet-caret"></i>
      <span>Geri</span>
    </a>
    <KVKK v-if="kvkkModal" />
    <PrivacyPolicy v-if="privacyPolicyModal" />
    <div class="image-side-section">
      <image-side />
    </div>
    <div class="register-form-seciton">
      <div class="register-form">
        <div class="logo-section">
          <img src="~/assets/img/logo-2.png" @click="$router.push('/')" />
        </div>
        <span class="form-name">Kayıt Ol</span>
        <div class="register-types">
          <div
            class="register-type"
            :class="registerType == types.DEMANDER ? 'selected' : ''"
            @click="registerType = types.DEMANDER"
          >
            Afetzede
          </div>
          <div
            class="register-type"
            :class="registerType == types.SUPPORTER ? 'selected' : ''"
            @click="registerType = types.SUPPORTER"
          >
            Destekçi
          </div>
        </div>
        <div class="form-inputs">
          <form @submit.prevent="register()">
            <div class="input-wrapper">
              <input v-model="fullName" type="text" placeholder="Ad Soyad" />
            </div>
            <div class="input-wrapper">
              <input v-model="email" type="email" placeholder="E-Posta" />
            </div>
            <div class="input-wrapper">
              <input v-model="password" type="password" placeholder="Şifre" />
            </div>
            <div class="confirm-checkbox">
              <span
                class="custom-checkbox"
                :class="isKvkkAccepted ? 'checked' : ''"
                @click="isKvkkAccepted = !isKvkkAccepted"
              >
                <span />
              </span>
              <input v-model="isKvkkAccepted" type="checkbox" />
              <span class="kvkk-accept-text">
                <span class="underline" @click="setKvkkModal()"
                  >KVKK Metni'ni</span
                >
                ve
                <span class="underline" @click="setPrivacyPolicy()"
                  >Gizlilik Sözleşmesi'ni</span
                >
                okudum ve kabul ediyorum.
              </span>
            </div>
            <input type="submit" value="Kayıt Ol" class="primary-button" />
          </form>
          <spinner v-if="isLoading" class="spinner" />
          <div v-if="submitted && error && !isLoading" class="error-messages">
            <span class="error-message">{{ error }}</span>
          </div>
          <div class="or-sign-with-google">
            <span class="google-text">veya Google ile devam et</span>
          </div>
          <button
            class="primary-button google-button"
            @click="signWithGoogle()"
          >
            <i class="afet-icons afet-google"></i>
            <span>Google ile devam et</span>
          </button>
          <div class="no-account">
            <span>Zaten hesabın var mı?</span>
            <span
              class="register-link"
              @click="
                $router.push({
                  path: '/giris-yap',
                  query: { type: registerType },
                })
              "
              >Giriş Yap</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageSide from '~/components/Auth/ImageSide.vue'
import KVKK from '~/components/Auth/Modals/KVKK.vue'
import PrivacyPolicy from '~/components/Auth/Modals/PrivacyPolicy.vue'
import Spinner from '~/components/Shared/Spinner.vue'
import types from '~/data/types.json'
export default {
  name: 'LoginPage',
  components: { ImageSide, KVKK, PrivacyPolicy, Spinner },
  layout: 'empty',
  middleware: ['guest'],
  data() {
    return {
      types,
      registerType: this.$route.query.type
        ? this.$route.query.type
        : types.DEMANDER,
      isKvkkAccepted: false,
      fullName: '',
      email: '',
      password: '',
      submitted: false,
    }
  },
  computed: {
    fieldsFilled() {
      return this.email && this.password && this.fullName
    },
    kvkkModal() {
      return this.$store.state.modal.kvkkModal
    },
    privacyPolicyModal() {
      return this.$store.state.modal.privacyPolicy
    },
    user() {
      return this.$store.state.user.user
    },
    isLoading() {
      return this.$store.state.user.loading
    },
    error() {
      if (!this.fieldsFilled) return 'Lütfen tüm alanları doldurunuz!'
      if (!this.isKvkkAccepted) return 'Lütfen aydınlatma metnini onaylayınız!'
      return this.$store.state.user.error
    },
  },
  methods: {
    setKvkkModal() {
      this.$store.dispatch('modal/setKvkkModal', true)
    },
    setPrivacyPolicy() {
      this.$store.dispatch('modal/setPrivacyPolicy', true)
    },
    register() {
      this.submitted = true
      setTimeout(() => (this.submitted = false), 3000)
      if (this.fieldsFilled && this.isKvkkAccepted) {
        this.$store.dispatch('user/registerWithEmail', {
          email: this.email,
          password: this.password,
          type: this.registerType,
          fullName: this.fullName,
        })
      }
    },
    signWithGoogle() {
      this.$store.dispatch('user/signWithGoogle', { type: this.registerType })
    },
  },
}
</script>

<style lang="scss">
.register-page-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
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

  .register-form-seciton {
    width: 50%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @include media(xs, sm) {
      width: 100%;
    }

    .register-form {
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

    .logo-section {
      cursor: pointer;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;

      img {
        width: 200px;
      }
    }

    .form-name {
      padding: 1rem;
      font-size: 1.5rem;
      font-weight: 600;
      color: #828282;
    }

    .confirm-checkbox {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      margin-bottom: 1rem;

      .custom-checkbox {
        width: 20px;
        height: 20px;
        min-width: 20px;
        min-height: 20px;
        border: 1px solid #dedede;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 0.5rem;
        cursor: pointer;

        &.checked {
          background-color: $primary-color;
          border: 1px solid $primary-color;

          span {
            width: 10px;
            height: 10px;
            border-radius: 5px;
            background-color: #fff;
          }
        }

        span {
          width: 0px;
          height: 0px;
          border-radius: 5px;
          background-color: #fff;
          transition: all 0.3s ease;
        }
      }

      .kvkk-accept-text {
        font-size: 0.8rem;
        font-weight: 500;
        color: #828282;
        cursor: pointer;
        padding-top: 2px;

        .underline {
          text-decoration: underline;
        }
      }

      input {
        display: none;
      }

      span {
        font-size: 0.8rem;
        font-weight: 500;
        color: #828282;
        cursor: pointer;
      }
    }

    .register-types {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;
      width: 100%;

      .register-type {
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

    .warning-info {
      text-align: center;
      font-size: 0.825rem;
      margin: 0.5rem 0;
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
        justify-content: center;
        align-items: center;

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
