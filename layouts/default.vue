<template>
  <div class="default-layout">
    <KVKK v-if="kvkkModal" />
    <PrivacyPolicy v-if="privacyPolicyModal" />
    <top-bar />
    <scroll-top />
    <div class="content page-feed">
      <div class="side-bar-section">
        <side-bar />

      </div>
      <div class="content-section">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import ScrollTop from '~/components/Default/ScrollTop.vue'
import TopBar from '~/components/Default/TopBar.vue'
import SideBar from '~/components/Default/SideBar.vue'

import KVKK from '~/components/Auth/Modals/KVKK.vue'
import PrivacyPolicy from '~/components/Auth/Modals/PrivacyPolicy.vue'
// import Footer from '~/components/Default/Footer.vue'
export default {
  name: 'DefaultLayout',
  components: {
    TopBar,
    ScrollTop,
    SideBar,
    KVKK,
    PrivacyPolicy,
  },
  computed: {
    token() {
      return this.$store.state.user.token
    },
    kvkkModal() {
      return this.$store.state.modal.kvkkModal
    },
    privacyPolicyModal() {
      return this.$store.state.modal.privacyPolicy
    },
  },
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 1rem;
  height: auto;
}
body {
  font-family: 'Campton', sans-serif;
  font-size: 1em;
  font-weight: 400;
  background-color: #f5f5f5;
}
li {
  list-style-type: none;
}
a {
  text-decoration: none;
}

.content {
  width: 100%;
  max-width: 1000px;
  height: auto;
}
.default-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 5rem;
  @include media(xs, sm) {
    overflow-x: hidden;
    margin-bottom: 4rem;
    padding-top: 3rem;
  }
  .page-feed {
    min-height: calc(100vh - 5rem);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    background-color: #fff;
    border-left: 1px solid #dedede;
    position: relative;
    @include media(xs, sm) {
      flex-direction: column-reverse;
    }

    .side-bar-section {
      width: 250px;
      height: 100%;
      position: relative;
      background-color: #fff;
      @include media(xs, sm) {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 100;
        height: 4rem;
        box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        padding: 0 1rem;
      }
    }
    .content-section {
      width: calc(100% - (250px));
      background-color: #fff;
      border-left: 1px solid #dedede;
      border-right: 1px solid #dedede;

      @include media(xs, sm) {
        width: 100%;
        border-left: none;
        border-right: none;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 4rem);
      }
      .content-wrapper {
        height: 100%;
        background-color: #fff;
        position: relative;
        top: 0;
        left: 0;
        padding: 0 20px;
        overflow-y: scroll;
      }
    }
  }
}
</style>
