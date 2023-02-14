<template>
  <div class="search-page-container">
    <div class="search-section">
      <div class="page-title">Arama</div>
      <div class="search-input-box">
        <input v-model="searchTerm" type="text" placeholder="Arama yapın" />
        <span v-if="searchTerm || location.name" class="search-icon" @click="filterAdverts()">
          <i class="afet-icons afet-search"></i>
        </span>
      </div>
      <div class="location-dropdown">
        <div class="dropdown-button" @click="results = !results">
          <div class="dropdown-button-text">
            {{
              location.name !== null
                ? location.name
                : 'Şehir Seçiniz'
            }}
          </div>
          <div class="dropdown-button-icon">
            <i class="afet-icons afet-caret"></i>
          </div>
        </div>
        <div v-if="results" class="dropdown-results">
          <div
            v-for="cityId in Object.keys(cities)" :key="cityId" class="city-item"
            @click="; (location.name = cities[cityId]), (location.id = cityId), (results = false)">
            {{ cities[cityId] }}
          </div>
        </div>
      </div>
    </div>
    <div class="search-results">
      <spinner v-if="loading" class="spinner" />
      <div v-else-if="advertList?.length && userType === types.DEMANDER">
        <advert v-for="advert in advertList" :key="advert._id" :advert="advert" />
      </div>
      <div v-else-if="advertList?.length && userType === types.SUPPORTER">
        <request-item v-for="demand in advertList" :key="demand._id" :advert="demand" />
      </div>
      <div v-else-if="didFetch" class="no-results">
        <div class="result-message">
          Ne Yazık ki Aradığın Kriterlere <br />
          Uygun {{userType === types.DEMANDER ? 'Destek' : 'Talep'}} Bulunamadı.
        </div>
        <div v-show="!user.type === types.SUPPORTER" class="create-advert">
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
import RequestItem from '~/components/Request/RequestItem.vue'
import cities from '~/data/location.json'
import types from '~/data/types.json'

export default {
  name: 'SearchPage',
  components: { Advert, RequestItem },
  data() {
    return {
      types,
      location: {
        name: null,
        id: '',
      },
      didFetch: false,
      loading: false,
      error: false,
      searchTerm: '',
      results: false,
      advertList: []
    }
  },
  computed: {
    cities() {
      return cities
    },
    user() {
      return this.$store.state.user.user
    },
    userType() {
      return this.user?.type ? this.user?.type : types.DEMANDER
    }
  },
  methods: {
    async filterAdverts() {
      try {
        this.loading = true
        const data = await this.$store.dispatch('advert/searchAdverts', {'city_id': this.location.id, 'term': this.searchTerm, userType: this.userType})
        if (data) {
          this.didFetch = true
          this.advertList = data
        }
      } catch (error) {
        console.error(error)
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
.spinner {
  margin: auto;
}

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
    @include media(sm, xs) {
        font-size: 1rem;
      }
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
