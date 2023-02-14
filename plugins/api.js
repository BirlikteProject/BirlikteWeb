import AuthServices from '~/services/User/authServices'
import ProfileServices from '~/services/User/profileServices'
import AdvertServices from '~/services/Advert/advertServices'
import CategoryServices from '~/services/Category/categoryServices'

export default function ({ $axios, app, store }, inject) {
  const api = $axios.create({
    baseURL: 'http://142.93.106.148:5000/api/v1',
  })
  const url = ''
  const token = store.state.user?.token

  api.onRequest((config) => {
    config.headers.Authorization = 'Bearer ' + token
  })

  api.onResponse((response) => {
    if (response.status === 200) {
      return response
    }
  })
  inject('api', api)

  api.advertServices = new AdvertServices(api, url)
  api.authServices = new AuthServices(api, url)
  api.profileServices = new ProfileServices(api, url)
  api.categoryServices = new CategoryServices(api, url)
}
