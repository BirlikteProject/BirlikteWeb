import types from '~/data/types.json'

const state = () => ({
  advertList: [],
  demandList: [],
  categoryList: [],
  cityList: {},
  selectedAdvert: {},
})

const mutations = {
  SET_ADVERT_LIST(state, payload) {
    state.advertList = payload
  },
  SET_DEMAND_LIST(state, payload) {
    state.demandList = payload
  },
  SET_CATEGORY_LIST(state, payload) {
    state.categoryList = payload
  },
  SET_CITIES_LIST(state, payload) {
    state.cityList = payload
  },
  SET_SELECTED_ADVERT(state, payload) {
    state.selectedAdvert = payload
  },
}

const actions = {
  async fetchAdverts(context, payload) {
    const advResponse = await this.$api.advertServices.getAdverts({
      type: types.SUPPORTER,
      page: payload?.page,
      limit: payload?.limit,
    })
    if (advResponse.status) {
      if(!payload || (Object.keys(payload).includes('page') && payload.page === 1)) {
        context.commit('SET_ADVERT_LIST', advResponse.data)
      } else {
        context.commit('SET_ADVERT_LIST', [...context.state.advertList, ...advResponse.data])
      }
    }
    context.dispatch('fetchCategories')
    context.dispatch('fetchCities')
  },

  async fetchDemands(context, payload) {
    const response = await this.$api.advertServices.getAdverts({
      type: types.DEMANDER,
      page: payload?.page,
      limit: payload?.limit,
    })
    if (response.status) {
      context.commit('SET_DEMAND_LIST', response.data)
    }
  },

  async getAdvertsByCategory(context, payload) {
    try {
      const response = await this.$api.advertServices.getAdvertByCategory(payload.categoryId)
      if (response.status) {
        return response.data
      }
    } catch (error) {

    }
  },

  async fetchCategories(context) {
    if(context.state.categoryList.length > 0) {
      return
    }
    const response = await this.$api.categoryServices.getCategories()
    if (response.status) {
      context.commit('SET_CATEGORY_LIST', response.data)
    }
  },

  async fetchCities(context) {
    if(context.state.cityList.length > 0) {
      return
    }
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
    if (filteredList.length)
      return context.commit('SET_SELECTED_ADVERT', filteredList[0])
    const response = await this.$api.advertServices.getAdvertById(id)
    if (response.status) {
      context.commit('SET_SELECTED_ADVERT', response.data)
    }
  },

  async searchAdverts(context, payload) {
    try {
      if (payload.userType === types.DEMANDER) {
        const response = await this.$api.advertServices.getAdverts({
          ...payload,
          type: types.SUPPORTER,
        })
        if (response.status) {
          return response.data
        }
      }
      if (payload.userType === types.SUPPORTER) {
        const response = await this.$api.advertServices.getAdverts({
          ...payload,
          type: types.DEMANDER,
        })
        if (response.status) {
          return response.data
        }
      }
    } catch (error) {
      return []
    }
  },

  async createAdvert(context, payload) {
    const response = await this.$api.advertServices.createAdvert(payload)
    if (response.status) {
      context.dispatch('modal/setAdvertSuccessModal', true, { root: true })
      const category = context.state.categoryList.filter(
        (c) => c._id === response.data.category_id
      )[0]
      context.commit('SET_ADVERT_LIST', [
        { ...response.data, category_id: category },
        ...context.state.advertList,
      ])
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
