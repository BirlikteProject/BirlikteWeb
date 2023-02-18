<template>
  <div class="messages-page-container">
    <div class="messages-page-content">
      <div class="page-title">
        <i v-if="activeCategory === 0" class="afet-icons afet-caret-up" @click="setConversation"></i>
        Mesajlar
      </div>
      <div class="messages-section section" :class="selectedConversation ? 'mobile-disable' : 'mobile-active'">
        <div class="message-categories">
          <div class="m-category-item" :class="activeCategory === 0 ? 'active' : ''" @click="toggleCategory(0)">
            İstekler
          </div>
          <div class="m-category-item" :class="activeCategory === 1 ? 'active' : ''" @click="toggleCategory(1)">
            Sonuçlananlar
          </div>
        </div>
        <div class="messages">
          <spinner v-if="isLoading" />
          <div v-if="!isLoading && !conversations.length" class="no-content-message">
            Şuanda hiç kimse ile mesajlaşmıyorsunuz.
          </div>
          <MessageUserItem v-for="conversation in conversations" :key="conversation.id" :conversation="conversation"
            :class="{
              'finished': conversation.ended_conversation,
              'accepted': conversation.ended_conversation && conversation.deal,
              'rejected': conversation.ended_conversation && !conversation.deal
            }" :active="selectedConversation?._id == conversation._id ? true : false" @focusBottom="scrollBottom" />
        </div>
      </div>
      <div ref="contactSection" class="contact-section section"
        :class="selectedConversation ? 'mobile-active' : 'mobile-disable'">
        <div v-if="selectedConversation" class="selected-conversation">
          <AdvertInMessage :advert="selectedConversation.advert_id" />
          <MessageItem v-for="_message in messages" :key="_message._id" :is-mine="
            (_message.sender_id?._id ?? _message.sender_id) == userId
              ? true
              : false
          " :message="_message" />
          <div class="message-box">
            <form @submit="sendMessage()">

            </form>
            <textarea ref="messageBox" class="message-input" placeholder="Mesajınızı buraya yazınız..." :value="message"
              @keypress="submitter" @input="(event) => (message = event.target.value)" @keydown="autosize"></textarea>
            <div class="message-send-button" @click="()=>{}">
              <i class="afet-icons afet-send"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client'
import MessageItem from '~/components/Message/MessageItem.vue'
import MessageUserItem from '~/components/Message/MessageUserItem.vue'
import AdvertInMessage from '~/components/Shared/AdvertInMessage.vue'
import Spinner from '~/components/Shared/Spinner.vue'

const socket = io(process.env.SOCKET_URL, {
  path: '',
  transports: ['websocket'],
  autoConnect: false,
  secure: true,
})

export default {
  name: 'MessagesPage',
  components: { MessageUserItem, AdvertInMessage, MessageItem, Spinner },
  middleware: ['auth'],

  data() {
    return {
      activeCategory: 0,
      message: '',
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.conversations.loading
    },
    conversations() {
      return this.$store.state.conversations.conversationList
    },
    selectedConversation() {
      return this.$store.state.conversations.selectedConversation
    },
    messages() {
      return this.$store.state.conversations.messagesList
    },
    userId() {
      return this.$store.state.user.user._id
    },
  },
  watch: {
    selectedConversation(curr, old) {
      this.scrollBottom()
    },
    messages(curr, old) {
      this.scrollBottom()
    }
  },
  mounted() {
    this.refresh()
    socket.once('connect', () => {
      socket.emit('addUser', {})
    })

    socket.on('getMessage', (data) => {
      if (data.conversationId === this.selectedConversation._id) {
        this.$store.commit('conversations/APPEND_MESSAGE', {
          ...data,
          conversation_id: data.conversationId,
        })
      }
    })

    socket.auth = {
      token: this.$store.state.user.token,
    }
    socket.connect()
  },
  beforeDestroy() {
    socket.off('getMessage')
    socket.disconnect()
  },

  methods: {
    submitter(e) {
      if(e.key === 'Enter'){
        this.sendMessage()
      }
    },
    autosize() {
      const el = this.$refs.messageBox
      setTimeout(function () {
        el.style.cssText = 'height:auto; padding:5px'
        el.style.cssText = 'height:' + el.scrollHeight + 'px'
      }, 0)
    },
    setConversation() {
      this.$store.dispatch('conversations/selectConversation', null)
    },
    toggleCategory(category) {
      this.activeCategory = category
      this.$store.dispatch('conversations/selectConversation', null)
      this.refresh()
    },
    scrollBottom() {
      const el = this.$refs.contactSection
      if (this.selectedConversation && el) {
        el.scroll({ scrollTop: el.scrollHeight, behavior: 'smooth' })
      }
    },
    refresh() {
      this.$store.dispatch('conversations/fetchConversations', {
        page: 1,
        limit: 20,
        deal: 0,
      })
    },
    sendMessage() {
      if (this.message.length > 0) {
        const msg = this.message
        this.$store.dispatch('conversations/sendMessage', msg).then(() => {
          const receiverId = this.selectedConversation.receiver_id
            ? this.selectedConversation.receiver_id._id
            : this.selectedConversation.sender_id._id
          socket.emit('sendMessage', {
            receiverId,
            conversationId: this.selectedConversation._id,
            text: msg,
          })
        })
        this.message = ''
      }
    },
    finishConversation(isAccepted) {
      this.$store.displatch('conversations/finishConversation', {
        isAccepted
      })
    }
  },
}
</script>

<style lang="scss">
.messages-page-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  max-height: calc(100vh - 10rem);

  .finished {
    display: block;
  }

  .accepted {
    background-color: rgb(160, 255, 160);
  }

  .rejected {
    background-color: rgb(255, 183, 183);
  }

  .messages-page-content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .page-title {
      width: 100%;
      font-size: 1.5rem;
      padding: 1rem;
      font-weight: 600;
      color: #828282;
      border-bottom: 1px solid #dedede;

      i {
        display: none;
      }

      @include media(sm, xs) {
        font-size: 1rem;
        display: flex;

        i {
          display: flex;
          margin-right: 0.5rem;
          cursor: pointer;
          transform: rotate(-90deg);
        }
      }
    }

    .messages-section {
      .message-user-item-wrapper {
        border-bottom: 1px solid #dedede;

        &:first-child {
          border-top: 1px solid #dedede;
        }
      }

      .message-categories {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        padding: 1rem;

        @include media(xs, sm) {
          width: 100%;
          flex-wrap: nowrap;
        }

        .m-category-item {
          height: 2.5rem;
          padding: 0 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          cursor: pointer;
          background-color: #f2f5f9;
          color: #828282;

          &:first-child {
            margin-right: 0.5rem;
          }

          &.active {
            background-color: $primary-color;
            color: #fff;
          }
        }
      }
    }

    .contact-section {
      overflow-y: scroll;
      padding: 1rem;

      .selected-conversation {
        width: 100%;
        min-height: calc(100vh);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }

      .message-box {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        margin-top: 1rem;
        justify-content: center;

        .message-input {
          width: 100%;
          min-height: 2.5rem;
          height: auto;
          border: 1px solid #dedede;
          border-radius: 10px;
          font-family: 'Campton';
          font-weight: 400;
          color: #4a4a4a;
          letter-spacing: 0.5px;
          padding: 5px;
          outline: none;
          resize: none;
        }

        .message-send-button {
          width: 2.5rem;
          height: 2.5rem;
          border: 1px solid #dedede;
          border-radius: 10px;
          padding: 1rem;
          outline: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background-color: $primary-color;
          color: #fff;
          font-weight: 600;
          margin-left: 1rem;
        }
      }
    }

    .section {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      border-right: 1px solid #dedede;

      @include media(xs, sm) {
        &.mobile-active {
          width: 100% !important;
          border-right: none;
        }

        &.mobile-disable {
          display: none !important;
        }
      }
    }
  }

  .messages {
    width: 100%;
    height: 100%;
  }

  .no-content-message {
    margin-left: 1rem;
    font-weight: 450;
    font-size: 1.1rem;
  }
}
</style>
