<template>
  <div class="request-item-wrapper">
    <div class="request-header">
      <div class="left-side">
        <span class="header-info">{{ advert.category_id.name }}</span>
        <span class="middot" />
        <span class="header-info">{{ time }}</span>
      </div>
      <div class="right-side">
        <div v-if="user.type === types.SUPPORTER" class="request-actions" @click="goto('/olustur')">
          <i class="afet-icons afet-plus tooltip">
            <tool-tip text="Destek ol" type="bottom" />
          </i>
        </div>
      </div>
    </div>
    <div class="request-body">
      <div class="request-title">
        {{ advert.title }}
      </div>
      <div class="request-description">
        {{ advert.description }}
      </div>
    </div>
  </div>
</template>

<script>
import types from '~/data/types.json'

export default {
  name: 'RequestItem',
  props: {
    advert: Object(),
  },
  data() {
    return {
      types
    }
  },
  computed:{
    time(){
      const now = new Date();
      const date = new Date(this.advert.createdAt)

      let time = (now-date)/1000; // saniye bilgisi alınıyor
      let text = " saniye önce"
      if(time >= 60 ){
        time /= 60;// dakika bilgisi alınıyor
        text = " dakika önce"
      }
      if(time >= 60){
        time /= 60;// saat bilgisi alınıyor
        text = " saat önce"
      }
      if(time >= 24) {
        time /= 24;// gün bilgisi alınıyor
        text = " gün önce"
      }
      if(time >= 30){
        time /= 30;// ay bilgisi alınıyor
        text = " ay önce"
      }
      if(time >= 12){
        time /= 12;// yil bilgisi alınıyor
        text = " yıl önce"
      }

      return Math.floor(time)+text
    },
    user() {
      return this.$store.state.user.user
    }
  },
  methods: {
    goto(to) {
      this.$router.push(to)
    }
  }
}
</script>

<style lang="scss">
.request-item-wrapper {
  padding: 1rem;
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
  .request-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left-side {
      display: flex;
      align-items: center;
      .header-info {
        font-size: 0.875rem;
        color: #ccc;
        padding-top: 2px;
      }
    }
    .right-side {
      .request-actions {
        height: 1.5rem;
        width: 1.5rem;
        border-radius: 50%;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;

        i {
          transition: 0.2s ease;
          font-size: 0.875rem;
          color: #ccc;
          &:hover {
            color: $primary-color;
          }
        }
      }
    }
  }
  .request-body {
    margin-top: 1rem;
    .request-title {
      font-size: 1.25rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    .request-description {
      font-size: 0.875rem;
      color: #ccc;
    }
  }
}
</style>
