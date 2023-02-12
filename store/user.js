import jsCookie from 'js-cookie'

const state = () => ({
  token: '',
  user: {},
})

const actions = {
  // Async login action
  async login(context, payload) {
    const response = await this.$api.userServices.login(payload)
    if (response.data.status) {
      jsCookie.set('token', response.data.data.token, { expires: 30 })
      context.commit('SET_USER', response.data.user)
      context.commit('SET_TOKEN', response.data.token)
    } else {
      alert('Login Failed')
    }
  },

  async register(context, payload) {
    const response = await this.$api.userServices.register(payload)
    if (response.data.status) {
      alert('Email sent')
    } else {
      alert('Something went wrong')
    }
  },

  // Sync Login action
  setToken(context, payload) {
    context.commit('SET_TOKEN', payload)
  },
}

const mutations = {
  SET_TOKEN(state, payload) {
    state.token = payload
  },
  SET_USER(state, payload) {
    state.user = payload
  },
}

const getters = {
  isAuthenticated(state) {
    return !!(Object.keys(state.user))
  }
}

export default {
  state,
  actions,
  mutations,
  getters,
  nameSpaced: true,
}
