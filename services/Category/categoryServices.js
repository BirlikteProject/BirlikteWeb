import APIBaseServices from '../APIBaseServices'

export default class CategoryServices extends APIBaseServices {
  async getCategories(data, page, limit) {
    const response = await this.http({
      method: 'GET',
      url: this.url + '/category'
    })
    return response.data
  }

  async createCategory(data) {
    const response = await this.http({
      method: 'POST',
      url: this.url + '/category',
      data
    })
    return response.data
  }
}
