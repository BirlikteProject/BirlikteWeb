<template>
  <div class="messages-page-container">
    <div class="messages-page-content">
      <div class="page-title">Mesajlar</div>
      <div class="messages-section section">
        <div class="message-categories">
          <div
            class="m-category-item"
            :class="activeCategory == 0 ? 'active' : ''"
            @click="activeCategory = 0"
          >
            İstekler
          </div>
          <div
            class="m-category-item"
            :class="activeCategory == 1 ? 'active' : ''"
            @click="activeCategory = 1"
          >
            Sonuçlananlar
          </div>
        </div>
        <div class="messages">
          <MessageUserItem v-for="i in 5" :key="i" />
        </div>
      </div>
      <div ref="contactSection" class="contact-section section">
        <AdvertInMessage />
        <MessageItem v-for="i in 10" :key="i" :is-mine="i%2 == 0 ? true : false"/>
        <div class="message-box">
          <textarea
            ref="messageBox"
            class="message-input"
            placeholder="Mesajınızı buraya yazınız..."
            @keydown="autosize"
          ></textarea>
          <div class="message-send-button">
            <i class="afet-icons afet-send"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MessageItem from '~/components/Message/MessageItem.vue'
import MessageUserItem from '~/components/Message/MessageUserItem.vue'
import AdvertInMessage from '~/components/Shared/AdvertInMessage.vue'
export default {
  name: 'MessagesPage',
  components: { MessageUserItem, AdvertInMessage, MessageItem },
  middleware: ['auth'],
  data() {
    return {
      activeCategory: 0,
    }
  },
  mounted() {
    this.scrollBottom()
  },
  methods: {
    autosize() {
      const el = this.$refs.messageBox
      setTimeout(function () {
        el.style.cssText = 'height:auto; padding:5px'
        el.style.cssText = 'height:' + el.scrollHeight + 'px'
      }, 0)
    },
    scrollBottom() {
      const el = document.querySelector('.contact-section')
      el.scrollTop = el.scrollHeight
    },
  },
}
</script>

<style lang="scss">
.messages-page-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  max-height: calc(100vh - 10rem);

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
      @include media(sm, xs) {
        font-size: 1rem;
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
      overflow-y: auto;
      padding: 1rem;
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
    }
  }
}
</style>
