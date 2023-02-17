<template>
  <div class="about-wrapper">
    <div>
      <div class="about-header"></div>
      <div class="about-body">
        <div class="about-text">
          <p class="abous-us-paragraphf">
            <span class="header-text">Hakkımızda</span> 
            <br><br><br>
            6 Şubat 2023 tarihinde Türkiye’nin on ilinde etkili olan
            büyük bir deprem yaşandı. Yüzbinlerce insan yerinden, binlerce insan
            canından oldu. On binlerce yapı ya yıkıldı ya da büyük hasar gördü.
            Afetin ilk haftası henüz fiziksel hasarı tespit ediyorken, <b>ilerleyen
            haftalarda psikolojik ve sosyolojik hasarı hep birlikte</b>
            hissedeceğiz.
            <br /><br />
            Birlikte; meydana gelen büyük deprem felaketinden sonra oluşan
            eğitim, psikolojik destek, sosyal alan & destek, istihdam ve barınma
            ihtiyacı gibi konularda imkân sahiplerinin destek ilanlarını ve
            afetzedelerin ihtiyaç taleplerini bir araya getirerek taraflar
            arasında daha hızlı ve etkili iletişim sağlamak amacıyla
            oluşturulmuş bir platformdur.
            <br /><br />
            Proje, depremin hemen akabinde bölgede <b>arama-kurtarma faaliyetlerine
            katılan gençler tarafından</b> geliştirilmiştir. Bu proje, acil
            ihtiyaçları karşılandıktan sonra afetzedelerin ekonomik ve sosyal
            hayata yeniden katılımına yardımcı olmayı hedefleyen bir sosyal
            sorumluluk projesidir.
            <br /><br />
            Dolayısıyla bu platform kâr amacı gütmeksizin, bilişim teknolojileri
            alanında çalışan gönüllüler tarafından, afetzedelere destek vermek
            isteyen gönüllüler ve destek almak isteyen afetzedelere hizmet için
            oluşturulmuştur. <b>Hiçbir kurum ve kuruluşla ilişiği yoktur.</b>
            <br /><br />
            Birlikte’de afetzedelere destek vermek isteyen gönüllüler için beş
            kategori bulunmaktadır.
            <br /><br />
            Birlikte <b>“Eğitim”</b> kategorisinde afetzedeler için alanınıza uygun
            herhangi bir özel ders ilanı açabilir, durumunuza göre online ya da
            yüz yüze bir afetzedenin derslerine yardımcı olabilirsiniz. Eğer bir
            afetzede iseniz eğitim ihtiyaçlarınız ile ilgili talep oluşturup,
            yayınlayabilirsiniz.
            <br /><br />
            Birlikte <b>“Psikolojik Destek”</b> kategorisinde afetzedelere destek olmak
            için psikolojik danışmanlık ilanı açabilir, eğer bir afetzede iseniz
            psikolojik destek talebi oluşturabilirsiniz.
            <br /><br />
            Birlikte <b>“Sosyal Alan & Destek”</b> kategorisinde afetzedelerin
            faydalanabileceği sosyal alan ve imka desteği ilanı açabilir, eğer
            bir afetzede iseniz sosyal ihtiyaçlarınızı belirten bir talep
            oluşturabilirsiniz. <b>Diş Hekiminden berbere</b>, spor antrenörlüğünden
            nakliyata çok geniş bir yelpazede afetzedelere destek hareketi
            oluşturulabilir.
            <br /><br />
            Birlikte <b>“İstihdam”</b> kategorisine afetzedeler için çeşitli
            pozisyonlarda iş ilanları açabilir, eğer bir afetzede iseniz
            mesleğinizi ya da kalifiyenizi belirten istihdam talebi
            oluşturabilirsiniz.
            <br /><br />
            Birlikte <b>“Barınma”</b> kategorisinde afetzedeler için ev/barınma ve eşya
            ilanı oluşturabilir, eğer bir afetzede iseniz ihtiyaçlarınızı
            belirten barınma talebi oluşturabilirsiniz. Kayıt olarak destek veya
            talep oluşturabilir, oluşturulan ilanları takip edebilirsiniz.
            <br /><br />
            <b> Milletimizin başı sağolsun. Bugünleri de birlikte aşacağız. </b>
          </p>
        </div>
      </div>
      <div class="follow-us">
        <p style="cursor: default; font-size: 1.5rem;">Bizi <strong>Takip Edin</strong></p>
        <br>
        <div class="follow-us-icon-container">
          <a href="https://www.instagram.com/birlikteorgtr/" target="_blank">
           <i class="afet-icons afet-instagram"></i>
          </a>
          <a href="https://twitter.com/Birlikteorgtr" target="_blank">
            <i class="afet-icons afet-twitter"></i>
          </a>
          <a href="https://www.linkedin.com/company/birlikte/" target="_blank">
            <i class="afet-icons afet-linkedin-in"></i>
          </a>
          <span class="divider">|</span>
          <span class="birlikteorgtr" @click="$router.push('/')"
            >birlikteorgtr</span
          >
          <span class="divider">|</span>
          <span>birlikteorgtr@gmail.com</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  layout: 'empty',
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
    width: 100%;
    height: calc(100vh - 7rem);
    color: white;
    text-align: center;
    .about-text {
      width: 60%;
      height:  100%;
      overflow-y: auto;
      padding-top: 4rem;
      @include media(xs, sm) {
        padding: 1rem;
        width: 100%;
      }
    }
    .abous-us-paragraphf {
      .header-text {
        font-size: 1.5rem;
        font-weight: 600;
      }
      font-size: 1rem;
      @include media(xs, sm) {
        font-size: 0.8rem;
      }
    }
  }

  .follow-us {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    background-color: $primary-color;
    color: #fff;
    height: 7rem;

    .birlikteorgtr {
      cursor: pointer;
      align-items: center;
      font-weight: 600;
      font-size: 1rem;
    }
    .follow-us-icon-container {
      display: flex;
      align-items: center;
      .divider {
        margin: 0 0.5rem;
        display: flex;
        align-items: center;
      }
      a {
        color: #fff !important;
      }
    }

    i{
      margin: 0 0.25rem;
      color: #fff !important;
      font-size: 1.25rem;
    }

    .birlikteorgtr {
      position: relative;

    }
  }
}
</style>
