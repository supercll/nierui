<demo>
进度条
</demo>
<template>
  <div>
    <NrProgress />
  </div>
  <div>
    <NrProgress v-model:percentage="percentage1" />
  </div>
  <div>
    <NrProgress v-model:percentage="percentage2" />
  </div>
  <nr-button @click="add">+</nr-button>
  <nr-button @click="zero">归零</nr-button>
</template>

<script lang="ts">
import { ref } from 'vue'
import { NrProgress, NrButton } from '../lib/index'
export default {
  components: {
    NrProgress,
    NrButton,
  },

  setup() {
    const percentage1 = ref(60)
    const percentage2 = ref(40)
    const add = () => {
      percentage2.value += 10
      if (percentage2.value > 100) {
        percentage2.value = 100
      }
    }
    const zero = () => {
      percentage2.value = 0
    }

    return {
      percentage1,
      percentage2,
      add,
      zero,
    }
  },
}
</script>
<style lang="scss" scoped>
div {
    margin: 20px 0;
}
</style>
