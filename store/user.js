import { auth, googleProvider } from '~/plugins/firebase'
const state = () => ({
  token: '',
  user: {},
  advertList: [],
  isAuthenticated: false,
})

const actions = {
  async signWithGoogle(context, payload) {
    const firebaseResponse = await auth.signInWithPopup(googleProvider)
    if (firebaseResponse.additionalUserInfo.isNewUser) {
      try {
        const response = await this.$api.authServices.register({
          firebase_token: firebaseResponse.user._delegate.accessToken,
          type: payload.type,
          fullName: firebaseResponse.user.displayName,
          image_url: firebaseResponse.user.photoURL,
          username: firebaseResponse.user.email.split('@')[0],
        })
        if (response.status) {
          this.$cookiz.set('token', response.data.token, { exp: '7d' })
          context.commit('SET_TOKEN', response.data.token)
          context.commit('SET_USER', response.data.user)
          this.$router.push({ path: '/kayit-tamamla' })
        }
      } catch (error) {
        // user could not be registered
      }
    } else {
      try {
        const response = await this.$api.authServices.login({
          firebase_token: firebaseResponse.user._delegate.accessToken,
        })
        if (response.status) {
          this.$cookiz.set('token', response.data.token, { exp: '7d' })
          context.commit('SET_TOKEN', response.data.token)
          context.commit('SET_USER', response.data.user)
        }
      } catch (error) {
        const _response = await this.$api.authServices.register({
          firebase_token: firebaseResponse.user._delegate.accessToken,
          type: payload.type,
          fullName: firebaseResponse.user.displayName,
          image_url: firebaseResponse.user.photoURL,
        })
        this.$cookiz.set('token', _response.data.token, { exp: '7d' })
        context.commit('SET_TOKEN', _response.data.token)
        context.commit('SET_USER', _response.data.user)
        this.$router.push({ path: '/kayit-tamamla' })
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
        this.$cookiz.set('token', response.data.token, { exp: '7d' })
        context.commit('SET_TOKEN', response.data.token)
        context.commit('SET_USER', response.data.user)
        this.$router.push({ path: '/kayit-tamamla' })
      }
    } catch (error) {}
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
          this.$cookiz.set('token', response.data.token, { exp: '7d' })
          context.commit('SET_TOKEN', response.data.token)
          context.commit('SET_USER', response.data.user)
          this.$router.push('/')
        }
      } else {
        alert('Login Failed')
      }
    } catch (error) {}
  },

  async fetchUser(context, payload) {
    if (
      context.state.token &&
      !Object.keys(context.state.user).includes('fullName')
    ) {
      try {
        const response = await this.$api.profileServices.getOwnProfile()
        context.commit('SET_USER', response.data)
      } catch (error) {
        // console.error(error)
      }
    }
  },

  async fetchAdverts(context) {
    try {
      const response = await this.$api.advertServices.getAdvertsByUserId(
        context.state.user._id
      )
      context.commit('SET_ADVERT_LIST', response.data)
    } catch (error) {
      // console.error(error)
    }
  },

  async updateUser(context, payload) {
    if (context.state.token) {
      try {
        const response = await this.$api.profileServices.updateOwnProfile(
          payload
        )
        if (response.status) {
          context.commit('SET_USER', response.data)
          context.dispatch('modal/setAdvertSuccessModal', true, { root: true })
          return true
        }
      } catch (error) {
        this.$store.dispatch('modal/setAdvertErrorModal', true)
      }
      return false
    }
  },

  logout(context) {
    this.$cookiz.remove('token', { path: '/' })
    context.commit('SET_TOKEN', '')
    context.commit('SET_USER', {})
    this.$router.push('/giris-yap')
  },

  // Sync Login action
  setToken(context, payload) {
    context.commit('SET_TOKEN', payload)
  },

  setUser(context, payload) {
    context.commit('SET_USER', payload)
  },

  isAuthenticated(context) {
    return !!context.state.user.fullName
  },
}

const mutations = {
  SET_TOKEN(state, payload) {
    state.token = payload
  },
  SET_ADVERT_LIST(state, payload) {
    state.advertList = payload
  },
  SET_USER(state, payload) {
    state.user = payload
    state.isAuthenticated = !!payload.fullName
  },
}

const getters = {
  isAuthenticated(state) {
    return !!state.user.fullName
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
  nameSpaced: true,
}
