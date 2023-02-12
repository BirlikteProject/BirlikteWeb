<template>
  <div class="login-modal-wrapper">
    <div class="login-modal">
      <div class="modal-header">
        <span>Giriş Yap</span>
        <span class="close-icon" @click="setDisplay()">
            <i class="afet-icons afet-close"></i>
        </span>
      </div>
      <div class="modal-body">
        <div class="input-group">
          <label>Email</label>
          <input type="email" />
        </div>
        <div class="input-group">
          <label>Password</label>
          <input type="password" />
        </div>
        <div class="divider">
            veya
        </div>
        <div class="login-types">
            <i class="afet-icons afet-google"></i>
        </div>
      </div>
      <div class="modal-footer">
        <!-- <button class="negative-button" @click="setDisplay()">Kapat</button> -->
        <button class="negative-button">
            <i class="afet-icons afet-google"></i> Google ile Giriş Yap
        </button>
        <button class="primary-button">Giriş Yap</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginModal',
  methods: {
    setDisplay() {
      this.$store.dispatch('modal/setLoginModal', false)
    }
  }
}
</script>

<style lang="scss">
.login-modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-modal {
    width: 30rem;
    height: 30rem;
    background-color: white;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    .modal-header {
      width: 100%;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      font-weight: 500;
      color: $primary-color;
      position: relative;
      .close-icon {
        width: 2rem;
        height: 2rem;
        position: absolute;
        right: -1.5rem;
        cursor: pointer;
        top: -1.5rem;
        background-color: #fff;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .afet-close {
      }
    }
    .modal-body {
      height: calc(100% - 6rem);
      width: 100%;
      padding: 1rem 0;
      .input-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        label {
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: $primary-text-color;
        }
        input {
          border: none;
          outline: none;
          border: 1px solid $border-color;
          padding: 0.5rem;
          font-size: 0.8rem;
          height: 2.5rem;
          border-radius: 5px;
          &:focus {
            border: 1px solid $primary-color;
          }
        }
      }
    }
    .modal-footer {
      height: 3rem;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      width: 100%;
      button {
        height: 2.5rem;
        width: 100%;
      }
      button:nth-child(1) {
        margin-right: 1rem;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>