export default function ({ store, redirect, route }) {
  if (store.getters['user/isAuthenticated']) return redirect("/")
}
