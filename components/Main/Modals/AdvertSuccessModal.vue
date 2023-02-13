<template>
  <div id="advert-success-modal-overlay" class="advert-success-modal-wrapper">
    <div class="advert-success-modal">
      <img src="~/assets/icon/check-circle.svg" alt="" /> Başarıyla Oluşturuldu
      <!-- <button class="negative-button" @click="setDisplay()">Kapat</button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdvertSuccessModal',
  data() {
    return {
      timeout: null,
    }
  },
  mounted() {
    this.timeout = setTimeout(this.close, 5000)
    window.addEventListener('keydown', this.onKeyDown)
    document
      .getElementById('advert-success-modal-overlay')
      .addEventListener('click', this.onModalOverlayClick)
  },
  destroyed() {
    clearTimeout(this.timeout)
    window.removeEventListener('keydown', this.onKeyDown)
    document
      .getElementById('advert-success-modal-overlay')
      .removeEventListener('click', this.onModalOverlayClick)
  },
  methods: {
    close() {
      this.$store.dispatch('modal/setAdvertSuccessModal', false)
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
.advert-success-modal-wrapper {
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

  .advert-success-modal {
    background-color: #27ae60;
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
