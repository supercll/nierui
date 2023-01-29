<template>
  <h1 class="doc-header">MPlayer 示例</h1>
  <Demo :component="MPlayerDemo" />
</template>

<script lang="ts">
import Demo from './Demo.vue'
import MPlayerDemo from '../demos/MPlayer.demo.vue'
export default {
  components: {
    Demo,
  },
  setup() {
    return {
      MPlayerDemo,
    }
  },
}
</script>
