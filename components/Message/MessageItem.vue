<template>
  <div class="message-item">
    <div class="message-item-text">
        Merhaba ilanınızla ilgileniyorum. İletişime geçebilir misiniz?
    </div>
    <div class="time">
        11:00
    </div>
  </div>
</template>

<script>
export default {
    name: 'MessageItem',
}
</script>

<style lang="scss">
.message-item {
    width: 80%;
    display: flex;
    flex-direction: column;
    padding:.5rem;
    background-color: rgb(251, 248, 203);
    border-radius: 5px;
    margin-top: .5rem;
    .message-item-text {
        font-size: 0.825rem;
        font-weight: 500;
        color: #828282;
    }
    .time {
        font-size: 0.70rem;
        color: #828282;
        font-weight: 600;
        width: 100%;
        text-align: right;
    }
}

</style>