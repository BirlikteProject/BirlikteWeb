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
      <div class="contact-section section">
        <AdvertInMessage />
        <MessageItem v-for="i in 100" :key="i" />
        <div class="message-box"  ref="messageBox">
          <textarea
            class="message-input"
            placeholder="Mesajınızı buraya yazınız..."
          ></textarea>
          <div class="message-send-button">Gönder</div>
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
  data() {
    return {
      activeCategory: 0,
    }
  },
  created() {

  },
  methods: {

  },
}
</script>

<style lang="scss">
.messages-page-container {
  width: 100%;
  display: flex;
  flex-direction: row;

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
      max-height: calc(100vh - 15rem);
      overflow-y: auto;
      .message-box {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        .message-input {
          width: 100%;
          min-height: 2.5rem;
          height: auto;
          border: 1px solid #dedede;
          border-radius: 10px;
          font-family: 'Campton';
          padding: 5px;
          outline: none;
          resize: none;
        }
        .message-send-button {
          width: 100px;
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
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      border-right: 1px solid #dedede;
    }
  }
}
</style>