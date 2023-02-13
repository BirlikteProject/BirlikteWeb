import jwtDecode from "jwt-decode";

export default function ({ app, redirect, store }) {
  try {
    const token = app.$cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
        app.$cookies.set("token", '', { exp: '-9999' }) // remove token from cookies
      } else if (!store.getters["user/isAuthenticated"]) {
        store.dispatch("user/setToken", token); // set store token state
      }
    } else {
      // redirect('')
    }
  } catch (error) {
    // options
  }
}
