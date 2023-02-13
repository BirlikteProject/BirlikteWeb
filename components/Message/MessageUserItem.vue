<template>
  <div class="message-user-item-wrapper">
    <div class="user-item-info">
      <div class="user-avatar">
        <img src="https://picsum.photos/200/300" alt="" />
      </div>
      <div class="message-preview">
        <div class="user-name">
          <span class="name">John Doe</span>
          <span class="middot"></span>
          <span class="time">1 saat önce</span>
        </div>
        <div class="message-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quod.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageUserItem',
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
  &:hover {
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
        .name, .time {
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