<demo>
不同 大小
</demo>
<template>
  <div>
    <div>
      <nr-button size="big">big</nr-button>
      <nr-button>default</nr-button>
      <nr-button size="small">小</nr-button>
    </div>
    <div>
      <nr-button theme="link" size="big">big</nr-button>
      <nr-button theme="link">default</nr-button>
      <nr-button size="small" theme="link">小</nr-button>
    </div>
    <div>
      <nr-button size="big" theme="text">big</nr-button>
      <nr-button theme="text">default</nr-button>
      <nr-button size="small" theme="text">小</nr-button>
    </div>
  </div>
</template>

<script lang="ts">
import { NrButton } from '../lib/index'
export default {
  components: {
    NrButton,
  },
}
</script>
