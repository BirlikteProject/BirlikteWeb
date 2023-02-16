import APIBaseServices from '../APIBaseServices'
import types from '~/data/types.json'

export default class AdvertServices extends APIBaseServices {
  async getAdverts(opts) {
    const response = await this.http({
      method: 'GET',
      url: this.url + `/advert/list/filter`,
      params: {
        ...opts,
        page: opts.page ? opts.page : 1,
        limit: opts.limit ? opts.limit : 20
      }
    })
    return response.data
  }

  async getAdvertsByUserId(userId) {
    const response = await this.http({
      method: 'GET',
      url: this.url + `/advert/profile/${userId}`,
    })
    return response.data
  }

  async getAdvertById(id) {
    const response = await this.http({
      method: 'GET',
      url: this.url + `/advert/${id}`,
    })
    return response.data
  }

  async getAdvertByCategory(categoryId, type=types.SUPPORTER, page=1, limit=15) {
    const response = await this.http({
      method: 'GET',
      url: this.url + `/advert/category/${categoryId}`,
      params: {
        type,
        page,
        limit
      }
    })
    return response.data
  }

  async createAdvert(data) {
    const response = await this.http({
      method: 'POST',
      url: this.url + '/advert',
      data,
    })
    return response.data
  }

  async updateAdvertById(id, data) {
    const response = await this.http({
      method: 'PUT',
      url: this.url + `/advert/${id}`,
      data,
    })
    return response.data
  }

  async deleteAdvertById(id) {
    const response = await this.http({
      method: 'DELETE',
      url: this.url + `/advert/${id}`,
    })
    return response.data
  }

  async getCities() {
    const response = await this.http({
      method: 'GET',
      url: `${process.env.API_BASE_URL}/cities`,
    })
    return response.data
  }
}
