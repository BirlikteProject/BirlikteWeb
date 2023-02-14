<template>
  <div class="category-button-wrapper">
    <div class="category-button-component">
      <img :src="require(`~/assets/img/${category.img}.png`)" alt="" />
    </div>
    <span class="category-name">
      {{ category.name }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'CategoryButton',
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.category-button-wrapper {
  cursor: pointer;
}

.category-button-component {
  width: 125px;
  height: 125px;
  background-color: $primary-color;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #fff;
  border-radius: 10px;
  @include media(xs, sm) {
    width: 65px;
    height: 65px;
  }
  img {
    max-width: 40%;
  }
}
.category-name {
  width: 125px;
  text-align: center;
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  color: $primary-color;
  font-weight: 600;
  word-break: break-word;
  overflow: hidden;
  @include media(xs, sm) {
    width: 65px;
    font-size: 0.825rem;
  }
}
</style>
