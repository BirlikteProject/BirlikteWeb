<template>
  <div class="login-image-side-wrapper">
    <div class="image-side">
      <div class="image-side-main-title">
        <div class="main-title">
          Hep <b>Birlik</b><i>te</i>
        </div>
        <div class="main-title"><b>Türkiye!</b></div>
      </div>
      <div class="title-long">
        <b>Birlik</b><i>te</i> bağımsız bir kuruluştur!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageSide',
}
</script>

<style lang="scss">
.login-image-side-wrapper {
  background-color: $primary-color;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  width: 100%;
  height: 100vh;
  .image-side {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
  .main-logo {
    margin-bottom: 2rem;
    width: 250px;
    img {
      width: 200px;
    }
  }
  .image-side-main-title {
    display: flex;
    flex-direction: column;
    color: #fff;
    font-size: 2rem;
    width: 250px;
  }
  .title-long {
    color: #fff;
    font-size: 1rem;
    margin-top: 5rem;
  }
}
</style>
