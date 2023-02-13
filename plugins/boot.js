import jwtDecode from "jwt-decode";

export default async function ({ app, store }) {
    const token = app.$cookiz.get('token')
    if (token) {
      const decodedToken = jwtDecode(token)
      if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
        app.$cookiz.set("token", '') // remove token from cookies
        store.dispatch('user/setToken', '')
      } else {
        store.dispatch('user/setToken', token)
        await store.dispatch('user/fetchUser')
      }
    }
}
