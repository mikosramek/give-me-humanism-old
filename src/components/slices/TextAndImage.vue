<template>
  <div
    :style="flexStyle"
    class="TextAndImage"
  >
    <prismic-rich-text
      :field="getPrimaryText"
      class="TextAndImage__paragraph"
    />
    <prismic-image
      :field="getPrimaryImage"
      :style="imageStyle"
      class="TextAndImage__image"
    />
  </div>
</template>

<script>
  export default {
    name : 'TextAndImage',
    props : {
      content : {
        type : Object,
        default : null
      }
    },
    computed : {
      getPrimaryText() {
        console.log(this.content)
        return this.content.primary.text;
      },
      getPrimaryImage() {
        return this.content.primary.image;
      },
      flexStyle() {
        return { flexDirection : this.content.primary.flip ? 'row' : 'row-reverse' };
      },
      imageStyle() {
        return { padding : this.content.primary.flip ? '15px 0 15px 15px' : '15px 15px 15px 0' };
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/scss/shared.scss';
  .TextAndImage {
    display: flex;
    color: $main;
    &__paragraph {
      font-size: 1.6rem;
      width: calc(60%);
      padding: 5px 15px;
      background-color: $accent;
      position: relative;
      &::after {
        content: '';
        display: block;
        position: absolute;
        z-index: -1;
        left: -5px;
        bottom: -5px;
        width: calc(100% + 5px);
        height: calc(100% + 5px);
        background-color: $darkened-accent;
      }
    }
    &__image {
      width: 40%;
      max-width: 500px;
    }
  }
</style>