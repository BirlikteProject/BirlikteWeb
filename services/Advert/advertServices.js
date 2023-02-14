import APIBaseServices from '../APIBaseServices'
export default class AdvertServices extends APIBaseServices {
  async getAdvertPage(page = 1, limit = 10) {
    const response = await this.http({
      method: 'GET',
      url: this.url + `/advert/list/filter?page=${page}&limit=${limit}`,
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

  async getAdvertByCategory(categoryId) {
    const response = await this.http({
      method: 'GET',
      url: this.url + `/advert/category/${categoryId}?page=1&limit=10`,
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

  async searchAdverts(cityId, searchTerm) {
    const response = await this.http({
      method: 'GET',
      url: this.url + `/advert/search?city_id=${cityId}&term=${searchTerm}`,
    })
    return response.data
  }

  async getCities() {
    const response = await this.http({
      method: 'GET',
      url: `http://142.93.106.148:5000/cities`,
    })
    return response.data
  }
}
