import APIBaseServices from '../APIBaseServices'
export default class AuthServices extends APIBaseServices {
  async login(data) {
    const response = await this.http({
      method: 'POST',
      url: this.url + '/authanticate/login',
      data,
    })
    return response.data
  }

  async register(data) {
    const response = await this.http({
      method: 'POST',
      url: this.url + '/authenticate/register',
      data,
    })
    return response.data
  }

}
