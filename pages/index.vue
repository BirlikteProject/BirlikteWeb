<template>
  <div class="index-page">
    <div class="greeting-title">
      <span>Neye <b>İhtiyacın</b> Var?</span>
      <span><b>Birlik</b><em>te</em> Bulalım</span>
    </div>
    <div class="category-buttons">
      <div v-for="(category, i) in categories" :key="category.name" @click="filterAdverts(category._id, i)">
        <category-button :class="{ 'selected-category': selectedCategory === i }" :category="category" />
      </div>
    </div>
    <div class="advert-grid">
      <div v-show="isLoading" class="spinner">
        <spinner />
      </div>
      <div v-if="adverts" class="content">
        <advert v-for="advert in adverts" :key="advert._id" :advert="advert" />
      </div>
      <div v-show="adverts.length && isLoading" class="spinner">
        <spinner />
      </div>
      <div v-if="nextPageAvailable" class="next-button-wrapper">
        <button class="primary-button" @click="fetchNextPage()">
          <i class="afet-icons afet-plus"></i>
        </button>
        <span class="more-advert">Daha fazla ilan için tıklayın</span>
      </div>

      <div class="result-message" v-if="!isLoading && !nextPageAvailable">
        <p>
          Şimdilik daha fazla destek ilanı yok.<br /><span class="refresh-adverts" @click="refresh()">Yenilemek için
            dokunun.</span>
        </p>
      </div>
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
      advertLimit: 20,
      selectedCategory: -1,
      highlightedAdvert: -1,
      filteredAdverts: []
    }
  },
  computed: {
    categories() {
      return this.$store.state.advert.categoryList
    },
    isLoading() {
      return this.$store.state.advert.loading
    },
    adverts() {
      if (this.selectedCategory !== -1) {
        return this.filteredAdverts
      }
      return this.$store.state.advert.advertList
    },
    loginModal() {
      return this.$store.state.modal.loginModal
    },
    appInfoModal() {
      return this.$store.state.modal.appInfoModal
    },
    appWarningModal() {
      return this.$store.state.modal.appWarningModal
    },
    nextPageAvailable() {
      return this.adverts.length % (this.advertLimit * this.currentPage) === 0 && this.adverts.length / (this.advertLimit * this.currentPage) >= 1
    },
  },
  mounted() {
    if (!JSON.parse(localStorage.getItem('isAppInfoModalDisplayed'))) {
      this.$store.dispatch('modal/setAppInfoModal', true)
    }
    this.refresh()
  },
  methods: {
    async filterAdverts(categoryId, categoryIdx) {
      if (this.selectedCategory === categoryIdx) {
        this.filteredAdverts = []
        this.selectedCategory = -1
        return
      }
      const data = await this.$store.dispatch('advert/getAdvertsByCategory', { categoryId })
      this.filteredAdverts = data
      this.selectedCategory = categoryIdx
    },
    refresh() {
      this.currentPage = 1
      this.$store.dispatch('advert/fetchAdverts')
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
    fetchNextPage() {
      this.currentPage++
      this.$store.dispatch('advert/fetchAdverts', {
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

.category-button-wrapper {
  &:hover {
    .category-button-component {
      background-color: rgb(80, 130, 254);
    }

    .category-name {
      color: rgb(80, 130, 254);
    }
  }
}

.selected-category {
  .category-button-component {
    background-color: rgb(62, 110, 254);
  }

  .category-name {
    color: rgb(62, 110, 254);
  }
}

.result-message {
  text-align: center;
  color: #4a4a4a !important;
  font-size: 1.3rem;
  font-weight: 500;
  margin-top: 1rem !important;
  margin-bottom: 4rem !important;

  .refresh-adverts {
    cursor: pointer;

    &:hover {
      color: $primary-color;
    }
  }
}

.next-button-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  padding-top: 3rem;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;

  .more-advert {
    font-size: 1rem;
    font-weight: 400;
    color: #828282;
    margin-top: 1rem;
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

    @include media(xs, sm) {
      font-size: 1.5rem;
      padding: 2rem 0;
    }

    span {
      font-weight: 400;
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

  .advert-grid {
    .spinner {
      padding: 0 0 4rem 0 !important;
    }
  }
}
</style>
