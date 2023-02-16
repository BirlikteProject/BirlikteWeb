export default function ({ store, redirect, route }) {
  if (store.state.user.isAuthenticated) return redirect("/")
}
