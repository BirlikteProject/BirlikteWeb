const state = () => ({
  advertList: [],
  categoryList: [],
  citiesList: {},
})

const mutations = {
  SET_ADVERT_LIST(state, payload) {
    state.advertList = payload
  },
  SET_CATEGORY_LIST(state, payload) {
    state.categoryList = payload
  },
  SET_CITIES_LIST(state, payload) {
    state.citiesList = payload
  },
}

const actions = {
  async fetchAdverts(context) {
    const advResponse = await this.$api.advertServices.getAdvertPage()
    console.log(advResponse)
    if (advResponse.status) {
      context.commit('SET_ADVERT_LIST', advResponse.data)
    }
    context.dispatch('fetchCategories')
    context.dispatch('fetchCities')
  },

  async fetchCategories(context) {
    const response = await this.$api.categoryServices.getCategories()
    if (response.status) {
      context.commit('SET_CATEGORY_LIST', response.data)
    }
  },

  async fetchCities(context) {
    const response = await this.$api.advertServices.getCities()
    if (response.status) {
      const cities = {}
      response.data.forEach((city) => {
        cities[city._id] = city.name
      })
      context.commit('SET_CITIES_LIST', cities)
    }
  },

  async getAdvertById(context, id) {
    const filteredList = context.state.advertList.filter(
      (adv) => adv._id === id
    )
    if (filteredList.length) return filteredList[0]
    const response = await this.$api.advertServices.getAdvertById(id)
    if (response.status) {
      return response.data
    }
  },

  async searchAdverts(context, city, title) {
    const response = await this.$api.advertServices.searchAdverts(city, title)
    if (response.status) {
      return response.data
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
