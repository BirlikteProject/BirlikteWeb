<template>
  <div v-if="advert.title" class="requests-page-container">
    <!-- <div class="advert-component-wrapper">
      <div class="advert-header">
        <div class="left-side">
          <span class="header-info">{{ advert.category_id.name }}</span>
          <span class="middot" />
          <span class="header-info">{{ advert.city_id.name }}</span>
        </div>
        <div class="right-side">
          <div
            class="advert-actions"
            @mouseenter="dropdown = true"
            @mouseleave="dropdown = false"
          >
            <i class="afet-icons afet-ellipsis"></i>
            <div class="action-dropdown" :class="dropdown ? 'active' : ''">
              <span class="dropdown-item">
                <i class="afet-icons afet-share"></i>
                <span>Paylaş</span>
              </span>
              <span class="dropdown-item">
                <i class="afet-icons afet-report"></i>
                <span>Bildir</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="advert-body">
        <div class="adv-title">
          {{ advert.title }}
        </div>
        <div class="user-profile">
          <div class="user-avatar">
            <img
              :src="advert.user_id.image_url ? advert.user_id.image_url : require('~/assets/img/profile.png')"
              alt="user-avatar">
          </div>
          <div class="user-info">
            <div class="user-name">
              <span>{{ advert.user_id.fullName }}</span>
            </div>
            <div class="user-profile-name">
              <span
                >@{{
                  advert.user_id.username
                    ? advert.user_id.username
                    : advert.user_id.email.split('@')[0]
                }}</span
              >
            </div>
          </div>
        </div>
        <div class="adv-image">
          <img
            :src="require(`~/assets/img/${advert.category_id._id}.png`)"
            alt="advert-image"
          />
        </div>
        <div class="adv-description">
          {{ advert.description }}
        </div>
      </div>
    </div> -->
    <Advert :advert="advert"/>
    <div class="contact-button-wrapper">
      <button class="primary-button contact-button">İletişime Geç</button>
    </div>
  </div>
</template>

<script>
import cities from '~/data/location.json'
import Advert from '~/components/Shared/Advert.vue'
export default {
  name: 'AdvertPage',
  components: {
    Advert
  },
  layout: 'default',
  data() {
    return {
      dropdown: false,
      citiesList: {},
      highlighted: false,
      cities,
    }
  },
  computed: {
    advertId() {
      return this.$route.params.id
    },
    advert() {
      return this.$store.state.advert.selectedAdvert
    }
  },
  async mounted() {
    await this.$store.dispatch('advert/getAdvertById', this.advertId)
  },
  methods: {
    contact() {
      this.$store
        .dispatch('conversations/createConversation', {
          advert_id: this.advertId,
          receiver_id: this.advert.user_id._id,
        })
        .then(() => {
          this.$router.push({
            name: 'mesajlar',
          })
        })
    },
  },
}
</script>

<style lang="scss">
.contact-button-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem 0;
}
.contact-button {
  padding: 0.5rem 1rem !important;
  font-size: 1.5rem;
  border-radius: 10px;
  font-size: 1rem;
}
.requests-page-container {
  .request-page-content {
    .page-title {
      font-size: 1.5rem;
      font-weight: 600;
      padding: 1rem;
      color: #828282;
      @include media(sm, xs) {
        font-size: 1rem;
      }
    }
  }
}

/* .advert-component-wrapper {
  width: 100%;
  height: auto;
  display: flex;
  background-color: #fff;
  flex-direction: column;

  border-bottom: 1px solid #dedede;
  border-top: 1px solid #dedede;
  padding: 1rem;

  .advert-header {
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
      .advert-actions {
        height: 1.5rem;
        width: 1.5rem;
        border-radius: 50%;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: 0.2s ease;
        position: relative;

        &:hover {
          background-color: $primary-color;

          i {
            color: #fff;
          }
        }

        i {
          color: #ccc;
        }

        .action-dropdown {
          position: absolute;
          top: 1.5rem;
          right: 0;
          width: 10rem;
          height: auto;
          background-color: #fff;
          border-radius: 0.25rem;
          box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          padding: 0.5rem 0;
          z-index: 100;
          transition: 0.2s ease;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-0.5rem);

          &.active {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }

          .dropdown-item {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
            height: 2rem;
            padding: 0 1rem;
            cursor: pointer;
            transition: 0.2s ease;

            &:hover {
              background-color: $primary-color;

              i {
                color: #fff;
              }

              span {
                color: #fff;
              }
            }

            i {
              color: #ccc;
              font-size: 0.825rem;
              margin-right: 0.5rem;
            }

            span {
              color: #ccc;
              font-size: 0.875rem;
              padding-top: 2px;
            }
          }
        }
      }
    }
  }

  .advert-body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: auto;

    .adv-title {
      display: flex;
      color: #4a4a4a;
      font-size: 1.5rem;
      font-weight: 600;
      margin: 1rem 0;
    }

    .user-profile {
      display: flex;
      align-items: center;
      margin-bottom: 2rem;

      .user-avatar {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .user-info {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        margin-left: 1rem;

        .user-name {
          display: flex;
          align-items: center;

          span {
            font-size: 1.125rem;
            font-weight: 500;
            color: #4a4a4a;
          }
        }

        .user-profile-name {
          display: flex;
          align-items: center;

          span {
            font-size: 0.875rem;
            color: #ccc;
            padding-top: 2px;
          }
        }
      }
    }

    .adv-image {
      width: 100%;
      height: 350px;
      border-radius: 10px;
      margin-bottom: 1rem;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .adv-description {
      color: #818ea0;
      text-align: center;
      width: 100% !important;
    }
  }
} */
</style>
