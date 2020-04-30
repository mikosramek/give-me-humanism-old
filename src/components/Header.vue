<template>
  <Header class="Header">
    <div class="global__wrapper">
      <div
        v-on:click="() => this.navigateTo('/')"
        class="Header__h1"
      >
        {{ $prismic.richTextAsPlain(siteTitle) }}
      </div>
    </div>
  </Header>
</template>

<script>
  import NavigateMixin from '../mixins/NavigateMixin';
  export default {
    mixins : [ NavigateMixin ],
    data() {
      return {
        siteTitle : null
      }
    },
    watch : {
      siteTitle(siteTitle) {
        document.title = this.$prismic.richTextAsPlain(siteTitle);
      }
    },
    methods : {
      getBlogMetaData() {
        this.$prismic.client.query(
          this.$prismic.Predicates.at('document.type', 'meta-data')
        ).then(this.handleBlogMetaData);
      },
      handleBlogMetaData(data) {
        this.siteTitle = data.results[0].data.site_title;
      }
    },
    created() {
      this.getBlogMetaData();
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/shared.scss';
  .Header {
    width: 100%;
    min-height: 5vh;
    top: 0;
    z-index: 100;
    background-color: $accent;
    display: flex;
    align-items: center;
    &__h1 {
      font-size: 2rem;
      position: relative;
      cursor: pointer;
      text-align: right;
      margin: 0;
      color: $main;
      top: 0;
      padding: 5px 0;
    }
  }
</style>