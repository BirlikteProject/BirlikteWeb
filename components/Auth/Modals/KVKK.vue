<template>
  <div class="kvkk-modal-wrapper">
    <div class="kvkk-modal">
      <div class="modal-header">
        <span>Aydınlatma Metni</span>
        <span class="close-icon" @click="setDisplay()">
          <i class="afet-icons afet-close"></i>
        </span>
      </div>
      <div class="modal-body">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
        voluptate neque impedit voluptatum aperiam. Deleniti modi magnam
        molestiae? Explicabo dignissimos facere nesciunt minus at vero dolorum
        provident laboriosam dolor quae. Saepe minus consequuntur cumque a
        possimus deleniti officiis in laborum voluptatum placeat eius esse cum
        rem temporibus eligendi reprehenderit dolore quidem perferendis,
        consequatur non aliquid ipsa ipsum? Iure, est sequi? Id ratione cum
        tenetur, sint cupiditate magni quis libero laboriosam maiores architecto
        eveniet maxime, facere neque commodi pariatur excepturi rerum,
        voluptatum voluptate fugiat voluptates labore consequuntur. Hic sequi
        repudiandae dicta. Sint debitis eius, nemo iure accusantium dicta,
        accusamus consequuntur rerum quasi tenetur ullam ipsam alias. Ratione
        id, illo doloribus ex aliquid neque quos esse omnis error explicabo
        laudantium minus accusamus? Iusto debitis facere neque assumenda omnis
        labore molestiae quidem hic tenetur, porro iure aspernatur repudiandae
        quasi? Inventore quas eos dignissimos nihil, corporis deserunt quam. Cum
        est dolores tenetur animi dolorem. Reiciendis praesentium ipsa
        consectetur quaerat, magni aut assumenda fuga nam, nihil dignissimos
        aliquid minus cumque expedita minima perferendis suscipit illum veniam
        adipisci a voluptatibus perspiciatis accusamus officia obcaecati nulla!
        Aut. Quae, laborum velit? Incidunt exercitationem sunt molestias culpa,
        voluptates, voluptate quis reprehenderit sapiente totam ipsum molestiae
        error magnam eveniet aspernatur sequi illo dolores. Culpa, beatae
        dolore. Voluptatem id sequi et. Sapiente officia quasi porro maiores
        facere sit dolorem, explicabo ducimus magnam eum omnis atque consequatur
        illo id quas voluptatem corrupti error amet? Optio quidem libero
        consequatur! Eius voluptas quis recusandae? Quidem dolorum pariatur
        cumque aspernatur enim tempora nobis, asperiores necessitatibus
        consequuntur fuga! Dolorum maxime ab aliquam deserunt aut modi eveniet,
        quae illo officiis molestiae aliquid mollitia vero labore earum
        voluptate. Mollitia quidem dolorem reprehenderit alias delectus libero
        aperiam corrupti laudantium, tempora voluptatibus voluptatum laborum
        repellat voluptatem sapiente magni sed. Inventore, suscipit quis neque
        nostrum necessitatibus hic obcaecati quae quaerat odio?
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: 'KvkkModal',

  methods: {
    setDisplay() {
      this.$store.dispatch('modal/setKvkkModal', false)
    },
  },
}
</script>
  
  <style lang="scss">
.kvkk-modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;

  .kvkk-modal {
    width: 40rem;
    height: 40rem;
    background-color: white;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    overflow-y: auto;
    .modal-header {
      width: 100%;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      font-weight: 500;
      color: $primary-color;
      position: relative;
      .close-icon {
        width: 2rem;
        height: 2rem;
        position: absolute;
        right: -1.5rem;
        cursor: pointer;
        top: -1.5rem;
        background-color: #fff;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      }
    }
    .modal-body {
      height: calc(100% - 3rem);
      width: 100%;
      padding: 1rem 0;
      .input-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        label {
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: $primary-text-color;
        }
        input {
          border: none;
          outline: none;
          border: 1px solid $border-color;
          padding: 0.5rem;
          font-size: 0.8rem;
          height: 2.5rem;
          border-radius: 5px;
          &:focus {
            border: 1px solid $primary-color;
          }
        }
      }
    }
    .modal-footer {
      height: 3rem;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      width: 100%;
      button {
        height: 2.5rem;
        width: 100%;
      }
      button:nth-child(1) {
        margin-right: 1rem;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>