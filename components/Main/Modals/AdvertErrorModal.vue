<template>
  <div id="advert-error-modal-overlay" class="advert-error-modal-wrapper">
    <div class="advert-error-modal">Lütfen zorunlu alanları doldurun.</div>
  </div>
</template>

<script>
export default {
  name: 'AdvertErrorModal',
  data() {
    return {
      timeout: null,
    }
  },
  mounted() {
    this.timeout = setTimeout(this.close, 5000)
    window.addEventListener('keydown', this.onKeyDown)
    document
      .getElementById('advert-error-modal-overlay')
      .addEventListener('click', this.onModalOverlayClick)
  },
  destroy() {
    clearTimeout(this.timeout)
    window.removeEventListener('keydown', this.onKeyDown)
  },
  methods: {
    close() {
      this.$store.dispatch('modal/setAdvertErrorModal', false)
    },
    onKeyDown(e) {
      if (e.code === 'Escape') {
        this.close()
      }
    },
    onModalOverlayClick() {
      this.close()
    },
  },
}
</script>

<style lang="scss">
.advert-error-modal-wrapper {
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

  .advert-error-modal {
    background-color: #dc3545;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem 4rem;
    color: white;
  }
}
</style>
