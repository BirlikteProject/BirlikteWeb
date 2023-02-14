const state = () => ({
  loginModal: false,
  registerModal: false,
  kvkkModal: false,
  privacyPolicy: false,
  advertSuccessModal: false,
  advertErrorModal: false,
  appWarningModal: false,
  appInfoModal: false,
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
  },
  SET_ADVERT_ERROR_MODAL(state, payload) {
    state.advertErrorModal = payload
  },
  SET_ADVERT_SUCCESS_MODAL(state, payload) {
    state.advertSuccessModal = payload
  },
  SET_APP_WARNING_MODAL(state, payload) {
    state.appWarningModal = payload
  },
  SET_APP_INFO_MODAL(state, payload) {
    state.appInfoModal = payload
  },
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
  },
  setAdvertSuccessModal(context, payload) {
    context.commit('SET_ADVERT_SUCCESS_MODAL', payload)
  },
  setAdvertErrorModal(context, payload) {
    context.commit('SET_ADVERT_ERROR_MODAL', payload)
  },
  setAppWarningModal(context, payload) {
    context.commit('SET_APP_WARNING_MODAL', payload)
  },
  setAppInfoModal(context, payload) {
    context.commit('SET_APP_INFO_MODAL', payload)

    if (payload === true) {
      localStorage.setItem('isAppInfoModalDisplayed', true)
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
