<template>
  <div class="index-page">
    <div class="greeting-title">
      <span>Neye İhtiyacın Var?</span>
      <span
        ><b>Birlik<em>te</em></b> Bulalım</span
      >
    </div>
    <div class="category-buttons">
      <category-button
        v-for="category in categories"
        :key="category.name"
        :category="category"
      />
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

export default {
  name: 'IndexPage',
  components: { LoginModal, CategoryButton, Advert },
  data() {
    return {
      categories: [
        {
          img: 'education',
          name: 'Eğitim',
        },
        {
          img: 'shelter',
          name: 'Barınma',
        },
        {
          img: 'job',
          name: 'İstihdam',
        },
        {
          img: 'psycho',
          name: 'Psikolojik Destek',
        },
      ],
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
    align-items: center;
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