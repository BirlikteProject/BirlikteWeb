<template>
  <div class="complete-register-page-container">
    <div class="image-side-section">
      <image-side />
    </div>
    <div class="complete-register-form-seciton">
      <div class="logo-section">
        <img src="~/assets/img/logo-2.png" />
      </div>
      <div class="form-name">Kayıt Tamamla</div>
      <div class="complete-description">
        <p v-if="user.type === types.DEMANDER">
          Afetzede girişini kullanan değerli vatandaşımız; Afet bölgesi ilan
          edilen 10 ilde ikamet ettiğinizi, paylaşmış olduğunuz T.C Kimlik
          numarasının size ait olduğunu ve doğruluğunu beyan ve taahhüt etmiş
          bulunmaktasınız.Afet Bölgesinde ikamet etmiyorsanız lütfen bu girişi
          kullanmayın.
        </p>
        <p v-if="user.type === types.SUPPORTER">
          Paylaşmış olduğunuz T.C Kimlik numarasının size ait olduğunu ve doğruluğunu beyan ve taahhüt etmiş bulunmaktasınız.
        </p>
      </div>
      <div class="tckno-wrapper">
        <div class="input-wrapper">
          <input v-model="tckn" type="text" placeholder="T.C Kimlik Numarası" />
        </div>
        <div>
          <button class="primary-button" @click="completeRegister()">Onayla</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageSide from '~/components/Auth/ImageSide.vue'
import types from '~/data/types.json'
export default {
  name: 'RegisterCompletePage',
  components: { ImageSide },
  layout: 'empty',
  data() {
    return {
      types,
      tckn: ''
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user
    }
  },
  mounted() {
    console.log(this.$route)
  },
  methods: {
    async completeRegister() {
      try {
        await this.$store.dispatch('user/updateUser', { tckn: this.tckn })
        this.$router.push('/')
      } catch (error) {

      }
    }
  }
}
</script>

<style lang="scss">
.complete-description {
  margin: 1.5rem;
}
.tckno-wrapper {
  width: 50%;
}
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

.primary-button {
  width: 100%;
}

.complete-register-page-container {
  width: 100%;
  display: flex;
  flex-direction: row;

  .image-side-section {
    width: 50%;
    height: 100vh;
  }

  .complete-register-form-seciton {
    width: 50%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .complete-register-form {
      width: 416px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .logo-section {
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

    .complete-register-types {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;

      .complete-register-type {
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
