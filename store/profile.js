const state = () => ({
  profiles: []
})
const actions = {
  async getProfileById(context, id) {
    const response = await this.$api.profileServices.getProfileById(id)
    if (response.data.status) {
      return response.data
    }
  },

  async getProfiles(context) {
    const response = await this.$api.profileServices.getProfiles()
    if (response.data.status) {
      context.commit('SET_PROFILES', response.data)
    }
  },
}
const mutations = {
  SET_PROFILES(state, payload) {
    state.profiles = payload
  },
}

export default {
  state,
  actions,
  mutations,
  nameSpaced: true,
}
