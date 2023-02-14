<template>
  <div class="index-page">
    <div class="greeting-title">
      <span>Neye İhtiyacın Var?</span>
      <span><b>Birlik<em>te</em></b> Bulalım</span>
    </div>
    <div class="category-buttons">
      <div v-for="category, i in categories" :key="category.name" @click="filterAdverts(category._id, i)">
        <category-button :class="{ 'selected-category': selectedCategory === i }" :category="category" />
      </div>
    </div>
    <div v-if="!!adverts && !!cities" class="content">
      <advert v-for="advert in adverts" :key="advert._id" :advert="advert" />
    </div>
    <login-modal v-if="loginModal" />
  </div>
</template>
<script>
import LoginModal from '~/components/Main/Modals/LoginModal.vue'
import CategoryButton from '~/components/Main/CategoryButton.vue'
import Advert from '~/components/Shared/Advert.vue'
import categories from '~/data/categories.json'

export default {
  name: 'IndexPage',
  components: { LoginModal, CategoryButton, Advert },
  data() {
    return {
      categories,
      selectedCategory: -1
    }
  },
  computed: {
    loginModal() {
      return this.$store.state.modal.loginModal
    },
    adverts() {
      return this.$store.state.advert.advertList
    },
    cities() {
      return this.$store.state.advert.citiesList
    },
  },
  methods: {
    filterAdverts(categoryId, categoryIdx) {
      this.$store.dispatch('advert/fetchAdvertsByCategory', categoryId)
      this.selectedCategory = categoryIdx
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: 'Campton', sans-serif;
}

.selected-category {
  .category-button-component {
    background-color: rgb(62, 110, 254);
  }

  .category-name {
    color: rgb(62, 110, 254);
  }
}

.index-page {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;

  .greeting-title {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 0;
    color: $primary-color;
    font-size: 2rem;

    span {
      font-weight: 300;
    }
  }

  .category-buttons {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: flex-start;
    padding-bottom: 1rem;
  }
}

.afet-icons {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tooltip {
  position: relative;

  .tooltip-wrapper {
    display: none;
  }

  &:hover {
    .tooltip-wrapper {
      display: flex;
    }
  }
}
</style>
