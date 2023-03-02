import AuthServices from '~/services/User/authServices'
import ProfileServices from '~/services/User/profileServices'
import AdvertServices from '~/services/Advert/advertServices'
import CategoryServices from '~/services/Category/categoryServices'
import ConversationsServices from '~/services/Conversations/conversationsServices'

export default function ({ $axios, app, store }, inject) {
  const api = $axios.create({
    baseURL: `${process.env.API_BASE_URL}`,
  })
  const url = ''

  api.onRequest((config) => {
    config.headers.Authorization = 'Bearer ' + store.getters['user/getToken']
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
  api.conversationsServices = new ConversationsServices(api, url)
}
