<template>
  <div class="search-page-container">
    <div class="search-section">
      <div class="page-title">Arama</div>
      <div class="search-input-box">
        <input v-model="searchTerm" type="text" placeholder="Arama yapın" />
        <span v-if="searchTerm" class="search-icon" @click="filterAdverts()">
          <i class="afet-icons afet-search"></i>
        </span>
      </div>
      <div class="location-dropdown">
        <div class="dropdown-button" @click="results = !results">
          <div class="dropdown-button-text">
            {{
              location.name !== null
                ? location.name.toLowerCase()
                : 'Şehir Seçiniz'
            }}
          </div>
          <div class="dropdown-button-icon">
            <i class="afet-icons afet-caret"></i>
          </div>
        </div>
        <div v-if="results" class="dropdown-results">
          <div v-for="city, idx in locations" :key="idx" class="city-item"
            @click="; (location.name = city), (location.id = idx), (results = false)">
            {{ city.toLowerCase() }}
          </div>
        </div>
      </div>
    </div>
    <div class="search-results">
      <spinner v-if="loading" />
      <div v-else-if="advertList">
        <advert v-for="advert in advertList" :key="advert._id" :advert="advert" />
      </div>
      <div class="no-results">
        <div class="result-message">
          Ne Yazık ki Aradığın Kriterlere <br />
          Uygun Destek Bulunamadı.
        </div>
        <div class="create-advert">
          <span class="plus-icon">
            <i class="afet-icons afet-plus"></i>
          </span>
          <span class="create-advert-text">
            İhtiyaçlarının çözülmesi için talep <br />
            oluşturabilirsin.
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Advert from '~/components/Shared/Advert.vue'
export default {
  name: 'SearchPage',
  components: { Advert },
  data() {
    return {
      location: {
        name: null,
        id: '',
      },
      loading: false,
      error: false,
      searchTerm: '',
      results: false,
    }
  },
  computed: {
    locations() {
      return Object.values(this.$store.state.advert.citiesList)
    },
    advertList() {
      return this.$store.state.advertList
    },
  },
  methods: {
    async filterAdverts() {
      console.log('filterAdverts is called')
      try {
        this.loading = true
        const response = await this.$store.dispatch('advert/searchAdverts')
        if (response.status) {
          console.log('filtered')
        }
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
.search-page-container {
  display: flex;
  flex-direction: column;

  .search-section {
    padding: 1rem;
  }

  .page-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #828282;
  }

  .search-input-box {
    display: flex;
    align-items: center;
    background-color: #f2f5f9;
    border-radius: 10px;
    height: 50px;
    width: 100%;

    input {
      color: #828282;
      border: none;
      outline: none;
      width: 100%;
      padding: 0.5rem;
      font-size: 1rem;
    }

    .search-icon {
      width: 50px;
      height: 50px;
      background-color: $primary-color;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      cursor: pointer;
    }
  }

  .location-dropdown {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .dropdown-button {
    display: flex;
    align-items: center;
    background-color: $primary-color;
    border-radius: 10px;
    height: 2.5rem;
    margin-top: 1rem;
    width: calc(50% - 0.5rem);
    cursor: pointer;
    padding: 0 1rem;

    .dropdown-button-text {
      color: #fff;
      border: none;
      outline: none;
      width: 100%;
      padding-top: 2px;
      text-transform: capitalize;
      font-size: 1rem;
    }

    .dropdown-button-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 0.5rem;

      i {
        color: #fff;
      }
    }
  }

  .dropdown-results {
    width: calc(50% - 0.5rem);
    margin-top: 1rem;
    background-color: #fff;
    border-radius: 10px;
    overflow-y: auto;
    height: 400px;
    border: 1px solid $primary-color;

    .city-item {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      color: #828282;
      cursor: pointer;
      text-transform: capitalize;
      font-weight: 600;

      &:hover {
        background-color: $primary-color;
        color: #fff;
      }
    }
  }

  .search-results {
    .no-results {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid #dedede;
      border-top: 1px solid #dedede;
      padding: 2rem 0;

      .result-message {
        font-size: 1.5rem;
        color: #4a4a4a;
        text-align: center;
        margin-bottom: 2rem;
      }

      .create-advert {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        border-radius: 10px;
        height: auto;
        background-color: #f2f2f2;
        font-size: 1.5rem;
        color: $primary-text-color;

        .plus-icon {
          margin-bottom: 1.5rem;
        }

        .create-advert-text {
          font-size: 1.25rem;
          color: #828282;
          text-align: center;
        }
      }
    }
  }
}
</style>
