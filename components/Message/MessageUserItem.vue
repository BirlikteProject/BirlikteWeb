<template>
  <div
    class="message-user-item-wrapper"
    :class="active ? 'active' : ''"
    @click="
      () => {
        $store.dispatch('conversations/selectConversation', conversation)
      }
    "
  >
    <div class="user-item-info">
      <div class="user-avatar">
        <img :src="user.image_url" alt="" />
      </div>
      <div class="message-preview">
        <div class="user-name">
          <span class="name">{{ user.fullName }}</span>
          <span class="middot"></span>
          <span class="time">{{ conversation.createdAt | dateFormat }}</span>
        </div>
        <div class="message-text">
          {{ conversation.last_message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'MessageUserItem',
  filters: {
    dateFormat: function (date) {
      return moment(date).fromNow()
    },
  },
  props: {
    conversation: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    user() {
      return this.conversation.receiver_id ?? this.conversation.sender_id
    },
  },
}
</script>

<style lang="scss">
.message-user-item-wrapper {
  width: 100%;
  max-height: auto;
  overflow: hidden;
  display: flex;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover,
  &.active {
    background-color: #59cdff1e;
  }

  .user-item-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    .user-avatar {
      min-width: 3rem;
      height: 3rem;
      border-radius: 1.5rem;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .message-preview {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      margin-left: 1rem;
      .user-name {
        font-size: 0.8rem;
        display: flex;
        font-weight: 600;
        color: #828282;
        align-items: center;
        margin-bottom: 0.25rem;
        .name,
        .time {
          padding-top: 2px;
        }
      }
      .message-text {
        font-size: 0.8rem;
        color: #828282;
      }
    }
  }
  .time {
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    color: #828282;
  }
}
</style>
