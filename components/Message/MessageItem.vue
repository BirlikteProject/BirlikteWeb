<template>
  <div class="message-item-wrapper" :class="isMine ? 'end' : 'start'">
    <div class="message-item">
      <div class="message-item-text">
        Merhaba ilanınızla ilgileniyorum. İletişime geçebilir misiniz?
      </div>
      <div class="time">11:00</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageItem',
  props: {
    isMine: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.message-item-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  &.end {
    justify-content: flex-end;
    .message-item {
        background-color: rgb(251, 248, 203);
    }
  }
  &.start {
    justify-content: flex-start;
    .message-item {
        background-color: #59cdff1e;
    }
  }
}
.message-item {
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border-radius: 5px;
  margin-top: 0.5rem;
  .message-item-text {
    font-size: 0.825rem;
    font-weight: 500;
    color: #828282;
  }
  .time {
    font-size: 0.7rem;
    color: #828282;
    font-weight: 600;
    width: 100%;
    text-align: right;
  }
}
</style>