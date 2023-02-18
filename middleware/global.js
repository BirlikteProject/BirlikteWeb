import jwtDecode from 'jwt-decode'

export default async function ({ app, store }) {
  const token = app.$cookiz.get('token')
  if (token) {
    const decodedToken = jwtDecode(token)
    if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
      app.$cookiz.remove('token') // remove token from cookies
      store.dispatch('user/setToken', '')
    } else {
      store.dispatch('user/setToken', token)
      if (store.getters['user/isAuthenticated']) return
      const response = await app.$axios({
        method: 'GET',
        url: `${process.env.API_BASE_URL}/api/v1/profile`,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      store.dispatch('user/setUser', response.data.data)
    }
  }
}
