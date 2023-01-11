<template>
  <div class="nier-carouselItem">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'nr-carousel-item',

}
</script>

<style lang="scss">
.nier-carouselItem {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(115, 201, 229);
  img {
    width: 100%;
    height: 100%;
  }
  a {
    position: absolute;
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}
</style>
