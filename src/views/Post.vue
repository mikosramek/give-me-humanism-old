<template>
  <div class="Post">
    <div class="Post__topBar">
      <h2 class="Post__header">{{ $prismic.richTextAsPlain(fields.title) }}</h2>
      <p class="Post__date">{{ fields.date }}</p>
    </div>
    <prismic-image
      :field="fields.header_image"
      class="Post__hero-image"
    />
    <div
      v-for="(slice, index) in fields.body"
      :key="index"
      class="Post__slice"
    >
      <Section
        :content = "slice"
        v-if="slice.slice_type === 'section'"
      />
      <TextAndImage
        :content = "slice"
        v-if="slice.slice_type === 'text_and_image'"
      />
    </div>
    <template v-for="(item, index) of body">
      <component
        :key="index"
        v-bind="item.attributes"
        v-bind:is="item.is"
      />
    </template>
    
  </div>
</template>

<script>
  import Section from '../components/slices/Section';
  import TextAndImage from '../components/slices/TextAndImage';

  export default {
    name : 'Post',
    components : {
      Section,
      TextAndImage
    },
    data() {
      return {
        fields : {
          title        : null,
          header_image : null,
          date         : null,
          intro_blurb  : null,
          tags         : null,
          main_link    : null,
          body         : null
        }
      }
    },
    computed : {
      body() {
        return this.$_get(this.fields, 'body', []).map(this.parseBody);
      }
    },
    methods : {
      getContent(uid) {
        this.$prismic.client.getByUID('post', uid).then(this.handleData)
      },
      handleData(document) {
        if (document) {
          this.fields.title = document.data.title;
          this.fields.date = document.data.date;
          this.fields.header_image = document.data.header_image;
          this.fields.intro_blurb = document.data.intro_blurb;
          this.fields.tags = document.tags;
          this.fields.main_link = document.data.main_link;
          this.fields.body = document.data.body;
        } else {
          this.$router.push({ name: 'not-found' })
        }
      },
      parseBody(item) {
        let componentAttributes = {
          is : 'template'
        };
        switch (item.slice_type) {
          case 'section': {
            componentAttributes = {
              is    : 'Section',
              field : [...item.primary.content],
              class : 'Article__content-block--no-extend'
            };
            break;
          }
        }
        item.attributes = componentAttributes;
        return item;
      }
    },
    created() {
      this.getContent(this.$route.params.uid);
    },
    beforeRouteUpdate (to, from, next) {
      this.getContent(to.params.uid);
      next();
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/shared.scss";
  .Post {
    margin-bottom: 15px;
    &__topBar {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__hero-image {
      margin-bottom: 15px;
    }
    &__header {
      font-size: 2.4rem;
    }
    &__date {
      font-size: 1.8rem;
    }
    a {
      text-decoration: underline;
    }
    p {
      margin: 5px 0;
      line-height: 25px;
      font-size: 1.8rem;
    }
  }
</style>