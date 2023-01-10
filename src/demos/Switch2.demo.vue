<demo>文字状态开关</demo>

<template>
  <nr-switch type="text" v-model:value="isOp" :swtichText="swtichText"></nr-switch>
</template>

<script lang="ts">
import { NrSwitch } from '../lib/index'
import { ref } from 'vue'
export default {
  components: {
    NrSwitch,
  },
  setup() {
    const isOp = ref(false)
    const swtichText = ['on', 'off']

    return {
      isOp,
      swtichText,
    }
  },
}
</script>

