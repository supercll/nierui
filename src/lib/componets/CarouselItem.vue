<template>
  <div class="nier-carousel_item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'nr-carousel-item',
}
</script>

<style lang="scss">
.nier-carousel_item {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #dbd3b8;
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
