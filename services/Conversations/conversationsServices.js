import APIBaseServices from '../APIBaseServices'

export default class ConversationsServices extends APIBaseServices {
  async getConversations(data) {
    const response = await this.http({
      method: 'GET',
      url: this.url + '/conversation/list/filter',
      params: data,
    })
    return response.data
  }

  async createConversation(data) {
    const response = await this.http({
      method: 'POST',
      url: this.url + '/conversation',
      data,
    })
    return response.data
  }

  async updateConversation(id, data) {
    const response = await this.http({
      method: 'PUT',
      url: this.url + '/conversation/' + id,
      data,
    })
    return response.data
  }

  async deleteConversation(id) {
    const response = await this.http({
      method: 'DELETE',
      url: this.url + '/conversation/' + id,
    })
    return response.data
  }

  async getMessages(id, data) {
    const response = await this.http({
      method: 'GET',
      url: this.url + '/message/' + id,
      params: data,
    })
    return response.data
  }

  async sendMessage(conversationId, data) {
    const response = await this.http({
      method: 'POST',
      url: this.url + '/message/' + conversationId,
      data,
    })
    return response.data
  }
}
