<template>
  <div class="Articles">
    <article
      v-for="(item, index) in getParsedPosts()"
      :key="index"
      class="Articles__article"
    >
      <div
        class="Articles__image"
      >
        <img
          :src="item.header_image.url"
          :alt="item.header_image.alt"
          v-on:click="() => navigateTo(`post/${item.uid}`)"
          :title="`post/${item.uid}`"
        >
      </div>
      <p
        class="global__read-more Articles__read-more"
        v-on:click="() => navigateTo(`post/${item.uid}`)"
        :title="`post/${item.uid}`"
      >
        Read More
      </p>
      <div class="Articles__color-block"></div>
      <div class="Articles__text">
        <div
          class="Articles__title"
          v-on:click="() => navigateTo(`post/${item.uid}`)"
          :title="`post/${item.uid}`"
        >
          {{ $prismic.richTextAsPlain(item.title) }}
        </div>
        <div
          class="Articles__blurb"
          v-on:click="() => navigateTo(`post/${item.uid}`)"
          :title="`post/${item.uid}`"
        >
          {{ getBlurb(item.blurb) }}
        </div>
      </div>
    </article>
  </div>
</template>

<script>
  import NavigateMixin from '../mixins/NavigateMixin';
  export default {
    name: 'LatestArticles',
    mixins : [ NavigateMixin ],
    data() {
      return {
        posts : null,
        blurbLimit : 50
      }
    },
    methods: {
      getPosts() {
        this.$prismic.client.query(
            [this.$prismic.Predicates.at('document.type', 'post'),
             this.$prismic.Predicates.at('document.tags', ['featured'])],
            { orderings : '[my.blog_post.date desc]' }
        ).then(this.handlePosts);
      },
      handlePosts(data) {
        if(data != null) {
          this.posts = data.results;
        }
      },
      getParsedPosts() {
        if(this.posts === null) return null;
        const parsedPosts = [];
        this.posts.forEach(item => {
          const newPost = {
            uid : item.uid,
            header_image : item.data.header_image['featured_square'],
            title : item.data.title,
            blurb : item.data.intro_blurb
          }
          parsedPosts.push(newPost);
        })
        return parsedPosts;
      },
      getBlurb(blurbToCutoff) {
        let blurb = this.$prismic.richTextAsPlain(blurbToCutoff);
        if(blurb){
          blurb = blurb.split(' ').slice(0,Math.min(this.blurbLimit, blurb.length - 1)).join(' ') + '...';
        }
        return blurb;
      }
    },
    created() {
      this.getPosts();
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/shared.scss';
  .Articles {
    $color-height: 100px;
    width: calc(100% / 3 * 2);
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-bottom: $color-height + 25px;
    &__article{
      width: calc(100% / 2 - 5px);
      position: relative;
      &:nth-of-type(2n) {
        margin-left: 10px;
        top: $color-height + 10px;
        .Articles {
          &__color-block {
            bottom: initial;
            top: -#{$color-height + 10px};
          }
          &__text {
            right: initial;
            left: 0;
          }
          &__read-more {
            float: right;
          }
          &__image {
            float: right;
          }
        }
      }
      &:nth-of-type(n + 3) {
        margin-top: $color-height + 25px;
      }
    }
    &__image {
      width: 75%;
      img {
        // clip-path: polygon(50% 15%, 25% 90%, 75% 90%);
        cursor: pointer;
      }
    }
    &__text {
      position: absolute;
      bottom: 0;
      right: 0;
      width: calc(70% - 10px);
    }
    &__title {
      background-color: $secondary;
      font-size: 1.6rem;
      padding: 7px 15px 5px;
      color: $main;
      display: block;
      text-align: center;
      position: relative;
      bottom: 25px;
      cursor: pointer;
    }
    &__blurb {
      padding: 15px;
      font-size: 1.4rem;
      background-color: $accent;
      color: $main;
      min-height: 100px;
      cursor: pointer;
      text-align: justify;
    }
    &__color-block {
      width: 100%;
      background-color: $darkened-secondary;
      height: $color-height;
      bottom: -#{$color-height + 10px};
      position: absolute;
    }
    &__read-more {
      position: relative;
      margin: 0;
      margin-top: 10px;
      width: 30%;
      font-size: 1.4rem;
      padding: 20px 5px 18px;
      text-align: center;
    }
  }
</style>