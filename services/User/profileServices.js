import APIBaseServices from '../APIBaseServices'
export default class ProfileServices extends APIBaseServices {
  async getProfileById(id) {
    const response = await this.http({
      method: 'GET',
      url: this.url + `/profile/${id}`,
    })
    return response.data
  }

  async getOwnProfile() {
    try {
      const response = await this.http({
        method: 'GET',
        url: this.url + '/profile',
      })
      return response.data
    } catch (error) {

    }
  }

  async updateProfileById(id) {
    const response = await this.http({
      method: 'PUT',
      url: this.url + `/profile/${id}`,
    })
    return response.data
  }

}
