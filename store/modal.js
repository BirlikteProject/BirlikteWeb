const state = () => ({
  loginModal: false,
  registerModal: false,
  kvkkModal: false,
  privacyPolicy: false,
})

const mutations = {
  SET_LOGIN_MODAL(state, payload) {
    state.loginModal = payload
  },
  SET_REGISTER_MODAL(state, payload) {
    state.registerModal = payload
  },
  SET_KVKK_MODAL(state, payload) {
    state.kvkkModal = payload
  },
  SET_PRIVACY_POLICY(state, payload) {
    state.privacyPolicy = payload
  }
}

const actions = {
  setLoginModal(context, payload) {
    context.commit('SET_LOGIN_MODAL', payload)
  },
  setRegisterModal(context, payload) {
    context.commit('SET_REGISTER_MODAL', payload)
  },
  setKvkkModal(context, payload) {
    context.commit('SET_KVKK_MODAL', payload)
  },
  setPrivacyPolicy(context, payload) {
    context.commit('SET_PRIVACY_POLICY', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
