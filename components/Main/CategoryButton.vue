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
.category-button-component {
  width: 150px;
  height: 150px;
  background-color: $primary-color;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #fff;
  border-radius: 10px;
  img {
    max-width: 40%;
  }
}
.category-name {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
    color: $primary-color;
    font-weight: 600;
}
</style>