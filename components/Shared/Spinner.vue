<template>
  <div class="loader"></div>
</template>

<script>
export default {
  name: 'Spinner',
}
</script>

<style lang="scss">
.loader {
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid $primary-color; /* Blue */
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>