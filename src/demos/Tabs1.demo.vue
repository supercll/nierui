<demo>
默认Tabs
</demo>
<template>
  <nr-tabs v-model:selected="x">
    <nr-tab title="导航1">内容1</nr-tab>
    <nr-tab title="导航2">内容2</nr-tab>
  </nr-tabs>
</template>

<script lang="ts">
import { NrTabs } from '../lib/index'
import { NrTab } from '../lib/index'
import { ref } from 'vue'
export default {
  components: {
    NrTabs,
    NrTab,
  },
  setup() {
    const x = ref('导航2')

    return {
      x,
    }
  },
}
</script>
