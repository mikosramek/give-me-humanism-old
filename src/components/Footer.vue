<template>
  <footer class="Footer">
    <p class="Footer__copyright">Miko Sramek © 2020</p>
  </footer>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss">
  @import "../assets/scss/shared.scss";
  .Footer {
    width: 100%;
    background-color: $accent;
    min-height: 5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    &__copyright {
      font-size: 1.8rem;
      color: $main;
    }
  }
</style>