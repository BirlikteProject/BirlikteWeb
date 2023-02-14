<template>
  <div ref="modalOverlay" class="app-warning-modal-wrapper">
    <div class="app-warning-modal">
      <div class="modal-header">
        <span class="close-icon" @click="closeModal()">
          <i class="afet-icons afet-close"></i>
        </span>
      </div>
      <div class="modal-body">
        <div class="img-container">
          <img src="~/assets/icon/no-money.svg" class="no-money-icon" />
          <img src="~/assets/icon/solidarity.svg" alt="" />
        </div>
        <p>
          Bu platform nakdi ya da ayni yardım toplama platformu değildir.
          <br />
          Destekçiler tarafından afetzedelere emek ve hizmet sunulmaktadır.
          <br />
          <strong>
            Lütfen nakdi ya da ayni yardım talebi oluşturmayınız.
          </strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppWarningModal',
  mounted() {
    window.addEventListener('keydown', this.onKeyDown)
    this.$refs.modalOverlay.addEventListener('click', this.onModalOverlayClick)
  },
  destroy() {
    window.removeEventListener('keydown', this.onKeyDown)
  },
  methods: {
    closeModal() {
      this.$store.dispatch('modal/setAppWarningModal', false)
    },
    onKeyDown(e) {
      if (e.code === 'Escape') {
        this.closeModal()
      }
    },
    onModalOverlayClick(e) {
      if (e.target.className.includes('app-warning-modal-wrapper')) {
        this.closeModal()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.app-warning-modal-wrapper {
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

  .app-warning-modal {
    background-color: #27ae60;
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1rem;
    .modal-header {
      width: 100%;
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
    }
  }
  .modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    width: 100%;
    height: 100%;
    padding: 6rem 3rem;
    color: white;
    font-size: 1.5rem;
    text-align: center;
    .img-container {
      display: flex;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;

      .no-money-icon {
        filter: invert(1);
      }
    }
  }

  @media screen and (max-width: 740px) {
    .img-container {
      img {
        width: 4rem;
      }
    }

    .modal-body {
      font-size: 1rem;
      padding: 1rem;
      gap: 1rem;
    }
  }
}
</style>
