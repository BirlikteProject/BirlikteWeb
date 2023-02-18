<template>
  <div class="requests-page-container">
    <div class="request-page-content">
      <div class="page-title">Talepler</div>
      <div v-if="isLoading" class="spinner">
        <spinner />
      </div>
      <div class="request-list">
        <request-item v-for="advert in demands" :key="advert._id" :advert="advert" />
      </div>
    </div>
  </div>
</template>

<script>
import RequestItem from '~/components/Request/RequestItem.vue'
import Spinner from '~/components/Shared/Spinner.vue'
export default {
  name: 'RequestsPage',
  components: { RequestItem, Spinner },
  layout: 'default',
  computed: {
    demands() {
      return this.$store.state.advert.demandList
    },
    isLoading() {
      return this.$store.state.advert.loading
    },
  },
  mounted() {
    this.$store.dispatch('advert/fetchDemands')
  }
}
</script>

<style lang="scss">
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

  .spinner {
    margin-top: 1rem !important;
  }
}
</style>
