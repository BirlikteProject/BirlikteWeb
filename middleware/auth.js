export default function ({ store, redirect }) {
  if (!store.state.user.isAuthenticated) return redirect("/giris-yap")
}
