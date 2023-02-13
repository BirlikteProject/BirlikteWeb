<template>
  <div class="advert-in-message-wrapper">
    <div class="advert-in-message">
      <div class="advert-in-message-image">
      <img src="https://picsum.photos/200/300" alt="" />
    </div>
    <div class="advert-in-message-info">
      <div class="advert-info-header">
        <span>Eğitim</span>
        <span class="middot"></span>
        <span>İstanbul</span>
      </div>
      <div class="advert-in-message-title">Advert Title</div>
      <div class="go-to-advert">İçeriğe Git</div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdvertInMessage',
}
</script>

<style lang="scss">
.advert-in-message-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.advert-in-message {
  width: 80%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: $primary-color;
  height: 300px;
  .advert-in-message-image {
    width: 100%;
    height: 150px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }
  .advert-in-message-info{
    width: 100%;
    height: 150px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .advert-info-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      span {
        font-size: 0.8rem;
        color: #fff !important;
        
      }
      .middot {
        background-color: #fff !important;
      }
    }
    .advert-in-message-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: #fff;
    }
    .go-to-advert {
      font-size: 0.8rem;
      font-weight: 600;
      color: #fff;
      background-color: $primary-color-dark;
      padding: 0.5rem 1rem;
      border-radius: 10px;
      cursor: pointer;
    }
  }
}
</style>