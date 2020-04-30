<template>
  <div class="About">
    <h3 class="About__title" >
      {{ $prismic.richTextAsPlain(this.getInfo.section_title) }}
    </h3>
    <div class="About__profile">
      <h3 class="About__name" >
        {{ $prismic.richTextAsPlain(this.getInfo.name) }}
      </h3>
      <prismic-image :field="getInfo.profile_picture" class="About__picture" />
    </div>
    <prismic-rich-text :field="getInfo.bio" class="About__bio" />
  </div>
</template>

<script>
  export default {
    name : 'About',
    data() {
      return {
        about : {
          section_title : null,
          name : null,
          profile_picture : null,
          bio : null
        }
      }
    },
    computed: {
      getInfo() {
        return {
          section_title : this.about.section_title,
          name : this.about.name,
          profile_picture : this.about.profile_picture,
          bio : this.about.bio
        }
      }
    },
    methods : {
      getAbout() {
        this.$prismic.client.query(
          this.$prismic.Predicates.at('document.type', 'author')
        ).then(this.handleAbout);
      },
      handleAbout(data) {
        this.about = data.results[0].data;
      }
    },
    created() {
      this.getAbout();
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/shared.scss';
  .About {
    width: calc(100%/3);
    background-color: $accent;
    padding: 25px;
    position: relative;
    left: -15px;
    z-index: 2;
    margin-bottom: 20px;
    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
      z-index: -1;
      left: -5px;
      background-color: $darkened-accent;
    }
    &::before {
      top: 0px;
      width: 5px;
      height: calc(100% + 5px);
    }
    &::after {
      bottom: -5px;
      width: calc(100% + 5px);
      height: 5px;
    }
    &__title {
      margin: 5px 0;
      font-size: 2.4rem;
      color: $main;
      padding-bottom: 5px;
    }
    &__profile {
      position: relative;
      left: -50px;
    }
    &__name {
      position: absolute;
      font-size: 1.8rem;
      background-color: $secondary;
      color: $main;
      padding: 7px 15px 5px;
      bottom: 15px;
      right: -15%;
    }
    &__bio {
      @include remove-margin();
      color: $main;
      padding: 10px 0;
      text-align: justify;
      line-height: 20px;
      p {
        margin: 5px 0;
        font-size: 1.6rem;
      }
    }
  }
</style>