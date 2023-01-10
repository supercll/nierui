<demo>
走马灯-轮播图
</demo>
<template>
  <div>
    <nr-carousel :speed="speed" :autoDelay="autoDelay" :timingFunction="timingFunction">
      <nr-carousel-item class="container">1</nr-carousel-item>
      <nr-carousel-item class="container">2</nr-carousel-item>
      <nr-carousel-item class="container">3</nr-carousel-item>
      <nr-carousel-item class="container">4</nr-carousel-item>
      <nr-carousel-item class="container">5</nr-carousel-item>
    </nr-carousel>
  </div>
</template>

<script lang="ts">
import { NrCarousel } from '../lib/index'
import { NrCarouselItem } from '../lib/index'
export default {
  components: {
    NrCarousel,
    NrCarouselItem,
  },

  setup() {
    return {
      speed: 0.45,
      autoDelay: 2500,
      timingFunction: 'ease-inr-out',
    }
  },
}
</script>
<style lang="scss" scoped>
    .container {
        text-align: center;
    }
</style>
