const state = () => ({
  conversationsList: [],
  messagesList: [],
  selectedConversation: null,
})

const mutations = {
  SET_MESSAGES_LIST(state, payload) {
    state.messagesList = payload
  },
  APPEND_MESSAGE(state, payload) {
    state.messagesList = [...state.messagesList, payload]
  },
  SET_CONVERSATIONS_LIST(state, payload) {
    state.conversationsList = payload
  },
  SELECT_CONVERSATION(state, payload) {
    state.selectedConversation = payload
  },
}

const actions = {
  async fetchConversations(context, payload) {
    const convResponse = await this.$api.conversationsServices.getConversations(
      payload
    )
    if (convResponse.status) {
      context.commit('SET_CONVERSATIONS_LIST', convResponse.data)
    }
  },
  async createConversation(context, payload) {
    const convResponse =
      await this.$api.conversationsServices.createConversation(payload)
    if (convResponse.status) {
      context.dispatch('fetchConversations')
    }
  },
  async fetchMessages(context, payload) {
    const messagesRes = await this.$api.conversationsServices.getMessages(
      payload
    )
    if (messagesRes.status) {
      context.commit('SET_MESSAGES_LIST', messagesRes.data)
    }
  },
  selectConversation(context, payload) {
    context.commit(
      'SELECT_CONVERSATION',
      payload // context.state.conversationsList.first((c) => c._id === payload)
    )

    if (payload) {
      context.dispatch('fetchMessages', payload._id)
    }
    // const convResponse =
    //   await this.$api.conversationsServices.createConversation(payload)
    // if (convResponse.status) {

    // }
  },
  async sendMessage(context, payload) {
    const message = {
      message: payload,
    }
    const response = await this.$api.conversationsServices.sendMessage(
      context.state.selectedConversation._id,
      message
    )
    if (response.status) {
      context.commit('APPEND_MESSAGE', response.data)
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
