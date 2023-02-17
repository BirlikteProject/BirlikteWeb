<template>
  <div class="backdrop-wrapper">
    <div class="spinner">
      <spinner />
    </div>
  </div>
</template>

<script>
import Spinner from '~/components/Shared/Spinner.vue'
export default {
  name: 'BackdropSpinner',
  components: {
    Spinner
  }
}
</script>

<style lang="scss">
.spinner {
  width: 100vh!important;
}
.backdrop-wrapper {
    text-align: center;
    vertical-align: middle;
    position:fixed;
    width:100%;
    left:0;right:0;top:0;bottom:0;
    background-color: rgba(255,255,255,0.7);
    z-index:9999;
    overflow: hidden;
}
</style>
