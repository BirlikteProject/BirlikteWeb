const state = () => ({
  advertList: [],
  demandList: [],
  categoryList: [],
  citiesList: {}
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
    if (advResponse.status) {
      context.commit('SET_ADVERT_LIST', advResponse.data)
    }
    context.dispatch('fetchCategories')
    context.dispatch('fetchCities')
  },

  async fetchAdvertsByCategory(context, payload) {
    const advResponse = await this.$api.advertServices.getAdvertByCategory(payload)
    if (advResponse.status) {
      context.commit('SET_ADVERT_LIST', advResponse.data)
    }
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

  async searchAdverts(context, cityId, searchTerm) {
    const response = await this.$api.advertServices.searchAdverts(cityId, searchTerm)
    if (response.status) {
      context.commit('SET_ADVERT_LIST', response.data)
      return response.data
    }
  },

  async createAdvert(context, payload) {
    const response = await this.$api.advertServices.createAdvert(payload)
    if (response.status) {
      context.dispatch('modal/setAdvertSuccessModal', true, { root: true })
      const category = context.state.categoryList.filter((c) => c._id === response.data.category_id)[0]
      context.commit('SET_ADVERT_LIST', [{...(response.data), category_id: category}, ...context.state.advertList])
    }
  },
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
