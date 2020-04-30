<template>
  <main class="Home">
    <Hero />
    <div class="Home__body">
      <About />
      <LatestArticles />
    </div>
  </main>
</template>

<script>
  import Hero from '../components/Hero';
  import About from '../components/About';
  import LatestArticles from '../components/LatestArticles';

  export default {
    name: 'Home',
    components : {
      Hero,
      About,
      LatestArticles
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/shared.scss';
  .Home {
    min-height: 80vh;
    &__body {
      display: flex;
    }
  }
</style>