const state = () => ({
  loginModal: false,
  registerModal: false,
})

const mutations = {
  SET_LOGIN_MODAL(state, payload) {
    state.loginModal = payload
  },
  SET_REGISTER_MODAL(state, payload) {
    state.registerModal = payload
  },
}

const actions = {
  setLoginModal(context, payload) {
    context.commit('SET_LOGIN_MODAL', payload)
  },
  setRegisterModal(context, payload) {
    context.commit('SET_REGISTER_MODAL', payload)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
