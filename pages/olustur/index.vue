<template>
  <div class="create-advert-page-container">
    <div class="page-content">
      <div class="page-title">Oluştur</div>
      <div class="create-section">
        <div class="category-selection">
          <div class="selection-button">
            <span>{{ selectedCategory }}</span>
          </div>
          <div class="category-selection-dropdown">
            <span
              v-for="i in categories"
              :key="i._id"
              class="category-item"
              :class="selectedCategory === i.name ? 'selected' : ''"
              @click="selectCategory(i)"
            >
              {{ i.name }}
            </span>
          </div>
        </div>
        <div class="location-selection">
          <div class="search-input-box">
            <input
              v-model="locationKeyword"
              type="text"
              placeholder="Şehir Giriniz"
            />
          </div>
          <div v-if="locationKeyword" class="search-results">
            <span
              v-for="[id, name] in filteredLocation"
              :key="id"
              class="search-result-item"
              :class="locationKeyword === name ? 'selected' : ''"
              @click="selectCity({ id, name })"
            >
              {{ name }}
            </span>
          </div>
        </div>
        <div class="advert-title-input">
          <input
            v-model="newAdvert.title"
            type="text"
            placeholder="* Başlık Giriniz"
          />
        </div>
        <div class="advert-description-input">
          <textarea
            v-model="newAdvert.description"
            placeholder="* Açıklama"
            rows="8"
          />
        </div>
      </div>
      <buton class="advert-submit-btn" @click="createAdvert()">Paylaş</buton>
    </div>
    <AdvertSuccessModal v-if="isAdvertSuccessModalOpen" />
    <AdvertErrorModal v-if="isAdvertErrorModalOpen" />
    <AppWarningModal v-if="isAppWarningModalOpen" />
  </div>
</template>

<script>
import AdvertSuccessModal from '~/components/Main/Modals/AdvertSuccessModal.vue'
import AdvertErrorModal from '~/components/Main/Modals/AdvertErrorModal.vue'
import AppWarningModal from '~/components/Main/Modals/AppWarningModal.vue'
import types from '~/data/types.json'
import locations from '~/data/location.json'

export default {
  name: 'CreateAdvertPage',
  components: { AdvertSuccessModal, AdvertErrorModal, AppWarningModal },
  layout: 'default',
  middleware: ['auth'],
  data() {
    return {
      types,
      locations,
      categorySelection: false,
      locationKeyword: '',
      selectedCategory: '* Kategori Seçiniz',
      newAdvert: {
        title: '',
        description: '',
        category_id: '',
        city_id: '',
        postingType: '',
        type: types.DEMANDER,
      },
    }
  },
  computed: {
    isAdvertSuccessModalOpen() {
      return this.$store.state.modal.advertSuccessModal
    },
    isAdvertErrorModalOpen() {
      return this.$store.state.modal.advertErrorModal
    },
    isAppWarningModalOpen() {
      return this.$store.state.modal.appWarningModal
    },
    categories() {
      return this.$store.state.advert.categoryList
    },
    filteredLocation() {
      if (this.locationKeyword.length > 0) {
        return Object.entries(this.locations).filter(([id, name]) => {
          return (
            id === this.types.ONLINE ||
            name.toLowerCase().includes(this.locationKeyword.toLowerCase())
          )
        })
      } else {
        return []
      }
    },
  },
  watch: {
    locationKeyword(val) {
      if (val === '') {
        this.newAdvert.city_id = val
      }
    },
    'newAdvert.city_id'(val) {
      if (val === this.types.ONLINE) {
        this.newAdvert.city_id = ''
      }

      this.newAdvert.postingType =
        !val || val === this.types.ONLINE
          ? this.types.ONLINE
          : this.types.FACETOFACE
    },
  },
  mounted() {
    this.$store.dispatch('modal/setAppWarningModal', true)
  },
  methods: {
    createAdvert() {
      const { title, description, category_id: categoryId } = this.newAdvert

      if (title === '' || description === '' || categoryId === '') {
        this.$store.dispatch('modal/setAdvertErrorModal', true)
        return
      }

      this.$store.dispatch('advert/createAdvert', { ...this.newAdvert, type: this.$store.state.user.user.type })
    },
    selectCategory(category) {
      this.selectedCategory = category.name
      this.newAdvert.category_id = category._id
    },
    selectCity(city) {
      this.locationKeyword = city.name
      this.newAdvert.city_id = city.id
    },
  },
}
</script>

<style lang="scss">
.create-advert-page-container {
  input {
    color: #828282;
    border: none;
    outline: none;
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
  }
  .page-content {
    padding-bottom: 3rem;
    .page-title {
      padding: 1rem;
      font-size: 1.5rem;
      font-weight: 600;
      color: #828282;
    }
    .create-section {
      display: flex;
      width: 100%;
      flex-direction: column;
      margin-bottom: 4rem;
      border-top: 1px solid #dedede;
      border-bottom: 1px solid #dedede;
      padding: 1rem;
      .category-selection {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        width: 100%;
        .selection-button {
          padding: 1rem;
          font-size: 1rem;
          font-weight: 500;
          color: #828282;
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
          width: 100%;
          cursor: pointer;
          background-color: #f2f5f9;
        }
        .category-selection-dropdown {
          width: 100%;
          margin-top: 1rem;
          display: flex;
          flex-wrap: wrap;
          .category-item {
            padding: 0.5rem 1rem;
            background-color: #f2f5f9;
            color: #828282;
            border-radius: 10px;
            margin-bottom: 5px;
            cursor: pointer;
            &.selected {
              background-color: $primary-color;
              color: #fff;
            }
            &:not(:last-child) {
              margin-right: 1rem;
            }
          }
        }
      }
      .location-selection {
        margin-bottom: 1rem;
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
            padding: 1rem;
            font-size: 1rem;
            font-weight: 500;
          }
        }
        .search-results {
          display: flex;
          width: 100%;
          flex-wrap: wrap;
          max-height: 300px;
          overflow-y: auto;
          margin-top: 1rem;
          .search-result-item {
            height: 2.5rem;
            padding: 0 1rem;
            margin-bottom: 0.5rem;
            background-color: #f2f5f9;
            color: #828282;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            &.selected {
              background-color: $primary-color;
              color: #fff;
            }
            &:not(:last-child) {
              margin-right: 1rem;
            }
          }
        }
      }
      .advert-title-input {
        background: #f2f5f9;
        border-radius: 10px;
        margin-bottom: 1rem;
        input {
          padding: 1rem;
        }
      }
      .advert-description-input {
        background: #f2f5f9;
        border-radius: 10px;
        padding: 1rem;
        textarea {
          color: #828282;
          font-size: 1rem;
          font-weight: 500;
          font-family: 'Campton', sans-serif;
          background: transparent;
          min-width: 100%;
          max-width: 100%;
          border: none !important;
        }
        textarea:focus {
          outline: none;
        }
      }
    }
    .advert-submit-btn {
      background: #27ae60;
      border-radius: 7px;
      color: white;
      width: max-content;
      padding: 1rem 10rem;
      display: block;
      margin: auto;
      cursor: pointer;
    }
  }
}
</style>
