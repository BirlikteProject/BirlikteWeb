import jwtDecode from "jwt-decode";

export default async function ({ app, store }) {
    const token = app.$cookiz.get('token')
    if (token) {
      const decodedToken = jwtDecode(token)
      if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
        app.$cookiz.remove("token") // remove token from cookies
        store.dispatch('user/setToken', '')
      } else {
        store.dispatch('user/setToken', token)
        // await store.dispatch('user/fetchUser')
        if(store.state.user.isAuthenticated) return
        const response = await app.$axios({
          method: 'GET',
          url: 'http://142.93.106.148:5000/api/v1' + '/profile',
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        store.dispatch('user/setUser', response.data.data)
      }
    }
}
