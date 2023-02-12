<template>
  <div class="requests-page-container">
    <div class="request-page-content">
      <div class="page-title">Talepler</div>
      <div class="request-list">
        <request-item
        />
      </div>
    </div>
  </div>
</template>

<script>
import RequestItem from '~/components/Request/RequestItem.vue'
export default {
  name: 'RequestsPage',
  components: { RequestItem },
  layout: 'default',
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
    }
  }
}
</style>