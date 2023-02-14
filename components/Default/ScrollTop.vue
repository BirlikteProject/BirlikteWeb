<template>
  <div class="tap-top-button-wrapper" @click="focusToTop()">
    <i class="afet-icons afet-caret-up tooltip " style="color: white; font-size: 1rem;">
    <tool-tip text="Yukarı Çık" type="left"/>
    </i>

  </div>
</template>

<script>
export default {
  name: 'ScrollTop',
  methods: {
    focusToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
  },
}
</script>

<style lang="scss">
.tap-top-button-wrapper {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  background-color: $primary-color;
  color: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 100;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  @include media(xs, sm) {
    display: none;
  }
  .tooltip-wrapper {
    &.left {
      margin-right: 1rem;
    }
  }
}
</style>