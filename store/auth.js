import { auth, googleProvider } from '~/plugins/firebase'

const state = () => ({})

const actions = {
  async signWithGoogle() {
    await auth.signInWithPopup(googleProvider).then((response) => {
      console.log(response)
    })
  },
}

const mutations = {}

export default {
  state,
  actions,
  mutations,
}
