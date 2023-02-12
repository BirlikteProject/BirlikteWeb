<template>
  <div class="request-item-wrapper">
    <div class="request-header">
      <div class="left-side">
        <span class="header-info">Eğitim</span>
        <span class="middot" />
        <span class="header-info">İstanbul</span>
      </div>
      <div class="right-side">
        <div class="request-actions">
          <i class="afet-icons afet-plus tooltip">
            <tool-tip text="Destek ol" type="bottom"/>
          </i>
        </div>
      </div>
    </div>
    <div class="request-body">
      <div class="request-title">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
      <div class="request-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
        nunc vel ultricies lacinia, nisl nisl aliquam nunc, vitae ultricies nisl
        nunc vel nisl. Sed euismod, nunc vel ultricies lacinia, nisl nisl
        aliquam nunc, vitae ultricies nisl nunc vel nisl.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RequestItem',
}
</script>

<style lang="scss">
.request-item-wrapper {
  padding: 1rem;
  margin-bottom: 1rem;
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