<template>
  <div>
    <slot />
  </div>
</template>
<script lang="ts">
import Tab from './Tab.vue'
import { onMounted, ref, watchEffect } from 'vue'
export default {
  name: 'nr-tab',
}
</script>
