<template>
  <div id="App">
    <Header />
    <div class="global__wrapper">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Footer,
    Header
  }
}
</script>

<style lang="scss">
  @import "./assets/css/resetr.css";
  @import "./assets/css/prismic-edit-button.css";
  @import "./assets/scss/global.scss";
  .global {
    &__wrapper {
      max-width: 1080px;
      width: 90%;
      margin: 0 auto;
    }
    &__read-more {
      font-size: 1.8rem;
      cursor: pointer;
      background-color: $call-to-action;
      padding: 25px;
      color: $main;
      border: 1px solid $call-to-action;
      &:hover {
        color: $call-to-action;
        background-color: $main;
      }
    }
  }
</style>
