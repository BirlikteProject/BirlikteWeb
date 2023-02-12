import decoder from 'jwt-decode'
import cookie from 'js-cookie'

export default function checkAuth({ app, redirect, store }) {
  const token = cookie.get('token')
  const login = '/user/login'
  const storeToken = store.state.auth.token
  

  try {
    const decoded = decoder(token)
    if (decoded.exp < Date.now() / 1000) {
      redirect(login)
    }

    if (!token) {
      redirect(login)
    } 

    if (!storeToken) {
        store.dispatch('auth/setToken', token)
    }
  } catch {
    redirect(login)
  }
}
