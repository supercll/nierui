<demo>logo开关</demo>
<template>
  <nr-switch type="logo" v-model:value="isOp1"></nr-switch>
  <nr-switch type="logo" xh="lemon" v-model:value="isOp2"></nr-switch>
</template>

<script lang="ts">
import { NrSwitch } from '../lib/index'
import { ref } from 'vue'
export default {
  components: {
    NrSwitch,
  },
  setup() {
    const isOp1 = ref(true)
    const isOp2 = ref(false)

    return {
      isOp1,
      isOp2,
    }
  },
}
</script>
