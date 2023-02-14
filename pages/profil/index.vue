<template>
  <div class="profile-page-container">
    <div class="profile-page">
      <div class="page-title">Profil</div>
      <div class="profile-page-content">
        <div v-if="user" class="profile-info">
          <div class="user-avatar">
            <img :src="user.image_url" alt="user-avatar" />
          </div>
          <div class="user-name">
            <span>{{ user.fullName }}</span>
          </div>
          <div class="profile-name">
            <span>@{{ user.email ? user.email.split('@')[0] : 'johndoe' }}</span>
          </div>
        </div>
        <div class="content-tab-items">
          <div class="tab-item" :class="activeTab == 0 ? 'active' : ''" @click="activeTab = 0">
            {{user.type == types.SUPPORTER ? 'Destek' : 'Talep'}} İçerikleri
          </div>
          <div class="tab-item" :class="activeTab == 1 ? 'active' : ''" @click="activeTab = 1">
            Hakkında
          </div>
        </div>
        <div class="tab-contents">
          <div v-if="activeTab == 0" class="content">
            <div v-if="user.type === types.DEMANDER">
              <RequestItem v-for="request in adverts" :key="request._id" :advert="request" />
            </div>
            <div v-if="user.type === types.SUPPORTER">
              <Advert v-for="advert in adverts" :key="advert._id" :advert="advert" />
            </div>
          </div>
          <div v-if="activeTab == 1" class="content about">
            <textarea v-model="user.description">
            </textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RequestItem from '~/components/Request/RequestItem.vue'
import Advert from '~/components/Shared/Advert.vue'
import types from '~/data/types.json'

export default {
  name: 'ProfilePage',
  components: { RequestItem, Advert },
  layout: 'default',
  middleware: ['auth'],
  data() {
    return {
      activeTab: 0,
      types
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user
    },
    adverts() {
      return this.$store.state.user.advertList
    },
  },
  async mounted() {
    await this.$store.dispatch('user/fetchAdverts')
  }
}
</script>

<style lang="scss">
.profile-page-container {
  .profile-page {
    .page-title {
      font-size: 1.5rem;
      font-weight: 600;
      padding: 1rem;
      color: #828282;
    }

    .profile-page-content {
      width: 100%;
      display: flex;
      flex-direction: column;

      .profile-info {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-top: 1px solid #dedede;
        padding: 1rem;

        .user-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 1rem;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .user-name {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;

          span {
            color: #4a4a4a;
          }
        }

        .profile-name {
          font-size: 1rem;
          font-weight: 400;

          span {
            color: #828282;
          }
        }
      }

      .content-tab-items {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        border-top: 1px solid #dedede;
        border-bottom: 1px solid #dedede;
        height: 3rem;

        .tab-item {
          font-size: 1rem;
          font-weight: 400;
          background-color: #f5f5f5;
          color: #828282;
          width: 50%;
          cursor: pointer;
          text-align: center;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;

          &.active {
            color: #fff;
            background-color: $primary-color;
          }
        }
      }

      .tab-contents {
        .content {
          &.about {
            padding: 1rem;
          }

          textarea {
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            resize: none;
            padding: 1rem;
            font-size: 1rem;
            font-weight: 400;
            color: #4a4a4a;
            font-family: 'Campton';
            background-color: #f2f5f9;
            min-height: 300px;
            border-radius: 10px;
          }
        }
      }
    }
  }
}
</style>
