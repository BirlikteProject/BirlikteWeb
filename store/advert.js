const state = () => ({
  advertList: {},
})

const mutations = {
  SET_ADVERT_LIST(state, payload) {
    state.advertList = payload
  },
}

const actions = {
  async fetchAdverts(context) {
    const response = await this.$api.advertServices.getAdvertPage()
    if (response.status) {
      context.commit('SET_ADVERT_LIST', response.data)
    }
  },

  async getAdvertById(context, id) {
    const filteredList = context.state.advertList.filter((adv) => adv._id === id)
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
