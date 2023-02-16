<template>
  <div class="about-wrapper">
    <div>
      <div class="about-header">
      </div>
      <div class="about-body">
        <img class="about-img" src="~/assets/img/app-info-img.png" alt="" />
        <div class="text-container">
          <div class="logo-section">
            <img src="~/assets/img/logo-2.png" @click="$router.push('/')" />
          </div>
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
          <p style="cursor: default">Bizi <strong>Takip Edin</strong></p>
          <div class="follow-us-icon-container">
            <a href="https://www.instagram.com/birlikteorgtr/" target="_blank">
              <img src="~/assets/icon/instagram.svg" class="follow-us-icon" />
            </a>
            <a href="https://twitter.com/Birlikteorgtr" target="_blank">
              <img src="~/assets/icon/twitter.svg" class="follow-us-icon" />
            </a>
            <a href="https://www.linkedin.com/company/birlikte/" target="_blank">
              <img src="~/assets/icon/linkedin-in.svg" class="follow-us-icon" />
            </a>
            <strong class="birlikteorgtr" @click="$router.push('/')">birlikteorgtr</strong>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'ContactPage',
  layout: 'empty'
}
</script>

<style lang="scss" scoped>
.about-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #27ae60;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;

  .about-header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 500;
    color: $primary-color;
    position: relative;
  }

  .logo-section {
    img {
      cursor: pointer;
    }

    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;

    img {
      width: 200px;
    }
  }

  .about-body {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    width: 100%;
    height: 100vh;
    color: white;
  }

  .text-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    background-color: #f0f0f0;
    color: #27ae60;
    padding: 3rem;
    margin-right: 2rem;
    border-radius: 10px;

    &>p:first-child {
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

  .about-img {
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

    .birlikteorgtr {
      cursor: pointer;
      margin: auto .5rem;
    }
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

    .about-body {
      flex-direction: column;
    }

    .about-img {
      display: none;
    }

    .follow-us {
      position: relative;
      bottom: unset;
    }
  }
}</style>
