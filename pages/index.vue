<template>
  <div class="index-page">
    <div class="greeting-title">
      <span>Neye <b>İhtiyacın</b> Var?</span>
      <span><b>Birlik<em>te</em></b> Bulalım</span>
    </div>
    <div class="category-buttons">
      <div v-for="(category, i) in categories" :key="category.name" @click="filterAdverts(category._id, i)">
        <category-button :class="{ 'selected-category': selectedCategory === i }" :category="category" />
      </div>
    </div>
    <div class="advert-grid">
      <div v-if="adverts" class="content">
        <advert v-for="advert in adverts" :key="advert._id" :advert="advert" />
      </div>
      <button class="primary-button next-page-button" @click="fetchNextPage()">Daha Fazla İlan</button>
    </div>
    <login-modal v-if="loginModal" />
    <app-warning-modal v-if="appWarningModal" />
    <app-info-modal v-if="appInfoModal" />
</div>
</template>
<script>
import LoginModal from '~/components/Main/Modals/LoginModal.vue'
import AppInfoModal from '~/components/Main/Modals/AppInfoModal.vue'
import AppWarningModal from '~/components/Main/Modals/AppWarningModal.vue'
import CategoryButton from '~/components/Main/CategoryButton.vue'
import Advert from '~/components/Shared/Advert.vue'
import categories from '~/data/categories.json'

export default {
  name: 'IndexPage',
  components: {
    LoginModal,
    CategoryButton,
    Advert,
    AppInfoModal,
    AppWarningModal
  },
  data() {
    return {
      currentPage: 1,
      categories,
      selectedCategory: -1,
      highlightedAdvert: -1,
      filteredAdverts: []
    }
  },
  computed: {
    loginModal() {
      return this.$store.state.modal.loginModal
    },
    appInfoModal() {
      return this.$store.state.modal.appInfoModal
    },
    appWarningModal() {
      return this.$store.state.modal.appWarningModal
    },
    adverts() {
      if(this.filteredAdverts.length) {
        return this.filteredAdverts
      }
      return this.$store.state.advert.advertList
    },
  },
  mounted() {
    if (!JSON.parse(localStorage.getItem('isAppInfoModalDisplayed'))) {
      this.$store.dispatch('modal/setAppInfoModal', true)
    }
  },
  methods: {
    async filterAdverts(categoryId, categoryIdx) {
      if(this.selectedCategory === categoryIdx) {
        this.filteredAdverts = []
        this.selectedCategory = -1
        return
      }
      const data = await this.$store.dispatch('advert/getAdvertsByCategory', { categoryId })
      this.filteredAdverts = data
      this.selectedCategory = categoryIdx
    },
    async fetchNextPage() {
      this.currentPage++
      await this.$store.dispatch('advert/fetchAdverts', {
        page: this.currentPage,
      })
    }
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

.selected-category {
  .category-button-component {
    background-color: rgb(62, 110, 254);
  }

  .category-name {
    color: rgb(62, 110, 254);
  }
}

.next-page-button {
  margin: 1rem auto!important;
  padding: 0.5rem 1rem !important;
  font-size: 1.5rem;
  border-radius: 10px;
  display: block;
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

    @include media(xs, sm) {
      font-size: 1.5rem;
      padding: 2rem 0;
    }

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
