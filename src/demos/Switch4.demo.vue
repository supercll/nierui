
<demo>单文字开关（例如弹幕）</demo>

<template>
  <nr-switch type="textin" v-model:value="isOp">弹</nr-switch>
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
