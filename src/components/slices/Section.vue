<template>
  <div class="Section">
    <h3 class="Section__header">{{ $prismic.richTextAsPlain(getPrimary) }}</h3>
    <prismic-rich-text
      v-for="(para, index) in getItems"
      :key="index"
      :field="para.section_text"
      class="Section__paragraph"
    />
    <div class="Section__color-block" />
  </div>
</template>

<script>
  export default {
    name : 'Section',
    props : {
      content : {
        type : Object,
        default : null
      }
    },
    computed : {
      getPrimary() {
        return this.content.primary['section_heading'];
      },
      getItems() {
        return this.content.items;
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/scss/shared.scss';
  .Section {
    position: relative;
    color: $main;
    &__header {
      font-size: 2rem;
      position: absolute;
      margin: 0;
      background-color: $secondary;
      padding: 7px 15px 5px;
      top: 12px;
      left: -25px;
      &::after {
        content: '';
        display: block;
        position: absolute;
        z-index: -1;
        left: 0;
        bottom: -15px;
        width: 100%;
        height: 100%;
        background-color: $darkened-secondary;
      }
      &::before {
        content: '';
        display: block;
        position: absolute;
        z-index: 1;
        left: 0;
        bottom: -7.5px;
        width: 100%;
        height: 7.5px;
        background-color: $darkened-secondary;
      }
    }
    &__paragraph {
      font-size: 1.6rem;
      width: 60%;
      margin: 0;
      padding: 5px 15px;
      background-color: $accent;
      &:first-of-type {
        padding-top: 65px;
      }
      &::after {
        content: '';
        display: block;
        position: absolute;
        z-index: -1;
        left: -5px;
        bottom: -5px;
        width: calc(60% + 5px);
        height: calc(100% + 5px);
        background-color: $darkened-accent;
      }
    }
    &__color-block {
      background-color: $darkened-secondary;
      position: absolute;
      height: calc(100% - 15px);
      width: calc(40% - 15px);
      right: 0;
      top: 15px;
    }
  }
</style>