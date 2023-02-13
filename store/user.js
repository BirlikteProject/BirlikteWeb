import Cookies from 'js-cookie'
import { auth, googleProvider } from '~/plugins/firebase'
const state = () => ({
  token: '',
  user: {},
})

const actions = {
  async signWithGoogle(context, payload) {
    const firebaseResponse = await auth.signInWithPopup(googleProvider)
    if(firebaseResponse.additionalUserInfo.isNewUser) {
      const response = await this.$api.authServices.register({
        firebase_token: firebaseResponse.user._delegate.accessToken,
        type: payload.type,
        fullName: firebaseResponse.user.displayName,
      })
      if (response.status) {
        Cookies.set('token', response.data, { exp: '7d' })
        context.commit('SET_TOKEN', response.data)
        await context.dispatch('fetchUser')
      }
    } else {
      const response = await this.$api.authServices.login({
        firebase_token: firebaseResponse.user._delegate.accessToken,
      })
      if (response.status) {
        Cookies.set('token', response.data, { exp: '7d' })
        context.commit('SET_TOKEN', response.data)
        await context.dispatch('fetchUser')
      }
    }
  },

  async registerWithEmail(context, payload) {
    try {
      const firebaseResponse = await auth // response from firebase
        .createUserWithEmailAndPassword(payload.email, payload.password)
      const response = await this.$api.authServices.register({
        firebase_token: firebaseResponse.user._delegate.accessToken,
        type: payload.type,
        fullName: payload.fullName,
      })
      if (response.status) {
        Cookies.set('token', response.data, { exp: '7d' })
        context.commit('SET_TOKEN', response.data.token)
        await context.dispatch('fetchUser')
        alert('User created')
      }
    } catch (error) {
    }
  },

  // Async login action
  async login(context, payload) {
    try {
      const firebaseResponse = await auth // response from firebase
        .signInWithEmailAndPassword(payload.email, payload.password)
      if (firebaseResponse.user._delegate.accessToken) {
        const response = await this.$api.authServices.login({
          firebase_token: firebaseResponse.user._delegate.accessToken,
        })
        if (response.status) {
          Cookies.set('token', response.data, { exp: '7d' })
          context.commit('SET_TOKEN', response.data.token)
          await context.dispatch('fetchUser')
        }
      } else {
        alert('Login Failed')
      }
    } catch (error) {}
  },

  async fetchUser(context) {
    try {
      const response = await this.$api.profileServices.getOwnProfile()
      context.commit('SET_USER', response.data)
      console.log(response.data)
    } catch (error) {
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
    return !!Object.keys(state.user)
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
  nameSpaced: true,
}
