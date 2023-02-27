import { auth, googleProvider } from '~/plugins/firebase'
const state = () => ({
  token: '',
  user: {},
  loading: false,
  error: '',
  advertList: [],
})

const actions = {
  async signWithGoogle(context, payload) {
    try {
      context.commit('SET_LOADING', true)
      const firebaseResponse = await auth.signInWithPopup(googleProvider)
      if (firebaseResponse.additionalUserInfo.isNewUser) {
        const response = await this.$api.authServices.register({
          firebase_token: firebaseResponse.user._delegate.accessToken,
          type: payload.type,
          fullName: firebaseResponse.user.displayName,
          image_url: firebaseResponse.user.photoURL,
        })
        if (response.status) {
          this.$cookiz.set('token', response.data.token, { exp: '7d' })
          context.commit('SET_TOKEN', response.data.token)
          context.commit('SET_USER', response.data.user)
          context.commit('SET_ERROR', '')
          this.$router.push({ path: '/kayit-tamamla' })
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
            context.commit('SET_ERROR', '')
            this.$router.push({ path: '/' })
          }
        } catch (error) {
          try {
            const _response = await this.$api.authServices.register({
              firebase_token: firebaseResponse.user._delegate.accessToken,
              type: payload.type,
              fullName: firebaseResponse.user.displayName,
              image_url: firebaseResponse.user.photoURL,
            })
            if (_response.status) {
              this.$cookiz.set('token', _response.data.token, { exp: '7d' })
              context.commit('SET_TOKEN', _response.data.token)
              context.commit('SET_USER', _response.data.user)
              context.commit('SET_ERROR', '')
              this.$router.push({ path: '/kayit-tamamla' })
            }
          } catch (error) {
            context.commit(
              'SET_ERROR',
              'Bir problem oluştu. Lütfen daha sonra tekrar deneyiniz'
            )
          }
        }
      }
    } catch (error) {
      // user could not be registered
      context.commit(
        'SET_ERROR',
        'Bir problem oluştu. Lütfen daha sonra tekrar deneyiniz'
      )
    } finally {
      context.commit('SET_LOADING', false)
    }
  },

  async registerWithEmail(context, payload) {
    try {
      context.commit('SET_LOADING', true)
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
        context.commit('SET_ERROR', '')
        this.$router.push({ path: '/kayit-tamamla' })
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        context.commit(
          'SET_ERROR',
          'Bu email adresi ile bir hesap bulunmaktadır. Lütfen başka bir email adresi deneyiniz.'
        )
      } else if (error.code === 'auth/weak-password') {
        context.commit(
          'SET_ERROR',
          'Lütfen en az 8 karakterli bir şifre giriniz.'
        )
      } else {
        context.commit(
          'SET_ERROR',
          'Geçici süre için kayıt olamıyorsunuz. Lütfen daha sonra tekrar deneyiniz.'
        )
      }
    } finally {
      context.commit('SET_LOADING', false)
    }
  },

  // Async login action
  async login(context, payload) {
    try {
      context.commit('SET_LOADING', true)
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
          context.commit('SET_ERROR', '')
          this.$router.push({ path: '/' })
        }
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        context.commit(
          'SET_ERROR',
          'Email adresinizi veya şifrenizi yanlış girdiniz.'
        )
      } else if (error.code === 'auth/wrong-password') {
        context.commit(
          'SET_ERROR',
          'Email adresinizi veya şifrenizi yanlış girdiniz.'
        )
      } else if (error.code === 'auth/too-many-requests') {
        context.commit(
          'SET_ERROR',
          'Çok fazla yanlış deneme yaptınız, tekrar denemeden önce lütfen bekleyiniz.'
        )
      } else {
        context.commit(
          'SET_ERROR',
          'Geçici süre için giriş yapamıyorsunuz. Lütfen daha sonra tekrar deneyiniz.'
        )
      }
    } finally {
      context.commit('SET_LOADING', false)
    }
  },

  async fetchUser(context, payload) {
    if (
      context.state.token &&
      !Object.keys(context.state.user).includes('fullName')
    ) {
      try {
        context.commit('SET_LOADING', true)
        const response = await this.$api.profileServices.getOwnProfile()
        context.commit('SET_USER', response.data)
      } catch (error) {
      } finally {
        context.commit('SET_LOADING', false)
      }
    }
  },

  async fetchAdverts(context) {
    try {
      context.commit('SET_LOADING', true)
      const response = await this.$api.advertServices.getAdvertsByUserId(
        context.state.user._id
      )
      if (response.status) {
        context.commit('SET_ADVERT_LIST', response.data)
      }
    } catch (error) {
      context.commit(
        'SET_ERROR',
        'İlanlarınızı getirirken bir problem yaşadık. Lütfen daha sonra tekrar deneyiniz.'
      )
    } finally {
      context.commit('SET_LOADING', false)
    }
  },

  async updateUser(context, payload) {
    if (context.state.token) {
      try {
        context.commit('SET_LOADING', true)
        const response = await this.$api.profileServices.updateOwnProfile(
          payload
        )
        if (response.status) {
          context.commit('SET_USER', response.data)
          context.commit('SET_ERROR', '')
          context.dispatch('modal/setAdvertSuccessModal', true, { root: true })
        }
      } catch (error) {
        context.dispatch('modal/setAdvertErrorModal', true)
        if (!error.response.data.status) {
          context.commit(
            'SET_ERROR',
            'Lütfen girdiğiniz bilgilerin doğru olduğuna emin olunuz.'
          )
        } else {
          context.commit(
            'SET_ERROR',
            'Bir sorun oluştu. Lütfen daha sonra tekrar deneyiniz.'
          )
        }
      } finally {
        context.commit('SET_LOADING', false)
      }
    }
  },

  logout(context) {
    this.$cookiz.remove('token', { path: '/' })
    context.commit('SET_TOKEN', '')
    context.commit('SET_USER', {})
    this.$router.push({ path: '/giris-yap' })
  },

  // Sync Login action
  setToken(context, payload) {
    context.commit('SET_TOKEN', payload)
  },

  setUser(context, payload) {
    context.commit('SET_USER', payload)
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
  },
  SET_ERROR(state, payload) {
    state.error = payload
  },
  SET_LOADING(state, payload) {
    state.loading = payload
  },
}

const getters = {
  isAuthenticated(state) {
    return !!state.user.email
  },
  getToken(state) {
    return state.token
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
  nameSpaced: true,
}
