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
              @click="selectedCategory = i.name"
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
          <div class="search-results">
            <span
              v-for="city in filteredLocation"
              :key="city"
              class="search-result-item"
              :class="locationKeyword === city ? 'selected' : ''"
              @click="locationKeyword = city"
            >
              {{ city }}
            </span>
          </div>
        </div>
        <div class="advert-title-input">
          <input
            v-model="newAdvert.title"
            type="text"
            placeholder="Başlık Giriniz"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateAdvertPage',
  layout: 'default',
  data() {
    return {
      categorySelection: false,
      locationKeyword: '',
      selectedCategory: 'Kategori Seçiniz',
      newAdvert: {
        title: '',
        description: '',
        city: '',
        category: '',
      },
    }
  },
  computed: {
    categories() {
      return this.$store.state.advert.categoryList
    },
    locations() {
      return this.$store.state.advert.citiesList
    },
    filteredLocation() {
      if (this.locationKeyword.length > 0) {
        return Object.values(this.locations).filter((city) => {
          return city.toLowerCase().includes(this.locationKeyword.toLowerCase())
        })
      } else {
        return []
      }
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
      border-top: 1px solid #dedede;
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
          .category-item {
            padding: 0.5rem 1rem;
            background-color: #f2f5f9;
            color: #828282;
            border-radius: 10px;
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
    }
  }
}
</style>