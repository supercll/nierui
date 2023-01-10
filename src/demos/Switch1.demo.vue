
<demo>普通开关</demo>

<template>
  <nr-switch v-model:value="isOp"></nr-switch>
</template>

<script lang="ts">
import { NrSwitch } from '../lib/index'
import { ref } from 'vue'
export default {
  components: {
    NrSwitch,
  },
  setup() {
    const isOp = ref(true)

    return {
      isOp,
    }
  },
}
</script>
