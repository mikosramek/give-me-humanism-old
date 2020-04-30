<template>
  <article class="Hero">
      <div
        class="Hero__image"
        v-on:click="() => navigateTo(`post/${this.hero.uid}`)"
        :title="`post/${this.hero.uid}`"
      >
        <prismic-image :field="getHero.header_image" />
      </div>
      <div class="Hero__color-block"></div>
      <div class="Hero__text">
        <h2 class="Hero__title">
          {{ $prismic.richTextAsPlain(this.getHero.title) }}
        </h2>
        <div class="Hero__blurb">
          <p>
            {{ this.getBlurb }}
          </p>
        </div>
        <p
          class="global__read-more Hero__read-more"
          v-on:click="() => navigateTo(`post/${this.hero.uid}`)"
          :title="`post/${this.hero.uid}`"
        >
          Read More
        </p>
      </div>
    </article>
</template>

<script>
 import NavigateMixin from '../mixins/NavigateMixin';
  export default {
    name : 'Hero',
    mixins : [ NavigateMixin ],
    data() {
      return {
        hero : {
          data : {
            title : null,
            header_image : null,
            intro_blurb : null
          }
        },
        blurbLimit : 50
      }
    },
    computed: {
      getHero() {
        return {
          title : this.hero.data.title,
          header_image : this.hero.data.header_image,
          blurb : this.hero.data.intro_blurb
        }
      },
      getBlurb() {
        let blurb = this.$prismic.richTextAsPlain(this.getHero.blurb);
        if(blurb){
          blurb = blurb.split(' ').slice(0,this.blurbLimit).join(' ') + '...';
        }
        return blurb;
      }
    },
    methods: {
      getPosts() {
        this.$prismic.client.query(
            [ this.$prismic.Predicates.at('document.type', 'post'),
              this.$prismic.Predicates.at('document.tags', ['hero']) ],
            { orderings : '[my.blog_post.date desc]', pageSize : 1 }
        ).then(this.handlePosts);
      },
      handlePosts(data) {
        if(data != null) {
          this.hero = data.results[0];
        }
      }
    },
    created() {
      this.getPosts();
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/shared.scss';
  .Hero {
    margin: 30px 0;
    margin-bottom: 100px;
    position: relative;
    display: flex;
    justify-content: space-between;
    &__image {
      cursor: pointer;
      width : 85%;
      img {
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
    &__color-block {
      background-color: $darkened-secondary;
      width: calc(15% - 15px);
      margin-left: 15px;
      position: relative;
      top: 15px;
    }
    &__title {
      position: absolute;
      top: 0;
      left: 15px;
      font-size: 2.4rem;
      margin: 0;
      transform: translateY(-50%);
      background-color: $secondary;
      color: $main;
      padding: 7px 15px 5px;
    }
    &__blurb {
      width: calc(40% + 5px);
     
      margin: 0;
      position: absolute;
      z-index: 2;
      bottom: 0;
      right: -15px;
      text-align: justify;
      
      transform: translateY(50%);
      color: $main;
      
      &::before {
        content: '';
        display: block;
        position: absolute;
        z-index: -5;
        right: 0px;
        top: -15px;
        width: 40%;
        height: 15px;
        background-color: $main;
        z-index: -2;
      }
      p {
        padding: 25px 25px;
        font-size: 1.8rem;
        background-color: $accent;
        height: 100%;
        margin: 0;
      }
      @include dark-drop;
    }
  &__read-more {
    position: absolute;
    bottom: 0;
    margin: 0;
    bottom: -12.5px;
    right: 40%;
    transform: translateY(100%);
  }
}
</style>