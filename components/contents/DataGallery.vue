<template>

  <b-carousel
    :autoplay="true"
    repeat
    :arrow="true"
    :arrow-size="'is-large'"
    :icon-pack="'mdi'"
    :icon-prev="'arrow-left'"
    :icon-next="'arrow-right'"
    :indicator-inside="false"
    indicator-custom
    :overlay="gallery" 
    class="DataGallery pt-6"
    @click="switchGallery(true)"
    >
    <template 
      #indicators="props"
      >
      <b-image
        :src="imagesListUrls[props.i].image" 
        :title="imagesListUrls[props.i].title"
        :alt="imagesListUrls[props.i].title"
        class="al image mt-2"
      />
    </template>
    <!-- :indicator="false"
    :overlay="gallery"
    with-carousel-list
    :indicator-mode="'hover'"
    :indicator-position="'is-top'"
    :indicator-background="false" -->
    <b-carousel-item 
      v-for="(item, i) in imagesListUrls" 
      :key="`gallery-image-${i}`"
      >
      <b-image 
        class="image"
        :src="item.image"
      />
    </b-carousel-item>
    <span 
      v-if="gallery" 
      @click="switchGallery(false)" 
      class="modal-close is-large"
    />
    <!-- <template 
      #list="props"
      >
      <b-carousel-list
        v-model="props.active"
        :data="imagesListUrls"
        v-bind="al"
        @switch="props.switch($event, false)"
        as-indicator 
      />
    </template> -->
  </b-carousel>

</template>


<script>

export default {
  name: 'DataGallery',
  props: [
    'imagesListUrls'
  ],
  data() {
    return {
      gallery: false,
      al: {
        hasGrayscale: true,
        itemsToShow: 2,
        breakpoints: {
          768: {
            hasGrayscale: false,
            itemsToShow: 4
          },
          960: {
            hasGrayscale: true,
            itemsToShow: 6
          }
        }
      },
    }
  },
  methods: {
    switchGallery(value) {
      this.gallery = value
      if (value) {
        return document.documentElement.classList.add('is-clipped')
      } else {
        return document.documentElement.classList.remove('is-clipped')
      }
    }
  }
}

</script>

<style>
  .is-active .al img {
    filter: grayscale(0%);
  }
  .al img {
    filter: grayscale(100%);
    max-height: 80px;
  }
</style>
