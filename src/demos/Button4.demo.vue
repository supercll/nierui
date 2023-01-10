<demo>
支持 disabled
</demo>
<template>
  <nr-button disabled>disable</nr-button>
  <nr-button theme="link" disabled>disable链接</nr-button>
  <nr-button theme="text" disabled>disable文本</nr-button>
</template>

<script lang="ts">
import { NrButton } from '../lib/index'
export default {
  components: {
    NrButton,
  },
}
</script>
