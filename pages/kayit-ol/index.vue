<template>
  <div class="register-page-container">
    <KVKK v-if="kvkkModal" />
    <div class="image-side-section">
      <image-side />
    </div>
    <div class="register-form-seciton">
      <div class="register-form">
        <span class="form-name">Kayıt Ol</span>
        <div class="register-types">
          <div
            class="register-type"
            :class="registerType == types.DEMANDER ? 'selected' : ''"
            @click="registerType = types.DEMANDER"
          >
            Afetzede Girişi
          </div>
          <div
            class="register-type"
            :class="registerType == types.SUPPORTER ? 'selected' : ''"
            @click="registerType = types.SUPPORTER"
          >
            Destekçi Girişi
          </div>
        </div>

        <div class="form-inputs">
          <div class="input-wrapper">
            <input type="email" placeholder="E-Posta" />
          </div>
          <div class="input-wrapper">
            <input type="password" placeholder="Şifre" />
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
            <span class="kvkk-accept-text" @click="setKvkkModal()">
              <span class="underline">Aydınlatma Metni</span>'ni okudum ve kabul ediyorum.
            </span>
          </div>
          <button class="primary-button">Kayıt Ol</button>
          <div class="or-sign-with-google">
            <span class="google-text">veya Google ile devam et</span>
          </div>
          <button class="primary-button google-button">
            <i class="afet-icons afet-google"></i>
            <span>Google ile devam et</span>
          </button>
          <div class="no-account">
            <span>Zaten hesabın var mı?</span>
            <span class="register-link" @click="$router.push('/giris-yap')"
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
import types from '~/data/types.json'
export default {
  name: 'LoginPage',
  components: { ImageSide, KVKK },
  layout: 'empty',
  data() {
    return {
      types,
      registerType: null,
      isKvkkAccepted: false,
    }
  },
  computed: {
    kvkkModal() {
      return this.$store.state.modal.kvkkModal
    },
  },
  methods: {
    setKvkkModal() {
      this.$store.dispatch('modal/setKvkkModal', true)
    },
  },
}
</script>

<style lang="scss">
.register-page-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  .image-side-section {
    width: 50%;
    height: 100vh;
  }
  .register-form-seciton {
    width: 50%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .register-form {
      width: 416px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
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