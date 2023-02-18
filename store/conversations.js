const state = () => ({
  conversationList: [],
  messagesList: [],
  selectedConversation: null,
  loading: false,
})

const mutations = {
  SET_MESSAGES_LIST(state, payload) {
    state.messagesList = payload
  },
  SET_LOADING(state, payload) {
    state.loading = payload
  },
  APPEND_MESSAGE(state, payload) {
    state.messagesList = [...state.messagesList, payload]
    state.conversationList = state.conversationList.map((c) => {
      if (c._id === payload.conversation_id) {
        c.last_message = payload.message
      }
      return c
    })
  },
  SET_CONVERSATIONS_LIST(state, payload) {
    state.conversationList = payload
  },
  SELECT_CONVERSATION(state, payload) {
    state.selectedConversation = payload
  },
}

const actions = {
  async fetchConversations(context, payload) {
    try {
      context.commit('SET_LOADING', true)
      const convResponse =
        await this.$api.conversationsServices.getConversations(payload)
      if (convResponse.status) {
        context.commit('SET_CONVERSATIONS_LIST', convResponse.data)
      }
    } catch (error) {
    } finally {
      context.commit('SET_LOADING', false)
    }
  },

  async createConversation(context, payload) {
    try {
      context.commit('SET_LOADING', false)
      const convResponse =
        await this.$api.conversationsServices.createConversation(payload)
      if (convResponse.status) {
        context.dispatch('fetchConversations')
      }
    } catch (error) {
    } finally {
      context.commit('SET_LOADING', true)
    }
  },
  async fetchMessages(context, payload) {
    try {
      const messagesRes = await this.$api.conversationsServices.getMessages(
        payload
      )
      if (messagesRes.status) {
        context.commit('SET_MESSAGES_LIST', messagesRes.data)
      }
    } catch (error) {
      context.commit('SET_ERROR', 'Mesajlarınızı görüntüleyemiyoruz. Lütfen daha sonra tekrar deneyiniz.')
    }
  },
  async selectConversation(context, payload) {
    context.commit(
      'SELECT_CONVERSATION',
      payload // context.state.conversationList.first((c) => c._id === payload)
    )

    if (payload) {
      context.commit('SET_LOADING', true)
      await context.dispatch('fetchMessages', payload._id)
      context.commit('SET_LOADING', false)
    }
    // const convResponse =
    //   await this.$api.conversationsServices.createConversation(payload)
    // if (convResponse.status) {

    // }
  },

  async finishConversation(context, payload) {
    try {
      context.commit('SET_LOADING', true)
      const response = await this.$api.conversationsServices.updateConversation(
        context.state.selectedConversation._id,
        payload
      )
      if (response.status) {
        context.commit('APPEND_MESSAGE', response.data)
      }
    } catch (error) {
      context.commit('SET_ERROR', 'Bir şeyler ters gitti. Lütfen daha sonra tekrar deneyiniz.')
    } finally {
      context.commit('SET_LOADING', false)
    }
  },

  async sendMessage(context, payload) {
    try {
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
    } catch (error) {
      context.commit('SET_ERROR', 'Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyiniz.')
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
