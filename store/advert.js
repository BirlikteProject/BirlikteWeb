import types from '~/data/types.json'
import categories from '~/data/categories.json'
import cities from '~/data/location.json'

const state = () => ({
  advertList: [],
  demandList: [],
  categoryList: categories,
  cityList: cities,
  selectedAdvert: {},
  loading: false,
  error: '',
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
  SET_LOADING(state, payload) {
    state.loading = payload
  },
  SET_ERROR(state, payload) {
    state.error = payload
  },
}

const actions = {
  async fetchAdverts(context, payload) {
    try {
      context.commit('SET_LOADING', true)
      const advResponse = await this.$api.advertServices.getAdverts({
        type: types.SUPPORTER,
        page: payload?.page,
        limit: payload?.limit,
      })
      if (advResponse.status) {
        if (
          !payload ||
          (Object.keys(payload).includes('page') && payload.page === 1)
        ) {
          context.commit('SET_ADVERT_LIST', advResponse.data)
        } else {
          context.commit('SET_ADVERT_LIST', [
            ...context.state.advertList,
            ...advResponse.data,
          ])
        }
      }
    } catch (error) {
    } finally {
      context.commit('SET_LOADING', false)
    }
  },

  async fetchDemands(context, payload) {
    try {
      context.commit('SET_LOADING', true)
      const response = await this.$api.advertServices.getAdverts({
        type: types.DEMANDER,
        page: payload?.page,
        limit: payload?.limit,
      })
      if (response.status) {
        context.commit('SET_DEMAND_LIST', response.data)
      }
    } catch (error) {
    } finally {
      context.commit('SET_LOADING', false)
    }
  },

  async getAdvertsByCategory(context, payload) {
    try {
      context.commit('SET_LOADING', true)
      const response = await this.$api.advertServices.getAdvertByCategory(
        payload.categoryId
      )
      if (response.status) {
        return response.data
      }
    } catch (error) {
    } finally {
      context.commit('SET_LOADING', false)
    }
  },

  async fetchCategories(context) {
    if (context.state.categoryList.length > 0) {
      return
    }
    try {
      context.commit('SET_LOADING', true)
      const response = await this.$api.categoryServices.getCategories()
      if (response.status) {
        context.commit('SET_CATEGORY_LIST', response.data)
      }
    } catch (error) {
    } finally {
      context.commit('SET_LOADING', false)
    }
  },

  async fetchCities(context) {
    if (context.state.cityList.length > 0) {
      return
    }
    try {
      context.commit('SET_LOADING', true)
      const response = await this.$api.advertServices.getCities()
      if (response.status) {
        const cities = {}
        response.data.forEach((city) => {
          cities[city._id] = city.name
        })
        context.commit('SET_CITIES_LIST', cities)
      }
    } catch (error) {
    } finally {
      context.commit('SET_LOADING', false)
    }
  },

  async getAdvertById(context, id) {
    const filteredList = context.state.advertList.filter(
      (adv) => adv._id === id
    )
    if (filteredList.length)
      return context.commit('SET_SELECTED_ADVERT', filteredList[0])
    try {
      const response = await this.$api.advertServices.getAdvertById(id)
      if (response.status) {
        context.commit('SET_SELECTED_ADVERT', response.data)
      }
      context.commit('SET_LOADING', true)
    } catch (error) {
    } finally {
      context.commit('SET_LOADING', false)
    }
  },

  async searchAdverts(context, payload) {
    try {
      context.commit('SET_LOADING', true)
      const response = await this.$api.advertServices.getAdverts({
        ...payload,
        type:
          payload.userType === types.SUPPORTER
            ? types.DEMANDER
            : types.SUPPORTER,
      })
      if (response.status) {
        context.commit('SET_LOADING', false)
        return response.data
      }
    } catch (error) {
      context.commit('SET_LOADING', false)
      context.commit('SET_ERROR', 'Üzgünüz şuanda aradığınız sonuçları getiremiyoruz.')
      return []
    }
  },

  async createAdvert(context, payload) {
    try {
      context.commit('SET_LOADING', true)
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
    } catch (error) {
    } finally {
      context.commit('SET_LOADING', false)
      context.commit('SET_ERROR', 'Bir şeyler ters gitti. Lütfen daha sonra tekrar deneyiniz.')
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
