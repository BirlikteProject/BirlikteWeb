<template>
  <div ref="modalOverlay" class="app-info-modal-wrapper">
    <div class="app-info-modal">
      <div class="modal-header">
        <span class="close-icon" @click="closeModal()">
          <i class="afet-icons afet-close"></i>
        </span>
      </div>
      <div class="modal-body">
        <img class="modal-img" src="~/assets/img/app-info-img.png" alt="" />
        <div class="text-container">
          <p>
            <strong>Birlikte</strong>, depremzedelerin
            <strong>istihdam</strong>, <strong>eğitim</strong>,
            <strong>psikolojik destek</strong>,
            <strong>sosyal alan</strong> ihtiyacı gibi konularda imkkan
            sahiplerinin destek ilanlarını, depremzedelerin ihtiyaç talebini bir
            araya toplayan bir platformdur. Üye olup destek veya talep
            oluşturabilir, oluşturulan ilanları takip edebilirsiniz.
          </p>
          <p>
            Bu platform kar amacı gütmeden imece usülü ile bilgi paylaşımı için
            geliştirilmiştir.
            <strong>Hiçbir kurum ve kuruluşla ilişiği yoktur</strong>
          </p>
        </div>
        <div class="follow-us">
          <p>Bizi <strong>Takip Edin</strong></p>
          <div class="follow-us-icon-container">
            <a href="https://www.instagram.com/birlikteorgtr/" target="_blank">
              <img src="~/assets/icon/instagram.svg" class="follow-us-icon" />
            </a>
            <a href="https://twitter.com/Birlikteorgtr" target="_blank">
              <img src="~/assets/icon/twitter.svg" class="follow-us-icon" />
            </a>
            <a
              href="https://www.linkedin.com/company/birlikte/"
              target="_blank"
            >
              <img src="~/assets/icon/linkedin-in.svg" class="follow-us-icon" />
            </a>
            <strong class="birlikteorgtr">birlikteorgtr</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppInfoModal',
  mounted() {
    window.addEventListener('keydown', this.onKeyDown)
    this.$refs.modalOverlay.addEventListener('click', this.onModalOverlayClick)
  },
  destroy() {
    window.removeEventListener('keydown', this.onKeyDown)
  },
  methods: {
    closeModal() {
      this.$store.dispatch('modal/setAppInfoModal', false)
    },
    onKeyDown(e) {
      if (e.code === 'Escape') {
        this.closeModal()
      }
    },
    onModalOverlayClick(e) {
      if (e.target.className.includes('app-info-modal-wrapper')) {
        this.closeModal()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.app-info-modal-wrapper {
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

  .app-info-modal {
    background-color: #27ae60;
    border-radius: 0.5rem;
    padding: 0 1rem 0 0;
    margin: 1rem;
    max-width: 1110px;
  }

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
      right: -2rem;
      cursor: pointer;
      top: -1.5rem;
      background-color: #fff;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .modal-body {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    width: 100%;
    height: 100%;
    color: white;
  }

  .text-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    & > p:first-child {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        bottom: -1.5rem;
        left: 0;
        width: 50%;
        height: 1px;
        background-color: white;
      }
    }
  }

  .modal-img {
    max-width: 30rem;
  }

  .follow-us {
    position: absolute;
    bottom: 2rem;
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .follow-us-icon-container {
    display: flex;
    gap: 0.5rem;
  }

  .follow-us-icon {
    height: 1.2rem;
    filter: invert(100%);
  }

  .birlikteorgtr {
    position: relative;
    margin-left: 0.5rem;
    &::before {
      content: '';
      position: absolute;
      left: -0.5rem;
      bottom: 0;
      width: 0.5px;
      height: 100%;
      background-color: #fff;
    }
  }

  @media screen and (max-width: 740px) {
    .app-info-modal {
      padding: 1rem;
    }

    .modal-body {
      flex-direction: column;
    }

    .modal-img {
      display: none;
    }

    .follow-us {
      position: relative;
      bottom: unset;
    }
  }
}
</style>
