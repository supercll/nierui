<demo>
不同 level
</demo>
<template>
  <div>
    <div>
      <nr-button level="main">main</nr-button>
      <nr-button>default</nr-button>
      <nr-button level="danger">danger</nr-button>
    </div>
    <div>
      <nr-button theme="link" level="main">main链接</nr-button>
      <nr-button theme="link">default链接</nr-button>
      <nr-button theme="link" level="danger">danger</nr-button>
    </div>
    <div>
      <nr-button theme="text" level="main">main文字</nr-button>
      <nr-button theme="text">default文字</nr-button>
      <nr-button theme="text" level="danger">danger</nr-button>
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
